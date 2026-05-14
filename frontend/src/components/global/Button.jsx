import { Children } from "react";

export default function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`px-7 py-2 rounded-lg border-1 cursor-pointer ${className}`}
    >
      {children}
    </button>
  )
}
