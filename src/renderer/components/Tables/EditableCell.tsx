import { Form, Input, InputRef } from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import { EditableContext } from "./EditableTable";
import { EditableCellProps } from "./types";


export const EditableCell: React.FC<EditableCellProps> = ({
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
    if (dataIndex) {
      setEditing(!editing);
      form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    }
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      const keys = Object.keys(values);
      if (keys.includes('key')) {
        console.log('修改失败, 不允许修改主键');
        return;
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
          onPressEnter={() => {save()}}
          onBlur={() => {save()}}
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
