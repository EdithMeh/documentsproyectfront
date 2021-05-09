import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import React from "react";

/**
 * Header for tables
 *
 * @returns {object} JSX.Element page tags
 */
export function HeaderTable(props) {
    const {values} = props;
    return (
        <TableHead>
            <TableRow>
                {values.map((value) => (
                    <TableCell
                        key={value.id}
                        style={{ minWidth: value.minWidth }}
                    >
                        <strong>{value.label}</strong>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
