import React from "react";
import Layout from "../../components/layout/layout";

const Home = (props) => {
  const { path } = props;
  return (
    <Layout namePath={path}>
      <p>WELCOME</p>
    </Layout>
  );
};

export default Home;
