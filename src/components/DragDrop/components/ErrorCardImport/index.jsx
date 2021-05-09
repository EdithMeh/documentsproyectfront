import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import {Error, ToggleOff} from "@material-ui/icons";

/**
 * Error card info for import and summary of import
 *
 * @param {*} props Properties
 * @returns {*} React component
 */
function ErrorCardImport(props) {
	const { value, setShowError } = props;
	return (
		<div className={'error-card-import container'}>
			<div className={'error-card-import icon'}>
				<Error />
			</div>
			<div className={'error-card-import toggle-button'}>
				<ToggleOff onClick={() => setShowError(false)} />
			</div>
			<div className={'error-card-import content'}>
				<span className={'error-card-import content-title'}>{'Errors'}</span>
				<div className={'error-card-import content-description'}>
					{value &&
						value.map((element, index) => {
							return (
								<>
									<span key={index}>
										{`"${element.code}" - ${element.message}`}
									</span>
									<br />
								</>
							);
						})}
				</div>
			</div>
		</div>
	);
}

export default ErrorCardImport;

ErrorCardImport.propTypes = {
	setShowError: PropTypes.func,
	value: PropTypes.object,
};
