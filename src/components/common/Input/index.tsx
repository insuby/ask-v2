import styles from './styles.module.scss'

import { useCoin } from '@store'
import React, { type HTMLInputTypeAttribute, forwardRef } from 'react'

type InputProps = {
  error?: string
  label?: string
  placeholder?: string
  isCoin?: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  type?: HTMLInputTypeAttribute
  maxLength?: number | string // Добавляем maxLength в тип InputProps
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, label, type, maxLength, ...rest }, ref) => {
    const { cryptoCurrency } = useCoin()
    const preventNegative = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (type !== 'number') return
      if (e.key === 'Backspace' || e.key === 'Delete' || e.key === 'Tab') return
      if (e.key.match(/\D/g)) {
        e.preventDefault()
      }
    }

    return (
      <div
        className={
          !!error ? `${styles.container} ${styles.error}` : styles.container
        }
      >
        <label>{label}</label>
        <input ref={ref} {...rest} onKeyDown={preventNegative} />
        {rest.isCoin && (
          <span
            style={{
              position: 'absolute',
              right: '1rem',
              display: 'flex',
              alignItems: 'center',
              top: 0,
              bottom: 0,
              color: 'white',
              fontSize: 14,
            }}
          >
            {cryptoCurrency.coin}
          </span>
        )}
        <span className={styles.helperText}>{error}</span>
      </div>
    )
  },
)

export default Input
