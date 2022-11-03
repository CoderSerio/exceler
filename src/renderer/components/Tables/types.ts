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

// 其实就是RowData，但是要考虑antd需要一个key作为每行数据的唯一标识
// TODO: 这里需要封装一个xlsx数据格式和table数据格式想转换的方法（其实就是处理key）
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

export interface WbSheetCell {
  t: string,
  v: string,
}
export interface WbSheet {
  [key: string]: WbSheetCell,
}
