import { useState, useEffect } from 'react';
import { Button, Transfer } from 'antd';
import type { TransferDirection, TransferListProps } from 'antd/es/transfer';
import { useAppDispatch, useAppSelector } from 'renderer/hooks/store';
import { AllFiles, ColField } from 'renderer/store/reducers/types';
import { AppDispatch } from 'renderer/store';
import { updateColField } from 'renderer/store/reducers/fileDataReducer';
import {
  modifyActiveFile,
  updateActiveFileIndex,
} from 'renderer/store/reducers/activeFileReducer';

interface TransferData {
  key: string;
  title: string;
  disable: boolean;
  from: string;
}

export const WrappedTransfer = () => {
  const allFiles: AllFiles = useAppSelector((state) => state.fileData);
  const activeFile = useAppSelector((state) => state.activeFile);
  const dispatch: AppDispatch = useAppDispatch();
  // 有哪些文件
  const [transferData, setTransferData] = useState<Array<TransferData>>([]);
  const [targetKeys, setTargetKeys] = useState<Array<string>>([]);
  const [key2TitleMap, setKey2TitleMap] = useState<Map<string, string>>(new Map());

  const handleSetActiveFileName = (name: string) => {
    allFiles.forEach((oneFile, index) => {
      if (oneFile.id === name) {
        dispatch(updateActiveFileIndex({ id: name, index }));
        return;
      }
    });
  };

  const getData = () => {
    const tempTransferData: Array<TransferData> = [];
    const tempFileNames: Array<string> = [];
    const tempKey2TitleMap = new Map<string, string>();
    allFiles.forEach((oneFile) => {
      // 文件列表为空 或者 文件列表发生改动后
      tempFileNames.push(oneFile.id);
    });
    allFiles.forEach((oneFile) => {
      if (tempFileNames.length === 1 || oneFile.id === activeFile.id) {
        const actFileName =
          tempFileNames.length === 1 ? tempFileNames[0] : activeFile.id;
        oneFile.allColFields.forEach((oneColField) => {
          if (oneColField.from === actFileName) {
            const key = `${actFileName}-${oneColField.name}`;
            const title =  oneColField.name;
            const disable = oneColField.disable;
            const from = actFileName;
            tempTransferData.push({ key, title, disable, from });
            if (!tempKey2TitleMap.get(key)) {
              tempKey2TitleMap.set(key, title);
            }
          }
        });
      }
    });
    if (allFiles.length === 1) {
      handleSetActiveFileName(tempFileNames[0]);
    }
    setKey2TitleMap(tempKey2TitleMap);
    setTransferData(tempTransferData);
  };
  useEffect(() => {
    getData();
  }, [allFiles.length, activeFile.index]);

  // 参数是已经选中的（右侧的）内容
  const handleChange = (checkedFieldsKeys: Array<string>) => {
    // 拿到的是key值, 需要找到对应的title值
    const checkedFieldsTitles: Array<string> = [];
    checkedFieldsKeys.forEach((oneKey) => {
      const oneTitle = key2TitleMap.get(oneKey) as string;
      checkedFieldsTitles.push(oneTitle);
    });
    const tempAllColFields: Array<ColField> = [];
    allFiles[activeFile.index].allColFields.forEach((oneColField) => {
      let disable = true;
      if (checkedFieldsTitles.includes(oneColField.name)) {
        disable = false;
      }
      tempAllColFields.push({
        disable,
        name: oneColField.name,
        from: activeFile.id,
      });
    });
    // 由于是change时触发，所以保证一定不为空
    dispatch(
      updateColField({ index: activeFile.index, data: tempAllColFields })
    );
    dispatch(modifyActiveFile(`${new Date()}`));
    setTargetKeys(checkedFieldsTitles);
  };

  const handleSearch = (dir: TransferDirection, value: string) => {
  };

  return (
    <>
      <Transfer
        listStyle={{
          height: '500px',
        }}
        titles={['未启用', '启用']}
        dataSource={transferData}
        // filterOption={filterOption}
        targetKeys={targetKeys}
        onChange={handleChange}
        onSearch={handleSearch}
        render={(item) => item.title}
      />
    </>
  );
};
