import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { X, ZoomIn, Images } from 'lucide-react'

export default function GalleryPage() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [lightbox, setLightbox] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    supabase.from('gallery').select('*').order('created_at', { ascending: false })
      .then(({ data }) => { setImages(data || []); setLoading(false) })
  }, [])

  const categories = ['all', ...new Set(images.map(i => i.category).filter(Boolean))]
  const filtered = filter === 'all' ? images : images.filter(i => i.category === filter)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', paddingTop: 120 }}>
      {/* Header */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(201,168,76,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Images size={20} style={{ color: 'var(--gold)' }} />
          </div>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: 11, fontFamily: 'Syne, sans-serif', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 2 }}>CGHDS</p>
            <h1 style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 5vw, 48px)', lineHeight: 1 }}>Photo Gallery</h1>
          </div>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15, maxWidth: 560, lineHeight: 1.7, fontFamily: 'Syne, sans-serif', marginBottom: 32 }}>
          A visual record of CGHDS events, conferences, lectures, and milestones.
        </p>

        {/* Filter pills */}
        {categories.length > 1 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)} style={{
                padding: '8px 20px', borderRadius: 999, border: 'none', cursor: 'pointer', fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: 12,
                textTransform: 'capitalize', transition: 'all 0.2s',
                background: filter === cat ? '#C9A84C' : 'rgba(255,255,255,0.06)',
                color: filter === cat ? '#0D0D0D' : 'rgba(255,255,255,0.5)',
              }}>
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 96px' }}>
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {[1,2,3,4,5,6].map(i => (
              <div key={i} style={{ height: 220, borderRadius: 16, background: 'rgba(255,255,255,0.04)' }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <Images size={48} style={{ color: 'rgba(255,255,255,0.08)', margin: '0 auto 20px', display: 'block' }} />
            <p style={{ color: 'var(--text-faint)', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 20 }}>No images yet.</p>
            <p style={{ color: 'rgba(255,255,255,0.1)', fontSize: 14, marginTop: 8 }}>Images can be added from the Admin Portal.</p>
          </div>
        ) : (
          <div style={{ columns: 'auto 280px', gap: 16 }}>
            {filtered.map((img, i) => (
              <div
                key={img.id}
                onClick={() => setLightbox(i)}
                style={{ breakInside: 'avoid', marginBottom: 16, borderRadius: 16, overflow: 'hidden', cursor: 'zoom-in', position: 'relative', display: 'block' }}
                onMouseEnter={e => { e.currentTarget.querySelector('.overlay').style.opacity = '1' }}
                onMouseLeave={e => { e.currentTarget.querySelector('.overlay').style.opacity = '0' }}
              >
                <img
                  src={img.image_url}
                  alt={img.caption || 'Gallery image'}
                  style={{ width: '100%', display: 'block', borderRadius: 16, transition: 'transform 0.4s ease' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.03)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
                <div className="overlay" style={{
                  position: 'absolute', inset: 0, borderRadius: 16,
                  background: 'rgba(13,13,13,0.7)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  opacity: 0, transition: 'opacity 0.3s ease'
                }}>
                  <ZoomIn size={28} style={{ color: 'var(--text-primary)', marginBottom: 8 }} />
                  {img.caption && <p style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'Syne, sans-serif', fontSize: 13, textAlign: 'center', padding: '0 16px' }}>{img.caption}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && filtered[lightbox] && (
        <div
          onClick={() => setLightbox(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
        >
          <button
            onClick={() => setLightbox(null)}
            style={{ position: 'absolute', top: 24, right: 24, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 999, padding: 10, cursor: 'pointer', color: 'var(--text-primary)' }}
          >
            <X size={20} />
          </button>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '90vh', textAlign: 'center' }}>
            <img
              src={filtered[lightbox].image_url}
              alt={filtered[lightbox].caption}
              style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: 16 }}
            />
            {filtered[lightbox].caption && (
              <p style={{ color: 'var(--text-nav)', fontFamily: 'Syne, sans-serif', fontSize: 14, marginTop: 16 }}>{filtered[lightbox].caption}</p>
            )}
          </div>
          {lightbox > 0 && (
            <button onClick={e => { e.stopPropagation(); setLightbox(lightbox - 1) }}
              style={{ position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 999, padding: '12px 16px', cursor: 'pointer', color: 'var(--text-primary)', fontSize: 20 }}>
              ‹
            </button>
          )}
          {lightbox < filtered.length - 1 && (
            <button onClick={e => { e.stopPropagation(); setLightbox(lightbox + 1) }}
              style={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 999, padding: '12px 16px', cursor: 'pointer', color: 'var(--text-primary)', fontSize: 20 }}>
              ›
            </button>
          )}
        </div>
      )}
    </div>
  )
}
