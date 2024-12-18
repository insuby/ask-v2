import styles from './styles.module.scss'

import { ChangeEventHandler, forwardRef, useEffect, useRef } from 'react'

type TextareaProps = {
  error?: string
  label?: string
  placeholder?: string
  onChange: ChangeEventHandler<HTMLTextAreaElement>
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, label, onChange, ...rest }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
      adjustTextareaHeight()
    }, [rest])

    const adjustTextareaHeight = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
      }
    }

    const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
      if (onChange) {
        onChange(event)
      }
      adjustTextareaHeight()
    }

    return (
      <div
        className={
          !!error ? `${styles.container} ${styles.error}` : styles.container
        }
      >
        <label>{label}</label>
        <textarea ref={ref} onChange={handleChange} {...rest} />
        <span className={styles.helperText}>{error}</span>
      </div>
    )
  },
)

export default Textarea
