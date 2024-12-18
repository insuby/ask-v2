import { SVGProps } from 'react'

const ArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill={props.fill}
    {...props}
  >
    <path
      d="M5.5575 11.5575L9 8.1225L12.4425 11.5575L13.5 10.5L9 6L4.5 10.5L5.5575 11.5575Z"
      fill={props.fill}
    />
  </svg>
)
export default ArrowIcon
