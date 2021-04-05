import produce from 'immer';
import {ActionTypes} from "../context/actionsTypes";

/**
 * Initial state
 *
 * @param {object} props - properties
 * @returns {object} init
 */
export function State(props) {
  return {projects: [], loading: false};
}

/**
 * Reducer to actions of tasks
 *
 * @param {object[]} state - state
 * @param {object} action - action with payload
 * @returns {object} tasks
 */
export function projectReducer(state, action) {
  const {type, payload} = action;

  return produce(state, (draft) => {
    switch (type) {
      case ActionTypes.PROJECT_ADD: {
        console.log(payload);
        draft.projects = [...state.projects, payload];
        draft.loading = false;
        break;
      }
      case ActionTypes.PROJECT_REMOVE: {
        draft.projects = state.projects.filter((projects) => payload.id !== projects.id);
        break;
      }
      case ActionTypes.PROJECT_FILTER: {
        draft.projects = payload;
        break;
      }
      case ActionTypes.PROJECT_ONLOAD: {
        draft.projects = payload;
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
