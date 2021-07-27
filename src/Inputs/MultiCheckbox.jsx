import { Checkbox, FormControlLabel, FormGroup, FormLabel } from '@material-ui/core';
import React from 'react';

export const MultiCheckbox = ({ options, label, handleMultiChange, value }) => (
    <>
        <FormLabel component="legend">{label}</FormLabel>
        <FormGroup>
            {options.map((option) => (
                <FormControlLabel
                    control={<Checkbox checked={value.includes(option) || false} onChange={handleMultiChange} name={option} />}
                    label={option}
                    key={option}
                />
            ))}
        </FormGroup>
    </>
);
