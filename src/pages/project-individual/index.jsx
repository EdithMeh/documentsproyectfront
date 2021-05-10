import React from "react";
import {Layout} from "../../components/layout";
import {IndividualContainer} from "./layout";

export function ProjectIndividual(props) {
    const {uri, location} = props;
    const value = location.state.value;
    return (
        <Layout namePath={uri}>
            <IndividualContainer value={value} />
        </Layout>
    );
}
