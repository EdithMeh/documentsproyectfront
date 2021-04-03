import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";

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
