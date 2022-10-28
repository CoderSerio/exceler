import { Upload, Button } from "antd"
import { xlsxFileRead } from "utils/fileHandler"

export const FileReaderButton = () => {
  return (
    <Upload
      customRequest={async (e) => {
        console.log(e.file);
        const xlsxData = await xlsxFileRead(e.file as File);
        console.log('xlsxData', xlsxData);
      }}
      accept={'.xlsx'}
      action=''
      multiple
    >
      <Button>上传文件</Button>
    </Upload>
  )

}
