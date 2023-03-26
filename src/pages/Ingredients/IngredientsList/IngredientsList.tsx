import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DataTable } from '../../../components/DataTable';
import Ingredient from '../../../domain/entities/Ingredient';
import { Loading } from '../../../components/Loading';
import IngredientRepo from '../../../infrastructure/implementations/httpRequest/axios/IngredientRepo';
import GetAllIngredientsUseCase from '../../../application/usecases/ingredient/GetAllIngredientsUseCase';
import { Header } from '../../../components/DataTable/typeDefs';

export interface IngredientsListProps { }

const IngredientsList: React.FC<IngredientsListProps> = () => {
	const [ingredients, setIngredients] = useState<Ingredient[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const ingredientRepo = new IngredientRepo();
	const getAllIngredientsUseCase = new GetAllIngredientsUseCase(ingredientRepo);

	const navigate = useNavigate();
	// const [setLoading] = useOutletContext<any>();

	const tableHeader: Header[] = [
		{
			id: "name",
			name: "Nombre"
		},
		{
			id: "unitOfMeasure",
			name: "Unidad de medida"
		},
		{
			id: "cost",
			name: "Costo",
			price: true
		}
	];

	const getAllIngredients = async () => {
		try {
			setIsLoading(true);
			const { data, status } = await getAllIngredientsUseCase.run();
			if (status === 200 && data) setIngredients(data);
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			navigate("/error");
		}
	}

	useEffect(() => {
		getAllIngredients();
	}, []);


	return isLoading ? <Loading /> :
		(
			<>
				<nav aria-label="breadcrumb">
					<ol className="breadcrumb">
						<li className="breadcrumb-item active" aria-current="page">Ingredients</li>
					</ol>
				</nav>
				<div id="mainContent">
					<div className="container-fluid">
						<div className="d-flex justify-content-between">
							<h4 className="c-grey-900 mT-10 mB-30">Ingredients</h4>
							<Link to="new">
								<button
									type="button"
									className="btn button-primary btn-color"
								>Agregar</button>
							</Link>
						</div>
						<div className="row">
							<div className="col-md-12">
								<div className="bgc-white bd bdrs-3 p-20 mB-20">
									<DataTable columns={tableHeader} rows={ingredients} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
};

export default IngredientsList;
