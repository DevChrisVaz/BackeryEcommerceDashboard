import React from 'react';
import { Link, Outlet } from 'react-router-dom';
export interface EmailProps { }

const Email: React.FC<EmailProps> = () => {
	return (
		<main className='main-content bgc-grey-100'>
			<div id='mainContent'>
				<div className="full-container">
					<div className="email-app">
						<div className="email-side-nav remain-height ov-h">
							<div className="h-100 layers">
								<div className="p-20 bgc-grey-100 layer w-100">
									{/* <a href="compose.html" className="btn btn-danger d-grid">New Message</a> */}
									<Link to="send" className="btn btn-danger d-grid">New Message</Link>
								</div>
								<div className="scrollable pos-r bdT layer w-100 fxg-1">
									<ul className="p-20 nav flex-column">
										<li className="nav-item">
											<a href="javascript:void(0)" className="nav-link c-grey-800 cH-blue-500 actived">
												<div className="peers ai-c jc-sb">
													<div className="peer peer-greed">
														<i className="mR-10 ti-email"></i>
														<span>Inbox</span>
													</div>
													<div className="peer">
														<span className="badge rounded-pill bgc-deep-purple-50 c-deep-purple-700">+99</span>
													</div>
												</div>
											</a>
										</li>
										<li className="nav-item">
											<a href="" className="nav-link c-grey-800 cH-blue-500">
												<div className="peers ai-c jc-sb">
													<div className="peer peer-greed">
														<i className="mR-10 ti-share"></i>
														<span>Sent</span>
													</div>
													<div className="peer">
														<span className="badge rounded-pill bgc-green-50 c-green-700">12</span>
													</div>
												</div>
											</a>
										</li>
										<li className="nav-item">
											<a href="" className="nav-link c-grey-800 cH-blue-500">
												<div className="peers ai-c jc-sb">
													<div className="peer peer-greed">
														<i className="mR-10 ti-star"></i>
														<span>Important</span>
													</div>
													<div className="peer">
														<span className="badge rounded-pill bgc-blue-50 c-blue-700">3</span>
													</div>
												</div>
											</a>
										</li>
										<li className="nav-item">
											<a href="" className="nav-link c-grey-800 cH-blue-500">
												<div className="peers ai-c jc-sb">
													<div className="peer peer-greed">
														<i className="mR-10 ti-file"></i>
														<span>Drafts</span>
													</div>
													<div className="peer">
														<span className="badge rounded-pill bgc-amber-50 c-amber-700">5</span>
													</div>
												</div>
											</a>
										</li>
										<li className="nav-item">
											<a href="" className="nav-link c-grey-800 cH-blue-500">
												<div className="peers ai-c jc-sb">
													<div className="peer peer-greed">
														<i className="mR-10 ti-alert"></i>
														<span>Spam</span>
													</div>
													<div className="peer">
														<span className="badge rounded-pill bgc-red-50 c-red-700">1</span>
													</div>
												</div>
											</a>
										</li>
										<li className="nav-item">
											<a href="" className="nav-link c-grey-800 cH-blue-500">
												<div className="peers ai-c jc-sb">
													<div className="peer peer-greed">
														<i className="mR-10 ti-trash"></i>
														<span>Trash</span>
													</div>
													<div className="peer">
														<span className="badge rounded-pill bgc-red-50 c-red-700">+99</span>
													</div>
												</div>
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<Outlet />
					</div>
				</div>
			</div>
		</main>
	);
};

export default Email;
