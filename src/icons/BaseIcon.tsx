import * as React from 'react'
import { SVGProps } from 'react'

const BaseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_1923_4207)">
      <path
        d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12Z"
        fill="#D9E2FF"
      />
      <path
        d="M12.0004 18C15.3141 18 18.0003 15.3137 18.0003 12C18.0003 8.68632 15.3141 6 12.0004 6C8.83618 6 6.24406 8.44938 6.0166 11.5556H13.8731V12.4444H6.0166C6.24406 15.5506 8.83618 18 12.0004 18Z"
        fill="#292A2D"
      />
    </g>
    <defs>
      <clipPath id="clip0_1923_4207">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
)
export default BaseIcon
