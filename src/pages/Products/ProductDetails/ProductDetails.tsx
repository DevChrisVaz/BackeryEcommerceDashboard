import GetProductByIdUseCase from '@/application/usecases/product/GetProductByIdUseCase';
import Product from '@/domain/entities/Product';
import ProductRepo from '@/infrastructure/implementations/httpRequest/axios/ProductRepo';
import numeral from 'numeral';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export interface ProductDetailsProps { }

const ProductDetails: React.FC<ProductDetailsProps> = () => {
	const [product, setProduct] = useState<Product>({});
	const [isLoading, setIsLoading] = useState(false);
	const [imagePreview, setImagePreview] = useState<string>("");

	const { id } = useParams();
	const navigate = useNavigate();

	const productRepo = new ProductRepo();
	const getProductByIdUseCase = new GetProductByIdUseCase(productRepo);

	const getProductById = async () => {
		try {
			setIsLoading(true);
			const { data, status } = await getProductByIdUseCase.run(id ?? "");
			setImagePreview(process.env.PUBLIC_API_URL + data?.images[0]);
			if (status === 200 && data) setProduct(data);
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			navigate("/error");
		}
	}

	useEffect(() => {
		getProductById();
	}, []);

	return (
		<>
			<nav aria-label="breadcrumb">
				<ol className="breadcrumb">
					{/* <li className="breadcrumb-item"><Link to="#">Home</Link></li> */}
					<li className="breadcrumb-item"><Link to="/products">Productos</Link></li>
					<li className="breadcrumb-item active" aria-current="page">Detalles de producto</li>
				</ol>
			</nav>
			<div className="container-fluid">
				<div className="card">
					<div className="card-body">
						<h3 className="card-title">{product.name}</h3>
						<h6 className="card-subtitle">{product.categoryRef?.name}</h6>
						<div className="row">
							<div className="col-sm-12 col-md-5">
								<div className="white-box text-center">
									<div className="col-12" style={{ height: "600px" }}>
										<div className="img-container" style={{ height: "500" }}>
											<img src={imagePreview} alt="" className="w-100" />
										</div>
										<div className="d-flex" style={{ width: "100%", height: "120px", overflowX: "scroll" }}>
											{!!product.images?.length && product.images.map((img: string, index: number) => (
												<div key={index} className="miniature" onClick={() => setImagePreview(process.env.PUBLIC_API_URL + img)}>
													<img src={process.env.PUBLIC_API_URL + img} alt="" />
												</div>
											))}
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-7 col-md-7 col-sm-12">
								<h4 className="box-title mt-2">Descripción del producto</h4>
								<p>{product.description}</p>
								<p>Tamaño: {product.size}</p>
								<h2 className="mt-5">
									{numeral(product.price).format("$0,0.00")}
									{/* <small className="text-success">(36%off)</small> */}
								</h2>
								{/* <button className="btn btn-rounded button-primary mr-1" style={{ marginRight: "5px" }} data-toggle="tooltip" title="" data-original-title="Add to cart">
									<i className="fa fa-shopping-cart"></i>
								</button>
								<button className="btn btn-rounded button-secondary">Buy Now</button> */}
								<h3 className="box-title mt-5">Tags</h3>
								<div>
									{
										product.tagsRef && product.tagsRef.map((tag, index) => (
											<div key={index} className='tag'>
												<span>{tag.name}</span>
											</div>
										))
									}
								</div>
								{/* <ul className="list-unstyled">
									<li><i className="fa fa-check txt-primary"></i>Sturdy structure</li>
									<li><i className="fa fa-check txt-primary"></i>Designed to foster easy portability</li>
									<li><i className="fa fa-check txt-primary"></i>Perfect furniture to flaunt your wonderful collectibles</li>
								</ul> */}
							</div>
							{/* <div className="col-lg-12 col-md-12 col-sm-12">
								<h3 className="box-title mt-5">Ingredients</h3>
								<div className="table-responsive">
									<table className="table table-striped table-product">
										<tbody>
											<tr>
												<td width="390">Brand</td>
												<td>Stellar</td>
											</tr>
											<tr>
												<td>Delivery Condition</td>
												<td>Knock Down</td>
											</tr>
											<tr>
												<td>Seat Lock Included</td>
												<td>Yes</td>
											</tr>
											<tr>
												<td>Type</td>
												<td>Office Chair</td>
											</tr>
											<tr>
												<td>Style</td>
												<td>Contemporary&amp;Modern</td>
											</tr>
											<tr>
												<td>Wheels Included</td>
												<td>Yes</td>
											</tr>
											<tr>
												<td>Upholstery Included</td>
												<td>Yes</td>
											</tr>
											<tr>
												<td>Upholstery Type</td>
												<td>Cushion</td>
											</tr>
											<tr>
												<td>Head Support</td>
												<td>No</td>
											</tr>
											<tr>
												<td>Suitable For</td>
												<td>Study&amp;Home Office</td>
											</tr>
											<tr>
												<td>Adjustable Height</td>
												<td>Yes</td>
											</tr>
											<tr>
												<td>Model Number</td>
												<td>F01020701-00HT744A06</td>
											</tr>
											<tr>
												<td>Armrest Included</td>
												<td>Yes</td>
											</tr>
											<tr>
												<td>Care Instructions</td>
												<td>Handle With Care,Keep In Dry Place,Do Not Apply Any Chemical For Cleaning.</td>
											</tr>
											<tr>
												<td>Finish Type</td>
												<td>Matte</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div> */}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductDetails;
