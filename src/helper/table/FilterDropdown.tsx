import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import React from 'react';

import style from './FilterDropdown.module.scss';
import FilterDropdownProps from './FilterDropdownProps';

export default function FilterDropdown(
  props: FilterDropdownProps
): JSX.Element {
  const {
    dataIndex,
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
    searchInput,
    handleSearchCallback,
    handleResetCallback,
  } = props;

  return (
    <div className={style.padded}>
      <Input
        ref={(node) => {
          if (node) {
            searchInput.current = node;
          }
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
