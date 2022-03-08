import { Button, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React from 'react';

export default function TableWrapper<RecordType extends object>({
  dataSource,
  columns,
  customAction,
  customTitle,
}: {
  dataSource: RecordType[];
  columns: ColumnsType<RecordType>;
  customAction?: {
    buttonText: string;
    actionCallback: (record: RecordType) => void;
  };
  customTitle?: string;
}): JSX.Element {
  if (customAction !== undefined) {
    columns = [
      ...columns,
      {
        title: 'Action',
        key: 'action',
        render: (_: any, record: RecordType) => (
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

  return <Table<RecordType> dataSource={dataSource} columns={columns} />;
}
