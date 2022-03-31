import './index.module.scss';
import 'antd/dist/antd.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppInsightsContext, ReactPlugin } from '@microsoft/applicationinsights-react-js';
import { IExceptionTelemetry } from '@microsoft/applicationinsights-web';
import React from 'react';
import ReactDOM from 'react-dom';
import { getAppInsights } from './appInsights';

const reactPlugin = new ReactPlugin();
let appInsights = getAppInsights( reactPlugin );

try {
  ReactDOM.render(
    <React.StrictMode>
      <AppInsightsContext.Provider value={reactPlugin}>
        <App />
      </AppInsightsContext.Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
} catch (error: unknown) {
  appInsights.trackException({ error } as IExceptionTelemetry);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
