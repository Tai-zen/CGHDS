import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { supabase, uploadImage } from '../lib/supabase'
import { LogOut, Plus, Trash2, Edit3, Save, X, BookOpen, Newspaper, BookMarked, GraduationCap, BarChart2, CheckCircle, AlertCircle, ArrowUpRight, Images, Users, Sun, Moon, Calendar, FileText } from 'lucide-react'

const ADMIN_EMAIL = 'admin@cghds.run.edu.ng'
const ADMIN_PASSWORD = 'CGHDS@Admin2025!'

const typeOptions = [
  { value: 'journal', label: 'Journal', icon: BookOpen },
  { value: 'newsletter', label: 'Newsletter', icon: Newspaper },
  { value: 'monograph', label: 'Monograph', icon: BookMarked },
  { value: 'publication', label: 'Publication', icon: GraduationCap },
]

const staffCategoryOptions = [
  { value: 'current_executive', label: 'Current Executive' },
  { value: 'current_staff', label: 'Current Staff' },
  { value: 'past_executive', label: 'Past Executive' },
  { value: 'past_staff', label: 'Past Staff' },
]

function Toast({ message, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t) }, [])
  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
      display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderRadius: 16,
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)', fontSize: 14, fontFamily: 'Syne, sans-serif', fontWeight: 600,
      background: type === 'success' ? '#C9A84C' : '#ef4444', color: type === 'success' ? '#0D0D0D' : '#fff'
    }}>
      {type === 'success' ? <CheckCircle size={15} /> : <AlertCircle size={15} />}
      {message}
    </div>
  )
}

function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signIn } = useAuth()

  const handle = async (e) => {
    e.preventDefault(); setLoading(true); setError('')
    const { error } = await signIn(email, password)
    if (error) {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) onLogin()
      else setError('Invalid credentials.')
    } else { onLogin() }
    setLoading(false)
  }

  const inp = { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '12px 16px', color: '#fff', fontSize: 14, fontFamily: 'Syne, sans-serif', outline: 'none', boxSizing: 'border-box' }

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D0D', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <img src="/CGHDS_LOGO.png" alt="CGHDS" style={{ width: 72, height: 72, objectFit: 'contain', margin: '0 auto 20px', display: 'block' }} />
          <h1 style={{ color: '#fff', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 28 }}>Admin Portal</h1>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, marginTop: 6, fontFamily: 'Syne, sans-serif' }}>CGHDS Website Management</p>
        </div>
        <form onSubmit={handle} style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 32, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <label style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'Syne, sans-serif', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@cghds.run.edu.ng" required style={inp} />
          </div>
          <div>
            <label style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'Syne, sans-serif', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••••" required style={inp} />
          </div>
          {error && <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', fontSize: 13, padding: '12px 16px', borderRadius: 12, fontFamily: 'Syne, sans-serif' }}><AlertCircle size={14} />{error}</div>}
          <button type="submit" disabled={loading} style={{ background: '#C9A84C', color: '#0D0D0D', border: 'none', borderRadius: 12, padding: '14px', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, cursor: 'pointer', opacity: loading ? 0.6 : 1 }}>
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12, padding: 16 }}>
            <p style={{ color: '#C9A84C', fontSize: 10, fontFamily: 'Syne, sans-serif', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>Default Credentials</p>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, fontFamily: 'monospace' }}>{ADMIN_EMAIL}</p>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, fontFamily: 'monospace' }}>{ADMIN_PASSWORD}</p>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── Publication Form ───
const emptyPub = { title: '', type: 'journal', authors: '', abstract: '', publish_date: '', volume: '', file_url: '', external_url: '' }
function PubForm({ initial, onSave, onCancel, loading }) {
  const [form, setForm] = useState(initial || emptyPub)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const inp = { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '12px 16px', color: '#fff', fontSize: 14, fontFamily: 'Syne, sans-serif', outline: 'none', boxSizing: 'border-box' }

  return (
    <div style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 32, marginBottom: 24 }}>
      <h3 style={{ color: '#fff', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18, marginBottom: 24 }}>{initial?.id ? 'Edit Publication' : 'New Publication'}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ gridColumn: '1/-1' }}>
          <label style={{ color: 'var(--text-muted)', fontSize: 11, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>Title *</label>
          <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="Publication title..." style={inp} />
        </div>
        <div>
          <label style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>Type</label>
          <select value={form.type} onChange={e => set('type', e.target.value)} style={{ ...inp, appearance: 'none' }}>
            {typeOptions.map(t => <option key={t.value} value={t.value} style={{ background: '#161616' }}>{t.label}</option>)}
          </select>
        </div>
        <div>
          <label style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>Authors</label>
          <input value={form.authors} onChange={e => set('authors', e.target.value)} placeholder="Prof. O.I. Aina..." style={inp} />
        </div>
        <div>
          <label style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>Publish Date</label>
          <input type="date" value={form.publish_date} onChange={e => set('publish_date', e.target.value)} style={inp} />
        </div>
        <div style={{ gridColumn: '1/-1' }}>
          <label style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>Abstract</label>
          <textarea value={form.abstract} onChange={e => set('abstract', e.target.value)} rows={3} placeholder="Brief description..." style={{ ...inp, resize: 'none' }} />
        </div>
        <div>
          <label style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>File URL (PDF)</label>
          <input value={form.file_url} onChange={e => set('file_url', e.target.value)} placeholder="https://..." style={inp} />
        </div>
        <div>
          <label style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>External URL</label>
          <input value={form.external_url} onChange={e => set('external_url', e.target.value)} placeholder="https://..." style={inp} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <button onClick={() => onSave(form)} disabled={loading || !form.title} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#C9A84C', color: '#0D0D0D', border: 'none', borderRadius: 12, padding: '10px 24px', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, cursor: 'pointer', opacity: loading || !form.title ? 0.5 : 1 }}>
          <Save size={13} />{loading ? 'Saving...' : 'Save'}
        </button>
        <button onClick={onCancel} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', border: 'none', borderRadius: 12, padding: '10px 24px', fontFamily: 'Syne, sans-serif', fontSize: 13, cursor: 'pointer' }}>
          <X size={13} />Cancel
        </button>
      </div>
    </div>
  )
}

// ─── Staff Form ───
const emptyStaff = { name: '', role: '', category: 'current_executive', photo_url: '', tenure: '', achievements: '', sort_order: 0 }
function StaffForm({ initial, onSave, onCancel, loading }) {
  const [form, setForm] = useState(initial || emptyStaff)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const inp = { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '12px 16px', color: '#fff', fontSize: 14, fontFamily: 'Syne, sans-serif', outline: 'none', boxSizing: 'border-box' }

  const handleFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true); setUploadError('')
    try {
      const url = await uploadImage(file, 'staff')
      set('photo_url', url)
    } catch (err) {
      setUploadError(err.message || 'Upload failed')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  return (
    <div style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 32, marginBottom: 24 }}>
      <h3 style={{ color: '#fff', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18, marginBottom: 24 }}>{initial?.id ? 'Edit Member' : 'Add Member'}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>Full Name *</label>
          <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Prof. O.I. Aina" style={inp} />
        </div>
        <div>
          <label style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>Role / Title *</label>
          <input value={form.role} onChange={e => set('role', e.target.value)} placeholder="Director, Lecturer..." style={inp} />
        </div>
        <div>
          <label style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>Category *</label>
          <select value={form.category} onChange={e => set('category', e.target.value)} style={{ ...inp, appearance: 'none' }}>
            {staffCategoryOptions.map(c => <option key={c.value} value={c.value} style={{ background: '#161616' }}>{c.label}</option>)}
          </select>
        </div>
        <div>
          <label style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>Tenure (e.g. 2020–2023)</label>
          <input value={form.tenure} onChange={e => set('tenure', e.target.value)} placeholder="2020–2023" style={inp} />
        </div>
        <div style={{ gridColumn: '1/-1' }}>
          <label style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>Photo</label>
          <input type="file" accept="image/*" onChange={handleFile} disabled={uploading} style={inp} />
          {uploading && <p style={{ color: '#C9A84C', fontSize: 12, marginTop: 6, fontFamily: 'Syne, sans-serif' }}>Uploading…</p>}
          {uploadError && <p style={{ color: '#f87171', fontSize: 12, marginTop: 6, fontFamily: 'Syne, sans-serif' }}>{uploadError}</p>}
          {form.photo_url && (
            <img src={form.photo_url} alt="Preview" style={{ marginTop: 10, height: 80, width: 80, objectFit: 'cover', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)' }} onError={e => e.target.style.display = 'none'} />
          )}
        </div>
        <div style={{ gridColumn: '1/-1' }}>
          <label style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>Achievements (shown on hover)</label>
          <textarea value={form.achievements} onChange={e => set('achievements', e.target.value)} rows={3} placeholder="Key contributions during their tenure..." style={{ ...inp, resize: 'none' }} />
        </div>
        <div>
          <label style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>Sort Order</label>
          <input type="number" value={form.sort_order} onChange={e => set('sort_order', parseInt(e.target.value) || 0)} style={inp} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <button onClick={() => onSave(form)} disabled={loading || !form.name || !form.role} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#C9A84C', color: '#0D0D0D', border: 'none', borderRadius: 12, padding: '10px 24px', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, cursor: 'pointer', opacity: loading || !form.name || !form.role ? 0.5 : 1 }}>
          <Save size={13} />{loading ? 'Saving...' : 'Save'}
        </button>
        <button onClick={onCancel} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', border: 'none', borderRadius: 12, padding: '10px 24px', fontFamily: 'Syne, sans-serif', fontSize: 13, cursor: 'pointer' }}>
          <X size={13} />Cancel
        </button>
      </div>
    </div>
  )
}

// ─── Gallery Form ───
const emptyGallery = { image_url: '', caption: '', category: '' }
function GalleryForm({ initial, onSave, onCancel, loading }) {
  const [form, setForm] = useState(initial || emptyGallery)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const inp = { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '12px 16px', color: '#fff', fontSize: 14, fontFamily: 'Syne, sans-serif', outline: 'none', boxSizing: 'border-box' }

  const handleFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true); setUploadError('')
    try {
      const url = await uploadImage(file, 'gallery')
      set('image_url', url)
    } catch (err) {
      setUploadError(err.message || 'Upload failed')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  return (
    <div style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 32, marginBottom: 24 }}>
      <h3 style={{ color: '#fff', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18, marginBottom: 24 }}>{initial?.id ? 'Edit Image' : 'Add Image'}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>Upload Image *</label>
          <input type="file" accept="image/*" onChange={handleFile} disabled={uploading} style={inp} />
          {uploading && <p style={{ color: '#C9A84C', fontSize: 12, marginTop: 6, fontFamily: 'Syne, sans-serif' }}>Uploading…</p>}
          {uploadError && <p style={{ color: '#f87171', fontSize: 12, marginTop: 6, fontFamily: 'Syne, sans-serif' }}>{uploadError}</p>}
          {form.image_url && (
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, marginTop: 8, fontFamily: 'monospace', wordBreak: 'break-all' }}>{form.image_url}</p>
          )}
        </div>
        {form.image_url && (
          <img src={form.image_url} alt="Preview" style={{ maxHeight: 200, objectFit: 'cover', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)' }} onError={e => e.target.style.display = 'none'} />
        )}
        <div>
          <label style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>Caption</label>
          <input value={form.caption} onChange={e => set('caption', e.target.value)} placeholder="Brief description of the image..." style={inp} />
        </div>
        <div>
          <label style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>Category (for filtering)</label>
          <input value={form.category} onChange={e => set('category', e.target.value)} placeholder="e.g. conference, lecture, ceremony" style={inp} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <button onClick={() => onSave(form)} disabled={loading || uploading || !form.image_url} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#C9A84C', color: '#0D0D0D', border: 'none', borderRadius: 12, padding: '10px 24px', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, cursor: 'pointer', opacity: loading || uploading || !form.image_url ? 0.5 : 1 }}>
          <Save size={13} />{loading ? 'Saving...' : 'Save'}
        </button>
        <button onClick={onCancel} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', border: 'none', borderRadius: 12, padding: '10px 24px', fontFamily: 'Syne, sans-serif', fontSize: 13, cursor: 'pointer' }}>
          <X size={13} />Cancel
        </button>
      </div>
    </div>
  )
}

// ─── Upcoming Event Form ───
const emptyEvent = { title: '', subtitle: '', event_date: '', link: '' }
function UpcomingEventForm({ initial, onSave, onCancel, loading }) {
  const [form, setForm] = useState(initial || emptyEvent)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const inp = { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '12px 16px', color: '#fff', fontSize: 14, fontFamily: 'Syne, sans-serif', outline: 'none', boxSizing: 'border-box' }
  return (
    <div style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 32, marginBottom: 24 }}>
      <h3 style={{ color: '#fff', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18, marginBottom: 24 }}>{initial?.id ? 'Edit Event' : 'Add Upcoming Event'}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>Event Title * <span style={{ color: 'rgba(255,255,255,0.2)', textTransform: 'none' }}>(shown in badge + banner)</span></label>
          <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. 2026 International Conference — Now Open" style={inp} />
        </div>
        <div>
          <label style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>Subtitle <span style={{ color: 'rgba(255,255,255,0.2)', textTransform: 'none' }}>(optional — shown under title in banner)</span></label>
          <input value={form.subtitle} onChange={e => set('subtitle', e.target.value)} placeholder='e.g. "Recent Advances in Gender, Humanitarianism and Development"' style={inp} />
        </div>
        <div>
          <label style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>Date / Date Range <span style={{ color: 'rgba(255,255,255,0.2)', textTransform: 'none' }}>(optional — shown in gold)</span></label>
          <input value={form.event_date} onChange={e => set('event_date', e.target.value)} placeholder="e.g. November 10th–14th, 2026" style={inp} />
        </div>
        <div>
          <label style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>Internal Link <span style={{ color: 'rgba(255,255,255,0.2)', textTransform: 'none' }}>(optional — route like /events/2025-international-conference)</span></label>
          <input value={form.link} onChange={e => set('link', e.target.value)} placeholder="/events/..." style={inp} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <button onClick={() => onSave(form)} disabled={loading || !form.title} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#C9A84C', color: '#0D0D0D', border: 'none', borderRadius: 12, padding: '10px 24px', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, cursor: 'pointer', opacity: loading || !form.title ? 0.5 : 1 }}>
          <Save size={13} />{loading ? 'Saving...' : 'Save Event'}
        </button>
        <button onClick={onCancel} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', border: 'none', borderRadius: 12, padding: '10px 24px', fontFamily: 'Syne, sans-serif', fontSize: 13, cursor: 'pointer' }}>
          <X size={13} />Cancel
        </button>
      </div>
    </div>
  )
}

// ─── Site Event Form (for the /events page) ───
const tagOptions = ['CONFERENCE', 'WORKSHOP', 'LECTURE', 'COMMEMORATION', 'SEMINAR', 'OTHER']
const emptyEventCard = { tag: 'CONFERENCE', date: '', title: '', description: '', img: '', link: '', internal: false }
function EventCardForm({ initial, onSave, onCancel, loading }) {
  const [form, setForm] = useState(initial ? { ...initial, description: initial.desc ?? '' } : emptyEventCard)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const inp = { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '12px 16px', color: '#fff', fontSize: 14, fontFamily: 'Syne, sans-serif', outline: 'none', boxSizing: 'border-box' }

  const handleFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true); setUploadError('')
    try {
      const url = await uploadImage(file, 'events')
      set('img', url)
    } catch (err) {
      setUploadError(err.message || 'Upload failed')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }
  return (
    <div style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 32, marginBottom: 24 }}>
      <h3 style={{ color: '#fff', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18, marginBottom: 24 }}>{initial?.id ? 'Edit Event' : 'Add Event'}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ gridColumn: '1/-1' }}>
          <label style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>Title *</label>
          <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. 2026 CGHDS International Conference" style={inp} />
        </div>
        <div>
          <label style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>Tag / Type</label>
          <select value={form.tag} onChange={e => set('tag', e.target.value)} style={{ ...inp, appearance: 'none' }}>
            {tagOptions.map(t => <option key={t} value={t} style={{ background: '#161616' }}>{t}</option>)}
          </select>
        </div>
        <div>
          <label style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>Date</label>
          <input value={form.date} onChange={e => set('date', e.target.value)} placeholder="e.g. November 10–14, 2026" style={inp} />
        </div>
        <div style={{ gridColumn: '1/-1' }}>
          <label style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>Description</label>
          <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} placeholder="Brief description of the event..." style={{ ...inp, resize: 'none' }} />
        </div>
        <div style={{ gridColumn: '1/-1' }}>
          <label style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>Image</label>
          <input type="file" accept="image/*" onChange={handleFile} disabled={uploading} style={inp} />
          {uploading && <p style={{ color: '#C9A84C', fontSize: 12, marginTop: 6, fontFamily: 'Syne, sans-serif' }}>Uploading…</p>}
          {uploadError && <p style={{ color: '#f87171', fontSize: 12, marginTop: 6, fontFamily: 'Syne, sans-serif' }}>{uploadError}</p>}
        </div>
        {form.img && (
          <div style={{ gridColumn: '1/-1' }}>
            <img src={form.img} alt="Preview" style={{ maxHeight: 160, objectFit: 'cover', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', width: '100%' }} onError={e => e.target.style.display = 'none'} />
          </div>
        )}
        <div>
          <label style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>Link</label>
          <input value={form.link} onChange={e => set('link', e.target.value)} placeholder="/events/... or https://..." style={inp} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 20 }}>
          <input type="checkbox" id="internalCheck" checked={form.internal} onChange={e => set('internal', e.target.checked)} style={{ width: 16, height: 16, accentColor: '#C9A84C', cursor: 'pointer' }} />
          <label htmlFor="internalCheck" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontFamily: 'Syne, sans-serif', cursor: 'pointer' }}>Internal link (shows "View Details" arrow)</label>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <button onClick={() => onSave(form)} disabled={loading || !form.title} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#C9A84C', color: '#0D0D0D', border: 'none', borderRadius: 12, padding: '10px 24px', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, cursor: 'pointer', opacity: loading || !form.title ? 0.5 : 1 }}>
          <Save size={13} />{loading ? 'Saving...' : 'Save Event'}
        </button>
        <button onClick={onCancel} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', border: 'none', borderRadius: 12, padding: '10px 24px', fontFamily: 'Syne, sans-serif', fontSize: 13, cursor: 'pointer' }}>
          <X size={13} />Cancel
        </button>
      </div>
    </div>
  )
}
export default function AdminPage() {
  const { user, signOut } = useAuth()
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'
  const [localAuth, setLocalAuth] = useState(false)
  const [publications, setPublications] = useState([])
  const [staffMembers, setStaffMembers] = useState([])
  const [galleryImages, setGalleryImages] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [siteEvents, setSiteEvents] = useState([])
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [activeTab, setActiveTab] = useState('publications')
  const [toast, setToast] = useState(null)

  const isLoggedIn = user || localAuth

  const showToast = (msg, type = 'success') => setToast({ message: msg, type })

  async function fetchPublications() {
    const { data } = await supabase.from('publications').select('*').order('created_at', { ascending: false })
    setPublications(data || [])
  }
  async function fetchStaff() {
    const { data } = await supabase.from('staff').select('*').order('sort_order', { ascending: true })
    setStaffMembers(data || [])
  }
  async function fetchGallery() {
    const { data } = await supabase.from('gallery').select('*').order('created_at', { ascending: false })
    setGalleryImages(data || [])
  }
  async function fetchUpcomingEvents() {
    const { data } = await supabase.from('upcoming_events').select('*').order('event_date', { ascending: true })
    setUpcomingEvents(data || [])
  }
  async function fetchSiteEvents() {
    const { data } = await supabase.from('events').select('*').order('created_at', { ascending: false })
    setSiteEvents(data || [])
  }

  useEffect(() => {
    if (isLoggedIn) {
      fetchPublications()
      fetchStaff()
      fetchGallery()
      fetchUpcomingEvents()
      fetchSiteEvents()
    }
  }, [isLoggedIn]) // eslint-disable-line react-hooks/exhaustive-deps

  // Upcoming Events CRUD (max 1 event allowed)
  const saveUpcomingEvent = async (form) => {
    // If adding new and one already exists, block it
    if (!form.id && upcomingEvents.length >= 1) {
      showToast('Delete the existing upcoming event first before adding a new one.', 'error')
      return
    }
    setSaving(true)
    const payload = { title: form.title, subtitle: form.subtitle || null, event_date: form.event_date || null, link: form.link || null }
    let error
    if (form.id) { const r = await supabase.from('upcoming_events').update(payload).eq('id', form.id); error = r.error }
    else { const r = await supabase.from('upcoming_events').insert([payload]); error = r.error }
    if (error) showToast('Error saving event. Check Supabase config.', 'error')
    else { showToast(form.id ? 'Event updated!' : 'Event added! Now visible on homepage.'); setShowForm(false); setEditItem(null); fetchUpcomingEvents() }
    setSaving(false)
  }
  const deleteUpcomingEvent = async (id) => {
    if (!confirm('Remove this upcoming event from the homepage?')) return
    const { error } = await supabase.from('upcoming_events').delete().eq('id', id)
    if (error) showToast('Error removing event.', 'error')
    else { showToast('Event removed.'); fetchUpcomingEvents() }
  }

  // Site Events CRUD
  const saveSiteEvent = async (form) => {
    setSaving(true)
    const payload = { tag: form.tag, date: form.date || null, title: form.title, desc: form.description || null, img: form.img || null, link: form.link || null, internal: form.internal || false }
    let error
    if (form.id) { const r = await supabase.from('events').update(payload).eq('id', form.id); error = r.error }
    else { const r = await supabase.from('events').insert([payload]); error = r.error }
    if (error) showToast('Error saving event. Check Supabase config.', 'error')
    else { showToast(form.id ? 'Event updated!' : 'Event added to the Events page!'); setShowForm(false); setEditItem(null); fetchSiteEvents() }
    setSaving(false)
  }
  const deleteSiteEvent = async (id) => {
    if (!confirm('Delete this event from the Events page?')) return
    const { error } = await supabase.from('events').delete().eq('id', id)
    if (error) showToast('Error deleting event.', 'error')
    else { showToast('Event deleted.'); fetchSiteEvents() }
  }

  // Publications CRUD
  const savePublication = async (form) => {
    setSaving(true)
    const payload = { ...form }
    if (!payload.publish_date) delete payload.publish_date
    let error
    if (form.id) { const r = await supabase.from('publications').update(payload).eq('id', form.id); error = r.error }
    else { const r = await supabase.from('publications').insert([payload]); error = r.error }
    if (error) showToast('Error saving. Check Supabase config.', 'error')
    else { showToast(form.id ? 'Updated!' : 'Publication added!'); setShowForm(false); setEditItem(null); fetchPublications() }
    setSaving(false)
  }
  const deletePub = async (id) => {
    if (!confirm('Delete this publication?')) return
    const { error } = await supabase.from('publications').delete().eq('id', id)
    if (error) showToast('Error deleting.', 'error')
    else { showToast('Deleted.'); fetchPublications() }
  }

  // Staff CRUD
  const saveStaff = async (form) => {
    setSaving(true)
    let error
    if (form.id) { const r = await supabase.from('staff').update(form).eq('id', form.id); error = r.error }
    else { const r = await supabase.from('staff').insert([form]); error = r.error }
    if (error) showToast('Error saving staff.', 'error')
    else { showToast(form.id ? 'Updated!' : 'Member added!'); setShowForm(false); setEditItem(null); fetchStaff() }
    setSaving(false)
  }
  const deleteStaff = async (id) => {
    if (!confirm('Delete this member?')) return
    const { error } = await supabase.from('staff').delete().eq('id', id)
    if (error) showToast('Error deleting.', 'error')
    else { showToast('Deleted.'); fetchStaff() }
  }

  // Gallery CRUD
  const saveGallery = async (form) => {
    setSaving(true)
    let error
    if (form.id) { const r = await supabase.from('gallery').update(form).eq('id', form.id); error = r.error }
    else { const r = await supabase.from('gallery').insert([form]); error = r.error }
    if (error) showToast('Error saving image.', 'error')
    else { showToast(form.id ? 'Updated!' : 'Image added!'); setShowForm(false); setEditItem(null); fetchGallery() }
    setSaving(false)
  }
  const deleteGallery = async (id) => {
    if (!confirm('Remove this image?')) return
    const { error } = await supabase.from('gallery').delete().eq('id', id)
    if (error) showToast('Error deleting.', 'error')
    else { showToast('Removed.'); fetchGallery() }
  }

  const sidebarItems = [
    { id: 'upcoming', label: 'Upcoming Events', icon: Calendar },
    { id: 'events', label: 'Events', icon: FileText },
    { id: 'publications', label: 'Publications', icon: BookOpen },
    { id: 'staff', label: 'Staff & Executives', icon: Users },
    { id: 'gallery', label: 'Gallery', icon: Images },
    { id: 'stats', label: 'Overview', icon: BarChart2 },
  ]

  if (!isLoggedIn) return <LoginScreen onLogin={() => setLocalAuth(true)} />

  const rowStyle = { background: 'var(--bg-surface)', border: '1px solid var(--border-card)', borderRadius: 16, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }
  const iconBoxStyle = (color) => ({ width: 36, height: 36, borderRadius: 10, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 })

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', transition: 'background 0.35s ease' }}>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* Sidebar */}
      <aside style={{ width: 240, minHeight: '100vh', background: 'var(--bg-surface)', borderRight: '1px solid var(--border-subtle)', position: 'fixed', top: 0, left: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="/CGHDS_LOGO.png" alt="CGHDS" style={{ width: 36, height: 36, objectFit: 'contain' }} />
            <div>
              <p style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14 }}>CGHDS</p>
              <p style={{ color: 'var(--text-muted)', fontSize: 9, fontFamily: 'Syne, sans-serif', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Admin Panel</p>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {sidebarItems.map(item => {
            const Icon = item.icon
            return (
              <button key={item.id} onClick={() => { setActiveTab(item.id); setShowForm(false); setEditItem(null) }}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 12, fontSize: 13, fontFamily: 'Syne, sans-serif', fontWeight: 600, border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', background: activeTab === item.id ? 'var(--gold-bg)' : 'transparent', color: activeTab === item.id ? 'var(--gold)' : 'var(--text-muted)' }}>
                <Icon size={14} />{item.label}
              </button>
            )
          })}
          <div style={{ paddingTop: 12, borderTop: '1px solid var(--border-subtle)', marginTop: 8 }}>
            <a href="/" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 12, fontSize: 13, fontFamily: 'Syne, sans-serif', fontWeight: 600, color: 'var(--text-muted)', textDecoration: 'none' }}>
              <ArrowUpRight size={14} />View Site
            </a>
          </div>
        </nav>

        <div style={{ padding: 16, borderTop: '1px solid var(--border-subtle)' }}>
          {/* Theme toggle */}
          <button onClick={toggle}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 12, color: 'var(--gold)', fontFamily: 'Syne, sans-serif', fontSize: 13, background: 'var(--gold-bg)', border: '1px solid var(--border-gold-dim)', cursor: 'pointer', marginBottom: 8, fontWeight: 600 }}>
            {isDark ? <Sun size={13} /> : <Moon size={13} />}
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>
          <p style={{ color: 'var(--text-faint)', fontSize: 10, fontFamily: 'Syne, sans-serif', padding: '0 14px', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email || ADMIN_EMAIL}</p>
          <button onClick={() => { signOut(); setLocalAuth(false) }}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 12, color: 'var(--text-muted)', fontFamily: 'Syne, sans-serif', fontSize: 13, background: 'none', border: 'none', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.color = '#f87171'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
            <LogOut size={13} />Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ marginLeft: 240, flex: 1, padding: 40 }}>

        {/* ─── Upcoming Events Tab ─── */}
        {activeTab === 'upcoming' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 32, gap: 16 }}>
              <div>
                <h2 style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 28, marginBottom: 6 }}>Upcoming Events</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 13, fontFamily: 'Syne, sans-serif', maxWidth: 480 }}>The event listed here appears as the badge on the homepage hero and as a banner at the bottom. Only one upcoming event can be active at a time.</p>
              </div>
              <button
                onClick={() => {
                  if (upcomingEvents.length >= 1) {
                    showToast('Delete the existing upcoming event first before adding a new one.', 'error')
                    return
                  }
                  setEditItem(null); setShowForm(true)
                }}
                style={{ display: 'flex', alignItems: 'center', gap: 8, background: upcomingEvents.length >= 1 ? 'rgba(255,255,255,0.08)' : 'var(--gold)', color: upcomingEvents.length >= 1 ? 'rgba(255,255,255,0.3)' : (isDark ? '#0D0D0D' : '#fff'), border: 'none', borderRadius: 12, padding: '10px 20px', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, cursor: upcomingEvents.length >= 1 ? 'not-allowed' : 'pointer', flexShrink: 0 }}>
                <Plus size={14} />Add Event
              </button>
            </div>
            {showForm && <UpcomingEventForm initial={editItem} onSave={saveUpcomingEvent} onCancel={() => { setShowForm(false); setEditItem(null) }} loading={saving} />}
            {upcomingEvents.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <Calendar size={40} style={{ color: 'var(--text-faint)', margin: '0 auto 16px', display: 'block' }} />
                <p style={{ color: 'var(--text-muted)', fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No upcoming events.</p>
                <p style={{ color: 'var(--text-faint)', fontSize: 13, fontFamily: 'Syne, sans-serif' }}>The homepage badge will show "No upcoming events" until you add one here.</p>
              </div>
            ) : upcomingEvents.map(ev => (
              <div key={ev.id} style={rowStyle}>
                <div style={{ ...iconBoxStyle('#C9A84C'), flexShrink: 0 }}>
                  <Calendar size={14} style={{ color: 'var(--gold)' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ev.title}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: 12, fontFamily: 'Syne, sans-serif', marginTop: 2 }}>
                    {ev.event_date && <span style={{ color: 'var(--gold)' }}>{ev.event_date}</span>}
                    {ev.event_date && ev.link && ' · '}
                    {ev.link && <span>Link: {ev.link}</span>}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  <button onClick={() => { setEditItem(ev); setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={{ padding: 8, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-faint)', borderRadius: 8 }} onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-faint)'}><Edit3 size={14} /></button>
                  <button onClick={() => deleteUpcomingEvent(ev.id)} style={{ padding: 8, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-faint)', borderRadius: 8 }} onMouseEnter={e => e.currentTarget.style.color = '#f87171'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-faint)'}><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─── Events Tab (site /events page) ─── */}
        {activeTab === 'events' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
              <div>
                <h2 style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 28, marginBottom: 6 }}>Events</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 13, fontFamily: 'Syne, sans-serif', maxWidth: 480 }}>Events added here appear as cards on the public Events page. You can add as many as you like.</p>
              </div>
              <button onClick={() => { setEditItem(null); setShowForm(true) }} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--gold)', color: isDark ? '#0D0D0D' : '#fff', border: 'none', borderRadius: 12, padding: '10px 20px', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                <Plus size={14} />Add Event
              </button>
            </div>
            {showForm && <EventCardForm initial={editItem} onSave={saveSiteEvent} onCancel={() => { setShowForm(false); setEditItem(null) }} loading={saving} />}
            {siteEvents.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <FileText size={40} style={{ color: 'var(--text-faint)', margin: '0 auto 16px', display: 'block' }} />
                <p style={{ color: 'var(--text-muted)', fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No events yet.</p>
                <p style={{ color: 'var(--text-faint)', fontSize: 13, fontFamily: 'Syne, sans-serif' }}>Events you add here will appear on the public Events page.</p>
              </div>
            ) : siteEvents.map(ev => (
              <div key={ev.id} style={{ ...rowStyle, alignItems: 'flex-start', gap: 0, padding: 0, overflow: 'hidden' }}>
                {ev.img && (
                  <div style={{ width: 120, minHeight: 80, flexShrink: 0, overflow: 'hidden' }}>
                    <img src={ev.img} alt={ev.title} style={{ width: '100%', height: '100%', minHeight: 80, objectFit: 'cover', opacity: 0.75 }} onError={e => e.target.style.display = 'none'} />
                  </div>
                )}
                <div style={{ flex: 1, minWidth: 0, padding: '16px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ background: 'var(--gold-bg)', border: '1px solid var(--border-gold-dim)', color: 'var(--gold)', fontSize: 9, fontWeight: 700, padding: '3px 10px', borderRadius: 999, letterSpacing: '0.1em', fontFamily: 'Syne, sans-serif' }}>{ev.tag}</span>
                    {ev.date && <span style={{ color: 'var(--text-muted)', fontSize: 12, fontFamily: 'Syne, sans-serif' }}>{ev.date}</span>}
                  </div>
                  <p style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ev.title}</p>
                  {ev.desc && <p style={{ color: 'var(--text-muted)', fontSize: 12, fontFamily: 'Syne, sans-serif', marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ev.desc}</p>}
                </div>
                <div style={{ display: 'flex', gap: 4, padding: '16px 12px', flexShrink: 0 }}>
                  <button onClick={() => { setEditItem(ev); setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={{ padding: 8, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-faint)', borderRadius: 8 }} onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-faint)'}><Edit3 size={14} /></button>
                  <button onClick={() => deleteSiteEvent(ev.id)} style={{ padding: 8, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-faint)', borderRadius: 8 }} onMouseEnter={e => e.currentTarget.style.color = '#f87171'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-faint)'}><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─── Publications Tab ─── */}
        {activeTab === 'publications' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
              <h2 style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 28 }}>Publications</h2>
              <button onClick={() => { setEditItem(null); setShowForm(true) }} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--gold)', color: isDark ? '#0D0D0D' : '#fff', border: 'none', borderRadius: 12, padding: '10px 20px', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                <Plus size={14} />Add Publication
              </button>
            </div>
            {showForm && <PubForm initial={editItem} onSave={savePublication} onCancel={() => { setShowForm(false); setEditItem(null) }} loading={saving} />}
            {publications.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <BookOpen size={40} style={{ color: 'var(--text-faint)', margin: '0 auto 16px', display: 'block' }} />
                <p style={{ color: 'var(--text-muted)', fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700 }}>No publications yet.</p>
              </div>
            ) : publications.map(pub => (
              <div key={pub.id} style={rowStyle}>
                <div style={iconBoxStyle('#C9A84C')}>
                  {pub.type === 'journal' ? <BookOpen size={14} style={{ color: 'var(--gold)' }} /> : <GraduationCap size={14} style={{ color: 'var(--gold)' }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pub.title}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: 12, fontFamily: 'Syne, sans-serif', marginTop: 2 }}>{pub.type} {pub.authors && `· ${pub.authors}`}</p>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  <button onClick={() => { setEditItem(pub); setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={{ padding: 8, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-faint)', borderRadius: 8, transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-faint)'}><Edit3 size={14} /></button>
                  <button onClick={() => deletePub(pub.id)} style={{ padding: 8, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-faint)', borderRadius: 8, transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#f87171'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-faint)'}><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─── Staff Tab ─── */}
        {activeTab === 'staff' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
              <h2 style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 28 }}>Staff & Executives</h2>
              <button onClick={() => { setEditItem(null); setShowForm(true) }} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--gold)', color: isDark ? '#0D0D0D' : '#fff', border: 'none', borderRadius: 12, padding: '10px 20px', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                <Plus size={14} />Add Member
              </button>
            </div>
            {showForm && <StaffForm initial={editItem} onSave={saveStaff} onCancel={() => { setShowForm(false); setEditItem(null) }} loading={saving} />}
            {staffMembers.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <Users size={40} style={{ color: 'var(--text-faint)', margin: '0 auto 16px', display: 'block' }} />
                <p style={{ color: 'var(--text-muted)', fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700 }}>No staff added yet.</p>
              </div>
            ) : staffMembers.map(m => (
              <div key={m.id} style={rowStyle}>
                {m.photo_url ? (
                  <img src={m.photo_url} alt={m.name} style={{ width: 44, height: 44, borderRadius: 12, objectFit: 'cover', flexShrink: 0 }} onError={e => { e.target.style.display = 'none' }} />
                ) : (
                  <div style={{ ...iconBoxStyle('#C9A84C'), width: 44, height: 44 }}><Users size={16} style={{ color: 'var(--gold)' }} /></div>
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14 }}>{m.name}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: 12, fontFamily: 'Syne, sans-serif', marginTop: 2 }}>{m.role} · <span style={{ color: 'var(--gold)', fontSize: 11 }}>{staffCategoryOptions.find(c => c.value === m.category)?.label}</span></p>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  <button onClick={() => { setEditItem(m); setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={{ padding: 8, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-faint)', borderRadius: 8 }} onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-faint)'}><Edit3 size={14} /></button>
                  <button onClick={() => deleteStaff(m.id)} style={{ padding: 8, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-faint)', borderRadius: 8 }} onMouseEnter={e => e.currentTarget.style.color = '#f87171'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-faint)'}><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─── Gallery Tab ─── */}
        {activeTab === 'gallery' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
              <h2 style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 28 }}>Gallery</h2>
              <button onClick={() => { setEditItem(null); setShowForm(true) }} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--gold)', color: isDark ? '#0D0D0D' : '#fff', border: 'none', borderRadius: 12, padding: '10px 20px', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                <Plus size={14} />Add Image
              </button>
            </div>
            {showForm && <GalleryForm initial={editItem} onSave={saveGallery} onCancel={() => { setShowForm(false); setEditItem(null) }} loading={saving} />}
            {galleryImages.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <Images size={40} style={{ color: 'var(--text-faint)', margin: '0 auto 16px', display: 'block' }} />
                <p style={{ color: 'var(--text-muted)', fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700 }}>No images yet.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
                {galleryImages.map(img => (
                  <div key={img.id} style={{ borderRadius: 16, overflow: 'hidden', background: 'var(--bg-surface)', border: '1px solid var(--border-card)', position: 'relative' }}>
                    <img src={img.image_url} alt={img.caption || ''} style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} onError={e => { e.target.style.background = '#222'; e.target.style.height = '160px' }} />
                    <div style={{ padding: '12px 14px' }}>
                      <p style={{ color: 'var(--text-secondary)', fontSize: 12, fontFamily: 'Syne, sans-serif', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{img.caption || 'No caption'}</p>
                      {img.category && <p style={{ color: 'var(--gold)', fontSize: 10, marginTop: 3, fontFamily: 'Syne, sans-serif', textTransform: 'capitalize' }}>{img.category}</p>}
                    </div>
                    <div style={{ display: 'flex', borderTop: '1px solid var(--border-subtle)', padding: 8, gap: 4 }}>
                      <button onClick={() => { setEditItem(img); setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={{ flex: 1, padding: 6, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}><Edit3 size={13} /></button>
                      <button onClick={() => deleteGallery(img.id)} style={{ flex: 1, padding: 6, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseEnter={e => e.currentTarget.style.color = '#f87171'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}><Trash2 size={13} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── Overview Tab ─── */}
        {activeTab === 'stats' && (
          <div>
            <h2 style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 28, marginBottom: 32 }}>Overview</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
              {[
                { label: 'Publications', value: publications.length, color: 'var(--gold)' },
                { label: 'Staff Members', value: staffMembers.length, color: '#60a5fa' },
                { label: 'Gallery Images', value: galleryImages.length, color: '#34d399' },
                { label: 'Journals', value: publications.filter(p => p.type === 'journal').length, color: '#a78bfa' },
              ].map((s, i) => (
                <div key={i} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-card)', borderRadius: 20, padding: 28 }}>
                  <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 40, color: s.color }}>{s.value}</p>
                  <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}