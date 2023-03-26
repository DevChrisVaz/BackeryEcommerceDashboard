import React, { ReactNode } from 'react';
export interface ModalProps {
	modalId: string;
	children: ReactNode;
	[x: string]: any;
}

const Modal: React.FC<ModalProps> = ({ children, modalId, size }) => {
	return (
		<div id={modalId} className="modal fade" tabIndex={-1} role="dialog" aria-labelledby={modalId + "Label"}>
			<div className={`modal-dialog ${size && "modal-" + size}`} role="document">
				<div className="modal-content">
					{children}
				</div>
			</div>
		</div>
	);
};

export default Modal;
