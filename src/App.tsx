import React from 'react';

import styles from './App.module.scss';
import NavBar from './components/NavBar';
import QuestionListsView from './components/QuestionListsView';

function App(): JSX.Element {
  return (
    <div className={styles.app}>
      <NavBar />
      <QuestionListsView />
    </div>
  );
}

export default App;
