import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastResponse } from '../../components/Toasts/ToastResponse';
import { ToastOptions } from '../../components/Toasts/ToastResponse/ToastResponse';
export interface IngredientsProps { }

const Ingredients: React.FC<IngredientsProps> = () => {
	const [toastOptions, setToastOptions] = useState<ToastOptions>({
		message: "No se asignó un mensaje",
		type: "primary"
	});

	return (
		<>
			<ToastResponse options={toastOptions} />
			<main className='main-content bgc-grey-100'>
				<div id='mainContent'>
					<Outlet context={{ setToastOptions }} />
				</div>
			</main>
		</>
	);
};

export default Ingredients;
