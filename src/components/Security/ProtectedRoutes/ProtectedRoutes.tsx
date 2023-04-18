import RefreshUserSessionUseCase from '@/application/usecases/user/RefreshUserSessionUseCase';
import { removeToken, selectToken, setToken } from '@/features/slices/sessionSlice';
import UserRepo from '@/infrastructure/implementations/httpRequest/axios/UserRepo';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import React, { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export interface ProtectedRoutesProps {
	redirectTo: string;
	children: ReactNode;
}

interface TokenData extends JwtPayload {

}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = (props) => {

	const token = useSelector(selectToken);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userRepo = new UserRepo();
	const refreshUserSessionUseCase = new RefreshUserSessionUseCase(userRepo);

	useEffect(() => {
		let interval: any;
		if (token) {
			interval = setInterval(async () => {
				const { exp }: TokenData = jwtDecode(token);
				const currentTime = Date.now() / 1000;
	
				if (exp && exp < currentTime) {
					try {
						const { data, status } = await refreshUserSessionUseCase.run();
						if (status === 200 && data) {
							console.log(data)
							dispatch(setToken(data));
						}
						else {
							dispatch(removeToken());
							// navigate(props.redirectTo);
						}
					} catch {
						dispatch(removeToken());
						// navigate(props.redirectTo)
					}
				}
	
			}, 5000);
		}
		return () => clearInterval(interval);
	}, [token]);

	useEffect(() => {
		if (!token) navigate(props.redirectTo);
	}, [token])
	

	return <>{props.children}</>;
};

export default ProtectedRoutes;
