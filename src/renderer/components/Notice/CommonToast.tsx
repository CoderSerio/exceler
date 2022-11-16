
import { Alert } from "antd";

interface Props {
  type: "success" | "info" | "warning" | "error",
  message: string,
  description: string,
}

export const CommonToast = ({
  type = "success",
  description = '',
  message,
}: Props) => {
  return (
    <Alert
      message={message}
      type={type}
      description={description}
      showIcon />
  )
}
