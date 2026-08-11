import { Link } from 'react-router-dom'
import { ArrowLeft, Download, Calendar, Barcode, Globe, FileText, Copyright, Building2, Mail, Phone, Lock } from 'lucide-react'

const C = ({ children, style = {} }) => (
  <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 24px', ...style }}>{children}</div>
)

const InfoRow = ({ icon: Icon, label, value }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 0', borderBottom: '1px solid var(--border-subtle)' }}>
    <Icon size={14} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 2 }} />
    <div>
      <p className="font-display" style={{ color: 'var(--text-faint)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</p>
      <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 2 }}>{value}</p>
    </div>
  </div>
)

const AuthorCard = ({ name, dept, email, phone }) => (
  <div className="card-dark" style={{ padding: 20, borderLeft: '3px solid var(--gold)' }}>
    <p className="font-display" style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{name}</p>
    <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.6, marginBottom: 10 }}>{dept}</p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', fontSize: 12, fontFamily: 'Syne, sans-serif' }}>
        <Mail size={11} style={{ color: 'var(--gold)', flexShrink: 0 }} /> {email}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', fontSize: 12, fontFamily: 'Syne, sans-serif' }}>
        <Phone size={11} style={{ color: 'var(--gold)', flexShrink: 0 }} /> {phone}
      </div>
    </div>
  </div>
)

const tocItems = [
  { label: 'Abstract', unlocked: true },
  { label: 'Introduction', unlocked: true },
  { label: 'Methodology & Theory', unlocked: false },
  { label: 'Analysis of Novels', unlocked: false },
  { label: 'Discussion & Conclusion', unlocked: false },
  { label: 'References', unlocked: false },
]

export function OkaforIkwubizoLiteraturePage() {
  const fileUrl = '/documents/women-as-other-gender-bias-igbo-literature.pdf'

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      {/* Header */}
      <div style={{ paddingTop: 144, paddingBottom: 56, borderBottom: '1px solid var(--border-subtle)' }}>
        <C>
          <Link to="/publications/literature"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: 13, textDecoration: 'none', fontFamily: 'Syne, sans-serif', marginBottom: 32 }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
            <ArrowLeft size={14} /> Back to Literature
          </Link>

          <p className="section-label" style={{ marginBottom: 16 }}>Original Research Article</p>
          <h1 className="font-display" style={{ fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.15, fontSize: 'clamp(28px, 4.5vw, 48px)', marginBottom: 24, maxWidth: 820 }}>
            Women as <span className="font-serif text-gold" style={{ fontStyle: 'italic' }}>'Other'</span>: Gender Bias in Male-Authored Igbo Literature
          </h1>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, color: 'var(--text-muted)', fontSize: 13, fontFamily: 'Syne, sans-serif' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Calendar size={13} style={{ color: 'var(--gold)' }} /> Published: January 2026</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Barcode size={13} style={{ color: 'var(--gold)' }} /> ISSN: 3115-6118</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Globe size={13} style={{ color: 'var(--gold)' }} /> Open Access</span>
          </div>
        </C>
      </div>

      <C style={{ padding: '56px 24px 96px' }}>
        <div className="lit-layout" style={{ display: 'grid', gap: 48, gridTemplateColumns: '1fr' }}>
          {/* Main column */}
          <div style={{ minWidth: 0 }}>
            {/* Authors */}
            <div style={{ display: 'grid', gap: 16, gridTemplateColumns: '1fr 1fr', marginBottom: 40 }} className="lit-authors-grid">
              <AuthorCard
                name="Ebele Eucharia Okafor"
                dept="Department of Linguistics, African & Asian Studies, Faculty of Arts, University of Lagos"
                email="eokafor@unilag.edu.ng"
                phone="+234 802 314 7863"
              />
              <AuthorCard
                name="Iwu Ikwubuzo (PhD)"
                dept="Department of Linguistics, African & Asian Studies, Faculty of Arts, University of Lagos"
                email="iikwubuzo@unilag.edu.ng"
                phone="+234 803 301 8386"
              />
            </div>

            {/* Abstract */}
            <div id="abstract" className="card-dark" style={{ padding: 32, marginBottom: 40 }}>
              <p className="section-label" style={{ marginBottom: 16 }}>Abstract</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.8 }}>
                Igbo culture and worldviews are expressed through language, and Igbo novelists draw on that medium
                to convey the significance of gender in their work — so the gender hierarchy embedded in Igbo
                cultural life shows up in its literary texts too. This paper compares the linguistic portrayal of
                male and female characters in an early post-war Igbo novel, Nzeakọ's <em>Nkọlị</em> (1973), and a
                later post-war Igbo novel, Ofomata's <em>Onye Chi Ya Akwatughị</em> (2000), asking whether the two
                authors' treatment of women shifted across that quarter-century. Using a content-analysis approach
                grounded in feminist theory, the study finds the language of both novels androcentric: women are
                cast in derogatory terms as second-class citizens, demons, and disruptors of family peace. Nzeakọ
                depicts women as devilish and dependent, while Ofomata portrays them as unfit for education — yet
                also credits them with dexterity, courage, and the strength of sisterhood in pursuing their own
                aims. The paper argues that contemporary writers, male and female alike, should give women
                characters whose personalities reflect the fuller reality of women in society.
              </p>
              <p style={{ color: 'var(--text-faint)', fontSize: 12, marginTop: 20, fontFamily: 'Syne, sans-serif' }}>
                <strong style={{ color: 'var(--text-muted)' }}>Keywords:</strong> women, other, gender, bias, male-authored Igbo literature
              </p>
            </div>

            {/* Introduction */}
            <div id="introduction" style={{ marginBottom: 40 }}>
              <p className="section-label" style={{ marginBottom: 16 }}>Introduction</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.85, marginBottom: 16 }}>
                Gender has steadily gained ground as a subject of concern in post-colonial Nigeria, alongside other
                pressing human-rights issues. Over the years, sustained efforts have gone into reshaping how women
                are seen in both life and literature. Women who feel strongly about what they describe as the
                denigration of womanhood in a male-dominated society have grown more proactive in pushing for
                gender equality, and across many areas of national life they have steadily asserted themselves —
                stepping into leadership roles and responsibilities once treated as the exclusive preserve of men.
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.85, marginBottom: 16 }}>
                That greater public visibility, however, hasn't fully settled the tension that comes with continuing
                to push for gender balance. Literature, as an embodiment of the culture that produces it, carries
                that same tension into how it portrays female characters. Since Nigeria's independence — and
                particularly after the Nigerian-Biafran Civil War — a wider body of creative Igbo literature has
                emerged, and Igbo novels in particular have taken on the task of reflecting Igbo culture, life, and
                lived experience.
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.85, marginBottom: 16 }}>
                The way women are characterised in Igbo creative writing raises some pointed questions: do early
                and later post-war Igbo novels actually attempt to redefine women through their female characters?
                How far does a novelist's use of language, in portraying women, reflect the particular place and
                time the work was written in? Is the historic under-representation of women in the literary canon
                being redressed in these novels, or do the gender inequalities of pre-colonial Igbo society simply
                persist into the post-colonial era? The paper works through these questions by comparing an early
                post-war Igbo novel, Nzeakọ's <em>Nkọlị</em>, with a later post-war Igbo novel, Ofomata's{' '}
                <em>Onye Chi Ya Akwatughị</em>.
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.85 }}>
                For the purposes of this study, "early post-war Igbo novel" refers to Igbo novels published between
                1970 and 1985, while "later post-war Igbo novel" covers those produced from 1986 onward. The paper's
                central aim is to examine how the two selected novels portray their male and female characters, and
                to analyse the language each author uses in constructing those portrayals — texts chosen precisely
                because they mirror postcolonial Igbo society and capture people's lived, gendered experience.
              </p>
            </div>

            {/* Locked sections / download wall */}
            <div style={{ marginBottom: 24 }}>
              {tocItems.filter(t => !t.unlocked).map(t => (
                <div key={t.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 18px', borderRadius: 12, background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', marginBottom: 8 }}>
                  <Lock size={13} style={{ color: 'var(--text-faint)', flexShrink: 0 }} />
                  <span className="font-display" style={{ color: 'var(--text-faint)', fontSize: 13 }}>{t.label}</span>
                </div>
              ))}
            </div>

            {/* Download CTA */}
            <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', textAlign: 'center', padding: '48px 32px', background: 'var(--gold-bg)', border: '1px solid var(--border-gold-dim)' }}>
              <FileText size={28} style={{ color: 'var(--gold)', margin: '0 auto 16px', display: 'block' }} />
              <h3 className="font-display" style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 22, marginBottom: 10 }}>
                Read the Complete Publication
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>
                Download the full manuscript to continue reading — methodology, novel-by-novel analysis, discussion, and references.
              </p>
              <a href={fileUrl} download
                className="btn-filled"
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <Download size={15} /> Download Document (PDF)
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lit-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="card-dark" style={{ padding: 24 }}>
              <p className="section-label" style={{ marginBottom: 14 }}>In This Article</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {tocItems.map(t => (
                  <a key={t.label} href={t.unlocked ? `#${t.label.toLowerCase()}` : undefined}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 4px', fontSize: 13, fontFamily: 'Syne, sans-serif', textDecoration: 'none', color: t.unlocked ? 'var(--text-secondary)' : 'var(--text-faint)', cursor: t.unlocked ? 'pointer' : 'default' }}>
                    {!t.unlocked && <Lock size={11} style={{ flexShrink: 0 }} />} {t.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="card-dark" style={{ padding: 24 }}>
              <p className="section-label" style={{ marginBottom: 12 }}>Article Information</p>
              <InfoRow icon={Building2} label="Publisher" value="Centre for Gender, Humanitarian and Development Studies (CGHDS)" />
              <InfoRow icon={Globe} label="Language" value="English" />
              <InfoRow icon={FileText} label="Format" value="PDF / Web" />
              <InfoRow icon={Barcode} label="ISSN / ISBN" value="ISSN: 3115-6118 · ISBN: 978-978-8445-56-2" />
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 0' }}>
                <Copyright size={14} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <p className="font-display" style={{ color: 'var(--text-faint)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Copyright</p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 2 }}>© 2026 The Authors</p>
                </div>
              </div>
            </div>

            <a href={fileUrl} download className="btn-outline"
              style={{ textDecoration: 'none', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Download size={15} /> Download Manuscript
            </a>
          </aside>
        </div>
      </C>

      <style>{`
        @media (max-width: 640px) { .lit-authors-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 900px) { .lit-layout { grid-template-columns: 1fr 320px !important; align-items: start; } .lit-sidebar { position: sticky; top: 96px; } }
      `}</style>
    </div>
  )
}
