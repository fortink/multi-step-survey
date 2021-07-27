import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import React from 'react';

export const RadioButtons = ({ options, label, value, handleSingleChange }) => (
    <>
        <FormLabel component="legend">{label}</FormLabel>
        <RadioGroup aria-label={label} name={label} value={value} onChange={handleSingleChange}>
            {options.map((value) => (
                <FormControlLabel value={value} key={value} control={<Radio />} label={value} />
            ))}
        </RadioGroup>
    </>
);
