import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import QuestionList from '../pages/QuestionListPage/QuestionList';
import QuestionLists from '../pages/QuestionListsPage/QuestionLists';

export default function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QuestionLists />} />
        <Route path="QuestionList/:id" element={<QuestionList />} />
      </Routes>
    </BrowserRouter>
  );
}
