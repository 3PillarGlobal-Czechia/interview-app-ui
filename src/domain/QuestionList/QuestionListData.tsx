import { LoadingOutlined } from '@ant-design/icons';
import { Input, Rate, Space, Spin } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import React, { useRef } from 'react';

import TableWrapper from '../../components/TableWrapper';
import {
  InterviewQuestionModel,
  QuestionListModel,
} from '../../services/Client';
import {
  createColumnFilterProps,
  createColumnSearchProps,
} from '../../services/table/tableUtils';
import styles from './QuestionList.module.scss';

export default function QuestionListData({
  isBeingEdited,
  list,
  displayableQuestions,
  addableQuestions,
  allQuestions,
  addToRemoveDrawerCallback,
  addToAddDrawerCallback,
}: {
  isBeingEdited: boolean;
  list: QuestionListModel | undefined;
  displayableQuestions: InterviewQuestionModel[];
  addableQuestions: InterviewQuestionModel[];
  allQuestions: InterviewQuestionModel[];
  addToRemoveDrawerCallback: (question: InterviewQuestionModel) => void;
  addToAddDrawerCallback: (question: InterviewQuestionModel) => void;
}): JSX.Element {
  const searchInput = useRef<Input>();

  const handleSearch = (
    confirm: (param: FilterConfirmProps | undefined) => void
  ): void => {
    confirm({ closeDropdown: true });
  };

  const handleReset = (
    clearFilters: () => void,
    confirm: (param: FilterConfirmProps | undefined) => void
  ): void => {
    clearFilters();
    confirm({ closeDropdown: true });
  };

  const tableColumns = (
    data: InterviewQuestionModel[]
  ): ColumnsType<InterviewQuestionModel> => {
    return [
      {
        ...createColumnSearchProps(
          'title',
          searchInput,
          handleSearch,
          handleReset
        ),
      },
      {
        ...createColumnFilterProps(
          'category',
          data
            .map((value) => value.category!.toString())
            .filter((value) => value !== undefined)!
        ),
      },
      {
        ...createColumnSearchProps(
          'content',
          searchInput,
          handleSearch,
          handleReset
        ),
      },
      {
        ...createColumnFilterProps(
          'difficulty',
          data
            .map((value) => value.difficulty!.toString())
            .filter((value) => value !== undefined)!
        ),
        sorter: (a: InterviewQuestionModel, b: InterviewQuestionModel) =>
          a.difficulty && b.difficulty
            ? a.difficulty - b.difficulty
            : 1,
        render: (value: number) => <Rate disabled value={value} />,
      },
    ];
  };

  if (!list?.interviewQuestions) {
    return (
      <div className={styles.questionListData}>
        <Spin indicator={<LoadingOutlined />} />
      </div>
    );
  }

  return isBeingEdited ? (
    <div className={styles.questionListData}>
      <Space direction="vertical">
        <TableWrapper
          dataSource={displayableQuestions}
          columns={tableColumns(list?.interviewQuestions)}
          customAction={{
            buttonText: 'Remove',
            actionCallback: addToRemoveDrawerCallback,
          }}
          customTitle="Questions added to list"
        />
        <TableWrapper
          dataSource={addableQuestions}
          columns={tableColumns(allQuestions)}
          customAction={{
            buttonText: 'Add',
            actionCallback: addToAddDrawerCallback,
          }}
          customTitle="Questions you can add to list"
        />
      </Space>
    </div>
  ) : (
    <div className={styles.questionListData}>
      <TableWrapper
        dataSource={displayableQuestions}
        columns={tableColumns(list.interviewQuestions)}
      />
    </div>
  );
}
