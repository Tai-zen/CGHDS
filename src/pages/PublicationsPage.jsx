import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Search, Download, ExternalLink, Calendar, User, BookOpen, Newspaper, BookMarked, GraduationCap } from 'lucide-react'

const pageConfig = {
  journal:    { title: 'Journal',      subtitle: 'Peer-reviewed scholarly research',    icon: BookOpen,      type: 'journal' },
  newsletter: { title: 'Newsletter',   subtitle: 'News, updates & announcements',       icon: Newspaper,     type: 'newsletter' },
  monograph:  { title: 'Monograph',    subtitle: 'In-depth scholarly volumes',          icon: BookMarked,    type: 'monograph' },
  all:        { title: 'Publications', subtitle: 'All research outputs from CGHDS',     icon: GraduationCap, type: null },
}

const sampleData = [
  { id: 1, title: 'Gender Equality in Sub-Saharan Africa: Progress and Challenges', type: 'journal', authors: 'Prof. O.I. Aina, Dr. O.O. Ilesanmi', publish_date: '2024-03-15', abstract: 'This paper examines the multifaceted dimensions of gender equality across Sub-Saharan Africa, exploring systemic barriers and policy interventions for sustainable change.', volume: '1', file_url: null, external_url: null },
  { id: 2, title: 'CGHDS Newsletter — Q1 2025', type: 'newsletter', authors: 'CGHDS Editorial Team', publish_date: '2025-01-20', abstract: 'Updates from the Centre including upcoming conferences, new research grants, and student achievements in Q1 2025.', volume: null, file_url: null, external_url: null },
  { id: 3, title: 'Humanitarian Response in Crisis-Affected Communities', type: 'monograph', authors: 'Mrs. I.D. Adefisoye', publish_date: '2023-11-10', abstract: 'A comprehensive monograph exploring humanitarian response frameworks and their effectiveness in Nigerian crisis-affected communities.', volume: '2', file_url: null, external_url: null },
  { id: 4, title: 'Development Studies: A Nigerian Perspective', type: 'journal', authors: 'CGHDS Research Team', publish_date: '2024-06-01', abstract: 'An analysis of development trajectories within the Nigerian context, with implications for broader African development strategies.', volume: '3', file_url: null, external_url: null },
  { id: 5, title: 'CGHDS Newsletter — Q3 2024', type: 'newsletter', authors: 'CGHDS Editorial Team', publish_date: '2024-07-15', abstract: 'This edition covers Sickle Cell+ Club activities, lecture series highlights, and upcoming international partnerships.', volume: null, file_url: null, external_url: null },
  { id: 6, title: 'Conflict Resolution and Peace-Building: Gender Dimensions', type: 'monograph', authors: 'Prof. O.I. Aina', publish_date: '2024-09-30', abstract: 'Explores the intersections of gender and conflict, offering frameworks for gender-sensitive peace-building in post-conflict societies.', volume: '1', file_url: null, external_url: null },
]

const typeStyle = {
  journal:    { bg: 'rgba(201,168,76,0.1)',   color: 'var(--gold)',       border: 'rgba(201,168,76,0.2)' },
  newsletter: { bg: 'rgba(59,130,246,0.1)',   color: '#60a5fa',       border: 'rgba(59,130,246,0.2)' },
  monograph:  { bg: 'rgba(168,85,247,0.1)',   color: '#c084fc',       border: 'rgba(168,85,247,0.2)' },
  publication:{ bg: 'rgba(34,197,94,0.1)',    color: '#4ade80',       border: 'rgba(34,197,94,0.2)' },
}

function PublicationCard({ pub }) {
  const ts = typeStyle[pub.type] || typeStyle.publication
  return (
    <div className="card-dark hover-lift" style={{ padding: 28, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
        <span className="font-display" style={{ fontSize: 10, fontWeight: 700, padding: '6px 12px', borderRadius: 999, textTransform: 'capitalize', letterSpacing: '0.1em', border: `1px solid ${ts.border}`, background: ts.bg, color: ts.color }}>
          {pub.type}
        </span>
        {pub.volume && <span className="font-display" style={{ color: 'var(--text-faint)', fontSize: 12 }}>Vol. {pub.volume}</span>}
      </div>

      <h3 className="font-display" style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 17, lineHeight: 1.4, marginBottom: 12, flex: 1 }}>{pub.title}</h3>

      {pub.authors && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: 12, marginBottom: 8, fontFamily: 'Syne, sans-serif' }}>
          <User size={11} /> <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pub.authors}</span>
        </div>
      )}
      {pub.publish_date && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-faint)', fontSize: 12, marginBottom: 16, fontFamily: 'Syne, sans-serif' }}>
          <Calendar size={11} />
          <span>{new Date(pub.publish_date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long' })}</span>
        </div>
      )}
      {pub.abstract && (
        <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 20, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {pub.abstract}
        </p>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: 'auto' }}>
        {pub.file_url && (
          <a href={pub.file_url} target="_blank" rel="noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'var(--gold)', fontFamily: 'Syne, sans-serif', fontWeight: 500, textDecoration: 'none' }}>
            <Download size={13} /> Download
          </a>
        )}
        {pub.external_url && (
          <a href={pub.external_url} target="_blank" rel="noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'var(--text-muted)', fontFamily: 'Syne, sans-serif', textDecoration: 'none' }}>
            <ExternalLink size={13} /> View Online
          </a>
        )}
        {!pub.file_url && !pub.external_url && (
          <span className="font-display" style={{ color: 'var(--text-faint)', fontSize: 12 }}>No download available</span>
        )}
      </div>
    </div>
  )
}

export default function PublicationsPage() {
  const { type } = useParams()
  const config = pageConfig[type] || pageConfig.all
  const Icon = config.icon

  const [publications, setPublications] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  async function fetchPublications() {
    setLoading(true)
    try {
      let query = supabase.from('publications').select('*').order('publish_date', { ascending: false })
      if (config.type) query = query.eq('type', config.type)
      const { data, error } = await query
      if (error || !data?.length) {
        setPublications(config.type ? sampleData.filter(p => p.type === config.type) : sampleData)
      } else {
        setPublications(data)
      }
    } catch {
      setPublications(config.type ? sampleData.filter(p => p.type === config.type) : sampleData)
    }
    setLoading(false)
  }

  useEffect(() => { fetchPublications() }, [type]) // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = publications.filter(pub => {
    const matchSearch = !search || pub.title?.toLowerCase().includes(search.toLowerCase()) || pub.authors?.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || pub.type === filter
    return matchSearch && matchFilter
  })

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      {/* Header */}
      <div style={{ paddingTop: 144, paddingBottom: 64, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <p className="section-label" style={{ marginBottom: 24 }}>Research</p>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-nav)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon size={22} style={{ color: 'var(--gold)' }} />
            </div>
            <div>
              <h1 className="font-display" style={{ fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1, fontSize: 'clamp(36px, 6vw, 72px)' }}>{config.title}</h1>
              <p style={{ color: 'var(--text-secondary)', marginTop: 8, fontSize: 18 }}>{config.subtitle}</p>
            </div>
          </div>

          {type === 'all' && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 32 }}>
              {['all', 'journal', 'newsletter', 'monograph'].map(t => (
                <button key={t} onClick={() => setFilter(t)} className="font-display"
                  style={{ padding: '8px 20px', borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s', border: 'none',
                    background: filter === t ? '#C9A84C' : 'rgba(255,255,255,0.05)',
                    color: filter === t ? '#0D0D0D' : 'rgba(255,255,255,0.4)',
                    outline: filter !== t ? '1px solid rgba(255,255,255,0.1)' : 'none',
                  }}>
                  {t === 'all' ? 'All Types' : t}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Search */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-nav)', borderRadius: 12, padding: '12px 20px' }}>
          <Search size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
          <input type="text" placeholder="Search by title or author..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, background: 'transparent', color: 'var(--text-primary)', border: 'none', outline: 'none', fontSize: 14, fontFamily: 'Syne, sans-serif' }} />
          {search && <button onClick={() => setSearch('')} style={{ color: 'rgba(255,255,255,0.25)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontFamily: 'Syne, sans-serif' }}>Clear</button>}
        </div>
      </div>

      {/* Results */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 96px' }}>
        {loading ? (
          <div style={{ display: 'grid', gap: 20 }} className="pub-results-grid">
            {[1,2,3].map(i => <div key={i} className="card-dark" style={{ height: 256, opacity: 0.5 }} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '96px 0' }}>
            <p className="font-display" style={{ fontWeight: 700, color: 'var(--text-faint)', fontSize: 24 }}>No publications found.</p>
          </div>
        ) : (
          <>
            <p className="font-display" style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24 }}>
              {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            </p>
            <div style={{ display: 'grid', gap: 20 }} className="pub-results-grid">
              {filtered.map(pub => <PublicationCard key={pub.id} pub={pub} />)}
            </div>
          </>
        )}
      </div>

      <style>{`
        @media (min-width: 640px) { .pub-results-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (min-width: 1024px) { .pub-results-grid { grid-template-columns: repeat(3, 1fr) !important; } }
      `}</style>
    </div>
  )
}
