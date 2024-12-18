import styles from './styles.module.scss'

import { Button } from '@components'
import { useClickOutside } from '@hooks'
import { TetherIcon } from '@icons'
import { ButtonTypes } from '@types'
import { FC, useRef } from 'react'

interface IHeaderDropdownCurrency {
  dropdown: boolean
  setDropdown: (dropdown: boolean) => void
}

const HeaderDropdownCurrency: FC<IHeaderDropdownCurrency> = ({
  dropdown,
  setDropdown,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  useClickOutside(wrapperRef, () => setDropdown(false))

  return (
    <div
      ref={wrapperRef}
      className={styles['rightSide__dropdown']}
      onClick={() => setDropdown(!dropdown)}
    >
      <div className={styles['rightSide__dropdown--icon']}>
        <div>
          <TetherIcon />
        </div>
      </div>
      <div className={styles['rightSide__dropdown--currency']}>
        <Button buttonColor={ButtonTypes.gray}>
          <span>USDT</span>
        </Button>
        <Button buttonColor={ButtonTypes.dark}>
          <span>Tron</span>
        </Button>
        {/* <Button buttonColor={ButtonTypes.dark}>
            <ArrowIcon style={{transform: dropdown ? 'rotate(180deg)' : ''}} />
            </Button> */}
      </div>
    </div>
  )
}
export default HeaderDropdownCurrency
