import * as React from "react"

const CheckMark = ({dimensions}) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={dimensions}
          height={dimensions}
          viewBox="0 0 512 512"
        >
          <path
            fill="none"
            stroke="#000"
            strokeMiterlimit="10"
            strokeWidth="32"
            d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
          ></path>
          <path
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M352 176L217.6 336 160 272"
          ></path>
        </svg>
)

export default CheckMark;
