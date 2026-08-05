import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Users, Award, Star, Clock } from 'lucide-react'

function StaffCard({ member }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', borderRadius: 20, overflow: 'hidden',
        aspectRatio: '3/4', cursor: 'default',
        boxShadow: hovered ? '0 24px 64px rgba(0,0,0,0.6)' : '0 4px 24px rgba(0,0,0,0.3)',
        transition: 'box-shadow 0.4s ease, transform 0.4s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
      }}
    >
      {/* Photo */}
      <img
        src={member.photo_url || '/CGHDS_LOGO.png'}
        alt={member.name}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease', transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
        onError={e => { e.target.src = '/CGHDS_LOGO.png'; e.target.style.objectFit = 'contain'; e.target.style.background = '#161616'; e.target.style.padding = '20px' }}
      />

      {/* Default name bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
        padding: '40px 20px 20px',
        transform: hovered ? 'translateY(100%)' : 'translateY(0)',
        transition: 'transform 0.4s ease',
      }}>
        <p style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 15 }}>{member.name}</p>
        <p style={{ color: 'var(--gold)', fontFamily: 'Syne, sans-serif', fontSize: 12, marginTop: 2 }}>{member.role}</p>
      </div>

      {/* Hover overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(13,13,13,0.97) 0%, rgba(13,13,13,0.7) 60%, transparent 100%)',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: 24,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}>
        <p style={{ color: 'var(--gold)', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>{member.role}</p>
        <p style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 17, marginBottom: 10 }}>{member.name}</p>
        {member.tenure && (
          <p style={{ color: 'var(--text-secondary)', fontFamily: 'Syne, sans-serif', fontSize: 11, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 5 }}>
            <Clock size={10} /> {member.tenure}
          </p>
        )}
        {member.achievements && (
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, lineHeight: 1.6, fontFamily: 'Syne, sans-serif' }}>{member.achievements}</p>
        )}
      </div>
    </div>
  )
}

function StaffPageLayout({ title, subtitle, category, icon: Icon, accentColor }) {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('staff').select('*').eq('category', category).order('sort_order', { ascending: true })
      .then(({ data }) => { setMembers(data || []); setLoading(false) })
  }, [category])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', paddingTop: 120 }}>
      {/* Header */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 64px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: `${accentColor}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={20} style={{ color: accentColor }} />
          </div>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: 11, fontFamily: 'Syne, sans-serif', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 2 }}>CGHDS</p>
            <h1 style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 5vw, 48px)', lineHeight: 1 }}>{title}</h1>
          </div>
        </div>
        {subtitle && <p style={{ color: 'var(--text-secondary)', fontSize: 15, maxWidth: 560, lineHeight: 1.7, fontFamily: 'Syne, sans-serif' }}>{subtitle}</p>}
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 96px' }}>
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24 }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{ aspectRatio: '3/4', borderRadius: 20, background: 'rgba(255,255,255,0.04)', animation: 'pulse 1.5s ease-in-out infinite' }} />
            ))}
          </div>
        ) : members.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <Icon size={48} style={{ color: 'rgba(255,255,255,0.08)', margin: '0 auto 20px', display: 'block' }} />
            <p style={{ color: 'var(--text-faint)', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 20 }}>No members added yet.</p>
            <p style={{ color: 'rgba(255,255,255,0.1)', fontSize: 14, marginTop: 8 }}>The admin can add members from the Admin Portal.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24 }}>
            {members.map(m => <StaffCard key={m.id} member={m} />)}
          </div>
        )}
      </div>
    </div>
  )
}

export function CurrentStaffPage() {
  return <StaffPageLayout
    title="Current Staff"
    subtitle="Meet the dedicated team driving research, administration, and academic excellence at CGHDS today."
    category="current_staff"
    icon={Users}
    accentColor="#C9A84C"
  />
}

export function CurrentExecutivesPage() {
  return <StaffPageLayout
    title="Current Executives"
    subtitle="The leadership team steering CGHDS toward its mission of gender equity, humanitarian action, and development research."
    category="current_executive"
    icon={Star}
    accentColor="#C9A84C"
  />
}

export function PastStaffPage() {
  return <StaffPageLayout
    title="Past Staff"
    subtitle="Honoring those who contributed their expertise and dedication to building CGHDS into what it is today."
    category="past_staff"
    icon={Clock}
    accentColor="#888"
  />
}

export function PastExecutivesPage() {
  return <StaffPageLayout
    title="Past Executives"
    subtitle="Celebrating the visionary leaders who shaped the direction and legacy of CGHDS over the years."
    category="past_executive"
    icon={Award}
    accentColor="#888"
  />
}
