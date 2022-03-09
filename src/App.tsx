import { ProfileFilled } from '@ant-design/icons';
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import React from 'react';

import styles from './App.module.scss';
import QuestionLists from './components/QuestionLists';

function App(): JSX.Element {
  return (
    <Layout>
      <Header className={styles.header}>
        <ProfileFilled className={styles.logo} />
        <p>Interview App</p>
      </Header>
      <Content>
        <QuestionLists />
      </Content>
    </Layout>
  );
}

export default App;
