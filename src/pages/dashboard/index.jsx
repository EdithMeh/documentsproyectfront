import React from "react";
import {Layout} from "../../components/layout";

export function Home(props) {
  const { path } = props;
  return (
    <Layout namePath={path}>
      <p>WELCOME</p>
    </Layout>
  );
}
