import DeleteQuoteUseCase from '@/application/usecases/quote/DeleteQuoteUseCase';
import GetAllQuotesUseCase from '@/application/usecases/quote/GetAllQuotesUseCase';
import { DataTable } from '@/components/DataTable';
import { Loading } from '@/components/Loading';
import { Modal } from '@/components/Modal';
import { showModal } from '@/components/Modal/logic';
import { showResponseToast } from '@/components/Toasts/ToastResponse/logic';
import Quote from '@/domain/entities/Quote';
import QuoteRepo from '@/infrastructure/implementations/httpRequest/axios/QuoteRepo';
import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
export interface QuotesListProps { }

const QuotesList: React.FC<QuotesListProps> = () => {
	const [quotes, setQuotes] = useState<Quote[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [quoteToDelete, setQuoteToDelete] = useState<Quote>();

	const quoteRepo = new QuoteRepo();
	const getAllQuotesUseCase = new GetAllQuotesUseCase(quoteRepo);
	const deleteQuoteUseCase = new DeleteQuoteUseCase(quoteRepo);

	const navigate = useNavigate();
	const { setToastOptions } = useOutletContext<any>();

	const tableHeader = [
		{
			id: "fullName",
			name: "Nombre",
			concat: {
				fields: ["firstName", "lastName"],
				separator: " "
			}
		},
		{
			id: "phone",
			name: "Teléfono"
		},
		{
			id: "city",
			name: "Ciudad"
		},
		{
			id: "zip",
			name: "Código Postal"
		}
	];

	const modalId = "modal-delete";

	const deleteAction = (quote: Quote) => {
		showModal(modalId);
		setQuoteToDelete(quote);
	}

	const actions = {
		delete: deleteAction,
		details: true
	}

	const getAllProducts = async () => {
		try {
			setIsLoading(true);
			const { data, status } = await getAllQuotesUseCase.run();
			if (status === 200 && data) setQuotes(data);
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			navigate("/error");
		}
	}

	const deleteQuote = async () => {
		try {
			setIsLoading(true);
			if (quoteToDelete && quoteToDelete.uuid) {
				const { data, status } = await deleteQuoteUseCase.run(quoteToDelete.uuid);
				if (status === 200) {
					setToastOptions({
						message: "Cotización eliminada con éxito",
						type: "success"
					});
					showResponseToast();
				}
				await getAllProducts();
				setIsLoading(false);
			} else {
				throw new Error("No se cargó el registro");
			}
		} catch (err) {
			setIsLoading(false);
			alert(err);
		}
	}

	useEffect(() => {
		getAllProducts();
	}, []);

	return isLoading ? <Loading /> : (
		<>
			<Modal modalId={modalId}>
				<div className="modal-header">
					<h5 className="modal-title">Eliminar registro</h5>
					<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div className="modal-body">
					<p>¿Seguro de que desea eliminar el registro? Esta acción es irreversible</p>
				</div>
				<div className="modal-footer">
					<button type="button" onClick={deleteQuote} className="btn btn-danger text-white" data-bs-dismiss="modal">Eliminar</button>
					<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
				</div>
			</Modal>
			<nav aria-label="breadcrumb">
				<ol className="breadcrumb">
					{/* <li className="breadcrumb-item"><Link to="#">Home</Link></li>
                <li className="breadcrumb-item"><Link to="#">Library</Link></li> */}
					<li className="breadcrumb-item active" aria-current="page">Cotizaciones</li>
				</ol>
			</nav>
			<div className="mainContent">
				<div className="container-fluid">
					<div className="d-flex justify-content-between">
						<h4 className="c-grey-900 mT-10 mB-30">Cotizaciones</h4>
					</div>
					<div className="row">
						<div className="col-md-12">
							<div className="bgc-white bd bdrs-3 p-20 mB-20">
								<DataTable columns={tableHeader} rows={quotes} linked actions={actions} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default QuotesList;
