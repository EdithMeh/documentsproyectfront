import React from "react";
import {Message} from "semantic-ui-react";
import {Info} from "@material-ui/icons";
import {useStyles} from "../../../../components/styled/UserStyled";

/**
 * Select component
 *
 * @returns {object} JSX.Element select
 */
export function BarStatus(props) {
    const {value} = props;
    const classes = useStyles();

    return (
        <Message color={value.color} className={classes.message}><Info /><h4 className={classes.text}>&nbsp;&nbsp;{value.message}</h4></Message>
    );
}
