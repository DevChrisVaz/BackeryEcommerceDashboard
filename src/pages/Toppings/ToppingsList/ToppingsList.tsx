import DeleteToppingUseCase from '@/application/usecases/topping/DeleteToppingUseCase';
import GetAllToppingsUseCase from '@/application/usecases/topping/GetAllToppingsUseCase';
import { DataTable } from '@/components/DataTable';
import { Loading } from '@/components/Loading';
import { Modal } from '@/components/Modal';
import { showModal } from '@/components/Modal/logic';
import { showResponseToast } from '@/components/Toasts/ToastResponse/logic';
import Topping from '@/domain/entities/Topping';
import { selectToken } from '@/features/slices/sessionSlice';
import ToppingRepo from '@/infrastructure/implementations/httpRequest/axios/ToppingRepo';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
export interface ToppingsListProps {}

const ToppingsList : React.FC<ToppingsListProps> = () => {
	const [toppings, setToppings] = useState<Topping[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [toppingToDelete, setToppingToDelete] = useState<Topping>();

	const toppingRepo = new ToppingRepo();
	const getAllToppingsUseCase = new GetAllToppingsUseCase(toppingRepo);
	const deleteToppingUseCase = new DeleteToppingUseCase(toppingRepo);

	const navigate = useNavigate();
	const { setToastOptions } = useOutletContext<any>();
	const token = useSelector(selectToken);

	const tableHeader = [
		{
			id: "name",
			name: "Nombre"
		},
		{
			id: "price",
			name: "Precio",
			price: true
		},
		{
			id: "unitOfMeasure",
			name: "Cantidad"
		}
	];

	const modalId = "modal-delete";

	const deleteAction = (topping: Topping) => {
		showModal(modalId);
		setToppingToDelete(topping);
	}

	const actions = {
		delete: deleteAction
	}

	const getAllToppings = async () => {
		try {
			setIsLoading(true);
			const { data, status } = await getAllToppingsUseCase.run();
			if (status === 200 && data) setToppings(data);
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			navigate("/error");
		}
	}

	const deleteTopping = async () => {
		try {
			setIsLoading(true);
			if (toppingToDelete && toppingToDelete.uuid) {
				const { data, status } = await deleteToppingUseCase.run(toppingToDelete.uuid, token);
				if (status === 200) {
					setToastOptions({
						message: "Categoría " + data?.name + " eliminada con éxito",
						type: "success"
					});
					showResponseToast();
				}
				await getAllToppings();
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
		getAllToppings();
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
					<button type="button" onClick={deleteTopping} className="btn btn-danger text-white" data-bs-dismiss="modal">Eliminar</button>
					<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
				</div>
			</Modal>
			<nav aria-label="breadcrumb">
				<ol className="breadcrumb">
					<li className="breadcrumb-item active" aria-current="page">Toppings</li>
				</ol>
			</nav>
			<div id="mainContent">
				<div className="container-fluid">
					<div className="d-flex justify-content-between">
						<h4 className="c-grey-900 mT-10 mB-30">Toppings</h4>
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
								<DataTable columns={tableHeader} rows={toppings} linked actions={actions} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ToppingsList;
