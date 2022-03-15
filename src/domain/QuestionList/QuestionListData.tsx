import { LoadingOutlined } from '@ant-design/icons';
import { Input, Rate, Space, Spin } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import React, { useRef } from 'react';

import TableWrapper from '../../components/TableWrapper';
import {
  InterviewQuestionModel,
  InterviewQuestionModelProps,
} from '../../services/Client';
import {
  createColumnFilterProps,
  createColumnSearchProps,
} from '../../services/table/tableUtils';
import { InterviewQuestionDisplayColumns } from '../../services/table/tableUtilsProps';
import styles from './QuestionList.module.scss';
import QuestionListDataProps from './QuestionListDataProps';

export default function QuestionListData(
  props: QuestionListDataProps
): JSX.Element {
  const {
    isBeingEdited,
    list,
    displayableQuestions,
    addableQuestions,
    allQuestions,
    addToRemoveDrawerCallback,
    addToAddDrawerCallback,
  } = props;

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
        ...createColumnSearchProps({
          dataIndex:
            InterviewQuestionModelProps.title as InterviewQuestionDisplayColumns,
          searchInput,
          handleSearchCallback: handleSearch,
          handleResetCallback: handleReset,
        }),
      },
      {
        ...createColumnFilterProps({
          dataIndex:
            InterviewQuestionModelProps.category as InterviewQuestionDisplayColumns,
          filterData: data
            .map((value) => value.category!.toString())
            .filter((value) => value !== undefined)!,
        }),
      },
      {
        ...createColumnSearchProps({
          dataIndex:
            InterviewQuestionModelProps.content as InterviewQuestionDisplayColumns,
          searchInput,
          handleSearchCallback: handleSearch,
          handleResetCallback: handleReset,
        }),
      },
      {
        ...createColumnFilterProps({
          dataIndex:
            InterviewQuestionModelProps.difficulty as InterviewQuestionDisplayColumns,
          filterData: data
            .map((value) => value.difficulty!.toString())
            .filter((value) => value !== undefined)!,
        }),
        sorter: (a: InterviewQuestionModel, b: InterviewQuestionModel) =>
          a.difficulty && b.difficulty ? a.difficulty - b.difficulty : 1,
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
