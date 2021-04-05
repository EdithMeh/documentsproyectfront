import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useEffect
} from 'react';
import ActionFactory from './actions';
import {projectReducer, State} from "../reducers/projectReducer";

export const ProjectsContext = createContext();
export const DispatchProjectContext = createContext();

/**
 * Provider of context
 *
 * @param {object} props - properties
 * @returns {object} Context provider
 */
export function ProjectsProvider(props) {
  const {children} = props;
  const [state, dispatch] = useReducer(projectReducer, props, State);
  const actions = useMemo(() => ActionFactory(dispatch), []);

  useEffect(() => {
    actions.onLoad();
  }, []);

  return (
    <ProjectsContext.Provider value={state}>
      <DispatchProjectContext.Provider value={actions}>
        {children}
      </DispatchProjectContext.Provider>
    </ProjectsContext.Provider>
  );
}

/**
 * Return only data to list
 *
 * @returns {object} context of task
 */
export function ProjectsData() {
  return useContext(ProjectsContext);
}

/**
 * Return only actions
 *
 * @returns {object} actions
 */
export function ProjectsActions() {
  return useContext(DispatchProjectContext);
}
