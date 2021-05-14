import {ActionTypes} from "./actionsTypes";
import apiProjects from "../../../api/repositories/projects";
import noop from "../../../helpers/noop";
import {navigate} from "@reach/router";

/**
 * Load the tasks
 *
 * @param {object} dispatch - dispatch of context
 * @param {object} payload - data
 */
function onLoad(dispatch, payload) {
    dispatch({type: ActionTypes.LOADING_CHANGE, payload: true});
    apiProjects.getAll({state: payload}).then((response) => {
        dispatch({
            type: ActionTypes.PROJECT_ONLOAD,
            payload: response.data
        });
    });
}

/**
 * add new project
 *
 * @param {object} dispatch - dispatch of context
 * @param {object} payload - data
 */
function addProject(dispatch, payload) {
    dispatch({type: ActionTypes.LOADING_CHANGE, payload: true});
    apiProjects.post(payload).then((response) => {
        dispatch({
            type: ActionTypes.PROJECT_ADD,
            payload: response.data
        });
        console.log(response.data)
        navigate(`/proyectos/${response.data.name}`, { state: { value: response.data } });
    });
}


/**
 * Factory of actions
 *
 * @param {object} dispatch - dispatch of context
 * @returns {Function} function of factory
 */
export default function ActionFactory(dispatch = noop) {
    return {
        onLoad: (payload) => onLoad(dispatch, payload),
        addProject: (payload) => addProject(dispatch, payload),
    };
}
