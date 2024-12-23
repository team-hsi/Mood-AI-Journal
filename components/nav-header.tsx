import ThemeSwitch from '@/components/theme-switch'
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from './ui/button'
import MoodIcon from './mood-icon'

const NavHeader = () => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between border-b bg-background/40 px-5 backdrop-blur-sm">
      <Link href="/" className="flex gap-3 font-bold text-primary">
        <MoodIcon />
      </Link>
      <div className="flex items-center gap-3">
        <SignedOut>
          <SignInButton>
            <Button variant="outline">Sign In</Button>
          </SignInButton>
          <SignUpButton>
            <Button variant="outline">Sign Up</Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <Link href="/journal">
            <Button>Get Started</Button>
          </Link>
        </SignedIn>
        <ThemeSwitch />
      </div>
    </nav>
  )
}

export default NavHeader
