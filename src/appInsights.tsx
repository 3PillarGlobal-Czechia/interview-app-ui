import App from './App';

import { ApplicationInsights, IExceptionTelemetry } from "@microsoft/applicationinsights-web";
import { createBrowserHistory } from 'history';
import { ReactPlugin, withAITracking } from '@microsoft/applicationinsights-react-js';

// eslint-disable-next-line import/no-extraneous-dependencies
const browserHistory = createBrowserHistory({});

export function getAppInsights(
  reactPlugin: ReactPlugin
): ApplicationInsights {
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
  debugger;
  appInsights.loadAppInsights();

  window.addEventListener('unhandledrejection', (event) => {
    debugger;
    // eslint-disable-next-line no-console
    console.log(event);
    appInsights.trackException({ error: event.reason } as IExceptionTelemetry);
  });

  return appInsights;
}
