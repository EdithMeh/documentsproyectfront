import React from "react";
import Layout from "../../components/layout/layout";
const Documentos = (props) => {
  const { path } = props;
  return <Layout namePath={path}>Desde Documentos!</Layout>;
};

export default Documentos;
