import { Card, Table } from 'antd';
import React, { useState } from 'react';
import { Tab } from './types';

// TODO:
// 先使用传递key（也就是文件名）的方式进行切换，这样易于实现和维护
// 如果需要进行必要的加载速度优化，那么再考虑实现传递组件
export const TableRouterTab = ()  => {

  const [tabList, setTabList] = useState<Array<Tab>>([
    {
      key: '总表',
      tab: '总表',
    },
  ]);
  const [activeTab, setActiveTab] = useState<Tab>(tabList[0]);

  const onTabChange = (key: string) => {
    for (const tab of tabList) {
      if (tab.key === key) {
        setActiveTab(tab);
        return;
      }
    }
  };
  return (
    <>
      <Card
        style={{ width: '100%' }}
        title=''
        extra={<a href="#">其他</a>}
        tabList={tabList}
        activeTabKey={activeTab.key}
        onTabChange={key => {
          onTabChange(key);
        }}
      >
        {/* {activeTab.content} */}
      </Card>
    </>
  );
};

