import { Input } from 'antd';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import React, { MutableRefObject } from 'react';

export default interface FilterDropdownProps {
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
}
