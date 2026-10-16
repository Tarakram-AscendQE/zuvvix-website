export interface NavItem {
  label: string
  href: string
  isAction?: boolean
  isOptional?: boolean
  isDialogTrigger?: boolean
}

export interface FooterSection {
  title: string
  links: {
    label: string
    href: string
    isDialogTrigger?: boolean
  }[]
}

