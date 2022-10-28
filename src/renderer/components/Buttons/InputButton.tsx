import { Input, Space } from 'antd';
const { Search } = Input;


export const InputButton = () => {
  const handleInput = (str: string) => {
    console.log(str);
  }
  return (
    <div className='my-2'>
      <Search
        placeholder="新增表头"
        allowClear
        enterButton="添加"
        size="large"
        onSearch={handleInput}

      />
    </div>
  )

}
