import React from 'react'
import { Link } from 'react-router-dom'
import { HeadMeta } from '@/components/seo/HeadMeta'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useModal } from '@/context/ModalContext'

export function HowItWorks() {
  useScrollReveal()
  const { openFollow } = useModal()

  return (
    <>
      <HeadMeta
        title="How Zuvvix Works | Zuvvix"
        description="How Zuvvix operates: from an enterprise change to qualified assurance inside explicit authority, defensible evidence and a release decision."
        canonicalPath="/how-it-works/"
      />
      

{/*  01 HERO  */}
<section className="hw-hero" id="top" aria-labelledby="h1">
  <div className="wrap">
    <p className="eyebrow">How Zuvvix works</p>
    <h1 className="h1" id="h1">One quality responsibility. One governed path to evidence.</h1>
    <p className="lede">Zuvvix starts with a Quality Mandate, builds the enterprise context needed to act, applies qualified competence inside explicit authority, and produces an evidence-backed readiness position—then improves future capability through governed learning.</p>
    <div className="cta-row">
      <a className="btn btn-primary" href="/continuous-release-assurance/">Explore Continuous Release Assurance</a>
      <a className="btn btn-quiet" href="/quality-mandate/">Understand the Quality Mandate</a>
    </div>
    <p className="matnote"><span className="tag blue"><span className="dot"></span>Designed</span><span>This page describes the designed Zuvvix operating model. Demonstrated capabilities and production evidence will be published separately as incremental releases mature.</span></p>
    <ol className="quiet" aria-label="The seven stages and the question each answers">
      <li><b>QUALITY MANDATE</b><span>What are we responsible for?</span></li>
      <li><b>ENTERPRISE INTELLIGENCE</b><span>What must we know?</span></li>
      <li><b>QUALIFIED COMPETENCE</b><span>What are we qualified to do?</span></li>
      <li><b>CONTROLLED EXECUTION</b><span>What are we allowed to do?</span></li>
      <li><b>EVIDENCE</b><span>What did we actually observe?</span></li>
      <li><b>DECISION</b><span>What can we defensibly conclude?</span></li>
      <li><b>LEARNING</b><span>What should improve next?</span></li>
    </ol>
  </div>
</section>

{/*  02 SYSTEM SPINE (ZW-05A)  */}
<section className="sec tint" id="spine" aria-labelledby="h-spine">
  <div className="wrap">
    <p className="kicker"><span className="idx">02</span><span className="label">The system spine</span></p>
    <div className="sh2">
      <h2 className="h2" id="h-spine">The platform is not the agents.</h2>
      <p className="sub">It is the governed system that connects responsibility to evidence.</p>
      <p className="lede">Each stage exists because the next stage cannot be trusted without it.</p>
    </div>
    <ol className="spine7" data-anim aria-label="System spine, in causal order">
      <li className="key"><a className="stagecard" href="#mandate"><span className="sn">QUALITY<br />MANDATE</span><span className="dot" aria-hidden="true"></span><span className="qq">What are we responsible for?</span></a><p className="exp">A bounded responsibility with scope, obligations, exclusions, authority, evidence requirements and service levels.</p></li>
      <li><a className="stagecard" href="#intelligence"><span className="sn">ENTERPRISE<br />INTELLIGENCE</span><span className="dot" aria-hidden="true"></span><span className="qq">What must we know?</span></a><p className="exp">Sourced, versioned understanding of intent, implementation, observed behaviour, dependencies and uncertainty.</p></li>
      <li><a className="stagecard" href="#competence"><span className="sn">QUALIFIED<br />COMPETENCE</span><span className="dot" aria-hidden="true"></span><span className="qq">What are we qualified to do?</span></a><p className="exp">Versioned procedures that have been evaluated for defined contexts; qualification is separate from the procedure itself.</p></li>
      <li><a className="stagecard" href="#execution"><span className="sn">CONTROLLED<br />EXECUTION</span><span className="dot" aria-hidden="true"></span><span className="qq">What are we allowed to do?</span></a><p className="exp">Actions execute only within explicit authority, environment and budget, with persisted state and guarded side effects.</p></li>
      <li className="key"><a className="stagecard" href="#evidence"><span className="sn">EVIDENCE</span><span className="dot" aria-hidden="true"></span><span className="qq">What did we actually observe?</span></a><p className="exp">Raw and derived material with provenance, applicability, validity, transformations and limitations.</p></li>
      <li className="key"><a className="stagecard" href="#decision"><span className="sn">DECISION</span><span className="dot" aria-hidden="true"></span><span className="qq">What can we defensibly conclude?</span></a><p className="exp">A readiness position grounded in the Assurance Case, including contrary evidence and unresolved uncertainty.</p></li>
      <li><a className="stagecard" href="#learning"><span className="sn">LEARNING</span><span className="dot" aria-hidden="true"></span><span className="qq">What should improve next?</span></a><p className="exp">Delivery creates proposals that must be evaluated, reviewed and promoted under control.</p></li>
    </ol>
    <div className="constrain">
      <b>Each stage constrains and substantiates the next.</b>
      <span>No mandate → no bounded responsibility. No sufficient context → no defensible action.</span>
      <em>No evidence → no trustworthy decision.</em>
    </div>
  </div>
</section>

{/*  03 QUALITY MANDATE  */}
<section className="sec" id="mandate" aria-labelledby="h-mandate">
  <div className="wrap split">
    <div className="stack">
      <p className="kicker"><span className="idx">03</span><span className="label">Start with a Quality Mandate</span></p>
      <h2 className="h2" id="h-mandate">Responsibility is defined before work begins.</h2>
      <p className="lede">A Quality Mandate records what Zuvvix is responsible for, what sits outside the boundary, what authority exists, what evidence is required and how the responsibility will be measured. The mandate is the commercial and governance anchor; individual assignments operate inside it.</p>
      <div className="co callout"><span className="label">Why it matters</span><p>Without a mandate, automation can be fast but accountability remains fragmented.</p></div>
      <p className="deeplink"><a className="link-arrow" href="/quality-mandate/">Understand the Quality Mandate</a></p>
    </div>
    <div>
      <div className="mandate" aria-label="What the mandate makes explicit">
        <span className="mandate-tab">QUALITY MANDATE</span>
        <dl>
          <div className="mrow"><dt>Scope</dt><dd>Business journey, systems, environments, relevant changes.</dd></div>
          <div className="mrow"><dt>Obligations</dt><dd>Conditions Zuvvix must address and service commitments it accepts.</dd></div>
          <div className="mrow"><dt>Authority</dt><dd>What can be observed, validated, changed or escalated.</dd></div>
          <div className="mrow"><dt>Evidence requirements</dt><dd>What must be substantiated before a readiness position is defensible.</dd></div>
          <div className="mrow"><dt>Owners and escalation</dt><dd>Who resolves business ambiguity, accepts residual risk or authorizes consequential action.</dd></div>
        </dl>
      </div>
      <dl className="excl">
        <dt>Exclusions</dt>
        <dd>Customer decisions, inaccessible dependencies, out-of-scope systems or unowned intent.</dd>
      </dl>
    </div>
  </div>
</section>

{/*  04 ENTERPRISE INTELLIGENCE (ZW-05B)  */}
<section className="sec tint" id="intelligence" aria-labelledby="h-ei">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">04</span><span className="label">Build Enterprise Intelligence before acting</span></p>
      <h2 className="h2" id="h-ei" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>Know what matters before deciding what to test.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>Zuvvix does not flatten enterprise knowledge into a single story. It preserves what the business intended, what the system appears to implement and what execution or production evidence actually shows. These sources can disagree—and that disagreement can be material.</p>
    </div>
    <div className="ei" data-anim>
      <div className="ei-cards">
        <div className="ei-card"><h3>INTENDED</h3><span className="src">Authorized rules</span><span className="mean">What authorized business rules say should happen.</span><p className="ex"><small>Example question</small>What is the approved refund allocation rule?</p><span className="meta">Source • scope • version • verification • validity</span></div>
        <div className="ei-card"><h3>IMPLEMENTED</h3><span className="src">Code + configuration</span><span className="mean">What code or configuration appears to implement.</span><p className="ex"><small>Example question</small>What allocation logic is deployed in this version?</p><span className="meta">Source • scope • version • verification • validity</span></div>
        <div className="ei-card"><h3>OBSERVED</h3><span className="src">Execution + runtime evidence</span><span className="mean">What execution and production evidence show.</span><p className="ex"><small>Example question</small>What allocation actually occurred in the test or runtime trace?</p><span className="meta">Source • scope • version • verification • validity</span></div>
      </div>
      <div className="ei-join">
        <svg className="ei-link" viewBox="0 0 1200 110" preserveAspectRatio="none" aria-hidden="true">
          <path d="M200 0 L540 110 M600 0 L600 110 M1000 0 L660 110" stroke="#B54708" strokeWidth="1.6" strokeDasharray="6 6" fill="none" vector-effect="non-scaling-stroke"/>
        </svg>
        <span className="ei-lab">Disagreement is data, not noise</span>
      </div>
      <div className="manifest">
        <h3>CONTEXT MANIFEST</h3>
        <p>For each assignment, Zuvvix creates a versioned Context Manifest that records the exact claims, relationships and versions used as the knowledge basis for the assessment.</p>
        <em>Uncertainty and knowledge gaps remain explicit.</em>
      </div>
    </div>
    <div className="co callout dark" style={{ marginTop: '40px' }}><span className="label">Distinctive rule</span><p>Production behaviour does not become correct merely because it is what the system currently does. A confident model statement is not verification.</p></div>
  </div>
</section>

{/*  05 QUALIFIED COMPETENCE  */}
<section className="sec" id="competence" aria-labelledby="h-comp">
  <div className="wrap">
    <p className="kicker"><span className="idx">05</span><span className="label">Use qualified competence, not generic agents</span></p>
    <h2 className="h2" id="h-comp" style={{ maxWidth: '22ch' }}>A model can generate an answer. That does not make it qualified expertise.</h2>
    <p className="lede" style={{ marginTop: '22px' }}>Zuvvix treats competence as a versioned executable contract: supported tasks, prerequisites, required knowledge, tools, procedures, output expectations, failure modes, escalation rules, permissions, cost limits and evaluation cases. Qualification is a separate record that says where a specific competency, model, tool and configuration combination is approved to operate.</p>
    <div className="dq">
      <div className="dq-card dq-def"><h3>DEFINITION</h3>
        <p>What the procedure is designed to do.</p>
        <p>Contains prerequisites, tools, limits, outputs and failure behaviour.</p>
        <p>Can exist before approval.</p>
      </div>
      <div className="dq-mid" aria-hidden="true"><span className="gate"></span><span>EVALUATED<br />+ APPROVED</span></div>
      <div className="dq-card dq-q"><h3>QUALIFICATION</h3>
        <p>Where that exact procedure/model/tool/configuration has been demonstrated and approved to operate.</p>
        <p>Contains evaluation-set version, results, reviewer, supported contexts, expiry/review triggers and deployment mode.</p>
        <p>Does not transfer automatically when the model, tool or configuration changes.</p>
      </div>
    </div>
    <div className="qstates" aria-label="How qualification affects what can proceed">
      <div className="qs ok"><b><i></i>QUALIFIED FOR THIS CONTEXT</b><p>The competency may operate within the approved context and deployment mode.</p></div>
      <div className="qs no"><b><i></i>NOT QUALIFIED</b><p>The model, tool or configuration changed, or the context is unsupported. The work does not pass forward until it is re-evaluated.</p></div>
    </div>
  </div>
</section>

{/*  06 CONTROLLED EXECUTION  */}
<section className="sec tint" id="execution" aria-labelledby="h-exec">
  <div className="wrap">
    <p className="kicker"><span className="idx">06</span><span className="label">Control execution outside the model</span></p>
    <h2 className="h2" id="h-exec" style={{ maxWidth: '22ch' }}>The model may propose an action. Policy decides whether it may happen.</h2>
    <p className="lede" style={{ marginTop: '22px' }}>Controlled Execution keeps actions inside the mandate and the demonstrated qualification. Before a side effect, the system resolves the target and state, checks authority, reserves shared resources when needed, persists intent, executes through a controlled adapter and records the observed result.</p>
    <div className="gatefig" aria-label="Authority gate outside the model">
      <div className="gf">
        <div className="prop"><small>Proposed by the model</small><b>An action on a target system</b><span>Untrusted source text or model reasoning cannot grant itself new permissions.</span></div>
        <div className="pg" aria-hidden="true"><span>POLICY</span><i></i></div>
        <div className="paths">
          <div className="path p"><span className="st">PERMITTED</span><span className="d">Executes through a controlled adapter<small>Intent persisted, side effect guarded, observed result recorded.</small></span></div>
          <div className="path x"><span className="st">STOPPED</span><span className="d">Authority, knowledge or competence is insufficient<small>The action stops and the unresolved decision is escalated explicitly.</small></span></div>
        </div>
      </div>
      <ol className="steps" aria-label="Before a side effect">
        <li>Resolve target and state</li><li>Check authority</li><li>Reserve shared resources</li><li>Persist intent</li><li>Execute through controlled adapter</li><li>Record observed result</li>
      </ol>
    </div>
    <dl className="kv2" style={{ marginTop: '40px' }}>
      <div><dt>External policy enforcement</dt><dd>Untrusted source text or model reasoning cannot grant itself new permissions.</dd></div>
      <div><dt>Persisted state</dt><dd>Long-running work can recover after interruption without pretending nothing happened.</dd></div>
      <div><dt>Guarded side effects</dt><dd>Actions are identified and reconciled before retry to avoid unsafe duplication.</dd></div>
      <div><dt>Bounded retries / deadlines</dt><dd>The system does not loop indefinitely or exceed the agreed resource envelope.</dd></div>
      <div><dt>Environment / credential controls</dt><dd>Access remains scoped; credentials stay outside model-visible context where feasible.</dd></div>
      <div><dt>Escalation</dt><dd>When authority, knowledge or competence is insufficient, the affected action stops with the unresolved decision made explicit.</dd></div>
    </dl>
    <div className="co callout"><span className="label">Bounded autonomy</span><p>Autonomy is earned through qualification and bounded by explicit authority, environment, consequence controls and budget.</p></div>
    <p className="deeplink"><a className="link-arrow" href="/trust/">Explore Trust &amp; Authority</a></p>
  </div>
</section>

{/*  07 EVIDENCE  */}
<section className="sec" id="evidence" aria-labelledby="h-ev">
  <div className="wrap">
    <p className="kicker"><span className="idx">07</span><span className="label">Treat evidence as the basis of confidence</span></p>
    <h2 className="h2" id="h-ev">AI output is not evidence.</h2>
    <p className="lede" style={{ marginTop: '22px' }}>A second model agreeing with the first is not independent verification. Zuvvix preserves the chain from source observation to derivation, interpretation, finding and authorized decision so that a material conclusion can be inspected rather than merely trusted.</p>
    <div className="chain">
      <ol className="links" aria-label="Evidence chain">
        <li><small>Source</small><b>Observation</b><span>Where it came from and how it was obtained.</span></li>
        <li><small>Derived</small><b>Derivation</b><span>Measurements that show their upstream basis.</span></li>
        <li className="interp"><small>Secondary</small><b>Interpretation</b><span>Model reading. Never independent evidence by itself.</span></li>
        <li><small>Supported</small><b>Finding</b><span>Supports or contradicts a condition.</span></li>
        <li className="dec"><small>Owned</small><b>Authorized decision</b><span>Separated from evidence and interpretation.</span></li>
      </ol>
      <div className="ac" aria-label="Assurance Case contents"><b>ASSURANCE CASE</b>
        <ul><li>Agreed conditions</li><li>Supporting evidence</li><li className="c">Contrary evidence</li><li className="c">Omissions</li><li className="u">Unresolved assumptions</li><li>Validity</li></ul>
      </div>
    </div>
    <dl className="kv2" style={{ marginTop: '40px' }}>
      <div><dt>Source + collection method</dt><dd>Where the observation came from and how it was obtained.</dd></div>
      <div><dt>Raw artefact reference + integrity metadata</dt><dd>Preserve the original basis rather than only a summary.</dd></div>
      <div><dt>Context / execution versions</dt><dd>Show the conditions under which the evidence applies.</dd></div>
      <div><dt>Transformations / interpretations</dt><dd>Make derived measurements and model interpretation visible.</dd></div>
      <div><dt>Limitations</dt><dd>Prevent evidence from being applied more broadly than it supports.</dd></div>
      <div><dt>Dependent findings</dt><dd>Connect observations to the conditions or hypotheses they support or contradict.</dd></div>
    </dl>
    <div className="co callout"><span className="label">Assurance Case</span><p>The Zuvvix Assurance Case organizes agreed conditions, supporting evidence, contrary evidence, omissions, unresolved assumptions and validity into a defensible decision record.</p></div>
    <p className="deeplink"><a className="link-arrow" href="/assurance-case/">Explore the Assurance Case</a></p>
  </div>
</section>

{/*  08 DECISION  */}
<section className="sec tint" id="decision" aria-labelledby="h-dec">
  <div className="wrap">
    <p className="kicker"><span className="idx">08</span><span className="label">Make uncertainty part of the decision</span></p>
    <h2 className="h2" id="h-dec">Readiness is not a forced pass/fail answer.</h2>
    <p className="lede" style={{ marginTop: '22px' }}>The decision layer turns the Assurance Case into an executive readiness position. When the evidence does not justify a conclusion, Zuvvix must be allowed to say so.</p>
    <div className="state-grid">
      <div className="sc ready"><span className="sh"><i></i>READY</span><p>Agreed assurance conditions are satisfied and no material unresolved issue is known within mandate scope.</p></div>
      <div className="sc rwe"><span className="sh"><i></i>READY WITH EXCEPTIONS</span><p>Conditions are substantially satisfied, but explicit residual issues require customer acceptance.</p></div>
      <div className="sc nr"><span className="sh"><i></i>NOT READY</span><p>Material evidence indicates unacceptable failure or required conditions remain unsatisfied.</p></div>
      <div className="sc ind"><span className="sh"><i></i>INDETERMINATE</span><p>There is not enough evidence to make a defensible readiness conclusion.</p><span className="valid">A trustworthy answer</span></div>
    </div>
    <div className="co callout dark"><span className="label">Trust rule</span><p>INDETERMINATE is a trustworthy answer when evidence is insufficient. It is not a cosmetic error state.</p></div>
    <p className="deeplink"><a className="link-arrow" href="/readiness/">Explore the readiness states</a></p>
  </div>
</section>

{/*  09 LEARNING  */}
<section className="sec" id="learning" aria-labelledby="h-learn">
  <div className="wrap">
    <p className="kicker"><span className="idx">09</span><span className="label">Improve without uncontrolled self-modification</span></p>
    <h2 className="h2" id="h-learn" style={{ maxWidth: '22ch' }}>Learning is proposed, evaluated and promoted—not silently absorbed.</h2>
    <p className="lede" style={{ marginTop: '22px' }}>Every mandate, expert intervention, escaped defect and correction can improve future Zuvvix capability. But delivery experience first becomes a Learning Proposal. Proposed knowledge or competency changes must carry provenance and rights, be evaluated against relevant cases, reviewed and then promoted through controlled deployment.</p>
    <div className="loop6">
      <ol aria-label="Governed learning loop">
        <li>DELIVERY EVIDENCE</li><li>LEARNING PROPOSAL</li><li className="ev">EVALUATION</li><li className="ev">REVIEW</li><li>BOUNDED PROMOTION</li><li>MONITORING / ROLLBACK</li>
      </ol>
      <svg viewBox="0 0 1200 56" preserveAspectRatio="none" aria-hidden="true"><path d="M1100 4 V26 Q1100 46 1080 46 H120 Q100 46 100 26 V14" fill="none" stroke="#98A2B3" strokeWidth="1.5" vector-effect="non-scaling-stroke"/><path d="M100 4 l-6 12 h12 z" fill="#98A2B3"/></svg>
      <p className="ret">Monitoring feeds the next cycle. Nothing reaches promotion without evaluation and review.</p>
    </div>
    <div className="co callout"><span className="label">Governed learning</span><p>Learn from delivery without allowing one customer correction, model suggestion or workaround to silently rewrite global capability.</p></div>
  </div>
</section>

{/*  10 FIVE MOTIONS (ZW-05C)  */}
<section className="sec tint" id="motions" aria-labelledby="h-mot">
  <div className="wrap">
    <p className="kicker"><span className="idx">10</span><span className="label">The five operating motions</span></p>
    <h2 className="h2" id="h-mot">Understand. Assure. Act. Prove. Improve.</h2>
    <ol className="motions" aria-label="Five operating motions">
      <li className="k"><h3>UNDERSTAND</h3><span className="n" aria-hidden="true">1</span><span className="bl">Know what matters before deciding what to test.</span><span className="pm">Persistent Enterprise Intelligence captures intent, implementation, observed behaviour, dependencies and uncertainty.</span></li>
      <li><h3>ASSURE</h3><span className="n" aria-hidden="true">2</span><span className="bl">Use the right assurance—not simply more assurance.</span><span className="pm">Qualified human and machine competencies perform the appropriate work for the risk.</span></li>
      <li><h3>ACT</h3><span className="n" aria-hidden="true">3</span><span className="bl">Autonomy is earned, bounded and enforced.</span><span className="pm">Execution operates tools and workflows within explicit authority.</span></li>
      <li className="k"><h3>PROVE</h3><span className="n" aria-hidden="true">4</span><span className="bl">AI output is not evidence.</span><span className="pm">Material conclusions are supported by traceable, independently verifiable evidence.</span></li>
      <li><h3>IMPROVE</h3><span className="n" aria-hidden="true">5</span><span className="bl">Learn without uncontrolled self-modification.</span><span className="pm">Delivery can improve future capability through controlled evaluation.</span></li>
    </ol>
    <div className="motions-ret">
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true"><path d="M1110 4 Q1110 50 600 50 Q110 50 110 14" fill="none" stroke="#C9D3EA" strokeWidth="2" vector-effect="non-scaling-stroke"/><path d="M110 2 l-7 14 h14 z" fill="#98A2B3"/></svg>
      <p>Learning returns through evaluation before promotion—never through silent self-modification.</p>
    </div>
  </div>
</section>

{/*  11 HUMAN + MACHINE  */}
<section className="sec" id="judgment" aria-labelledby="h-hm">
  <div className="wrap">
    <p className="kicker"><span className="idx">11</span><span className="label">Human + machine operating model</span></p>
    <h2 className="h2" id="h-hm" style={{ maxWidth: '20ch' }}>Zuvvix is not designed to remove human judgment.</h2>
    <p className="lede" style={{ marginTop: '22px' }}>The operating model deliberately separates repeatable machine execution from ambiguity, consequence and formal qualification. A broad service can be Zuvvix-owned while some decisions remain in assist, supervised or expert-review modes.</p>
    <div className="hm">
      <div><h3>Machines are suited to</h3><ul><li>Context retrieval within access policy</li><li>Repeatable qualified validation</li><li>Evidence collection and traceability</li><li>Drafting scenarios and investigations</li><li>Persistent execution state / telemetry</li></ul></div>
      <div><h3>Humans remain central for</h3><ul><li>Ambiguous or contradictory business intent</li><li>Consequential judgment and residual-risk acceptance</li><li>Independent review where consequence requires it</li><li>Specialist-only methods and novel failure interpretation</li><li>Qualification, adjudication, exception handling and policy decisions</li></ul></div>
    </div>
  </div>
</section>

{/*  12 POSTURE + CTA  */}
<section className="sec tint" id="posture" aria-labelledby="h-post">
  <div className="wrap">
    <p className="kicker"><span className="idx">12</span><span className="label">Current posture</span></p>
    <h2 className="h2" id="h-post" style={{ maxWidth: '22ch' }}>Designed now. Evidence published as it is earned.</h2>
    <p className="lede" style={{ marginTop: '22px' }}>This page describes the designed Zuvvix operating model. Demonstrated capabilities and production evidence will be published separately as incremental releases mature.</p>
    <div className="claims5" role="table" aria-label="Claims maturity">
      <div className="c5 h" role="row"><span role="columnheader">Concept</span><span role="columnheader">Current public state</span><span role="columnheader">What that means</span></div>
      <div className="c5" role="row"><span className="c" role="cell">Outcome-Accountable Quality Operations</span><span className="s th" role="cell">THESIS / CATEGORY</span><span className="l" role="cell">Our category definition and operating-model belief.</span></div>
      <div className="c5" role="row"><span className="c" role="cell">System architecture</span><span className="s now" role="cell">DESIGNED</span><span className="l" role="cell">Zuvvix is designed to work as described on this page.</span></div>
      <div className="c5" role="row"><span className="c" role="cell">Mandate / Context / Qualification / Evidence contracts</span><span className="s now" role="cell">DESIGNED</span><span className="l" role="cell">The product design defines these contracts.</span></div>
      <div className="c5" role="row"><span className="c" role="cell">Specific prototype behavior</span><span className="s" role="cell">DEMONSTRATED</span><span className="l" role="cell">Claimed only when a repeatable controlled demo exists, with its scope stated.</span></div>
      <div className="c5" role="row"><span className="c" role="cell">Enterprise performance / outcomes</span><span className="s" role="cell">PROVEN</span><span className="l" role="cell">Claimed only after repeated real-world operation, with context, time and sample stated.</span></div>
    </div>
    <div className="final">
      <div className="cta-row">
        <a className="btn btn-primary" href="/continuous-release-assurance/">Explore Continuous Release Assurance</a>
        <a className="btn btn-quiet" href="/quality-mandate/">Understand the Quality Mandate</a>
      </div>
      <p className="deeplink"><a className="link-arrow" href="/assurance-case/">Assurance Case</a><a className="link-arrow" href="/trust/">Trust &amp; Authority</a><a className="link-arrow" href="/category/">The category</a></p>
    </div>
  </div>
</section>

    </>
  )
}
