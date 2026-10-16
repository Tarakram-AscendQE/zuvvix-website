import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HeadMeta } from '@/components/seo/HeadMeta'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useModal } from '@/context/ModalContext'

export function QualityMandate() {
  useScrollReveal()
  const { openFollow } = useModal()

  useEffect(() => {
    const grid = document.getElementById('anatGrid') || document.getElementById('qmGrid')
    const svg = document.getElementById('anatLines') || document.getElementById('qmLines')
    const core = document.getElementById('anatCore') || document.getElementById('qmCore')
    if (!grid || !svg || !core) return

    const els = grid.querySelectorAll('.el[data-k]')
    const paths: Record<string, SVGPathElement> = {}

    function draw() {
      if (!grid || !svg || !core || getComputedStyle(svg).display === 'none') return
      const g = grid.getBoundingClientRect()
      const c = core.getBoundingClientRect()
      svg.setAttribute('viewBox', `0 0 ${g.width} ${g.height}`)
      let out = ''
      els.forEach((el) => {
        const r = el.getBoundingClientRect()
        const k = el.getAttribute('data-k')
        let x1: number, y1: number, x2: number, y2: number
        const cy = c.top + c.height / 2 - g.top
        if (r.right <= c.left) {
          x1 = r.right - g.left
          y1 = r.top + r.height / 2 - g.top
          x2 = c.left - g.left
          y2 = cy
        } else if (r.left >= c.right) {
          x1 = r.left - g.left
          y1 = r.top + r.height / 2 - g.top
          x2 = c.right - g.left
          y2 = cy
        } else {
          x1 = r.left + r.width / 2 - g.left
          y1 = r.top - g.top
          x2 = x1
          y2 = c.bottom - g.top
        }
        out += `<path data-k="${k}" d="M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}"/>`
      })
      svg.innerHTML = out
      svg.querySelectorAll('path').forEach((p) => {
        const k = p.getAttribute('data-k')
        if (k) paths[k] = p as SVGPathElement
      })
    }

    function hi(k: string, on: boolean) {
      const el = grid?.querySelector(`.el[data-k="${k}"]`)
      if (el) el.classList.toggle('hi', on)
      if (paths[k]) paths[k].classList.toggle('hi', on)
    }

    els.forEach((el) => {
      const k = el.getAttribute('data-k')
      if (!k) return
      el.addEventListener('mouseenter', () => hi(k, true))
      el.addEventListener('focus', () => hi(k, true))
      el.addEventListener('mouseleave', () => hi(k, false))
      el.addEventListener('blur', () => hi(k, false))
    })

    draw()
    window.addEventListener('resize', draw)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(draw)
    }

    return () => {
      window.removeEventListener('resize', draw)
    }
  }, [])

  return (
    <>
      <HeadMeta
        title="Quality Mandate | Zuvvix"
        description="A Zuvvix Quality Mandate is a bounded quality responsibility with explicit scope, authority, evidence requirements, service levels and exclusions."
        canonicalPath="/quality-mandate/"
      />
      

{/*  01 HERO  */}
<section className="qm-hero" id="top" aria-labelledby="h1">
  <div className="wrap qm-hero-grid">
    <div>
      <p className="eyebrow">Quality Mandate</p>
      <h1 className="h1" id="h1">Delegate a responsibility. Not a testing workload.</h1>
      <p className="lede">A Zuvvix Quality Mandate defines the quality responsibility Zuvvix accepts, where it begins and ends, what Zuvvix is authorized to do, what evidence it must produce, and how its performance is measured.</p>
      <p className="founding"><span className="label">Founding principle</span><b>Responsibility, not automation, is the product.</b></p>
      <div className="cta-row">
        <a className="btn btn-primary" href="/continuous-release-assurance/">See a mandate in action</a>
        <a className="btn btn-quiet" href="/design-partnership/">Explore a design partnership</a>
      </div>
    </div>
    <aside className="defbox" aria-labelledby="def-h">
      <span className="label" id="def-h">In plain English</span>
      <p className="big">A Quality Mandate is an agreed, bounded quality responsibility.</p>
      <p>It tells both sides what Zuvvix is responsible for, what enterprise context and access are required, what actions are permitted, what evidence must support conclusions, what remains outside scope, and what service commitments apply.</p>
      <div className="canon"><span className="label">Canonical language</span><p style={{ color: 'var(--navy)', fontWeight: '500' }}>A Quality Mandate defines the responsibility, scope, authority, evidence requirements and service levels Zuvvix accepts.</p></div>
      <details>
        <summary>Read the formal operating definition</summary>
        <p>A mandate is a contracted or agreed bounded quality responsibility containing scope, obligations, service levels, authority, exclusions, owners, dependencies and evidence expectations. It is persistent enough to be operated repeatedly, while individual Assignments are created for bounded changes or release objectives underneath it.</p>
      </details>
    </aside>
  </div>
</section>

{/*  02 UNIT OF VALUE  */}
<section className="sec tint" id="unit" aria-labelledby="h-uv">
  <div className="wrap">
    <p className="kicker"><span className="idx">02</span><span className="label">Unit of value</span></p>
    <h2 className="h2" id="h-uv">What changes commercially.</h2>
    <div className="uv" role="table" aria-label="Quality by Activity compared with Quality by Accountability">
      <div className="uv-row h" role="row"><span className="a" role="columnheader">Quality by Activity</span><span aria-hidden="true"></span><span className="b" role="columnheader">Quality by Accountability</span></div>
      <div className="uv-row" role="row"><span className="a" role="cell">Tester capacity</span><span className="ar" aria-hidden="true"></span><span className="b" role="cell">Accepted responsibility</span></div>
      <div className="uv-row" role="row"><span className="a" role="cell">Test cases executed</span><span className="ar" aria-hidden="true"></span><span className="b" role="cell">Evidence established</span></div>
      <div className="uv-row" role="row"><span className="a" role="cell">Automation percentage</span><span className="ar" aria-hidden="true"></span><span className="b" role="cell">Qualified work performed</span></div>
      <div className="uv-row" role="row"><span className="a" role="cell">Agent count</span><span className="ar" aria-hidden="true"></span><span className="b" role="cell">Competence and authority</span></div>
      <div className="uv-row" role="row"><span className="a" role="cell">Defect volume</span><span className="ar" aria-hidden="true"></span><span className="b" role="cell">Material conditions violated</span></div>
      <div className="uv-row" role="row"><span className="a" role="cell">Pass/fail dashboard</span><span className="ar" aria-hidden="true"></span><span className="b" role="cell">Readiness with explicit uncertainty</span></div>
      <div className="uv-row" role="row"><span className="a" role="cell">Effort consumed</span><span className="ar" aria-hidden="true"></span><span className="b" role="cell">Mandate performance</span></div>
    </div>
    <div className="co"><span className="label">Category shift</span><p>The customer is not buying tester headcount, a swarm of AI agents or execution volume. The customer is delegating a responsibility that Zuvvix must discharge with evidence.</p></div>
  </div>
</section>

{/*  03 ANATOMY (ZW-06A)  */}
<section className="sec" id="anatomy" aria-labelledby="h-an">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">03</span><span className="label">Anatomy of a Quality Mandate</span></p>
      <h2 className="h2" id="h-an" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>A mandate makes responsibility explicit.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>Six visible elements inside one accountability frame. The boundary is part of the product—not fine print.</p>
    </div>
    <div className="anat" data-anim id="anat">
      <span className="anat-lab">ACCOUNTABILITY FRAME</span>
      <div className="anat-grid" id="anatGrid">
        <svg className="lines" id="anatLines" aria-hidden="true"></svg>
        <div className="core" id="anatCore"><span className="label">QUALITY MANDATE</span><b>A bounded quality responsibility</b><span>Measured against what Zuvvix accepts.</span></div>
        <div className="el" data-k="r" tabIndex={0}><span className="label">RESPONSIBILITY</span><b>What outcome or assessment Zuvvix accepts.</b><p>The outcome or assessment Zuvvix agrees to own within the mandate.</p></div>
        <div className="el" data-k="s" tabIndex={0}><span className="label">SCOPE</span><b>Journeys, systems, changes and conditions included.</b><p>The journeys, systems, change stream and conditions to which the responsibility applies.</p></div>
        <div className="el" data-k="a" tabIndex={0}><span className="label">AUTHORITY</span><b>What Zuvvix may observe, validate or change.</b><p>What Zuvvix may observe, validate or change—and under what controls.</p></div>
        <div className="el" data-k="e" tabIndex={0}><span className="label">EVIDENCE</span><b>What must be established and how it is supported.</b><p>What must be established before a material conclusion is defensible.</p></div>
        <div className="el" data-k="l" tabIndex={0}><span className="label">SERVICE LEVELS</span><b>Timing and operating commitments.</b><p>The timing and operating commitments attached to the mandate.</p></div>
        <div className="el" data-k="x" tabIndex={0}><span className="label">EXCLUSIONS</span><b>What remains outside the mandate.</b><p>What remains explicitly outside Zuvvix responsibility or depends on customer/third-party action.</p></div>
      </div>
    </div>
    <p className="caption" style={{ marginTop: '14px' }}>The frame is accountability. The six elements are conditions of the responsibility, not product modules.</p>
  </div>
</section>

{/*  04 BOUNDARY (ZW-06B)  */}
<section className="sec tint" id="boundary" aria-labelledby="h-bd">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">04</span><span className="label">Responsibility boundary</span></p>
      <h2 className="h2" id="h-bd" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>Boundaries are a product feature.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>A mandate without explicit boundaries creates false confidence and unmanageable risk. Zuvvix therefore records responsibility, customer authority, technical execution permissions, exclusions and unresolved dependencies separately.</p>
    </div>
    <div className="bd">
      <div className="bd-own">
        <span className="label">Within the Quality Mandate</span>
        <h3>Zuvvix owns the quality of the assessment</h3>
        <ul>
          <li>Identify relevant change information and determine whether context is sufficient.</li>
          <li>Assess potential impact across business journeys, systems, interfaces, data and controls.</li>
          <li>Determine the appropriate assurance scope.</li>
          <li>Perform assurance work only through authorized and qualified capabilities.</li>
          <li>Coordinate approved existing enterprise assurance capabilities where necessary.</li>
          <li>Investigate failures rather than treating every failed check as a product defect.</li>
          <li>Check whether evidence is sufficient for material conclusions.</li>
          <li>Expose unresolved material uncertainty.</li>
          <li>Assemble the Zuvvix Assurance Case.</li>
          <li>Issue the evidence-backed readiness assessment.</li>
        </ul>
      </div>
      <div className="bd-bar" aria-hidden="true"></div>
      <p className="bd-bar-m" aria-hidden="true">THE BOUNDARY</p>
      <div className="bd-cus">
        <span className="label">Customer retains</span>
        <h3>Final authority and business ownership</h3>
        <ul>
          <li>Correctness of business intent supplied by the customer.</li>
          <li>Business risk appetite and unresolved business decisions.</li>
          <li>Final production deployment / release authorization.</li>
          <li>Production changes themselves.</li>
          <li>Unauthorized third-party systems or systems with insufficient access.</li>
          <li>Formal regulatory certification or legal compliance opinions unless separately agreed.</li>
          <li>Unobservable or undisclosed dependencies and changes.</li>
          <li>Development remediation, infrastructure repair and out-of-scope defects.</li>
        </ul>
      </div>
    </div>
    <p className="bd-foot">A boundary is a control. Without it, a mandate becomes unmanageable risk.</p>
    <div className="twoco">
      <div className="co dark"><span className="label">Authority principle</span><p>Zuvvix owns the quality of the assessment and the work required under the mandate. It does not initially own the customer’s final release authorization.</p></div>
      <div className="co"><span className="label">Boundary standard</span><p>These boundaries are not legal fine print. They are part of the operating architecture.</p></div>
    </div>
  </div>
</section>

{/*  05 RECURRING OPERATION (ZW-06C)  */}
<section className="sec" id="assignments" aria-labelledby="h-ma">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">05</span><span className="label">Mandate to assignments</span></p>
      <h2 className="h2" id="h-ma" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>One mandate. Repeated assignments. Evidence every time.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>The commercial unit persists; operational work recurs as change happens.</p>
    </div>
    <div className="ma" data-anim aria-label="One persistent mandate with three illustrative assignments">
      <div className="ma-mandate"><span className="label">Quality Mandate</span><b>Continuous Release Assurance for an agreed critical business journey</b></div>
      <div className="ma-cols">
        <div className="ma-col"><span className="dn" aria-hidden="true"></span><div className="asg"><span className="label">CHANGE ASSIGNMENT 01</span><b>A bounded change / release objective</b></div><span className="dn" aria-hidden="true"></span><div className="acs"><b>Assurance Case</b><span>traceable evidence package</span></div><span className="dn" aria-hidden="true"></span><div className="rs rwe">READY WITH EXCEPTIONS</div></div>
        <div className="ma-col"><span className="dn" aria-hidden="true"></span><div className="asg"><span className="label">CHANGE ASSIGNMENT 02</span><b>A bounded change / release objective</b></div><span className="dn" aria-hidden="true"></span><div className="acs"><b>Assurance Case</b><span>traceable evidence package</span></div><span className="dn" aria-hidden="true"></span><div className="rs nr">NOT READY</div></div>
        <div className="ma-col"><span className="dn" aria-hidden="true"></span><div className="asg"><span className="label">CHANGE ASSIGNMENT 03</span><b>A bounded change / release objective</b></div><span className="dn" aria-hidden="true"></span><div className="acs"><b>Assurance Case</b><span>traceable evidence package</span></div><span className="dn" aria-hidden="true"></span><div className="rs ok">READY</div></div>
      </div>
      <p className="ma-learn">Delivery evidence → learning proposal → independent evaluation → qualified improvement for future assignments</p>
      <p className="ma-note">Illustrative outcomes. An assignment can also end INDETERMINATE when the evidence is insufficient.</p>
    </div>
    <dl className="objs">
      <div><dt>Quality Mandate</dt><dd>Persistent agreed responsibility: scope, obligations, authority, evidence, service levels and owners.</dd></div>
      <div><dt>Assignment</dt><dd>One bounded change / release objective created under the mandate.</dd></div>
      <div><dt>Assurance Case</dt><dd>The traceable evidence package produced by an assignment.</dd></div>
      <div><dt>Readiness Assessment</dt><dd>The decision-support output: READY / READY WITH EXCEPTIONS / NOT READY / INDETERMINATE.</dd></div>
      <div><dt>Learning Proposal</dt><dd>A governed proposal to improve knowledge or competence based on delivery evidence; never uncontrolled self-modification.</dd></div>
    </dl>
    <div className="loop9" aria-label="Mandate 01 operating loop">
      <span className="label">Mandate 01 operating loop</span>
      <span className="s first">CHANGE</span><i>→</i><span className="s">UNDERSTAND</span><i>→</i><span className="s">IMPACT</span><i>→</i><span className="s">PLAN</span><i>→</i><span className="s">PREPARE</span><i>→</i><span className="s">ASSURE</span><i>→</i><span className="s">INVESTIGATE</span><i>→</i><span className="s">VERIFY</span><i>→</i><span className="s last">ASSESS</span>
    </div>
    <p className="lcnote">The mandate remains stable enough to define the responsibility. Assignments are versioned, bounded instances of work triggered by relevant changes. Historical assessments remain preserved even when a later change invalidates or supersedes them.</p>
  </div>
</section>

{/*  06 EVIDENCE OUTPUT  */}
<section className="sec tint" id="output" aria-labelledby="h-out">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">06</span><span className="label">What Zuvvix owes the customer</span></p>
      <h2 className="h2" id="h-out" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>Every assignment culminates in evidence.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>Each component of the Zuvvix Assurance Case answers one executive question.</p>
    </div>
    <article className="acrec" aria-label="Zuvvix Assurance Case components">
      <div className="acrec-top"><span className="label" style={{ color: 'var(--navy)' }}>Zuvvix Assurance Case</span><span className="tag">Produced by every assignment</span></div>
      <ol>
        <li><b>Change Manifest</b><span>What changed?</span></li>
        <li><b>Context Manifest</b><span>What did Zuvvix know and rely upon?</span></li>
        <li><b>Impact Map</b><span>What could be affected?</span></li>
        <li><b>Assurance Plan</b><span>What did Zuvvix decide to validate and why?</span></li>
        <li><b>Execution Evidence</b><span>What was actually performed?</span></li>
        <li><b>Findings</b><span>What failed or remains questionable?</span></li>
        <li className="u"><b>Exceptions &amp; Uncertainty</b><span>What could not be established?</span></li>
        <li><b>Residual Risk Position</b><span>What meaningful uncertainty remains?</span></li>
        <li className="r"><b>Readiness Assessment</b><span>What is the Zuvvix conclusion?</span></li>
        <li><b>Provenance</b><span>Which models, tools, capability versions, environments and evidence references support the case?</span></li>
      </ol>
    </article>
    <div className="co dark"><span className="label">Evidence principle</span><p>The Assurance Case is the evidence currency of Zuvvix.</p></div>
    <p style={{ marginTop: '24px' }}><a className="link-arrow" href="/assurance-case/">Explore the Assurance Case</a></p>
  </div>
</section>

{/*  07 AUTHORITY  */}
<section className="sec" id="authority" aria-labelledby="h-au">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">07</span><span className="label">Authority</span></p>
      <h2 className="h2" id="h-au" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>Responsibility and authority are related—but not identical.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>Zuvvix can be accountable for producing a high-quality readiness assessment without having unlimited authority to act. Initial autonomy is qualified and bounded by action.</p>
    </div>
    <div className="auth4" aria-label="Authority classes">
      <div className="ac4 a"><span className="cl">A</span><h3>Observe</h3><span className="bar" aria-hidden="true"></span><p>Read requirements, telemetry, logs, code metadata.</p><span className="post">Usually bounded autonomous</span></div>
      <div className="ac4 b"><span className="cl">B</span><h3>Non-destructive validation</h3><span className="bar" aria-hidden="true"></span><p>Run tests, read-only APIs, isolated journeys, compare datasets.</p><span className="post">May become autonomous after qualification</span></div>
      <div className="ac4 c"><span className="cl">C</span><h3>State-changing non-production</h3><span className="bar" aria-hidden="true"></span><p>Create data, reset test state, deploy test artifacts, modify test assets.</p><span className="post">Tighter policy and possibly approval</span></div>
      <div className="ac4 d"><span className="cl">D</span><h3>Consequential action</h3><span className="bar" aria-hidden="true"></span><p>Alter production, accept business risk, authorize release.</p><span className="post">Outside first-mandate Zuvvix autonomy</span></div>
    </div>
    <div className="co"><span className="label">Control principle</span><p>Customer authority, Zuvvix accountability and technical execution permissions must remain separate records.</p></div>
    <p style={{ marginTop: '24px' }}><a className="link-arrow" href="/trust/">Explore Trust &amp; Authority</a></p>
  </div>
</section>

{/*  08 MEASUREMENT  */}
<section className="sec tint" id="measurement" aria-labelledby="h-me">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">08</span><span className="label">How performance is measured</span></p>
      <h2 className="h2" id="h-me" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>Accountability requires operating metrics.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>Zuvvix is evaluated against the responsibility it accepted, not the amount of testing it performed. Targets will be published only when operating evidence supports them.</p>
    </div>
    <div className="kpis">
      <div className="kpi lead"><h3>False-Green Rate</h3><p>How often Zuvvix says READY when material in-scope assurance evidence should have prevented that conclusion.</p><span className="tv">No target published yet</span></div>
      <div className="kpi"><h3>Material Escape Rate</h3><p>Material production defects attributable to mandate scope.</p><span className="tv">No target published yet</span></div>
      <div className="kpi"><h3>Decision Lead Time</h3><p>Time from adequate change intake to a defensible readiness assessment.</p><span className="tv">No target published yet</span></div>
      <div className="kpi"><h3>Critical-Journey Assurance Coverage</h3><p>Whether agreed material journey risks have current evidence.</p><span className="tv">No target published yet</span></div>
      <div className="kpi"><h3>Material Uncertainty Exposure</h3><p>Whether unresolved conditions are surfaced before release rather than hidden.</p><span className="tv">No target published yet</span></div>
      <div className="kpi"><h3>Customer Effort</h3><p>Customer time spent on clarification, approvals and coordination.</p><span className="tv">No target published yet</span></div>
      <div className="kpi"><h3>Cost per Accepted Assurance Assignment</h3><p>End-to-end economics of producing a usable assessment.</p><span className="tv">No target published yet</span></div>
      <div className="kpi" style={{ background: 'var(--mist)', borderStyle: 'dashed' }}><h3>Why no numbers?</h3><p>This page teaches what accountability can be measured against. It does not invent performance claims before there is operating evidence.</p></div>
    </div>
  </div>
</section>

{/*  09 FIRST MANDATE  */}
<section className="sec" id="first" aria-labelledby="h-fm">
  <div className="wrap">
    <p className="kicker"><span className="idx">09</span><span className="label">First mandate</span></p>
    <h2 className="h2" id="h-fm" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>Continuous Release Assurance makes the model tangible.</h2>
    <div className="m01">
      <span className="label">Mandate 01 — one sentence</span>
      <p className="one">For every relevant change affecting an agreed critical business journey, Zuvvix will determine the material quality impact, perform the qualified assurance required within its authority, expose unresolved uncertainty, and produce a traceable evidence-backed release-readiness assessment.</p>
      <p className="bridge">Our first Quality Mandate is Continuous Release Assurance for critical business journeys. One recurring responsibility. Every relevant change creates an Assignment. Every Assignment must end in traceable evidence and a defensible readiness position—or INDETERMINATE when the evidence is insufficient.</p>
      <div className="cta-row">
        <a className="btn btn-primary" href="/continuous-release-assurance/">See a mandate in action</a>
        <a className="btn btn-quiet" href="/design-partnership/">Explore a design partnership</a>
      </div>
    </div>
  </div>
</section>

{/*  10 CTA + CLAIMS  */}
<section className="sec tint" id="engage" aria-labelledby="h-en">
  <div className="wrap">
    <p className="kicker"><span className="idx">10</span><span className="label">What we can say today</span></p>
    <h2 className="h2" id="h-en" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>Confident about the contract we are designing. Disciplined about the proof we do not yet have.</h2>
    <div className="cl6" role="table" aria-label="Claims maturity">
      <div className="hr" role="row"><span className="h" role="columnheader">Claim</span><span className="h" role="columnheader">State</span><span className="h" role="columnheader">How we say it</span></div>
      <div role="row"><span className="c" role="cell">Quality Mandate is the Zuvvix commercial unit</span><span className="s d" role="cell">DESIGNED</span><span className="l" role="cell">The operating and commercial model Zuvvix is building.</span></div>
      <div role="row"><span className="c" role="cell">Continuous Release Assurance is the first mandate</span><span className="s d" role="cell">DESIGNED / IN BUILD</span><span className="l" role="cell">The first capability being built and released incrementally.</span></div>
      <div role="row"><span className="c" role="cell">Customer retains final release authorization initially</span><span className="s d" role="cell">DESIGNED POLICY</span><span className="l" role="cell">Stated directly.</span></div>
      <div role="row"><span className="c" role="cell">Autonomy is qualified and bounded by action</span><span className="s d" role="cell">DESIGNED POLICY</span><span className="l" role="cell">Stated directly. See Trust &amp; Authority for depth.</span></div>
      <div role="row"><span className="c" role="cell">Lower coordination effort or better economics</span><span className="s t" role="cell">THESIS</span><span className="l" role="cell">A design-partner evaluation objective, not a guaranteed outcome.</span></div>
      <div role="row"><span className="c" role="cell">Reliable release-readiness ownership at scale</span><span className="s n" role="cell">NOT YET PROVEN</span><span className="l" role="cell">Not claimed until repeated operating evidence exists.</span></div>
    </div>
    <div className="cta-row" style={{ marginTop: '36px' }}>
      <a className="btn btn-primary" href="/continuous-release-assurance/">See a mandate in action</a>
      <a className="btn btn-quiet" href="/design-partnership/">Explore a design partnership</a>
    </div>
    <div className="finalstd"><p style={{ maxWidth: 'none', lineHeight: 1.25, textWrap: 'balance', hyphens: 'none' }}>The unit of value is the responsibility accepted—not the amount of activity performed.</p></div>
  </div>
</section>

    </>
  )
}
