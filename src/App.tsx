import React from 'react';

import styles from './App.module.scss';

function App(): JSX.Element {
  const handle3pillarGlobalButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    window.open('https://www.3pillarglobal.com/', '_blank');
  };

  const handleGithubButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    window.open(
      'https://github.com/3PillarGlobal-Ostrava/interview-app-ui',
      '_blank'
    );
  };

  return (
    <div className={styles.app}>
      <img
        alt="3Pillar Global logo"
        className={styles.logo}
        src={`${process.env.PUBLIC_URL}/logo.png`}
      />
      <h1>Documentation</h1>

      <div className={styles.boxes}>
        <section data-testid="3pillar-global-section">
          <h2>Official websites</h2>
          <p>
            3Pillar Global builds breakthrough software products that power
            digital businesses. Trusted services. Tested results. Innovations
            that scale.
          </p>
          <button type="button" onClick={handle3pillarGlobalButtonClick}>
            More {'>'}
          </button>
        </section>
        <section data-testid="github-starting-repository-section">
          <h2>Github - React starting repository</h2>
          <p>
            This repository helps you to start programming faster and more
            effective!
          </p>
          <button type="button" onClick={handleGithubButtonClick}>
            More {'>'}
          </button>
        </section>
      </div>
    </div>
  );
}

export default App;
