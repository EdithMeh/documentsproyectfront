import {getAll, getSingle, getSingleWithPath, patch, post, put} from "./provider";

export class ApiCore {
	constructor(options) {
		if (options.getAll) {
			this.getAll = (params) => {
				return getAll(options.url, params);
			};
		}

		if (options.getSingle) {
			this.getSingle = (id) => {
				return getSingle(options.url, id);
			};
		}

		if (options.getSingleWithPath) {
			this.getSingleWithPath = (id, path) => {
				return getSingleWithPath(options.url, id, path);
			};
		}

		if (options.post) {
			this.post = (model, path="") => {
				return post(options.url+path, model);
			};
		}

		if (options.put) {
			this.put = (model) => {
				return put(options.url, model);
			};
		}

		if (options.patch) {
			this.patch = (model) => {
				return patch(options.url, model);
			};
		}
	}
}
