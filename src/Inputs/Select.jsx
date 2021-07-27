import { makeStyles, MenuItem, TextField } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export const SelectInput = ({ options, label, required, error, value, handleSingleChange }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TextField
                id={label}
                select
                label={label}
                value={value}
                onChange={handleSingleChange}
                required={required}
                error={error}
            >
                {options.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
        </div>
    );
};
