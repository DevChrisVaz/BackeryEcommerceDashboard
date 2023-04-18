import { ImageProfileInput } from '@/components/imageInput/ImageProfileInput';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
export interface CreateGalleryItemProps { }

const CreateGalleryItem: React.FC<CreateGalleryItemProps> = () => {
	const [initialValues, setInitialValues] = useState<any>({});

	const submitForm = async () => {

	}

	return (
		<>
			<nav aria-label="breadcrumb">
				<ol className="breadcrumb">
					<li className="breadcrumb-item"><Link to="/toppings">Galería</Link></li>
					<li className="breadcrumb-item active" aria-current="page">Agregar Diseño</li>
				</ol>
			</nav>
			<div className="bgc-white p-20 bd">
				<h6 className="c-grey-900">Nuevo Diseño</h6>
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
										{/* <div className="col-md-4">
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
										</div> */}
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
	);
};

export default CreateGalleryItem;
