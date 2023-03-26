import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import DeleteUserUseCase from '../../../application/usecases/user/DeleteUserUseCase';
import GetAllUsersUseCase from '../../../application/usecases/user/GetAllUsersUseCase';
import { DataTable } from '../../../components/DataTable';
import { Loading } from '../../../components/Loading';
import { Modal } from '../../../components/Modal';
import { showModal } from '../../../components/Modal/logic';
import { showResponseToast } from '../../../components/Toasts/ToastResponse/logic';
import User from '../../../domain/entities/User';
import UserRepo from '../../../infrastructure/implementations/httpRequest/axios/UserRepo';

export interface UsersListProps { }

const UsersList: React.FC<UsersListProps> = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [userToDelete, setUserToDelete] = useState<User>();

	const userRepo = new UserRepo();
	const getAllUsersUseCase = new GetAllUsersUseCase(userRepo);
	const deleteUserUseCase = new DeleteUserUseCase(userRepo);

	const navigate = useNavigate();
	const { setToastOptions } = useOutletContext<any>();

	const modalId = "modal-delete";

	const deleteAction = (user: User) => {
		showModal(modalId);
		setUserToDelete(user);
	}

	const tableHeader = [
		{
			id: "fullName",
			name: "Nombre"
		},
		{
			id: "userName",
			name: "Nombre Usuario"
		},
		{
			id: "phone",
			name: "Celular"
		}
	]

	const actions = {
		delete: deleteAction 
	}

	const getAllUsers = async () => {
		try {
			setIsLoading(true);
			const { data, status } = await getAllUsersUseCase.run();
			if (status === 200 && data) setUsers(data);
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			navigate("/error");
		}
	}

	const deleteUser = async () => {
		try {
			setIsLoading(true);
			if(userToDelete && userToDelete.uuid) {
				const { data, status } = await deleteUserUseCase.run(userToDelete.uuid);
				if (status === 200) {
					setToastOptions({
						message: "Usuario " + data?.userName +" eliminado con éxito",
						type: "success"
					});
					showResponseToast();
				}
				await getAllUsers();
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
		getAllUsers();
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
						<button type="button" onClick={deleteUser} className="btn btn-danger text-white" data-bs-dismiss="modal">Eliminar</button>
						<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
					</div>
				</Modal>
				<nav aria-label="breadcrumb">
					<ol className="breadcrumb">
						<li className="breadcrumb-item active" aria-current="page">Usuarios</li>
					</ol>
				</nav>
				<div id="mainContent">
					<div className="container-fluid">
						<div className="d-flex justify-content-between">
							<h4 className="c-grey-900 mT-10 mB-30">Usuarios</h4>
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
									<DataTable columns={tableHeader} rows={users} actions={actions} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
};

export default UsersList;
