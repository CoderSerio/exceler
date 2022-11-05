import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from 'renderer/hooks/store';
import { AppDispatch } from 'renderer/store';
import { updateActiveFileIndex } from 'renderer/store/reducers/activeFileReducer';

export const FileNamesButton = () => {
  const allFiles = useAppSelector(state => state.fileData);
  const dispatch: AppDispatch = useAppDispatch();

  const handleSetActiveFileName = (name: string) => {
    allFiles.forEach((oneFile, index) => {
      if (oneFile.id === name) {
        dispatch(updateActiveFileIndex({ id: name, index: index }));
        return;
      }
    })
  }

  const handleRemoveFileName = (name: string) => {

  }

  return (
    <div id='file-name-btns'>
        {allFiles.map((oneFile) => {
          return (
            <div key={oneFile.id} className="flex ">
              <Button className='w-full' onClick={() => {handleSetActiveFileName(oneFile.id)}}>{oneFile.id}</Button>
              <Button>删除</Button>
            </div>
          )
        })}
    </div>
  )
}
