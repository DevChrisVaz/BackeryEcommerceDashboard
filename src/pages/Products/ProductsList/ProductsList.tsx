import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import DeleteProductUseCase from '../../../application/usecases/product/DeleteProductUseCase';
import GetAllProductsUseCase from '../../../application/usecases/product/GetAllProductsUseCase';
import { DataTable } from '../../../components/DataTable';
import { Loading } from '../../../components/Loading';
import { Modal } from '../../../components/Modal';
import { showModal } from '../../../components/Modal/logic';
import { showResponseToast } from '../../../components/Toasts/ToastResponse/logic';
import Product from '../../../domain/entities/Product';
import ProductRepo from '../../../infrastructure/implementations/httpRequest/axios/ProductRepo';
export interface ProductsListProps { }

const ProductsList: React.FC<ProductsListProps> = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [productToDelete, setProductToDelete] = useState<Product>();

	const productRepo = new ProductRepo();
	const getAllProductsUseCase = new GetAllProductsUseCase(productRepo);
	const deleteProductUseCase = new DeleteProductUseCase(productRepo);

	const navigate = useNavigate();
	const { setToastOptions } = useOutletContext<any>();

	const tableHeader = [
		{
			id: "name",
			name: "Nombre"
		},
		{
			id: "description",
			name: "Descripción"
		},
		{
			id: "price",
			name: "Precio",
			price: true
		},
		{
			id: "size",
			name: "Tamaño"
		}
	];

	const modalId = "modal-delete";

	const deleteAction = (product: Product) => {
		showModal(modalId);
		setProductToDelete(product);
	}

	const actions = {
		delete: deleteAction
	}

	const getAllProducts = async () => {
		try {
			setIsLoading(true);
			const { data, status } = await getAllProductsUseCase.run();
			if (status === 200 && data) setProducts(data);
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			navigate("/error");
		}
	}

	const deleteProduct = async () => {
		try {
			setIsLoading(true);
			if (productToDelete && productToDelete.uuid) {
				const { data, status } = await deleteProductUseCase.run(productToDelete.uuid);
				if (status === 200) {
					setToastOptions({
						message: "Categoría " + data?.name + " eliminada con éxito",
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
					<p>¿Seguro de que desea eliminar el registro?</p>
				</div>
				<div className="modal-footer">
					<button type="button" onClick={deleteProduct} className="btn btn-danger text-white" data-bs-dismiss="modal">Eliminar</button>
					<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
				</div>
			</Modal>
			<nav aria-label="breadcrumb">
				<ol className="breadcrumb">
					{/* <li className="breadcrumb-item"><Link to="#">Home</Link></li>
                <li className="breadcrumb-item"><Link to="#">Library</Link></li> */}
					<li className="breadcrumb-item active" aria-current="page">Productos</li>
				</ol>
			</nav>
			<div id="mainContent">
				<div className="container-fluid">
					<div className="d-flex justify-content-between">
						<h4 className="c-grey-900 mT-10 mB-30">Productos</h4>
						<Link to="new">
							<button
								type="button"
								className="btn button-primary btn-color"
							>Agregar</button>
						</Link>
					</div>
					<div className="row">
						<div className="col-md-12">
							<div className="bgc-white bd bdrs-3 p-20 mB-20">
								<DataTable columns={tableHeader} rows={products} linked actions={actions} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductsList;
