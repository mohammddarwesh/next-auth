import * as React from "react"
import { cn } from "@/lib/utils"

function Auth0({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-5 w-5", className)}
      {...props}
    >
      <path
        fill="currentColor"
        d="M21.98 7.448L19.62 0H4.347L2.02 7.448c-1.352 4.636.132 9.709 3.8 12.873L11.992 24l6.157-3.681c3.633-3.221 5.18-8.285 3.83-12.87zM12 15.5a4.5 4.5 0 110-9 4.5 4.5 0 010 9z"
      />
    </svg>
  )
}

export const Icons = {
  auth0: Auth0,
}
