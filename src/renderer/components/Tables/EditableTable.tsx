import { InputRef, Space } from 'antd';
import { Button, Form, Input, Popconfirm, Table } from 'antd';
import type { FormInstance } from 'antd/es/form';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'renderer/store';
import { DataType, EditableCellProps, EditableRowProps, TableTitle, WbSheet } from './types';
import { json2xlsx } from 'utils/fileHandler';
import { RowData } from 'renderer/store/reducers/types';
import { updateRowData } from 'renderer/store/reducers/fileDataReducer';
import { useAppDispatch } from 'renderer/hooks/store';
import { TotalResultModal } from '../Modals/TotalResultModal';
import { EditableRow } from './EditableRow';
import { EditableCell } from './EditableCell';

export const EditableContext = React.createContext<FormInstance<any> | null>(null);

type EditableTableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

export const EditableTable = () => {
  const allFiles = useSelector((state: RootState) => state.fileData);
  const activeFile = useSelector((state: RootState) => state.activeFile);
  const dispatch: AppDispatch = useAppDispatch();
  const [dataSource, setDataSource] = useState<Array<DataType>>([]);
  const [tableColumns, setTableColumns] = useState<Array<TableTitle>>([]);
  const [isShowTotalResultModal, setIsShowTotalResultModal] = useState<boolean>(false);
  const tableRef = useRef<any>();
  // 获取当前active的文件内容
  const generateTableRows = () => {
    if(activeFile.index < 0) {
      return ;
    }
    const newDataSource: Array<DataType> = [];
    allFiles[activeFile.index]?.allRows.forEach((oneRow, index) => {
      newDataSource.push({
        key: `${index}`,
        ...oneRow,
      })
    })
    setDataSource(newDataSource);
  }

  // 生成表格表头字段
  const generateTableCols = () => {
    const operationFields = [
      {
        title: '操作',
        dataIndex: '操作',
        onCell: () => {
          return {
            constant: false
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
    allFiles[activeFile.index]?.allColFields.forEach((oneField) => {
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
    })

    setTableColumns([
      ...formatedDataFields,
      ...operationFields
    ])
  }

  useEffect(() => {
    generateTableCols();
  }, [activeFile.index, activeFile!.lastModify, dataSource])
  useEffect(() => {
    generateTableRows();
  }, [activeFile.index, activeFile!.lastModify])

  const handleDelete = (key: React.Key) => {
    let newData = dataSource.filter((oneData: DataType) => oneData.key != key)
    setDataSource(newData);
    dispatch(updateRowData({ index: activeFile.index, data: newData }));
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
    dispatch(updateRowData({ index: activeFile.index, data: newData }));
    setDataSource(newData);
  };

  const handleExport = () => {
    // // 筛选出启用的字段
    const rows: Array<RowData> = [];
    allFiles[activeFile.index].allRows.forEach((oneRow) => {
      const nonDisablePart: RowData = {};
      allFiles[activeFile.index]?.allColFields.forEach((oneCol) => {
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

  const computTotalResult = () => {
    setIsShowTotalResultModal(true);
  }

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  return (
    <div className='p-2'>
      <TotalResultModal
        isShow={isShowTotalResultModal}
        setIsShow={(flag: boolean) => {setIsShowTotalResultModal(flag)}}></TotalResultModal>
      <Space>
        <Button onClick={() => {computTotalResult()}} type="primary" style={{ height: '40px' }}>
          合成总表
        </Button>
        <Button onClick={() => {handleAdd()}} type="primary" style={{ height: '40px' }}>
          添加数据
        </Button>
        <Button onClick={() => {handleExport()}} type="primary" style={{ height: '40px' }}>
          导出数据
        </Button>
      </Space>
      <Table
        ref={tableRef}
        id='table'
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={tableColumns as ColumnTypes}
        scroll={{ x:  300 +  80 * tableColumns.length, y: 560 }}
        className={'mt-2 '}
        tableLayout={'fixed'}
        pagination={false}
      >
      </Table>
    </div>
  );
};
