import styles from './styles.module.scss'

import { Button, Portal } from '@components'
import { useI18n } from '@i18n'
import { InfoIcon, SellIcon, ShoppingBag } from '@icons'
import { useRole } from '@store'
import { ButtonTypes } from '@types'
import { useRouter } from 'next/router'
import { FC } from 'react'

interface IChooseRole {
  modalChooseRole: boolean
  setModalChooseRole: (modalChooseRole: boolean) => void
}

const ChooseRole: FC<IChooseRole> = ({
  modalChooseRole,
  setModalChooseRole,
}) => {
  const { activeRole, setActiveRole } = useRole()
  const router = useRouter()
  const i18n = useI18n()
  return (
    <>
      <Portal overlayClickFn={() => setModalChooseRole(!modalChooseRole)}>
        <div className={styles.chooseRole}>
          <div className={styles['chooseRole__modal']}>
            <div className={styles['chooseRole__info']}>
              <h3 className={styles['chooseRole__info--title']}>
                {i18n.t('role.chooseRoleTitle')}
              </h3>
              <span className={styles['chooseRole__info--description']}>
                {i18n.t('role.chooseRoleDescription')}
              </span>
            </div>
            <div className={styles['chooseRole__modal--choose']}>
              <div
                className={
                  activeRole === 'buyer'
                    ? styles['buyer--active']
                    : styles.buyer
                }
                onClick={() => {
                  setActiveRole('buyer')
                  router.push('/create')
                }}
              >
                <div>
                  <ShoppingBag
                    fill={activeRole === 'buyer' ? '#002D6D' : '#D9E2FF'}
                  />
                  <span>{i18n.t('role.maker')}</span>
                </div>
                <InfoIcon
                  fill={activeRole === 'buyer' ? '#002D6D' : '#D9E2FF'}
                />
              </div>
              <div
                className={
                  activeRole === 'seller'
                    ? styles['seller--active']
                    : styles.seller
                }
                onClick={() => {
                  setActiveRole('seller')
                  router.push('/create')
                }}
              >
                <div>
                  <SellIcon
                    fill={activeRole === 'seller' ? '#002D6D' : '#D9E2FF'}
                  />
                  <span>{i18n.t('role.taker')}</span>
                </div>
                <InfoIcon
                  fill={activeRole === 'seller' ? '#002D6D' : '#D9E2FF'}
                />
              </div>
            </div>
            <div className={styles.groupButton}>
              <div className={styles['groupButton__close']}>
                <Button
                  buttonColor={ButtonTypes.gray}
                  onClick={() => setModalChooseRole(!modalChooseRole)}
                >
                  {i18n.t('role.canceledChoose')}
                </Button>
              </div>
              {activeRole && (
                <div className={styles['groupButton__continue']}>
                  <Button
                    buttonColor={ButtonTypes.gray}
                    onClick={() => {
                      setActiveRole(activeRole)
                      router.push('/create')
                    }}
                  >
                    {i18n.t('role.continueChoose')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Portal>
    </>
  )
}

export default ChooseRole
