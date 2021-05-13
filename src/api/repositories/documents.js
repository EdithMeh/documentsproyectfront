import {ApiCore} from "../utilities/core";

const url = 'documents';

const apiDocuments = new ApiCore({
    getAll: true,
    getSingle: true,
    getSingleWithPath: false,
    post: true,
    put: true,
    patch: false,
    url: url,
});

export default apiDocuments;
