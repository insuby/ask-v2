import * as React from 'react'
import { SVGProps } from 'react'

const PlusIcon = (props: SVGProps<SVGSVGElement>) => (
  // <svg
  //   xmlns="http://www.w3.org/2000/svg"
  //   width={24}
  //   height={24}
  //   fill="none"
  //   {...props}>
  //   <path
  //     fill="#fff"
  //     d="M10.579 19.579a1.421 1.421 0 0 0 2.842 0V13.42h6.158a1.421 1.421 0 0 0 0-2.842H13.42V4.42a1.421 1.421 0 0 0-2.842 0v6.158H4.42a1.421 1.421 0 0 0 0 2.842h6.158v6.158Z"
  //   />
  // </svg>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <path
      d="M9 1.5C4.86 1.5 1.5 4.86 1.5 9C1.5 13.14 4.86 16.5 9 16.5C13.14 16.5 16.5 13.14 16.5 9C16.5 4.86 13.14 1.5 9 1.5ZM12.75 9.75H9.75V12.75H8.25V9.75H5.25V8.25H8.25V5.25H9.75V8.25H12.75V9.75Z"
      fill="#002D6D"
    />
  </svg>
)
export default PlusIcon
