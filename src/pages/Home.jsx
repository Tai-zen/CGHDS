import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Scale, Globe, BarChart2, GraduationCap, BookOpen, Newspaper, BookMarked, Calendar } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { supabase } from '../lib/supabase'

const stats = [
  { value: '17+', label: 'Programmes & Short Courses' },
  { value: '45+', label: 'Students Enrolled' },
  { value: '5+', label: 'Research Consortiums' },
  { value: '2020', label: 'Est. by Senate Mandate' },
]

const focuses = [
  { icon: Scale, title: 'Gender & Policy', desc: 'Designing policies and programs for gender equality, conflict resolution, and sustainable peace-building across Africa.' },
  { icon: Globe, title: 'Humanitarian Action', desc: 'Developing guidelines for poverty reduction, humanitarian response, and pro-poor development strategies.' },
  { icon: BarChart2, title: 'Research & Consultancy', desc: 'Engaging in rigorous research, consultancies, and addressing socio-economic, political, and gender-related issues.' },
  { icon: GraduationCap, title: 'Academic Excellence', desc: 'Equipping students and professionals with analytical skills for understanding gender and development at all levels.' },
]

const executives = [
  { name: 'Prof. O.I. Aina (PhD)', role: 'Founding Director', img: 'http://cghds.run.edu.ng/assets/img/executives/prof-aina.jpg' },
  { name: 'Dr. O.O. Ilesanmi (PhD)', role: 'Director', img: 'http://cghds.run.edu.ng/assets/img/executives/dr-mrs-ilesanmi-centre-acting-director.JPG' },
  { name: 'Mrs. I.D. Adefisoye', role: 'Lecturer', img: 'http://cghds.run.edu.ng/assets/img/executives/Ibironke-Adefisoye.JPG' },
  { name: 'Mrs Elizabeth A. Salami', role: 'Admin Staff', img: 'http://cghds.run.edu.ng/assets/img/executives/Mrs Salami.jpg' },
]

const tickerItems = ['GENDER STUDIES', 'HUMANITARIAN ACTION', 'DEVELOPMENT RESEARCH', 'POLICY DESIGN', 'ACADEMIC EXCELLENCE', "REDEEMER'S UNIVERSITY", 'PEACE-BUILDING', 'SOCIAL EQUITY']

const events = [
  {
    tag: 'CONFERENCE',
    date: { day: '10', month: 'NOV', year: '2025' },
    title: '2025 International Conference',
    desc: '"Recent Advances in Gender, Humanitarianism and Development" — November 10th–14th, 2025.',
    link: '/events/2025-international-conference',
    internal: true,
    img: 'http://cghds.run.edu.ng/assets/img/events/novcghds.jpg',
  },
  {
    tag: 'LECTURE',
    date: { day: '21', month: 'SEP', year: '2023' },
    title: 'Gender, Conflict & Peace-Building',
    desc: 'Lecture series on innovative approaches to gender equality in peace-building efforts.',
    link: 'http://cghds.run.edu.ng',
    internal: false,
    img: 'http://cghds.run.edu.ng/assets/img/events/GENDER-CONFLICT-PEACE-BUILDING.png',
  },
]

// DB events store `date` as free text (e.g. "November 10–14, 2026"); this section
// needs { day, month, year }. Parse what we can, fall back to em-dashes if it doesn't parse.
function parseEventDate(raw) {
  if (!raw) return { day: '—', month: '—', year: '—' }
  const match = raw.match(/([A-Za-z]+)\s+(\d{1,2})[\D]*?(\d{4})/)
  if (match) {
    return { day: match[2], month: match[1].slice(0, 3).toUpperCase(), year: match[3] }
  }
  const parsed = new Date(raw)
  if (!isNaN(parsed)) {
    return {
      day: String(parsed.getDate()),
      month: parsed.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      year: String(parsed.getFullYear()),
    }
  }
  return { day: '—', month: '—', year: '—' }
}

const C = ({ children, style = {}, tag: Tag = 'div', ...props }) => (
  <Tag style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', ...style }} {...props}>{children}</Tag>
)

export default function Home() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [eventsLoaded, setEventsLoaded] = useState(false)
  const [dbEvents, setDbEvents] = useState([])

  useEffect(() => {
    supabase.from('upcoming_events').select('*').order('event_date', { ascending: true })
      .then(({ data }) => { setUpcomingEvents(data || []); setEventsLoaded(true) })
      .catch(() => setEventsLoaded(true))

    supabase.from('events').select('*').order('created_at', { ascending: false }).limit(2)
      .then(({ data }) => { if (data) setDbEvents(data) })
  }, [])

  // Show newest DB events first, then pad with the static fallback events up to 2 total
  const displayEvents = [
    ...dbEvents.map(ev => ({ tag: ev.tag, date: parseEventDate(ev.date), title: ev.title, desc: ev.desc, link: ev.link, internal: ev.internal, img: ev.img })),
    ...events,
  ].slice(0, 2)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', transition: 'background 0.35s ease' }}>

      {/* ─── HERO ─── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
        {/* BG */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('http://cghds.run.edu.ng/assets/img/CGHDS_PHOTO_GALLERY/IMG_7105.JPG')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 'var(--img-opacity)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'var(--hero-overlay)' }} />
        </div>

        {/* Hero content */}
        <div style={{ position: 'relative', width: '100%', maxWidth: 1280, margin: '0 auto', padding: '144px 24px 96px', textAlign: 'center' }}>
          {/* Dynamic Upcoming Event Badge */}
          {eventsLoaded && (
            <div className="animate-fade-up" style={{ marginBottom: 40 }}>
              {upcomingEvents.length > 0 ? (
                <Link to={upcomingEvents[0].link || '/events'} style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, border: '1px solid var(--border-nav)', borderRadius: 999, padding: '8px 20px', background: 'var(--gold-bg)' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)' }} />
                  <span className="font-display" style={{ color: 'var(--text-secondary)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{upcomingEvents[0].title}</span>
                  <ArrowRight size={11} style={{ color: 'var(--text-muted)' }} />
                </Link>
              ) : (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, border: '1px solid var(--border-nav)', borderRadius: 999, padding: '8px 20px', background: 'var(--bg-surface)' }}>
                  <Calendar size={11} style={{ color: 'var(--text-muted)' }} />
                  <span className="font-display" style={{ color: 'var(--text-muted)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase' }}>No upcoming events</span>
                </div>
              )}
            </div>
          )}

          <h1 className="font-display animate-fade-up delay-1" style={{ fontWeight: 800, lineHeight: 0.95, marginBottom: 32, fontSize: 'clamp(48px, 8vw, 110px)', overflowWrap: 'break-word', wordBreak: 'break-word', hyphens: 'auto' }}>
            <span style={{ color: 'var(--text-primary)' }}>Centre for Gender,</span>
            <br />
            <span className="font-serif text-gold" style={{ fontSize: 'clamp(44px, 7.5vw, 104px)', fontStyle: 'italic' }}>Humanitarian</span>
            <br />
            <span style={{ color: 'var(--text-primary)' }}>&amp; Development</span>
            <br />
            <span className="font-serif text-gold" style={{ fontStyle: 'italic' }}>Studies.</span>
          </h1>

          <p className="animate-fade-up delay-2" style={{ color: 'var(--text-secondary)', fontSize: 18, maxWidth: 480, margin: '0 auto 48px', fontWeight: 300, lineHeight: 1.7 }}>
            Advancing research, building resilience, and shaping policy for a more equitable Africa — from Redeemer's University, Nigeria.
          </p>

          {/* CTA buttons */}
          <div className="animate-fade-up delay-3" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <Link to="/about" className="btn-filled" style={{ textDecoration: 'none' }}>
              Explore CGHDS <ArrowRight size={15} />
            </Link>
            <Link to="/publications/all" className="btn-outline" style={{ textDecoration: 'none' }}>
              View Research <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="stats-bar" style={{ position: 'relative', width: '100%' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
            <div className="stats-grid">
              {stats.map((s, i) => (
                <div key={i} className="stat-item">
                  <p className="stat-value">{s.value}</p>
                  <p className="stat-label">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── TICKER ─── */}
      <div className="ticker-wrap">
        <div className="ticker-inner">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="ticker-item">
              {item}
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--gold)', opacity: 0.6, flexShrink: 0 }} />
            </span>
          ))}
        </div>
      </div>

      {/* ─── WHAT WE DO ─── */}
      <section className="section-py-lg">
        <C>
          <div className="two-col">
            {/* Left */}
            <div style={{ top: 128 }}>
              <p className="section-label" style={{ marginBottom: 24 }}>What We Do</p>
              <h2 className="font-display" style={{ fontWeight: 800, color: 'var(--text-primary)', lineHeight: 0.95, marginBottom: 24, fontSize: 'clamp(36px, 5vw, 64px)' }}>
                Shaping the future of <span className="font-serif text-gold" style={{ fontStyle: 'italic' }}>gender</span> &amp; development.
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 32, fontSize: 14, maxWidth: 380 }}>
                CGHDS bridges the gap between academic research and real-world impact through four core pillars.
              </p>
              <Link to="/about" className="btn-outline" style={{ textDecoration: 'none' }}>
                Learn About Us <ArrowRight size={15} />
              </Link>
            </div>

            {/* Right */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {focuses.map((f, i) => {
                const Icon = f.icon
                return (
                  <div key={i} className="card-dark" style={{ padding: 28, display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--gold-bg)', border: '1px solid var(--border-gold-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                      <Icon size={18} style={{ color: 'var(--gold)' }} />
                    </div>
                    <div>
                      <h3 className="font-display" style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 16, marginBottom: 6 }}>{f.title}</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </C>
      </section>

      {/* ─── EVENTS ─── */}
      <section className="section-py section-border">
        <C>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48 }}>
            <div>
              <p className="section-label" style={{ marginBottom: 16 }}>Past Events</p>
              <h2 className="font-display" style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 'clamp(32px, 4vw, 56px)' }}>Campus Calendar</h2>
            </div>
            <Link to="/events" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: 14, fontFamily: 'Syne, sans-serif', textDecoration: 'none' }}>
              View all events <ArrowRight size={14} />
            </Link>
          </div>

          <div className="event-grid">
            {displayEvents.map((ev, i) => {
              const cardContent = (
                <>
                  <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                    <img src={ev.img} alt={ev.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 'var(--img-card-opacity)', transition: 'all 0.5s' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-surface), transparent 60%)' }} />
                    <span className="font-display" style={{ position: 'absolute', top: 16, right: 16, background: 'var(--gold)', color: 'var(--bg-base)', fontSize: 10, fontWeight: 700, padding: '4px 12px', borderRadius: 999, letterSpacing: '0.1em' }}>
                      {ev.tag}
                    </span>
                    <div style={{ position: 'absolute', bottom: 16, left: 16, background: isDark ? 'rgba(13,13,13,0.85)' : 'rgba(244,241,235,0.92)', borderRadius: 12, padding: '8px 12px', textAlign: 'center', minWidth: 52 }}>
                      <p className="font-display" style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 20, lineHeight: 1 }}>{ev.date.day}</p>
                      <p className="font-display" style={{ color: 'var(--gold)', fontSize: 10, letterSpacing: '0.1em', marginTop: 2 }}>{ev.date.month}</p>
                      <p style={{ color: 'var(--text-muted)', fontSize: 9 }}>{ev.date.year}</p>
                    </div>
                  </div>
                  <div style={{ padding: 24 }}>
                    <h3 className="font-display" style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 20, marginBottom: 8 }}>{ev.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6, marginBottom: ev.internal ? 16 : 0 }}>{ev.desc}</p>
                    {ev.internal && (
                      <span className="font-display" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--gold)', fontSize: 14, fontWeight: 500 }}>
                        View <ArrowRight size={14} />
                      </span>
                    )}
                  </div>
                </>
              )
              return ev.internal
                ? <Link key={i} to={ev.link} className="card-dark hover-lift" style={{ overflow: 'hidden', textDecoration: 'none', display: 'block' }}>{cardContent}</Link>
                : <div key={i} className="card-dark" style={{ overflow: 'hidden', display: 'block' }}>{cardContent}</div>
            })}
          </div>
        </C>
      </section>

      {/* ─── EXECUTIVES ─── */}
      <section className="section-py section-border">
        <C>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48 }}>
            <div>
              <p className="section-label" style={{ marginBottom: 16 }}>Leadership</p>
              <h2 className="font-display" style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 'clamp(32px, 4vw, 56px)' }}>Meet the Executives</h2>
            </div>
            <Link to="/about" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: 14, fontFamily: 'Syne, sans-serif', textDecoration: 'none' }}>
              Meet the team <ArrowRight size={14} />
            </Link>
          </div>

          <div className="exec-grid">
            {executives.map((ex, i) => (
              <div key={i} className="exec-card">
                <img src={ex.img} alt={ex.name}
                  onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(ex.name)}&background=1a1a1a&color=C9A84C&size=400&bold=true` }} />
                <div className="exec-overlay" />
                <div className="exec-info">
                  <p className="font-display" style={{ fontWeight: 700, color: '#fff', fontSize: 14, lineHeight: 1.3 }}>{ex.name}</p>
                  <p className="font-display" style={{ color: 'var(--gold)', fontSize: 12, marginTop: 4 }}>{ex.role}</p>
                </div>
              </div>
            ))}
          </div>
        </C>
      </section>

      {/* ─── RESEARCH CTA ─── */}
      <section className="section-py section-border">
        <C>
          <div className="pub-grid">
            {/* Left big card */}
            <div className="card-dark hover-lift" style={{ padding: 40, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: 256, height: 256, borderRadius: '50%', background: 'var(--gold-bg)', filter: 'blur(48px)', transform: 'translate(50%, -50%)' }} />
              <p className="section-label" style={{ marginBottom: 16 }}>Research</p>
              <h3 className="font-display" style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 36, lineHeight: 1.2, marginBottom: 16 }}>
                Explore our<br /><span className="font-serif text-gold" style={{ fontStyle: 'italic' }}>publications.</span>
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 32, maxWidth: 280 }}>
                Journals, newsletters, monographs, and research papers from our faculty and partners.
              </p>
              <Link to="/publications/all" className="btn-outline" style={{ textDecoration: 'none' }}>
                Browse All <ArrowRight size={15} />
              </Link>
            </div>

            {/* Right stacked */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { label: 'Journal', path: '/publications/journal', desc: 'Peer-reviewed academic journals', icon: BookOpen },
                { label: 'Newsletter', path: '/publications/newsletter', desc: 'Latest news & updates', icon: Newspaper },
                { label: 'Monograph', path: '/publications/monograph', desc: 'In-depth scholarly volumes', icon: BookMarked },
              ].map((item, i) => (
                <Link key={i} to={item.path} className="card-dark hover-lift" style={{ padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--dropdown-icon-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <item.icon size={18} style={{ color: 'var(--dropdown-icon-color)' }} />
                    </div>
                    <div>
                      <p className="font-display" style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{item.label}</p>
                      <p style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 2 }}>{item.desc}</p>
                    </div>
                  </div>
                  <ArrowUpRight size={16} style={{ color: 'var(--text-faint)', flexShrink: 0 }} />
                </Link>
              ))}
            </div>
          </div>
        </C>
      </section>

      {/* ─── UPCOMING EVENTS BANNER ─── */}
      {upcomingEvents.length > 0 && (
      <section className="section-py section-border">
        <C>
          {upcomingEvents.map((ev, i) => (
          <div key={i} style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', background: isDark ? 'linear-gradient(135deg, #1a1400 0%, #0D0D0D 60%)' : 'linear-gradient(135deg, #1A3D28 0%, #0f2a1a 60%)', marginBottom: i < upcomingEvents.length - 1 ? 20 : 0 }}>
            <div style={{ position: 'absolute', inset: 0 }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: 384, height: 384, borderRadius: '50%', background: 'var(--gold-bg-strong)', filter: 'blur(48px)', transform: 'translate(-50%, -50%)' }} />
            </div>
            <div style={{ position: 'relative', padding: '64px 48px', textAlign: 'center' }}>
              <span className="font-display" style={{ display: 'inline-block', background: 'var(--gold-bg-strong)', border: '1px solid var(--border-gold)', color: 'var(--gold)', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '8px 16px', borderRadius: 999, marginBottom: 24 }}>
                Upcoming Event
              </span>
              <h2 className="font-display" style={{ fontWeight: 800, color: '#fff', marginBottom: 12, fontSize: 'clamp(24px, 4vw, 52px)' }}>
                {ev.title}
              </h2>
              {ev.subtitle && <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 17, marginBottom: 8 }}>{ev.subtitle}</p>}
              {ev.event_date && <p className="font-display" style={{ color: 'var(--gold)', fontWeight: 500, marginBottom: 36 }}>{ev.event_date}</p>}
              {ev.link && (
                <Link to={ev.link} style={{ background: '#fff', color: '#0D0D0D', borderRadius: 999, padding: '12px 28px', fontFamily: 'Syne, sans-serif', fontSize: 14, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                  View Details <ArrowRight size={15} />
                </Link>
              )}
            </div>
          </div>
          ))}
        </C>
      </section>
      )}

    </div>
  )
}