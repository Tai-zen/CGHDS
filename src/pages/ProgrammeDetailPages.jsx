import { Link } from 'react-router-dom'
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

const C = ({ children, style = {} }) => (
  <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', ...style }}>{children}</div>
)

const Dot = () => (
  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, borderRadius: '50%', background: 'var(--gold-bg)', border: '1px solid rgba(201,168,76,0.25)', flexShrink: 0, marginTop: 3 }}>
    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C9A84C', display: 'block' }} />
  </span>
)

function BackLink() {
  return (
    <Link to="/programmes" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 13, fontFamily: 'Syne, sans-serif', fontWeight: 600, marginBottom: 40, transition: 'color 0.2s' }}
      onMouseEnter={e => e.currentTarget.style.color = '#fff'}
      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
      <ArrowLeft size={14} /> Back to Programmes
    </Link>
  )
}

function ProgrammeCard({ number, title, requirements }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, overflow: 'hidden', transition: 'border-color 0.3s', ...(open ? { borderColor: 'rgba(201,168,76,0.2)' } : {}) }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 28px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 13, color: 'var(--gold)', background: 'rgba(201,168,76,0.08)', padding: '4px 10px', borderRadius: 999, border: '1px solid rgba(201,168,76,0.2)', flexShrink: 0 }}>{number}</span>
          <h3 style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 16, lineHeight: 1.4 }}>{title}</h3>
        </div>
        {open ? <ChevronUp size={16} style={{ color: 'var(--gold)', flexShrink: 0 }} /> : <ChevronDown size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />}
      </button>
      {open && (
        <div style={{ padding: '0 28px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: 11, fontFamily: 'Syne, sans-serif', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '20px 0 14px' }}>Admission Requirements</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {requirements.map((req, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <Dot />
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.75 }}>{req}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// ─── Gender & Development Studies ───
export function GenderDevelopmentPage() {
  const programmes = [
    {
      number: 'PGD',
      title: 'Postgraduate Diploma (PGD) in Gender and Development Studies',
      requirements: [
        'A Bachelor\'s Degree not below Third-Class Honors in any discipline from a recognized University or Upper Credit (HND) from any recognized Polytechnic in the country;',
        'Any NUC approved equivalent professional qualifications (to the above) recognized by the Senate of the Redeemer\'s University; iii. A minimum of five (5) credit passes at GCE/SSCE/NECO ordinary level (obtained at not more than two (2) sittings).',
      ],
    },
    {
      number: 'MSc',
      title: 'Master of Science Degree (MSc) in Gender and Development Studies',
      requirements: [
        'A minimum of Second-Class Honors Degree in Gender Studies, and any other degrees in Social & Management Sciences, Law, Humanities, Education and related disciplines from any recognized University;',
        'Postgraduate Diploma in Gender and Development Studies with a minimum CGPA of 3.0 on 5-point scale of Redeemer\'s University, or any other recognized University, qualifies for admission into the MSc Programme;',
        'Applicants from a Science background with at least two (2) years relevant work experience in the field of Gender and Development practice could be suitable for the MSc programme;',
        'A minimum of five credit passes at GCE/SSCE/NECO Ordinary Level (obtained at not more than two (2) sittings) English inclusive.',
      ],
    },
    {
      number: 'MPhil/PhD',
      title: 'Master of Philosophy/Doctor of Philosophy (MPhil/PhD) in Gender and Development Studies',
      requirements: [
        'Candidates for MPhil/PhD in Gender and Development Studies must have a total weighted average of 55–59.9% in MSc Degree in Gender and Development Studies, and/or in other related disciplines from RUN or a recognized University;',
        'All candidates must have a minimum of five credit passes at GCE/SSCE/NECO Ordinary Level (obtained at not more than two (2) sittings), including the English Language.',
      ],
    },
    {
      number: 'PhD',
      title: 'Doctor of Philosophy (PhD) in Gender and Development Studies',
      requirements: [
        'MSc degree in Gender and Development Studies, and/or other related disciplines (e.g. Development Studies etc.) with a minimum total weighted average score of 60.0 (or CGPA of 3.50) from Redeemer\'s University or any other recognized University.',
      ],
    },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', paddingTop: 120 }}>
      <C style={{ paddingTop: 40, paddingBottom: 96 }}>
        <BackLink />

        {/* Hero */}
        <div style={{ display: 'grid', gap: 64, alignItems: 'start', marginBottom: 72 }} className="prog-hero-grid">
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: 11, fontFamily: 'Syne, sans-serif', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>CGHDS · Programmes</p>
            <h1 className="font-display" style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 'clamp(32px,5vw,56px)', lineHeight: 1.05, marginBottom: 24 }}>
              Gender and Development Studies<br />
              <span className="font-serif text-gold" style={{ fontStyle: 'italic' }}>Post-Graduate Programmes</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.8, maxWidth: 540 }}>
              We offer a range of comprehensive and specialized programmes designed to equip students with the knowledge and skills needed to excel in the dynamic field of gender and development. Explore our diverse post-graduate offerings and embark on a transformative journey of learning, research, and empowerment.
            </p>
          </div>
          <div style={{ borderRadius: 20, overflow: 'hidden', height: 320 }}>
            <img src="public/images/grad-course-two.jpg"
              alt="Gender and Development Studies"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
              onError={e => { e.target.src = 'public/images/cghdsnov2.jpg' }} />
          </div>
        </div>

        {/* Programmes accordion */}
        <div style={{ marginBottom: 16 }}>
          <p style={{ color: 'var(--text-muted)', fontSize: 11, fontFamily: 'Syne, sans-serif', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24 }}>Our Postgraduate Programmes</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {programmes.map((p, i) => <ProgrammeCard key={i} {...p} />)}
          </div>
        </div>
      </C>
      <style>{`@media (min-width: 900px) { .prog-hero-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
    </div>
  )
}

// ─── Humanitarian & Development Studies ───
export function HumanitarianDevelopmentPage() {
  const programmes = [
    {
      number: 'PGD',
      title: 'Postgraduate Diploma (PGD) in Humanitarian and Development Studies',
      requirements: [
        'A bachelor\'s degree not below Third-Class Honours, HND Upper Credit in any related discipline from a recognized University;',
        'Any NUC-approved equivalent professional qualifications (to the above) recognized by the Senate of the Redeemer\'s University. A minimum of five (5) credit passes at GCE/SSCE/NECO ordinary level (obtained at not more than two (2) sittings) including English Language.',
      ],
    },
    {
      number: 'MSc',
      title: 'Master of Science Degree (MSc) in Humanitarian and Development Studies',
      requirements: [
        'A minimum of Second-Class Honours Degree in Humanitarian and Development Studies, Psychology, Sociology, Social Studies, Guidance and Counselling, Health Education, Mental Health, Psychiatry, Public/Community Health, Nursing, Law or any other related disciplines from Redeemer\'s University or any other recognized University shall qualify for direct admission into the MSc in Humanitarian and Development Studies;',
        'Postgraduate Diploma in Humanitarian and Development Studies with a minimum CGPA of 3.0 on a 5-point scale of Redeemer\'s University, or any other recognized University, qualifies for admission into the MSc Programme;',
        'Applicants from a Science background with at least two (2) years relevant work experience in the field of Humanitarian and Development practice could be suitable for the MSc programme;',
        'Other applicants with at least two (2) years of significant appropriate/relevant work/demonstrable practical life experience in the field of Humanitarian and Development Studies would be suitable for the MSc programme;',
        'A minimum of five credit passes at GCE/SSCE/NECO Ordinary Level (obtained at not more than two (2) sittings) English inclusive.',
      ],
    },
    {
      number: 'MPhil/PhD',
      title: 'Master of Philosophy/Doctor of Philosophy (MPhil/PhD) in Humanitarian and Development Studies',
      requirements: [
        'A candidate for MPhil/PhD in Humanitarian and Development Studies must have a total weighted average of 55–59.9% in MSc Degree in Humanitarian and Development Studies (or related programme) from Redeemer\'s University or a recognized University;',
        'Candidates must have a minimum of five credit passes at GCE/SSCE/NECO Ordinary Level (obtained at not more than two (2) sittings), including the English Language.',
      ],
    },
    {
      number: 'PhD',
      title: 'Doctor of Philosophy (PhD) in Humanitarian and Development Studies',
      requirements: [
        'MSc degree in Humanitarian and Development Studies, Public Health, Sociology, Social Work, Psychology, Guidance and Counselling, Health Education and Mental Health with a minimum total weighted average score of 60.0 (or CGPA of 3.50) from Redeemer\'s University or any other recognized University.',
      ],
    },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', paddingTop: 120 }}>
      <C style={{ paddingTop: 40, paddingBottom: 96 }}>
        <BackLink />

        <div style={{ display: 'grid', gap: 64, alignItems: 'start', marginBottom: 72 }} className="prog-hero-grid">
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: 11, fontFamily: 'Syne, sans-serif', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>CGHDS · Programmes</p>
            <h1 className="font-display" style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 'clamp(32px,5vw,56px)', lineHeight: 1.05, marginBottom: 24 }}>
              Humanitarian and Development Studies<br />
              <span className="font-serif text-gold" style={{ fontStyle: 'italic' }}>Post-Graduate Programmes</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.8, maxWidth: 540 }}>
              Discover the possibilities within the realm of Humanitarian and Development Studies through our Post-Graduate Programmes. With a strong focus on addressing complex societal challenges and fostering sustainable development, our programmes provide a multidisciplinary approach to understanding and navigating the intricacies of the humanitarian and development sectors.
            </p>
          </div>
          <div style={{ borderRadius: 20, overflow: 'hidden', height: 320 }}>
            <img src="public/images/grad-course-one.jpg"
              alt="Humanitarian and Development Studies"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
              onError={e => { e.target.src = 'public/images/cghdsnov2.jpg' }} />
          </div>
        </div>

        <div>
          <p style={{ color: 'var(--text-muted)', fontSize: 11, fontFamily: 'Syne, sans-serif', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24 }}>Our Postgraduate Programmes</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {programmes.map((p, i) => <ProgrammeCard key={i} {...p} />)}
          </div>
        </div>
      </C>
      <style>{`@media (min-width: 900px) { .prog-hero-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
    </div>
  )
}

// ─── RUN Sickle Cell+ Club (Short Courses) ───
export function ShortCoursesPage() {
  const strategies = [
    'Awareness and Education',
    'Support and Empowerment',
    'Fundraising and Advocacy',
    'Community Building',
    'Collaboration and Partnerships',
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', paddingTop: 120 }}>
      <C style={{ paddingTop: 40, paddingBottom: 96 }}>
        <BackLink />

        {/* Hero */}
        <div style={{ display: 'grid', gap: 64, alignItems: 'start', marginBottom: 80 }} className="prog-hero-grid">
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: 11, fontFamily: 'Syne, sans-serif', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>CGHDS · Short Courses & Initiatives</p>
            <h1 className="font-display" style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 'clamp(32px,5vw,56px)', lineHeight: 1.05, marginBottom: 24 }}>
              RUN Sickle Cell+<br />
              <span className="font-serif text-gold" style={{ fontStyle: 'italic' }}>Club</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.8 }}>
              The 'RUN Sickle Cell+' Club is a nonprofit organization under the Centre for Gender, Humanitarian and Development Studies dedicated to raising awareness, providing support, and fostering a sense of community for individuals and families affected by sickle cell disease and other genetic disorders.
            </p>
          </div>
          <div style={{ borderRadius: 20, overflow: 'hidden', height: 320 }}>
            <img src="public/images/student1.jpg"
              alt="RUN Sickle Cell+ Club"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
              onError={e => { e.target.src = 'public/images/cghdsnov2.jpg' }} />
          </div>
        </div>

        {/* About section */}
        <div style={{ display: 'grid', gap: 40, marginBottom: 64 }} className="prog-two-col">
          <div className="card-dark" style={{ padding: 36 }}>
            <p style={{ color: 'var(--text-muted)', fontSize: 11, fontFamily: 'Syne, sans-serif', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>About the Club</p>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.85, marginBottom: 16 }}>
              Founded by a group of individuals passionate about health, the club aims to improve quality of life for those impacted and work towards a future free from the burden of genetic diseases.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.85 }}>
              'RUN Sickle Cell+' Club aims at creating a safe and inclusive space where individuals with sickle cell disease and other genetic disorders can find support, share experiences, and access valuable resources. The club endeavours to enhance public understanding and knowledge of these conditions, combat misconceptions, and advocate for increased research and funding to improve treatment options.
            </p>
          </div>

          <div className="card-dark" style={{ padding: 36 }}>
            <p style={{ color: 'var(--text-muted)', fontSize: 11, fontFamily: 'Syne, sans-serif', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>Our Strategies</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {strategies.map((s, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 12, color: 'var(--gold)', background: 'rgba(201,168,76,0.08)', width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</span>
                  <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, fontFamily: 'Syne, sans-serif', fontWeight: 600 }}>{s}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Founding & Growth */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 64 }}>
          <p style={{ color: 'var(--text-muted)', fontSize: 11, fontFamily: 'Syne, sans-serif', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24 }}>Founding and Growth</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 800 }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.85 }}>
              The 'RUN Sickle Cell+' Club was established in April 2009 under the name Redeemer's University Sickle Cell Area Club at the Redeemer's University, RCCG Camp Ground, Move, Ogun State. Initially, the club began with a small group of individuals meeting regularly to discuss their challenges and hopes. As word spread, more passionate people with interest in sickle cell disease and other genetic disorders joined, leading to the club's growth.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.85 }}>
              Through determined efforts, collaboration with healthcare professionals, and support from the community, the club expanded its reach and impact. It attracted volunteers, donors, and partners who shared the same vision, contributing to the club's ability to carry out its mission effectively.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.85 }}>
              In commemorating the 2023 World Sickle Cell Day the club on the 19th of June in collaboration with the University Health Centre held a hybrid (virtual and physical) campaign with the theme — Building and Strengthening the Global Sickle Cell Society which was greatly attended.
            </p>
            <div style={{ background: 'var(--bg-surface)', border: '1px solid rgba(201,168,76,0.15)', borderLeft: '3px solid #C9A84C', borderRadius: '0 16px 16px 0', padding: '20px 24px', marginTop: 8 }}>
              <p style={{ color: 'var(--text-nav)', fontSize: 14, lineHeight: 1.85, fontStyle: 'italic' }}>
                The 'RUN Sickle Cell+' Club stands as a testament to the strength of community and the power of compassion. It serves as a guiding light for individuals and families affected by sickle cell disease and other genetic disorders, providing them with the necessary resources, support, and hope. Together, they run towards a future free from the burdens of genetic disorders, united in their pursuit of health, happiness, and a better tomorrow.
              </p>
            </div>
          </div>
        </div>
      </C>

      <style>{`
        @media (min-width: 900px) {
          .prog-hero-grid { grid-template-columns: 1fr 1fr !important; }
          .prog-two-col { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  )
}
