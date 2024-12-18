import { SVGProps } from 'react'

const TransparentSuitCaseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path opacity="0.3" d="M3 6H15V14.25H3V6Z" fill="#BFC6DC" />
    <path
      d="M15 4.5H12V3C12 2.1675 11.3325 1.5 10.5 1.5H7.5C6.6675 1.5 6 2.1675 6 3V4.5H3C2.1675 4.5 1.5075 5.1675 1.5075 6L1.5 14.25C1.5 15.0825 2.1675 15.75 3 15.75H15C15.8325 15.75 16.5 15.0825 16.5 14.25V6C16.5 5.1675 15.8325 4.5 15 4.5ZM7.5 3H10.5V4.5H7.5V3ZM15 14.25H3V6H15V14.25Z"
      fill="#BFC6DC"
    />
  </svg>
)
export default TransparentSuitCaseIcon
