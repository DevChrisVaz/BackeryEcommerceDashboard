import GetAllCategoriesUseCase from '@/application/usecases/category/GetAllCategoriesUseCase';
import CreateToppingUseCase from '@/application/usecases/topping/CreateToppingUseCase';
import { Loading } from '@/components/Loading';
import { showResponseToast } from '@/components/Toasts/ToastResponse/logic';
import { ImageProfileInput } from '@/components/imageInput/ImageProfileInput';
import Category from '@/domain/entities/Category';
import Topping from '@/domain/entities/Topping';
import { selectToken } from '@/features/slices/sessionSlice';
import CategoryRepo from '@/infrastructure/implementations/httpRequest/axios/CategoryRepo';
import ToppingRepo from '@/infrastructure/implementations/httpRequest/axios/ToppingRepo';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
export interface CreateToppingProps {}

const CreateTopping : React.FC<CreateToppingProps> = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const initialValues: Topping = {
		name: "",
		unitOfMeasure: "",
		price: 0
	};

	const toppingRepo = new ToppingRepo();
	const createToppingUseCase = new CreateToppingUseCase(toppingRepo);

	const categoryRepo = new CategoryRepo();
	const getAllCategoriesUseCase = new GetAllCategoriesUseCase(categoryRepo);

	const navigate = useNavigate();
	const { setToastOptions } = useOutletContext<any>();
	const token = useSelector(selectToken);

	const getAllCategories = async () => {
		try {
			setIsLoading(true);
			const { data, status } = await getAllCategoriesUseCase.run();
			if (status === 200 && data) {
				setCategories(data.filter(c => c.type === "TOPPING"));
			}
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			navigate("/error");
		}
	}

	const submitForm = async (values: Topping) => {
		try {
			setIsLoading(true);
			const { data, status } = await createToppingUseCase.run(values, token);
			if (status === 201) {
				await setToastOptions({
					message: "Topping " + data?.name + " creado con éxito",
					type: "success"
				});
				showResponseToast();
				navigate(-1);
			}
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		getAllCategories();
	}, []);

	return isLoading ? <Loading /> : (
		<>
			<nav aria-label="breadcrumb">
				<ol className="breadcrumb">
					<li className="breadcrumb-item"><Link to="/toppings">Toppings</Link></li>
					<li className="breadcrumb-item active" aria-current="page">Agregar topping</li>
				</ol>
			</nav>
			<div className="bgc-white p-20 bd col-12">
				<h6 className="c-grey-900">Nuevo topping</h6>
				<div className="mT-30">
					<Formik
						initialValues={initialValues}
						onSubmit={submitForm}
					>
						{({
							values,
							setValues,
							handleChange,
							handleSubmit
						}) => (
							<form onSubmit={handleSubmit} className="row needs-validation" noValidate>
								<div className="col-md-4 col-sm-12 d-flex justify-content-center mb-5">
									<ImageProfileInput size="300px" updatePictureCb={(image: File) => setValues({
										...values, image
									})} radius="20px" />
								</div>
								<div className="col-md-8 col-sm-12">
									<div className="row g-3">
										<div className="col-md-7">
											<label className="form-label" htmlFor="titulo">Nombre</label>
											<input
												className="form-control"
												type="text"
												id="name"
												name="name"
												placeholder="Nombre del topping"
												value={values.name}
												onChange={handleChange}
											/>
										</div>
										<div className="col-md-5">
											<label className="form-label" htmlFor="costo">Precio</label>
											<input
												className="form-control"
												type="number"
												id="price"
												name="price"
												placeholder="$0.00"
												value={values.price}
												onChange={handleChange}
											/>
										</div>
										<div className="col-md-4">
											<label className="form-label" htmlFor="tipo">Categoría</label>
											<select
												className="form-select"
												id="category"
												name="category"
												value={values.category}
												onChange={handleChange}
											>
												<option value="" selected>Elige una categoría</option>
												{
													categories.map((category) => {
														return <option key={category.uuid} value={category.uuid}>{category.name}</option>
													})
												}
											</select>
										</div>
										<div className="col-md-4">
											<label className="form-label" htmlFor="unitOfMeasure">Cantidad</label>
											<input
												className="form-control"
												type="text"
												id="unitOfMeasure"
												name="unitOfMeasure"
												placeholder="Cantidad"
												value={values.unitOfMeasure}
												onChange={handleChange}
											/>
										</div>
										<div className="col-12 text-end">
											<button type="submit" className="btn button-primary btn-color" style={{ marginRight: "15px" }}>Agregar</button>
											<Link to="/products"><button type="button" className="btn btn-danger text-light">Cancelar</button></Link>
										</div>
									</div>
								</div>
							</form>
						)}
					</Formik>
				</div>
			</div>
		</>
	)
};

export default CreateTopping;
