import React from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'quiet' | 'nav'
  href?: string
  to?: string
}

export function Button({
  children,
  className,
  variant = 'primary',
  href,
  to,
  ...props
}: ButtonProps) {
  const variantClass = {
    primary: 'btn-primary',
    quiet: 'btn-quiet',
    nav: 'btn-nav',
  }[variant]

  const classes = cn('btn', variantClass, className)

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

