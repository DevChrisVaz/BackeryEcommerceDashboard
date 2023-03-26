import React from 'react';
import { Link } from 'react-router-dom';
export interface ErrorProps { }

const Error: React.FC<ErrorProps> = () => {
	return (
		<>
			<div className='pos-a t-0 l-0 bgc-white w-100 h-100 d-f fxd-r fxw-w ai-c jc-c pos-r p-30'>
				<div className='mR-60' style={{ width: "350px", height: "350px", overflow: "hidden" }}>
					<img alt='#' style={{ width: "100%", height: "100%", objectFit: "contain" }} src='assets/static/images/500.jpg' />
				</div>

				<div className='d-f jc-c fxd-c'>
					<h1 className='mB-30 fw-900 lh-1 c-red-500' style={{ fontSize: "60px" }}>500</h1>
					<h3 className='mB-10 fsz-lg c-grey-900 tt-c'>Algo salió mal</h3>
					<p className='mB-30 fsz-def c-grey-700'>Algo anda mal con nuestro servidores, Por favor, inténtalo de nuevo más tarde.</p>
					<div>
						<Link to="/" type='primary' className='btn btn-primary'>Go to Home</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Error;
