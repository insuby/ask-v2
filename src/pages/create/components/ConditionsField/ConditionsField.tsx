import styles from '@stylePages/styles.module.scss'

import { Button, Textarea } from '@components'
import { useI18n } from '@i18n'
import { ButtonIconsAdd } from '@icons'
import { ButtonTypes } from '@types'
import { useFieldArray, useForm } from 'react-hook-form'

const ConditionsField = ({ registerTerm }: any) => {
  const { control } = useForm()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'conditions',
  })

  const i18n = useI18n()
  const addFieldConditions = () => {
    append({ walletAddress: '', commission: '' })
  }

  return (
    <div className={styles.conditionField}>
      {fields.map((field, idx) => {
        // const termDescription = getValues(`conditions.${idx}.termDescription`);
        return (
          <div key={field.id} className={styles.conditionRowSectionInput}>
            <Textarea placeholder={i18n.t('create.term')} {...registerTerm} />
          </div>
        )
      })}
      <div className={styles.conditionalDealsButton}>
        {fields.length < 1 ? (
          <Button
            buttonColor={ButtonTypes.lilac}
            onClick={(event) => {
              event.preventDefault()
              addFieldConditions()
            }}
          >
            <ButtonIconsAdd />
            {i18n.t('create.buttonAdd')}
          </Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
export default ConditionsField
