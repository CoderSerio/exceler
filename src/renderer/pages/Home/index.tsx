import { useState, useEffect } from 'react';
import { WrappedTransfer } from 'renderer/components/Transfer/WrappedTransfer';
import { FileReaderButton } from 'renderer/components/Buttons/FileReaderButton';
// import { InputButton } from 'renderer/components/Buttons/InputButton';
import { LayoutedTable } from 'renderer/components/Tables/LayoutedTable';
import { FileNamesButton } from 'renderer/components/Buttons/FileNamesButton';
import { TemplateTable } from 'renderer/components/Tables/TemplateTable';
import { FieldAddButton } from 'renderer/components/Buttons/FieldAddButton';


export const Home = () => {
  return (
    <div className='w-screen'>
      <div className='flex flex-col px-2' id='content-header'>
        <div style={{
          height: '200px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <FileReaderButton></FileReaderButton>
          <FileNamesButton></FileNamesButton>
        </div>
        <div className='px-2' id='content-body'>
          <div className='p-2'>
            {/* <InputButton></InputButton> */}
            <FieldAddButton></FieldAddButton>
            <TemplateTable></TemplateTable>
            <WrappedTransfer></WrappedTransfer>
          </div>
          <div>
            <LayoutedTable></LayoutedTable>
          </div>
        </div>
      </div>
    </div>
  );
};
