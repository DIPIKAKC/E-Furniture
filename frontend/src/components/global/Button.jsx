import { Children } from "react";

export default function Button({children}) {
  return (
    <button className="px-7 py-2 rounded-lg border-1 cursor-pointer">
      {children}
    </button>
  )
}
