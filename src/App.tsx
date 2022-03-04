import { ProfileOutlined } from '@ant-design/icons';
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import styles from './App.module.scss';
import QuestionList from './components/QuestionList';
import QuestionLists from './components/QuestionLists';

function App(): JSX.Element {
  return (
    <Layout>
      <Header className={styles.header}>
        <ProfileOutlined className={styles.logo} />
        <p>Interview App</p>
      </Header>
      <Content>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<QuestionLists />} />
            <Route path="QuestionList/:id" element={<QuestionList />} />
          </Routes>
        </BrowserRouter>
      </Content>
    </Layout>
  );
}

export default App;
