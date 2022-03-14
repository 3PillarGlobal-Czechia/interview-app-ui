import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import React, { MutableRefObject } from 'react';

import style from './FilterDropdown.module.scss';

export default function FilterDropdown({
  dataIndex,
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
  searchInput,
  handleSearchCallback,
  handleResetCallback,
}: {
  dataIndex: string;
  setSelectedKeys: (selectedKeys: React.Key[]) => void;
  selectedKeys: React.Key[];
  confirm: (param?: FilterConfirmProps) => void;
  clearFilters: () => void;
  searchInput: MutableRefObject<Input | undefined>;
  handleSearchCallback: (
    confirm: (param: FilterConfirmProps | undefined) => void
  ) => void;
  handleResetCallback: (
    clearFilters: () => void,
    confirm: (param: FilterConfirmProps | undefined) => void
  ) => void;
}): JSX.Element {
  return (
    <div className={style.padded}>
      <Input
        ref={(node) => {
          searchInput.current = node!;
        }}
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={(e) =>
          setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
        onPressEnter={() => handleSearchCallback(confirm)}
        className={style.filter}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => handleSearchCallback(confirm)}
          icon={<SearchOutlined />}
          size="small"
          className={style.small}
        >
          Search
        </Button>
        <Button
          onClick={() => handleResetCallback(clearFilters, confirm)}
          size="small"
          className={style.small}
        >
          Reset
        </Button>
      </Space>
    </div>
  );
}
