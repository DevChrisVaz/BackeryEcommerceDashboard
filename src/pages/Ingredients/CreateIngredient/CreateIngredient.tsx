import React, { useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { Formik } from "formik";
import { Loading } from '../../../components/Loading';
import IngredientRepo from '../../../infrastructure/implementations/httpRequest/axios/IngredientRepo';
import CreateIngredientUseCase from '../../../application/usecases/ingredient/CreateIngredientUseCase';
import Ingredient from '../../../domain/entities/Ingredient';
import { showResponseToast } from '../../../components/Toasts/ToastResponse/logic';

export interface CreateIngredientProps { }

const CreateCategory: React.FC<CreateIngredientProps> = () => {
	// const [errors, setErrors] = useState<CategoryErrors>({});
	const [isLoading, setIsLoading] = useState(false);

	const ingredientRepo = new IngredientRepo();
	// const categoryValidationRepo = new CategoryValidationsRepo();
	const createIngredientUseCase = new CreateIngredientUseCase(ingredientRepo, /* categoryValidationRepo */);

	const initialValues: Ingredient = {}

	const navigate = useNavigate();
	const { setToastOptions } = useOutletContext<any>();

	const submitForm = async (values: Ingredient) => {
		try {
			setIsLoading(true);
			const { status } = await createIngredientUseCase.run(values);
			setIsLoading(false);
			if (status === 201) {
				setToastOptions({
					message: "Ingrediente creado con éxito",
					type: "success"
				});
				await showResponseToast();
				navigate(-1);
			}
		} catch (error: any) {
			setIsLoading(false);
			// if(error instanceof CreateCategoryException && error.cause) setErrors(error.cause);
			/* else */ navigate("/error");
		}
	}

	return isLoading ? <Loading /> : (
		<>
			<nav aria-label="breadcrumb">
				<ol className="breadcrumb">
					<li className="breadcrumb-item"><Link to="/ingredients">Ingredients</Link></li>
					<li className="breadcrumb-item active" aria-current="page">Agregar ingrediente</li>
				</ol>
			</nav>
			<div className="bgc-white p-20 bd col-md-4 col-sm-12">
				<h6 className="c-grey-900">Nuevo ingrediente</h6>
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
									// className={`form-control ${errors.name && "is-invalid"}`}
									className={"form-control"}
									aria-describedby="name"
									type="text"
									id="name"
									name="name"
									placeholder="Nombre del ingrediente"
									value={values.name}
									onChange={handleChange}
								/>
								{/* { errors.name && <div className="text-danger">{errors.name}</div> } */}
							</div>
							<div className="mb-3">
								<label className="form-label" htmlFor="description">Unidad de medida</label>
								<input
									// className={`form-control ${errors.description && "is-invalid"}`}
									type="text"
									className={"form-control"}
									style={{ resize: "none" }}
									id="unitOfMeasure"
									name="unitOfMeasure"
									placeholder="Descripción de la categoría..."
									value={values.unitOfMeasure}
									onChange={handleChange}
								/>
								{/* { errors.description && <div className="text-danger">{errors.description}</div> } */}
							</div>
							<div className="mb-3">
								<label className="form-label" htmlFor="description">Costo</label>
								<input
									// className={`form-control ${errors.description && "is-invalid"}`}
									type="number"
									className={"form-control"}
									style={{ resize: "none" }}
									id="cost"
									name="cost"
									placeholder="Descripción de la categoría..."
									value={values.cost}
									onChange={handleChange}
								/>
								{/* { errors.description && <div className="text-danger">{errors.description}</div> } */}
							</div>
							<div className="col text-end">
								<button type="submit" className="btn button-primary btn-color" style={{ marginRight: "15px" }}>Agregar</button>
								<Link to="/ingredients"><button type="button" className="btn btn-danger text-light">Cancelar</button></Link>
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
