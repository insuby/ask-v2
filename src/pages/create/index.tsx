import styles from '@stylePages/styles.module.scss'

import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks'

import { Button, Input, Loader, Status, Textarea } from '@components'
import { GurantorsField, WalletField } from '@componentsPages'
import {
  isAccountsChangedEventData,
  useTronEventListenerEffect,
  useTronWebService,
} from '@hooks'
import { useI18n } from '@i18n'
import { InfoIcon, VectorInputIcons } from '@icons'
import { LoadingState, useCoin, useCryptoStore, useRole } from '@store'
import type { CreateDealFormState } from '@types'
import { ButtonTypes, PageStatusesEnum } from '@types'
import { useRouter } from 'next/router'
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function CreateDeal() {
  const i18n = useI18n()
  const tronWebService = useTronWebService()
  const router = useRouter()
  const { activeRole } = useRole()

  const { address } = useWallet()

  const isSellersRequest = activeRole === 'seller'

  const { createDealInfo, createDealInfoLoadingState, profile } =
    useCryptoStore()

  const [serviceFee, setServiceFee] = useState(0)
  const { cryptoCurrency } = useCoin()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateDealFormState>({
    mode: 'onChange',
    defaultValues: {
      makerAddress: 'TRnyDbytxz6EEXPWvag1pwY1uvm88zMfJg',
      takerAddress: 'TGi7C537KPDgoa1Uewd1KvrFbHdFNi8vGu',
      arbiterAddress: 'TTDFqTFHcFw3bZfXDi64rBmc2qTwNenhrT',
      amount: 100,
      arbiterFeeInNormal: 1,
      arbiterFeeInDispute: 2,
      terms: 't',
    },
  })

  const [amount, arbiterFeeInNormal, arbiterFeeInDispute, agents] = watch([
    'amount',
    'arbiterFeeInNormal',
    'arbiterFeeInDispute',
    'agents',
  ])

  const totalAmount = useMemo(() => {
    const agentsFee = Array.isArray(agents)
      ? agents.reduce((prev, curr) => prev + +curr.fee, 0)
      : 0

    return (
      agentsFee +
      Number(amount) +
      serviceFee +
      Math.max(arbiterFeeInNormal, arbiterFeeInDispute)
    )
  }, [amount, arbiterFeeInNormal, serviceFee, arbiterFeeInDispute, agents])

  useEffect(() => {
    if (address) {
      setValue(isSellersRequest ? 'takerAddress' : 'makerAddress', address)
    }
  }, [address])

  useEffect(() => {
    if (!tronWebService) return
    const getServiceFee = async () => {
      const agentsFee = Array.isArray(agents)
        ? agents.reduce((prev, curr) => prev + +curr.fee, 0)
        : 0

      const serviceFee = await tronWebService.estimateServiceFee(
        Number(amount) +
          agentsFee +
          Math.max(arbiterFeeInNormal, arbiterFeeInDispute),
      )
      setServiceFee(Math.ceil(serviceFee))
    }

    getServiceFee()
  }, [totalAmount, serviceFee, arbiterFeeInNormal, arbiterFeeInDispute, agents])

  useTronEventListenerEffect(
    'accountsChanged',
    (event) => {
      if (isAccountsChangedEventData(event.data) && event.data.address) {
        setValue(
          isSellersRequest ? 'takerAddress' : 'makerAddress',
          event.data.address,
        )
      }
    },
    [],
  )

  const onSubmit = useCallback(
    async (data: {
      amount: number
      arbiterFeeInDispute: number
      makerAddress: string
      arbiterAddress: string
      terms: string
      takerAddress: string
      arbiterFeeInNormal: number
      agents: { agent: string; fee: number }[]
    }) => {
      if (tronWebService) {
        createDealInfo(
          {
            isSellersRequest,
            makerAddress: data.makerAddress,
            takerAddress: data.takerAddress,
            arbiterAddress: data.arbiterAddress,
            amount: data.amount,
            serviceFee: serviceFee,
            arbiterFeeInNormal: data.arbiterFeeInNormal,
            arbiterFeeInDispute: data.arbiterFeeInDispute,
            terms: data.terms,
            agents: Array.isArray(data.agents)
              ? data.agents.map((agent) => [agent.agent, agent.fee])
              : [],
            totalAmount,
          },
          tronWebService,
          () => {
            router.push(`/`)
          },
        )
      }
    },
    [tronWebService, totalAmount],
  )

  if (!profile.address) {
    return <Status status={PageStatusesEnum.connectWallet} />
  }

  if (createDealInfoLoadingState === LoadingState.PENDING) return <Loader />

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{i18n.t('create.title')}</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputsBlock}>
          {isSellersRequest ? (
            <Fragment>
              <div className={styles.rowMakerSection}>
                <div className={styles['rowMakerSection__mainInput']}>
                  <Input
                    label={i18n.t(`create.takerInfoYours`)}
                    placeholder={i18n.t('create.takerAddress')}
                    error={errors.takerAddress?.message}
                    {...register('takerAddress', {
                      required: i18n.t('validation.required'),
                    })}
                  />
                  <div className={styles['rowMakerSection__mainInput--icon']}>
                    <VectorInputIcons />
                  </div>
                </div>
                <span>{i18n.t('create.middleman')}</span>
                <div>
                  <WalletField setValue={setValue} register={register} />
                </div>
              </div>
              <div className={styles.takerAddressSection}>
                <div className={styles['takerAddressSection__sellerInput']}>
                  <Input
                    label={i18n.t('create.makerInfo')}
                    placeholder={i18n.t('create.makerAddress')}
                    error={errors.makerAddress?.message}
                    {...register('makerAddress', {
                      minLength: 34,
                      maxLength: 34,
                      required: i18n.t('validation.required'),
                    })}
                  />
                  <div
                    className={styles['takerAddressSection__sellerInput--icon']}
                  >
                    <VectorInputIcons />
                  </div>
                </div>
                <span>{i18n.t('create.middleman')}</span>
                <div className={styles.takerInput}>
                  <WalletField setValue={setValue} register={register} />
                </div>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className={styles.rowMakerSection}>
                <div className={styles['rowMakerSection__mainInput']}>
                  <Input
                    label={i18n.t(`create.makerInfoYours`)}
                    placeholder={i18n.t('create.makerAddress')}
                    error={errors.makerAddress?.message}
                    {...register('makerAddress', {
                      required: i18n.t('validation.required'),
                    })}
                  />
                  <div className={styles['rowMakerSection__mainInput--icon']}>
                    <VectorInputIcons />
                  </div>
                </div>
                <span>{i18n.t('create.middleman')}</span>
                <div>
                  <WalletField setValue={setValue} register={register} />
                </div>
              </div>
              <div className={styles.takerAddressSection}>
                <div className={styles['takerAddressSection__sellerInput']}>
                  <Input
                    label={i18n.t('create.takerInfo')}
                    placeholder={i18n.t('create.takerAddress')}
                    error={errors.takerAddress?.message}
                    {...register('takerAddress', {
                      minLength: 34,
                      maxLength: 34,
                      required: i18n.t('validation.required'),
                    })}
                  />
                  <div
                    className={styles['takerAddressSection__sellerInput--icon']}
                  >
                    <VectorInputIcons />
                  </div>
                </div>
                <span>{i18n.t('create.middleman')}</span>
                <div className={styles.takerInput}>
                  <WalletField setValue={setValue} register={register} />
                </div>
              </div>
            </Fragment>
          )}

          <div className={styles.arbiterRowSection}>
            <span>{i18n.t('create.arbiterInfo')}</span>
            <div className={styles.arbiterSection}>
              <div className={styles.arbiterSection__groupInput}>
                <GurantorsField>
                  <div
                    className={styles['arbiterSection__groupInput--inside']}
                    style={{ width: '100%' }}
                  >
                    <div className={styles.addInputWithConditionalArbitrator}>
                      <Input
                        placeholder={i18n.t('create.arbiterInfo')}
                        error={errors.arbiterAddress?.message}
                        {...register(`arbiterAddress`, {
                          minLength: 34,
                          maxLength: 34,
                          required: i18n.t('validation.required'),
                        })}
                      />
                      <div
                        className={styles['arbiterSection__groupInput--icon']}
                      >
                        <VectorInputIcons />
                      </div>
                    </div>
                    <div>
                      <Input
                        placeholder={i18n.t('create.commissionInNormal')}
                        error={errors.arbiterFeeInNormal?.message}
                        isCoin
                        type="number"
                        {...register(`arbiterFeeInNormal`, {
                          min: 0,
                          maxLength: 5,
                          required: i18n.t('validation.required'),
                          valueAsNumber: true,
                        })}
                      />
                      <Input
                        placeholder={i18n.t('create.commissionInDispute')}
                        error={errors.arbiterFeeInDispute?.message}
                        isCoin
                        type="number"
                        {...register(`arbiterFeeInDispute`, {
                          min: 0,
                          maxLength: 5,
                          required: i18n.t('validation.required'),
                          valueAsNumber: true,
                        })}
                      />
                    </div>
                  </div>
                </GurantorsField>
              </div>
            </div>
          </div>
          <div className={styles.dealsAmount}>
            <span>{i18n.t('create.dealAmount')}</span>
            <div className={styles['dealsAmount__wrapper']}>
              <div className={styles['dealsAmount__input']}>
                <Input
                  placeholder={i18n.t('create.receive')}
                  error={errors.amount?.message}
                  isCoin
                  type="number"
                  {...register('amount', {
                    min: {
                      message: 'minimum 100 USDT',
                      value: 100,
                    },
                    max: {
                      message: 'maximum 100.000 USDT',
                      value: 100_000,
                    },
                    required: i18n.t('validation.required'),
                  })}
                />
              </div>
            </div>
          </div>
          <div className={styles.condition}>
            <div className={styles.conditionRowSection}>
              <span>{i18n.t('create.conditionDeals')}</span>
              <div className={styles.conditionRowSectionInput}>
                <Textarea
                  {...register('terms', {
                    required: i18n.t('validation.required'),
                  })}
                  placeholder={i18n.t('create.term')}
                />
              </div>
              {/*<ConditionsField*/}
              {/*  registerTerm={register('terms', {*/}
              {/*    required: i18n.t('validation.required'),*/}
              {/*  })}*/}
              {/*/>*/}
            </div>
          </div>
        </div>
        <div>
          <div className={styles.sumContainer}>
            <div className={styles.totalSumBlock}>
              <h2>{i18n.t('create.total')}</h2>
              <h3>
                {totalAmount ? totalAmount : 0} {cryptoCurrency.coin}
              </h3>
            </div>
            <div className={styles.totalSumBlockSecondary}>
              <h4>ASCRO fee:</h4>
              <h5>
                {serviceFee ? serviceFee : 0} {cryptoCurrency.coin}
              </h5>
            </div>
            <div className={styles.totalSumBlockSecondary}>
              <h4>Guarantor fee in Normal:</h4>
              <h5>
                {arbiterFeeInNormal ? arbiterFeeInNormal : 0}{' '}
                {cryptoCurrency.coin}
              </h5>
            </div>
            <div className={styles.totalSumBlockSecondary}>
              <h4>Guarantor fee in Dispute:</h4>
              <h5>
                {arbiterFeeInDispute ? arbiterFeeInDispute : 0}{' '}
                {cryptoCurrency.coin}
              </h5>
            </div>
            <div className={styles.totalSumBlock}>
              <h2>Deal sum: </h2>
              <h3>
                {+amount} {cryptoCurrency.coin}
              </h3>
            </div>
            <div className={styles['totalSumBlock__info']}>
              <InfoIcon fill="#8F9099" />
              <p>{i18n.t('create.percent')}</p>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <Button
              buttonColor={ButtonTypes.darkCyan}
              onClick={() => router.push('/')}
            >
              {i18n.t('create.close')}
            </Button>
            <Button buttonColor={ButtonTypes.lilac}>
              {i18n.t('create.button')}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
