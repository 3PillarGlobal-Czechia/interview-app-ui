
import { useAppInsightsContext } from "@microsoft/applicationinsights-react-js";
import { Divider, Input, List, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import QuestionListCardLarge from '../../domain/QuestionList/QuestionListCard/QuestionListCardLarge';
import QuestionListCardSmall from '../../domain/QuestionList/QuestionListCard/QuestionListCardSmall';
import CreateQuestionListModal from '../../domain/QuestionLists/CreateQuestionListModal';
import MoreIconContent from '../../domain/QuestionLists/MoreIconContent';
import styles from '../../domain/QuestionLists/QuestionLists.module.scss';
import QuestionListsHeader from '../../domain/QuestionLists/QuestionListsHeader';
import { useLocalStorage } from '../../hooks';
import ScalableBody from '../../layout/scalableBody/ScalableBody';
import {
  Client,
  CreateQuestionSetRequest,
  QuestionModel,
  QuestionSetModel,
} from '../../services/Client';
import { filterLists } from '../../services/filterService';
import {
  colorByCategory,
  getDistinctCategories,
} from '../../services/tagCategoryColorService';

export default function QuestionLists(): JSX.Element {
  const client = new Client();
  const navigate = useNavigate();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [searchText, setSearchText] = useState<string>('');
  const [lists, setLists] = useState<QuestionSetModel[] | null>();
  const maxStoredRecentLists = 5;
  const [recentListIds, setRecentListIds] = useLocalStorage<number[]>(
    'recentListIds',
    []
  );

  useEffect(() => {
    client.getQuestionSets().then((value) => {
      setLists(value);
    });
  }, []);

  const addListIdToRecentlyUsed = (listId: number): void => {
    let currentIds = recentListIds;
    if (currentIds.includes(listId)) {
      currentIds = currentIds.filter((id) => id !== listId);
    } else if (currentIds.length >= maxStoredRecentLists) {
      currentIds.pop();
    }
    currentIds.unshift(listId);
    setRecentListIds(currentIds);
  };

  const setModalVisibility = (value: boolean | null = null): void => {
    setPopupVisible((isCurrentlyVisible) => value ?? !isCurrentlyVisible);
  };

  const createList = (title: string, description: string): void => {
    const request = new CreateQuestionSetRequest({
      title,
      description,
    });
    client.createQuestionSet(request).then((model) => {
      setLists([...(lists ?? []), model]);
    });
    setModalVisibility(false);
  };

  const tags = (interviewQuestions: QuestionModel[]): JSX.Element[] => {
    return getDistinctCategories(interviewQuestions).map((category) => (
      <Tag key={category} color={colorByCategory(category)}>
        {category}
      </Tag>
    ));
  };

  const recentlyUsedLists = (
    <List
      grid={{ xs: 2, sm: 2, md: 2, lg: 3, xl: 4, xxl: 5, gutter: 16 }}
      dataSource={
        lists
          ? recentListIds.map((id) => lists.filter((list) => list.id === id)[0])
          : undefined
      }
      renderItem={(list: QuestionSetModel) => (
        <List.Item>
          <div className="centered">
            <QuestionListCardSmall
              list={list}
              categories={tags([])}
              onCardClickedCallback={() => navigate(`QuestionList/${list.id}`)}
            />
          </div>
        </List.Item>
      )}
    />
  );

  const allLists = (
    <List
      grid={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 3, gutter: 16 }}
      dataSource={filterLists(lists ?? [], searchText)}
      pagination={{
        defaultPageSize: 12,
      }}
      renderItem={(list: QuestionSetModel) => (
        <List.Item>
          <div className="centered">
            <QuestionListCardLarge
              list={list}
              categories={tags([])}
              onCardClickedCallback={() => navigate(`QuestionList/${list.id}`)}
              moreIconContent={
                <MoreIconContent
                  list={list}
                  startInterviewCallback={() =>
                    addListIdToRecentlyUsed(list.id ?? 0)
                  }
                />
              }
            />
          </div>
        </List.Item>
      )}
    />
  );

  // Example how to use it
  const appInsights = useAppInsightsContext();
  appInsights.trackEvent({ "name": 'QuestionLists' });
  appInsights.trackPageView({"name": 'QuestionLists'})

  return (
    <ScalableBody>
      <div>
        <QuestionListsHeader
          buttonClickCallback={() => setModalVisibility(true)}
        />
        <CreateQuestionListModal
          visible={isPopupVisible}
          okCallback={createList}
          cancelCallback={() => setModalVisibility(false)}
        />
        <div>
          <Divider orientation="left" plain>
            <h3>Recently Viewed</h3>
          </Divider>
          {recentlyUsedLists}
          <Divider orientation="left" plain>
            <h3>All Lists</h3>
          </Divider>
          <div className={styles.searchListsInput}>
            <div className="half-width">
              <Input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search question lists"
                allowClear
              />
            </div>
          </div>
          {allLists}
        </div>
      </div>
    </ScalableBody>
  );
}
