import { TextField } from '@material-ui/core';
import React from 'react';

export const TextInput = ({ error, label, required, handleSingleChange, value }) => (
    <TextField required={required} onChange={handleSingleChange} value={value} error={error} label={label} />
);
