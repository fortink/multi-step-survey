export const setLocalStorage = ({ label, value }) => localStorage.setItem(label, JSON.stringify(value));
export const getLocalStorage = ({ label }) => JSON.parse(localStorage.getItem(label));

export const removeLocalStorage = ({ label }) => localStorage.removeItem(label);

export const getInitialValue = ({ label, initialValue }) => getLocalStorage({ label }) || initialValue;
