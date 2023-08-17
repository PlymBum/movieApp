import React from 'react'
import { Alert, Space } from 'antd'

function OflineCoponent() {
  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
      }}
    >
      <Alert message="Error" description="Похоже у вас нет доступа к сети" type="error" showIcon />
    </Space>
  )
}

export default OflineCoponent
