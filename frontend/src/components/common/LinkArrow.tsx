import React from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'

interface LinkArrowProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to?: string
  href?: string
}

export function LinkArrow({ children, className, to, href, ...props }: LinkArrowProps) {
  const classes = cn('link-arrow', className)

  if (to) {
    return (
      <Link to={to} className={classes} {...(props as any)}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  )
}

