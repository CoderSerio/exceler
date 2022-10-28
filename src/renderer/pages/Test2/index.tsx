import { Button, Upload, UploadFile } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import { read, utils, writeFile } from 'xlsx';

interface ExcelData {
  [key: string]: string
}

export const Test2 = () => {
  return (
    <>
      <Upload
        onChange={(fileInfo) => {
          console.log('文件上传ing', fileInfo);
          if(fileInfo.file.percent && fileInfo.file.percent >= 100) {

          }
        }}
      >
        <h2>这是测试2</h2>
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </>
  )
}
