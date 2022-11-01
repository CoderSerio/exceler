import { Upload, Button } from "antd"
import { useAppDispatch, useAppSelector } from "renderer/hooks/store";
import { AppDispatch } from "renderer/store";
import { addFile, deleteFile } from "renderer/store/reducers/fileDataReducer";
import { xlsxFileRead } from "utils/fileHandler"

interface ExcelData {
  [key: string]: any
}

export const FileReaderButton = () => {
  const fileData = useAppSelector(state => state.fileData);

  const exportFile = async () => {
    console.log(fileData)
  }

  return (
      <Button>上传文件</Button>
  )
}
