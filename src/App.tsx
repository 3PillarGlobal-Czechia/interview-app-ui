import { ProfileFilled } from '@ant-design/icons';
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import React from 'react';

import styles from './App.module.scss';
import RouterComponent from './router/Router';

function App(): JSX.Element {
  return (
    <Layout>
      <Header className={styles.header}>
        <ProfileFilled className={styles.logo} />
        <p>Interview App</p>
      </Header>
      <Content>
        <RouterComponent />
      </Content>
    </Layout>
  );
}

export default App;
