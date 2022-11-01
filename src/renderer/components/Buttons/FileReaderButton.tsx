import { Upload, Button } from "antd"
import { useAppDispatch, useAppSelector } from "renderer/hooks/store";
import { AppDispatch } from "renderer/store";
import { addFile, setFile, deleteFile } from "renderer/store/reducers/fileDataReducer";
import { xlsxFileRead } from "utils/fileHandler"

interface ExcelData {
  [key: string]: any
}

export const FileReaderButton = () => {
  const allFiles = useAppSelector(state => state.fileData);
  const dispatch: AppDispatch = useAppDispatch();


  const storeData = async (file: File) => {
    const xlsxData = await xlsxFileRead(file);
    dispatch(addFile({id: file.name, data: xlsxData}));
  }

  const handleBeforeUpload = (file: File) => {
    for (const oneFile of allFiles) {
      if (oneFile.id === file.name) {
        console.log('已经上传过文件');
        // 阻止文件重复上传
        return Upload.LIST_IGNORE;
      }
    }
  }

  return (
    <div >
      <Upload
        customRequest={(e) => storeData(e.file as File)}
        beforeUpload={(e) => handleBeforeUpload(e)}
        accept={'.xlsx'}
        action=''
        multiple>
        <Button>上传文件</Button>
      </Upload>
      {/* TODO: 临时样式，后面用组件替换 */}
      <ol>
        {allFiles.map((oneFile) => {
          return (
            <li key={oneFile.id}>
              {oneFile.id}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
