import React from 'react';
import { Link } from 'react-router-dom';
export interface NotFoundProps { }

const NotFound: React.FC<NotFoundProps> = () => {
	return (
		<>
			<div className='pos-a t-0 l-0 bgc-white w-100 h-100 d-f fxd-r fxw-w ai-c jc-c pos-r p-30'>
				<div className='mR-60' style={{ width: "350px", height: "350px", overflow: "hidden" }}>
					<img alt='#' style={{ width: "100%", height: "100%", objectFit: "contain" }} src='assets/static/images/404.jpg' />
				</div>

				<div className='d-f jc-c fxd-c'>
					<h1 className='mB-30 fw-900 lh-1 c-red-500' style={{ fontSize: "60px" }}>404</h1>
					<h3 className='mB-10 fsz-lg c-grey-900 tt-c'>Oops Página no encontrada</h3>
					<p className='mB-30 fsz-def c-grey-700'>La página que estás buscando no existe o ha sido eliminada.</p>
					<div>
						<Link to="/" className="btn btn-primary">Volver a inicio</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default NotFound;
