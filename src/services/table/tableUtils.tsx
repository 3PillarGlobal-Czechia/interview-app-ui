import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import {
  ColumnFilterItem,
  ColumnTitle,
  FilterConfirmProps,
  FilterDropdownProps,
  Key,
} from 'antd/lib/table/interface';
import { DataIndex } from 'rc-table/lib/interface';
import React, { MutableRefObject, ReactNode } from 'react';

import { InterviewQuestionModel } from '../Client';
import { getDistinctValues, toPascalCase } from '../stringUtils';
import FilterDropdown from './FilterDropdown';

export function createDefaultColumnProps(dataIndex: string): {
  title: string;
  dataIndex: string;
  key: string;
} {
  return {
    title: toPascalCase(dataIndex),
    dataIndex,
    key: dataIndex,
  };
}

const searchHighlightColor = '#1890ff';

export function createColumnSearchProps(
  dataIndex: 'title' | 'category' | 'content' | 'difficulty',
  searchInput: MutableRefObject<Input | undefined>,
  handleSearchCallback: (
    confirm: (param: FilterConfirmProps | undefined) => void
  ) => void,
  handleResetCallback: (
    clearFilters: () => void,
    confirm: (param: FilterConfirmProps | undefined) => void
  ) => void
): {
  title: ColumnTitle<InterviewQuestionModel>;
  dataIndex: DataIndex;
  key: Key;
  filterIcon: ReactNode | ((filtered: boolean) => ReactNode);
  filterDropdown: ReactNode | ((props: FilterDropdownProps) => ReactNode);
  onFilterDropdownVisibleChange: (visible: boolean) => void;
  onFilter: (
    value: string | number | boolean,
    record: InterviewQuestionModel
  ) => boolean;
} {
  return {
    ...createDefaultColumnProps(dataIndex),
    filterIcon: (filtered: boolean): ReactNode => (
      <SearchOutlined color={filtered ? searchHighlightColor : undefined} />
    ),
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: {
      setSelectedKeys: (selectedKeys: React.Key[]) => void;
      selectedKeys: React.Key[];
      confirm: (param?: FilterConfirmProps) => void;
      clearFilters: () => void;
    }) => (
      <FilterDropdown
        setSelectedKeys={setSelectedKeys}
        selectedKeys={selectedKeys}
        confirm={confirm}
        clearFilters={clearFilters}
        dataIndex={dataIndex}
        searchInput={searchInput}
        handleSearchCallback={handleSearchCallback}
        handleResetCallback={handleResetCallback}
      />
    ),
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => searchInput.current!.select(), 100);
      }
    },
    onFilter: (
      value: string | number | boolean,
      record: InterviewQuestionModel
    ): boolean => {
      return record[dataIndex]!.toString()
        .toLowerCase()
        .includes(value.toString().toLowerCase());
    },
  };
}

export function createColumnFilterProps(
  dataIndex: 'title' | 'category' | 'content' | 'difficulty',
  filterData: string[]
): {
  title: ColumnTitle<InterviewQuestionModel>;
  dataIndex: DataIndex;
  key: Key;
  filters: ColumnFilterItem[];
  onFilter: (
    value: string | number | boolean,
    record: InterviewQuestionModel
  ) => boolean;
} {
  return {
    ...createDefaultColumnProps(dataIndex),
    filters: getDistinctValues(filterData).map((value) => {
      return { text: value, value };
    }),
    onFilter: (
      value: string | number | boolean,
      record: InterviewQuestionModel
    ): boolean => {
      return (
        record[dataIndex]
          ?.toString()
          .toLowerCase()
          .indexOf(value.toString().toLowerCase()) === 0
      );
    },
  };
}
