import React from "react";
import {Layout} from "../../components/layout";
import {IndividualContainer} from "./layout";
import {ProjectIndividualProvider} from "./context/projectContext";

export function ProjectIndividual(props) {
    const {uri, location} = props;
    const value = location.state.value;
    return (
        <Layout namePath={uri}>
            <ProjectIndividualProvider>
                <IndividualContainer value={value}/>
            </ProjectIndividualProvider>
        </Layout>
    );
}
