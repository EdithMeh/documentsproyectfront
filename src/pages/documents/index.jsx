import React from "react";
import {Layout} from "../../components/layout";
export function Documents(props) {
  const { path } = props;
  return <Layout namePath={path}>Desde Documentos!</Layout>;
}
