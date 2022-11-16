import { useState } from "react";
import { Modal } from "antd";
import { RootState } from "renderer/store";
import { useSelector } from "react-redux";
import { TotalResultTable } from '../Tables/TotalResultTable';
import { OneFile } from "renderer/store/reducers/types";

interface Props {
  isShow: boolean,
  setIsShow: (flag: boolean) => void,
  totalData: OneFile,
}

export const TotalResultModal = ({isShow, setIsShow, totalData}: Props) => {
  const allFiles = useSelector((state: RootState) => state.fileData);
  const activeFile = useSelector((state: RootState) => state.activeFile);

  const handleOk = () => {
    // TODO: 确定生成
    console.log('生成总表');
  }
  const handleClose = () => {
    setIsShow(false);
  }

  return (
    <>
      <Modal
        title="总表"
        centered
        open={isShow}
        onOk={() => { handleOk() }}
        onCancel={() => { handleClose() }}
        width={1000}
        maskClosable={false}
        keyboard={false}
        okText={'确认导出'}
      >
        <TotalResultTable totalData={totalData}></TotalResultTable>
      </Modal>
    </>
  )
}
