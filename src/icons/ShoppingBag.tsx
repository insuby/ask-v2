import { SVGProps } from 'react'

const ShoppingBag = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <path
        d="M13.5 4.5H12C12 2.8425 10.6575 1.5 9 1.5C7.3425 1.5 6 2.8425 6 4.5H4.5C3.675 4.5 3 5.175 3 6V15C3 15.825 3.675 16.5 4.5 16.5H13.5C14.325 16.5 15 15.825 15 15V6C15 5.175 14.325 4.5 13.5 4.5ZM9 3C9.825 3 10.5 3.675 10.5 4.5H7.5C7.5 3.675 8.175 3 9 3ZM13.5 15H4.5V6H6V7.5C6 7.9125 6.3375 8.25 6.75 8.25C7.1625 8.25 7.5 7.9125 7.5 7.5V6H10.5V7.5C10.5 7.9125 10.8375 8.25 11.25 8.25C11.6625 8.25 12 7.9125 12 7.5V6H13.5V15Z"
        fill={props.fill}
      />
    </svg>
  )
}
export default ShoppingBag
