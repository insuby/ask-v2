import * as React from 'react'
import { SVGProps } from 'react'

const CardIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="22"
    height="18"
    viewBox="0 0 22 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.6666 0.333252H2.33329C1.13079 0.333252 0.177459 1.29742 0.177459 2.49992L0.166626 15.4999C0.166626 16.7024 1.13079 17.6666 2.33329 17.6666H19.6666C20.8691 17.6666 21.8333 16.7024 21.8333 15.4999V2.49992C21.8333 1.29742 20.8691 0.333252 19.6666 0.333252ZM19.6666 15.4999H2.33329V8.99992H19.6666V15.4999ZM19.6666 4.66658H2.33329V2.49992H19.6666V4.66658Z"
      fill={props.fill || '#D9E2FF'}
    />
  </svg>
)
export default CardIcon
