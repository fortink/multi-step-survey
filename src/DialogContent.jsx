import { Box, Button, makeStyles, Step, StepButton, Stepper, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import React from 'react';

import { STEPS } from './constants';
import { useForm, useInput } from './hooks';
import ResultTable from './ResultTable';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    spacing: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

const getActiveStep = (step) => STEPS[step];

const Question = ({ question: { options, required, label, initialValue, Component }, errors, handleValue }) => {
    const { value, error, handleMultiChange, handleSingleChange } = useInput({
        label,
        initialValue,
        errors,
        handleValue,
    });

    return (
        <Box paddingTop={2} paddingBottom={3}>
            <FormControl key={label} component="fieldset" required={required} error={error}>
                <Component
                    required={required}
                    options={options}
                    label={label}
                    value={value}
                    handleSingleChange={handleSingleChange}
                    handleMultiChange={handleMultiChange}
                    error={error}
                />
            </FormControl>
        </Box>
    );
};

const ActiveStep = ({ step, errors, handleValue }) => {
    const { questions } = getActiveStep(step);

    return (
        questions?.map((question) => (
            <Question key={question.label} errors={errors} handleValue={handleValue} question={question} />
        )) || null
    );
};

export const DialogContent = ({ onCompleteSurvey }) => {
    const classes = useStyles();
    const { state, onNext, onBack, onReset, onSubmit, handleStep, handleValue, isLastStep } = useForm({
        onCompleteSurvey,
    });

    return (
        <div className={classes.root}>
            {/* TOP NAVIGATION */}
            <Stepper activeStep={state.step}>
                {STEPS.map(({ title }, index) => (
                    <Step key={title}>
                        <StepButton onClick={() => handleStep({ step: index })} completed={state.step > index}>
                            {title}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>

            <div>
                {isLastStep ? (
                    // RESULTS TABLE
                    <div>
                        <Typography className={classes.spacing}>
                            A summary of your answers:
                            <br />
                        </Typography>
                        <ResultTable tableConfig={STEPS} />
                    </div>
                ) : (
                    // INPUT FIELDS
                    <div className={classes.spacing}>
                        <ActiveStep handleValue={handleValue} step={state.step} errors={state.errors} />
                    </div>
                )}
                <div className={classes.spacing}>
                    {/* Back Button */}
                    <Button disabled={state.step === 0} onClick={onBack} className={classes.button}>
                        Back
                    </Button>
                    {!isLastStep ? (
                        // NEXT Button
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onNext}
                            className={classes.button}
                            disabled={isLastStep}
                        >
                            Next
                        </Button>
                    ) : (
                        <>
                            {/* RESET BUTTON */}
                            <Button onClick={onReset} className={classes.button}>
                                Reset
                            </Button>
                            {/* SUBMIT BUTTON */}
                            <Button onClick={onSubmit} variant="contained" color="primary" className={classes.button}>
                                Submit
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
