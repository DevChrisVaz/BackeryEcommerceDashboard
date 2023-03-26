import React, { useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { Formik } from "formik";
import Category from "../../../domain/entities/Category";
import CategoryErrors from '../../../domain/entities/errors/CategoryErrors';
import CategoryRepo from '../../../infrastructure/implementations/httpRequest/axios/CategoryRepo';
import CreateCategoryUseCase from '../../../application/usecases/category/CreateCategoryUseCase';
import CategoryValidationsRepo from '../../../infrastructure/implementations/validations/CategoryValidationsRepo';
import CreateCategoryException from '../../../domain/exceptions/category-exceptions/CreateCategoryException';
import { Loading } from '../../../components/Loading';
import { showResponseToast } from '../../../components/Toasts/ToastResponse/logic';
import CategoryAlreadyExistsException from '../../../domain/exceptions/category-exceptions/CategoryAlreadyExistsException';

export interface CreateCategoryProps { }

const CreateCategory: React.FC<CreateCategoryProps> = () => {
	const [errors, setErrors] = useState<CategoryErrors>({});
	const [isLoading, setIsLoading] = useState(false);

	const categoryRepo = new CategoryRepo();
	const categoryValidationRepo = new CategoryValidationsRepo();
	const createCategoryUseCase = new CreateCategoryUseCase(categoryRepo, categoryValidationRepo);

	const initialValues: Category = {
		name: "",
		description: "",
		type: ""
	}

	const navigate = useNavigate();
	const { setToastOptions } = useOutletContext<any>();

	const submitForm = async (values: Category) => {
		try {
			setIsLoading(true);
			const { data, status } = await createCategoryUseCase.run(values);
			if (status === 201) {
				setToastOptions({
					message: "Categoría " + data?.name + " creada con éxito",
					type: "success"
				});
				showResponseToast();
				navigate(-1);
			}
			setIsLoading(false);
		} catch (error: any) {
			setIsLoading(false);
			if (error instanceof CreateCategoryException && error.cause) {
				setErrors(error.cause);
			}
			else if (error.response.data.name === "CategoryAlreadyExists") {
				setToastOptions({
					message: "La categoría ya existe",
					type: "danger"
				});
				showResponseToast();
			}
			else {
				navigate("/error");
			}
		}
	}

	return isLoading ? <Loading /> : (
		<>
			<nav aria-label="breadcrumb">
				<ol className="breadcrumb">
					<li className="breadcrumb-item"><Link to="/categories">Categorías</Link></li>
					<li className="breadcrumb-item active" aria-current="page">Agregar categoría</li>
				</ol>
			</nav>
			<div className="bgc-white p-20 bd col-md-4 col-sm-12">
				<h6 className="c-grey-900">Nueva categoría</h6>
				<div className="mT-30">
					<Formik
						initialValues={initialValues}
						onSubmit={submitForm}
					>
						{({
							values,
							handleChange,
							handleSubmit
						}) => (
							<form onSubmit={handleSubmit}>
								<div className="mb-3">
									<label className="form-label" htmlFor="name">Nombre</label>
									<input
										className={`form-control ${errors.name && "is-invalid"}`}
										aria-describedby="emailHelp"
										type="text"
										id="name"
										name="name"
										placeholder="Nombre de la categoría"
										value={values.name}
										onChange={handleChange}
									/>
									{errors.name && <div className="text-danger">{errors.name}</div>}
								</div>
								<div className="mb-3">
									<label className="form-label" htmlFor="description">Descripción</label>
									<textarea
										className={`form-control ${errors.description && "is-invalid"}`}
										style={{ resize: "none" }}
										rows={3}
										id="description"
										name="description"
										placeholder="Descripción de la categoría..."
										value={values.description}
										onChange={handleChange}
									/>
									{errors.description && <div className="text-danger">{errors.description}</div>}
								</div>
								<div className="mb-3">
									<label className="form-label" htmlFor="type">Tipo</label>
									<select 
										className="form-select"
										id='type'
										name='type'
										value={values.type}
										onChange={handleChange}
									>
										<option selected>Seleccione un tipo</option>
										<option value="CATEGORY">Categoría principal</option>
										<option value="TAG">Subcategoría</option>
									</select>
								</div>
								<div className="col text-end">
									<button type="submit" className="btn button-primary btn-color" style={{ marginRight: "15px" }}>Agregar</button>
									<Link to="/categories"><button type="button" className="btn btn-danger text-light">Cancelar</button></Link>
								</div>
							</form>
						)}
					</Formik>
				</div>
			</div>
		</>
	);
};

export default CreateCategory;
