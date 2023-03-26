import { Toast } from 'bootstrap';
import React from 'react';

export interface ToastResponseProps {
	options: ToastOptions;
}

export interface ToastOptions {
	message: string;
	type: string;
}

const ToastResponse: React.FC<ToastResponseProps> = ({ options }) => {

	const getIcon = () => {
		let icon: any;
		switch (options.type) {
			case "success":
				icon = <i className="bi bi-check-circle-fill" style={{ marginRight: "10px", fontSize: "24px" }} />;
				break;
			case "danger":
				icon = <i className="bi bi-x-circle-fill" style={{ marginRight: "10px", fontSize: "24px" }} />
				break;
			default:
				icon = <i className="bi bi-info-circle-fill" style={{ marginRight: "10px", fontSize: "24px" }} />
				break;
		}

		return icon;
	}

	return (
		<div className="toast-container p-3" style={{ top: "75px", right: "15px" }} id="toastPlacement">
			<div id="toastResponse" className={`toast align-items-center text-bg-${options.type ?? "primary"} border-0`} role="alert" aria-live="assertive" aria-atomic="true">
				<div className="d-flex">
					<div className="toast-body text-white" style={{ fontSize: "16px" }}>
						<div className="d-flex align-items-center">
							{getIcon()}
							<span>{options.message}</span>
						</div>
					</div>
					<button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
				</div>
			</div>
		</div>
	);
};

export default ToastResponse;
