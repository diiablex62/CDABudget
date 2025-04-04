import * as React from "react";

const Lock = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='currentColor'
    width='1em'
    height='1em'
    {...props}>
    <path
      fillRule='evenodd'
      d='M12 2a5 5 0 00-5 5v3H6a3 3 0 00-3 3v7a3 3 0 003 3h12a3 3 0 003-3v-7a3 3 0 00-3-3h-1V7a5 5 0 00-5-5zm3 8V7a3 3 0 10-6 0v3h6z'
      clipRule='evenodd'
    />
  </svg>
);

export default Lock;
