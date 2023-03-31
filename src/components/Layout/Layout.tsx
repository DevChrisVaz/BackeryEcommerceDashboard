import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Navbar } from '../Navbar';
import { ProtectedRoutes } from '../Security/ProtectedRoutes';
import { Sidebar } from '../Sidebar';
import { selectToken } from '../../features/slices/sessionSlice';
export interface LayoutProps { }

const Layout: React.FC<LayoutProps> = () => {

	return (
		<ProtectedRoutes redirectTo="/login">
			<Sidebar />
			<div className="page-container">
				<Navbar />
				<Outlet />
			</div>
		</ProtectedRoutes>
	);
};

export default Layout;
