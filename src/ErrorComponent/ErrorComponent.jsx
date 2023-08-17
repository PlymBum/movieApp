import React from 'react'
import { Alert, Space } from 'antd'

function ErrorComponent(props) {
  const { message } = props
  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
      }}
    >
      <Alert message="Error" description={message} type="error" showIcon />
    </Space>
  )
}
export default ErrorComponent
