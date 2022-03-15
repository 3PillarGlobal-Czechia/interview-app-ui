import { ColumnsType } from 'antd/lib/table';

export default interface TableWrapperProps<RecordType extends object> {
  dataSource: RecordType[];
  columns: ColumnsType<RecordType>;
  customAction?: {
    buttonText: string;
    actionCallback: (record: RecordType) => void;
  };
  customTitle?: string;
}
