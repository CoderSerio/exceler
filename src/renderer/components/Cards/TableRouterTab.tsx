import { Card } from 'antd';
import React, { useState } from 'react';

interface TabPair {
  key: string,
  value: string | JSX.Element | React.ReactNode
}

type Props = Array<TabPair>;

export const TableRouterTab = (props:Props = []) => {
  const [tabList, setTabList] = useState([
    {
      key: 'tab1',
      tab: 'tab1',
    },
    {
      key: 'tab2',
      tab: 'tab2'
    },
    // ...(props.map((oneTab) => {
    //   return {
    //     key: oneTab.key,
    //     tab: oneTab.key
    //   }
    // }))
  ]);

  // const contentList: Record<string, React.ReactNode> = {
  //   tab1: <p>表1</p>,
  //   tab2: <p>表2</p>
  // };

  const [activeTabKey, setActiveTabKey] = useState<string>('tab1');

  const onTab1Change = (key: string) => {
    setActiveTabKey(key);
  };

  return (
    <>
      <Card
        style={{ width: '100%' }}
        title=""
        extra={<a href="#">其他</a>}
        tabList={tabList}
        activeTabKey={activeTabKey}
        onTabChange={key => {
          onTab1Change(key);
        }}
      >
        {/* {contentList[activeTabKey]} */}
      </Card>
    </>
  );
};

