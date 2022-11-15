import { Upload, Button } from "antd"
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "renderer/hooks/store";
import { AppDispatch, RootState } from "renderer/store";
import { addFile, deleteFile, updateColField, updateRowData } from "renderer/store/reducers/fileDataReducer";
import { getKeys } from "utils/excel";
import { xlsx2json } from "utils/fileHandler"

interface ExcelData {
  [key: string]: any
}

export const FileReaderButton = () => {
  const allFiles = useSelector((state: RootState) => state.fileData);
  const activeFile = useSelector((state: RootState) => state.activeFile);
  const dispatch: AppDispatch = useAppDispatch();
  const storeData = async (file: File) => {
    const allRows = await xlsx2json(file);
    const allColFields = getKeys(allRows, file.name);
    // if (allFiles.length === 0) {
    //   dispatch(addFile({id: '总表', allRows, allColFields}));
    // }
    dispatch(addFile({id: file.name, allRows, allColFields}));
  }

  const handleBeforeUpload = (file: File) => {
    for (const oneFile of allFiles) {
      if (oneFile.id === file.name) {
        console.log('已经上传过文件');
        // TODO: TOAST提示
        return Upload.LIST_IGNORE;
      } else if (file.name === '总表') {
        console.log('非法文件名');
        return Upload.LIST_IGNORE;
      }
    }
  }

  // const refreshTotalExcleFileData = () => {
  //   if (allFiles[0]?.id === '总表') {
  //     generateTotalExcelFile(allFiles).then((totalExcelFile) => {
  //       dispatch(updateRowData({index: 0, data: totalExcelFile.allRows}));
  //       dispatch(updateColField({index: 0, data: totalExcelFile.allColFields}));
  //       dispatch(modifyActiveFile(`${new Date()}`));
  //     })
  //   }
  // }

  // useEffect(refreshTotalExcleFileData, [allFiles.length, activeFile.id]);


  return (
    <div id="xlsx-file-upload" className="px-2">
      <Upload
        customRequest={(e) => storeData(e.file as File)}
        beforeUpload={(e) => handleBeforeUpload(e)}
        accept={'.xlsx'}
        style={{
          display: "flex",
          justifyContent: 'space-around',
        }}
        multiple>
        <Button type="primary" style={{width: '260px', height: '160px', fontSize: '32px', margin: '0 0 0 8px'}}>上传文件</Button>
      </Upload>
    </div>
  )
}
