import React from 'react';
import { Grid } from 'react-loader-spinner';

export interface LoadingProps {};

const Loading: React.FC<LoadingProps> = () => {
	return (
		<div className="w-100 d-flex justify-content-center align-items-center" style={{ height: "calc(100vh - 65px)" }}>
			<Grid
				visible={true}
				height="80"
				width="80"
				color="#573c30"
				ariaLabel="grid-loading"
				wrapperStyle={{}}
				wrapperClass="dna-wrapper"
			/>
		</div>
	)
}

export default Loading;
