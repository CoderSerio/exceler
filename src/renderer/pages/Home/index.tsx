import { useState, useEffect } from 'react';
import { WrappedTransfer } from 'renderer/components/Transfer/WrappedTransfer';
import { FileReaderButton } from 'renderer/components/Buttons/FileReaderButton';
import { EditableTable } from 'renderer/components/Tables/EditableTable';
import { InputButton } from 'renderer/components/Buttons/InputButton';
import { TableRouterTab } from 'renderer/components/Cards/TableRouterTab';


export const Home = () => {
  return (
    <div className='flex place-content-around'>
      <div className='w-1/3 max-w-sm min-w-max h-screen flex flex-col'>
        <div className='min-h-1/5 max-h-2/5 overflow-y-auto p-2'>
          <FileReaderButton></FileReaderButton>
          <InputButton></InputButton>
        </div>
        <div className='p-2'>
          <WrappedTransfer></WrappedTransfer>
        </div>
      </div>
      <div className='w-2/3 h-screen'>
        <TableRouterTab></TableRouterTab>
        <EditableTable></EditableTable>
      </div>
    </div>
  );
};
