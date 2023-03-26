import { Formik } from 'formik';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import GetAllCategoriesUseCase from '../../../application/usecases/category/GetAllCategoriesUseCase';
import CreateProductUseCase from '../../../application/usecases/product/CreateProductUseCase';
import { ImagePreviewInput } from '../../../components/imageInput/ImagePreviewInput';
import { Loading } from '../../../components/Loading';
import { showResponseToast } from '../../../components/Toasts/ToastResponse/logic';
import Category from '../../../domain/entities/Category';
import Product from '../../../domain/entities/Product';
import CategoryRepo from '../../../infrastructure/implementations/httpRequest/axios/CategoryRepo';
import ProductRepo from '../../../infrastructure/implementations/httpRequest/axios/ProductRepo';

export interface CreateProductProps { }

const CreateProduct: React.FC<CreateProductProps> = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [tags, setTags] = useState<Category[]>([]);
	const [selectedTags, setSelectedTags] = useState<Category[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const initialValues: Product = {
		tags: []
	};

	const productRepo = new ProductRepo();
	const createProductUseCase = new CreateProductUseCase(productRepo);

	const categoryRepo = new CategoryRepo();
	const getAllCategoriesUseCase = new GetAllCategoriesUseCase(categoryRepo);

	const navigate = useNavigate();
	const { setToastOptions } = useOutletContext<any>();

	const getAllCategories = async () => {
		try {
			setIsLoading(true);
			const { data, status } = await getAllCategoriesUseCase.run();
			if (status === 200 && data) {
				setCategories(data.filter(c => c.type === "CATEGORY"));
				setTags(data.filter(c => c.type === "TAG"))
			}
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			navigate("/error");
		}
	}

	const handleTagsChange = (e: any, values: Product, setValues: any) => {
		let newArray = values.tags && values.tags.length > 0 ? [...values.tags] : [];
		let selected = tags.filter(t => t.uuid === e.target.value);
		setValues({
			...values,
			tags: [...newArray, e.target.value]
		});
		setSelectedTags([
			...selectedTags, 
			...selected
		]);
		setTags(tags.filter(t => t.uuid !== e.target.value));
	}

	const unselectTag = (tag: Category, values: Product, setValues: any) => {
		// let newArray = values.tags && values.tags.length > 0 ? [...values.tags] : [];
		// let selected = tags.filter(t => t.uuid === e.target.value);
		setValues({
			...values,
			tags: values.tags?.filter(t => t !== tag.uuid)
		});
		setSelectedTags(selectedTags.filter(t => t.uuid !== tag.uuid));
		setTags([...tags, tag]);
	}

	const submitForm = async (values: Product) => {
		try {
			setIsLoading(true);
			const { data, status } = await createProductUseCase.run(values);
			if (status === 201) {
				await setToastOptions({
					message: "Producto " + data?.name + " creado con éxito",
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

	// const handleUpdateFiles = (pictures: any) => setValues({ ...values, images: pictures });

	useEffect(() => {
		getAllCategories();
	}, []);


	return isLoading ? <Loading /> : (
		<>
			<nav aria-label="breadcrumb">
				<ol className="breadcrumb">
					<li className="breadcrumb-item"><Link to="/products">Productos</Link></li>
					<li className="breadcrumb-item active" aria-current="page">Agregar producto</li>
				</ol>
			</nav>
			<div className="bgc-white p-20 bd col-12">
				<h6 className="c-grey-900">Nuevo producto</h6>
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
								<div className="col-md-4 col-sm-12">
									<div className="mb-3">
										<label htmlFor="imagen" className="form-label">Imágenes</label>
										<div className="form-control">
											<ImagePreviewInput
												maxFiles={5}
												multiple
												updateFilesCb={
													(pictures: any) => setValues({
														...values,
														images: pictures
													})
												}
											// initialImages={oldImages.map(image => image.url)}
											/>
										</div>
									</div>
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
												placeholder="Nombre de producto"
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
											<label className="form-label" htmlFor="tipo">Tags</label>
											<select
												className="form-select"
												id="tags"
												name="tags"
												value={values.tags}
												onChange={(e) => handleTagsChange(e, values, setValues)}
											>
												<option value="" selected>Elige una categoría</option>
												{
													tags.sort((a, b) => {
														if(a.name && b.name) {
															if(a.name < b.name) {
																return -1;
															} else if (a.name && a.name > b.name && b.name) {
																return 1;
															} else {
																return 0;
															}
														} else {
															return 0;
														}
													}).map((tag) => {
														return <option key={tag.uuid} value={tag.uuid}>{tag.name}</option>
													})
												}
											</select>
										</div>
										<div className="col-md-4">
											<label className="form-label" htmlFor="tamanio">Tamaño</label>
											<input
												className="form-control"
												type="text"
												id="size"
												name="size"
												placeholder="Tamaño de producto"
												value={values.size}
												onChange={handleChange}
											/>
										</div>
										<div>
											{
												selectedTags.map((tag, index) => (
													<button key={index} type="button" className='tag' onClick={() => unselectTag(tag, values, setValues)}>
														<span>{tag.name}</span>
														<i className="bi bi-x" />
													</button>
												))
											}
										</div>
										<div className="col-md-12">
											<label className="form-label" htmlFor="exampleFormControlTextarea1">Descripción</label>
											<textarea
												className="form-control"
												style={{ resize: "none" }}
												rows={3}
												id="description"
												name="description"
												value={values.description}
												onChange={handleChange}
												placeholder="Descripción del producto..."
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

export default CreateProduct;
