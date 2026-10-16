import React from 'react'
import { Link } from 'react-router-dom'
import { HeadMeta } from '@/components/seo/HeadMeta'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useModal } from '@/context/ModalContext'
import { ZwTimeline } from '@/features/zw-timeline/ZwTimeline'

export function Home() {
  useScrollReveal()
  const { openFollow } = useModal()

  return (
    <>
      <HeadMeta
        title="Zuvvix | Enterprise quality, operated."
        description="Zuvvix is building Outcome-Accountable Quality Operations: a bounded quality responsibility, qualified assurance inside explicit authority, and evidence for the release decision."
        canonicalPath="/"
      />
      

{/*  01 HERO  */}
<section className="hero" id="top" aria-labelledby="h-hero">
  <div className="wrap hero-grid">
    <div>
      <p className="eyebrow">Outcome-Accountable Quality Operations</p>
      <h1 className="h1" id="h-hero">Enterprise quality<span className="comma">,</span> operated.</h1>
      <p className="lede">Every software change creates uncertainty. Zuvvix is building an operating model that accepts a defined quality responsibility, determines what could be affected, performs qualified assurance within explicit authority, and produces evidence for the release decision.</p>
      <div className="cta-row">
        <a className="btn btn-primary" href="#how">See how it works</a>
        <button className="btn btn-quiet" type="button" onClick={openFollow}>Follow the build</button>
      </div>
      <p className="trustline" aria-label="Operating principles">
        <span>Responsibility is explicit.</span><span>Autonomy is bounded.</span><span>Evidence is traceable.</span>
      </p>
    </div>

    <figure className="hero-fig" id="heroFig">
      <svg viewBox="0 0 600 440" role="img" aria-labelledby="hf-t hf-d">
        <title id="hf-t">From Change to Evidence, at rest</title>
        <desc id="hf-d">A payment service change waits outside a Quality Mandate. Inside the mandate sit four enterprise systems: Payment API, Order Service, Checkout UI and Finance Ledger. A single evidence path runs from the change through the implicated systems to an empty readiness position. No readiness position exists until evidence is produced.</desc>
        {/*  labels  */}
        <text className="t-lab" x="16" y="112">CHANGE</text>
        <text className="t-lab" x="470" y="196">READINESS</text>
        {/*  mandate  */}
        <rect className="bound" x="160" y="64" width="290" height="356" rx="20"/>
        <rect x="182" y="50" width="152" height="28" rx="14" fill="#101828"/>
        <text x="258" y="68.5" textAnchor="middle" style={{ fontFamily: 'var(--mono)', fontSize: '10.5px', fontWeight: '600', letterSpacing: '.1em', fill: '#fff' }}>QUALITY MANDATE</text>
        {/*  evidence path (behind nodes)  */}
        <path className="pulse-path" d="M136 154 H375 V254 H470"/>
        {/*  connectors  */}
        <path className="ln" d="M295 154 H320 M240 178 V230 M375 178 V230 M295 254 H320"/>
        {/*  change  */}
        <rect x="16" y="126" width="120" height="56" rx="12" fill="#2D5BFF"/>
        <text x="76" y="150" textAnchor="middle" style={{ fontSize: '12.5px', fontWeight: '600', fill: '#fff' }}>Payment service</text>
        <text x="76" y="168" textAnchor="middle" style={{ fontSize: '12px', fill: '#DCE4FF' }}>v3.8</text>
        {/*  nodes  */}
        <rect className="n" x="185" y="130" width="110" height="48" rx="10"/><text className="t-node" x="240" y="159" textAnchor="middle" style={{ fontSize: '13px' }}>Payment API</text>
        <rect className="n" x="320" y="130" width="110" height="48" rx="10"/><text className="t-node" x="375" y="159" textAnchor="middle" style={{ fontSize: '13px' }}>Order Service</text>
        <rect className="n" x="185" y="230" width="110" height="48" rx="10"/><text className="t-node" x="240" y="259" textAnchor="middle" style={{ fontSize: '13px' }}>Checkout UI</text>
        <rect className="n" x="320" y="230" width="110" height="48" rx="10"/><text className="t-node" x="375" y="259" textAnchor="middle" style={{ fontSize: '13px' }}>Finance Ledger</text>
        {/*  stage rail  */}
        <line x1="186" y1="346" x2="428" y2="346" stroke="#E4E7EC" strokeWidth="1.5"/>
        <g style={{ fontFamily: 'var(--mono)', fontSize: '9.5px', letterSpacing: '.08em', fill: '#667085' }}>
          <circle cx="190" cy="346" r="3.5" fill="#fff" stroke="#98A2B3" strokeWidth="1.5"/><text x="186" y="370">CONTEXT</text>
          <circle cx="268" cy="346" r="3.5" fill="#fff" stroke="#98A2B3" strokeWidth="1.5"/><text x="258" y="370">IMPACT</text>
          <circle cx="338" cy="346" r="3.5" fill="#fff" stroke="#98A2B3" strokeWidth="1.5"/><text x="322" y="370">ASSURE</text>
          <circle cx="424" cy="346" r="3.5" fill="#fff" stroke="#98A2B3" strokeWidth="1.5"/><text x="428" y="370" textAnchor="end">EVIDENCE</text>
        </g>
        {/*  readiness (empty)  */}
        <rect x="470" y="212" width="122" height="84" rx="12" fill="#fff" stroke="#98A2B3" strokeWidth="1.5" strokeDasharray="4 4"/>
        <text x="531" y="250" textAnchor="middle" style={{ fontSize: '13px', fontWeight: '600', fill: '#667085' }}>No position yet</text>
        <text x="531" y="270" textAnchor="middle" style={{ fontSize: '11.5px', fill: '#98A2B3' }}>awaits evidence</text>
      </svg>
      <figcaption className="caption">Illustrative Zuvvix operating model — designed behavior.</figcaption>
    </figure>
  </div>
</section>

{/*  02 TENSION  */}
<section className="sec tint" id="problem" aria-labelledby="h-problem">
  <div className="wrap">
    <div className="split">
      <div className="stack">
        <p className="kicker"><span className="idx">02</span><span className="label">The problem</span></p>
        <h2 className="h2" id="h-problem">Every change creates uncertainty.</h2>
        <p className="lede">A requirement changes. A service changes. A configuration changes. The enterprise still has to answer the same questions.</p>
        <ol className="questions">
          <li><span className="q">Q1</span><span className="q-text">What could be affected?</span></li>
          <li><span className="q">Q2</span><span className="q-text">What must be assured?</span></li>
          <li><span className="q">Q3</span><span className="q-text">What evidence is enough?</span></li>
          <li><span className="q">Q4</span><span className="q-text">What remains uncertain?</span></li>
        </ol>
      </div>
      <figure className="field-fig" data-anim>
        <svg viewBox="0 0 600 420" role="img" aria-labelledby="tf-t tf-d">
          <title id="tf-t">One change touching several systems</title>
          <desc id="tf-d">A payment service change connects to Checkout UI and Order Service. Order Service connects onward to Finance Ledger. The path to Reporting is uncertain and marked as not yet known. Identity and Catalog are not implicated and stay quiet.</desc>
          {/*  quiet edges  */}
          <path className="ln" d="M176 210 C 220 210 220 290 262 290"/>
          <path className="ln" d="M382 290 C 420 290 420 360 452 360"/>
          <path className="ln" d="M382 70 C 410 70 410 150 452 150"/>
          {/*  implicated edges  */}
          <path className="ln-on dep" strokeDasharray="260" d="M176 196 C 220 196 220 70 262 70" style={{ transitionDelay: '.1s' }}/>
          <path className="ln-on dep" strokeDasharray="260" d="M176 204 C 216 204 216 180 262 180" style={{ transitionDelay: '.6s' }}/>
          <path className="ln-on dep" strokeDasharray="260" d="M382 180 C 416 180 416 150 452 150" style={{ transitionDelay: '1.1s' }}/>
          <path className="dep" stroke="#B54708" strokeWidth="2" fill="none" strokeDasharray="5 6" d="M382 188 C 420 188 420 250 452 250" style={{ transitionDelay: '1.6s' }}/>
          {/*  change  */}
          <rect x="16" y="172" width="160" height="62" rx="12" fill="#2D5BFF"/>
          <text x="96" y="199" textAnchor="middle" style={{ fontSize: '13.5px', fontWeight: '600', fill: '#fff' }}>Payment service</text>
          <text x="96" y="219" textAnchor="middle" style={{ fontSize: '12px', fill: '#DCE4FF' }}>v3.8 · changed</text>
          <text className="t-lab" x="16" y="160">CHANGE</text>
          {/*  nodes  */}
          <rect className="n" x="262" y="46" width="120" height="48" rx="10"/><text className="t-node" x="322" y="75" textAnchor="middle" style={{ fontSize: '13px' }}>Checkout UI</text>
          <rect className="n" x="262" y="156" width="120" height="48" rx="10"/><text className="t-node" x="322" y="185" textAnchor="middle" style={{ fontSize: '13px' }}>Order Service</text>
          <rect className="n" x="262" y="266" width="120" height="48" rx="10"/><text x="322" y="295" textAnchor="middle" style={{ fontSize: '13px', fill: '#98A2B3', fontWeight: '500' }}>Identity</text>
          <rect className="n" x="452" y="126" width="132" height="48" rx="10"/><text className="t-node" x="518" y="155" textAnchor="middle" style={{ fontSize: '13px' }}>Finance Ledger</text>
          <rect className="n" x="452" y="226" width="132" height="48" rx="10" strokeDasharray="4 4"/><text className="t-node" x="518" y="255" textAnchor="middle" style={{ fontSize: '13px' }}>Reporting</text>
          <rect className="n" x="452" y="336" width="132" height="48" rx="10"/><text x="518" y="365" textAnchor="middle" style={{ fontSize: '13px', fill: '#98A2B3', fontWeight: '500' }}>Catalog</text>
          {/*  implicated overlays  */}
          <g className="dep-node" style={{ transitionDelay: '.4s' }}><rect className="n-on" x="262" y="46" width="120" height="48" rx="10"/></g>
          <g className="dep-node" style={{ transitionDelay: '.9s' }}><rect className="n-on" x="262" y="156" width="120" height="48" rx="10"/></g>
          <g className="dep-node" style={{ transitionDelay: '1.4s' }}><rect className="n-on" x="452" y="126" width="132" height="48" rx="10"/></g>
          <g className="dep-node" style={{ transitionDelay: '1.9s' }}>
            <circle cx="584" cy="226" r="9" fill="#FFF7ED" stroke="#B54708" strokeWidth="2"/>
            <text x="518" y="298" textAnchor="middle" style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '.08em', fill: '#B54708' }}>NOT YET KNOWN</text>
          </g>
          <text className="t-sub" x="16" y="410" style={{ fontSize: '11.5px' }}>Implicated paths in blue. Quiet systems stay quiet. The unknown stays marked.</text>
        </svg>
      </figure>
    </div>
    <p className="contrast">Testing activity can tell you what was run. <strong>It does not, by itself, establish whether there is enough evidence to ship.</strong></p>
  </div>
</section>

{/*  03 CATEGORY SHIFT  */}
<section className="sec" id="shift" aria-labelledby="h-shift">
  <div className="wrap">
    <p className="kicker"><span className="idx">03</span><span className="label">The category shift</span></p>
    <h2 className="h2" id="h-shift" style={{ maxWidth: '20ch' }}>From Quality by Activity to Quality by Accountability.</h2>

    <div className="shift" data-anim role="table" aria-label="Quality by Activity compared with Quality by Accountability">
      <div className="shift-head" role="row">
        <span className="label from" role="columnheader">Quality by Activity</span><span aria-hidden="true"></span><span className="label to" role="columnheader">Quality by Accountability</span>
      </div>
      <div className="shift-row" role="row"><span className="a" role="cell">Tester capacity</span><span className="arr" aria-hidden="true"></span><span className="b" role="cell">Defined responsibility</span></div>
      <div className="shift-row" role="row"><span className="a" role="cell">Test cases executed</span><span className="arr" aria-hidden="true"></span><span className="b" role="cell">Conditions that must be established</span></div>
      <div className="shift-row" role="row"><span className="a" role="cell">Automation percentage</span><span className="arr" aria-hidden="true"></span><span className="b" role="cell">Qualified assurance</span></div>
      <div className="shift-row" role="row"><span className="a" role="cell">Defects raised</span><span className="arr" aria-hidden="true"></span><span className="b" role="cell">Evidence + residual uncertainty</span></div>
      <div className="shift-row" role="row"><span className="a" role="cell">Fragmented ownership</span><span className="arr" aria-hidden="true"></span><span className="b" role="cell">Explicit mandate and authority</span></div>
      <div className="shift-row" role="row"><span className="a" role="cell">Pass/fail reporting</span><span className="arr" aria-hidden="true"></span><span className="b" role="cell">Defensible readiness position</span></div>
    </div>

    <dl className="definition">
      <dt><span className="label">Definition</span><strong>Outcome-Accountable Quality Operations</strong><span><span className="tag">Category thesis</span></span></dt>
      <dd>An operating model in which a provider accepts a bounded quality mandate, continuously acquires the context needed to execute it, applies qualified human and machine competencies, performs permitted assurance work, independently verifies material conclusions, manages exceptions and produces auditable evidence against agreed quality outcomes.
        <br /><a className="link-arrow" href="/category/">Understand the category</a>
      </dd>
    </dl>
  </div>
</section>

{/*  04 FROM CHANGE TO EVIDENCE  */}
<section className="sec tint" id="how" aria-labelledby="h-how">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">04</span><span className="label">From Change to Evidence</span></p>
      <h2 className="h2" id="h-how" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>A change enters. Evidence comes out. Uncertainty stays visible.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>Zuvvix is designed to connect a relevant enterprise change to the context, impact reasoning, qualified assurance and evidence needed for a readiness position, without pretending that every unknown can be resolved.</p>
    </div>

    <ZwTimeline />
    <p style={{ marginTop: '28px', display: 'flex', flexWrap: 'wrap', gap: '12px 32px' }}><a className="link-arrow" href="/from-change-to-evidence/">Open the full visualization</a><a className="link-arrow" href="/how-it-works/">See how Zuvvix works</a></p>
  </div>
</section>

{/*  05 QUALITY MANDATE  */}
<section className="sec" id="mandate" aria-labelledby="h-mandate">
  <div className="wrap">
    <div className="split">
      <div className="stack">
        <p className="kicker"><span className="idx">05</span><span className="label">Quality Mandate</span></p>
        <h2 className="h2" id="h-mandate">The customer does not buy agents. The customer delegates a Quality Mandate.</h2>
        <p className="lede">A Quality Mandate defines the responsibility Zuvvix accepts: the business journeys and systems in scope, the conditions that matter, the authority Zuvvix has, the evidence required, the dependencies, service levels and escalation boundaries.</p>
        <p style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 28px' }}><a className="link-arrow" href="/continuous-release-assurance/">See a mandate in action</a><a className="link-arrow" href="/quality-mandate/">What is a Quality Mandate?</a></p>
      </div>
      <div>
        <div className="mandate" aria-label="Anatomy of a Quality Mandate">
          <span className="mandate-tab">QUALITY MANDATE</span>
          <dl>
            <div className="mrow"><dt>Responsibility</dt><dd>Assure relevant changes affecting a critical journey.</dd></div>
            <div className="mrow"><dt>Scope</dt><dd>Named business journey, systems, environments and change classes.</dd></div>
            <div className="mrow"><dt>Authority</dt><dd>What Zuvvix may observe, execute, modify or must escalate.
              <div className="auth" aria-label="Authority levels"><span className="ok">Observe</span><span className="ok">Execute</span><span className="rv">Modify · review</span><span className="esc">Escalate</span></div></dd></div>
            <div className="mrow"><dt>Evidence</dt><dd>What must be demonstrated before a readiness position is defensible.</dd></div>
            <div className="mrow"><dt>Service levels</dt><dd>Response, assessment, escalation and evidence expectations.</dd></div>
          </dl>
        </div>
        <dl className="excl">
          <dt>Outside the mandate</dt>
          <dd>Non-delegable business risk acceptance and production release authority, initially.</dd>
        </dl>
      </div>
    </div>
    <div className="signature-line">
      <p>Responsibility, not automation, is the product.</p>
      <span className="label">Founding principle</span>
    </div>
  </div>
</section>

{/*  06 OPERATING MODEL  */}
<section className="sec tint" id="system" aria-labelledby="h-system">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">06</span><span className="label">Operating model</span></p>
      <h2 className="h2" id="h-system" style={{ maxWidth: 'none', fontSize: 'clamp(30px, 3.8vw, 48px)' }}>Understand. Assure. Act. Prove. Improve.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>Inside the mandate, the work follows one loop. Each stage exists to prevent a specific failure of the old model.</p>
    </div>
    <ol className="pillars" data-anim>
      <li className="pillar">
        <span className="pv"><svg viewBox="0 0 22 22" aria-hidden="true"><rect x="3" y="4" width="16" height="4" rx="1" fill="none" stroke="#101828" strokeWidth="1.5"/><rect x="3" y="10" width="16" height="4" rx="1" fill="none" stroke="#101828" strokeWidth="1.5"/><rect x="3" y="16" width="10" height="3" rx="1" fill="#2D5BFF"/></svg>UNDERSTAND</span>
        <h3>Know what matters before deciding what to assure.</h3>
        <p>Relevant intent, implementation, observed behavior, dependencies and uncertainty.</p>
      </li>
      <li className="pillar">
        <span className="pv"><svg viewBox="0 0 22 22" aria-hidden="true"><rect x="2" y="6" width="18" height="10" rx="5" fill="none" stroke="#2D5BFF" strokeWidth="1.5"/><path d="M7 11l2.5 2.5L15 8" fill="none" stroke="#2D5BFF" strokeWidth="1.6"/></svg>ASSURE</span>
        <h3>Use the right assurance, not simply more assurance.</h3>
        <p>Qualified competency selected for the risk and context.</p>
      </li>
      <li className="pillar">
        <span className="pv"><svg viewBox="0 0 22 22" aria-hidden="true"><path d="M11 3v17" stroke="#101828" strokeWidth="2"/><rect x="7" y="2" width="8" height="5" rx="2" fill="#101828"/><path d="M2 12h6" stroke="#2D5BFF" strokeWidth="1.6"/><path d="M14 16h6" stroke="#B42318" strokeWidth="1.6" strokeDasharray="2 2"/></svg>ACT</span>
        <h3>Autonomy is earned, bounded and enforced.</h3>
        <p>A policy and authority gate sits before any side effect.</p>
      </li>
      <li className="pillar">
        <span className="pv"><svg viewBox="0 0 22 22" aria-hidden="true"><rect x="7" y="8" width="13" height="10" rx="2" fill="none" stroke="#101828" strokeWidth="1.5"/><circle cx="3.5" cy="4.5" r="2" fill="#2D5BFF"/><path d="M4.5 6l3.5 3" stroke="#98A2B3" strokeWidth="1.2" strokeDasharray="1.5 1.5"/><path d="M10 12h7M10 15h4" stroke="#101828" strokeWidth="1.2"/></svg>PROVE</span>
        <h3>AI output is not evidence.</h3>
        <p>Evidence objects preserve provenance, applicability and limitations.</p>
      </li>
      <li className="pillar">
        <span className="pv"><svg viewBox="0 0 22 22" aria-hidden="true"><path d="M17 7a7 7 0 1 0 1.5 6" fill="none" stroke="#101828" strokeWidth="1.5"/><path d="M18 3v4.5h-4.5" fill="none" stroke="#101828" strokeWidth="1.5"/><rect x="8.5" y="8.5" width="5" height="5" rx="1" fill="#2D5BFF"/></svg>IMPROVE</span>
        <h3>Learn without uncontrolled self-modification.</h3>
        <p>A learning proposal returns through evaluation before promotion.</p>
      </li>
    </ol>
    <div className="loop">
      <svg width="120" height="24" viewBox="0 0 120 24" aria-hidden="true"><path d="M116 6 H10 a6 6 0 0 0 0 12 H30" fill="none" stroke="#98A2B3" strokeWidth="1.5"/><path d="M30 18 l-7 -4 v8 z" fill="#98A2B3"/><rect x="52" y="1" width="30" height="10" rx="2" fill="#fff" stroke="#101828" strokeWidth="1.2"/></svg>
      <span>Improvements re-enter through evaluation. Nothing is promoted on its own say-so.</span>
    </div>
    <p style={{ marginTop: '28px' }}><a className="link-arrow" href="/how-it-works/">Explore the operating model</a></p>
  </div>
</section>

{/*  07 FIRST CAPABILITY  */}
<section className="sec" id="capability" aria-labelledby="h-cap">
  <div className="wrap">
    <div className="split">
      <div className="stack">
        <p className="kicker"><span className="idx">07</span><span className="label">First capability</span></p>
        <span><span className="building"><i></i>BUILDING NOW</span></span>
        <h2 className="h2" id="h-cap">Continuous Release Assurance for critical business journeys.</h2>
        <p className="lede">For every relevant change affecting an agreed critical journey, Zuvvix is designed to determine material impact, perform qualified assurance within its authority, expose unresolved uncertainty, and produce a traceable evidence-backed release-readiness assessment.</p>
        <p className="note">Incremental capability releases begin next quarter. Broader platform capabilities will follow over the subsequent build period, with evidence published as they move from designed to demonstrated and proven.</p>
        <p><a className="link-arrow" href="/continuous-release-assurance/">See Continuous Release Assurance</a></p>
      </div>
      <article className="record" aria-label="Illustrative readiness assessment">
        <div className="record-top"><span className="label" style={{ color: 'var(--navy)' }}>Readiness assessment</span><span className="tag">Illustrative</span></div>
        <dl className="record-body">
          <div className="rrow"><dt>Change</dt><dd>Payment service v3.8</dd></div>
          <div className="rrow"><dt>Journey</dt><dd>Checkout → Payment → Fulfilment → Finance</dd></div>
          <div className="rrow"><dt>Material impact</dt><dd>Partial refund may reconcile locally but allocate incorrectly downstream.</dd></div>
          <div className="rrow"><dt>Assurance</dt><dd>Change Impact · API Contract · Journey Validation · Reconciliation</dd></div>
          <div className="rrow"><dt>Evidence</dt><dd><span className="ev"><span>SOURCE · API observation</span><span>OBSERVATION · journey trace</span><span>RECONCILIATION · independent</span><span className="u">UNRESOLVED · callback fidelity</span></span></dd></div>
          <div className="rrow"><dt>Authority</dt><dd>Production change blocked. Final release authorization stays with the customer.</dd></div>
        </dl>
        <div className="state-big"><b>READY WITH EXCEPTIONS</b><span>Production-equivalent callback pattern not established in sandbox.</span></div>
      </article>
    </div>

    <div className="maturity" id="evidence">
      <div className="maturity-head">
        <h3>What you can believe today</h3>
        <p>Every claim on this site carries a maturity state. We move a claim forward only when the evidence supports it.</p>
      </div>
      <ol className="track">
        <li className="now"><b>Designed</b><span className="lbl">Illustrative operating model — designed behavior.</span><span className="ws">Canonical model and illustrative scenarios. No measured performance.</span><span className="here tag blue"><span className="dot"></span>Where we are</span></li>
        <li><b>Demonstrated</b><span className="lbl">Demonstrated in a bounded prototype.</span><span className="ws">Captured runs with a clear environment and scope.</span></li>
        <li><b>Observed</b><span className="lbl">Observed in design-partner operation.</span><span className="ws">Measured behavior, with customer permission and stated limits.</span></li>
        <li><b>Proven</b><span className="lbl">Proven within a stated context.</span><span className="ws">Repeated real-world evidence, with sample and period.</span></li>
      </ol>
    </div>
  </div>
</section>

{/*  08 TRUST  */}
<section className="sec tint" id="trust" aria-labelledby="h-trust">
  <div className="wrap">
    <div className="split">
      <div className="stack">
        <p className="kicker"><span className="idx">08</span><span className="label">Trust &amp; authority</span></p>
        <h2 className="h2" id="h-trust">The trustworthy system is not the one that always answers.</h2>
        <p className="lede">Zuvvix is designed to act only inside demonstrated competence and explicit authority. Material conclusions require evidence. When the evidence is insufficient, the correct readiness state can be INDETERMINATE.</p>
        <dl className="principles">
          <div><dt>Bounded autonomy</dt><dd>Autonomy is earned through qualification and bounded by explicit authority.</dd></div>
          <div><dt>Independent evidence</dt><dd>A model assertion, or another model agreeing, is not independent correctness evidence.</dd></div>
          <div><dt>Visible uncertainty</dt><dd>Unknown, conflicting or stale conditions remain visible.</dd></div>
          <div><dt>Human judgment</dt><dd>Consequential ambiguity and specialist-only decisions are escalated.</dd></div>
          <div><dt>Customer authority</dt><dd>The customer retains final release authorization initially.</dd></div>
        </dl>
        <p><a className="link-arrow" href="/trust/">Explore Trust &amp; Authority</a></p>
      </div>
      <div className="gate" data-anim aria-label="Authority gate example">
        <div className="gate-top"><span className="label" style={{ color: 'var(--navy)' }}>Authority gate</span><span className="tag">Policy evaluated before action</span></div>
        <div className="gate-body">
          <div className="grow"><span className="act">Read system metadata<small>Passes when policy permits.</small></span><span className="bar" aria-hidden="true"></span><span className="state p">PERMITTED</span></div>
          <div className="grow"><span className="act">Execute approved non-destructive validation<small>Passes once a qualified competency is resolved.</small></span><span className="bar" aria-hidden="true"></span><span className="state p">PERMITTED</span></div>
          <div className="grow rv"><span className="act">Modify shared test state<small>Held for review under this policy.</small></span><span className="bar" aria-hidden="true"></span><span className="state r">REVIEW</span></div>
          <div className="grow bl"><span className="act">Change production behavior or accept business risk<small>Routed to human and customer authority.</small></span><span className="bar" aria-hidden="true"></span><span className="state b">BLOCKED</span></div>
        </div>
        <div className="gate-foot">Autonomy is earned through qualification and bounded by explicit authority.</div>
      </div>
    </div>

    <div className="states">
      <div className="states-head">
        <h3>Four readiness positions. All of them legitimate.</h3>
        <p>INDETERMINATE is not an error screen. It is the honest answer when the evidence is not enough. <a className="link-arrow" href="/readiness/" style={{ marginTop: '6px' }}>Explore the readiness states</a></p>
      </div>
      <div className="state-grid">
        <div className="sc ready"><span className="sh"><i></i>READY</span><p>Agreed conditions established. No material unresolved issue known within scope.</p></div>
        <div className="sc rwe"><span className="sh"><i></i>READY WITH EXCEPTIONS</span><p>Substantially satisfied. An explicit residual issue needs acceptance.</p></div>
        <div className="sc nr"><span className="sh"><i></i>NOT READY</span><p>Material evidence shows an unacceptable failure or an unsatisfied required condition.</p></div>
        <div className="sc ind"><span className="sh"><i></i>INDETERMINATE</span><p>Insufficient evidence for a defensible readiness conclusion.</p><span className="valid">A valid outcome</span></div>
      </div>
    </div>
  </div>
</section>

{/*  09 THINKING  */}
<section className="sec" id="thinking" aria-labelledby="h-think">
  <div className="wrap">
    <div className="think-head">
      <div className="stack" style={{ maxWidth: '720px' }}>
        <p className="kicker"><span className="idx">09</span><span className="label">Thinking</span></p>
        <h2 className="h2" id="h-think">Thinking about the future of enterprise quality.</h2>
        <p className="lede">We are publishing the ideas, design decisions, experiments, evidence and limits shaping Zuvvix, so the category develops in public, with precision rather than hype.</p>
      </div>
      <div className="cta-row" style={{ marginTop: '0' }}><a className="btn btn-quiet" href="/thinking/">Explore Thinking</a><button className="btn btn-quiet" type="button" onClick={openFollow}>Follow the build</button></div>
    </div>
    <div className="essays">
      <a className="essay lead" href="/thinking/">
        <span className="meta"><span className="tag blue">Founding thesis</span><span className="caption">Essay · launch series</span></span>
        <h3>Responsibility, not automation, is the product.</h3>
        <p>Why the unit of value in enterprise quality has to move from effort to accountable responsibility.</p>
      </a>
      <div className="essay-grid">
        <a className="essay" href="/thinking/"><span className="meta"><span className="tag">Problem reframing</span></span><h3>Quality by Activity is reaching its limit.</h3><p>What test counts and automation percentages cannot tell a release decision.</p></a>
        <a className="essay" href="/thinking/"><span className="meta"><span className="tag">Evidence doctrine</span></span><h3>AI output is not evidence.</h3><p>Why a model agreeing with a model is not independent proof.</p></a>
        <a className="essay" href="/thinking/"><span className="meta"><span className="tag">Category construct</span></span><h3>What exactly is a Quality Mandate?</h3><p>Scope, authority, evidence and service levels, written down.</p></a>
        <a className="essay" href="/thinking/"><span className="meta"><span className="tag">Trust and uncertainty</span></span><h3>Why INDETERMINATE can be the most trustworthy answer.</h3><p>The case for a system that says it does not yet know.</p></a>
      </div>
    </div>
  </div>
</section>

{/*  10 CLOSING  */}
<section className="closing" id="partner" aria-labelledby="h-close">
  <div className="wrap closing-grid">
    <div>
      <p className="kicker"><span className="idx">10</span><span className="label">Design partnership</span></p>
      <h2 id="h-close">Choose one critical business journey.</h2>
      <p className="lede">Let us examine whether a bounded Quality Mandate can turn its change uncertainty into clearer, evidence-backed readiness, and what we would need to prove before taking greater responsibility.</p>
      <div className="cta-row">
        <a className="btn btn-primary" href="/design-partnership/">Explore a design partnership</a>
        <button className="btn btn-quiet" type="button" onClick={openFollow}>Follow the build</button>
      </div>
    </div>
    <aside className="closing-mini" aria-label="What a design partnership involves">
      <span className="label">A design partnership starts with</span>
      <ol>
        <li>One critical journey you name</li>
        <li>A draft Quality Mandate: scope, authority, evidence</li>
        <li>An agreed bar for what must be proven first</li>
      </ol>
    </aside>
  </div>
</section>

    </>
  )
}
