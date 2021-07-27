export const setLocalStorage = ({ label, value }) => localStorage.setItem(label, JSON.stringify(value));
export const getLocalStorage = ({ label }) => JSON.parse(localStorage.getItem(label));

export const removeLocalStorage = ({ label }) => localStorage.removeItem(label);

export const getInitialValue = ({ label, initialValue }) => getLocalStorage({ label }) || initialValue;

// if the field is required and no values are selected return true for the error state
export const getError = ({ value, required }) => {
    // no error for non-required values
    if (!required) return false;

    return !value || !value.length;
};
