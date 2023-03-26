import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { Formik } from "formik";
import { Loading } from '../../../components/Loading';
import { showResponseToast } from '../../../components/Toasts/ToastResponse/logic';
import UserErrors from '../../../domain/entities/errors/UserErrors';
import UserRepo from '../../../infrastructure/implementations/httpRequest/axios/UserRepo';
import UserValidationsRepo from '../../../infrastructure/implementations/validations/UserValidationsRepo';
import CreateUserUseCase from '../../../application/usecases/user/CreateUserUseCase';
import User from '../../../domain/entities/User';
import CreateUserException from '../../../domain/exceptions/user-exceptions/CreateUserException';
import datepicker, { getDate } from '../../../assets/scripts/datepicker';
import { ImageProfileInput } from '../../../components/imageInput/ImageProfileInput';

export interface CreateUserProps { }

const CreateUser: React.FC<CreateUserProps> = () => {
	const [errors, setErrors] = useState<UserErrors>({});
	const [isLoading, setIsLoading] = useState(false);
	const [passwordVisibility, setPasswordVisibility] = useState(false);

	const userRepo = new UserRepo();
	const userValidationRepo = new UserValidationsRepo();
	const createUserUseCase = new CreateUserUseCase(userRepo, userValidationRepo);

	const initialValues: User = {
		firstName: "",
		lastName: "",
		userName: "",
		password: "",
		phone: "",
		birthdate: ""
	}

	const navigate = useNavigate();
	const { setToastOptions } = useOutletContext<any>();

	const submitForm = async (values: User) => {
		try {
			setIsLoading(true);
			const { status } = await createUserUseCase.run(values);
			setIsLoading(false);
			if (status === 201) {
				await setToastOptions({
					message: "Usuario creado con éxito",
					type: "success"
				});
				showResponseToast();
				navigate(-1);
			}
		} catch (error: any) {
			setIsLoading(false);
			if (error instanceof CreateUserException && error.cause) setErrors(error.cause);
			else navigate("/error");
		}
	}

	useEffect(() => {
		datepicker("birth-date");
	}, []);


	return isLoading ? <Loading /> : (
		<>
			<nav aria-label="breadcrumb">
				<ol className="breadcrumb">
					<li className="breadcrumb-item"><Link to="/users">Usuarios</Link></li>
					<li className="breadcrumb-item active" aria-current="page">Agregar usuario</li>
				</ol>
			</nav>
			<div className="bgc-white p-20 bd col-12">
				<h6 className="c-grey-900">Nuevo usuario</h6>
				<div className="mT-30">
					<Formik
						initialValues={initialValues}
						enableReinitialize={true}
						onSubmit={submitForm}
					>
						{({
							values,
							setValues,
							handleChange,
							handleSubmit,
							isSubmitting
						}) => (
							<form onSubmit={handleSubmit} className="row needs-validation col" noValidate>
								<div className="col-sm-12 col-md-4 mb-4 d-flex justify-content-center">
									<ImageProfileInput
										updatePictureCb={(file: File) => {
											setValues({ ...values, profilePicture: file });
										}}
										size="300px"
									/>
								</div>
								<div className="col-sm-12 col-md-8">
									<div className="row">
										<div className="col-md-6 col-sm-12 mb-3">
											<label className="form-label" htmlFor="firstName">Nombre</label>
											<input
												className={`form-control ${errors.firstName && "is-invalid"}`}
												aria-describedby="emailHelp"
												type="text"
												id="firstName"
												name="firstName"
												placeholder="Nombre"
												value={values.firstName}
												onChange={handleChange}
											/>
											{errors.firstName && <div className="text-danger">{errors.firstName}</div>}
										</div>
										<div className="col-md-6 col-sm-12 mb-3">
											<label className="form-label" htmlFor="lastName">Apellido</label>
											<input
												className={`form-control ${errors.lastName && "is-invalid"}`}
												aria-describedby="emailHelp"
												type="text"
												id="lastName"
												name="lastName"
												placeholder="Apellido"
												value={values.lastName}
												onChange={handleChange}
											/>
											{errors.lastName && <div className="text-danger">{errors.lastName}</div>}
										</div>
									</div>
									<div className="row">
										<div className="col-12 mb-3">
											<label className="form-label" htmlFor="userName">Nombre de usuario</label>
											<input
												className={`form-control ${errors.userName && "is-invalid"}`}
												aria-describedby="emailHelp"
												type="text"
												id="userName"
												name="userName"
												placeholder="Nombre de usuario"
												value={values.userName}
												onChange={handleChange}
											/>
											{errors.userName && <div className="text-danger">{errors.userName}</div>}
										</div>
									</div>
									<div className="row">
										<div className="col-md-6 col-sm-12 mb-1">
											<label className="form-label" htmlFor="password">Contraseña</label>
											<input
												className={`form-control ${errors.password && "is-invalid"}`}
												aria-describedby="emailHelp"
												type={passwordVisibility ? "text" : "password"}
												id="password"
												name="password"
												placeholder="********"
												value={values.password}
												onChange={handleChange}
											/>
											<span id="passwordHelpInline" className="form-text">
												Must be 8-20 characters long.
											</span>
											{errors.password && <div className="text-danger">{errors.password}</div>}
										</div>
										<div className="col-md-6 col-sm-12 mb-3">
											<label className="form-label" htmlFor="confirmPassword">Confirmar contraseña</label>
											<input
												className={`form-control ${errors.confirmPassword && "is-invalid"}`}
												aria-describedby="emailHelp"
												type={passwordVisibility ? "text" : "password"}
												id="confirmPassword"
												name="confirmPassword"
												placeholder="********"
												value={values.confirmPassword}
												onChange={handleChange}
											/>
											{errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
										</div>
									</div>
									<div className="row">
										<div className="col-12 mb-3">
											<div className="form-check">
												<input
													className="form-check-input mr-2"
													type="checkbox"
													name="showPassword"
													id="showPassword"
													onChange={() => setPasswordVisibility(!passwordVisibility)}
												/>
												<label className="form-check-label" htmlFor="showPassword">
													Mostrar contraseña
												</label>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-6 mb-3">
											<label className="form-label" htmlFor="phone">Celular</label>
											<input
												className={`form-control ${errors.phone && "is-invalid"}`}
												aria-describedby="emailHelp"
												type="text"
												id="phone"
												name="phone"
												placeholder="Celular"
												value={values.phone}
												onChange={handleChange}
											/>
											{errors.phone && <div className="text-danger">{errors.phone}</div>}
										</div>
										<div className="col-6 mb-3">
											<label className="form-label" htmlFor="birthdate">Fecha de nacimiento</label>
											<div className="timepicker-input input-icon mb-3">
												<div className="input-group">
													<div className="input-group-text bgc-white bd bdwR-0">
														<i className="ti-calendar"></i>
													</div>
													<input
														className={`form-control bdc-grey-200 birth-date ${errors.birthdate && "is-invalid"}`}
														aria-describedby="emailHelp"
														type="text"
														id="birthdate"
														name="birthdate"
														placeholder="Fecha de nacimiento"
														onBlur={() => setValues({
															...values,
															birthdate: getDate("birth-date")
														})}
														readOnly
														data-provide="datepicker"
													/>
												</div>
											</div>
											{errors.birthdate && <div className="text-danger">{errors.birthdate}</div>}
										</div>
									</div>
								</div>
								<div className="col text-end">
									<button disabled={isSubmitting} type="submit" className="btn button-primary btn-color" style={{ marginRight: "15px" }}>Agregar</button>
									<Link to="/users" ><button type="button" className="btn btn-danger text-light">Cancelar</button></Link>
								</div>
							</form>
						)}
					</Formik>
				</div>
			</div>
		</>
	);
};

export default CreateUser;
