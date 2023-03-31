import GetProductByIdUseCase from '@/application/usecases/product/GetProductByIdUseCase';
import DeleteQuoteUseCase from '@/application/usecases/quote/DeleteQuoteUseCase';
import GetQuoteByIdUseCase from '@/application/usecases/quote/GetQuoteByIdUseCase';
import { Modal } from '@/components/Modal';
import { showModal } from '@/components/Modal/logic';
import { showResponseToast } from '@/components/Toasts/ToastResponse/logic';
import Quote from '@/domain/entities/Quote';
import { selectToken } from '@/features/slices/sessionSlice';
import { getDate } from '@/helpers/dateHelper';
import ProductRepo from '@/infrastructure/implementations/httpRequest/axios/ProductRepo';
import QuoteRepo from '@/infrastructure/implementations/httpRequest/axios/QuoteRepo';
import moment from 'moment';
import numeral from 'numeral';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useOutletContext, useParams } from 'react-router-dom';
export interface QuotesDetailsProps { }

const QuotesDetails: React.FC<QuotesDetailsProps> = () => {
	// const [quote, setQuote] = useState<Quote>({});
	const [quote, setQuote] = useState<Quote>({});
	const [products, setProducts] = useState<any>();
	const [total, setTotal] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const quoteRepo = new QuoteRepo();
	const getQuoteByIdUseCase = new GetQuoteByIdUseCase(quoteRepo);
	const deleteQuoteUseCase = new DeleteQuoteUseCase(quoteRepo);

	const productRepo = new ProductRepo();
	const getProductById = new GetProductByIdUseCase(productRepo);

	const navigate = useNavigate();
	const { id } = useParams();
	const { setToastOptions } = useOutletContext<any>();
	const token = useSelector(selectToken);

	const modalId = "modal-delete";

	const getQuote = async () => {
		try {
			setIsLoading(true);
			const { data, status } = await getQuoteByIdUseCase.run(id ?? "", token);
			if (status === 200 && data) setQuote(data);
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			navigate("/error");
		}
	}

	const deleteQuote = async () => {
		try {
			setIsLoading(true);
			if (quote && quote.uuid) {
				const { data, status } = await deleteQuoteUseCase.run(quote.uuid ?? "", token);
				if (status === 200) {
					setToastOptions({
						message: "Cotización eliminada con éxito",
						type: "success"
					});
					showResponseToast();
				}
				navigate(-1);
				setIsLoading(false);
			} else {
				throw new Error("No se cargó el registro");
			}
		} catch (err) {
			setIsLoading(false);
			setToastOptions({
				message: "No se pudo eliminar la cotización",
				type: "danger"
			});
			showResponseToast();
		}
	}

	useEffect(() => {
		getQuote();
	}, []);

	useEffect(() => {
		if (quote) {
			quote.products?.forEach(item => {
				setTotal(total + (quote.productsRef?.find(p => p.uuid === item.product)?.price || 0) * (item.qty || 0));
			});
		}
	}, [quote.uuid]);


	return (
		<>
			<Modal modalId={modalId}>
				<div className="modal-header">
					<h5 className="modal-title">Eliminar Cotización</h5>
					<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div className="modal-body">
					<p>¿Seguro de que desea eliminar la cotización?</p>
				</div>
				<div className="modal-footer">
					<button type="button" onClick={deleteQuote} className="btn btn-danger text-white" data-bs-dismiss="modal">Eliminar</button>
					<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
				</div>
			</Modal>
			<nav aria-label="breadcrumb">
				<ol className="breadcrumb">
					{/* <li className="breadcrumb-item"><Link to="#">Home</Link></li> */}
					<li className="breadcrumb-item"><Link to="/quotes">Cotizaciones</Link></li>
					<li className="breadcrumb-item active" aria-current="page">Detalles de cotización</li>
				</ol>
			</nav>
			<div className="mainContainer">
				<div className="container-fluid">
					<div className="d-flex justify-content-between">
						<h4 className="c-grey-900 mT-10 mB-30">Detalles de cotización</h4>
						<div>
							<button
								type="button"
								className="btn btn-danger text-white"
								onClick={() => showModal(modalId)}
							>Eliminar</button>
						</div>
					</div>
					<div className="card shadow-sm">
						<div className="card-header">
							<div className="w-100 d-flex justify-content-between">
								<h3>Cotización de {quote.firstName + " " + quote.lastName}</h3>
								<a href={"https://wa.me/52" + quote.phone + "?text=" + encodeURIComponent(quote.firstName + " " + quote.lastName)} target="_blank"><i style={{ fontSize: "28px", color: "#45D655" }} className="bi bi-whatsapp" /></a>
							</div>
							{/* <span>{quote.email}</span> */}
						</div>
						<div className="card-body px-md-5">
							{/* <h5 className="card-title">Special title treatment</h5> */}
							<div className="w-100">
								<span>{getDate(quote.createdAt ?? "")}</span>
							</div>
							<span className="fs-4 mb-2">Información del cliente</span>
							<div className="row ms-1 mb-3">
								<span><span className="fw-bold">Dirección:</span> {quote.address}</span>
								<span><span className="fw-bold">Ciudad:</span> {quote.city}</span>
								<span><span className="fw-bold">Código postal:</span> {quote.zip}</span>
								<span><span className="fw-bold">Teléfono:</span> <a href={"https://wa.me/52" + quote.phone + "?text=" + encodeURIComponent(quote.firstName + " " + quote.lastName)} target="_blank">{quote.phone}</a></span>
								<span><span className="fw-bold">Correo:</span> {quote.email}</span>
							</div>
							<span className="fs-5 mb-2">Productos</span>
							<ol>
								{
									quote.products?.map((item, index) => {
										const product = quote.productsRef?.find(p => p.uuid === item.product);
										return (
											<li>
												<div key={index} className="row ms-1">
													<span className="mt-2 fw-bold">{product?.name}</span>
													<span><span className="">Precio:</span> {numeral(product?.price).format("$0,0.00")}</span>
													<span><span className="">Cantidad:</span> {item.qty}</span>
													<span><span className="">Total:</span> {numeral((product?.price || 0) * (item?.qty || 0)).format("$0,0.00")}</span>
												</div>
											</li>
										)
									})
								}
							</ol>
							<span className="fs-5 mb-2">Total: {numeral(total).format("$0,0.00")}</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default QuotesDetails;
