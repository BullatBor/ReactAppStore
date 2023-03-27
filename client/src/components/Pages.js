import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Pagination } from 'react-bootstrap'
import { Context } from '..'

export const Pages = observer(() => {
    const {device} = useContext(Context)
    const pageCount = Math.ceil(device.totalCount / device.limit)//Общее количество страниц
    const pages = [];
    for(let a = 0; a < pageCount; a++){
        pages.push(a + 1)
    }
  return (
    <Pagination className='mt-5'>
        {pages.map(page => 
            <Pagination.Item
            key={page}
            active={device.page === page}
            onClick={() => device.setPage(page)}
            >
                {page}
            </Pagination.Item>
        )}
    </Pagination>
  )
})
