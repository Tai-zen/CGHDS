import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { supabase } from '../lib/supabase'
// NOTE: 2025 conference uses internal route; all others link externally with no "View Details" CTA
// Programme card routes
const PROG_ROUTES = ['/programmes/gender-development', '/programmes/humanitarian-development', '/programmes/short-courses']

// Shared container
const C = ({ children, style = {} }) => (
  <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', ...style }}>{children}</div>
)

function PageHeader({ label, title, subtitle }) {
  return (
    <div style={{ paddingTop: 144, paddingBottom: 80, borderBottom: '1px solid var(--border-subtle)' }}>
      <C>
        <p className="section-label" style={{ marginBottom: 24 }}>{label}</p>
        <h1 className="font-display" style={{ fontWeight: 800, color: 'var(--text-primary)', lineHeight: 0.95, fontSize: 'clamp(40px, 7vw, 90px)' }}>
          {title}
        </h1>
        {subtitle && <p style={{ color: 'var(--text-secondary)', marginTop: 16, fontSize: 18, maxWidth: 560 }}>{subtitle}</p>}
      </C>
    </div>
  )
}

const Dot = () => (
  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, borderRadius: '50%', background: 'var(--gold-bg)', border: '1px solid var(--border-gold-dim)', flexShrink: 0, marginTop: 2 }}>
    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', display: 'block' }} />
  </span>
)

const SectionDivider = () => (
  <div style={{ borderTop: '1px solid var(--border-subtle)', margin: '0' }} />
)

export function AboutPage() {
  const objectives = [
    'Design appropriate policies and academic programmes towards gender, humanitarian, conflict resolution and peace-building, and sustainable developments which will improve the quality of life for men, women and children.',
    'Develop relevant social and economic policy guidelines to assist the country in its poverty reduction efforts critical for enhancing pro-poor development programmes and policies.',
    'Engage in states, nationally and internationally relevant research and consultancies on issues related to gender, humanitarian, socio-economic and political matters, politics and governance, health, conflict resolution and peace-building and other development concern.',
    'Equip students, policymakers and professionals with analytical and conceptual skills needed to understand gender, humanitarian and development issues in both the public and the private sectors.',
    'Mainstream gender analytical frameworks into both academic curricula and the administrative system of the University.',
    'Initiate training programs for the engendering process in the University and across the State.',
    'Build national capacity on gender mainstreaming, humanitarian response, social development planning, and policy analysis.',
    'Promote students who are skilled in interdisciplinary research and policy analysis for sustainable development, issues of equity and equality associated with gender, class, ethnic and political differentiation, in particular issues relating to humanitarian and other development issues and concerns globally.',
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <PageHeader label="Who We Are" title="About CGHDS"
        subtitle="Established by Senate mandate in October 2020, CGHDS is Redeemer's University's centre for advancing gender, humanitarian, and development research." />

      {/* ── Our History ── */}
      <section style={{ padding: '96px 0' }}>
        <C>
          <div style={{ display: 'grid', gap: 64, alignItems: 'start' }} className="two-col">
            <div>
              <p className="section-label" style={{ marginBottom: 20 }}>Our History</p>
              <h2 className="font-display" style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 'clamp(28px,4vw,40px)', lineHeight: 1.15, marginBottom: 28 }}>
                Built on a <span className="font-serif text-gold" style={{ fontStyle: 'italic' }}>Senate mandate.</span>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 15 }}>
                  The Redeemer's University Centre for Gender, Humanitarian and Development Studies (CGHDS) got the mandate of the University Senate in its October 2020 meeting to establish a centre of excellence for research, consultancies and the interdisciplinary study of Gender, Humanitarian and Development Studies.
                </p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 15 }}>
                  At the centre, multiple dimensions of sustainable development in academic practice are explored, focusing on such elements as — social, technological, economic, environmental, and political issues. This is in line with the philosophy and mission of the University, which is to provide a high-quality educational experience shaped by outstanding teaching and research that benefit cultures, societies, and national and international economies.
                </p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 15 }}>
                  Prof. Olabisi I. Aina was the founding Director of the Centre on 1st August 2022 and the CGHDS began a twin-track programme:
                </p>
              </div>

              <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { label: 'Gender and Development Studies', desc: 'The Gender and Development track explores the intersectionality of gender and development at the levels of theory, practice/policy & planning for development.' },
                  { label: 'Humanitarian and Development Studies across academic levels', desc: 'This track will expose students to the overall humanitarian system and the context of emergencies and disasters with multiple effects on livelihoods, food security, nutrition, forced migration, protection, and governance; and how these overlap with development, conflict management, human rights, and gender analytical frameworks.' },
                ].map((track, i) => (
                  <div key={i} className="card-dark" style={{ padding: '20px 24px', borderLeft: '3px solid var(--gold)' }}>
                    <p style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{i + 1}. {track.label}</p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.7 }}>{track.desc}</p>
                  </div>
                ))}
              </div>

              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 14, marginTop: 20 }}>
                Professional courses are also mounted to build core competencies in such areas as Social Impact Analysis and Management, Humanitarian Services, Disaster Management, and Procurement and Supply Chain, amongst others.
              </p>
            </div>

            {/* Right: photo + stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ borderRadius: 20, overflow: 'hidden', height: 360 }}>
                <img src="http://cghds.run.edu.ng/assets/img/about/who-we-are-1.jpg"
                  onError={e => { e.target.src = 'http://cghds.run.edu.ng/assets/img/CGHDS_PHOTO_GALLERY/IMG_7105.JPG' }}
                  alt="CGHDS group photo" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="card-dark" style={{ padding: 24, textAlign: 'center' }}>
                  <p className="font-display" style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 36 }}>2020</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: 10, marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Syne, sans-serif' }}>Founded</p>
                </div>
                <div className="card-dark" style={{ padding: 24, textAlign: 'center' }}>
                  <p className="font-display" style={{ fontWeight: 800, color: 'var(--gold)', fontSize: 36 }}>17+</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: 10, marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Syne, sans-serif' }}>Programmes</p>
                </div>
              </div>
            </div>
          </div>
        </C>
      </section>

      <SectionDivider />

      {/* ── Philosophy + Mission ── */}
      <section style={{ padding: '96px 0' }}>
        <C>
          <div style={{ display: 'grid', gap: 48 }} className="two-col">
            <div>
              <p className="section-label" style={{ marginBottom: 20 }}>Our Philosophy</p>
              <h2 className="font-display" style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 'clamp(24px,3vw,36px)', lineHeight: 1.2, marginBottom: 20 }}>
                No one left <span className="font-serif text-gold" style={{ fontStyle: 'italic' }}>behind.</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 15 }}>
                The philosophy is to carry out research, training, and production of knowledge that bring about: a reduction in social inequalities, accelerate sustainability and build more inclusive, resilient, and secure societies; make governments and social institutions more accountable and responsible for the use of resources; ensure that 'no one is left behind' in the process of development; and ensures the promotion of standards of good practice in humanitarian responses for sustainable human development.
              </p>
            </div>
            <div>
              <p className="section-label" style={{ marginBottom: 20 }}>Our Mission Statement</p>
              <h2 className="font-display" style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 'clamp(24px,3vw,36px)', lineHeight: 1.2, marginBottom: 20 }}>
                Advancing <span className="font-serif text-gold" style={{ fontStyle: 'italic' }}>globally accepted</span> strategies.
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 15 }}>
                To promote gender, humanitarian, and development studies, which have been globally accepted as strategies to attain development through teaching, research, policy advocacy, training, educational outreach, and partnership with the governments, the private sector, civil society organizations, and development partners.
              </p>
            </div>
          </div>
        </C>
      </section>

      <SectionDivider />

      {/* ── Objectives ── */}
      <section style={{ padding: '96px 0' }}>
        <C>
          <div style={{ display: 'grid', gap: 64, alignItems: 'start' }} className="two-col">
            <div>
              <p className="section-label" style={{ marginBottom: 20 }}>Our Objectives</p>
              <h2 className="font-display" style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 'clamp(28px,4vw,40px)', lineHeight: 1.15, marginBottom: 12 }}>
                Eight pillars of <span className="font-serif text-gold" style={{ fontStyle: 'italic' }}>purpose.</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.7 }}>
                CGHDS is guided by eight core objectives that shape every programme, research output, and community engagement.
              </p>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {objectives.map((obj, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <Dot />
                  <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.75 }}>{obj}</p>
                </li>
              ))}
            </ul>
          </div>
        </C>
      </section>

      <SectionDivider />

      <SectionDivider />

      {/* ── Special Initiatives ── */}
      <section style={{ padding: '96px 0' }}>
        <C>
          <p className="section-label" style={{ marginBottom: 40 }}>Special Initiatives</p>
          <div style={{ display: 'grid', gap: 20 }} className="three-col">
            {[
              { num: '01', title: 'Sickle Cell+ Club', desc: "Providing support, advocacy, and community for those living with sickle cell disease at Redeemer's University." },
              { num: '02', title: 'CGHDS Lecture Series', desc: 'Regular lecture series exploring gender, humanitarian action, and development topics with leading scholars.' },
              { num: '03', title: 'International Consortium', desc: 'Global partnerships advancing research and collaboration across institutions worldwide.' },
            ].map((item, i) => (
              <div key={i} className="card-dark hover-lift" style={{ padding: 32 }}>
                <p className="font-display" style={{ fontWeight: 800, color: 'var(--border-card)', fontSize: 56, marginBottom: 24, lineHeight: 1 }}>{item.num}</p>
                <h3 className="font-display" style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 20, marginBottom: 12 }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </C>
      </section>

      <SectionDivider />

      {/* ── Our Fellows ── */}
      <section style={{ padding: '96px 0' }}>
        <C>
          <div style={{ marginBottom: 48 }}>
            <p className="section-label" style={{ marginBottom: 20 }}>Our Fellows</p>
            <h2 className="font-display" style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 'clamp(28px,4vw,40px)', lineHeight: 1.15, marginBottom: 16 }}>
              Esteemed <span className="font-serif text-gold" style={{ fontStyle: 'italic' }}>collaborators.</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, maxWidth: 640, lineHeight: 1.75 }}>
              Our esteemed fellows contribute their expertise and experience to our mission of advancing gender equality, humanitarian efforts, and sustainable development. Together, we collaborate to drive positive change and foster meaningful impact in the realms of gender, humanitarianism, and development studies.
            </p>
          </div>

          {/* Fellows table */}
          <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid var(--border-card)' }}>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '56px 1fr 1fr', background: 'var(--gold-bg-dim)', borderBottom: '1px solid var(--border-card)', padding: '14px 24px' }}>
              <span style={{ color: 'var(--text-faint)', fontSize: 11, fontFamily: 'Syne, sans-serif', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>#</span>
              <span style={{ color: 'var(--text-faint)', fontSize: 11, fontFamily: 'Syne, sans-serif', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Name</span>
              <span style={{ color: 'var(--text-faint)', fontSize: 11, fontFamily: 'Syne, sans-serif', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Faculty / Department</span>
            </div>
            {[
              { name: 'Prof O. Opadere', dept: 'Faculty of Law' },
              { name: 'Prof. B. Adeleke', dept: 'Tourism and Hospitality Studies' },
              { name: 'Dr P.O. Adeniji', dept: 'Tourism and Hospitality Studies' },
              { name: 'Dr O. Oluwaniyi', dept: 'History and International Relations' },
              { name: 'Dr O. Olajire', dept: 'Behavioural Studies' },
              { name: 'Dr O. Wellington', dept: 'Behavioural Studies' },
              { name: 'Dr. Ayodele Opadere', dept: 'Behavioural Studies' },
              { name: 'Dr Abayomi Olusa', dept: 'Behavioural Studies' },
              { name: 'Dr. O. Ajeigbe', dept: 'Economics' },
              { name: 'Dr R.S. Dauda', dept: 'Economics' },
              { name: 'Dr M. Ojedele', dept: 'Accounting' },
              { name: 'Dr Adetutu Aina-Pelemo', dept: 'Faculty of Law' },
              { name: 'Dr M. Sanyaolu', dept: 'Physical Sciences' },
              { name: 'Dr Stephen Eyeh', dept: 'English and Literary Studies' },
              { name: 'Dr Femi Ayoade', dept: 'Biological Sciences' },
              { name: 'Dr. Olufemi Omoyele', dept: 'Business Administration and Marketing' },
              { name: 'Dr Adeyinka Ajayi', dept: 'Tourism and Hospitality Studies' },
              { name: 'Dr Adebayo Adedeji', dept: 'Political Science & Pub. Administration' },
            ].map((fellow, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '56px 1fr 1fr',
                padding: '14px 24px',
                borderBottom: i < 17 ? '1px solid var(--border-subtle)' : 'none',
                background: i % 2 === 0 ? 'transparent' : 'var(--bg-ticker)',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.04)'}
                onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : 'var(--bg-ticker)'}
              >
                <span style={{ color: 'var(--text-faint)', fontSize: 13, fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>{i + 1}</span>
                <span style={{ color: 'var(--text-primary)', fontSize: 14, fontFamily: 'Syne, sans-serif', fontWeight: 600 }}>{fellow.name}</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: 14, fontFamily: 'Syne, sans-serif' }}>{fellow.dept}</span>
              </div>
            ))}
          </div>
        </C>
      </section>

      <style>{`
        @media (min-width: 768px) { .three-col { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (min-width: 900px) { .two-col { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </div>
  )
}

export function ProgrammesPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <PageHeader label="Academics" title="Academic Programmes"
        subtitle="Explore our diverse range of programmes designed to equip graduates for the challenges of gender, humanitarian, and development work." />

      <section style={{ padding: '96px 0' }}>
        <C>
          <div style={{ display: 'grid', gap: 20 }} className="three-col">
            {[
              { title: 'Gender & Development Studies', img: 'http://cghds.run.edu.ng/assets/img/CGHDS_PHOTO_GALLERY/grad-course-two.jpg', desc: 'Explore the multidimensional aspects of gender and its intersections with development, society, and policy.' },
              { title: 'Humanitarian & Development Studies', img: 'http://cghds.run.edu.ng/assets/img/CGHDS_PHOTO_GALLERY/grad-course-one.jpg', desc: 'Gain expertise in humanitarian action, crisis response, and sustainable development frameworks.' },
              { title: 'Short Courses & Programmes', img: 'http://cghds.run.edu.ng/assets/img/CGHDS_PHOTO_GALLERY/student1.jpg', desc: 'Flexible short courses for professionals seeking to enhance their skills in gender and development.' },
            ].map((prog, i) => (
              <Link key={i} to={PROG_ROUTES[i]} className="card-dark hover-lift" style={{ overflow: 'hidden', textDecoration: 'none', display: 'block' }}>
                <div style={{ position: 'relative', height: 224, overflow: 'hidden' }}>
                  <img src={prog.img} alt={prog.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, transition: 'all 0.5s' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-surface), transparent)' }} />
                </div>
                <div style={{ padding: 28 }}>
                  <h3 className="font-display" style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 20, marginBottom: 12 }}>{prog.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>{prog.desc}</p>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--gold)', fontSize: 14, fontFamily: 'Syne, sans-serif', fontWeight: 500 }}>
                    Learn More <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </C>
      </section>

      <style>{`
        @media (min-width: 768px) { .three-col { grid-template-columns: repeat(3, 1fr) !important; } }
      `}</style>
    </div>
  )
}

export function EventsPage() {
  const [dbEvents, setDbEvents] = useState([])

  useEffect(() => {
    supabase.from('events').select('*').order('created_at', { ascending: false })
      .then(({ data }) => { if (data) setDbEvents(data) })
  }, [])

  // Static fallback events (shown after DB events)
  const staticEvents = [
    {
      tag: 'CONFERENCE',
      date: 'November 10–14, 2025',
      title: '2025 CGHDS International Conference',
      img: 'http://cghds.run.edu.ng/assets/img/cghdsnov2.jpg',
      desc: 'The Centre for Gender, Humanitarianism, and Development Studies (CGHDS), Redeemer\'s University, Nigeria, announces its forthcoming international conference on "Recent Advances in Gender, Humanitarianism and Development." The 5-Day Conference (CGHDS/IC2025) is scheduled to take place on the 10th to 14th of November 2025 on the University Campus in Ede, one of the most popular ancient towns in Yoruba Land.',
      link: '/events/2025-international-conference',
      internal: true,
    },
    {
      tag: 'WORKSHOP',
      date: '21 October 2025',
      title: 'Pre-conference Workshop Presentation by Prof. Albert Olawale Isaac',
      img: 'http://cghds.run.edu.ng/assets/img/cghdsnov2.jpg',
      desc: 'Pre-conference workshop presentation delivered by Professor Albert Olawale Isaac on 21 October 2025. Topic: Social Construction of Gender, Humanitarianism and Development. Department of Peace, Security and Humanitarian Studies, Faculty of Multidisciplinary Studies, University of Ibadan.',
      link: '/events/pre-conference-workshop',
      internal: true,
    },
    {
      tag: 'LECTURE',
      date: '3 October 2023',
      title: 'Lecture Series on Humanitarian Action and Disaster Management',
      img: 'http://cghds.run.edu.ng/assets/img/events/HUMANITARIAN-nd-DISASTER.png',
      desc: 'The CGHDS Lecture Series delves into Humanitarian Action and Disaster Management, offering valuable insights and expertise in addressing crises and managing disasters effectively. Participants gain a deeper understanding of the principles and practices that guide effective humanitarian responses in complex emergencies.',
      link: 'http://cghds.run.edu.ng',
    },
    {
      tag: 'LECTURE',
      date: '21 September 2023',
      title: 'CGHDS Lecture Series on Gender, Conflict and Peace-Building',
      img: 'http://cghds.run.edu.ng/assets/img/events/GENDER-CONFLICT-PEACE-BUILDING.png',
      desc: 'Through insightful lectures and discussions, this lecture series delves into innovative approaches to foster gender equality and inclusivity in peace-building efforts. The series explores the intersection of gender dynamics and conflict resolution, highlighting transformative frameworks for building lasting peace.',
      link: 'http://cghds.run.edu.ng',
    },
    {
      tag: 'COMMEMORATION',
      date: '19 August 2023',
      title: 'World Humanitarian Day',
      img: 'http://cghds.run.edu.ng/assets/img/events/world-humanitarian-day.png',
      desc: 'A day dedicated to honouring humanitarian efforts worldwide, recognising the courage and dedication of aid workers, and raising awareness about the need for humanitarian action to support those in crisis and vulnerable situations. CGHDS joined the global community in commemorating this important occasion.',
      link: 'http://cghds.run.edu.ng',
    },
    {
      tag: 'WORKSHOP',
      date: 'July 2023',
      title: '2-Day Capacity Building Training Workshop (CBTW)',
      img: 'http://cghds.run.edu.ng/assets/img/events/capacity-building-workshop.png',
      desc: 'The CGHDS Capacity Building Training Workshop (CBTW) is focused on enhancing participants\' skills and knowledge in critical areas of gender, humanitarian, and development studies. The two-day workshop brought together professionals, researchers, and practitioners to strengthen core competencies needed for impactful work in these fields.',
      link: 'http://cghds.run.edu.ng',
    },
  ]

  // Combine: DB events first (newest), then static events
  const allEvents = [
    ...dbEvents.map(ev => ({ tag: ev.tag, date: ev.date, title: ev.title, img: ev.img, desc: ev.desc, link: ev.link, internal: ev.internal })),
    ...staticEvents,
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <PageHeader label="Calendar" title="Events"
        subtitle="Join us in our journey towards creating a more equitable, empathetic, and sustainable world." />

      <section style={{ padding: '96px 0' }}>
        <C style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {allEvents.map((ev, i) => {
            const inner = (
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ width: 288, minHeight: 192, flexShrink: 0, overflow: 'hidden' }} className="event-img-hide">
                  <img src={ev.img} alt={ev.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, transition: 'all 0.5s' }} />
                </div>
                <div style={{ padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <span className="font-display" style={{ background: 'var(--gold-bg)', border: '1px solid var(--border-gold-dim)', color: 'var(--gold)', fontSize: 10, fontWeight: 700, padding: '4px 12px', borderRadius: 999, letterSpacing: '0.1em' }}>{ev.tag}</span>
                    <span className="font-display" style={{ color: 'var(--text-muted)', fontSize: 12 }}>{ev.date}</span>
                  </div>
                  <h3 className="font-display" style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 22, marginBottom: 12 }}>{ev.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6, marginBottom: ev.internal ? 20 : 0 }}>{ev.desc}</p>
                  {ev.internal && (
                    <span className="font-display" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--gold)', fontSize: 14, fontWeight: 500 }}>
                      View Details <ArrowRight size={14} />
                    </span>
                  )}
                </div>
              </div>
            )
            return ev.internal
              ? <Link key={i} to={ev.link} className="card-dark hover-lift" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', textDecoration: 'none' }}>{inner}</Link>
              : <div key={i} className="card-dark" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>{inner}</div>
          })}
        </C>
      </section>

      <style>{`
        @media (max-width: 767px) { .event-img-hide { display: none !important; } }
      `}</style>
    </div>
  )
}

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return

    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    const mailtoUrl = `mailto:taye.ojo08@gmail.com?subject=${encodeURIComponent(form.subject || `Message from ${form.name} via CGHDS site`)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoUrl
    setSent(true)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <PageHeader label="Get in Touch" title="Contact Us" />

      <section style={{ padding: '96px 0' }}>
        <C>
          <div style={{ display: 'grid', gap: 64 }} className="two-col">
            {/* Info */}
            <div>
              <h2 className="font-display" style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 28, marginBottom: 16 }}>
                We'd love to <span className="font-serif text-gold" style={{ fontStyle: 'italic' }}>hear from you.</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 40, fontSize: 14, lineHeight: 1.7 }}>
                Whether you have a question about our programmes, research partnerships, events, or anything else — our team is ready to help.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { label: 'Address', value: "Redeemer's University, P.M.B. 230, Ede, Osun State, Nigeria." },
                  { label: 'Phone', value: '+234 805 223 6377', href: 'tel:+2348052236377' },
                  { label: 'Email', value: 'cghds@run.edu.ng', href: 'mailto:cghds@run.edu.ng' },
                  { label: 'Website', value: 'cghds.run.edu.ng', href: 'http://cghds.run.edu.ng' },
                ].map((item, i) => (
                  <div key={i} className="card-dark" style={{ padding: 20, display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                    <div style={{ width: 4, alignSelf: 'stretch', borderRadius: 999, background: 'var(--gold)', flexShrink: 0 }} />
                    <div>
                      <p className="section-label" style={{ marginBottom: 4, fontSize: 10 }}>{item.label}</p>
                      {item.href
                        ? <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                            style={{ color: 'var(--text-nav)', fontSize: 14, textDecoration: 'none' }}>{item.value}</a>
                        : <p style={{ color: 'var(--text-nav)', fontSize: 14 }}>{item.value}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="card-dark" style={{ padding: 32 }}>
              <h3 className="font-display" style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 24, marginBottom: 28 }}>Send a Message</h3>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name', required: true },
                  { key: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com', required: true },
                  { key: 'subject', label: 'Subject', type: 'text', placeholder: 'Message subject', required: false },
                ].map((f, i) => (
                  <div key={i}>
                    <label className="section-label" style={{ display: 'block', marginBottom: 8, fontSize: 10 }}>{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder} required={f.required} value={form[f.key]} onChange={e => set(f.key, e.target.value)}
                      style={{ width: '100%', background: 'var(--bg-surface)', border: '1px solid var(--border-nav)', borderRadius: 12, padding: '12px 16px', color: 'var(--text-primary)', fontSize: 14, outline: 'none', fontFamily: 'Syne, sans-serif', boxSizing: 'border-box' }} />
                  </div>
                ))}
                <div>
                  <label className="section-label" style={{ display: 'block', marginBottom: 8, fontSize: 10 }}>Message</label>
                  <textarea rows={5} placeholder="Your message..." required value={form.message} onChange={e => set('message', e.target.value)}
                    style={{ width: '100%', background: 'var(--bg-surface)', border: '1px solid var(--border-nav)', borderRadius: 12, padding: '12px 16px', color: 'var(--text-primary)', fontSize: 14, outline: 'none', resize: 'none', fontFamily: 'Syne, sans-serif', boxSizing: 'border-box' }} />
                </div>
                {sent && (
                  <p style={{ color: 'var(--gold)', fontSize: 13, fontFamily: 'Syne, sans-serif' }}>
                    Your email client should now be open with your message ready to send. If nothing opened, please email cghds@run.edu.ng directly.
                  </p>
                )}
                <button type="submit" className="btn-filled" style={{ width: '100%', justifyContent: 'center', padding: '14px 28px' }}>
                  Send Message <ArrowRight size={15} />
                </button>
              </form>
            </div>
          </div>
        </C>
      </section>
    </div>
  )
}