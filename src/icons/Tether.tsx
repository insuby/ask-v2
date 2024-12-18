import * as React from 'react'
import { SVGProps } from 'react'

const TetherIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 96 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.5 0L0 37.5L48 84L96 37.5L78.5 0H17.5Z" fill="#52AC94" />
      <path
        d="M79 36.25C79 40.2541 65.1208 43.5 48 43.5C30.8792 43.5 17 40.2541 17 36.25C17 32.2459 30.8792 29 48 29C65.1208 29 79 32.2459 79 36.25Z"
        fill="white"
      />
      <path
        d="M75 35.65C75 38.4943 62.9117 40.8 48 40.8C33.0883 40.8 21 38.4943 21 35.65C21 32.8057 33.0883 30.5 48 30.5C62.9117 30.5 75 32.8057 75 35.65Z"
        fill="#52AC94"
      />
      <path d="M42 41H54V67H42V41Z" fill="white" />
      <path d="M24 11H72V23H24V11Z" fill="white" />
      <path d="M24 11H72V23H24V11Z" fill="white" />
      <path d="M54 23H42V39.5L48 39.6L54 39.5V23Z" fill="white" />
    </svg>
  )
}
export default TetherIcon
