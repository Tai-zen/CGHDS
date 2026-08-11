import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, BookOpen, Newspaper, BookMarked, GraduationCap, Feather, Menu, X, Users, Award, Star, Clock, Images, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const researchLinks = [
  { label: 'Journal', path: '/publications/journal', icon: BookOpen, desc: 'Peer-reviewed academic journals' },
  { label: 'Literature', path: '/publications/literature', icon: Feather, desc: 'Literary criticism & analysis' },
  { label: 'Newsletter', path: '/publications/newsletter', icon: Newspaper, desc: 'Latest news & updates' },
  { label: 'Monograph', path: '/publications/monograph', icon: BookMarked, desc: 'In-depth scholarly volumes' },
  { label: 'Publications', path: '/publications/all', icon: GraduationCap, desc: 'All outputs' },
]

const staffLinks = [
  { label: 'Current Executives', path: '/staff/executives', icon: Star, desc: 'Active leadership team' },
  { label: 'Current Staff', path: '/staff/current', icon: Users, desc: 'Active staff members' },
  { label: 'Past Executives', path: '/staff/past-executives', icon: Award, desc: 'Former leadership' },
  { label: 'Past Staff', path: '/staff/past', icon: Clock, desc: 'Former staff members' },
]

function NavDropdown({ label, links, sectionTitle, isActive }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  useEffect(() => { const close = () => setOpen(false); close() }, [location])

  return (
    <div style={{ position: 'relative' }} ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`nav-link${isActive ? ' active' : ''}`}
        style={{ display: 'flex', alignItems: 'center', gap: 4, border: 'none', cursor: 'pointer', background: 'transparent' }}
      >
        {label}
        <ChevronDown size={13} style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }} />
      </button>

      {open && (
        <div className="animate-fade-in" style={{
          position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
          marginTop: 12, width: 272, borderRadius: 16, overflow: 'hidden',
          background: 'var(--dropdown-bg)', border: '1px solid var(--border-nav)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6)'
        }}>
          <div style={{ padding: 8 }}>
            <p className="section-label" style={{ padding: '8px 12px', marginBottom: 4 }}>{sectionTitle}</p>
            {links.map(item => {
              const Icon = item.icon
              return (
                <Link key={item.path} to={item.path}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 12, textDecoration: 'none', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--dropdown-hover)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--dropdown-icon-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={13} style={{ color: 'var(--dropdown-icon-color)' }} />
                  </div>
                  <div>
                    <p className="font-display" style={{ color: 'var(--text-primary)', fontSize: 14, fontWeight: 500 }}>{item.label}</p>
                    <p style={{ color: 'var(--dropdown-desc)', fontSize: 11 }}>{item.desc}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileStaff, setMobileStaff] = useState(false)
  const [mobileResearch, setMobileResearch] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { const close = () => setMobileOpen(false); close() }, [location])

  const links = [
    { label: 'About', path: '/about' },
    { label: 'Programmes', path: '/programmes' },
    { label: 'Events', path: '/events' },
    { label: 'Contact', path: '/contact' },
  ]

  const isActive = (p) => location.pathname === p
  const staffActive = location.pathname.startsWith('/staff')
  const researchActive = location.pathname.startsWith('/publications')
  const galleryActive = location.pathname === '/gallery'

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      padding: scrolled ? '10px 0' : '18px 0',
      transition: 'padding 0.5s ease, background 0.35s ease',
      background: scrolled ? 'var(--nav-bg-scrolled)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, zIndex: 10, flexShrink: 0, textDecoration: 'none' }}>
          <img src="/CGHDS_LOGO.png" alt="CGHDS Logo" style={{ width: 44, height: 44, objectFit: 'contain', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))' }} />
          <span className="font-display" style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 14, letterSpacing: '0.05em' }}>CGHDS</span>
        </Link>

        {/* Centered pill nav */}
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex' }} className="desktop-nav">
          <div className="pill-nav" style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '8px 12px' }}>
            <Link to="/" className={`nav-link${isActive('/') ? ' active' : ''}`} style={{ textDecoration: 'none' }}>Home</Link>
            {links.map(l => (
              <Link key={l.path} to={l.path} className={`nav-link${isActive(l.path) ? ' active' : ''}`} style={{ textDecoration: 'none' }}>
                {l.label}
              </Link>
            ))}

            {/* Staff dropdown */}
            <NavDropdown label="Staff" links={staffLinks} sectionTitle="People" isActive={staffActive} />

            {/* Gallery link */}
            <Link to="/gallery" className={`nav-link${galleryActive ? ' active' : ''}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Images size={12} />Gallery
            </Link>

            {/* Research dropdown */}
            <NavDropdown label="Research" links={researchLinks} sectionTitle="Research & Publications" isActive={researchActive} />
          </div>
        </div>

        {/* Right — Theme Toggle */}
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8 }} className="desktop-nav">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            style={{
              width: 38, height: 38, borderRadius: '50%',
              border: '1px solid var(--border-gold-dim)',
              background: 'var(--toggle-bg)',
              backdropFilter: 'blur(12px)',
              color: 'var(--gold)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.2s ease', flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold-bg-strong)'; e.currentTarget.style.borderColor = 'var(--gold)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--toggle-bg)'; e.currentTarget.style.borderColor = 'var(--border-gold-dim)' }}
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>

        {/* Mobile: theme toggle + menu button */}
        <div className="mobile-nav-toggle" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            style={{
              width: 36, height: 36, borderRadius: '50%',
              border: '1px solid var(--border-gold-dim)',
              background: 'var(--toggle-bg)',
              color: 'var(--gold)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', flexShrink: 0,
            }}
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} style={{ color: 'var(--text-primary)', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="animate-fade-in mobile-nav-toggle" style={{ margin: '8px 16px 0', borderRadius: 16, overflow: 'hidden', background: 'var(--dropdown-bg)', border: '1px solid var(--border-nav)' }}>
          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[{ label: 'Home', path: '/' }, ...links].map(l => (
              <Link key={l.path} to={l.path} style={{ display: 'block', padding: '12px 16px', borderRadius: 12, fontSize: 14, fontFamily: 'Syne, sans-serif', fontWeight: 500, textDecoration: 'none', color: isActive(l.path) ? '#fff' : 'rgba(255,255,255,0.6)', background: isActive(l.path) ? 'rgba(255,255,255,0.1)' : 'transparent' }}>
                {l.label}
              </Link>
            ))}

            <Link to="/gallery" style={{ display: 'block', padding: '12px 16px', borderRadius: 12, fontSize: 14, fontFamily: 'Syne, sans-serif', fontWeight: 500, textDecoration: 'none', color: galleryActive ? '#fff' : 'rgba(255,255,255,0.6)', background: galleryActive ? 'rgba(255,255,255,0.1)' : 'transparent' }}>
              Gallery
            </Link>

            {/* Staff section */}
            <div style={{ paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: 4 }}>
              <button onClick={() => setMobileStaff(!mobileStaff)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px', background: 'none', border: 'none', cursor: 'pointer' }}>
                <p className="section-label">Staff</p>
                <ChevronDown size={13} style={{ color: 'rgba(255,255,255,0.3)', transform: mobileStaff ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              {mobileStaff && staffLinks.map(item => (
                <Link key={item.path} to={item.path} style={{ display: 'block', padding: '10px 16px', borderRadius: 12, fontSize: 14, fontFamily: 'Syne, sans-serif', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Research section */}
            <div style={{ paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: 4 }}>
              <button onClick={() => setMobileResearch(!mobileResearch)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px', background: 'none', border: 'none', cursor: 'pointer' }}>
                <p className="section-label">Research</p>
                <ChevronDown size={13} style={{ color: 'rgba(255,255,255,0.3)', transform: mobileResearch ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              {mobileResearch && researchLinks.map(item => (
                <Link key={item.path} to={item.path} style={{ display: 'block', padding: '10px 16px', borderRadius: 12, fontSize: 14, fontFamily: 'Syne, sans-serif', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1023px) { .desktop-nav { display: none !important; } }
        @media (min-width: 1024px) { .mobile-nav-toggle { display: none !important; } }
      `}</style>
    </nav>
  )
}
