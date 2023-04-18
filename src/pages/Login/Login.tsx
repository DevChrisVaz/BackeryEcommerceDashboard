import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import UserLoginUseCase from '../../application/usecases/user/UserLoginUseCase';
import UserRepo from '../../infrastructure/implementations/httpRequest/axios/UserRepo';
import "./styles.scss";
import { setToken } from '../../features/slices/sessionSlice';
import { removeCredentials, selectCredentials, setCredentials } from '../../features/slices/credentialsSlice';
import { Loading } from '@/components/Loading';
export interface LoginProps { }

const Login: React.FC<LoginProps> = () => {
	const [passwordVisibility, setPasswordVisibility] = useState(false);
	const [remember, setRemember] = useState<boolean>(false);
	const [initialValues, setInitialValues] = useState({
		userName: "",
		password: ""
	});
	const [isLoading, setIsLoading] = useState(true);
	const [isLoginLoading, setIsLoginLoading] = useState(false);
	const [errors, setErrors] = useState({
		userName: "",
		password: ""
	});

	const userRepo = new UserRepo();
	const userLoginUseCase = new UserLoginUseCase(userRepo);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const credentials = useSelector(selectCredentials);

	const handleLogin = async (values: { userName: string, password: string }) => {
		try {
			setIsLoginLoading(true);
			const { data, status } = await userLoginUseCase.run(values);
			if (status === 200) {
				if (data) {
					dispatch(setToken(data));
					if (remember) dispatch(setCredentials(values));
					else dispatch(removeCredentials());
					navigate("/", { replace: true });
				}
			}
			setIsLoginLoading(false);
		} catch (err: any) {
			if (err.response.status === 404) {
				if (err.response.data.name === "UserNotFound") {
					setErrors({ ...errors, userName: "El usuario no existe" });
				}
			} else if (err.response.status === 400) {
				if (err.response.data.name === "PasswordsNotMatch") {
					setErrors({ ...errors, password: "Contraseña incorrecta" });
				}
			}
			setIsLoginLoading(false);
		}
	}

	useEffect(() => {
		if (credentials.userName && credentials.password) {
			setInitialValues(credentials);
			setRemember(true);
		}
		setIsLoading(false);
	}, []);

	return !isLoading ? (
		<section className="vh-100 bgc-main">
			<div className="container-fluid h-custom">
				<div className="row d-flex justify-content-center align-items-center h-100">
					<div className="col-md-6 col-lg-4 col-xl-3">
						{/* <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
							className="img-fluid" alt="Sample image" /> */}
						<img src="assets/static/images/logos/logo-deleite-cafe_oscuro.png"
							className="img-fluid" alt="Sample image" />
					</div>
					<div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
						<h1>Inicia sesión</h1>
						<Formik
							initialValues={initialValues}
							onSubmit={handleLogin}
						>
							{({
								values,
								handleChange,
								handleSubmit
							}) => (
								<form onSubmit={handleSubmit}>
									<div className="form-outline mb-4">
										<label className="form-label" htmlFor="form3Example3">Usuario</label>
										<input
											className={`form-control ${errors.userName && "is-invalid"}`}
											type="text"
											id="userName"
											name="userName"
											value={values.userName}
											onChange={handleChange}
											onKeyDown={() => setErrors({ ...errors, userName: "" })}
											placeholder="Usuario"
										/>
										{errors.userName && <div className="invalid-feedback" style={{ fontSize: "14px" }}>{errors.userName}</div>}
									</div>

									<div className="form-outline mb-3">
										<label className="form-label" htmlFor="form3Example4">Contraseña</label>
										<div className="input-group">
											<input
												className={`form-control ${errors.password && "is-invalid"}`}
												type={passwordVisibility ? "text" : "password"}
												id="password"
												name="password"
												value={values.password}
												onChange={handleChange}
												onKeyDown={() => setErrors({ ...errors, password: "" })}
												placeholder="********"
											/>
											<div className="input-group-append">
												<span
													className="input-group-text button-primary"
													style={{
														cursor: "pointer",
														borderColor: "#573c30",
														borderTopLeftRadius: 0,
														borderBottomLeftRadius: 0
													}}
													onClick={() => setPasswordVisibility(!passwordVisibility)}
												>
													{
														passwordVisibility ?
															<i className="bi bi-eye-slash-fill"></i>
															:
															<i className="bi bi-eye-fill"></i>
													}
												</span>
											</div>
											{errors.password && <p className="invalid-feedback" style={{ fontSize: "14px" }}>{errors.password}</p>}
										</div>
									</div>

									<div className="d-flex justify-content-between align-items-center">
										<div className="form-check mb-0">
											<input
												className="form-check-input me-2"
												type="checkbox"
												id="remember"
												onChange={(e) => setRemember(e.target.checked)}
												defaultChecked={remember}
											/>
											<label className="form-check-label" htmlFor="form2Example3">
												Recuérdame
											</label>
										</div>
										{/* <Link to="/account/forgot-password" className="text-body">Forgot password?</Link> */}
									</div>

									<div className="text-center text-lg-start mt-4 pt-2">
										<button
											type="submit"
											className="btn button-primary btn-lg text-white"
											style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
										>
											{
												isLoginLoading ?
													<div className="spinner-border" role="status">
														<span className="sr-only">Loading...</span>
													</div>
													:
													"Iniciar sesión"
											}
										</button>
									</div>

								</form>
							)}
						</Formik>
					</div>
				</div>
			</div>
			<div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5" style={{ background: "#573c30" }}>
				<div className="text-white mb-3 mb-md-0">
					Copyright © 2023. All rights reserved.
				</div>
			</div>
		</section>
	) : <Loading />;
};

export default Login;
