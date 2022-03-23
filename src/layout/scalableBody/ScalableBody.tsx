import { Col, Row } from 'antd';
import React from 'react';

export default function ScalableBody({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  return (
    <Row>
      <Col lg={0} xl={2} xxl={3} />
      <Col lg={24} xl={20} xxl={18} className="full-width">
        {children}
      </Col>
      <Col lg={0} xl={2} xxl={3} />
    </Row>
  );
}
