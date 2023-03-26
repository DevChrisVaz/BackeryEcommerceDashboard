import React from 'react';
export interface SendProps { }

const Send: React.FC<SendProps> = () => {
	return (
		<div className="email-wrapper row remain-height pos-r scrollable bgc-white">
			<div className="email-content open no-inbox-view">
				<div className="email-compose">
					<div className="d-n@md+ p-20">
						<a className="email-side-toggle c-grey-900 cH-blue-500 td-n" href="javascript:void(0)">
							<i className="ti-menu"></i>
						</a>
					</div>
					<form className="email-compose-body">
						<h4 className="c-grey-900 mB-20">Send Message</h4>
						<div className="send-header">
							<div className="mb-3">
								<input type="text" className='form-control' placeholder="To" />
							</div>
							<div className="mb-3">
								<input type="text" className='form-control' placeholder="CC" />
							</div>
							<div className="mb-3">
								<input className="form-control" placeholder="Email Subject" />
							</div>
							<div className="mb-3">
								<textarea name="compose" className="form-control" placeholder="Say Hi..." rows={10}></textarea>
							</div>
						</div>
						<div id="compose-area"></div>
						<div className="text-end mrg-top-30">
							<button className="btn btn-danger btn-color">Send</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Send;
