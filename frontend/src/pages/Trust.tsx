import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HeadMeta } from '@/components/seo/HeadMeta'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useModal } from '@/context/ModalContext'

interface GateInfo {
  status: 'pass' | 'cond' | 'fail' | 'skip'
  label: string
  why: string
}

interface ProposedAction {
  key: string
  classTag: string
  label: string
  act: string
  cls: string
  g1: GateInfo
  g2: GateInfo
  g3: GateInfo
  out: 'ALLOW' | 'REQUIRE APPROVAL' | 'BLOCK' | 'ESCALATE / REPLAN'
  why: string
}

const PROPOSED_ACTIONS: Record<string, ProposedAction> = {
  read: {
    key: 'read',
    classTag: 'CLASS A',
    label: 'Read finance-ledger telemetry',
    act: 'Read finance-ledger telemetry',
    cls: 'Class A · Observe',
    g1: {
      status: 'pass',
      label: 'PASS',
      why: 'Observation competency qualified for this journey.',
    },
    g2: {
      status: 'pass',
      label: 'PASS',
      why: 'Read access is inside the mandate and access policy.',
    },
    g3: {
      status: 'pass',
      label: 'PASS',
      why: 'Telemetry source available and current.',
    },
    out: 'ALLOW',
    why: 'permission is explicit and auditable.',
  },
  reset: {
    key: 'reset',
    classTag: 'CLASS C',
    label: 'Reset shared test data in the finance sandbox',
    act: 'Reset shared test data in the finance sandbox',
    cls: 'Class C · Non-production state change',
    g1: {
      status: 'pass',
      label: 'PASS',
      why: 'Data-reset procedure qualified for the sandbox.',
    },
    g2: {
      status: 'cond',
      label: 'APPROVAL REQ.',
      why: 'Class C requires explicit authorization for state changes.',
    },
    g3: {
      status: 'pass',
      label: 'PASS',
      why: 'Sandbox isolation verified and credentials valid.',
    },
    out: 'REQUIRE APPROVAL',
    why: 'non-production state change requires explicit human approval.',
  },
  prod: {
    key: 'prod',
    classTag: 'CLASS D',
    label: 'Change production refund configuration',
    act: 'Change production refund configuration',
    cls: 'Class D · Consequential production change',
    g1: {
      status: 'fail',
      label: 'FAIL',
      why: 'No self-directed production change competency qualified.',
    },
    g2: {
      status: 'fail',
      label: 'BLOCKED',
      why: 'Class D action outside delegated mandate authority.',
    },
    g3: {
      status: 'skip',
      label: 'SKIPPED',
      why: 'Preconditions evaluation skipped following authority block.',
    },
    out: 'BLOCK',
    why: 'strict prohibition: release authority stays with the customer.',
  },
  upgrade: {
    key: 'upgrade',
    classTag: 'CLASS B',
    label: 'Run reconciliation with a newly upgraded model',
    act: 'Run reconciliation with a newly upgraded model',
    cls: 'Class B · Non-destructive validation',
    g1: {
      status: 'fail',
      label: 'UNQUALIFIED',
      why: 'New model version has not completed isolated qualification.',
    },
    g2: {
      status: 'pass',
      label: 'PASS',
      why: 'Class B validation permitted in isolated test scope.',
    },
    g3: {
      status: 'pass',
      label: 'PASS',
      why: 'Target datasets and credentials accessible.',
    },
    out: 'ESCALATE / REPLAN',
    why: 'unqualified model update must complete qualification before use.',
  },
  stale: {
    key: 'stale',
    classTag: 'CLASS B',
    label: 'Run journey validation on a stale environment',
    act: 'Run journey validation on a stale environment',
    cls: 'Class B · Non-destructive validation',
    g1: {
      status: 'pass',
      label: 'PASS',
      why: 'Journey validation competency qualified for this service.',
    },
    g2: {
      status: 'pass',
      label: 'PASS',
      why: 'Class B validation permitted in staging environment.',
    },
    g3: {
      status: 'fail',
      label: 'FAIL',
      why: 'Environment heartbeat stale; test data schema mismatch detected.',
    },
    out: 'ESCALATE / REPLAN',
    why: 'current preconditions invalid; execution halted pending fresh environment.',
  },
}

export function Trust() {
  useScrollReveal()
  const { openFollow } = useModal()
  const [activeKey, setActiveKey] = useState<string>('read')
  const cur = PROPOSED_ACTIONS[activeKey] || PROPOSED_ACTIONS.read

  return (
    <>
      <HeadMeta
        title="Bounded Autonomy & Trust | Zuvvix"
        description="How Zuvvix establishes bounded autonomy: explicit delegation, qualified competencies, policy-governed action, transparent limitations and customer release authority."
        canonicalPath="/trust/"
      />
      

{/*  01 HERO  */}
<section className="tr-hero" id="top" aria-labelledby="h1">
  <div className="wrap">
    <p className="eyebrow">Trust &amp; Authority</p>
    <h1 className="h1" id="h1">Autonomy should be earned—not assumed.</h1>
    <p className="lede">Zuvvix is designed to act only inside demonstrated competence and explicit authority. Every consequential action has a defined boundary, every material conclusion requires evidence, and insufficient evidence can stop execution or produce INDETERMINATE rather than manufactured confidence.</p>
    <div className="cta-row">
      <a className="btn btn-primary" href="/continuous-release-assurance/">See Continuous Release Assurance</a>
      <a className="btn btn-quiet" href="/assurance-case/">Explore the Assurance Case</a>
    </div>
    <ol className="four-q" aria-label="Four questions every action must answer">
      <li><small>01</small><b>Is it competent?</b></li>
      <li><small>02</small><b>Is it authorized?</b></li>
      <li><small>03</small><b>Is the evidence sufficient?</b></li>
      <li><small>04</small><b>Who owns the consequence?</b></li>
    </ol>
  </div>
</section>

{/*  02 THREE DIMENSIONS  */}
<section className="sec tint" id="dimensions" aria-labelledby="h-dim">
  <div className="wrap">
    <p className="kicker"><span className="idx">02</span><span className="label">Three things that must stay separate</span></p>
    <h2 className="h2" id="h-dim" style={{ maxWidth: '22ch' }}>Competence, authority and accountability are different control dimensions.</h2>
    <div className="dims3">
      <div className="dim c"><h3>COMPETENCE</h3><p className="q">Can this capability reliably perform this kind of work?</p><p>Qualification is versioned, scoped and evidence-based. A prompt or model is not automatically expertise.</p></div>
      <div className="dim a"><h3>AUTHORITY</h3><p className="q">Is this action permitted here, now, against this target?</p><p>Policy evaluates mandate, action class, environment, permissions, budget, approvals and current uncertainty.</p></div>
      <div className="dim o"><h3>ACCOUNTABILITY</h3><p className="q">Who owns the judgment or consequence?</p><p>Customer authority, Zuvvix accountability and technical execution permission are recorded separately.</p></div>
    </div>
    <p className="neq" aria-hidden="true">COMPETENCE ≠ AUTHORITY ≠ ACCOUNTABILITY</p>
    <div className="co dark"><span className="label">Core trust rule</span><p>A capable system may still be unauthorized. An authorized system may still be unqualified. Zuvvix must require both before autonomous execution.</p></div>
  </div>
</section>

{/*  03 ACTION GATE (ZW-10A)  */}
<section className="sec" id="gate" aria-labelledby="h-gate">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">03</span><span className="label">Action authorization gate</span></p>
      <h2 className="h2" id="h-gate" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>The system may propose. Policy decides whether it may act.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>Bounded autonomy is an action-level decision. A capability may propose an action. It may execute only when competence, authority and current preconditions all support it. Choose a proposed action to see what happens.</p>
    </div>
    <div className="gate-ui" id="gateUi">
      <div className="gate-top"><span className="label" style={{ color: 'var(--navy)' }}>Proposed action · partial-refund journey</span><span className="tag">Illustrative reference behavior</span></div>
      <div className="picker" role="group" aria-label="Choose a proposed action">
        {Object.values(PROPOSED_ACTIONS).map((p) => (
          <button
            key={p.key}
            className="pick"
            type="button"
            data-k={p.key}
            aria-pressed={activeKey === p.key ? 'true' : 'false'}
            onClick={() => setActiveKey(p.key)}
          >
            <small>{p.classTag}</small>
            {p.label}
          </button>
        ))}
      </div>
      <div className="stage" aria-live="polite">
        <div className="prop">
          <span className="label">Proposed by the reasoning layer</span>
          <span>
            <b id="gp-act">{cur.act}</b>
            <span className="cls" id="gp-cls">{cur.cls}</span>
          </span>
        </div>
        <div className="gates">
          <div className={`g c ${cur.g1.status === 'skip' ? 'dim-g' : ''}`} id="g1">
            <span className="num">01</span>
            <h4>COMPETENCE</h4>
            <p>Is this exact competency / model / tool / configuration qualified for this context and deployment mode?</p>
            <span className={`v ${cur.g1.status}`} id="v1">{cur.g1.label}</span>
            <span className="why" id="w1">{cur.g1.why}</span>
          </div>
          <div className={`g a ${cur.g2.status === 'skip' ? 'dim-g' : ''}`} id="g2">
            <span className="num">02</span>
            <h4>AUTHORITY</h4>
            <p>Is this action permitted for this mandate, target, environment and authority class?</p>
            <span className={`v ${cur.g2.status}`} id="v2">{cur.g2.label}</span>
            <span className="why" id="w2">{cur.g2.why}</span>
          </div>
          <div className={`g p ${cur.g3.status === 'skip' ? 'dim-g' : ''}`} id="g3">
            <span className="num">03</span>
            <h4>PRECONDITIONS</h4>
            <p>Are environment, data, credentials, versions, budget and required state valid now?</p>
            <span className={`v ${cur.g3.status}`} id="v3">{cur.g3.label}</span>
            <span className="why" id="w3">{cur.g3.why}</span>
          </div>
        </div>
        <div className="policy">
          <span className="label">External policy enforcement</span>
          <span>The reasoning model may propose. External policy enforcement decides whether the action may execute.</span>
        </div>
        <div className="outs" aria-label="Policy outcomes">
          <div className={`oc al ${cur.out === 'ALLOW' ? 'on' : ''}`} data-o="ALLOW">
            <b><i aria-hidden="true"></i>ALLOW</b>
            <p>Execute the approved operation only within limits.</p>
          </div>
          <div className={`oc ap ${cur.out === 'REQUIRE APPROVAL' ? 'on' : ''}`} data-o="REQUIRE APPROVAL">
            <b><i aria-hidden="true"></i>REQUIRE APPROVAL</b>
            <p>Pause and route the precise decision to an authorized human.</p>
          </div>
          <div className={`oc bl ${cur.out === 'BLOCK' ? 'on' : ''}`} data-o="BLOCK">
            <b><i aria-hidden="true"></i>BLOCK</b>
            <p>Do not execute. Preserve the denial and rationale.</p>
          </div>
          <div className={`oc es ${cur.out === 'ESCALATE / REPLAN' ? 'on' : ''}`} data-o="ESCALATE / REPLAN">
            <b><i aria-hidden="true"></i>ESCALATE / REPLAN</b>
            <p>Change the plan when uncertainty, qualification or authority is insufficient.</p>
          </div>
        </div>
        <p className="outcome-line" id="gp-out">
          Outcome: {cur.out} <span>— {cur.why}</span>
        </p>
      </div>
    </div>
  </div>
</section>

{/*  04 QUALIFIED COMPETENCE  */}
<section className="sec tint" id="qualified" aria-labelledby="h-q">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">04</span><span className="label">Qualified competence</span></p>
      <h2 className="h2" id="h-q" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>A procedure becomes trusted only under stated conditions.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>A Qualified Competency is a versioned procedure demonstrated to work under stated conditions. Qualification is separate from the competency definition, because the same procedure can be trusted in one context and blocked in another.</p>
    </div>
    <div className="combo" aria-label="What a qualification belongs to">
      <span className="t">COMPETENCY</span><b>+</b><span className="t">MODEL</span><b>+</b><span className="t">TOOL</span><b>+</b><span className="t">CONFIGURATION</span><b>+</b><span className="t">CONTEXT</span><b>=</b><span className="eq">ONE QUALIFICATION RECORD</span>
    </div>
    <dl className="qspec">
      <div><dt>Competency + model + configuration + tool versions</dt><dd>Trust belongs to the exact operating combination—not a generic model name.</dd></div>
      <div><dt>Supported contexts and deployment mode</dt><dd>A capability may be qualified for one environment or action class but not another.</dd></div>
      <div><dt>Evaluation results and reviewer</dt><dd>Qualification must be inspectable and attributable.</dd></div>
      <div><dt>Expiry / review triggers</dt><dd>Trust can decay when dependencies, versions or evidence change.</dd></div>
      <div><dt>Rollback target</dt><dd>Authority must be reversible when new evidence invalidates prior qualification.</dd></div>
      <div><dt>Known limits / escalation behavior</dt><dd>The competency must know where it should stop rather than extending itself by inference.</dd></div>
    </dl>
  </div>
</section>

{/*  05 QUALIFICATION LIFECYCLE (ZW-10C)  */}
<section className="sec" id="lifecycle" aria-labelledby="h-lc">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">05</span><span className="label">Qualification lifecycle</span></p>
      <h2 className="h2" id="h-lc" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>Autonomy is earned through qualification—not declared by design.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>Promotion is controlled. Delivery experience does not rewrite capability automatically.</p>
    </div>
    <div className="life" data-anim>
      <ol aria-label="Qualification lifecycle, in order">
        <li><span className="n">01</span><b>PROPOSED UPDATE</b><p>New model, tool, procedure or configuration.</p></li>
        <li><span className="n">02</span><b>ISOLATED EVALUATION</b><p>Run defined cases away from operational consequence.</p></li>
        <li><span className="n">03</span><b>INDEPENDENT REVIEW</b><p>Inspect evidence, failure modes and limits.</p></li>
        <li><span className="n">04</span><b>SHADOW OPERATION</b><p>Compare with the human/current process without autonomous consequence.</p></li>
        <li><span className="n">05</span><b>BOUNDED DEPLOYMENT</b><p>Grant scoped authority for stated contexts only.</p></li>
        <li><span className="n">06</span><b>MONITORING</b><p>Watch quality, interventions, incidents and drift.</p></li>
      </ol>
      <p className="label disp-lab">Monitoring disposition</p>
      <div className="disp">
        <div className="ex"><b>EXPAND</b><p>Broaden only where evidence supports transfer.</p></div>
        <div className="ho"><b>HOLD</b><p>Keep current scope while evidence matures.</p></div>
        <div className="rb"><b>ROLL BACK / REVOKE</b><p>Remove authority when evaluation or incident evidence invalidates qualification.</p></div>
      </div>
    </div>
    <div className="co dark"><span className="label">No silent inheritance</span><p>A new model, tool version or configuration does not automatically inherit the qualification of the version it replaces. Qualification can also be revoked by incident or evaluation evidence.</p></div>
  </div>
</section>

{/*  06 AUTHORITY ENVELOPE (ZW-10B)  */}
<section className="sec tint" id="envelope" aria-labelledby="h-env">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">06</span><span className="label">Authority envelope</span></p>
      <h2 className="h2" id="h-env" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>Not all actions carry the same consequence.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>Autonomy is not a single switch. Every action is classified, permissioned and bounded. Control tightens as consequence rises.</p>
    </div>
    <div className="env">
      <div className="env-axis" aria-hidden="true"><span>LOWER CONSEQUENCE</span><i></i><span>HIGHER CONSEQUENCE · MORE CONTROL</span></div>
      <ol className="cls4" aria-label="Authority classes A to D">
        <li className="a"><span className="L">A</span><div><h3>OBSERVE</h3><p>Read requirements, metadata, logs, telemetry.</p></div><div className="post"><small>INITIAL POSTURE</small><b>Autonomous within access policy</b></div></li>
        <li className="b"><span className="L">B</span><div><h3>NON-DESTRUCTIVE VALIDATION</h3><p>Run tests, read-only APIs, isolated journeys, compare data.</p></div><div className="post"><small>INITIAL POSTURE</small><b>Bounded autonomous after qualification</b></div></li>
        <li className="c"><span className="L">C</span><div><h3>NON-PRODUCTION STATE CHANGE</h3><p>Create/reset test data, deploy test artifacts, inject approved events.</p></div><div className="post"><small>INITIAL POSTURE</small><b>Supervised / explicit approval initially</b></div></li>
        <li className="d"><span className="L">D</span><div><h3>CONSEQUENTIAL</h3><p>Production change, accept risk, authorize release.</p></div><div className="post"><small>INITIAL POSTURE</small><b>Outside initial Zuvvix autonomous authority</b></div></li>
      </ol>
      <p className="notladder">These classes describe consequence and control—not a maturity ladder. Some consequential decisions should remain human- and customer-owned by design.</p>
    </div>
    <div className="co"><span className="label">Separate records</span><p>Customer authority, Zuvvix accountability and technical execution permissions remain separate records.</p></div>
  </div>
</section>

{/*  07 POLICY OUTSIDE REASONING  */}
<section className="sec" id="policy" aria-labelledby="h-pol">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">07</span><span className="label">Policy is outside the reasoning model</span></p>
      <h2 className="h2" id="h-pol" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>Prompts do not enforce authority.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>The reasoning layer may propose an action and explain why it appears useful. It must not be able to grant itself permission. External policy enforcement evaluates the proposed action against deterministic control inputs.</p>
    </div>
    <div className="pin">
      <div className="reason"><span className="label">Reasoning layer</span><p>Proposes an action and explains why it appears useful.</p><p className="no">CANNOT GRANT ITSELF PERMISSION</p></div>
      <div className="wall" aria-hidden="true"><i></i><span>ENFORCEMENT BOUNDARY</span></div>
      <div className="enf"><span className="label">External policy enforcement evaluates</span>
        <dl>
          <div><dt>Mandate / Assignment</dt><dd>Scope, version, accepted responsibility and exclusions.</dd></div>
          <div><dt>Action</dt><dd>Class, target entity, environment and intended effect.</dd></div>
          <div><dt>Qualification</dt><dd>Current competency/model/tool/configuration qualification record.</dd></div>
          <div><dt>Identity &amp; access</dt><dd>Actor/service identity, tenant and applicable customer/system policy.</dd></div>
          <div><dt>Operational state</dt><dd>Environment/resource reservation, budget, deadline and side-effect ambiguity.</dd></div>
          <div><dt>Human control</dt><dd>Required approval, separation of duty, specialist or business-owner decision.</dd></div>
          <div><dt>Uncertainty</dt><dd>Known stale dependency or unresolved material condition that should block or constrain execution.</dd></div>
        </dl>
      </div>
    </div>
    <h3 style={{ marginTop: '40px', fontSize: 'clamp(22px,2.4vw,30px)', letterSpacing: '-.02em' }}>Refusal and escalation are correct system behaviors.</h3>
    <div className="oc4">
      <div className="ocx al"><b><i aria-hidden="true"></i>ALLOW</b><p>Execute only the approved operation/target/version within stated limits.</p><small>Permission is explicit and auditable.</small></div>
      <div className="ocx ap"><b><i aria-hidden="true"></i>REQUIRE APPROVAL</b><p>Pause and route the precise decision with relevant evidence.</p><small>Human authority is part of the control path, not an exception to “full autonomy.”</small></div>
      <div className="ocx bl"><b><i aria-hidden="true"></i>BLOCK</b><p>Do not execute; preserve denial and rationale.</p><small>The system protects the mandate boundary even when execution is technically possible.</small></div>
      <div className="ocx es"><b><i aria-hidden="true"></i>ESCALATE / REPLAN</b><p>Change the plan, obtain missing context or use a different qualified method.</p><small>Uncertainty changes behavior instead of being hidden.</small></div>
    </div>
  </div>
</section>

{/*  08 SIDE-EFFECT SAFETY  */}
<section className="sec tint" id="sideeffects" aria-labelledby="h-se">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">08</span><span className="label">Side-effect safety</span></p>
      <h2 className="h2" id="h-se" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>State-changing actions require recovery semantics, not blind retries.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>For actions with side effects, safety must survive interruptions and ambiguous outcomes. The operating sequence is controlled transaction behavior.</p>
    </div>
    <ol className="txn" aria-label="Controlled side-effect sequence">
      <li><b>Resolve target + exact version</b><span>Prevent acting on the wrong object or stale target.</span></li>
      <li><b>Authorize action</b><span>Evaluate current qualification and authority before side effect.</span></li>
      <li><b>Reserve / establish state</b><span>Make required environment/resource assumptions explicit.</span></li>
      <li><b>Persist intent + operation ID</b><span>Create durable identity before execution.</span></li>
      <li><b>Execute through controlled adapter</b><span>Keep side effects behind policy-aware integration.</span></li>
      <li><b>Persist observed result + evidence</b><span>Record what actually happened, not only what was intended.</span></li>
      <li className="rec"><b>Reconcile ambiguity before retry</b><span>Determine whether the action already occurred before repeating it.</span></li>
    </ol>
    <div className="co dark"><span className="label">Safety principle</span><p>No blind retries after an ambiguous side effect. Persist state, reconcile what happened, then decide whether another action is permitted.</p></div>
  </div>
</section>

{/*  09 HUMAN JUDGMENT  */}
<section className="sec" id="judgment" aria-labelledby="h-hj">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">09</span><span className="label">Human judgment is architectural</span></p>
      <h2 className="h2" id="h-hj" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>Experts remain where ambiguity, consequence or qualification requires them.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>Zuvvix is not designed around a temporary “human-in-the-loop” patch that disappears as models improve. Human judgment remains architectural where the system encounters new failure modes, consequential ambiguity, specialist-only work, material evidence disputes or customer-owned decisions.</p>
    </div>
    <dl className="hj" aria-label="Initial operating posture by situation">
      <div><dt>Requirements / business-intent ambiguity</dt><dd>Business-owner decision.</dd></div>
      <div><dt>Cross-system investigation</dt><dd>Human + machine collaboration.</dd></div>
      <div><dt>Specialist performance / security judgment</dt><dd>Supervised specialist work.</dd></div>
      <div><dt>State-changing shared-environment action</dt><dd>Explicit authority or approval.</dd></div>
      <div><dt>Material readiness judgment</dt><dd>Human-owned initially.</dd></div>
      <div><dt>Release authorization</dt><dd>Customer / authorized human decision.</dd></div>
      <div><dt>Capability promotion / qualification dispute</dt><dd>Independent review and evidence-based disposition.</dd></div>
    </dl>
  </div>
</section>

{/*  10 TRUST BEHAVIORS  */}
<section className="sec tint" id="behaviors" aria-labelledby="h-tb">
  <div className="wrap">
    <p className="kicker"><span className="idx">10</span><span className="label">Trust behaviors you should be able to see</span></p>
    <h2 className="h2" id="h-tb" style={{ maxWidth: '20ch' }}>Trust is visible in control behavior.</h2>
    <dl className="tb">
      <div><dt>Bounded autonomy</dt><dd>Autonomy is earned through qualification and bounded by explicit authority.</dd></div>
      <div><dt>Evidence independence</dt><dd>AI output is not evidence. Model agreement is not automatically independent verification. <Link to="/assurance-case/#contract">Evidence contract</Link></dd></div>
      <div><dt>Visible uncertainty</dt><dd>Unknown, conflicting, stale or inaccessible conditions remain visible and can constrain action.</dd></div>
      <div><dt>INDETERMINATE</dt><dd>When evidence is insufficient for readiness, the system is allowed to say so. <Link to="/readiness/">Readiness states</Link></dd></div>
      <div><dt>Human judgment</dt><dd>Material ambiguity and consequential decisions are escalated precisely.</dd></div>
      <div><dt>Policy enforcement</dt><dd>Authority is enforced outside the reasoning model.</dd></div>
      <div><dt>Reversibility</dt><dd>Qualification and authority can be held, narrowed, rolled back or revoked.</dd></div>
      <div><dt>Customer authority</dt><dd>The customer retains final release authorization initially. <Link to="/quality-mandate/#boundary">Responsibility boundary</Link></dd></div>
    </dl>
    <h3 style={{ marginTop: '40px', fontSize: 'clamp(22px,2.4vw,30px)', letterSpacing: '-.02em' }}>What Zuvvix will never claim.</h3>
    <div className="never" aria-label="Claims Zuvvix avoids, and what it says instead">
      <div className="nv"><s>Autonomous QE</s><span className="w">Implies broad competence and authority without scope.</span><span className="u"><small>Instead</small>Qualified, bounded autonomous execution.</span></div>
      <div className="nv"><s>Lights-out testing</s><span className="w">Suggests consequential work should be human-free.</span><span className="u"><small>Instead</small>Reduce avoidable human coordination while preserving consequential judgment.</span></div>
      <div className="nv"><s>Self-learning system</s><span className="w">Suggests uncontrolled capability mutation.</span><span className="u"><small>Instead</small>Learning produces proposals; promotion requires controlled evaluation.</span></div>
      <div className="nv"><s>AI decides if you can release</s><span className="w">Conflates decision support with customer authority.</span><span className="u"><small>Instead</small>Zuvvix produces an evidence-backed readiness position; customer authority remains explicit.</span></div>
      <div className="nv"><s>The agent is trusted</s><span className="w">Trust cannot attach to a persona or model label.</span><span className="u"><small>Instead</small>The exact competency/model/tool/configuration is qualified for stated conditions and actions.</span></div>
    </div>
  </div>
</section>

{/*  11 CLOSING  */}
<section className="sec" id="next" aria-labelledby="h-nx">
  <div className="wrap">
    <p className="kicker"><span className="idx">11</span><span className="label">Designed controls, evidence to follow</span></p>
    <h2 className="h2" id="h-nx" style={{ maxWidth: '24ch' }}>Trust claims must be more disciplined than product claims.</h2>
    <div className="cl6" role="table" aria-label="Claims maturity">
      <div className="hr" role="row"><span className="h" role="columnheader">Claim</span><span className="h" role="columnheader">State today</span><span className="h" role="columnheader">How we say it</span></div>
      <div role="row"><span className="c" role="cell">Qualification model</span><span className="s" role="cell">DESIGNED</span><span className="l" role="cell">Zuvvix is designed to qualify competency/model/tool/configuration combinations for stated contexts before broader autonomous authority.</span></div>
      <div role="row"><span className="c" role="cell">External policy enforcement</span><span className="s" role="cell">DESIGNED</span><span className="l" role="cell">The architecture separates reasoning from authority enforcement.</span></div>
      <div role="row"><span className="c" role="cell">A–D authority classes</span><span className="s" role="cell">DESIGNED</span><span className="l" role="cell">The first mandate uses four action-consequence classes with different initial control postures.</span></div>
      <div role="row"><span className="c" role="cell">Safe side-effect recovery</span><span className="s" role="cell">DESIGNED</span><span className="l" role="cell">The runtime design requires persisted intent/result and reconciliation before retry after ambiguity.</span></div>
      <div role="row"><span className="c" role="cell">Production reliability / safety improvement</span><span className="s n" role="cell">UNPROVEN</span><span className="l" role="cell">No percentages or superiority claims until repeated operating evidence exists.</span></div>
      <div role="row"><span className="c" role="cell">Autonomy expansion</span><span className="s e" role="cell">EVIDENCE-DEPENDENT</span><span className="l" role="cell">Broader authority is granted only when qualification and operating evidence support it.</span></div>
    </div>
    <div className="cta-row" style={{ marginTop: '36px' }}>
      <a className="btn btn-primary" href="/continuous-release-assurance/">See Continuous Release Assurance</a>
      <a className="btn btn-quiet" href="/assurance-case/">Explore the Assurance Case</a>
    </div>
    <div className="finalstd"><p>Every action has a visible answer to four questions: Is it competent? Is it authorized? Is the evidence sufficient? Who owns the consequence?</p></div>
  </div>
</section>

    </>
  )
}
