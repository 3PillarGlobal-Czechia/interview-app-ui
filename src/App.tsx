import { ProfileOutlined } from '@ant-design/icons';
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import React from 'react';

import styles from './App.module.scss';
import QuestionListsView from './components/QuestionListsView';

function App(): JSX.Element {
  return (
    <Layout>
      <Header className={styles.header}>
        <ProfileOutlined className={styles.logo} />
        <p>Interview App</p>
      </Header>
      <Content>
        <QuestionListsView />
      </Content>
    </Layout>
  );
}

export default App;
