import React from "react";
import {Layout} from "../../components/layout";
import {DocumentsContainer} from "./layout";
import {DocumentsProvider} from "./context/documentContext";

export function Documents(props) {
  const { path } = props;
  return (
      <Layout namePath={path}>
        <DocumentsProvider>
          <DocumentsContainer/>
        </DocumentsProvider>
      </Layout>
  );
}
