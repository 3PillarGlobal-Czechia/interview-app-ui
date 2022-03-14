import { LoadingOutlined } from '@ant-design/icons';
import { Button, Empty, Input, Modal, Space, Spin, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Link } from 'react-router-dom';

import {
  Client,
  CreateQuestionListRequest,
  InterviewQuestionModel,
  QuestionListModel,
} from '../../services/Client';
import styles from './QuestionLists.module.scss';

const { TextArea } = Input;

export default function QuestionLists(): JSX.Element {
  const client = useMemo(() => new Client(), []);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [lists, setLists] = useState<QuestionListModel[] | null>();
  const colors: string[] = useMemo(
    () => ['red', 'blue', 'green', 'orange', 'purple', 'yellow', 'black'],
    []
  );
  const colorIndex = useRef(0);
  const hashmap = useMemo(() => new Map<string, string>(), []);

  const nextColor = useCallback((): string => {
    const color = colors[colorIndex.current];
    colorIndex.current = (colorIndex.current + 1) % colors.length;
    return color;
  }, [colors]);

  const colorByCategory = useCallback(
    (category: string): string => {
      if (!hashmap.has(category)) {
        hashmap.set(category, nextColor());
      }
      return hashmap.get(category) ?? 'black';
    },
    [hashmap, nextColor]
  );

  function getDistinctCategories(
    questions: InterviewQuestionModel[]
  ): string[] {
    const set = new Set<string>();
    questions?.forEach((question) => {
      if (question?.category) {
        set.add(question.category);
      }
    });
    return Array.from(set);
  }

  useEffect(() => {
    async function loadLists(): Promise<void> {
      const data = await client.questionLists(undefined, undefined, undefined);

      setLists(data);
    }
    loadLists();
  }, [client]);

  function setModalVisibility(value: boolean | null = null): void {
    setPopupVisible((isCurrentlyVisible) => value ?? !isCurrentlyVisible);
  }

  const createList = useCallback(() => {
    const request = new CreateQuestionListRequest({
      title: titleInput,
      description: descriptionInput,
    });
    client.create2(request).then((model) => {
      setLists([...(lists ?? []), model]);
    });
    setModalVisibility(false);
  }, [client, lists, titleInput, descriptionInput]);

  const tableColumns = useMemo(
    (): ColumnsType<QuestionListModel> => [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Categories',
        dataIndex: 'interviewQuestions',
        key: 'categories',
        render: (interviewQuestions: InterviewQuestionModel[]) => (
          <>
            {getDistinctCategories(interviewQuestions).map((category) => {
              return (
                <Tag key={category} color={colorByCategory(category)}>
                  {category}
                </Tag>
              );
            })}
          </>
        ),
      },
      {
        title: 'Options',
        key: 'options',
        render: (_, record) => (
          <div>
            <Link to={`QuestionList/${record.id}`}>View</Link>
            <Button type="link">Start Interview</Button>
            <Button type="link" danger>
              Delete
            </Button>
          </div>
        ),
      },
    ],
    [colorByCategory]
  );

  const showModal = (): void => setModalVisibility(true);
  const hideModal = (): void => setModalVisibility(false);
  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setTitleInput(e.target.value);
  const onDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => setDescriptionInput(e.target.value);

  const listsElement = useMemo(() => {
    if (lists) {
      if (lists.length) {
        return <Table dataSource={lists} columns={tableColumns} />;
      }

      return <Empty description="No question lists" />;
    }

    return <Spin indicator={<LoadingOutlined />} />;
  }, [lists, tableColumns]);

  return (
    <div className={styles.questionLists}>
      <div className={styles.questionListsHeader}>
        <h3>Question Lists</h3>
        <Button type="primary" onClick={showModal}>
          Create a New List
        </Button>
      </div>
      <Modal
        title="New Question List"
        visible={isPopupVisible}
        okButtonProps={{ disabled: titleInput === '' }}
        onOk={createList}
        onCancel={hideModal}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            placeholder="Title"
            value={titleInput}
            onChange={onTitleChange}
          />
          <TextArea
            placeholder="Description"
            value={descriptionInput}
            onChange={onDescriptionChange}
            rows={4}
          />
        </Space>
      </Modal>
      <div className={styles.questionListsData}>{listsElement}</div>
    </div>
  );
}
