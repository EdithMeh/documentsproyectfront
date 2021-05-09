/**
 * @param {string} acceptedFiles string separated by comas.
 * @returns {string} : string normalized for draw in drag and drop component.
 */
export function handleAcceptedFiles(acceptedFiles) {
	return acceptedFiles.split(',');
}
