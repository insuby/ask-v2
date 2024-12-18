import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks'

import styles from './styles.module.scss'

import {
  Button,
  ChooseRole,
  LoaderSmall,
  Row,
  Statistics,
  Status,
  Table,
} from '@components'
import { TABLE_COLUMN } from '@constants'
import { useTronWebService } from '@hooks'
import { useI18n } from '@i18n'
import { PlusIconCreate } from '@icons'
import { LoadingState, modalChooseRoleStore, useCryptoStore } from '@store'
import { ButtonTypes, PageStatusesEnum } from '@types'
import InfiniteScroll from 'react-infinite-scroll-component'

export default function Deals() {
  const i18n = useI18n()
  const {
    dealInfoListLoadingState,
    dealInfoList,
    fetchDealInfoList,
    dealInfoTotalCount,
    dealInfoLimit,
    dealInfoOffset,
    setDealInfoOffset,
  } = useCryptoStore((state) => state)
  const { modalChooseRole, setModalChooseRole } = modalChooseRoleStore()

  const { address } = useWallet()

  const tronWebService = useTronWebService()

  const next = () => {
    setDealInfoOffset(dealInfoOffset + dealInfoLimit)
    tronWebService && address && fetchDealInfoList(tronWebService)
  }

  if (!address) {
    return <Status status={PageStatusesEnum.connectWallet} />
  }

  if (dealInfoListLoadingState === LoadingState.FAILED) {
    return <Status status={PageStatusesEnum.serverError} />
  }

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <h2>
          {i18n.t('common.deals')} <span>({dealInfoTotalCount})</span>
        </h2>
        <div className={styles.createDeal}>
          <Button
            buttonColor={ButtonTypes.lilac}
            onClick={(event) => {
              event.preventDefault()
              setModalChooseRole(true)
            }}
          >
            <PlusIconCreate width={'24px'} height={'24px'} />
            {i18n.t('common.createDeal')}
          </Button>
        </div>
      </div>
      <Statistics />
      <div style={{ height: '100%' }}>
        <InfiniteScroll
          next={next}
          hasMore={dealInfoLimit + dealInfoOffset < dealInfoTotalCount}
          dataLength={dealInfoList.length}
          loader={<></>}
          scrollableTarget="scrollable"
        >
          <div className={styles.titleTable}>
            <h2>{i18n.t('common.transactionHistory')}</h2>
          </div>
          <Table className={styles.dealTable} columnNames={TABLE_COLUMN}>
            {dealInfoList.map((dealInfo, index) => {
              return <Row key={index} dealInfo={dealInfo} />
            })}
          </Table>
          {dealInfoListLoadingState === LoadingState.PENDING && <LoaderSmall />}
        </InfiniteScroll>
      </div>
      {modalChooseRole ? (
        <ChooseRole
          modalChooseRole={modalChooseRole}
          setModalChooseRole={setModalChooseRole}
        />
      ) : (
        <></>
      )}
    </div>
  )
}
