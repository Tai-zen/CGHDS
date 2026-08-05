import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--footer-bg)', borderTop: '1px solid var(--border-subtle)', paddingTop: 80, paddingBottom: 40, position: 'relative', overflow: 'hidden', transition: 'background 0.35s ease' }}>
      {/* Watermark */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden', height: 160, pointerEvents: 'none', userSelect: 'none' }}>
        <p className="font-display" style={{ fontWeight: 800, color: 'var(--border-subtle)', lineHeight: 1, whiteSpace: 'nowrap', fontSize: 'clamp(80px, 15vw, 180px)' }}>CGHDS</p>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        {/* Newsletter */}
        <div style={{ marginBottom: 64, paddingBottom: 64, borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'grid', gap: 40, alignItems: 'flex-end' }} className="footer-nl-grid">
            <div>
              <h2 className="font-display" style={{ fontWeight: 700, fontSize: 'clamp(32px, 5vw, 48px)', color: 'var(--text-primary)', marginBottom: 12 }}>
                Stay in <span className="font-serif text-gold" style={{ fontStyle: 'italic' }}>touch!</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, maxWidth: 320 }}>
                Get updates on new research, events, and developments from CGHDS, Redeemer's University.
              </p>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--border-nav)', paddingBottom: 12 }}>
                <input type="email" placeholder="your@email.com"
                  style={{ flex: 1, background: 'transparent', color: 'var(--text-primary)', border: 'none', outline: 'none', fontSize: 14, fontFamily: 'Syne, sans-serif' }} />
                <button style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex' }}>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Links grid */}
        <div className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <img src="/CGHDS_LOGO.png" alt="CGHDS Logo" style={{ width: 52, height: 52, objectFit: 'contain' }} />
              <div>
                <span className="font-display" style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 15, display: 'block' }}>CGHDS</span>
                <span style={{ color: 'var(--text-muted)', fontSize: 10, fontFamily: 'Syne, sans-serif', letterSpacing: '0.05em' }}>Redeemer's University</span>
              </div>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: 12, lineHeight: 1.7 }}>
              Centre for Gender, Humanitarian and Development Studies — Redeemer's University, Nigeria.
            </p>
          </div>

          <div>
            <p className="section-label" style={{ marginBottom: 20 }}>Quick Links</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[['Home','/'],['About','/about'],['Programmes','/programmes'],['Events','/events'],['Gallery','/gallery'],['Contact','/contact']].map(([l,p]) => (
                <li key={p}><Link to={p} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 14, fontFamily: 'Syne, sans-serif', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>{l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="section-label" style={{ marginBottom: 20 }}>People</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[['Current Executives','/staff/executives'],['Current Staff','/staff/current'],['Past Executives','/staff/past-executives'],['Past Staff','/staff/past']].map(([l,p]) => (
                <li key={p}><Link to={p} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 14, fontFamily: 'Syne, sans-serif' }}
                  onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>{l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="section-label" style={{ marginBottom: 20 }}>Contact</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>Redeemer's University,<br />P.M.B. 230, Ede,<br />Osun State, Nigeria.</li>
              <li><a href="tel:+2348052236377" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 14 }}>+234 805 223 6377</a></li>
              <li><a href="mailto:cghds@run.edu.ng" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 14 }}>cghds@run.edu.ng</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 16, color: 'var(--text-faint)', fontSize: 12, fontFamily: 'Syne, sans-serif', paddingTop: 24, borderTop: '1px solid var(--border-subtle)', marginTop: 48 }}>
          <p>© {new Date().getFullYear()} CGHDS, Redeemer's University. All rights reserved.</p>
          <Link to="/admin" style={{ color: 'var(--text-faint)', textDecoration: 'none' }}>Admin Portal</Link>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .footer-nl-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
