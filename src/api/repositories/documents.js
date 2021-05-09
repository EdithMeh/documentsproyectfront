import {ApiCore} from "../utilities/core";

const url = 'documents';

const apiDocuments = new ApiCore({
    getAll: true,
    getSingle: true,
    post: true,
    put: true,
    patch: false,
    url: url,
});

export default apiDocuments;
