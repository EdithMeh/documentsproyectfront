import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import React from "react";
import {useStyles} from "../styled/UserStyled";

/**
 * Button principal
 * @param {object} props - properties
 * @returns {object} JSX.Element header band
 */
export function PrimaryButton(props) {
    const classes = useStyles();
    const {onClick, value} = props;

    return (
        <Button
            onClick={() => onClick()}
            variant="contained"
            className={classes.buttonAdd}
            startIcon={<AddIcon/>}>
            {value}
        </Button>);
}
