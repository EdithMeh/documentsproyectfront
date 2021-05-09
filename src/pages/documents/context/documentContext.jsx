import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useEffect
} from 'react';
import ActionFactory from './actions';
import {documentReducer, State} from "../reducers/documentReducer";
import {DEFAULT_STATE} from "../../../helpers/constants";

export const DocumentsContext = createContext();
export const DispatchDocumentContext = createContext();

/**
 * Provider of context
 *
 * @param {object} props - properties
 * @returns {object} Context provider
 */
export function DocumentsProvider(props) {
  const {children} = props;
  const [state, dispatch] = useReducer(documentReducer, props, State);
  const actions = useMemo(() => ActionFactory(dispatch), []);

  useEffect(() => {
    actions.onLoad(DEFAULT_STATE);
  }, []);

  return (
    <DocumentsContext.Provider value={state}>
      <DispatchDocumentContext.Provider value={actions}>
        {children}
      </DispatchDocumentContext.Provider>
    </DocumentsContext.Provider>
  );
}

/**
 * Return only data to list
 *
 * @returns {object} context of task
 */
export function DocumentsData() {
  return useContext(DocumentsContext);
}

/**
 * Return only actions
 *
 * @returns {object} actions
 */
export function DocumentsActions() {
  return useContext(DispatchDocumentContext);
}
