'use client'

import { Home, LineChart, UserRoundIcon as UserRoundPen } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

type NavItem = {
  href: string
  label: string
  icon: React.ElementType
  matchExact?: boolean
}

const navItems: NavItem[] = [
  { href: '/journal', label: 'Journals', icon: Home },
  { href: '/analytics', label: 'Analytics', icon: LineChart, matchExact: true },
  { href: '/profile', label: 'Profile', icon: UserRoundPen, matchExact: true },
]

interface NavLinksProps {
  mobile?: boolean
}

export default function NavLinks({ mobile = false }: NavLinksProps) {
  const pathname = usePathname()

  return (
    <nav>
      <ul className={cn('flex flex-col gap-1', mobile && 'mt-5')}>
        {navItems.map(({ href, label, icon: Icon, matchExact }) => {
          const isActive = matchExact
            ? pathname === href
            : pathname.startsWith(href)
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2 transition-all',
                  mobile ? 'mx-[-0.65rem]' : 'hover:text-primary',
                  isActive
                    ? 'bg-muted text-primary'
                    : mobile
                      ? 'text-foreground hover:text-foreground'
                      : 'text-muted-foreground',
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon
                  className={cn('h-5 w-5', !mobile && 'h-4 w-4')}
                  aria-hidden="true"
                />
                <span>{label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
