import React from 'react';
import { Progress } from 'semantic-ui-react';

/**
 * Dummy progress component
 *
 * @param {*} props Properties
 * @returns {*} React component
 */
function ProgressBar(props) {
	return <Progress {...props} />;
}

export default ProgressBar;
