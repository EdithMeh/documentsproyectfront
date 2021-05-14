import React from "react";
import {Layout} from "../../components/layout";
import {Grid} from "semantic-ui-react";
import {HorizontalBarChart} from "./components/HorizonChart";
import {data_first, data_second, options_first, options_second} from "./helpers/chart";

export function Home(props) {
    const {path} = props;
    return (
        <Layout namePath={path}>
            <p>WELCOME</p>
            <Grid columns={2} relaxed='very'>
                <Grid.Column verticalAlign='middle'>
                    <HorizontalBarChart title={'PROYECTOS'} data={data_first} options={options_first}/>
                </Grid.Column>
                <Grid.Column>
                    <HorizontalBarChart title={'MIEMBROS'} data={data_second} options={options_second}/>
                </Grid.Column>
            </Grid>
        </Layout>
    );
}
