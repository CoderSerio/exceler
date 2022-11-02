// 测试数据，没什么用
export interface TestState {
  value: number;
}

// 一个xlsx文件内的单行数据
export interface RowData {
  [k: string]: string,
};

// 一个文件内的一个字段
export interface ColField {
  name: string,
  disable: boolean,
  // 树形结构存储，所以不需要存储其属于哪个文件
}

// 一个文件
export interface OneFile {
  id: string, // 文件名字
  allRows: Array<RowData>,
  allColFields: Array<ColField>,
}

// 所有文件的集合
export type AllFiles = Array<OneFile>;

// 当前显示的是哪个文件的
export interface ActiveFileState {
  id: string,
  index: number,
}
