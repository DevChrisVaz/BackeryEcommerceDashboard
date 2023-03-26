import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logic from './logic';
import { Header } from './typeDefs';
import numeral from "numeral";
import { Modal } from '../Modal';

export interface DataTableProps<T> {
	columns: Header[];
	rows: T[];
	footbar?: boolean;
	linked?: boolean;
	actions?: Actions;
}

interface Actions {
	delete?: (registry: any) => void;
}

const DataTable: React.FC<DataTableProps<any>> = (props) => {
	const navigate = useNavigate();

	useEffect(() => {
		logic();
	}, []);

	return (
		<>
			
			<table id="dataTable" className="table table-striped table-bordered" cellSpacing={0} width="100%">
				<thead>
					<tr>
						{
							props.columns.length > 0 && props.columns.map((column, index) => {
								return <th key={index}>{column.name ?? ""}</th>
							})
						}
						{
							props.actions && <th>Acciones</th>
						}
					</tr>
				</thead>
				{
					props.footbar &&
					<tfoot>
						<tr>
							{
								props.columns.length > 0 && props.columns.map((column, index) => {
									return <th key={index}>{column.name ?? ""}</th>
								})
							}
							{
								props.actions && <th>Acciones</th>
							}
						</tr>
					</tfoot>
				}
				<tbody>
					{
						props.rows.length > 0 && props.columns.length > 0 && props.rows.map(row => {
							return (
								<tr style={{ cursor: props.linked ? "Pointer" : "" }} key={row.id} onClick={() => props.linked && navigate(row.uuid)}>
									{
										props.columns.map(column => {
											return (
												<td key={column.id}>{
													column.price ? numeral(row[column.id]).format("$0,0.00") :
														row[column.id]
												}</td>
											)
										})
									}
									{
										props.actions && (
											<td>
												<div>
													<button className="btn button-primary button-rounded text-white"><i className="bi bi-eye-fill"></i></button>
													<button className="btn button-secondary button-rounded text-white"><i className="bi bi-pencil-fill"></i></button>
													<button 
														className="btn btn-danger button-rounded text-white"
														onClick={(e:any) =>{ e.stopPropagation(), props.actions?.delete && props.actions.delete(row)}}
													><i className="bi bi-trash-fill"></i></button>
												</div>
											</td>
										)
									}
								</tr>
							)
						})
					}
				</tbody>
			</table>
		</>
	);
};

export default DataTable;
