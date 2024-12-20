import * as React from 'react'
import { SVGProps } from 'react'

const CopyIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <path
      d="M12.375 0.75H3.375C2.55 0.75 1.875 1.425 1.875 2.25V12.75H3.375V2.25H12.375V0.75ZM14.625 3.75H6.375C5.55 3.75 4.875 4.425 4.875 5.25V15.75C4.875 16.575 5.55 17.25 6.375 17.25H14.625C15.45 17.25 16.125 16.575 16.125 15.75V5.25C16.125 4.425 15.45 3.75 14.625 3.75ZM14.625 15.75H6.375V5.25H14.625V15.75Z"
      fill="#D9E2FF"
    />
  </svg>
)
export default CopyIcon
