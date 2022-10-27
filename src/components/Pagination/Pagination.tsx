import { FC } from 'react'
import { Pagination as PaginationAntd } from 'antd'

import { setPageState } from '../../store/reducers/blogSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'

import styles from './Pagination.module.scss'

interface PaginationBlockProps {
  total: number
}

const Pagination: FC<PaginationBlockProps> = ({ total }) => {
  const dispatch = useAppDispatch()
  const { page } = useAppSelector((state) => state.blogReducer)

  const onChangePagination = (nextPage: number): void => {
    dispatch(setPageState(nextPage))
  }

  return (
    <div className={styles.pagination}>
      <PaginationAntd
        size="small"
        onChange={onChangePagination}
        total={total}
        showSizeChanger={false}
        pageSize={10}
        current={page}
      />
    </div>
  )
}

export default Pagination
