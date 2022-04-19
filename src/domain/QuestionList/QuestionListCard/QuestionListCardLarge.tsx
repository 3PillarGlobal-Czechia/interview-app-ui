import { MoreOutlined } from '@ant-design/icons';
import { Col, Dropdown, Progress, Row, Space } from 'antd';
import React from 'react';

import TagList from '../../../components/TagList';
import { difficultyPercentageToColor } from '../../../helper/mathUtils';
import AverageDifficultyContent from '../AverageDifficultyContent';
import styles from './QuestionListCard.module.scss';
import { QuestionListCardLargeProps } from './QuestionListCardLargeProps';

export default function QuestionListCardLarge(
  props: QuestionListCardLargeProps
): JSX.Element {
  const { list, tags, onCardClickedCallback, moreIconContent } = props;

  const averageDifficultyContentElement = (
    percent: number | undefined
  ): JSX.Element => <AverageDifficultyContent percent={percent} />;

  return (
    <Row
      onClick={onCardClickedCallback}
      className={`${styles.card} ${styles.cardLarge}`}
    >
      <Col span={9}>
        <Progress
          type="circle"
          format={(percent: number | undefined) =>
            averageDifficultyContentElement(percent)
          }
          percent={Number(list.difficulty?.value?.toFixed(2))}
          strokeColor={difficultyPercentageToColor(list.difficulty?.value ?? 0)}
        />
      </Col>
      <Col span={13}>
        <div className={styles.cardContent}>
          <Space direction="vertical" size={0}>
            <h3>{list.questionSet?.title}</h3>
            <span>By Anonymous</span>
          </Space>
          <TagList tags={tags} />
        </div>
      </Col>
      <Col span={2}>
        <div
          role="presentation"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={() => {
            // do nothing
          }}
        >
          <Dropdown overlay={moreIconContent} placement="topLeft">
            <MoreOutlined
              className={styles.threeDots}
              onClick={(e) => e.stopPropagation()}
            />
          </Dropdown>
        </div>
      </Col>
    </Row>
  );
}
