import { ProfileOutlined } from '@ant-design/icons';
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import React from 'react';

import styles from './App.module.scss';
import QuestionLists from './components/QuestionLists';

function App(): JSX.Element {
  return (
    <Layout style={{ height: '100vh' }}>
      <Header className={styles.header}>
        <ProfileOutlined className={styles.logo} />
        <p>Interview App</p>
      </Header>
      <Content>
        <QuestionLists />
      </Content>
    </Layout>
  );
}

export default App;
