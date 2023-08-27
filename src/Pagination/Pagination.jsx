import React from 'react'
import { Pagination } from 'antd'

import './Pagination.css'

function PaginationComponent(props) {
  const { currentPage, totalPage, setCurrentPage } = props
  const onChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  return (
    <Pagination
      className="pagination"
      defaultCurrent={currentPage}
      total={totalPage}
      onChange={onChange}
      showSizeChanger={false}
      defaultPageSize={20}
    />
  )
}

export default PaginationComponent
