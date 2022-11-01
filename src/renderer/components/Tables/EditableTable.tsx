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
  constant: boolean;
  children: React.ReactNode;
  dataIndex: string;
  record: TableItem;
  handleSave: (record: TableItem) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  constant,
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
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      const keys = Object.keys(values);
      // TODO: 封装一个Toast
      if (keys.includes('key')) { // 不允许修改主键
        console.log('修改失败, 不允许修改主键');
        return;
      } else if (!values[keys[0]]) { // 因为是cell所以只有一个
        values[keys[0]] = '（空）'
      }
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('数据修改失败，错误原因:', errInfo);
    }
  };
  // 获取子元素
  let childNode = children;
  // 如果是可编辑的内容
  if (!constant) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: false,
            message: `${title} 是必要的.`,
          },
        ]}
      >
        <Input
          ref={inputRef}
          onPressEnter={save}
          onBlur={save}
        />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap pr-4"
        onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: string,
  [key: string]: string,
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

export const EditableTable = () => {
  // 标题
  // TODO: 改为从文件读入Redux然后再获取
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
    {
      key: '3',
      name: 'Edward King 1',
      address: 'London, Park Lane no. 1',
      "测试字段": "hhh"
    },
  ]);
  // 标题字段
  const [tableColumns, setTableColumns] = useState<Array<TableTitle>>([]);

  const generateTableField = () => {
    const operationFields = [
      {
        title: '操作',
        dataIndex: '操作',
        onCell: () => {
          return {
            constant: true
          }
        },
        render: (_: any, record: { key: React.Key }) => {
          return <>
            {dataSource.length >= 1 ? (
              <Popconfirm title="确定要删除吗" onConfirm={() => handleDelete(record.key)}>
                <a>删除</a>
              </Popconfirm>
            ) : ''}
          </>
        }
      }
    ]
    // 获取所有键的集合
    const dataFields = new Set();
    dataSource.map((oneCol: {[key: string]: string}) => {
      Object.keys(oneCol).map((oneKey) => {
        dataFields.add(oneKey);
      })
    })
    // 将键设置为表头的格式
    // 突然意识到，Set原型上没有实现map
    const formatedDataFields: Array<TableTitle> = [];
    dataFields.forEach((oneField) => {
      formatedDataFields.push({
        title: oneField,
        dataIndex: oneField,
        onCell: (record: DataType) => {
          return {
            record,
            dataIndex: oneField,
            title: oneField,
            handleSave,
          }
        },
      })
    })

    setTableColumns([
      ...formatedDataFields,
      ...operationFields
    ])
  }

  useEffect(() => {
    generateTableField();
  }, [dataSource]);

  const handleDelete = (key: React.Key) => {
    let newData = dataSource.filter((oneData: DataType) => oneData.key != key)
    console.log(key, newData);
    setDataSource(newData as Array<DataType>);
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
    setDataSource(newData);
  };

  const handleRefresh = () => {

  }

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  return (
    <div className='p-2'>
      <Space>
        <Button onClick={() => {handleAdd()}} type="primary" >
          添加数据（测试）
        </Button>
        <Button onClick={() => {console.log('123')}} type="primary">
          导出数据（测试）
        </Button>
        <Button type="primary">
          刷新数据（测试）
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

