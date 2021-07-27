import { useEffect, useReducer } from 'react';

import { ACTIVE_STEP_KEY, LABELS, STEPS } from '../constants';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../utils';

const initialState = {
    errors: {},
    values: {},
    step: 0,
};

const reducer = (state, { type, label, ...action }) => {
    switch (type) {
        case 'reset':
            return initialState;
        case 'step':
            return {
                ...state,
                step: action.step || initialState.step,
            };
        case 'error':
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [label]: action.error,
                },
            };
        case 'value':
            return {
                ...state,
                values: {
                    ...state.values,
                    [label]: action.value,
                },
            };
        default:
            return state;
    }
};

// dispatches actions to set the error states and returns true or false if all the required fields in the step are complete
const validateInput = ({ state, handleError }) => {
    const { questions } = STEPS[state.step];

    const errors = questions.map(({ label, required }) => {
        if (!required) return;

        const value = state.values[label];

        const isEmpty = Array.isArray(value) ? !value.length : !value;

        handleError({ label, error: isEmpty });

        return isEmpty;
    });

    return errors.some(Boolean);
};

export const useForm = ({ onCompleteSurvey }) => {
    const [state, dispatch] = useReducer(reducer, {
        ...initialState,
        step: getLocalStorage({ label: ACTIVE_STEP_KEY }) || 0,
    });

    // dispatch action
    const handleStep = ({ step }) => dispatch({ type: 'step', step });
    const handleError = ({ label, error }) => dispatch({ type: 'error', label, error });
    const handleValue = ({ label, value }) => dispatch({ type: 'value', label, value });
    const handleReset = () => dispatch({ type: 'reset' });

    // stores the active step in local storage whenever the step changes
    useEffect(() => {
        setLocalStorage({ label: ACTIVE_STEP_KEY, value: state.step });
    }, [state.step]);

    const onReset = () => {
        handleReset();
        LABELS.map((label) => removeLocalStorage({ label }));
    };
    const onSubmit = () => {
        onReset();
        onCompleteSurvey();
    };
    const onNext = () => {
        // if errors are present do not go to next page
        if (validateInput({ state, handleError })) return;

        Object.keys(state.values).map((label) => {
            setLocalStorage({ label, value: state.values[label] });
        });
        handleStep({ step: state.step + 1 });
    };

    const onBack = () => {
        handleStep({ step: state.step - 1 });
    };

    return {
        state,
        onNext,
        onReset,
        onSubmit,
        onBack,
        handleStep,
        handleValue,
        isLastStep: state.step === STEPS.length - 1,
    };
};
