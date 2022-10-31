import { Upload, Button } from "antd"
import { useAppDispatch, useAppSelector } from "renderer/hooks/store";
import { AppDispatch } from "renderer/store";
import { addFile, setFile, deleteFile } from "renderer/store/reducers/fileDataReducer";
import { xlsxFileRead } from "utils/fileHandler"

interface ExcelData {
  [key: string]: any
}

export const FileReaderButton = () => {
  const fileData = useAppSelector(state => state.fileData);
  const dispatch: AppDispatch = useAppDispatch();


  const storeData = async (file: File) => {
    const xlsxData = await xlsxFileRead(file);
    console.log('xlsxData', xlsxData);
    dispatch(addFile(xlsxData));
  }

  return (
    <Upload
      customRequest={(e) => storeData(e.file as File)}
      accept={'.xlsx'}
      action=''
      multiple>
      <Button>上传文件</Button>
    </Upload>
  )
}
