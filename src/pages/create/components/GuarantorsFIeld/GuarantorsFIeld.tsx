import styles from '@stylePages/styles.module.scss'

import { useI18n } from '@i18n'
import React, { ReactNode } from 'react'

interface GurantorsFieldProps {
  // errorArbiterAddress?: string;
  // errorFeeInNormal?: string;
  // errorFeeInDispute?: string;
  // registerArbiterAddress: any;
  // registerFeeInNormal: any;
  // registerFeeInDispute: any;
  children: ReactNode
}

const GurantorsField: React.FC<GurantorsFieldProps> = ({
  // errorArbiterAddress,
  // errorFeeInNormal,
  // errorFeeInDispute,
  // registerArbiterAddress,
  // registerFeeInNormal,
  // registerFeeInDispute,
  children,
}) => {
  // const { control, getValues, setValue } = useForm();
  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: 'arbiter',
  // });

  const i18n = useI18n()
  // const addInputGurantors = () => {
  //   append({
  //     arbiterAddress: '',
  //     arbiterFeeInNormal: '',
  //     arbiterFeeInDispute: '',
  //   });
  // };
  return (
    <div className={styles.gurantorsField}>
      {/* {/* {fields.map((field, idx) => {
        return (
          <>
            <div
              key={field.id}
              className={styles['arbiterSection__groupInput--inside']}
            >
              <div className={styles.addInputWithConditionalArbitrator}>
                <Input
                  placeholder={i18n.t('create.arbiterInfo')}
                  error={errorArbiterAddress}
                  {...registerArbiterAddress}
                />
                <div className={styles['arbiterSection__groupInput--icon']}>
                  <VectorInputIcons />
                </div>
              </div>
              <div>
                <Input
                  placeholder={i18n.t('create.commissionInNormal')}
                  error={errorFeeInNormal}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  type="number"
                  maxLength={process.env.MAX_STRING_LENGTH ?? 15}
                  {...registerFeeInNormal}
                />

                <Input
                  placeholder={i18n.t('create.commissionInDispute')}
                  error={errorFeeInDispute}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  type="number"
                  maxLength={process.env.MAX_STRING_LENGTH ?? 15}
                  {...registerFeeInDispute}
                />
                <div className={styles['dynamicSellerInput__delete']}>
                  <button type="button" onClick={() => remove(idx)}>
                    <VectorDeleteIcon />
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      })}
      {fields.length < 1 && (
        <div className={styles['arbiterSection__groupBtn']}>
          <div className={styles['arbiterSection__groupBtn--add']}>
            <Button
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              buttonColor={ButtonTypes.lilac}
              onClick={(event) => {
                event.preventDefault();
                addInputGurantors();
              }}
            >
              <ButtonIconsAdd />
              {i18n.t('create.buttonAdd')}
            </Button>
          </div>
          <div className={styles['arbiterSection__groupBtn--choose']}>
            <Button buttonColor={ButtonTypes.darkCyan}>
              <VectorButtonIcons />
              {i18n.t('create.chooseFromRating')}
            </Button>
          </div>
        </div> 
      )} */}
      {children}
    </div>
  )
}

export default GurantorsField
