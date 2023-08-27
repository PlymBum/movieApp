import React from 'react'
import { Layout, Tabs } from 'antd'
import './Header.css'

const { Header: HeaderPage } = Layout

function Header({ toogleTabs }) {
  const onChange = (key) => {
    if (key === '1') {
      toogleTabs(false)
    }
    if (key === '2') {
      toogleTabs(true)
    }
  }

  const items = [
    {
      key: '1',
      label: 'Search',
    },
    {
      key: '2',
      label: 'Rated',
    },
  ]

  return (
    <HeaderPage className="header">
      <nav className="header__nav">
        <Tabs className="header__tabs" defaultActiveKey="1" items={items} onChange={onChange} />
      </nav>
    </HeaderPage>
  )
}
export default Header
