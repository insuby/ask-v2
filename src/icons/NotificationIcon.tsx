import * as React from 'react'
import { SVGProps } from 'react'

const NotificationIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <path
      d="M9 16.3125C9.825 16.3125 10.5 15.6375 10.5 14.8125H7.5C7.5 15.6375 8.175 16.3125 9 16.3125ZM13.5 11.8125V8.0625C13.5 5.76 12.2775 3.8325 10.125 3.3225V2.8125C10.125 2.19 9.6225 1.6875 9 1.6875C8.3775 1.6875 7.875 2.19 7.875 2.8125V3.3225C5.73 3.8325 4.5 5.7525 4.5 8.0625V11.8125L3 13.3125V14.0625H15V13.3125L13.5 11.8125ZM12 12.5625H6V8.0625C6 6.2025 7.1325 4.6875 9 4.6875C10.8675 4.6875 12 6.2025 12 8.0625V12.5625Z"
      fill="#D9E2FF"
    />
  </svg>
)
export default NotificationIcon
