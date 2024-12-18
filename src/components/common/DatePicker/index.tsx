import styles from './styles.module.scss'

import { useI18n } from '@i18n'
import { useState } from 'react'
import DatePicker from 'react-datepicker'

const DatePickerComponent = ({ padding }: { padding?: string }) => {
  const i18n = useI18n()
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  return (
    <div style={{ padding: padding }} className={styles.container}>
      {i18n.t('create.dueDate')}
      <div className={styles.choice}>
        <label>{i18n.t('create.dueDateStart')}</label>
        <div className={styles.inputContainer}>
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => {
              setStartDate(date)
            }}
            dateFormat="MM/dd/yyyy"
            wrapperClassName="datePicker"
            placeholderText="Choose Start date"
            className={styles.date}
          />
          <input type="time" className={styles.time} />
        </div>
      </div>
      <div className={styles.choice}>
        <label>{i18n.t('create.dueDateEnd')}</label>
        <div className={styles.inputContainer}>
          <DatePicker
            selected={endDate}
            onChange={(date: Date) => {
              setEndDate(date)
            }}
            dateFormat="MM/dd/yyyy"
            wrapperClassName="datePicker"
            placeholderText="Choose End date"
            className={styles.date}
          />
          <input type="time" className={styles.time} />
        </div>
      </div>
    </div>
  )
}

export default DatePickerComponent
