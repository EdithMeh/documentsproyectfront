import axios from 'axios';
import { handleError } from './response';
import {HEADER, HEADER_BLOB, URL_SERVER} from "../../config/settings";
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
	//TODO: fix this unless blob to future requests
	return axios
		.get(`${URL_SERVER}/${resource}/${id}`, {...HEADER, responseType: 'blob'})
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
 * @param path
 * @returns {object} response
 */
export function getSingleWithPath(resource, id, path) {
	return axios
		.get(`${URL_SERVER}/${resource}/${id}/${path}`, HEADER)
		.then((data) => {
			return data;
		})
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
		.post(`${URL_SERVER}/${resource}`, model, HEADER)
		.then((data) => {
			return data;
		})
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
		.put(`${URL_SERVER}/${resource}`, model, HEADER)
		.then((data) => {
			return data;
		})
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
		.patch(`${URL_SERVER}/${resource}`, model, HEADER)
		.then((data) => {
			return data;
		})
		.catch(handleError);
}
