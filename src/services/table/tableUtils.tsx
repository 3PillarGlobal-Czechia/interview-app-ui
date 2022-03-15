import { SearchOutlined } from '@ant-design/icons';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import React, { ReactNode } from 'react';

import { InterviewQuestionModel } from '../Client';
import { getDistinctValues, toPascalCase } from '../stringUtils';
import FilterDropdown from './FilterDropdown';
import {
  createColumnFilterPropsInput,
  createColumnFilterPropsOutput,
  createColumnSearchPropsInput,
  createColumnSearchPropsOutput,
} from './tableUtilsProps';

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
  props: createColumnSearchPropsInput
): createColumnSearchPropsOutput {
  const { dataIndex, searchInput, handleSearchCallback, handleResetCallback } =
    props;
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
  props: createColumnFilterPropsInput
): createColumnFilterPropsOutput {
  const { dataIndex, filterData } = props;

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
