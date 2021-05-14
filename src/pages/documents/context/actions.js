import {ActionTypes} from "./actionsTypes";
import noop from "../../../helpers/noop";
import apiDocuments from "../../../api/repositories/documents";

/**
 * Load the tasks
 *
 * @param {object} dispatch - dispatch of context
 * @param {object} payload - data
 */
function onLoad(dispatch, payload) {
    dispatch({type: ActionTypes.LOADING_CHANGE, payload: true});
    apiDocuments.getAll({state: payload}).then((response) => {
        dispatch({
            type: ActionTypes.DOCUMENT_ONLOAD,
            payload: response.data
        });
    });
}

/**
 * Download the tasks
 *
 * @param {object} dispatch - dispatch of context
 * @param {object} payload - data
 */
function downloadDocument(dispatch, payload) {
    dispatch({type: ActionTypes.LOADING_CHANGE, payload: true});
    apiDocuments.getSingle(payload).then((response) => {
        const filename = response.headers['content-disposition'].split('filename=')[1];
        const type = response.headers['content-type'];
        const blob = new Blob([response.data], {
            type: type
        })
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        dispatch({type: ActionTypes.LOADING_CHANGE, payload: false});
    });
}

/**
 * add new project
 *
 * @param {object} dispatch - dispatch of context
 * @param {object} payload - data
 */
function addDocument(dispatch, payload) {
    dispatch({type: ActionTypes.LOADING_CHANGE, payload: true});
    apiDocuments.post(payload).then((response) => {
        dispatch({
            type: ActionTypes.DOCUMENT_ADD,
            payload: response.data
        });
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
        addDocument: (payload) => addDocument(dispatch, payload),
        downloadDocument: (payload) => downloadDocument(dispatch, payload),
    };
}
