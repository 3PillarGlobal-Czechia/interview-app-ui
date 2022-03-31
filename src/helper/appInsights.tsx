import {
  ReactPlugin,
  withAITracking,
} from '@microsoft/applicationinsights-react-js';
import {
  ApplicationInsights,
  IExceptionTelemetry,
} from '@microsoft/applicationinsights-web';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserHistory } from 'history';

import App from '../App';

// eslint-disable-next-line import/no-extraneous-dependencies
const browserHistory = createBrowserHistory({});
export const reactPlugin = new ReactPlugin();

export function getAppInsights(): ApplicationInsights {
  withAITracking(reactPlugin, App);
  const appInsights = new ApplicationInsights({
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

  window.addEventListener('unhandledrejection', (event) => {
    // eslint-disable-next-line no-console
    console.log(event);
    appInsights.trackException({ error: event.reason } as IExceptionTelemetry);
  });

  return appInsights;
}
