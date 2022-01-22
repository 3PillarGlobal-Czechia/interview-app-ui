import React from 'react';

import styles from './App.module.scss';

function App(): JSX.Element {
  return (
    <div className={styles.app}>
      <img alt="3Pillar Global logo" className={styles.logo} src={`${process.env.PUBLIC_URL}/logo.png`} />
      <h1>Documentation</h1>

      <div className={styles.boxes}>
        <section>
          <h2>Official websites</h2>
          <p>
            3Pillar Global builds breakthrough software products that power digital businesses.
            Trusted services. Tested results. Innovations that scale.
          </p>
          <a
            href="https://www.3pillarglobal.com/"
            rel="noreferrer"
            target="_blank"
          >
            More
            {' '}
            {'>'}
          </a>
        </section>
        <section>
          <h2>Github - React starting repository</h2>
          <p>This repository helps you to start programming faster and more effective!</p>
          <a
            href="https://github.com/3PillarGlobal-Ostrava/interview-app-ui"
            rel="noreferrer"
            target="_blank"
          >
            More
            {'>'}
          </a>
        </section>
      </div>
    </div>
  );
}

export default App;
