import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

const C = ({ children, style = {} }) => (
  <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", ...style }}>{children}</div>
)

const SL = ({ text }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
    <div style={{ width: 32, height: 2, background: "var(--gold)" }} />
    <p className="section-label" style={{ fontSize: 10 }}>{text.toUpperCase()}</p>
  </div>
)

const H2 = ({ children }) => (
  <h2 className="font-display" style={{ fontWeight: 800, color: "var(--text-primary)", fontSize: "clamp(20px,2.5vw,30px)", marginBottom: 20, paddingBottom: 12, borderBottom: "1px solid var(--border-subtle)" }}>
    {children}
  </h2>
)

const H3 = ({ children }) => (
  <h3 className="font-display" style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: 16, marginBottom: 12, marginTop: 24 }}>
    {children}
  </h3>
)

const P = ({ children }) => (
  <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.85, marginBottom: 14 }}>{children}</p>
)

const Bold = ({ children }) => <strong style={{ color: "var(--text-primary)", fontWeight: 700 }}>{children}</strong>

const Bullet = ({ items }) => (
  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px 0", display: "flex", flexDirection: "column", gap: 8 }}>
    {items.map((item, i) => (
      <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <span style={{ color: "var(--gold)", flexShrink: 0, marginTop: 4, fontSize: 8 }}>&#9679;</span>
        <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.75, margin: 0 }}>{item}</p>
      </li>
    ))}
  </ul>
)

export function PreConferencePage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}>

      {/* Hero */}
      <section style={{ position: "relative", paddingTop: 140, paddingBottom: 80, overflow: "hidden" }}>
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
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, border: "1px solid var(--border-gold-dim)", borderRadius: 999, padding: "6px 18px", background: "var(--gold-bg)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)" }} />
              <span className="font-display" style={{ color: "var(--gold)", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase" }}>Workshop &middot; 21 October 2025</span>
            </div>
          </div>
          <h1 className="font-display" style={{ fontWeight: 800, color: "var(--text-primary)", lineHeight: 1, fontSize: "clamp(28px, 4.5vw, 64px)", marginBottom: 28, textAlign: "center" }}>
            Pre-conference Workshop<br />
            <span className="font-serif text-gold" style={{ fontStyle: "italic", fontSize: "0.85em" }}>Presentation</span>
          </h1>
          <div className="card-dark" style={{ maxWidth: 680, margin: "0 auto", padding: "20px 28px", borderLeft: "3px solid var(--gold)", textAlign: "center" }}>
            <p className="font-display" style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: 16, marginBottom: 6 }}>Prof. Isaac Olawale Albert</p>
            <p style={{ color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.6 }}>
              Department of Peace, Security and Humanitarian Studies<br />
              Faculty of Multidisciplinary Studies, University of Ibadan
            </p>
          </div>
        </C>
      </section>

      {/* Main Content */}
      <section style={{ padding: "72px 0 96px" }}>
        <C>
          <div className="card-dark" style={{ padding: "40px 48px", marginBottom: 40 }}>
            <h1 className="font-display" style={{ fontWeight: 800, color: "var(--text-primary)", fontSize: "clamp(22px,3vw,38px)", lineHeight: 1.2, marginBottom: 8 }}>
              Social Construction of Gender,<br />
              <span className="font-serif text-gold" style={{ fontStyle: "italic" }}>Humanitarianism and Development</span>
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: 13, fontFamily: "Syne, sans-serif" }}>Delivered on 21 October 2025</p>
          </div>

          {/* Concepts */}
          <section style={{ marginBottom: 48 }}>
            <SL text="Concepts" />
            <div className="card-dark" style={{ padding: "28px 36px" }}>
              <P><Bold>Gender</Bold> refers to the social, cultural, and behavioral attributes, expectations, and roles associated with being male, female, or non-binary. It is distinct from biological sex and emphasizes identity, power relations, and social norms shaping experiences and opportunities.</P>
              <P><Bold>Humanitarianism</Bold> is the principle and practice of providing assistance and relief to people suffering from emergencies, crises, conflicts, or disasters. It focuses on saving lives, alleviating suffering, and maintaining human dignity without discrimination.</P>
              <P><Bold>Development</Bold> refers to a process of change that improves the well-being and quality of life of people over time. It encompasses human development such as expanding people&apos;s choices and opportunities, as well as economic, social, political, and cultural dimensions aimed at sustainable progress and equity.</P>
            </div>
          </section>

          {/* Social Construction of Gender */}
          <section style={{ marginBottom: 48 }}>
            <H2>Social construction of gender</H2>
            <P>The social construction of gender is a theory in the humanities and social sciences which posits that gender is not biologically innate but rather created and maintained through social interactions, cultural norms, and institutional practices. It emphasizes that gender roles and identities are learned and performed based on societal expectations rather than fixed biological differences.</P>
            <P>From birth, individuals are assigned a sex category, often based on genitalia, and are subsequently socialized through family, education, media, and peer interactions into gender roles that dictate appropriate behaviors, appearances, and responsibilities for men and women. This process is ongoing, with people continuously held accountable by society for conforming to or deviating from these gender norms.</P>
            <P>Gender is viewed as an &ldquo;achieved status,&rdquo; shaped by socialization, power relations, and cultural contexts, which can vary widely across different societies and historical periods. For example, in many cultures, men are expected to take on roles involving work outside the home, while women are often assigned domestic duties. However, these roles are not fixed and are subject to change as cultural meanings and social expectations evolve.</P>
            <P>The theory also points out that gender intersects with other social categories and inequalities, such as race and class, influencing how different people experience gender. In summary, according to Butler, gender performativity involves the stylized repetition of acts that create and sustain gender identities, showing gender to be a fluid and dynamic social construct rather than a biological given. This theory challenges essentialist and binary views of gender and highlights its contingent and constructed nature.</P>

            <H3>Judith Butler</H3>
            <P>Judith Butler defined gender performativity as the concept that gender is not a fixed or innate identity but rather something that is produced and constituted through repeated social performances and acts. In her 1990 book <em>Gender Trouble</em>, Butler argues that gender is what one &ldquo;does&rdquo; rather than what one &ldquo;is.&rdquo;</P>
            <P>These acts include ways of walking, talking, dressing, and comporting oneself that are socially sanctioned and repeated over time, thereby creating the illusion of a stable gender identity. Butler emphasizes that gender performativity is not a singular act but a continual, ritualized repetition of behaviors and expressions, enforced by social expectations and norms. This repetition produces and maintains the categories of &ldquo;man&rdquo; and &ldquo;woman,&rdquo; making them appear natural and fixed, though they are actually socially constructed.</P>
            <P>She also stresses that there is no &ldquo;true&rdquo; gender identity beneath these acts &mdash; gender exists only to the extent that it is performed and socially recognized.</P>
          </section>

          {/* Humanitarianism in armed conflict */}
          <section style={{ marginBottom: 48 }}>
            <H2>Humanitarianism in armed conflict and non armed conflict situations</H2>
            <H3>Humanitarianism in armed conflict</H3>
            <P>Humanitarianism in armed conflict situations primarily operates under the framework of International Humanitarian Law (IHL), which distinguishes between international armed conflicts and non-international armed conflicts. In armed conflicts, humanitarian action focuses on protecting civilians and those hors de combat (such as wounded fighters and prisoners of war) by ensuring the provision of food, medical supplies, and other relief aid, often requiring negotiation with parties to the conflict for access and safe passage. Humanitarian actors work to uphold principles such as distinction (between civilians and combatants), precaution, and proportionality to mitigate harm to civilians amid violence. This involves active engagement with armed actors to limit civilian suffering and displacement.</P>
            <H3>Beyond armed conflict</H3>
            <P>In contrast, humanitarianism in non-armed conflict situations is generally broader and not legally constrained by the specific rules of IHL. It involves responding to crises such as natural disasters, epidemics, or socio-economic emergencies, where there is no organized violence or combat. The focus is on relief, recovery, and development support without the legal imperatives or access challenges posed by combatants. Humanitarian actors do not need to negotiate with armed parties for access, and the protection principles are guided by human rights and humanitarian principles rather than the laws of war.</P>
            <P>Thus, the key differentiation lies in legal frameworks, operational challenges, and protection mechanisms: armed conflict humanitarianism is governed by IHL and involves working amid violence with armed parties, while non-armed conflict humanitarianism is oriented around neutral crisis response without the added complexity of war and security concerns.</P>
          </section>

          {/* Linking Social Construction of Gender and Humanitarianism */}
          <section style={{ marginBottom: 48 }}>
            <H2>Linking Social Construction of Gender and Humanitarianism</H2>
            <H3>Frameworks</H3>
            <Bullet items={[
              "Social Construction of Gender influences how individuals experience violence, discrimination, exclusion, power dynamics, and societal roles.",
              "Violence and discrimination differentiated by gender increase vulnerability to specific humanitarian needs.",
              "Gender roles and power relations shape access to resources and participation in decision-making processes.",
              "These elements determine humanitarian needs and vulnerabilities.",
            ]} />

            <H2>Causes and Effects in Humanitarian Context</H2>
            <H3>Causes of Vulnerability Based on Gender:</H3>
            <Bullet items={["Patriarchy and unequal power structures", "Social norms and cultural beliefs reinforcing marginalization", "Historical and systemic discrimination"]} />
            <H3>Consequences for Humanitarianism:</H3>
            <Bullet items={[
              "Distinct needs for people of different genders (women, men, LGBTQ+)",
              "Differential impact of crises (e.g., violence against women, child soldiers)",
              "Need for gender-sensitive response and development programs",
            ]} />
          </section>

          {/* Principles of Humanitarianism */}
          <section style={{ marginBottom: 48 }}>
            <H2>Principles of Humanitarianism</H2>
            <H3>Principles</H3>
            <Bullet items={[
              "Inclusion and participation of all genders in program design and implementation",
              "Addressing root causes of gender inequality and violence",
              "Developing gender-transformative programs that aim at structural change",
              "Ensuring equitable access to resources and services",
              "Enhancing protection mechanisms tailored explicitly to gendered vulnerabilities",
              "Building capacity on conflict sensitivity and power relations for humanitarian actors",
            ]} />
            <H3>Outcomes</H3>
            <P>Gender-aware humanitarian policies lead to improved protection, empowerment, and resilience of affected populations. These programs can reduce the impact of conflict, displacement, and poverty through transformative gender-responsive approaches.</P>
          </section>

          {/* Three primary approaches */}
          <section style={{ marginBottom: 48 }}>
            <H2>Three primary approaches frame gender considerations in humanitarianism</H2>
            <P><Bold>The Basic Needs Approach</Bold> focuses on ensuring equal access and protection for women and men, addressing gender as a vulnerability factor requiring immediate aid.</P>
            <P><Bold>The Instrumental Approach</Bold> emphasizes women&apos;s participation to enhance the effectiveness and results of humanitarian programs without necessarily challenging existing gender norms.</P>
            <P><Bold>The Developmental Approach</Bold> views gender as embedded in structural power relations and promotes transformative change. It sees emergencies as opportunities to challenge gender inequality and traditional social norms, linking gender equality to long-term development, peacebuilding, and societal transformation. This developmental perspective advocates humanitarian interventions beyond immediate aid, aiming for sustainable gender equality and empowerment by addressing cultural and systemic discrimination. It connects humanitarian gender work with broader goals of democratic governance, peace, and social justice, although it can also face resistance when local cultural norms are perceived as inferior or opposed to international gender equality standards.</P>
            <P>More recently, there has been a push toward inclusive gender-transformative change in humanitarian action, centering on addressing root structural causes of inequality and prioritizing marginalized groups, including women, youth, LGBTQI+ individuals, indigenous peoples, and displaced populations. This approach aims for justice, equality, and sustainable peace by integrating gender into all aspects of humanitarian and development policy and programming.</P>
            <P>Thus, recognizing gender as a social construct in humanitarianism and development is fundamental for designing effective, equitable, and sustainable interventions that promote gender equality and empowerment while respecting local contexts and aiming for systemic change.</P>
          </section>

          {/* Linking Social Construction of Gender and Development */}
          <section style={{ marginBottom: 48 }}>
            <H2>Linking Social Construction of Gender and Development</H2>
            <H3>Core Issues</H3>
            <Bullet items={[
              "Gender as a Social Construct: Gender is understood not as a fixed biological trait but as a set of socially constructed roles, behaviors, and expectations assigned to people based on their perceived sex. This shapes identities and power relations.",
              "Implications for Development: Because gender roles and expectations are culturally and socially defined, development efforts must engage with these local norms to effectively address inequalities. Ignoring the social construction of gender risks reinforcing existing disparities.",
              "Intersectionality: Gender intersects with other social identities such as class, ethnicity, age, and displacement status. Development programs must consider these overlapping identities for nuanced and effective interventions.",
            ]} />
            <H3>Core Issues</H3>
            <Bullet items={[
              "Transformative Development Programming: Effective development work moves beyond addressing women's needs alone. It seeks to transform harmful gender norms and power imbalances to achieve equitable and sustainable outcomes.",
              "Humanitarian Link: Similarly, humanitarian responses have to be gender-sensitive, recognizing how gender shapes vulnerability, access to resources, and social roles in crisis settings.",
              "Policy and Practice: Incorporating gender analysis and community participation ensures that development programs are inclusive and contribute to gender justice. These emphasise a holistic, context-specific approach to gender in development, emphasizing empowerment, social change, and intersectional awareness.",
            ]} />
          </section>

          {/* Framework for integrating gender analysis */}
          <section style={{ marginBottom: 48 }}>
            <H2>Framework for integrating gender analysis in development project design</H2>
            <H3>What?</H3>
            <P>A framework for integrating gender analysis in development project design systematically examines gender roles, relations, norms, inequalities, and power dynamics to ensure responsiveness to diverse needs and promote gender equality. The process starts with a gender analysis that identifies the different roles, needs, constraints, and power levels of women, men, girls, boys, and sexual and gender minorities within the project context. This analysis guides the entire project cycle from planning, proposal development, design, implementation, monitoring, and evaluation.</P>
            <H3>Key elements</H3>
            <Bullet items={[
              "Assessing gender norms and inequalities that influence project outcomes.",
              "Understanding how gender relations intersect with social, economic, political, cultural, and legal factors.",
              "Identifying obstacles to equal participation and benefits for all genders.",
              "Engaging relevant stakeholders such as women's organizations and community groups.",
              "Incorporating strategies to transform unequal gender dynamics.",
              "Budgeting and planning for gender integration early in project design.",
              "Ensuring ongoing monitoring of gender-related outcomes throughout the project.",
            ]} />

            <H2>Framework for integrating gender analysis (ii)</H2>
            <H3>Frameworks</H3>
            <P>Popular frameworks to guide gender analysis include the Women in Development (WID) framework focusing on women&apos;s economic roles, and the Gender and Development (GAD) framework which emphasizes transforming unequal power relations. Tools like the FHI 360 Gender Integration Framework recommend locally relevant gender analysis to inform project proposals, including assessment of policy contexts, stakeholder environments, and potential unintentional effects on gender status.</P>
            <P>Effectively integrating gender involves proposing activities that build capacity, transform gender norms, and track impacts on gender equality. A gender focal point on project teams can help maintain focus across project components. This integration ensures projects are inclusive, equitable, and sustainable by considering gender as a cross-cutting issue.</P>
            <H3>Core tasks</H3>
            <P>In summary, a gender integration framework in development project design should:</P>
            <Bullet items={[
              "Begin with a comprehensive gender analysis.",
              "Incorporate findings at every project stage.",
              "Engage diverse stakeholders.",
              "Address structural inequalities.",
              "Build gender-transformative activities.",
              "Monitor and adapt based on gender-specific impacts.",
            ]} />
            <P>This approach leads to development outcomes that better address the needs and ambitions of all genders, fostering inclusive progress.</P>
          </section>

          {/* Critical Insights */}
          <section style={{ marginBottom: 48 }}>
            <H2>Critical Insights and Value Added in &ldquo;Social Construction of Gender, Humanitarianism and Development&rdquo;</H2>
            <Bullet items={[
              "Contextualising Gender Roles: Understanding how gender roles and identities are shaped by social, cultural, and political processes rather than being fixed or natural.",
              "Highlighting Inequalities: Reveals structural inequalities that affect access to resources, power dynamics, and decision-making in development and humanitarian contexts.",
              "Enhancing Policy and Programming Effectiveness: Integrates gender perspectives to improve the design and implementation of development projects and humanitarian interventions.",
              "Uncovering Power Relations: Analyses how gender relations intersect with other social categories such as class, ethnicity, and age to shape experiences and outcomes.",
              "Promoting Inclusion and Participation: Encourages inclusive approaches that involve marginalized gender groups in development and humanitarian decision-making processes.",
              "Questioning Universal Approaches: Critiques one-size-fits-all models and advocates for context-specific gender analyses.",
              "Bridging Theory and Practice: Connects academic gender theory to practical challenges in humanitarian and development work, fostering more nuanced and effective responses.",
              "Empowering Women and Gender Minorities: Supports strategies aimed at empowering oppressed genders in societal transformation and development initiatives.",
            ]} />
          </section>

          {/* Present Nigerian scenarios */}
          <section style={{ marginBottom: 48 }}>
            <H2>Present Nigerian scenarios make development impossible</H2>
            <P>Crises facing the nation include:</P>
            <Bullet items={["Boko Haram crisis", "Banditry", "Killer herder crisis", "Environmental crisis", "Urban violence", "Cultism and youth militancy"]} />
          </section>

          {/* Responding */}
          <section style={{ marginBottom: 8 }}>
            <H2>Responding: Multitrack Diplomacy</H2>
            <P>Multitrack Diplomacy refers to the multiple pathways and actors involved in peacebuilding and conflict resolution beyond just government-to-government negotiations. It includes civil society, academia, business, media, religion, and private citizens working together to resolve conflicts and build sustainable peace in complex situations like those described above.</P>
          </section>

        </C>
      </section>
    </div>
  )
}
