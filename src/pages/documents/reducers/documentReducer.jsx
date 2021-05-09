import produce from 'immer';
import {ActionTypes} from "../context/actionsTypes";

/**
 * Initial state
 *
 * @param {object} props - properties
 * @returns {object} init
 */
export function State(props) {
  return {documents: [], loading: false};
}

/**
 * Reducer to actions of documents
 *
 * @param {object[]} state - state
 * @param {object} action - action with payload
 * @returns {object} tasks
 */
export function documentReducer(state, action) {
  const {type, payload} = action;

  return produce(state, (draft) => {
    switch (type) {
      case ActionTypes.DOCUMENT_ADD: {
        console.log(payload);
        draft.documents = [...state.documents, payload];
        draft.loading = false;
        break;
      }
      case ActionTypes.DOCUMENT_REMOVE: {
        draft.documents = state.documents.filter((documents) => payload.id !== documents.id);
        break;
      }
      case ActionTypes.DOCUMENT_FILTER: {
        draft.documents = payload;
        break;
      }
      case ActionTypes.DOCUMENT_ONLOAD: {
        draft.documents = payload;
        draft.loading = false;
        break;
      }
      case ActionTypes.LOADING_CHANGE: {
        draft.loading = payload;
        break;
      }
    }
  });
}
