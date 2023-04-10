import React, { useState } from 'react';
export interface CakeOptionsProps {}

const CakeOptions : React.FC<CakeOptionsProps> = () => {
	const [flavors, setFlavors] = useState([]);
	
	const flavorTableHeader = [
		{
			id: "name",
			name: "Nombre"
		},
		{
			id: "description",
			name: "Descripción"
		},
		{
			id: "type",
			name: "Tipo"
		}
	];

	return (
		<>
		</>
	);
};

export default CakeOptions;
