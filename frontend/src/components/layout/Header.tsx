import React, { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useScrollHeader } from '@/hooks/useScrollHeader'
import { useModal } from '@/context/ModalContext'
import { cn } from '@/utils/cn'

export function Header() {
  const isSolid = useScrollHeader()
  const { openFollow } = useModal()
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const closeMobile = () => setMobileOpen(false)

  const isWhyZuvvix = location.pathname.startsWith('/category')
  const isHowItWorks = location.pathname.startsWith('/how-it-works')
  const isCRA = location.pathname.startsWith('/continuous-release-assurance')
  const isEvidence =
    location.hash === '#evidence' ||
    location.pathname.startsWith('/assurance-case') ||
    location.pathname.startsWith('/from-change-to-evidence') ||
    location.pathname.startsWith('/readiness') ||
    location.pathname.startsWith('/quality-mandate')
  const isThinking = location.pathname.startsWith('/thinking')

  const handleFollowClick = (e: React.MouseEvent) => {
    e.preventDefault()
    closeMobile()
    openFollow()
  }

  const handleEvidenceClick = () => {
    closeMobile()
    if (location.pathname === '/') {
      const el = document.getElementById('evidence')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className={cn('site-head', isSolid && 'solid')} id="head">
      <div className="wrap">
        <div className="head-row">
          <Link
            to="/"
            className="brand"
            aria-label="Zuvvix home"
            onClick={closeMobile}
          >
            <img
              src="/assets/img/zuvvix-logo.png"
              alt="Zuvvix"
              width="131"
              height="28"
            />
          </Link>

          <nav className="nav" aria-label="Primary">
            <NavLink
              to="/category/"
              className={({ isActive }) => (isActive || isWhyZuvvix ? 'cur' : undefined)}
            >
              Why Zuvvix
            </NavLink>
            <NavLink
              to="/how-it-works/"
              className={({ isActive }) => (isActive || isHowItWorks ? 'cur' : undefined)}
            >
              How it works
            </NavLink>
            <NavLink
              to="/continuous-release-assurance/"
              className={({ isActive }) => (isActive || isCRA ? 'cur' : undefined)}
            >
              Continuous Release Assurance
            </NavLink>
            <Link
              to="/#evidence"
              className={isEvidence ? 'cur' : undefined}
              onClick={handleEvidenceClick}
            >
              Evidence
            </Link>
            <NavLink
              to="/thinking/"
              className={({ isActive }) => (isActive || isThinking ? 'cur' : undefined)}
            >
              Thinking
            </NavLink>
            <a
              href="#follow"
              onClick={handleFollowClick}
              className="opt whitespace-nowrap cursor-pointer"
            >
              Follow the build
            </a>
            <Link to="/design-partnership/" className="btn btn-nav">
              Explore a design partnership
            </Link>
          </nav>

          <button
            className="menu-btn"
            id="menuBtn"
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mnav"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? 'Close' : 'Menu'}
          </button>
        </div>

        {mobileOpen && (
          <nav className="mnav" id="mnav" aria-label="Primary mobile">
            <Link
              to="/category/"
              onClick={closeMobile}
              className={isWhyZuvvix ? 'cur' : undefined}
            >
              Why Zuvvix
            </Link>
            <Link
              to="/how-it-works/"
              onClick={closeMobile}
              className={isHowItWorks ? 'cur' : undefined}
            >
              How it works
            </Link>
            <Link
              to="/continuous-release-assurance/"
              onClick={closeMobile}
              className={isCRA ? 'cur' : undefined}
            >
              Continuous Release Assurance
            </Link>
            <Link
              to="/#evidence"
              onClick={handleEvidenceClick}
              className={isEvidence ? 'cur' : undefined}
            >
              Evidence
            </Link>
            <Link
              to="/thinking/"
              onClick={closeMobile}
              className={isThinking ? 'cur' : undefined}
            >
              Thinking
            </Link>
            <a href="#follow" onClick={handleFollowClick}>
              Follow the build
            </a>
            <Link
              to="/design-partnership/"
              className="btn btn-primary"
              onClick={closeMobile}
            >
              Explore a design partnership
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}

