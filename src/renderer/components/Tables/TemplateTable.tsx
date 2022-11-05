import { Button } from "antd"
import { useState } from "react";

export const TemplateTable = () => {
  const [tempTestData, setTempTestData] = useState<Array<string>>(['模板1', '模板2', '模板3', '模板4']);
  return (
    <div className="w-full mb-2">
      <div className="px-2 py-2">
        <Button type="primary" className="w-full">设为模板</Button>
      </div>
    <div>
    <div className="bg-white h-24 overflow-y-scroll">
      {tempTestData.map((one) => {
        return <div className="flex px-2" key={one}>
            <Button className="flex-1">{one}</Button>
            <Button className="flex-4">删除</Button>
          </div>
      })}
    </div>
    </div>
    </div>
  )
}
