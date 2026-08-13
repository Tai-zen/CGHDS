import { Link } from "react-router-dom"
import { ArrowLeft, ExternalLink } from "lucide-react"

const C = ({ children, style = {} }) => (
  <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", ...style }}>{children}</div>
)

const SectionLabel = ({ number, text }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
    <div style={{ width: 32, height: 2, background: "var(--gold)" }} />
    <p className="section-label" style={{ fontSize: 10 }}>{number ? `${number}. ${text.toUpperCase()}` : text.toUpperCase()}</p>
  </div>
)

const Card = ({ children, style = {}, accent = false }) => (
  <div className="card-dark" style={{ padding: 24, ...(accent ? { borderLeft: "3px solid var(--gold)" } : {}), ...style }}>
    {children}
  </div>
)

const BulletItem = ({ roman, children }) => (
  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
    {roman && (
      <span className="font-display" style={{ color: "var(--gold)", fontWeight: 700, fontSize: 11, minWidth: 24, paddingTop: 2, flexShrink: 0 }}>
        {roman}.
      </span>
    )}
    <p style={{ color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.75 }}>{children}</p>
  </div>
)

const tracks = [
  {
    title: "Track 1: Core Gender, Feminism & Masculinities",
    subtracks: [
      "Feminist Theory and Praxis - Feminism and Intersectionality, Decolonizing Feminism, Ecofeminism, Environmental and Gender Justice, Digital Feminism, Indigenous Feminisms, Centring Marginalized Voices",
      "Feminist Research, Feminist Studies, Femme Invisibility, First-Wave Feminism, Radical Feminism",
      "Feminist/Gendered Leadership, Decision-Making and Management",
      "Masculinities and Gender Relations, Masculinity, Men as Allies in the Fight for Gender Equality, Exploring Toxic Masculinity, Fatherhood and Gender Equity, Men and Masculinities, Men's Studies",
      "Feminists and Women's Movements - Anti-Gender Mobilization",
    ],
  },
  {
    title: "Track 2: Core Gender Social Policy and Development Issues",
    subtracks: [
      "Gender and Policy, Gender Mainstreaming, Gender Quotas in Political Representation, Gender-Sensitive Budgeting, Gender Impact Assessments in Policy Making",
      "Benevolent Sexism, Contemporary Family, Culture of Gender, Female Genital Mutilation, Femicide",
    ],
  },
  {
    title: "Track 3: Gender Inclusive Economic Empowerment",
    subtracks: [
      "Gender gaps in the labour market; etc.",
      "Women's Economic Empowerment, Microfinance and Women's Economic Empowerment, The Gender Wage Gap, Entrepreneurship and Women, Women's Role in the Informal Economy",
      "Gender and The Workplace, Gender Equality, Gender Gap",
    ],
  },
  {
    title: "Track 4: Governance, Democracy and Political",
    subtracks: [
      "Gender and Democracy, Gender and Public Policy, Gender Politics of Development",
      "Gender and Leadership, Gender and Politics",
    ],
  },
  {
    title: "Track 5: Conflict, Conflict Resolution and Peace-Building",
    subtracks: [
      "Multiraciality, Gender and Religion",
    ],
  },
  {
    title: "Track 6: Core Humanitarian and Development",
    subtracks: [
      "Gender-Humanitarian-Development Study",
      "Humanitarianism and Development: contemporary issues, Gender-Responsive Humanitarian Aids and programming, Gender-based violence; Humanitarian Crises, Gender stereotypes, etc",
    ],
  },
  {
    title: "Track 7: Human Rights, Social Justice and Legal Environment Study",
    subtracks: [
      "Human Right Issues, Gender and The Law, Gender and Human Rights",
      "Gender-Based Violence: Legal Systems and Gender-Based Violence, Community Responses to Gender-Based Violence, Mental Health and GBV, Innovative Approaches to Preventing Gender-Based Violence",
      "Special Sessions on Ending Violence against Persons in Nigeria - with special focus of Women, Girls, Boys, Children and PWDs",
    ],
  },
  {
    title: "Track 8: Gender and Health",
    subtracks: [
      "Public Health, Reproductive Health and Social Issues",
      "Mental Health and Gender, Maternal Health, The Gendered Impact of Global Health Crises, Sexual and Reproductive Health Rights",
      "Gender and SRHR: Sexual and Reproductive Health Services, Comprehensive Sexual Education, Gender and SRHR Policies, SRHR Services and Women's Health",
      "Gender and HIV: Gender, HIV Prevalence and Treatment, HIV Prevention Programs, Gender Norms on HIV Transmission, Gender-Based Approaches to HIV Education",
      "Abortion Rights",
    ],
  },
  {
    title: "Track 9: Environment And Humanitarian Disaster",
    subtracks: [
      "Gender and the Environment, Gender and Climate Change, Women's Roles in Environmental Conservation, Gendered and Environmental Degradation, Ecofeminism",
    ],
  },
  {
    title: "Track 10: Gender and Education",
    subtracks: [
      "Access and Equity, Inclusive policies and practices in Higher education",
      "Multisectoral Issues: Historicizing Equity, Equality, Diversity and Inclusion (EEDI), Gender issues, Politics, ICT, social equality or inequality, Poverty, Gender Stereotypes and Bias",
      "Gender and International Development, Gender and Literature, Gender and Popular Culture, Gender and Science",
    ],
  },
  {
    title: "Track 11: Gender, Media, and Representation",
    subtracks: [
      "Gender and Media Studies, Gender Representation in Advertising, Women in Journalism, The Influence of Gender in Movie Production, Social Media Influencers",
    ],
  },
  {
    title: "Track 12: Gender and Technology",
    subtracks: [
      "Gender and Technology, Women in Technology, The Digital Divide, Cybersecurity and Gender, Technology and Gender Equality",
    ],
  },
  {
    title: "Track 13: Intersectionality and Diversity",
    subtracks: [
      "The Intersections of Race, Gender, and Class, Disability and Gender, Intersecting Identities, LGBTQ+ Rights and Gender Equality, Gender, Gender Disorientation, Sexuality and Sex",
    ],
  },
  {
    title: "Track 14: LGBTQ Studies",
    subtracks: [
      "Politics of Sexuality, Polysexual, Reproductive Politics, Rethinking Sex and Gender, Same-Sex Adoption Rights, Same-Sex Marriage, Same-Sex Parenting, Sexual and Gender Identities, Sexuality Studies, Transgender Studies, Transsexuals",
      "Gamergate, Gay and Lesbian History, Gender and Sexual Diversity, Gender and Sexuality, Gender Stereotypes, Gendered Borders, Gender-Neutral Language, Heterosexual Transvestites, Identity and Difference",
    ],
  },
]

const ROMAN = ["i","ii","iii","iv","v","vi","vii","viii"]

const GoldLink = ({ href, children }) => (
  <a href={href} target="_blank" rel="noreferrer" style={{ color: "var(--gold)", textDecoration: "underline", textDecorationColor: "transparent", transition: "text-decoration-color 0.2s" }}
    onMouseEnter={e => e.currentTarget.style.textDecorationColor = "var(--gold)"}
    onMouseLeave={e => e.currentTarget.style.textDecorationColor = "transparent"}>
    {children}
  </a>
)

export function ConferencePage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}>

      {/* ── Hero ── */}
      <section style={{ position: "relative", paddingTop: 144, paddingBottom: 100, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url('public/images/cghdsnov2.jpg')", backgroundSize: "cover", backgroundPosition: "center", opacity: "var(--img-opacity)" }} />
          <div style={{ position: "absolute", inset: 0, background: "var(--hero-overlay)" }} />
        </div>
        <C style={{ position: "relative" }}>
          <Link to="/events"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--text-muted)", fontSize: 13, textDecoration: "none", fontFamily: "Syne, sans-serif", marginBottom: 36 }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--gold)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}>
            <ArrowLeft size={14} /> Back to Events
          </Link>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, border: "1px solid var(--border-gold-dim)", borderRadius: 999, padding: "6px 18px", background: "var(--gold-bg)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)" }} />
            <span className="font-display" style={{ color: "var(--gold)", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase" }}>Conference &middot; CGHDS/IC2025</span>
          </div>
          </div>
          <h1 className="font-display" style={{ fontWeight: 800, color: "var(--text-primary)", lineHeight: 0.95, fontSize: "clamp(36px, 6vw, 80px)", marginBottom: 40 }}>
            2025 CGHDS<br />
            <span className="font-serif text-gold" style={{ fontStyle: "italic" }}>International</span><br />
            Conference
          </h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 8 }}>
            {[
              { label: "THEME", value: "Recent Advances in Gender, Humanitarianism and Development" },
              { label: "DATE", value: "November 10th\u201314th, 2025" },
              { label: "MODE", value: "Hybrid" },
              { label: "VENUE", value: "Redeemer's University Event Centre and Sapetro" },
            ].map((item, i) => (
              <div key={i} className="card-dark" style={{ padding: "16px 20px", borderLeft: "3px solid var(--gold)", flex: "1 1 200px", minWidth: 180, maxWidth: 320 }}>
                <p className="section-label" style={{ fontSize: 9, marginBottom: 8 }}>{item.label}</p>
                <p style={{ color: "var(--text-primary)", fontSize: 13, lineHeight: 1.5, fontFamily: "Syne, sans-serif", fontWeight: 600 }}>{item.value}</p>
              </div>
            ))}
          </div>
        </C>
      </section>

      {/* ── Introduction ── */}
      <section style={{ padding: "80px 0", borderBottom: "1px solid var(--border-subtle)" }}>
        <C>
          <SectionLabel text="Introduction" />
          <div style={{ display: "grid", gap: 56 }} className="two-col">
            <div>
              <h2 className="font-display" style={{ fontWeight: 800, color: "var(--text-primary)", fontSize: "clamp(22px,3vw,34px)", lineHeight: 1.2, marginBottom: 28 }}>
                Call for Abstract &amp; Full Paper<br />
                <span className="font-serif text-gold" style={{ fontStyle: "italic" }}>Submission and Registration</span>
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: 14 }}>
                  The Centre for Gender, Humanitarianism, and Development Studies (CGHDS), Redeemer's University, Nigeria, is glad to announce its forthcoming international conference on "Recent Advances in Gender, Humanitarianism and Development." The 5-Days Conference (CGHDS/IC2025) is scheduled to take place on the 11th, 12th, and 13th of November 2025 in our University Campus, located in Ede, which is one of the most popular ancient towns in Yoruba Land. The city's traditional paramount ruler is titled Timi Agbale of Ede.
                </p>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: 14 }}>
                  The CGHDS/IC2025 will bring together leading scholars, practitioners, and policymakers from around the world to discuss and share the latest research, contemporary insights, and best practices in the fields of gender studies, humanitarianism, human security, intelligence, law enforcement, corporate governance and development from many nations in the Global North and South. It is expected to gather more than 500 attendees. The conference's aim is to promote the exchange of knowledge and to foster collaboration between lecturers and researchers on gender, humanitarian, and development concerns.
                </p>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: 14 }}>
                  This will be done by various activities being on offer, which include oral and poster sessions, interactive workshops, networking events, and keynote speeches delivered by world-renowned gender, humanitarian, and development experts. The expected outcomes of the conference include scholarly peer-reviewed book of abstract, journals, conference proceedings, communiques, and book of readings.
                </p>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: 14 }}>
                  Anyone with an interest in gender, humanitarian, and development is welcome to join CGHDS/IC2025 &mdash; experience it for yourself at RUN, Ede, Nigeria this November!
                </p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ borderRadius: 20, overflow: "hidden", height: 300, flexShrink: 0 }}>
                <img src="http://cghds.run.edu.ng/assets/img/cghdsnov2.jpg" alt="2025 CGHDS International Conference" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }} />
              </div>
              <Card>
                <p className="section-label" style={{ fontSize: 9, marginBottom: 16 }}>Quick Actions</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <a href="https://docs.google.com/forms/d/1WX5sBFbHgoW_PuurfmggcvUZc2GFVT6TRujRRP7qeb0/edit?pli=1" target="_blank" rel="noreferrer"
                    className="btn-filled" style={{ justifyContent: "center", padding: "12px 20px", fontSize: 13, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 12 }}>
                    Submit Abstract <ExternalLink size={13} />
                  </a>
                  <a href="https://docs.google.com/forms/d/1WX5sBFbHgoW_PuurfmggcvUZc2GFVT6TRujRRP7qeb0/edit?pli=1" target="_blank" rel="noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, color: "var(--gold)", fontSize: 13, fontFamily: "Syne, sans-serif", fontWeight: 500, textDecoration: "none", padding: "12px 20px", border: "1px solid var(--border-gold-dim)", borderRadius: 12, background: "var(--gold-bg)" }}>
                    Submit Full Paper <ExternalLink size={13} />
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </C>
      </section>

      {/* ── Tracks ── */}
      <section style={{ padding: "80px 0", borderBottom: "1px solid var(--border-subtle)" }}>
        <C>
          <SectionLabel number="1" text="Conference Tracks / Sub Themes" />
          <h2 className="font-display" style={{ fontWeight: 800, color: "var(--text-primary)", fontSize: "clamp(22px,3vw,36px)", marginBottom: 40 }}>
            Research <span className="font-serif text-gold" style={{ fontStyle: "italic" }}>Tracks</span>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {tracks.map((track, ti) => (
              <div key={ti} className="card-dark" style={{ padding: "22px 28px" }}>
                <p className="font-display" style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: 14, marginBottom: 14, paddingBottom: 12, borderBottom: "1px solid var(--border-subtle)" }}>{track.title}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {track.subtracks.map((st, si) => (
                    <BulletItem key={si} roman={ROMAN[si]}>{st}</BulletItem>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </C>
      </section>

      {/* ── Benefits + Dates + Fees ── */}
      <section style={{ padding: "80px 0", borderBottom: "1px solid var(--border-subtle)" }}>
        <C>
          <div style={{ display: "grid", gap: 48 }} className="two-col">

            {/* LEFT column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

              {/* Benefits */}
              <div>
                <SectionLabel number="2" text="Benefit for Submitting Paper and Presenting" />
                <Card>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {[
                      "This conference provides you with a unique opportunity to share your story and your research interest with a global audience of women, men, academia, activists, scholars, politicians, policymakers, journalists, social media, etc.",
                      "All presenters will receive a certificate of presentation.",
                      "All papers will be published in the Conference Proceedings with ISBN-number.",
                      "Some papers will be selected for submitting an adapted version in journals.",
                      "The outstanding papers will be peer-reviewed for publication in a Special Issue Journal publication or for publication as Chapters in an Edited Book on Gender, Humanitarian, and Development to be published by international publishers (both a printed book and an online version).",
                    ].map((b, i) => (
                      <BulletItem key={i} roman={ROMAN[i]}>{b}</BulletItem>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Who to attend */}
              <div>
                <SectionLabel number="3" text="Who to Attend" />
                <Card accent>
                  <p style={{ color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.8 }}>
                    Anyone from Junior, Middle, and Senior Academics, professionals, administrators, and policymakers from Nigerian Universities, Polytechnics and Colleges of Education, Ministries of Education, and education agencies. Also, presenters and participants from the global north and other global south nations especially African countries are welcomed.
                  </p>
                </Card>
              </div>

              {/* Abstract Submission */}
              <div>
                <SectionLabel number="5" text="Abstract Submission" />
                <Card>
                  <p style={{ color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.8 }}>
                    Thank you for your interest in submitting an abstract to the CGHDS/IC2025 Conference, to be held on 10th&ndash;14th November 2025 in Ede, Nigeria. To submit your abstract, please click{" "}
                    <GoldLink href="https://docs.google.com/forms/d/1WX5sBFbHgoW_PuurfmggcvUZc2GFVT6TRujRRP7qeb0/edit?pli=1">here</GoldLink>.
                  </p>
                </Card>
              </div>

              {/* Full Paper Submission */}
              <div>
                <SectionLabel number="6" text="Full Paper Submission Template" />
                <Card>
                  <p style={{ color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.8, marginBottom: 16 }}>
                    All full paper submissions will be peer-reviewed and evaluated based on originality, technical and/or research depth, accuracy, and relevance with the theme of the conference. Submitted abstracts will be evaluated by the Scientific Committee. All submissions should report original and previously unpublished research results. Detailed instructions and full paper submission guidelines will be emailed within a few weeks following the conference. Manuscripts should meet the format set by the Conference committee and are subject to review. Kindly click{" "}
                    <GoldLink href="http://cghds.run.edu.ng/CGHDS_Conference_Paper_Template_2025.docx - Google Docs.pdf">here</GoldLink>{" "}
                    to download a paper template to guide your paper writing format.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 8, borderTop: "1px solid var(--border-subtle)" }}>
                    <p style={{ color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.7 }}>
                      &bull; Please send an abstract of no more than 300 words and a short CV.
                    </p>
                    <p style={{ color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.7 }}>
                      &bull; Please submit your papers by clicking{" "}
                      <GoldLink href="https://docs.google.com/forms/d/1WX5sBFbHgoW_PuurfmggcvUZc2GFVT6TRujRRP7qeb0/edit?pli=1">here</GoldLink>.
                    </p>
                  </div>
                </Card>
              </div>
            </div>

            {/* RIGHT column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

              {/* Important Dates */}
              <div>
                <SectionLabel number="4" text="Important Dates" />
                <Card>
                  <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                    {[
                      { label: "Abstracts Submission Due", date: "July 30, 2025" },
                      { label: "Abstracts Acceptance Confirmation Due", date: "August 30, 2025" },
                      { label: "Full Papers' or Extended Summary Submission Due", date: "January 31, 2026" },
                      { label: "Papers' Notification of Acceptance & Review Comments Due", date: "March 31, 2026" },
                      { label: "Final Papers' Submission Due", date: "April 30, 2026" },
                    ].map((d, i, arr) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, padding: "14px 0", borderBottom: i < arr.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
                        <p style={{ color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.5 }}>{d.label}</p>
                        <p className="font-display" style={{ color: "var(--gold)", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0 }}>{d.date}</p>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", gap: 8 }}>
                    <p style={{ color: "var(--text-muted)", fontSize: 12, lineHeight: 1.6 }}>
                      Authors interested in peer review should submit their abstracts and papers according to the dates indicated above. Deadlines are strict &mdash; no extension is foreseen.
                    </p>
                    <p style={{ color: "var(--text-secondary)", fontSize: 13 }}>
                      Submit full paper to:{" "}
                      <GoldLink href="mailto:cghdsinternationalconference@run.edu.ng">cghdsinternationalconference@run.edu.ng</GoldLink>
                    </p>
                  </div>
                </Card>
              </div>

              {/* Registration Fee Guidelines */}
              <div>
                <SectionLabel number="7" text="Guidelines to Select the Registration Fee" />
                <Card style={{ marginBottom: 12 }}>
                  <p className="font-display" style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: 13, marginBottom: 12 }}>Categories of Registration / Presentation / Publication Fees</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <p style={{ color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.7 }}><span style={{ color: "var(--gold)", fontWeight: 600 }}>Delegate/Student:</span> If you are an Oral Presenter or Poster Presenter you should register as a Delegate/Student.</p>
                    <p style={{ color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.7 }}><span style={{ color: "var(--gold)", fontWeight: 600 }}>Attendee/Non-Presenter:</span> If you are a Listener you should register as an Attendee/Non-Presenter.</p>
                    <p style={{ color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.7 }}><span style={{ color: "var(--gold)", fontWeight: 600 }}>Citizenship:</span> The Registration Fee is based on your Citizenship, not Nationality.</p>
                  </div>
                </Card>

                {/* Fee tables */}
                {[
                  {
                    group: "Academics and Other Participants",
                    fees: [
                      "Conference Fee: \u20a650,000",
                      "Feeding and Souvenir: \u20a630,000",
                      "Gala Night (Executive Collaboration and Networking Dinner): $15 / \u20a620,000",
                      "Tourism (International Museum and Monument): \u20a630,000",
                      "Publications: \u20a650,000",
                    ],
                    pubs: ["Book of Abstracts: ISSN, ISBN, DOI", "Journal: ISBN & DOI", "Edited Book: ISSN, ISBN, DOI", "Conference Proceedings: ISSN, ISBN, DOI"],
                  },
                  {
                    group: "Students Rate",
                    fees: [
                      "Conference Fee: \u20a625,000",
                      "Feeding and Souvenir: \u20a615,000",
                      "Gala Night: \u20a610,000",
                      "Tourism (International Museum and Monument): \u20a610,000",
                      "Publications: \u20a650,000",
                    ],
                    pubs: ["Book of Abstracts: ISSN, ISBN, DOI", "Journal: ISBN & DOI", "Edited Book: ISSN, ISBN, DOI", "Conference Proceedings: ISSN, ISBN, DOI"],
                  },
                  {
                    group: "International Participants",
                    fees: [
                      "Conference Fee and Publication: $350 (including tea breaks and souvenir)",
                      "Gala Night (Executive Collaboration and Networking Dinner): $50",
                      "Tourism (International Museum and Monument): $70",
                      "Virtual Participants: $250",
                    ],
                    pubs: null,
                  },
                ].map((group, gi) => (
                  <div key={gi} className="card-dark" style={{ padding: 20, marginBottom: 10 }}>
                    <p className="font-display" style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: 13, marginBottom: 12, paddingBottom: 10, borderBottom: "1px solid var(--border-subtle)" }}>
                      {group.group}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {group.fees.map((fee, fi) => (
                        <p key={fi} style={{ color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.6 }}>&bull; {fee}</p>
                      ))}
                    </div>
                    {group.pubs && (
                      <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid var(--border-subtle)" }}>
                        <p style={{ color: "var(--text-muted)", fontSize: 11, marginBottom: 6, fontFamily: "Syne, sans-serif", textTransform: "uppercase", letterSpacing: "0.08em" }}>Publications include:</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                          {group.pubs.map((pub, pi) => (
                            <p key={pi} style={{ color: "var(--text-muted)", fontSize: 12, lineHeight: 1.6 }}>&ndash; {pub}</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </C>
      </section>

      {/* ── Bank Details ── */}
      <section style={{ padding: "80px 0" }}>
        <C>
          <SectionLabel number="8" text="Bank Account Details" />
          <h2 className="font-display" style={{ fontWeight: 800, color: "var(--text-primary)", fontSize: "clamp(22px,3vw,36px)", marginBottom: 36 }}>
            Payment <span className="font-serif text-gold" style={{ fontStyle: "italic" }}>Information</span>
          </h2>
          <div className="card-dark" style={{ padding: 32, maxWidth: 680 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {[
                { label: "Bank Name", value: "Access Bank" },
                { label: "Account Holder's Name", value: "Centre for Gender, Humanitarian and Development Studies" },
                { label: "Local Currency Account Number", value: "1884019225" },
                { label: "USD ($) Account Number", value: "1890265083" },
                { label: "Euro Account Number", value: "1912522651" },
                { label: "British Pounds Account Number", value: "1895964240" },
                { label: "Sort Code", value: "044293459" },
                { label: "Swift Code", value: "CITIUS33 (USD), CITIGB2L (POUNDS), & CITIGB2L (EURO)" },
              ].map((row, i, arr) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24, padding: "14px 0", borderBottom: i < arr.length - 1 ? "1px solid var(--border-subtle)" : "none", flexWrap: "wrap" }}>
                  <p style={{ color: "var(--text-muted)", fontSize: 12, fontFamily: "Syne, sans-serif" }}>{row.label}</p>
                  <p className="font-display" style={{ color: "var(--text-primary)", fontSize: 13, fontWeight: 600, textAlign: "right" }}>{row.value}</p>
                </div>
              ))}
            </div>
          </div>
        </C>
      </section>

    </div>
  )
}
