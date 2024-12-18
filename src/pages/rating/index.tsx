import styles from './styles.module.scss'

import { Button, RatingRow, Table } from '@components'
import { useI18n } from '@i18n'
import { ArrowIconLeft, ArrowIconRight } from '@icons'
import { ButtonTypes } from '@types'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { RATING_TABLE_COLUMN } from 'src/constants/constants'

const deals = [
  {
    id: 1,
    walletNumber: 'TYw37MBM7zQfSyqb57kgLi4zccjZPiwCeu',
    all: 123,
    successful: 123,
    garants: 1,
  },
  {
    id: 2,
    walletNumber: 'TYw37MBM7zQfSyqb57kgLi4zccjZPiwCeu',
    all: 124,
    successful: 124,
    garants: 2,
  },
  {
    id: 3,
    walletNumber: 'TYw37MBM7zQfSyqb57kgLi4zccjZPiwCeu',
    all: 152,
    successful: 123,
    garants: 2,
  },
  {
    id: 4,
    walletNumber: 'TYw37MBM7zQfSyqb57kgLi4zccjZPiwCeu',
    all: 152,
    successful: 123,
    garants: 2,
  },
  {
    id: 5,
    walletNumber: 'TYw37MBM7zQfSyqb57kgLi4zccjZPiwCeu',
    all: 152,
    successful: 123,
    garants: 2,
  },
  {
    id: 6,
    walletNumber: 'TYw37MBM7zQfSyqb57kgLi4zccjZPiwCeu',
    all: 152,
    successful: 123,
    garants: 2,
  },
  {
    id: 7,
    walletNumber: 'TYw37MBM7zQfSyqb57kgLi4zccjZPiwCeu',
    all: 152,
    successful: 123,
    garants: 2,
  },
  {
    id: 8,
    walletNumber: 'TYw37MBM7zQfSyqb57kgLi4zccjZPiwCeu',
    all: 152,
    successful: 123,
    garants: 2,
  },
  {
    id: 9,
    walletNumber: 'TYw37MBM7zQfSyqb57kgLi4zccjZPiwCeu',
    all: 152,
    successful: 123,
    garants: 2,
  },
  {
    id: 10,
    walletNumber: 'TYw37MBM7zQfSyqb57kgLi4zccjZPiwCeu',
    all: 152,
    successful: 123,
    garants: 2,
  },
  {
    id: 11,
    walletNumber: 'TYw37MBM7zQfSyqb57kgLi4zccjZPiwCeu',
    all: 123,
    successful: 123,
    garants: 1,
  },
  {
    id: 12,
    walletNumber: 'TYw37MBM7zQfSyqb57kgLi4zccjZPiwCeu',
    all: 124,
    successful: 124,
    garants: 2,
  },
  {
    id: 13,
    walletNumber: 'TYw37MBM7zQfSyqb57kgLi4zccjZPiwCeu',
    all: 152,
    successful: 123,
    garants: 2,
  },
  {
    id: 14,
    walletNumber: 'TYw37MBM7zQfSyqb57kgLi4zccjZPiwCeu',
    all: 152,
    successful: 123,
    garants: 2,
  },
  {
    id: 15,
    walletNumber: 'TYw37MBM7zQfSyqb57kgLi4zccjZPiwCeu',
    all: 152,
    successful: 123,
    garants: 2,
  },
  {
    id: 16,
    walletNumber: 'TYw37MBM7zQfSyqb57kgLi4zccjZPiwCeu',
    all: 152,
    successful: 123,
    garants: 2,
  },
  {
    id: 17,
    walletNumber: 'TYw37MBM7zQfSyqb57kgLi4zccjZPiwCeu',
    all: 152,
    successful: 123,
    garants: 2,
  },
  {
    id: 18,
    walletNumber: 'TYw37MBM7zQfSyqb57kgLi4zccjZPiwCeu',
    all: 152,
    successful: 123,
    garants: 2,
  },
  {
    id: 19,
    walletNumber: 'TYw37MBM7zQfSyqb57kgLi4zccjZPiwCeu',
    all: 152,
    successful: 123,
    garants: 2,
  },
  {
    id: 20,
    walletNumber: 'TYw37MBM7zQfSyqb57kgLi4zccjZPiwCeu',
    all: 152,
    successful: 123,
    garants: 2,
  },
  {
    id: 21,
    walletNumber: 'TYw37MBM7zQfSyqb57kgLi4zccjZPiwCeu',
    all: 152,
    successful: 123,
    garants: 2,
  },
]
// ЗАМЕНИТЬ
const ITEMS_PER_PAGE = 20

const Rating = () => {
  const [arbCheck, setArbCheck] = useState(false)
  const [buyCheck, setBuyCheck] = useState(false)
  const [sellCheck, setSellCheck] = useState(false)
  const [active, setActive] = useState('')
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 575)
  const i18n = useI18n()
  const handleCheck = (value: string) => {
    setActive(value)
    if (value === 'arb' && !arbCheck) {
      setArbCheck(true)
      setBuyCheck(false)
      setSellCheck(false)
    } else {
      setArbCheck(false)
    }
    if (value === 'buy' && !buyCheck) {
      setBuyCheck(true)
      setArbCheck(false)
      setSellCheck(false)
    } else {
      setBuyCheck(false)
    }
    if (value === 'sell' && !sellCheck) {
      setSellCheck(true)
      setBuyCheck(false)
      setArbCheck(false)
    } else {
      setSellCheck(false)
    }
  }
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  const [currentPage, setCurrentPage] = useState(1)
  const totalPage = Math.ceil(deals.length / ITEMS_PER_PAGE)
  const currentDeals = deals.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPage) return
    setCurrentPage(newPage)
  }
  const pages = Array.from({ length: totalPage }, (_, i) => i + 1)
  return (
    <div className={styles.container}>
      <div className={styles.selectContainer}>
        <label
          className={
            active === 'arb'
              ? styles.ratingSelect + ' ' + styles.ratingSelectActive
              : styles.ratingSelect
          }
        >
          Guarantors
          <input
            type="checkbox"
            checked={arbCheck}
            onClick={() => handleCheck('arb')}
          />
        </label>
        <label
          className={
            active === 'buy'
              ? styles.ratingSelect + ' ' + styles.ratingSelectActive
              : styles.ratingSelect
          }
        >
          Buyers
          <input
            type="checkbox"
            checked={buyCheck}
            onClick={() => handleCheck('buy')}
          />
        </label>
        <label
          className={
            active === 'sell'
              ? styles.ratingSelect + ' ' + styles.ratingSelectActive
              : styles.ratingSelect
          }
        >
          Sellers
          <input
            type="checkbox"
            checked={sellCheck}
            onClick={() => handleCheck('sell')}
          />
        </label>
      </div>
      <div style={{ height: '100%' }}>
        <InfiniteScroll
          hasMore={false}
          dataLength={1}
          loader={<></>}
          style={{
            height: '100%',
          }}
          scrollableTarget="scrollable"
        >
          <Table
            className={styles.ratingTable}
            columnNames={RATING_TABLE_COLUMN}
          >
            {currentDeals.map((dealInfo, i) => {
              let style
              if (i % 2 !== 0) {
                style = ' #292A2D'
              }
              return (
                <RatingRow
                  key={dealInfo.id}
                  ratingDealInfo={dealInfo}
                  style={style}
                />
              )
            })}
          </Table>
          <div className={styles.pagination}>
            <div className={styles['pagination__previous']}>
              <Button
                buttonColor={ButtonTypes.darkCyan}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <ArrowIconLeft />
                {!isMobile && <span>{i18n.t('rating.previousButton')}</span>}
              </Button>
            </div>
            {pages.map(
              (page, index) =>
                (!isMobile || page === currentPage) && (
                  <Button
                    key={index}
                    buttonColor={ButtonTypes.light}
                    onClick={() => handlePageChange(page)}
                    style={{
                      fontWeight: page === currentPage ? 'bold' : 'normal',
                      backgroundColor:
                        page === currentPage ? '#292A2D' : 'transparent',
                      color: '#AFC6FF',
                    }}
                    className={styles.pagesCount}
                  >
                    {page}
                  </Button>
                ),
            )}
            <div className={styles['pagination__next']}>
              <Button
                buttonColor={ButtonTypes.darkPink}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                {!isMobile && <span>{i18n.t('rating.nextButton')}</span>}

                <ArrowIconRight />
              </Button>
            </div>
          </div>
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default Rating
