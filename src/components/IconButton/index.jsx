import React from "react";
import IconButton from "@material-ui/core/IconButton";

/**
 * Header for tables
 *
 * @returns {object} JSX.Element page tags
 */
export function IconButtonTable(props) {
    const {onClick, value, icon} = props;
    return (
        <IconButton
            size="small"
            onClick={() =>
                onClick(value)
            }
        >
            {icon}
        </IconButton>
    );
}
