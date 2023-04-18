import React from 'react';
import { Link } from 'react-router-dom';
export interface GalleryItemsListProps { }

const GalleryItemsList: React.FC<GalleryItemsListProps> = () => {
	return (
		<>
			<nav aria-label="breadcrumb">
				<ol className="breadcrumb">
					<li className="breadcrumb-item active" aria-current="page">Galería</li>
				</ol>
			</nav>
			<div id="mainContent">
				<div className="container-fluid">
					<div className="d-flex justify-content-between">
						<h4 className="c-grey-900 mT-10 mB-30">Pasteles personalizados</h4>
						<Link to="new">
							<button
								type="button"
								className="btn button-primary btn-color"
							>Agregar</button>
						</Link>
					</div>
					<div className="row">
						<div className="col-md-12">
							<div className="col-sm-12 col-md-3 bgc-white bd bdrs-3 p-20 mB-20">
								<div className="card" style={{ width: "18rem" }}>
									<img src="..." className="card-img-top" alt="..." />
									<div className="card-body">
										<h5 className="card-title">Card title</h5>
										<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
										<a href="#" className="btn btn-primary">Go somewhere</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default GalleryItemsList;
