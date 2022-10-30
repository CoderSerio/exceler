/* eslint-disable */
import { InputRef, Space } from 'antd';
import { Button, Form, Input, Popconfirm, Table } from 'antd';
import type { FormInstance } from 'antd/es/form';
import React, { useContext, useEffect, useRef, useState } from 'react';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface TableItem {
  [key: string]: any
}

interface TableTitle {
  [key: string]: any
}


interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: string;
  record: TableItem;
  handleSave: (record: TableItem) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef?.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    // form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {

    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;
  childNode = editing ? (
    <Form.Item
      style={{ margin: 0 }}
      name={dataIndex}
      rules={[
        {
          required: false,
          message: `${title} is required.`,
        },
      ]}
    >
      <Input
        ref={inputRef}
        onPressEnter={save}
        onBlur={save}
        defaultValue={children?.toString()}
      />
    </Form.Item>
  ) : (
    <div
      className="editable-cell-value-wrap"
      style={{ paddingRight: 24 }}
      onClick={toggleEdit}>
      {children}
    </div>
  );

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  [key: string]: string,
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

export const EditableTable = () => {
  // 标题

  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: '0',
      name: 'Edward King 0',
      age: '32',
      address: 'London, Park Lane no. 0',
    },
    {
      key: '1',
      name: 'Edward King 1',
      address: 'London, Park Lane no. 1',
      "测试字段": "hhh"
    },
  ]);
  // 标题字段
  const [tableColumns, setTableColumns] = useState<Array<TableTitle>>([]);

  const generateTableField = () => {
    const operationFields = {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, value: any, key: any) =>
        <>
          {dataSource.length >= 1 ? (
            <Popconfirm title="确定要删除吗" onConfirm={() => handleDelete(key)}>
              <a>删除</a>
            </Popconfirm>
          ) : ''}
        </>
    }
    // 获取所有键的集合
    const dataFields = new Set();
    dataSource.map((oneCol: {[key: string]: string}) => {
      Object.keys(oneCol).map((oneKey) => {
        dataFields.add(oneKey);
      })
    })
    console.log('所有键', dataFields);
    // 将键设置为表头的格式
    // 突然意识到，Set原型上没有实现map
    const formatedDataFields: Array<TableTitle> = [];
    dataFields.forEach((oneField) => {
      if (oneField === 'key') {
        console.log('我是', oneField)
      }
      formatedDataFields.push({
        title: oneField,
        dataIndex: oneField,
        onCell: (record: DataType) => {
          return {
            record,
            editable: false,
            dataIndex: oneField,
            title: oneField,
            handleSave,
          }
        },
      })
    })

    setTableColumns([
      ...formatedDataFields,
      operationFields
    ])
  }

  useEffect(() => {
    generateTableField();
  }, [dataSource]);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter(item => item.key !== key);
    setDataSource(newData);
  };

  // 批量处理就循环调用
  const handleAdd = (newData: DataType = {}) => {
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
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  // const columns = tableColumns.map((col: any) => {
  //   if (!col.editable) {
  //     return col;
  //   }
  //   return {
  //     ...col,
  //     onCell: (record: DataType) => {
  //       return {
  //         record,
  //         editable: col.editable ?? '',
  //         dataIndex: col.dataIndex ?? '',
  //         title: col.title ?? '',
  //         // handleSave,
  //       }},
  //   };
  // });

  return (
    <div className='p-2'>
      <Space>
        <Button onClick={() => {handleAdd()}} type="primary" style={{ marginBottom: 16 }}>
          测试操作
        </Button>
        <Button type="primary" style={{ marginBottom: 16 }}>
          添加数据
        </Button>
        <Button type="primary" style={{ marginBottom: 16 }}>
          其他操作1
        </Button>
      </Space>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={tableColumns as ColumnTypes}
        scroll={{ x:  300 + tableColumns.length * 80}}
      />
    </div>
  );
};

