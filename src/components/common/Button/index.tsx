import styles from './styles.module.scss'

import { ButtonTypes } from '@types'
import classNames from 'classnames'
import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonColor: ButtonTypes
}

const Button = ({ children, buttonColor, ...rest }: ButtonProps) => (
  <button
    className={classNames(styles.button, {
      [styles.light]: buttonColor === ButtonTypes.light,
      [styles.lilac]: buttonColor === ButtonTypes.lilac,
      [styles.dark]: buttonColor === ButtonTypes.dark,
      [styles.gray]: buttonColor === ButtonTypes.gray,
      [styles.darkCyan]: buttonColor === ButtonTypes.darkCyan,
      [styles.darkPink]: buttonColor === ButtonTypes.darkPink,
    })}
    {...rest}
  >
    {children}
  </button>
)

export default Button
