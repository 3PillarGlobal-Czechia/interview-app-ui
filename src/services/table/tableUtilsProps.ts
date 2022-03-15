import { Input } from 'antd';
import {
  ColumnFilterItem,
  ColumnTitle,
  FilterConfirmProps,
  FilterDropdownProps,
} from 'antd/lib/table/interface';
import { DataIndex } from 'rc-table/lib/interface';
import { Key, MutableRefObject, ReactNode } from 'react';

import { InterviewQuestionModel } from '../Client';

export type InterviewQuestionDisplayColumns =
  | 'title'
  | 'category'
  | 'content'
  | 'difficulty';

export interface createColumnSearchPropsInput {
  dataIndex: InterviewQuestionDisplayColumns;
  searchInput: MutableRefObject<Input | undefined>;
  handleSearchCallback: (
    confirm: (param: FilterConfirmProps | undefined) => void
  ) => void;
  handleResetCallback: (
    clearFilters: () => void,
    confirm: (param: FilterConfirmProps | undefined) => void
  ) => void;
}

export interface createColumnSearchPropsOutput {
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
}

export interface createColumnFilterPropsInput {
  dataIndex: InterviewQuestionDisplayColumns;
  filterData: string[];
}

export interface createColumnFilterPropsOutput {
  title: ColumnTitle<InterviewQuestionModel>;
  dataIndex: DataIndex;
  key: Key;
  filters: ColumnFilterItem[];
  onFilter: (
    value: string | number | boolean,
    record: InterviewQuestionModel
  ) => boolean;
}
