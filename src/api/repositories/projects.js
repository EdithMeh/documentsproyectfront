import {ApiCore} from "../utilities/core";

const url = 'projects';

const apiProjects = new ApiCore({
    getAll: true,
    getSingle: true,
    post: true,
    put: false,
    patch: true,
    url: url,
});

export default apiProjects;
