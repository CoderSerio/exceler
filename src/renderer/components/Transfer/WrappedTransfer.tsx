import { useState, useEffect } from 'react'
import { Button, Transfer } from 'antd';
import type { TransferDirection } from 'antd/es/transfer';
import { useAppDispatch, useAppSelector } from 'renderer/hooks/store';
import { AllFiles, ColField } from 'renderer/store/reducers/types';
import { AppDispatch } from 'renderer/store';
import { updateColField } from 'renderer/store/reducers/fileDataReducer';
import { modifyActiveFile, updateActiveFileIndex } from 'renderer/store/reducers/activeFileReducer';

interface TransferData {
  key: string;
  title: string;
  disable: boolean;
  from: string;
}

export const WrappedTransfer = () => {
  const allFiles: AllFiles = useAppSelector(state => state.fileData);
  const activeFile = useAppSelector(state => state.activeFile);
  const dispatch: AppDispatch = useAppDispatch();
  // 有哪些文件
  const [fileNames, setFileNames] = useState<Array<string>>([]);
  const [activeFileName, setActiveFileName] = useState<string>();
  const [transferData, setTransferData] = useState<Array<TransferData>>([]);
  const [targetKeys, setTargetKeys] = useState<Array<string>>([]);
  // const [previousCheckedDataMap, setPreviousCheckedDataMap] = useState<Map<string, string>>(new Map());
  const handleSetActiveFileName = (name: string) => {
    // TODO: 可优化点，希望能提前break掉
    allFiles.forEach((oneFile, index) => {
      if (oneFile.id === name) {
        dispatch(updateActiveFileIndex({ id: name, index: index }));
        return;
      }
    })
  }

  const getData = () => {
    const tempTransferData: Array<TransferData> = [];
    const tempFileNames: Array<string> = [];
    let changed = false;
    allFiles.forEach((oneFile) => {
      // 文件列表为空 或者 文件列表发生改动后
      tempFileNames.push(oneFile.id);
      if (fileNames.length === 0
        || (!changed && oneFile.id === activeFile.id)) {
        changed = true;
        oneFile.allColFields.forEach((oneColField, index) => {
          tempTransferData.push({
            key: oneColField.name,
            title: oneColField.name,
            disable: oneColField.disable,
            from: activeFile.id
          });
        })
      }
    })
    if (allFiles.length === 1) {
      handleSetActiveFileName(tempFileNames[0]);
    }
    if (changed) {
      setFileNames(tempFileNames);
      setTransferData(tempTransferData);
    }  };

  useEffect(() => {
    getData();
  }, [allFiles, activeFile.id]);

  // 参数是已经选中的（右侧的）内容
  const handleChange = (checkedFields: Array<string>) => {
    const tempAllColFields: Array<ColField> = [];
    allFiles.map((oneFile) => {
      oneFile.allColFields.forEach((oneColField) => {
        if (checkedFields.includes(oneColField.name)) {
            tempAllColFields.push({ name: oneColField.name, disable: false, from: oneFile.id });
        } else {
          tempAllColFields.push({ name: oneColField.name, disable: true, from: oneFile.id });
        }
      })
    })
    // 由于是change时触发，所以保证一定不为空
    dispatch(updateColField(tempAllColFields))
    dispatch(modifyActiveFile(`${new Date()}`));
    setTargetKeys(checkedFields);
  };

  const handleSearch = (dir: TransferDirection, value: string) => {
    console.log('搜索:', dir, value);
  };

  return (
    <>
      <div>
          {fileNames.map((oneFileName) => {
            return (
              <div key={oneFileName}>
                <Button onClick={() => {handleSetActiveFileName(oneFileName)}}>{oneFileName}</Button>
              </div>
            )
          })}
      </div>
      <Transfer
        listStyle={{
          height: '100%',
        }}
        dataSource={transferData}
        showSearch
        // filterOption={filterOption}
        targetKeys={targetKeys}
        onChange={handleChange}
        onSearch={handleSearch}
        render={item => item.title}
      />
    </>
  );
}
