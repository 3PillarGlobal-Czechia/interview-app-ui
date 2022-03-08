import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import QuestionList from './QuestionList';
import QuestionLists from './QuestionLists';

export default function RouterComponent(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QuestionLists />} />
        <Route path="QuestionList/:id" element={<QuestionList />} />
      </Routes>
    </BrowserRouter>
  );
}
