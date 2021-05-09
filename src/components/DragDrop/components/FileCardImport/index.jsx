import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ErrorCardImport from '../ErrorCardImport';
import './styles.css';
import DescriptionIcon from "@material-ui/icons/Description";
import {Check, Error, HighlightOff, ToggleOn} from "@material-ui/icons";
import ProgressBar from "../ProgressBar";

/**
 * File card info for import
 *
 * @param {*} props Properties
 * @returns {*} React component
 */
function FileCardImport(props) {
	const { value, isWorking, removeFile } = props;
	const [showError, setShowError] = useState(false);

	return (
		<>
			<div className={'file-card-import container'}>
				<div className={'file-card-import icon'}>
					<DescriptionIcon />
				</div>
				<div className={'file-card-import close-button'}>
					<HighlightOff onClick={() => removeFile(value)} />
				</div>
				<div className={'file-card-import content'}>
					<div className={'file-card-import content-title'}>
						{value && value.file.name}
						{value && value.errors && !showError ? (
							<>
								<div className={'file-card-import content-icon error'}>
									<Error />
								</div>
								<div className={'file-card-import content-toogle-button'}>
									<ToggleOn onClick={() => setShowError(!showError)} />
								</div>
							</>
						) : (
							<></>
						)}
						{value && !value.errors ? (
							<div className={'file-card-import content-icon success'}>
								<Check />
							</div>
						) : (
							<> </>
						)}
					</div>
					{value && isWorking ? (
						<div className={'file-card-import content-progress'}>
							<ProgressBar
								size={'tiny'}
								color={'teal'}
								percent={100}
								active={true}
								label={'Validating'}
							/>
						</div>
					) : (
						<></>
					)}
				</div>
			</div>
			{value && value.errors && showError ? (
				<ErrorCardImport value={value.errors} setShowError={setShowError} />
			) : (
				<></>
			)}
		</>
	);
}

export default FileCardImport;

FileCardImport.propTypes = {
	value: PropTypes.object,
	isWorking: PropTypes.bool,
	removeFile: PropTypes.func,
};
