import styles from '@stylePages/styles.module.scss'

import { Button, Input } from '@components'
import { useI18n } from '@i18n'
import { ButtonIconsAdd, VectorDeleteIcon } from '@icons'
import { ButtonTypes, CreateDealFormState, CustomErrors } from '@types'
import { SyntheticEvent } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

export default function ({ setValue, register }) {
  const { control, watch } = useForm()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'agents',
  })

  const errorsInput = useForm<CreateDealFormState>().formState
    .errors as CustomErrors

  const i18n = useI18n()
  const addInputBuyers = (event: SyntheticEvent) => {
    event.preventDefault()
    append({ agent: '', fee: '' })
  }

  return (
    <div className={styles.buyersField}>
      {fields.map((field, idx) => {
        const [agentValue, commissionAddressValue] = watch([
          `agents.${idx}.agent`,
          `agents.${idx}.fee`,
        ])
        return (
          <div key={field.id} className={styles.dynamicBuyersInput}>
            <div className={styles.dynamicBuyersInput__wallet}>
              <Input
                placeholder={i18n.t('create.enterYourWallet')}
                error={errorsInput[`agents.${idx}.agent`]?.message}
                {...register(`agents.${idx}.agent`, {
                  required: i18n.t('validation.required'),
                })}
              />
              {agentValue && commissionAddressValue && (
                <button
                  type="button"
                  onClick={() => {
                    setValue(`agents.${idx}.agent`, '')
                    setValue(`agents.${idx}.fee`, '')
                  }}
                >
                  <VectorDeleteIcon />
                </button>
              )}
            </div>
            <div className={styles.dynamicBuyersInput__commission}>
              <Input
                placeholder={i18n.t('create.commissionInBuyerInformation')}
                error={errorsInput[`agents.${idx}.fee`]?.message}
                // maxLength={process.env.MAX_STRING_LENGTH ?? 12}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                type="number"
                {...register(`agents.${idx}.fee`, {
                  required: i18n.t('validation.required'),
                })}
              />
              <div className={styles.dynamicBuyersInput__delete}>
                <button type="button" onClick={() => remove(idx)}>
                  <VectorDeleteIcon />
                </button>
              </div>
            </div>
          </div>
        )
      })}
      <Button
        buttonColor={ButtonTypes.lilac}
        onClick={(event) => addInputBuyers(event)}
      >
        <ButtonIconsAdd />
        {i18n.t('create.buttonAdd')}
      </Button>
    </div>
  )
}
