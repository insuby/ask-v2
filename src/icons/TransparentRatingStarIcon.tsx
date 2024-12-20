import { SVGProps } from 'react'

const TransparentRatingStarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="16"
    height="15"
    viewBox="0 0 16 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      opacity="0.3"
      d="M8.00003 10.5497L5.18003 12.2522L5.93003 9.04221L3.44003 6.88221L6.72503 6.59721L8.00003 3.57471L9.28253 6.60471L12.5675 6.88971L10.0775 9.04971L10.8275 12.2597L8.00003 10.5497Z"
      fill="#AFC6FF"
    />
    <path
      d="M15.5 5.93L10.1075 5.465L8 0.5L5.8925 5.4725L0.5 5.93L4.595 9.4775L3.365 14.75L8 11.9525L12.635 14.75L11.4125 9.4775L15.5 5.93ZM8 10.55L5.18 12.2525L5.93 9.0425L3.44 6.8825L6.725 6.5975L8 3.575L9.2825 6.605L12.5675 6.89L10.0775 9.05L10.8275 12.26L8 10.55Z"
      fill="#AFC6FF"
    />
  </svg>
)
export default TransparentRatingStarIcon
