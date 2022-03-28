import { Button, Table } from 'antd';
import React from 'react';

import TableWrapperProps from './TableWrapperProps';

export default function TableWrapper<RecordType extends object>(
  props: TableWrapperProps<RecordType>
): JSX.Element {
  const { dataSource, customAction, customTitle } = props;
  let { columns } = props;
  if (customAction !== undefined) {
    columns = [
      ...columns,
      {
        title: 'Action',
        key: 'action',
        render: (_, record: RecordType) => (
          <Button
            type="link"
            onClick={() => customAction.actionCallback(record)}
          >
            {customAction.buttonText}
          </Button>
        ),
      },
    ];
  }

  if (customTitle !== undefined) {
    columns = [
      {
        title: customTitle,
        children: columns,
      },
    ];
  }

  return (
    <Table<RecordType> rowKey="id" dataSource={dataSource} columns={columns} />
  );
}

TableWrapper.defaultProps = {
  customAction: undefined,
  customTitle: undefined,
};
