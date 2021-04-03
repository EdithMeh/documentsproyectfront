import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import React, {useState} from "react";
import {INITIAL_INDEX} from "../../helpers/constants";

/**
 * Select component
 *
 * @returns {object} JSX.Element select
 */
export function SimpleSelect(props) {
    const { select, values, onChange } = props;

    function handleChange(event) {
        onChange(event.target.value);
    }

    return (
        <Select labelId="label" id="select" value={select} onChange={handleChange}>
            {values.map((value) => <MenuItem key={value.key} value={value.value}>{value.text}</MenuItem>)}
        </Select>
    );
}
