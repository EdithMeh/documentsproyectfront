import {ActionTypes} from "./actionsTypes";
import apiProjects from "../../../api/repositories/projects";
import noop from "../../../helpers/noop";

/**
 * Load the tasks
 *
 * @param {object} dispatch - dispatch of context
 * @param {object} payload - data
 */
function onMembersLoad(dispatch, payload) {
    dispatch({type: ActionTypes.LOADING_CHANGE, payload: true});
    apiProjects.getSingleWithPath(payload, "").then((response) => {
        dispatch({
            type: ActionTypes.PROJECT_INDIVIDUAL_MEMBERS,
            payload: response.data
        });
    });
}

/**
 * Load the tasks
 *
 * @param {object} dispatch - dispatch of context
 * @param {object} payload - data
 */
function addMember(dispatch, payload) {
    const {id, member} = payload;
    dispatch({type: ActionTypes.LOADING_CHANGE, payload: true});
    apiProjects.post(member, "/"+id).then((response) => {
        onMembersLoad(dispatch, id);
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
        onMembersLoad: (payload) => onMembersLoad(dispatch, payload),
        addMember: (payload) => addMember(dispatch, payload),
    };
}
