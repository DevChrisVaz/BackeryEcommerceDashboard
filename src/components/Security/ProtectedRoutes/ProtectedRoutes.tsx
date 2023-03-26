import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export interface ProtectedRoutesProps {
	condition: boolean;
	redirectTo: string;
	children: ReactNode;
}

const ProtectedRoutes : React.FC<ProtectedRoutesProps> = (props) => {
	if (!props.condition) {
		return <Navigate to={props.redirectTo} />
	}

	return <>{props.children}</>;
};

export default ProtectedRoutes;
