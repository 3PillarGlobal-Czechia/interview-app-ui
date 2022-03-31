import { Col, List, Modal, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import InterviewHeader from '../../domain/Interview/InterviewHeader';
import InterviewTimeline from '../../domain/Interview/InterviewTimeline';
import QuestionView from '../../domain/Interview/QuestionView';
import styles from '../../domain/Interview/QuestionView.module.scss';
import { useRefMap } from '../../hooks';
import ScalableBody from '../../layout/scalableBody/ScalableBody';
import {
  Client,
  QuestionModel,
  QuestionSetDetail,
} from '../../services/Client';

export default function Interview(): JSX.Element {
  const { id } = useParams<'id'>();
  const client = new Client();
  const navigate = useNavigate();
  const [setRef, getRef] = useRefMap<HTMLDivElement>();
  const [questionSetDetail, setQuestionSetDetail] =
    useState<QuestionSetDetail>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [rating, setRating] = useState(new Map<number, number>());

  useEffect(() => {
    client
      .getQuestionSetById(Number(id))
      .then((questionSet) => setQuestionSetDetail(questionSet));
  }, []);

  const setQuestionRating = (questionId: number, value: number): void => {
    setRating(new Map(rating.set(questionId, value)));
  };

  return (
    <ScalableBody>
      <Row>
        <Col span={18}>
          <Modal
            visible={isModalVisible}
            title="Quit interview?"
            onOk={() => navigate('/')}
            onCancel={() => setIsModalVisible(false)}
            okButtonProps={{ danger: true }}
          >
            <p>Any data entered will be lost!</p>
          </Modal>
          <InterviewHeader
            questionSetName={questionSetDetail?.questionSet?.title ?? ''}
            buttonClickedCallback={() => setIsModalVisible(true)}
          />
          <List<QuestionModel>
            itemLayout="horizontal"
            dataSource={questionSetDetail?.questions}
            renderItem={(question: QuestionModel) => (
              <div
                ref={(element) =>
                  question.id && element
                    ? setRef(question.id.toString(), element)
                    : null
                }
              >
                <List.Item>
                  <QuestionView
                    question={question}
                    onRatingChanged={setQuestionRating}
                  />
                </List.Item>
              </div>
            )}
          />
        </Col>
        <Col span={6} className={styles.timelineContainer}>
          <InterviewTimeline
            questions={questionSetDetail?.questions ?? []}
            questionRating={rating}
            itemClickedCallback={(question: QuestionModel) => {
              if (question.id) {
                getRef(question.id.toString())?.scrollIntoView({
                  behavior: 'smooth',
                });
              }
            }}
          />
        </Col>
      </Row>
    </ScalableBody>
  );
}
