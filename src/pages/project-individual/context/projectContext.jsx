import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useEffect
} from 'react';
import ActionFactory from './actions';
import {projectIndividualReducer, State} from "../reducers/projectReducer";
import {DEFAULT_STATE} from "../../../helpers/constants";

export const ProjectIndividualContext = createContext();
export const DispatchProjectIndividualContext = createContext();

/**
 * Provider of context
 *
 * @param {object} props - properties
 * @returns {object} Context provider
 */
export function ProjectIndividualProvider(props) {
  const {children} = props;
  const [state, dispatch] = useReducer(projectIndividualReducer, props, State);
  const actions = useMemo(() => ActionFactory(dispatch), []);

  return (
    <ProjectIndividualContext.Provider value={state}>
      <DispatchProjectIndividualContext.Provider value={actions}>
        {children}
      </DispatchProjectIndividualContext.Provider>
    </ProjectIndividualContext.Provider>
  );
}

/**
 * Return only data to list
 *
 * @returns {object} context of task
 */
export function ProjectsIndividualData() {
  return useContext(ProjectIndividualContext);
}

/**
 * Return only actions
 *
 * @returns {object} actions
 */
export function ProjectIndividualActions() {
  return useContext(DispatchProjectIndividualContext);
}
