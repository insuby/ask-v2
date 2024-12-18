import * as React from 'react'
import { SVGProps } from 'react'

const PencilIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="18"
      viewBox="0 0 19 18"
      fill="none"
      {...props}
    >
      <path
        d="M11.044 6.765L11.734 7.455L4.93902 14.25H4.24902V13.56L11.044 6.765ZM13.744 2.25C13.5565 2.25 13.3615 2.325 13.219 2.4675L11.8465 3.84L14.659 6.6525L16.0315 5.28C16.324 4.9875 16.324 4.515 16.0315 4.2225L14.2765 2.4675C14.1265 2.3175 13.939 2.25 13.744 2.25ZM11.044 4.6425L2.74902 12.9375V15.75H5.56152L13.8565 7.455L11.044 4.6425Z"
        fill="#AFC6FF"
      />
    </svg>
  )
}
export default PencilIcon
