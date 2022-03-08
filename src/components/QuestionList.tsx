import {
  ArrowLeftOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { Button, Divider, Drawer, Input, Rate, Space, Spin } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import { Link, useParams } from 'react-router-dom';

import {
  Client,
  InterviewQuestionModel,
  QuestionListModel,
  UpdateQuestionListRequest,
} from '../services/Client';
import {
  createColumnFilterProps,
  createColumnSearchProps,
} from '../utils/tableUtils';
import Header from './Header';
import styles from './QuestionLists.module.scss';
import TableWrapper from './TableWrapper';

export default function QuestionList(): JSX.Element {
  const { id } = useParams<'id'>();
  const searchInput = useRef<Input>();
  const client = new Client();
  const [isBeingEdited, setBeingEdited] = useState<boolean>(false);
  const [list, setList] = useState<QuestionListModel>();
  const [allQuestions, setAllQuestions] = useState<InterviewQuestionModel[]>([]);
  useEffect(() => {
    client.questionLists(Number(id), undefined, undefined).then(lists => {
      setList(lists[0]);
    });
    client.interviewQuestions(undefined, undefined, undefined).then(questions => {
      setAllQuestions(questions);
    })
  }, []);

  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [questionsToAdd, setQuestionsToAdd] = useState<
    InterviewQuestionModel[]
  >([]);
  const [questionsToRemove, setQuestionsToRemove] = useState<
    InterviewQuestionModel[]
  >([]);
  function setDrawerVisibility(value: boolean | null = null): void {
    setDrawerVisible((isCurrentlyVisible) => value ?? !isCurrentlyVisible);
  }

  const [searchText, setSearchText] = useState<React.Key>('');

  const handleSearch = (
    selectedKeys: React.Key[],
    confirm: (param: FilterConfirmProps | undefined) => void
  ): void => {
    confirm({ closeDropdown: true });
    setSearchText(selectedKeys[0]);
  };

  const handleReset = (
    clearFilters: () => void,
    confirm: (param: FilterConfirmProps | undefined) => void
  ): void => {
    clearFilters();
    setSearchText('');
    confirm({ closeDropdown: true });
  };

  const tableColumns = (data: InterviewQuestionModel[]): ColumnsType<InterviewQuestionModel> => {
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
          a.difficulty != null && b.difficulty != null
            ? a.difficulty - b.difficulty
            : 1,
        render: (value: number) => <Rate disabled value={value} />,
      },
    ];
  };

  const addToAddDrawer = (record: InterviewQuestionModel): void => {
    setQuestionsToAdd((old) => [...old, record]);
  };

  const addToRemoveDrawer = (record: InterviewQuestionModel): void => {
    setQuestionsToRemove((old) => [...old, record]);
  };

  const removeFromAddDrawer = (question: InterviewQuestionModel): void => {
    setQuestionsToAdd((old) => old.filter((q) => q.id !== question.id));
  };

  const removeFromRemoveDrawer = (question: InterviewQuestionModel): void => {
    setQuestionsToRemove((old) => old.filter((q) => q.id !== question.id));
  };

  const clearDrawerQuestions = (): void => {
    questionsToAdd.forEach((question) => removeFromAddDrawer(question));
    questionsToRemove.forEach((question) => removeFromRemoveDrawer(question));
  };

  const discard = (): void => {
    clearDrawerQuestions();
    setBeingEdited(false);
  }

  const saveChanges = (): void => {
    client
      .update2(
        new UpdateQuestionListRequest({
          id: list?.id,
          title: list?.title,
          description: list?.description,
          questionsToAdd: questionsToAdd.map((q) => q.id!),
          questionsToRemove: questionsToRemove.map((q) => q.id!),
        })
      )
      .then(() => {
        setList(
          (old) =>
            new QuestionListModel({
              ...old,
              interviewQuestions: [
                ...(old?.interviewQuestions?.filter(
                  (q) => !questionsToRemove.map((rq) => rq.id).includes(q.id)
                ) ?? []),
                ...questionsToAdd,
              ],
            })
        );
        clearDrawerQuestions();
        setBeingEdited(false);
      });
  };

  const addableQuestions = allQuestions.filter(
    (question) =>
      !list?.interviewQuestions?.map((q) => q.id).includes(question.id) &&
      !questionsToAdd.map((q) => q.id).includes(question.id)
  );

  const displayableQuestions = list?.interviewQuestions?.filter(
    (question) => !questionsToRemove.map((q) => q.id).includes(question.id)
  ) ?? [];

  const questionsElement =
    list?.interviewQuestions ? (
      isBeingEdited ? (
        <Space direction="vertical">
          <TableWrapper dataSource={displayableQuestions} columns={tableColumns(list?.interviewQuestions)} customAction={{buttonText: "Remove", actionCallback: (record) => addToRemoveDrawer(record)}} customTitle="Questions added to list" />
          <TableWrapper dataSource={addableQuestions} columns={tableColumns(allQuestions)} customAction={{buttonText: "Add", actionCallback: (record) => addToAddDrawer(record)}} customTitle="Questions you can add to list" />
        </Space>
      ) : (
        <TableWrapper dataSource={displayableQuestions} columns={tableColumns(list.interviewQuestions)} />
      )
    ) : ( <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} />} /> );

  const headerElement = isBeingEdited ? (
    <Header
      left={<h3>{list?.title}</h3>}
      right={
        <Space>
          <Button onClick={() => setDrawerVisibility(true)}>Open</Button>
          <Button onClick={discard}>Discard</Button>
          <Button type="primary" onClick={saveChanges}>
            Save
          </Button>
        </Space>
      }
    />
  ) : (
    <Header
      left={
        <div>
          <Link to="/" style={{ color: 'black', padding: 5 }}>
            <ArrowLeftOutlined />
          </Link>
          <h3>{list?.title}</h3>
        </div>
      }
      right={
        <Button type="primary" onClick={() => setBeingEdited(true)}>
          Edit
        </Button>
      }
    />
  );

  return (
    <div className={styles.questionLists}>
      <Drawer
          title="Question Cart"
          placement="left"
          onClose={() => setDrawerVisibility(false)}
          visible={isDrawerVisible}
        >
          {questionsToAdd.map((question) => (
            <>
              <Space>
                <strong>Add: </strong>
                {question.title}
                <DeleteOutlined onClick={() => removeFromAddDrawer(question)} />
              </Space>
              <Divider />
            </>
          ))}
          {questionsToRemove.map((question) => (
            <>
              <Space>
                <strong>Remove: </strong>
                {question.title}
                <DeleteOutlined
                  onClick={() => removeFromRemoveDrawer(question)}
                />
              </Space>
              <Divider />
            </>
          ))}
        </Drawer>
      {headerElement}
      <div className={styles.questionListsData}>{questionsElement}</div>
    </div>
  );
}