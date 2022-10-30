import { AppDispatch } from 'renderer/store';
import { increment, decrement, incrementAsync } from 'renderer/store/reducers/testReducer'
import { useAppSelector, useAppDispatch } from 'renderer/hooks/store';
import { Button } from 'antd';

export const ReduxTest = () => {
  const test = useAppSelector(state => state.test.value);
  const dispatch: AppDispatch = useAppDispatch();

  return (
    <div>
      <h1>ReduxTest</h1>
      <div style={{color:'red'}}>{test}</div>
      <Button onClick={() => {
        console.log('渲染', test);
        dispatch(increment());
      }}>+1</Button>
      <Button onClick={() => {
        dispatch(decrement());
      }}>-1</Button>
      <Button onClick={() => {
        dispatch(incrementAsync());
      }}>
        异步+1
      </Button>
    </div>
  )
}
