export interface TableItem {
  [key: string]: any
};

export interface TableTitle {
  [key: string]: any
};


export interface EditableRowProps {
  index: number;
}

export interface EditableCellProps {
  title: React.ReactNode;
  constant: boolean;
  children: React.ReactNode;
  dataIndex: string;
  record: TableItem;
  handleSave: (record: TableItem) => void;
}

export interface DataType {
  key: string,
  [key: string]: string,
}

// TODO:
// 先使用传递key（也就是文件名）的方式进行切换，这样易于实现和维护
// 如果需要进行必要的加载速度优化，那么再考虑实现传递组件
export interface Tab {
  key: string,
  tab: string,
  // content: string | JSX.Element | React.ReactNode
}
