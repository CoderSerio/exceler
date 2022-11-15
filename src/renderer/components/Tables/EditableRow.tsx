import { EditableRowProps } from "./types";
import { Button, Form, FormInstance, Input, Popconfirm, Table } from 'antd';
import React from "react";
import { EditableContext } from "./EditableTable";


export const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
