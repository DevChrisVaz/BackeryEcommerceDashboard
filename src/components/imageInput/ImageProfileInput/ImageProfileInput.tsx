import React, { useState } from 'react';
import { FileUpload } from '@mui/icons-material';
import { BsFillPersonFill } from 'react-icons/bs';
import { ImageProfileInputStyles } from '../styles';

export interface ImageProfileInputProps {
	updatePictureCb: Function;
	maxFileSizeInBytes?: number;
	[x: string]: any;
};

const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 5242880;

// const BYTES_PER_KILO_BYTE = 1024;

// const convertBytesToKB = (bytes) => Math.round(bytes / BYTES_PER_KILO_BYTE);

const ImageProfileInput: React.FC<ImageProfileInputProps> = ({
	updatePictureCb,
	maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
	...otherProps
}) => {

	const [image, setImage] = useState<File>();

	const handleNewFileUpload = (e: any) => {
		const [file] = e.target.files;
		if (file.size <= maxFileSizeInBytes) {
			setImage(file);
			updatePictureCb(file);
		}
	}

	// const removeFile = (fileName) => {
	//     delete files[fileName];
	//     setFiles({ ...files });
	//     callUpdateFilesCb({ ...files });
	// };

	return (
		<ImageProfileInputStyles size={otherProps.size}>
			<div className="image-input-container">
				{
					image ?
						<div className="img-container">
							<img src={URL.createObjectURL(image)} alt="" />
						</div> :
						<div className="avatar bgc-soft">
							<BsFillPersonFill className='icon' />
						</div>
				}
				<div className="picture-upload-container button-primary">
					<FileUpload className="icon" />
					<p>Subir foto</p>
					<input type="file" className="form-field" onChange={handleNewFileUpload} name="file" title='' value='' {...otherProps} />
				</div>
			</div>
		</ImageProfileInputStyles>
	);
};

export default ImageProfileInput;
