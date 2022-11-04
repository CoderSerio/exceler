import { Upload, Button } from "antd"
import { useAppDispatch, useAppSelector } from "renderer/hooks/store";
import { AppDispatch } from "renderer/store";
import { addFile, deleteFile } from "renderer/store/reducers/fileDataReducer";
import { ColField } from "renderer/store/reducers/types";
import { xlsx2json } from "utils/fileHandler"

interface ExcelData {
  [key: string]: any
}

export const FileReaderButton = () => {
  const allFiles = useAppSelector(state => state.fileData);
  const dispatch: AppDispatch = useAppDispatch();


  const storeData = async (file: File) => {
    const allRows = await xlsx2json(file);
    const allColFieldsSet: Set<string> = new Set();
    allRows.map((oneRow: {[key: string]: string}) => {
      Object.keys(oneRow).map((oneColField) => {
        // 不能在这一步直接修改数据结构，因为引用数据类型被Set处理为不同元素
        // allColFields.add({ name: oneColField, disable: false });
        // 先用集合处理，会比find操作更快
        allColFieldsSet.add(oneColField);
      })
    })
    const allColFields: Array<ColField> = [];
    allColFieldsSet.forEach((oneColField: string) => {
      // 初始化都放到左边不启用
      allColFields.push({name: oneColField, disable: true, from:file.name});
    })

    dispatch(addFile({id: file.name, allRows, allColFields}));
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
    <div>
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
