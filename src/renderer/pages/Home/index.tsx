import { useState, useEffect } from 'react';
import { WrappedTransfer } from 'renderer/components/Transfer/WrappedTransfer';
import { FileReaderButton } from 'renderer/components/Buttons/FileReaderButton';
import { FileNamesButton } from 'renderer/components/Buttons/FileNamesButton';
import { TemplateTable } from 'renderer/components/Tables/TemplateTable';
import { FieldAddButton } from 'renderer/components/Buttons/FieldAddButton';
import { EditableTable } from 'renderer/components/Tables/EditableTable';


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
          <div className='p-2 relative'>
            <FieldAddButton></FieldAddButton>
            <TemplateTable></TemplateTable>
            <WrappedTransfer></WrappedTransfer>
          </div>
          <div>
            <EditableTable></EditableTable>
          </div>
        </div>
      </div>
    </div>
  );
};
