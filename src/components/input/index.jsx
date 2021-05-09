import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";

/**
 * Select component
 *
 * @returns {object} JSX.Element select
 */
export function Input(props) {
    const {name, label, onChange} = props;
    const [error, setError] = useState('');

    function handleChange(event) {
        const {name, value} = event.target;
        value === '' ? setError('Este campo es requerido') : setError('');
        onChange(name, value);
    }

    return (
        <>
            <TextField
                fullWidth
                size="small"
                label={label}
                name={name}
                onKeyUp={handleChange}
                onBlur={handleChange}
                variant="outlined"
                className={error ? "border-error" : ""}
            />
            {error && (
                <FormHelperText error>
                    {error}
                </FormHelperText>
            )}
        </>
    );
}
