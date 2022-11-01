import { useState, useEffect } from 'react'
import { Transfer } from 'antd';
import type { TransferDirection } from 'antd/es/transfer';
import { useAppSelector } from 'renderer/hooks/store';
import { AllFiles } from 'renderer/store/reducers/types';

interface TransferData {
  key: string;
  title: string;
  disable: boolean;
}

export const WrappedTransfer = () => {
  const allFiles: AllFiles = useAppSelector(state => state.fileData);
  // 有哪些文件
  const [transferData, setTransferData] = useState<Array<TransferData>>([]);
  const [targetKeys, setTargetKeys] = useState<Array<string>>([]);

  const getData = () => {
    const tempTransferData: Array<TransferData> = [];
    allFiles.forEach((oneFile) => {
      oneFile.allColFields.forEach((oneColField) => {
        tempTransferData.push({
          key: oneColField.name,
          title: oneColField.name,
          disable: oneColField.disable
        });
      })
    })
    setTransferData(tempTransferData);
  };

  useEffect(() => {
    getData();
  }, [allFiles]);

  // const filterOption = (inputValue: string, option: RecordType) =>
  //   option.description.indexOf(inputValue) > -1;

  const handleChange = (newTargetKeys: string[]) => {
    setTargetKeys(newTargetKeys);
  };

  const handleSearch = (dir: TransferDirection, value: string) => {
    console.log('搜索:', dir, value);
  };


  return (
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
  );
}
