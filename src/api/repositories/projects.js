import {ApiCore} from "../utilities/core";

const url = 'projects';

const apiProjects = new ApiCore({
    getAll: true,
    getSingle: false,
    post: true,
    put: true,
    patch: false,
    url: url,
});

export default apiProjects;
