import * as React from 'react'
import { SVGProps } from 'react'

const WalletIconUserDropdown = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <path
        d="M13.5 3H4.5C2.8425 3 1.5 4.3425 1.5 6V12C1.5 13.6575 2.8425 15 4.5 15H13.5C15.1575 15 16.5 13.6575 16.5 12V6C16.5 4.3425 15.1575 3 13.5 3ZM12.105 10.3275C11.925 10.4775 11.6775 10.5375 11.445 10.4775L3.1125 8.4375C3.3375 7.89 3.87 7.5 4.5 7.5H13.5C14.0025 7.5 14.445 7.755 14.7225 8.13L12.105 10.3275ZM4.5 4.5H13.5C14.325 4.5 15 5.175 15 6V6.4125C14.5575 6.1575 14.0475 6 13.5 6H4.5C3.9525 6 3.4425 6.1575 3 6.4125V6C3 5.175 3.675 4.5 4.5 4.5Z"
        fill={props.fill}
      />
    </svg>
  )
}
export default WalletIconUserDropdown
