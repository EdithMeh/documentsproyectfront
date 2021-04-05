import axios from 'axios';
import { handleResponse, handleError } from './response';
import {HEADER, URL_SERVER} from "../../config/settings";
import {CONNECT_PARAMS} from "../../helpers/constants";
import {objectToQueryString} from "../../helpers/apiHelpers";

/**
 * Sends a GET request to the specified url
 *
 * @param {string} resource - url of the request
 * @param {object} params - Optional. A object to send as a query string.
 * @returns {object} response
 */
export function getAll(resource, params) {
	let url = `${URL_SERVER}/${resource}`;
	if (params) {
		url += CONNECT_PARAMS + objectToQueryString(params);
	}
	console.log(url, HEADER);
	return axios
		.get(url, HEADER)
		.then((data) => {
			return data;
		})
		.catch(handleError);
}

/**
 * Sends a GET request to the specified url
 *
 * @param {string} resource - url of the request
 * @param {number} id - Identifier of resource
 * @returns {object} response
 */
export function getSingle(resource, id) {
	return axios
		.get(`${URL_SERVER}/${resource}/${id}`)
		.then(handleResponse)
		.catch(handleError);
}

/**
 * Sends a POST request to the specified url
 *
 * @param {string} resource - url of the request
 * @param {object} model - Optional. A object to send as a body.
 * @returns {object} response
 */
export function post(resource, model) {
	return axios
		.post(`${URL_SERVER}/${resource}`, model)
		.then(handleResponse)
		.catch(handleError);
}

/**
 * Sends a PUT request to the specified url
 *
 * @param {string} resource - url of the request
 * @param {object} model - Optional. A object to send as a body.
 * @returns {object} response
 */
export function put(resource, model) {
	return axios
		.put(`${URL_SERVER}/${resource}`, model)
		.then(handleResponse)
		.catch(handleError);
}

/**
 * Sends a PATCH request to the specified url
 *
 * @param {string} resource - url of the request
 * @param {object} model - Optional. A object to send as a body.
 * @returns {object} response
 */
export function patch(resource, model) {
	return axios
		.patch(`${URL_SERVER}/${resource}`, model)
		.then(handleResponse)
		.catch(handleError);
}
