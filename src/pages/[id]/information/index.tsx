import styles from './styles.module.scss'

import { dealRoleFormatter } from '@common'
import {
  Button,
  ConfirmModal,
  DealStateInfo,
  Input,
  Loader,
  Status,
} from '@components'
import { useEndlessRepeater, useTronWebService } from '@hooks'
import { useI18n } from '@i18n'
import { LoadingState, useCoin, useCryptoStore, useUiStore } from '@store'
import { DealRole, DealState } from '@tron'
import { ButtonTypes, ModalAction, PageStatusesEnum } from '@types'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'

type ResolveDisputeFormState = {
  amountToTaker: number
  amountToMaker: number
}
export default function Information() {
  const router = useRouter()
  const ref = useRef()
  const i18n = useI18n()
  const { cryptoCurrency } = useCoin()
  const id =
    router.query?.id && !Array.isArray(router.query?.id)
      ? Number(router.query?.id)
      : undefined
  const tronWebService = useTronWebService()
  const isWalletConnected = useCryptoStore((state) => !!state.profile.address)
  const {
    dealInfoLoadingState,
    dealInfo,
    fetchDealInfo,
    silentUpdateDealInfo,
    resetDealInfo,
    approveDealByBuyer,
    approveDealByTaker,
    approveDealByArbiter,
    cancelDeal,
    releaseDeal,
    toDisputeDeal,
    toReviewDeal,
  } = useCryptoStore()
  const {
    isConfirmModalOpen,
    confirmModalAction,
    confirmModalMessage,
    triggerConfirmModal,
    closeConfirmModal,
  } = useUiStore()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ResolveDisputeFormState>({
    mode: 'onChange',
  })

  const amountToTaker = watch('amountToTaker')

  useEffect(() => {
    if (dealInfo?.amount && amountToTaker && amountToTaker <= dealInfo.amount) {
      setValue('amountToMaker', dealInfo.amount - amountToTaker)
    }
  }, [amountToTaker])

  const initFetch = useCallback(async () => {
    if (tronWebService && isWalletConnected && id) {
      fetchDealInfo({ id }, tronWebService)
    }
  }, [tronWebService, isWalletConnected, id])

  const endlessFetch = useCallback(async () => {
    if (tronWebService && isWalletConnected && id) {
      silentUpdateDealInfo({ id }, tronWebService)
    }
  }, [tronWebService, isWalletConnected, id])

  useEndlessRepeater(3000, () => {
    void endlessFetch()
  })

  const onSubmitResolveDispute = useCallback(
    async (data: ResolveDisputeFormState) => {
      if (tronWebService && isWalletConnected && id) {
        await tronWebService.resolveDispute(Number(id), +data.amountToTaker)
      }
    },
    [tronWebService, isWalletConnected, id],
  )

  const onModalConfirm = useCallback(async () => {
    if (confirmModalAction === ModalAction.VOID) return
    if (confirmModalAction === ModalAction.CLOSE_MODAL)
      return router.push('/').then(() => closeConfirmModal())
    if (tronWebService && isWalletConnected && id) {
      if (confirmModalAction === ModalAction.APPROVE_DEAL_BY_BUYER)
        approveDealByBuyer({ id }, tronWebService)
      if (confirmModalAction === ModalAction.APPROVE_DEAL_BY_TAKER) {
        approveDealByTaker({ id }, tronWebService)
      }
      if (confirmModalAction === ModalAction.APPROVE_DEAL_BY_ARBITER)
        approveDealByArbiter({ id }, tronWebService)
      if (confirmModalAction === ModalAction.CANCEL_DEAL)
        cancelDeal({ id }, tronWebService)
      if (confirmModalAction === ModalAction.RELEASE_DEAL)
        releaseDeal({ id }, tronWebService)
      if (confirmModalAction === ModalAction.SEND_DEAL_TO_REVIEW)
        toReviewDeal({ id }, tronWebService)
      if (confirmModalAction === ModalAction.SEND_DEAL_TO_DISPUTE)
        toDisputeDeal({ id }, tronWebService)
    }
    await initFetch()
    closeConfirmModal()
  }, [tronWebService, isWalletConnected, id, confirmModalAction])

  useEffect(() => {
    void initFetch()
    return () => resetDealInfo()
  }, [initFetch])

  if (!isWalletConnected) {
    return <Status status={PageStatusesEnum.connectWallet} />
  }

  if (dealInfoLoadingState === LoadingState.PENDING || !dealInfo)
    return <Loader />

  if (dealInfoLoadingState === LoadingState.FAILED)
    return <Status status={PageStatusesEnum.serverError} />

  if (!dealInfo?.id) return <Status status={PageStatusesEnum.notFound} />

  const dealRoleKey =
    dealInfo.role !== undefined ? dealRoleFormatter(dealInfo.role) : undefined

  const dealRole = dealRoleKey ? i18n.t(dealRoleKey) : undefined

  return (
    <div>
      <div className={styles.desktopContainer}>
        <div className={styles.pageHeader}>
          <h2>ID {dealInfo.id}</h2>
          <div className={styles.status}>
            <DealStateInfo value={dealInfo.state} />
          </div>
        </div>
        <div style={{ padding: '1rem 0' }}>
          <div className={styles.informationRow}>
            <h4>{i18n.t('information.role')}</h4>
            <h5>&nbsp;{dealRole ?? '-'}</h5>
          </div>
        </div>
        <div className={styles.informationRowBorder}>
          <div className={styles.informationRowAfterBorder}>
            <div className={styles['informationRowAfterBorder__buyer']}>
              <h4 style={{ minWidth: 85 }}>{i18n.t('information.maker')}</h4>
              <h5>{dealInfo.buyer}</h5>
            </div>
            <div className={styles['informationRowAfterBorder__buyer']}>
              <h4 style={{ minWidth: 85 }}>{i18n.t('information.taker')}</h4>
              <h5>{dealInfo.seller}</h5>
            </div>
            <div className={styles['informationRowAfterBorder__arbiter']}>
              <h4 style={{ minWidth: 85 }}>{i18n.t('information.arbiter')}</h4>
              <h5>{dealInfo.garant}</h5>
            </div>
            <div
              className={styles['informationRowAfterBorder__arbiter--count']}
            >
              <div>
                <span>{i18n.t('information.min')}</span>
                <div
                  className={
                    styles['informationRowAfterBorder__arbiter--countAmountMin']
                  }
                >
                  <h3>{dealInfo.feeInfo.garantFeeInNormal}</h3>
                  <span>{cryptoCurrency.coin}</span>
                </div>
              </div>
              <div>
                <span>{i18n.t('information.involment')}</span>
                <div
                  className={
                    styles['informationRowAfterBorder__arbiter--countAmountInv']
                  }
                >
                  <h3>{dealInfo.feeInfo.garantFeeInDispute}</h3>
                  <span>{cryptoCurrency.coin}</span>
                </div>
              </div>
            </div>
          </div>

          {!!dealInfo.agents.length && (
            <div className={styles.informationRowAfterBorder}>
              <div className={styles['informationRowAfterBorder__garant']}>
                <h4>{i18n.t('information.agent')}</h4>
                <div
                  style={{
                    width: '85%',
                  }}
                >
                  {dealInfo.agents.map((agent, index) => {
                    return (
                      <div
                        key={index}
                        style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <h5>
                          <span
                            style={{
                              opacity: 0.5,
                              width: 25,
                              display: 'inline-block',
                            }}
                          >
                            {index + 1}.&nbsp;
                          </span>
                          {agent[0]}
                        </h5>
                        <div
                          className={
                            styles.informationRowAfterBorder__garantCount
                          }
                        >
                          <h3>
                            {agent[1]}{' '}
                            <span style={{ opacity: 0.5, fontWeight: 400 }}>
                              {cryptoCurrency.coin}
                            </span>
                          </h3>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          <div className={styles.informationRowAfterBorder}>
            <div className={styles['informationRowAfterBorder__terms']}>
              <div>
                <h4>{i18n.t('information.terms')}</h4>
                <h5>{dealInfo.terms}</h5>
              </div>
              <div
                className={styles['informationRowAfterBorder__terms--divider']}
              ></div>
            </div>
          </div>
          <div className={styles.informationRowAfterBorder}>
            <div className={styles['informationRowAfterBorder__amount']}>
              <h4>{i18n.t('information.amount')}</h4>
              <h5>
                {dealInfo.amount} <span>{cryptoCurrency.coin}</span>
              </h5>
            </div>
            <div className={styles['informationRowAfterBorder__amount--count']}>
              <span>{i18n.t('information.commissionInAscro')}</span>
              <h3>
                {dealInfo.feeInfo.serviceFee} <span>{cryptoCurrency.coin}</span>
              </h3>
            </div>
            <div className={styles['informationRowAfterBorder__amount--count']}>
              <span>{i18n.t('information.commissionInNormal')}</span>
              <h3>
                {dealInfo.feeInfo.garantFeeInNormal}{' '}
                <span>{cryptoCurrency.coin}</span>
              </h3>
            </div>
            <div className={styles['informationRowAfterBorder__amount--count']}>
              <span>{i18n.t('information.commissionInDispute')}</span>
              <h3>
                {dealInfo.feeInfo.garantFeeInDispute}{' '}
                <span>{cryptoCurrency.coin}</span>
              </h3>
            </div>
            <div className={styles['informationRowAfterBorder__amount--count']}>
              <span>{i18n.t('information.commissionAgents')}</span>
              <h3>
                {dealInfo.feeInfo.agentsFee} <span>{cryptoCurrency.coin}</span>
              </h3>
            </div>
            <div className={styles['informationRowAfterBorder__totalSum']}>
              <h1>{i18n.t('information.totalSum')}</h1>
              <p>
                {dealInfo.totalAmount} <span>{cryptoCurrency.coin}</span>
              </p>
            </div>
          </div>
        </div>

        {/* BuyerWaiting */}

        {(dealInfo.role === DealRole.Buyer ||
          dealInfo.role === DealRole.Seller) &&
          dealInfo.state === DealState.BuyerWaiting && (
            <div className={styles.approveParticipation}>
              {dealInfo.role === DealRole.Buyer && (
                <div className={styles.takerBlock}>
                  <Button
                    buttonColor={ButtonTypes.darkCyan}
                    onClick={() =>
                      triggerConfirmModal(
                        i18n.t('information.cancel'),
                        ModalAction.CANCEL_DEAL,
                      )
                    }
                  >
                    {i18n.t('information.cancelButton')}
                  </Button>
                  <Button
                    buttonColor={ButtonTypes.darkCyan}
                    onClick={() =>
                      triggerConfirmModal(
                        i18n.t('modal.closeButton'),
                        ModalAction.CLOSE_MODAL,
                      )
                    }
                  >
                    {i18n.t('modal.closeButton')}
                  </Button>
                  <Button
                    buttonColor={ButtonTypes.violet}
                    onClick={() =>
                      triggerConfirmModal(
                        i18n.t('information.approve'),
                        ModalAction.APPROVE_DEAL_BY_BUYER,
                      )
                    }
                  >
                    {i18n.t('information.approveButton')}
                  </Button>
                </div>
              )}
              {dealInfo.role === DealRole.Seller && (
                <div className={styles.waitingSeller}>
                  <Button
                    buttonColor={ButtonTypes.darkCyan}
                    onClick={() =>
                      triggerConfirmModal(
                        i18n.t('modal.closeButton'),
                        ModalAction.CLOSE_MODAL,
                      )
                    }
                  >
                    {i18n.t('modal.closeButton')}
                  </Button>
                </div>
              )}
            </div>
          )}

        {/* TakerWaiting */}

        {(dealInfo.role === DealRole.Seller ||
          dealInfo.role === DealRole.Buyer) &&
          dealInfo.state === DealState.SellerWaiting && (
            <div className={styles.approveParticipation}>
              {dealInfo.role === DealRole.Seller && (
                <div className={styles.takerBlock}>
                  <Button
                    buttonColor={ButtonTypes.violet}
                    onClick={() =>
                      triggerConfirmModal(
                        i18n.t('information.approve'),
                        ModalAction.APPROVE_DEAL_BY_TAKER,
                      )
                    }
                  >
                    {i18n.t('information.approveButton')}
                  </Button>
                </div>
              )}
              {dealInfo.role === DealRole.Buyer && (
                <div className={styles.waitingSeller}>
                  <Button
                    buttonColor={ButtonTypes.darkCyan}
                    onClick={() =>
                      triggerConfirmModal(
                        i18n.t('information.cancel'),
                        ModalAction.CANCEL_DEAL,
                      )
                    }
                  ></Button>
                  <Button
                    buttonColor={ButtonTypes.darkCyan}
                    onClick={() =>
                      triggerConfirmModal(
                        i18n.t('modal.closeButton'),
                        ModalAction.CLOSE_MODAL,
                      )
                    }
                  >
                    {i18n.t('modal.closeButton')}
                  </Button>
                </div>
              )}
            </div>
          )}

        {/* ArbiterWaiting */}

        {dealInfo.role === DealRole.Garant &&
          dealInfo.state === DealState.GarantWaiting && (
            <div className={styles.approveParticipation}>
              <div className={styles.inGarant}>
                <Button
                  buttonColor={ButtonTypes.violet}
                  onClick={() =>
                    triggerConfirmModal(
                      i18n.t('information.cancel'),
                      ModalAction.CANCEL_DEAL,
                    )
                  }
                >
                  {i18n.t('information.cancelButton')}
                </Button>
                <Button
                  buttonColor={ButtonTypes.violet}
                  onClick={() =>
                    triggerConfirmModal(
                      i18n.t('information.confirmParticipation'),
                      ModalAction.APPROVE_DEAL_BY_ARBITER,
                    )
                  }
                >
                  {i18n.t('information.confirmParticipationButton')}
                </Button>
              </div>
            </div>
          )}

        {/* InProgress */}

        {(dealInfo.role === DealRole.Seller ||
          dealInfo.role === DealRole.Buyer) &&
          dealInfo.state === DealState.InProgress && (
            <div className={styles.approveParticipation}>
              <div className={styles.leftBlock}>
                {(dealInfo.role === DealRole.Buyer ||
                  dealInfo.role === DealRole.Seller) && (
                  <div className={styles.approveParticipation}>
                    <div className={styles.inProgress}>
                      <Button
                        buttonColor={ButtonTypes.violet}
                        onClick={() =>
                          triggerConfirmModal(
                            i18n.t('information.cancel'),
                            ModalAction.CANCEL_DEAL,
                          )
                        }
                      >
                        {i18n.t('information.cancelButton')}
                      </Button>
                      <Button
                        buttonColor={ButtonTypes.light}
                        onClick={() =>
                          triggerConfirmModal(
                            i18n.t('information.toDispute'),
                            ModalAction.SEND_DEAL_TO_DISPUTE,
                          )
                        }
                      >
                        {i18n.t('information.toDisputeButton')}
                      </Button>
                      <Button
                        buttonColor={ButtonTypes.light}
                        onClick={() =>
                          triggerConfirmModal(
                            i18n.t('information.confirm'),
                            ModalAction.SEND_DEAL_TO_REVIEW,
                          )
                        }
                      >
                        {i18n.t('information.confirmButton')}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        {/* InReview */}

        {dealInfo.role === DealRole.Buyer &&
          dealInfo.state === DealState.InReview && (
            <div className={styles.approveParticipation}>
              <div className={styles.inReview}>
                <Button
                  buttonColor={ButtonTypes.violet}
                  onClick={() =>
                    triggerConfirmModal(
                      i18n.t('information.release'),
                      ModalAction.RELEASE_DEAL,
                    )
                  }
                >
                  {i18n.t('information.releaseButton')}
                </Button>
                <Button
                  buttonColor={ButtonTypes.light}
                  onClick={() =>
                    triggerConfirmModal(
                      i18n.t('information.toDispute'),
                      ModalAction.SEND_DEAL_TO_DISPUTE,
                    )
                  }
                >
                  {i18n.t('information.toDisputeButton')}
                </Button>
              </div>
            </div>
          )}

        {/* InDispute */}

        {dealInfo.role === DealRole.Garant &&
          dealInfo.state === DealState.InDispute && (
            <div className={styles.disputeBlock}>
              <h2>{i18n.t('information.result')}</h2>
              <div className={styles.disputeForm}>
                <form
                  onSubmit={handleSubmit((data) =>
                    onSubmitResolveDispute(data),
                  )}
                >
                  <Input
                    label={i18n.t('information.amountToMaker')}
                    error={errors.amountToMaker?.message}
                    disabled
                    {...register('amountToMaker', {
                      required: i18n.t('validation.required'),
                    })}
                  />
                  <Input
                    label={i18n.t('information.amountToTaker')}
                    error={errors.amountToTaker?.message}
                    {...register('amountToTaker', {
                      required: i18n.t('validation.required'),
                      value: dealInfo.amount,
                      min: {
                        message: i18n.t('validation.min'),
                        value: 0,
                      },
                      max: {
                        message: i18n.t('validation.max', {
                          amount: dealInfo.amount.toString(),
                        }),
                        value: dealInfo.amount,
                      },
                    })}
                  />
                  <Button buttonColor={ButtonTypes.violet}>
                    {i18n.t('information.button')}
                  </Button>
                </form>
              </div>
            </div>
          )}

        {/* Resolved */}

        {dealInfo.state === DealState.Resolved && (
          <div className={styles.resolvedBlock}>
            <h2>{i18n.t('information.result')}</h2>
            <div className={styles.resolvedInfoSeller}>
              <h4>{i18n.t('information.resultAmountToTaker')}</h4>
              <h5>
                {/*{dealInfo.feeInfo.garantSentToSeller} {cryptoCurrency.coin}*/}
              </h5>
            </div>
            <div className={styles.resolvedInfoBuyer}>
              <h4>{i18n.t('information.resultAmountToMaker')}</h4>
              <h5>
                {/*{dealInfo.amount - dealInfo.feeInfo.garantSentToSeller}{' '}*/}
                {cryptoCurrency.coin}
              </h5>
            </div>
            <div className={styles.closeButton}>
              <Button
                buttonColor={ButtonTypes.darkCyan}
                onClick={() =>
                  triggerConfirmModal(
                    i18n.t('modal.closeButton'),
                    ModalAction.CLOSE_MODAL,
                  )
                }
              >
                {i18n.t('modal.closeButton')}
              </Button>
            </div>
          </div>
        )}

        <ConfirmModal
          isOpen={isConfirmModalOpen}
          confirmModalFn={() => onModalConfirm()}
          closeModalFn={() => closeConfirmModal()}
          confirmText={confirmModalMessage ?? ''}
        />
      </div>

      {/*<div className={styles.mobileContainer}>*/}
      {/*  <div className={styles.mobileHeader}>*/}
      {/*    <h2>ID {dealInfo.id}</h2>*/}
      {/*  </div>*/}
      {/*  <div className={styles.mobileInfoContainer}>*/}
      {/*    <div className={styles.mobileInformation}>*/}
      {/*      <h4>{i18n.t('information.dealDate')}</h4>*/}
      {/*      <p>{dateFromEpochFormatter(dealInfo.createdAt)}</p>*/}
      {/*    </div>*/}
      {/*    <div className={styles.mobileInformation}>*/}
      {/*      <h4>{i18n.t('information.role')}</h4>*/}
      {/*      <p>{dealRole ?? '-'}</p>*/}
      {/*    </div>*/}
      {/*    <div className={styles.mobileInformation}>*/}
      {/*      <h4>Status</h4>*/}
      {/*      <h4>*/}
      {/*        <DealStateInfo value={dealInfo.state} />*/}
      {/*      </h4>*/}
      {/*    </div>*/}
      {/*    <div*/}
      {/*      className={styles.mobileInformation + ' ' + styles.mobileUnderline}*/}
      {/*    >*/}
      {/*      <h4>{i18n.t('information.amount')}</h4>*/}
      {/*      <p>{amountFormatter(dealInfo.amount)} USDT</p>*/}
      {/*    </div>*/}
      {/*    <div className={styles.mobileInformation + ' ' + styles.mobileBuyer}>*/}
      {/*      <h4>{i18n.t('information.maker')}</h4>*/}
      {/*      <p>{dealInfo.buyer}</p>*/}
      {/*    </div>*/}
      {/*    <div className={styles.mobileInformation + ' ' + styles.mobileBuyer}>*/}
      {/*      <h4>{i18n.t('information.taker')}</h4>*/}
      {/*      <p>{dealInfo.seller}</p>*/}
      {/*    </div>*/}
      {/*    <div*/}
      {/*      className={*/}
      {/*        styles.mobileInformation +*/}
      {/*        ' ' +*/}
      {/*        styles.mobileBuyer +*/}
      {/*        ' ' +*/}
      {/*        styles.mobileUnderline*/}
      {/*      }*/}
      {/*    >*/}
      {/*      <h4>{i18n.t('information.arbiter')}</h4>*/}
      {/*      <p>{dealInfo.garant}</p>*/}
      {/*    </div>*/}
      {/*    <div className={styles.mobileConditions}>*/}
      {/*      <h2>{i18n.t('information.terms')}</h2>*/}
      {/*      <p>{dealInfo.terms}</p>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className={styles.mobileIdk}>*/}
      {/*    /!* TakerWaiting *!/*/}

      {/*    {(dealInfo.role === DealRole.Seller ||*/}
      {/*      dealInfo.role === DealRole.Buyer) &&*/}
      {/*      dealInfo.state === DealState.SellerWaiting && (*/}
      {/*        <div className={styles.approveParticipation}>*/}
      {/*          {dealInfo.role === DealRole.Seller && (*/}
      {/*            <div className={styles.leftBlock}>*/}
      {/*              <Button*/}
      {/*                buttonColor={ButtonTypes.violet}*/}
      {/*                onClick={() =>*/}
      {/*                  triggerConfirmModal(*/}
      {/*                    i18n.t('information.approve'),*/}
      {/*                    ModalAction.APPROVE_DEAL_BY_TAKER,*/}
      {/*                  )*/}
      {/*                }*/}
      {/*              >*/}
      {/*                {i18n.t('information.approveButton')}*/}
      {/*              </Button>*/}
      {/*            </div>*/}
      {/*          )}*/}
      {/*          {dealInfo.role === DealRole.Buyer && (*/}
      {/*            <div className={styles.leftBlock}>*/}
      {/*              <Button*/}
      {/*                buttonColor={ButtonTypes.violet}*/}
      {/*                onClick={() =>*/}
      {/*                  triggerConfirmModal(*/}
      {/*                    i18n.t('information.cancel'),*/}
      {/*                    ModalAction.CANCEL_DEAL,*/}
      {/*                  )*/}
      {/*                }*/}
      {/*              >*/}
      {/*                {i18n.t('information.cancel')}*/}
      {/*              </Button>*/}
      {/*            </div>*/}
      {/*          )}*/}
      {/*        </div>*/}
      {/*      )}*/}

      {/*    /!* ArbiterWaiting *!/*/}

      {/*    {dealInfo.role === DealRole.Garant &&*/}
      {/*      dealInfo.state === DealState.GarantWaiting && (*/}
      {/*        <div className={styles.approveParticipation}>*/}
      {/*          <div className={styles.guaranterMobileBlockBtn}>*/}
      {/*            <Button*/}
      {/*              buttonColor={ButtonTypes.violet}*/}
      {/*              onClick={() =>*/}
      {/*                triggerConfirmModal(*/}
      {/*                  i18n.t('information.confirmParticipation'),*/}
      {/*                  ModalAction.APPROVE_DEAL_BY_ARBITER,*/}
      {/*                )*/}
      {/*              }*/}
      {/*            >*/}
      {/*              {i18n.t('information.confirmParticipationButton')}*/}
      {/*            </Button>*/}
      {/*            <Button*/}
      {/*              buttonColor={ButtonTypes.violet}*/}
      {/*              onClick={() =>*/}
      {/*                triggerConfirmModal(*/}
      {/*                  i18n.t('information.cancel'),*/}
      {/*                  ModalAction.CANCEL_DEAL,*/}
      {/*                )*/}
      {/*              }*/}
      {/*            >*/}
      {/*              {i18n.t('information.cancelButton')}*/}
      {/*            </Button>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      )}*/}

      {/*    /!* InProgress *!/*/}

      {/*    {(dealInfo.role === DealRole.Seller ||*/}
      {/*      dealInfo.role === DealRole.Buyer) &&*/}
      {/*      dealInfo.state === DealState.InProgress && (*/}
      {/*        <div className={styles.approveParticipation}>*/}
      {/*          <div className={styles.leftBlock}>*/}
      {/*            {(dealInfo.role === DealRole.Buyer ||*/}
      {/*              dealInfo.role === DealRole.Seller) && (*/}
      {/*              <div className={styles.approveParticipation}>*/}
      {/*                <div className={styles.inProgressMobileBlockBtn}>*/}
      {/*                  <Button*/}
      {/*                    buttonColor={ButtonTypes.light}*/}
      {/*                    onClick={() =>*/}
      {/*                      triggerConfirmModal(*/}
      {/*                        i18n.t('information.confirm'),*/}
      {/*                        ModalAction.SEND_DEAL_TO_REVIEW,*/}
      {/*                      )*/}
      {/*                    }*/}
      {/*                  >*/}
      {/*                    {i18n.t('information.confirmButton')}*/}
      {/*                  </Button>*/}
      {/*                  <Button*/}
      {/*                    buttonColor={ButtonTypes.light}*/}
      {/*                    onClick={() =>*/}
      {/*                      triggerConfirmModal(*/}
      {/*                        i18n.t('information.toDispute'),*/}
      {/*                        ModalAction.SEND_DEAL_TO_DISPUTE,*/}
      {/*                      )*/}
      {/*                    }*/}
      {/*                  >*/}
      {/*                    {i18n.t('information.toDisputeButton')}*/}
      {/*                  </Button>*/}
      {/*                </div>*/}
      {/*              </div>*/}
      {/*            )}*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      )}*/}

      {/*    /!* InReview *!/*/}

      {/*    {dealInfo.role === DealRole.Buyer &&*/}
      {/*      dealInfo.state === DealState.InReview && (*/}
      {/*        <div className={styles.approveParticipation}>*/}
      {/*          <div className={styles.inReviewMobileBlockBtn}>*/}
      {/*            <Button*/}
      {/*              buttonColor={ButtonTypes.violet}*/}
      {/*              onClick={() =>*/}
      {/*                triggerConfirmModal(*/}
      {/*                  i18n.t('information.release'),*/}
      {/*                  ModalAction.RELEASE_DEAL,*/}
      {/*                )*/}
      {/*              }*/}
      {/*            >*/}
      {/*              {i18n.t('information.releaseButton')}*/}
      {/*            </Button>*/}
      {/*            <Button*/}
      {/*              buttonColor={ButtonTypes.light}*/}
      {/*              onClick={() =>*/}
      {/*                triggerConfirmModal(*/}
      {/*                  i18n.t('information.toDispute'),*/}
      {/*                  ModalAction.SEND_DEAL_TO_DISPUTE,*/}
      {/*                )*/}
      {/*              }*/}
      {/*            >*/}
      {/*              {i18n.t('information.toDisputeButton')}*/}
      {/*            </Button>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      )}*/}

      {/*    /!* InDispute *!/*/}

      {/*    {dealInfo.role === DealRole.Garant &&*/}
      {/*      dealInfo.state === DealState.InDispute && (*/}
      {/*        <div className={styles.disputeBlock}>*/}
      {/*          <h2>{i18n.t('information.result')}</h2>*/}
      {/*          <div className={styles.inputBlock}>*/}
      {/*            <form*/}
      {/*              onSubmit={handleSubmit((data) =>*/}
      {/*                onSubmitResolveDispute(data),*/}
      {/*              )}*/}
      {/*            >*/}
      {/*              <Input*/}
      {/*                label={i18n.t('information.amountToMaker')}*/}
      {/*                error={errors.amountToMaker?.message}*/}
      {/*                disabled*/}
      {/*                {...register('amountToMaker', {*/}
      {/*                  required: i18n.t('validation.required'),*/}
      {/*                })}*/}
      {/*              />*/}
      {/*              <Input*/}
      {/*                label={i18n.t('information.amountToTaker')}*/}
      {/*                error={errors.amountToTaker?.message}*/}
      {/*                {...register('amountToTaker', {*/}
      {/*                  required: i18n.t('validation.required'),*/}
      {/*                  value: dealInfo.amount,*/}
      {/*                  min: {*/}
      {/*                    message: i18n.t('validation.min'),*/}
      {/*                    value: 0,*/}
      {/*                  },*/}
      {/*                  max: {*/}
      {/*                    message: i18n.t('validation.max', {*/}
      {/*                      amount: dealInfo.amount.toString(),*/}
      {/*                    }),*/}
      {/*                    value: dealInfo.amount,*/}
      {/*                  },*/}
      {/*                })}*/}
      {/*              />*/}
      {/*              <Button buttonColor={ButtonTypes.violet}>*/}
      {/*                {i18n.t('information.button')}*/}
      {/*              </Button>*/}
      {/*            </form>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      )}*/}

      {/*    /!* Resolved *!/*/}

      {/*    {dealInfo.state === DealState.Resolved && (*/}
      {/*      <div className={styles.disputeBlock}>*/}
      {/*        <h2>{i18n.t('information.result')}</h2>*/}
      {/*        <div className={styles.informationRow}>*/}
      {/*          <h4>{i18n.t('information.resultAmountToTaker')}</h4>*/}
      {/*          /!*<h5>{dealInfo.feeInfo.garantSentToSeller} USDT</h5>*!/*/}
      {/*        </div>*/}
      {/*        <div className={styles.informationRow}>*/}
      {/*          <h4>{i18n.t('information.resultAmountToMaker')}</h4>*/}
      {/*          <h5>*/}
      {/*            /!*{dealInfo.amount - dealInfo.feeInfo.garantSentToSeller}{' '}*!/*/}
      {/*            USDT*/}
      {/*          </h5>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  )
}
