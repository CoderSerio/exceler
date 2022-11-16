import { Button, Popconfirm, Space, Table } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'renderer/store';
import { DataType, TableTitle } from './types';
import { json2xlsx } from 'utils/fileHandler';
import { OneFile, RowData } from 'renderer/store/reducers/types';
import { useAppDispatch } from 'renderer/hooks/store';
import { EditableCell } from './EditableCell';
import { EditableRow } from './EditableRow';

type EditableTableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

interface Props {
  totalData: OneFile,
};

// TODO: 这个模块的核心思想是, 利用state做响应的数据视图渲染, 所有改动完毕后, 确认是否保存若确认才同步
export const TotalResultTable = ({ totalData }: Props) => {
  const allFiles = useSelector((state: RootState) => state.fileData);
  const dispatch: AppDispatch = useAppDispatch();

  const [dataSource, setDataSource] = useState<Array<DataType>>([]);
  const [tableColumns, setTableColumns] = useState<Array<TableTitle>>([]);
  const tableRef = useRef<any>();

  // 获取当前active的文件内容
  const generateTableRows = () => {
    const newDataSource: Array<DataType> = [];
    totalData?.allRows.forEach((oneRow, index) => {
      newDataSource.push({
        key: `${index}`,
        ...oneRow,
      })
    });
    console.log('total', newDataSource);
    setDataSource(newDataSource);
  }

  const generateTableCols = () => {
    const operationFields = [
      {
        title: '操作',
        dataIndex: '操作',
        onCell: () => {
          return {
            constant: false,
          }
        },
        render: (_: any, record: { key: React.Key }) => {
          return <>
            {dataSource.length && tableColumns.length ? (
              <Popconfirm title="确定要删除吗" onConfirm={() => handleDelete(record.key)}>
                <a>删除</a>
              </Popconfirm>
            ) : ''}
          </>
        }
      }
    ];

    const formatedDataFields: Array<TableTitle> = [];
    totalData?.allColFields.forEach((oneField) => {
      if (!oneField.disable) {
        formatedDataFields.push({
          title: oneField.name,
          dataIndex: oneField.name,
          onCell: (record: DataType) => {
            return {
              record,
              dataIndex: oneField.name,
              title: oneField.name,
              handleSave,
            }
          },
        })
      }
    });
    console.log('total-column', formatedDataFields)
    setTableColumns([
      ...formatedDataFields,
      ...operationFields
    ]);
  };

  useEffect(() => {
    generateTableCols();
  }, [totalData, dataSource]);
  useEffect(() => {
    generateTableRows();
  }, [totalData]);

  const handleDelete = (key: React.Key) => {
    let newData = dataSource.filter((oneData: DataType) => oneData.key != key)
    setDataSource(newData);
    // dispatch(updateRowData({ index: activeFile.index, data: newData }));
  };

  // 批量处理就循环调用
  const handleAdd = (newData: DataType = {key: `${dataSource.length}`}) => {
    setDataSource([...dataSource, newData]);
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    // dispatch(updateRowData({ index: activeFile.index, data: newData }));
    setDataSource(newData);
  };

  const handleExport = () => {
    // 筛选出启用的字段
    const rows: Array<RowData> = [];
    dataSource.forEach((oneRow) => {
      const nonDisablePart: RowData = {};
      totalData?.allColFields.forEach((oneCol) => {
        if (!oneCol.disable) {
          nonDisablePart[oneCol.name] = oneRow[oneCol.name];
        }
      })
      if (nonDisablePart) {
        rows.push(nonDisablePart);
      }
    })
    json2xlsx(rows);
  }

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  return (
    <div>
      <Space>
        {/* <Button onClick={() => {handleAdd()}} type="primary" style={{ height: '40px' }}>
          添加数据
        </Button> */}
        <Button onClick={() => {handleExport()}} type="primary" style={{ height: '40px' }}>
          导出数据
        </Button>
      </Space>
      <Table
        ref={tableRef}
        id='totalTable'
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={tableColumns as ColumnTypes}
        scroll={{ x:  300 +  80 * tableColumns.length, y: 420 }}
        className={'mt-2'}
        tableLayout={'fixed'}
        pagination={false}
      >
      </Table>
    </div>
  );
};

