import './index.module.scss';
import 'antd/dist/antd.css';

import {
  AppInsightsContext,
  ReactPlugin,
  withAITracking,
} from '@microsoft/applicationinsights-react-js';
import {
  ApplicationInsights,
  IExceptionTelemetry,
} from '@microsoft/applicationinsights-web';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';

//#region Application insight
const browserHistory = createBrowserHistory({});
const reactPlugin = new ReactPlugin();
export default withAITracking(reactPlugin, App);
export const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: process.env.REACT_APP_APPINSIGHTS_KEY,
    enableAutoRouteTracking: true,
    extensions: [reactPlugin],
    extensionConfig: {
      [reactPlugin.identifier]: { history: browserHistory },
    },
  },
});

appInsights.loadAppInsights();

window.addEventListener("unhandledrejection", (event) => {
  console.log(event)
  appInsights.trackException({ error:  event.reason} as IExceptionTelemetry);
});
//#endregion

try {
  ReactDOM.render(
    <React.StrictMode>
      <AppInsightsContext.Provider value={reactPlugin}>
        <App />
      </AppInsightsContext.Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
} catch (err: unknown) {
  appInsights.trackException({ error: err } as IExceptionTelemetry);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


