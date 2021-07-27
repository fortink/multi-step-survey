import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';

import { getLocalStorage } from './utils';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const getFormattedAnswers = ({ label }) => {
    const answer = getLocalStorage({ label });

    if (!answer) return '';

    return Array.isArray(answer) ? answer.join(', ') : answer;
};

export default function ResultTable({ tableConfig }) {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Step</TableCell>
                        <TableCell>Question</TableCell>
                        <TableCell>Answer</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableConfig.map(({ questions }, index) =>
                        questions?.map(({ label }) => (
                            <TableRow key={label}>
                                <TableCell>{index}</TableCell>
                                <TableCell component="th" scope="row">
                                    {label}
                                </TableCell>
                                <TableCell>{getFormattedAnswers({ label })}</TableCell>
                            </TableRow>
                        )),
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
