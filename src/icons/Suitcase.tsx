import * as React from 'react'
import { SVGProps } from 'react'

const Suitcase = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <path
      d="M15 4.875H12V3.375C12 2.5425 11.3325 1.875 10.5 1.875H7.5C6.6675 1.875 6 2.5425 6 3.375V4.875H3C2.1675 4.875 1.5075 5.5425 1.5075 6.375L1.5 14.625C1.5 15.4575 2.1675 16.125 3 16.125H15C15.8325 16.125 16.5 15.4575 16.5 14.625V6.375C16.5 5.5425 15.8325 4.875 15 4.875ZM10.5 4.875H7.5V3.375H10.5V4.875Z"
      fill={props.fill || '#AFC6FF'}
    />
  </svg>
)
export default Suitcase
