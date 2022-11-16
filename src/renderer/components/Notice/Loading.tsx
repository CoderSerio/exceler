import { Spin } from "antd";

interface Props {
  msg: string,
};

export const Loading = ({ msg = '' }: Props, ) => {
  return (
    <Spin tip={msg}>

    </Spin>
  );
}
