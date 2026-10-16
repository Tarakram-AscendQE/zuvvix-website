import React from 'react'
import { Link } from 'react-router-dom'
import { HeadMeta } from '@/components/seo/HeadMeta'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useModal } from '@/context/ModalContext'

export function ContinuousReleaseAssurance() {
  useScrollReveal()
  const { openFollow } = useModal()

  return (
    <>
      <HeadMeta
        title="Continuous Release Assurance | Zuvvix"
        description="Continuous Release Assurance: an illustrative operating mandate on a payment journey across multi-system enterprise architecture."
        canonicalPath="/continuous-release-assurance/"
      />
      

{/*  01 HERO  */}
<section className="cra-hero" id="top" aria-labelledby="h1">
  <div className="wrap">
    <p className="eyebrow">Continuous Release Assurance</p>
    <h1 className="h1" id="h1">From every relevant change to a defensible readiness position.</h1>
    <p className="lede">For every relevant change affecting an agreed critical business journey, Zuvvix is designed to determine the material quality impact, perform the qualified assurance required within its authority, expose unresolved uncertainty and produce a traceable evidence-backed release-readiness assessment.</p>
    <div className="cta-row">
      <a className="btn btn-primary" href="#partnership">Explore a design partnership</a>
      <a className="btn btn-quiet" href="#loop">See how the mandate works</a>
    </div>
    <p className="matnote"><span className="tag blue"><span className="dot"></span>Designed</span><span>Designed capability. This page shows the specified operating model and a reference scenario. It does not present unmeasured production benefits as proven outcomes.</span></p>
    <div className="oneline" aria-label="The first Quality Mandate at a glance">
      <div><small>RESPONSIBILITY</small><b>One recurring Quality Mandate</b></div>
      <div><small>SCOPE</small><b>An agreed critical business journey</b></div>
      <div><small>TRIGGER</small><b>Every relevant enterprise change</b></div>
      <div><small>OUTPUT</small><b>Assurance Case + readiness position</b></div>
    </div>
  </div>
</section>

{/*  02 WHY FIRST  */}
<section className="sec tint" id="why" aria-labelledby="h-why">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">02</span><span className="label">Why this is the first capability</span></p>
      <h2 className="h2" id="h-why" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>A bounded problem that exposes the real enterprise challenge.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>A release change may originate in a requirement, configuration, microservice, API, database, SaaS package, business rule, AI component or infrastructure component. The enterprise still needs one answer: what could this change affect, what assurance is necessary, and what evidence justifies the release decision?</p>
    </div>
    <dl className="why6">
      <div><dt>Recurring rather than project-based</dt><dd>Lets Zuvvix learn whether the responsibility can be discharged repeatedly.</dd></div>
      <div><dt>Connected directly to production change</dt><dd>Links assurance to a real enterprise decision rather than isolated testing activity.</dd></div>
      <div><dt>Cross-system and context-dependent</dt><dd>Forces enterprise intelligence, dependency reasoning and journey-level evidence to work together.</dd></div>
      <div><dt>Measurable</dt><dd>Supports decision lead time, escape, false-green, uncertainty and effort metrics.</dd></div>
      <div><dt>Expandable</dt><dd>Creates a path to cross-system/data, AI assurance, transformation and production-quality mandates.</dd></div>
      <div><dt>Bounded</dt><dd>Lets authority, liability, scope and evidence requirements remain explicit.</dd></div>
    </dl>
    <div className="co dark"><span className="label">Not autonomous testing</span><p>The responsibility is the product. Machine autonomy is only one bounded operating mode inside it.</p></div>
  </div>
</section>

{/*  03 OPERATING LOOP (ZW-09A)  */}
<section className="sec" id="loop" aria-labelledby="h-loop">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">03</span><span className="label">The operating loop</span></p>
      <h2 className="h2" id="h-loop" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>One recurring responsibility. A disciplined path from change to evidence.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>Every relevant change follows a governed path. Every step preserves scope, authority, evidence and unresolved uncertainty.</p>
    </div>
    <div className="oloop" data-anim>
      <ol aria-label="Continuous Release Assurance operating loop, in order">
        <li><span className="n">01</span><b>CHANGE</b><span className="d">Relevant change becomes an Assignment.</span></li>
        <li><span className="n">02</span><b>UNDERSTAND</b><span className="d">Assemble sourced enterprise context.</span></li>
        <li><span className="n">03</span><b>IMPACT</b><span className="d">Determine what could materially be affected.</span></li>
        <li><span className="n">04</span><b>PLAN</b><span className="d">Choose assurance required for the risk.</span></li>
        <li><span className="n">05</span><b>PREPARE</b><span className="d">Check authority, environment and data.</span></li>
        <li className="ev"><span className="n">06</span><b>ASSURE</b><span className="d">Perform qualified assurance work.</span></li>
        <li className="inv"><span className="n">07</span><b>INVESTIGATE</b><span className="d">Explain failures; do not assume defect.</span></li>
        <li className="ev"><span className="n">08</span><b>VERIFY</b><span className="d">Independently verify material conclusions.</span></li>
        <li className="ev"><span className="n">09</span><b>ASSESS</b><span className="d">Assemble Assurance Case + readiness.</span></li>
        <li className="post"><span className="n">10</span><b>REPORT</b><span className="d">Escalate decisions and unresolved issues.</span></li>
        <li className="post"><span className="n">11</span><b>OBSERVE</b><span className="d">Use later evidence to challenge prior conclusions.</span></li>
        <li className="post"><span className="n">12</span><b>LEARN</b><span className="d">Propose improvements through governed evaluation.</span></li>
      </ol>
      <div className="ret" aria-hidden="true"></div>
      <p className="ret-t">Learning changes future capability only after proposal → evaluation → qualification → promotion.</p>
      <p className="oloop-key" aria-hidden="true"><span><i className="k1"></i>Understand and prepare</span><span><i className="k2"></i>Produce evidence</span><span><i className="k3"></i>After the decision</span></p>
    </div>
  </div>
</section>

{/*  04 WHAT ZUVVIX ACCEPTS  */}
<section className="sec tint" id="accepts" aria-labelledby="h-acc">
  <div className="wrap">
    <p className="kicker"><span className="idx">04</span><span className="label">What Zuvvix accepts</span></p>
    <h2 className="h2" id="h-acc" style={{ maxWidth: '20ch' }}>The responsibility is larger than test execution.</h2>
    <dl className="acc">
      <div><dt>Relevant change intake</dt><dd>Identify or receive change information and create a bounded Assignment under the Quality Mandate.</dd></div>
      <div><dt>Context sufficiency</dt><dd>Determine whether the available enterprise context is adequate for the decision.</dd></div>
      <div><dt>Impact assessment</dt><dd>Identify affected journeys, systems, interfaces, data, controls and material failure mechanisms.</dd></div>
      <div><dt>Assurance planning</dt><dd>Select the assurance required to address the material uncertainty created by the change.</dd></div>
      <div><dt>Qualified execution</dt><dd>Perform or coordinate approved assurance only through qualified competencies and explicit authority.</dd></div>
      <div><dt>Investigation</dt><dd>Distinguish product defect from stale expectation, environment, data, automation, dependency or assumption failures.</dd></div>
      <div><dt>Evidence sufficiency</dt><dd>Verify material conclusions and expose unsupported assumptions or unresolved gaps.</dd></div>
      <div><dt>Decision support</dt><dd>Assemble the Assurance Case and issue a readiness assessment.</dd></div>
    </dl>
    <div className="co dark"><span className="label">Boundary</span><p>Zuvvix owns the quality of the assessment and the work required under the mandate. The customer initially retains final release authorization.</p></div>
    <p className="links2"><a className="link-arrow" href="/quality-mandate/">Understand the Quality Mandate</a></p>
  </div>
</section>

{/*  05 REFERENCE JOURNEY (ZW-09B)  */}
<section className="sec" id="journey" aria-labelledby="h-jr">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">05</span><span className="label">Reference journey · partial refund</span></p>
      <h2 className="h2" id="h-jr" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>Local success can still produce an end-to-end financial failure.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>The reference scenario is intentionally cross-system. A product team changes partial-refund logic in Commerce. The payment service issues the refund asynchronously. Finance posts accounting entries after an event-driven handoff. A sandbox does not perfectly reproduce one callback pattern.</p>
    </div>
    <div className="jr" data-anim>
      <ol className="jr-sys" aria-label="Systems in the partial-refund journey">
        <li className="src"><b>COMMERCE</b><span>Partial-refund logic changes</span></li>
        <li className="hit"><b>PAYMENT</b><span>Async refund issued</span></li>
        <li className="hit"><b>EVENT BUS</b><span>Handoff / callback</span></li>
        <li className="hit"><b>FINANCE</b><span>Ledger entries posted</span></li>
      </ol>
      <div className="jr-risk"><span className="label">Material risk</span><p>A correct local refund can still create duplicate, missing, delayed or misallocated financial effects downstream.</p></div>
      <div className="jr-pair">
        <div className="lim"><span className="label">Known limitation</span><b>Sandbox callback behavior is not fully production-faithful.</b><span>Zuvvix must carry this limitation into the case.</span></div>
        <div className="ora"><span className="label">Independent oracle</span><b>Approved refund rules + independent reconciliation calculation.</b><span>Model agreement alone is not enough.</span></div>
      </div>
    </div>
    <p className="caption" style={{ marginTop: '14px' }}>Reference scenario for the designed capability — not production evidence.</p>
    <dl className="dims" aria-label="Reference conditions">
      <div><dt>Business objective</dt><dd>Permit a valid partial refund while preserving correct customer, payment and finance outcomes.</dd></div>
      <div><dt>Systems</dt><dd>Commerce; Payment; event bus/integration; Finance/Ledger; test-data source; observability source.</dd></div>
      <div><dt>Material risk</dt><dd>Local application success may conceal duplicate, missing, delayed or misallocated financial effects downstream.</dd></div>
      <div><dt>Key oracle</dt><dd>Approved refund rules plus an independent reconciliation calculation.</dd></div>
      <div><dt>Known limitation</dt><dd>Sandbox callback behaviour is not fully production-faithful.</dd></div>
      <div><dt>Required Zuvvix behavior</dt><dd>Report demonstrated conditions separately from the unestablished callback behaviour; do not convert the limitation into false confidence.</dd></div>
    </dl>
  </div>
</section>

{/*  06 ONE ASSIGNMENT (ZW-09C)  */}
<section className="sec tint" id="story" aria-labelledby="h-sb">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">06</span><span className="label">One assignment, from change to readiness</span></p>
      <h2 className="h2" id="h-sb" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>The capability should tell one coherent operating story.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>One change, followed all the way to a readiness position. The scenario is illustrative of the specified operating behavior.</p>
    </div>
    <div className="story" data-anim>
      <ol className="sb" aria-label="One assignment storyboard">
        <li className="k"><span className="n">01</span><b>CHANGE</b><p>Partial-refund logic changes; Zuvvix creates the Assignment.</p><span className="out"><small>OUTPUT</small><span>Assignment created</span></span></li>
        <li className="k"><span className="n">02</span><b>CONTEXT</b><p>Applicable business rules, journey dependencies, event timing, mappings, environment and history form the Context Manifest.</p><span className="out"><small>OUTPUT</small><span>Context Manifest</span></span></li>
        <li className="k"><span className="n">03</span><b>IMPACT</b><p>Impact reasoning identifies downstream financial-allocation risk.</p><span className="out"><small>OUTPUT</small><span>Impact Map</span></span></li>
        <li><span className="n">04</span><b>ASSURANCE</b><p>Qualified non-destructive checks, journey validation and independent reconciliation are selected.</p><span className="out"><small>OUTPUT</small><span>Execution evidence</span></span></li>
        <li className="inv"><span className="n">05</span><b>INVESTIGATE</b><p>Local systems can appear successful while the ledger allocation is wrong.</p><span className="out"><small>OUTPUT</small><span>Finding</span></span></li>
        <li><span className="n">06</span><b>VERIFY</b><p>Independent reconciliation confirms the material condition.</p><span className="out"><small>OUTPUT</small><span>Verified evidence</span></span></li>
        <li><span className="n">07</span><b>ASSURANCE CASE</b><p>Evidence, findings, limitations and residual risk are assembled with provenance.</p><span className="out"><small>OUTPUT</small><span>Assurance Case</span></span></li>
        <li className="nr"><span className="n">08</span><b>READINESS</b><p>A required material condition is unsatisfied.</p><span className="out"><small>ILLUSTRATIVE OUTCOME</small><span>NOT READY</span></span></li>
      </ol>
      <p className="sb-why"><b>Why NOT READY:</b> independent reconciliation confirmed the ledger allocation is wrong (steps 05–06).</p>
      <div className="bands">
        <div className="band u"><span className="label">Visible uncertainty</span><p>The sandbox callback limitation remains attached to the conclusion. Zuvvix does not convert it into confidence.</p></div>
        <div className="band c"><span className="label">Customer authority</span><p>Customer release authority accepts, rejects or requests further evidence. Zuvvix records the decision and rationale.</p></div>
      </div>
    </div>
    <p className="caption" style={{ marginTop: '16px' }}>Illustrative reference behavior for Mandate 01. Not a claim that this scenario has been demonstrated end to end.</p>
    <p className="links2"><a className="link-arrow" href="/from-change-to-evidence/">Watch the same scenario form an Assurance Case</a></p>
  </div>
</section>

{/*  07 UNDERSTAND BEFORE TESTING  */}
<section className="sec" id="understand" aria-labelledby="h-un">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">07</span><span className="label">Understand before testing</span></p>
      <h2 className="h2" id="h-un" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>Context and impact determine what assurance is justified.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>Continuous Release Assurance does not begin by asking which regression suite to run. It begins by reconstructing the knowledge basis for the assignment and determining what could materially be affected.</p>
    </div>
    <dl className="obj4">
      <div><dt>CONTEXT MANIFEST</dt><dd>Applicable intended rules, implementation/configuration, observed behavior, dependencies, journey structure, historical failures, existing tests and environment state.</dd></div>
      <div className="gap"><dt>KNOWLEDGE GAP</dt><dd>A material missing/conflicting fact with affected conclusion, resolution method, owner and deadline.</dd></div>
      <div><dt>IMPACT MAP</dt><dd>What appears impacted, why, what appears unaffected, evidence basis, incomplete dependencies and material conditions requiring validation.</dd></div>
      <div><dt>ASSURANCE PLAN</dt><dd>Risk-specific work, reasons for every activity, and reasons for any material omission.</dd></div>
    </dl>
    <div className="co"><span className="label">Quality rule</span><p>Under-testing and over-testing are both symptoms of weak impact understanding. Zuvvix should be able to explain why assurance is required—not simply execute more of it.</p></div>
  </div>
</section>

{/*  08 QUALIFIED ASSURANCE & AUTHORITY  */}
<section className="sec tint" id="authority" aria-labelledby="h-au">
  <div className="wrap">
    <p className="kicker"><span className="idx">08</span><span className="label">Qualified assurance &amp; authority</span></p>
    <h2 className="h2" id="h-au" style={{ maxWidth: '20ch' }}>The system may propose. Policy decides whether it may act.</h2>
    <dl className="preq" aria-label="Questions before execution">
      <div><dt>Is the competency qualified?</dt><dd>Only a competency/model/tool/configuration qualified for the relevant context can perform the action autonomously.</dd></div>
      <div><dt>Is the action permitted?</dt><dd>External policy evaluates mandate scope, authority class, environment and customer permissions.</dd></div>
      <div><dt>Are preconditions satisfied?</dt><dd>Environment, data, credentials, versions, dependencies and required state must be established or limitations recorded.</dd></div>
      <div><dt>Can the action cause side effects?</dt><dd>State-changing actions require tighter policy; consequential production actions remain outside initial autonomy.</dd></div>
      <div><dt>What if any check fails?</dt><dd>Do not execute blindly. Escalate, change the plan or preserve the unresolved condition.</dd></div>
    </dl>
    <div className="auth4" aria-label="Authority classes">
      <div className="ac4 a"><span className="cl">A</span><h3>Observe</h3><span className="bar" aria-hidden="true"></span><p>Read requirements, telemetry, logs, code metadata.</p><span className="post">Usually bounded autonomous</span></div>
      <div className="ac4 b"><span className="cl">B</span><h3>Non-destructive validation</h3><span className="bar" aria-hidden="true"></span><p>Run tests, read-only APIs, isolated journeys, compare datasets.</p><span className="post">May become autonomous after qualification</span></div>
      <div className="ac4 c"><span className="cl">C</span><h3>State-changing non-production</h3><span className="bar" aria-hidden="true"></span><p>Create/reset data, deploy test artifacts, modify test assets.</p><span className="post">Tighter policy and possibly approval</span></div>
      <div className="ac4 d"><span className="cl">D</span><h3>Consequential</h3><span className="bar" aria-hidden="true"></span><p>Alter production, accept risk, authorize release.</p><span className="post">Outside first-mandate Zuvvix autonomy</span></div>
    </div>
    <p className="links2"><a className="link-arrow" href="/trust/">Explore Trust &amp; Authority</a></p>
  </div>
</section>

{/*  09 INVESTIGATE, VERIFY, PROVE  */}
<section className="sec" id="verify" aria-labelledby="h-ve">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">09</span><span className="label">Investigate, verify, prove</span></p>
      <h2 className="h2" id="h-ve" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>A failed check is not automatically a product defect.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>Continuous Release Assurance preserves competing hypotheses until evidence discriminates among them.</p>
    </div>
    <div className="origins" aria-label="Where a failure may originate">
      <span className="label">A failure may originate in</span>
      <span className="o p">the product</span><span className="o">the expected result</span><span className="o">a business rule</span><span className="o">the environment</span><span className="o">data</span><span className="o">automation</span><span className="o">a dependency</span><span className="o">configuration</span><span className="o">an unsupported assumption</span>
    </div>
    <dl className="vm" aria-label="Verification mechanisms">
      <div><dt>Authoritative business rule</dt><dd>Ground the expected behavior in an approved source.</dd></div>
      <div><dt>Deterministic calculation</dt><dd>Independently establish a material numerical or logical condition.</dd></div>
      <div><dt>Database reconciliation</dt><dd>Compare downstream state against the required outcome.</dd></div>
      <div><dt>API observation / telemetry</dt><dd>Observe actual behavior through controlled sources.</dd></div>
      <div><dt>Independent execution / trusted oracle</dt><dd>Establish correctness independently of the reasoning model.</dd></div>
      <div className="h"><dt>Human expert adjudication</dt><dd>Resolve high-consequence ambiguity or specialist judgment.</dd></div>
    </dl>
    <div className="co dark"><span className="label">Evidence rule</span><p>A second model agreeing with the first is not independent correctness evidence. Material conclusions must trace to evidence with provenance, applicability, freshness, sufficiency and—where warranted—independence.</p></div>
  </div>
</section>

{/*  10 OUTPUT  */}
<section className="sec tint" id="output" aria-labelledby="h-out">
  <div className="wrap">
    <p className="kicker"><span className="idx">10</span><span className="label">The output is a decision package</span></p>
    <h2 className="h2" id="h-out">Assurance Case + readiness position.</h2>
    <div className="pkg">
      <article className="acl" aria-label="Assurance Case components">
        <div className="acl-top"><span className="label" style={{ color: 'var(--navy)' }}>Zuvvix Assurance Case</span><span className="tag">Every assignment</span></div>
        <ol>
          <li><b>Change Manifest</b><span>What changed?</span></li>
          <li><b>Context Manifest</b><span>What did Zuvvix know and rely upon?</span></li>
          <li><b>Impact Map</b><span>What could be affected?</span></li>
          <li><b>Assurance Plan</b><span>What did Zuvvix decide to validate and why?</span></li>
          <li><b>Execution Evidence</b><span>What was actually performed?</span></li>
          <li><b>Findings</b><span>What failed or remains questionable?</span></li>
          <li className="u"><b>Exceptions &amp; Uncertainty</b><span>What could not be established?</span></li>
          <li><b>Residual Risk Position</b><span>What meaningful uncertainty remains?</span></li>
          <li><b>Readiness Assessment</b><span>What is the Zuvvix conclusion?</span></li>
          <li><b>Provenance</b><span>Which models, tools, versions, environments and evidence references support the case?</span></li>
        </ol>
      </article>
      <div className="rstates" aria-label="Readiness states">
        <span className="label">Every assignment ends in one of four states</span>
        <div className="rs r"><i aria-hidden="true"></i>READY</div>
        <div className="rs w"><i aria-hidden="true"></i>READY WITH EXCEPTIONS</div>
        <div className="rs n"><i aria-hidden="true"></i>NOT READY</div>
        <div className="rs d"><i aria-hidden="true"></i>INDETERMINATE</div>
        <p>The customer initially retains final release authorization.</p>
      </div>
    </div>
    <p className="links2"><a className="link-arrow" href="/assurance-case/">See the Zuvvix Assurance Case</a><a className="link-arrow" href="/readiness/">Explore the readiness states</a></p>
  </div>
</section>

{/*  11 MEASUREMENT  */}
<section className="sec" id="measured" aria-labelledby="h-me">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">11</span><span className="label">How the capability will be measured</span></p>
      <h2 className="h2" id="h-me" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>Metrics are operating commitments—not marketing claims.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>These are the metrics Zuvvix intends to measure. No improvement percentages are published before a design-partner baseline and controlled evidence exist.</p>
    </div>
    <div className="kpis">
      <div className="kpi ns"><h3>False-Green Rate</h3><p>Releases assessed READY where material in-scope assurance failure should have prevented that conclusion.</p><span className="tv">North-star quality metric</span></div>
      <div className="kpi"><h3>Material Escape Rate</h3><p>Material production defects attributable to mandate scope.</p><span className="tv">To be baselined</span></div>
      <div className="kpi"><h3>Decision Lead Time</h3><p>Elapsed time from adequate change intake to defensible readiness assessment.</p><span className="tv">To be baselined</span></div>
      <div className="kpi"><h3>Critical-Journey Assurance Coverage</h3><p>Extent to which agreed material journey risks have current evidence.</p><span className="tv">To be baselined</span></div>
      <div className="kpi"><h3>Material Uncertainty Exposure</h3><p>Number and severity of unresolved conditions presented before release.</p><span className="tv">To be baselined</span></div>
      <div className="kpi"><h3>Recurrent Failure Rate</h3><p>Known failure modes escaping again after corrective learning.</p><span className="tv">To be baselined</span></div>
      <div className="kpi"><h3>Customer Effort</h3><p>Customer time consumed in clarifications, approvals and coordination.</p><span className="tv">To be baselined</span></div>
      <div className="kpi"><h3>Cost per Accepted Assurance Assignment</h3><p>End-to-end economic cost of producing a usable assessment.</p><span className="tv">To be baselined</span></div>
    </div>
    <div className="co"><span className="label">North-star quality metric</span><p>False-Green Rate is especially important. The system must not look successful by producing READY quickly if that readiness position should not have been issued.</p></div>
  </div>
</section>

{/*  12 DESIGN PARTNERSHIP  */}
<section className="sec dp" id="partnership" aria-labelledby="h-dp">
  <div className="wrap dp-grid">
    <div className="stack">
      <p className="kicker"><span className="idx">12</span><span className="label">Design partnership</span></p>
      <h2 className="h2" id="h-dp">Start with one critical journey in shadow mode.</h2>
      <p className="lede">Choose one critical digital business journey. Give Zuvvix visibility into the changes affecting it. Zuvvix will determine what needs assurance, perform work within agreed authority and produce an evidence-backed readiness position for every relevant release.</p>
      <div className="shadow"><span className="label">How responsibility grows</span>
        <ol><li><small>FIRST</small>Run alongside the existing process</li><li><small>THEN</small>Compare outcomes and build evidence</li><li><small>ONLY AFTER</small>Accept greater responsibility or autonomy</li></ol>
      </div>
      <div className="cta-row">
        <a className="btn btn-primary" href="/design-partnership/">Explore a design partnership</a>
        <a className="btn btn-quiet" href="/quality-mandate/">See how the mandate works</a>
      </div>
    </div>
    <div>
      <span className="label" style={{ color: '#98A2B3', display: 'block', marginBottom: '12px' }}>A strong first design partner has</span>
      <ul className="chars">
        <li><b>A clearly identifiable critical journey</b><span>Creates a bounded responsibility and measurable outcome.</span></li>
        <li><b>Approximately 3–8 interacting systems</b><span>Complex enough to expose cross-system risk without becoming unbounded.</span></li>
        <li><b>Meaningful release/change frequency</b><span>Enables repeated assignments and learning.</span></li>
        <li><b>Existing automation/testing assets</b><span>Lets Zuvvix orchestrate and qualify existing capabilities rather than rebuild commodity runners.</span></li>
        <li><b>Accessible ALM/CI/CD/change data</b><span>Supports timely change intake and context.</span></li>
        <li><b>A stable enough non-production environment</b><span>Allows meaningful evidence collection.</span></li>
        <li><b>Identifiable business owners and an executive sponsor</b><span>Supports intent resolution, risk acceptance and authority.</span></li>
        <li><b>Willingness to begin in shadow mode</b><span>Comparing outcomes creates defensible demonstration evidence.</span></li>
      </ul>
    </div>
  </div>
</section>

{/*  13 CLAIMS  */}
<section className="sec" id="claims" aria-labelledby="h-cl">
  <div className="wrap">
    <p className="kicker"><span className="idx">13</span><span className="label">Designed, not yet proven</span></p>
    <h2 className="h2" id="h-cl" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>What we say today—and what we will not say until evidence exists.</h2>
    <div className="say">
      <div className="yes"><h3>WHAT WE SAY TODAY</h3><ul>
        <li>Zuvvix is designing Continuous Release Assurance around one recurring Quality Mandate.</li>
        <li>The specified model uses sourced context, qualified competencies, bounded execution and Assurance Cases.</li>
        <li>The reference scenario shows how a cross-system partial-refund change should be assessed.</li>
        <li>We intend to measure False-Green Rate, Decision Lead Time, uncertainty exposure and customer effort.</li>
      </ul></div>
      <div className="no"><h3>NOT UNTIL CONTROLLED EVIDENCE EXISTS</h3><ul>
        <li>Any defect-reduction percentage.</li>
        <li>Autonomous end-to-end assurance of enterprise releases.</li>
        <li>Any claim that this outcome is already proven in production.</li>
        <li>Any ROI, productivity or coverage percentage.</li>
      </ul></div>
    </div>
    <div className="cta-row" style={{ marginTop: '36px' }}>
      <a className="btn btn-primary" href="/design-partnership/">Explore a design partnership</a>
      <a className="btn btn-quiet" href="/assurance-case/">See the Zuvvix Assurance Case</a>
    </div>
    <div className="finalstd">
      <p style={{ maxWidth: 'none', lineHeight: 1.25, textWrap: 'balance', hyphens: 'none' }}>
        What it would mean for someone to actually operate a defined quality responsibility for one critical journey—change after change, with evidence.
      </p>
    </div>
  </div>
</section>

    </>
  )
}
