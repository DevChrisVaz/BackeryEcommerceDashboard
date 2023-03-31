import DeleteCommentUseCase from '@/application/usecases/comment/DeleteCommentUseCase';
import GetAllCommentsUseCase from '@/application/usecases/comment/GetAllCommentUseCase';
import UpdateCommentUseCase from '@/application/usecases/comment/UpdateCommentUseCase';
import { showResponseToast } from '@/components/Toasts/ToastResponse/logic';
import Comment from '@/domain/entities/Comment';
import { selectToken } from '@/features/slices/sessionSlice';
import { getDate } from '@/helpers/dateHelper';
import CommentRepo from '@/infrastructure/implementations/httpRequest/axios/CommentRepo';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
export interface CommentsListProps { }

const CommentsList: React.FC<CommentsListProps> = () => {
	const [comments, setComments] = useState<Comment[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const commentRepo = new CommentRepo();
	const getAllCommentsUseCase = new GetAllCommentsUseCase(commentRepo);
	const deleteCommentUseCase = new DeleteCommentUseCase(commentRepo);
	const updateCommentUseCase = new UpdateCommentUseCase(commentRepo);

	const navigate = useNavigate();
	const { setToastOptions } = useOutletContext<any>();
	const token = useSelector(selectToken);

	const getAllComments = async () => {
		try {
			setIsLoading(true);
			const { data, status } = await getAllCommentsUseCase.run(token);
			if (status === 200 && data) setComments(data);
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			navigate("/error");
		}
	}

	const updateComment = async (comment: Comment, newStatus: string) => {
		try {
			setIsLoading(true);
			if (comment.uuid) {
				comment.status = newStatus;
				const { data, status } = await updateCommentUseCase.run(comment.uuid, comment, token);
				if (status === 200) {
					setToastOptions({
						message: "Comentario actualizado con éxito",
						type: "success"
					});
					showResponseToast();
				}
				await getAllComments();
				setIsLoading(false);
			} else {
				throw new Error("No se cargó el registro");
			}
		} catch (err) {
			setIsLoading(false);
			alert(err);
		}
	}

	const deleteComment = async (uuid: string) => {
		try {
			setIsLoading(true);
			const { data, status } = await deleteCommentUseCase.run(uuid, token);
			if (status === 200) {
				setToastOptions({
					message: "Comentario eliminada con éxito",
					type: "success"
				});
				showResponseToast();
			}
			await getAllComments();
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			alert(err);
		}
	}

	useEffect(() => {
		getAllComments();
	}, []);

	return (
		<>
			<nav aria-label="breadcrumb">
				<ol className="breadcrumb">
					<li className="breadcrumb-item active" aria-current="page">Comments</li>
				</ol>
			</nav>
			<div className="mainContent">
				<div className="container-fluid">
					<div className="d-flex justify-content-between">
						<h4 className="c-grey-900 mT-10 mB-30">Comentarios</h4>
					</div>
					<div className="row gap-3">
						{
							isLoading ?
								<>
									<div className="card shadow-sm p-3 mb-5 bg-white rounded" style={{ width: "18rem" }} aria-hidden="true">
										{/* <img src="..." className="card-img-top" alt="..." /> */}
										<div className="card-body">
											<h5 className="card-title placeholder-glow">
												<span className="placeholder col-6"></span>
											</h5>
											<p className="card-text placeholder-glow">
												<span className="placeholder col-7"></span>
												<span className="placeholder col-4"></span>
												<span className="placeholder col-4"></span>
												<span className="placeholder col-6"></span>
												<span className="placeholder col-8"></span>
											</p>
											{/* <a href="#" tabindex="-1" className="btn btn-primary disabled placeholder col-6"></a> */}
										</div>
									</div>
									<div className="card shadow-sm p-3 mb-5 bg-white rounded" style={{ width: "18rem" }} aria-hidden="true">
										{/* <img src="..." className="card-img-top" alt="..." /> */}
										<div className="card-body">
											<h5 className="card-title placeholder-glow">
												<span className="placeholder col-6"></span>
											</h5>
											<p className="card-text placeholder-glow">
												<span className="placeholder col-7"></span>
												<span className="placeholder col-4"></span>
												<span className="placeholder col-4"></span>
												<span className="placeholder col-6"></span>
												<span className="placeholder col-8"></span>
											</p>
											{/* <a href="#" tabindex="-1" className="btn btn-primary disabled placeholder col-6"></a> */}
										</div>
									</div>
								</>
								:
								comments.length > 0 ?
									comments.map((comment, index) => (
										<div key={index} className="col-sm-12 col-md-4 card shadow p-3 bg-white rounded mb-2">
											<div className="card-body">
												<div className="col w-100 d-flex justify-content-between mb-1"><span>{getDate(comment.createdAt ?? "")}</span><span>Activo</span></div>
												<h5 className="card-title">{comment.firstName + " " + comment.lastName}</h5>
												<h6 className="card-subtitle mb-2 text-muted">{comment.city}</h6>
												<span>
													{
														comment.score === 1 ?
															<>
																<i className="bi bi-star-fill" style={{ color: "yellow" }} />
																<i className="bi bi-star" />
																<i className="bi bi-star" />
																<i className="bi bi-star" />
																<i className="bi bi-star" />
															</> : comment.score === 2 ?
																<>
																	<i className="bi bi-star-fill" style={{ color: "yellow" }} />
																	<i className="bi bi-star-fill" style={{ color: "yellow" }} />
																	<i className="bi bi-star" />
																	<i className="bi bi-star" />
																	<i className="bi bi-star" />
																</> : comment.score === 3 ?
																	<>
																		<i className="bi bi-star-fill" style={{ color: "yellow" }} />
																		<i className="bi bi-star-fill" style={{ color: "yellow" }} />
																		<i className="bi bi-star-fill" style={{ color: "yellow" }} />
																		<i className="bi bi-star" />
																		<i className="bi bi-star" />
																	</> : comment.score === 4 ?
																		<>
																			<i className="bi bi-star-fill" style={{ color: "yellow" }} />
																			<i className="bi bi-star-fill" style={{ color: "yellow" }} />
																			<i className="bi bi-star-fill" style={{ color: "yellow" }} />
																			<i className="bi bi-star-fill" style={{ color: "yellow" }} />
																			<i className="bi bi-star" />
																		</> : comment.score === 5 &&
																		<>
																			<i className="bi bi-star-fill" style={{ color: "yellow" }} />
																			<i className="bi bi-star-fill" style={{ color: "yellow" }} />
																			<i className="bi bi-star-fill" style={{ color: "yellow" }} />
																			<i className="bi bi-star-fill" style={{ color: "yellow" }} />
																			<i className="bi bi-star-fill" style={{ color: "yellow" }} />
																		</>
													}
												</span>
												<p className="card-text" style={{ height: "4rem", overflow: "auto" }}>{comment.description}</p>
												<div className="col w-100 text-end">
													{
														comment.status === "RECEIVED" ?
															<>
																<button className="btn btn-primary text-white me-2" onClick={() => updateComment(comment, "APROVED")}>Aprobar</button>
																<button className="btn btn-secondary" onClick={() => updateComment(comment, "REJECTED")}>Rechazar</button>
															</> :
															<>
																{
																	comment.status === "APROVED" ? <button className="btn btn-primary text-white me-2" onClick={() => updateComment(comment, "SHOWED")}>Mostrar</button> :
																		comment.status === "SHOWED" && <button className="btn btn-secondary text-white me-2" onClick={() => updateComment(comment, "APROVED")}>Ocultar</button>
																}
																<button className="btn btn-danger text-white" onClick={() => deleteComment(comment.uuid ?? "")}>Eliminar</button>
															</>
													}
												</div>
											</div>
										</div>
									)) :
									<p>Aún no se han registrado comentarios.</p>
						}
					</div>
				</div>
			</div>

		</>
	);
};

export default CommentsList;
