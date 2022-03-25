import { SearchOutlined } from '@ant-design/icons';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import React, { ReactNode } from 'react';

import { QuestionModel } from '../Client';
import { getDistinctValues, toPascalCase } from '../stringUtils';
import FilterDropdown from './FilterDropdown';
import {
  CreateColumnFilterPropsInput,
  CreateColumnFilterPropsOutput,
  CreateColumnSearchPropsInput,
  CreateColumnSearchPropsOutput,
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
  props: CreateColumnSearchPropsInput
): CreateColumnSearchPropsOutput {
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
        if (searchInput.current) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      }
    },
    onFilter: (
      value: string | number | boolean,
      record: QuestionModel
    ): boolean =>
      record[dataIndex]
        ?.toString()
        .toLowerCase()
        .includes(value.toString().toLowerCase()) ?? false,
  };
}

export function createColumnFilterProps(
  props: CreateColumnFilterPropsInput
): CreateColumnFilterPropsOutput {
  const { dataIndex, filterData } = props;

  return {
    ...createDefaultColumnProps(dataIndex),
    filters: getDistinctValues(filterData).map((value) => {
      return { text: value, value };
    }),
    onFilter: (
      value: string | number | boolean,
      record: QuestionModel
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
