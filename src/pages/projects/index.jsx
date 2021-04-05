import React from "react";
import {Layout} from "../../components/layout";
import {ProjectsProvider} from "./context/projectContext";
import {ProjectsContainer} from "./layout";

export function Projects(props) {
    const {path} = props;

    return (
        <Layout namePath={path}>
            <ProjectsProvider>
                <ProjectsContainer/>
            </ProjectsProvider>
        </Layout>
    );
}
