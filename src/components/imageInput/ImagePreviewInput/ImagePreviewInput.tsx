import React, { useEffect, useState } from 'react';
import { Delete, ImageNotSupported } from '@mui/icons-material';
import { FaPlus } from 'react-icons/fa';
import { ImagePreviewInputStyles } from '../styles';

const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 5242880;
// const BYTES_PER_KILO_BYTE = 1024;

// const convertBytesToKB = (bytes) => Math.round(bytes / BYTES_PER_KILO_BYTE);

export interface ImagePreviewInputProps {
	isDark?: boolean;
	updateFilesCb: Function;
	maxFiles?: number;
	maxFileSizeInBytes?: number;
	[x: string]: any
}

const ImagePreviewInput: React.FC<ImagePreviewInputProps> = ({
	isDark,
	updateFilesCb,
	updateFilesBase64Cb,
	maxFiles,
	maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
	...otherProps
}) => {
	const [files, setFiles] = useState<any>({});
	const [image, setImage] = useState<any>(null);
	const [previewModalImage, setPreviewModalImage] = useState<any>(null);

	const handleNewFileUpload = (e: any) => {
		const { files: newFiles } = e.target;

		if (!maxFiles || newFiles && newFiles.length && Object.keys(files).length < maxFiles) {
			let updatedFiles = addNewFiles(newFiles);
			setFiles(updatedFiles);
			callUpdateFilesCb(updatedFiles);
		}
	}

	const addNewFiles = (newFiles: any) => {
		for (let file of newFiles) {
			if (file.size <= (maxFileSizeInBytes ?? DEFAULT_MAX_FILE_SIZE_IN_BYTES)) {
				if (!otherProps.multiple) {
					return { file };
				}
				files[file.name] = file;
			}
		}
		return { ...files };
	}

	const convertNestedObjectToArray = (nestedObj: any) => Object.keys(nestedObj).map((key) => nestedObj[key]);

	const callUpdateFilesCb = (files: File[]) => {
		const filesAsArray = convertNestedObjectToArray(files);
		updateFilesCb(filesAsArray);
	};

	const removeFile = (fileName: string) => {
		delete files[fileName];
		setImage(null);
		setFiles({ ...files });
		callUpdateFilesCb({ ...files });
	};

	useEffect(() => {
		if (image === null && Object.keys(files).length) {
			setImage(Object.keys(files)[0])
		}
		//eslint-disable-next-line
	}, [files]);

	return (
		<>
			<div id="preview-modal" className="modal fade" tabIndex={-1}>
				<div className="modal-dialog modal-lg">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Vista previa</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
						</div>
						<div className="modal-body text-center">
							{ previewModalImage && <img src={URL.createObjectURL(previewModalImage)} className="img-fluid" alt="preview" /> }
						</div>
					</div>
				</div>
			</div>

			<ImagePreviewInputStyles>
				{
					image ?
						<div className="image-preview col-12">
							<Delete className="icon" onClick={() => removeFile(image)} />
							{/* <i className="ti-trash icon" onClick={() => removeFile(image)} /> */}
							<img 
								src={URL.createObjectURL(files[image])} 
								alt="preview" 
								onClick={() => setPreviewModalImage(files[image])}
								data-bs-toggle="modal" 
								data-bs-target="#preview-modal" 
							/>
						</div> :
						<div className="icon-container">
							<ImageNotSupported className="icon" />
						</div>
				}
				<div className="options col-12">
					{!maxFiles || Object.keys(files).length < maxFiles &&
						<div className="upload">
							<FaPlus style={{ color: 'rgb(173, 159, 189)', fontSize: '40px' }} />
							{/* <i className="ti-plus icon" style={{ color: "rgb(173, 159, 189)", fontSize: "40px" }} /> */}
							<input className='form-field' type={'file'} onChange={handleNewFileUpload} title={''} value={''} {...otherProps} />
						</div>
					}
					<div className="miniatures">
						{
							Object.keys(files).map((fileName, index) => {
								let file = files[fileName];
								return (
									<div className="miniature" key={index} onClick={() => setImage(fileName)}>
										<img src={URL.createObjectURL(file)} alt="" />
									</div>
								);
							})
						}
					</div>
				</div>
			</ImagePreviewInputStyles>
		</>
	);
};

export default ImagePreviewInput;
