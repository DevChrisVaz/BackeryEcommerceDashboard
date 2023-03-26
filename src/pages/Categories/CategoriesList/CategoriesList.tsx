import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import GetAllCategoriesUseCase from '../../../application/usecases/category/GetAllCategoriesUseCase';
import { DataTable } from '../../../components/DataTable';
import Category from '../../../domain/entities/Category';
import CategoryRepo from '../../../infrastructure/implementations/httpRequest/axios/CategoryRepo';
import { Loading } from '../../../components/Loading';
import { Modal } from '../../../components/Modal';
import { showModal } from '../../../components/Modal/logic';
import DeleteCategoryUseCase from '../../../application/usecases/category/DeleteCategoryUseCase';
import { showResponseToast } from '../../../components/Toasts/ToastResponse/logic';

export interface CategoriesListProps { }

const CategoriesList: React.FC<CategoriesListProps> = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [categoryToDelete, setCategoryToDelete] = useState<Category>();

	const categoryRepo = new CategoryRepo();
	const getAllCategoriesUseCase = new GetAllCategoriesUseCase(categoryRepo);
	const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepo);

	const navigate = useNavigate();

	const { setToastOptions } = useOutletContext<any>();

	const modalId = "modal-delete";

	const deleteAction = (category: Category) => {
		showModal(modalId);
		setCategoryToDelete(category);
	}

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
			id: "type",
			name: "Tipo"
		}
	]

	const actions = {
		delete: deleteAction 
	}

	const getAllCategories = async () => {
		try {
			setIsLoading(true);
			const { data, status } = await getAllCategoriesUseCase.run();
			if (status === 200 && data) setCategories(data);
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			navigate("/error");
		}
	}

	const deleteCategory = async () => {
		try {
			setIsLoading(true);
			if(categoryToDelete && categoryToDelete.uuid) {
				const { data, status } = await deleteCategoryUseCase.run(categoryToDelete.uuid);
				if (status === 200) {
					setToastOptions({
						message: "Categoría " + data?.name +" eliminada con éxito",
						type: "success"
					});
					showResponseToast();
				}
				await getAllCategories();
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
		getAllCategories();
	}, []);


	return isLoading ? <Loading /> :
		(
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
						<button type="button" onClick={deleteCategory} className="btn btn-danger text-white" data-bs-dismiss="modal">Eliminar</button>
						<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
					</div>
				</Modal>
				<nav aria-label="breadcrumb">
					<ol className="breadcrumb">
						<li className="breadcrumb-item active" aria-current="page">Categories</li>
					</ol>
				</nav>
				<div id="mainContent">
					<div className="container-fluid">
						<div className="d-flex justify-content-between">
							<h4 className="c-grey-900 mT-10 mB-30">Categories</h4>
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
									<DataTable columns={tableHeader} rows={categories} actions={actions} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
};

export default CategoriesList;
