import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/core/styles';
import App from './App';
import theme from './theme';

const ROOT_ID = 'root'

// create and attach a div with an id that we can append the form to
const elem = document.createElement('div');
elem.setAttribute("id", ROOT_ID);
document.body.appendChild(elem);

// attach the react form to the root element
ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <App/>
    </ThemeProvider>,
    document.querySelector(`#${ROOT_ID}`),
);


