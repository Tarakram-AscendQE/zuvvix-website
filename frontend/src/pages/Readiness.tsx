import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HeadMeta } from '@/components/seo/HeadMeta'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useModal } from '@/context/ModalContext'

export function Readiness() {
  useScrollReveal()
  const { openFollow } = useModal()

  useEffect(() => {
    const S: Record<string, { label: string; color: string; sit: string; basis: string; cond: string; unc: string; next: string; own: string }> = {
      ready: {
        label: 'READY',
        color: 'var(--st-ready)',
        sit: 'All agreed material conditions have current evidence; no material unresolved issue is known.',
        basis: 'The Assurance Case supports readiness within mandate scope.',
        cond: 'All agreed material conditions satisfied, each with current evidence.',
        unc: 'No material unresolved issue known within scope. Stated limits of the evidence still travel with the case.',
        next: 'Proceed to customer decision',
        own: 'Customer release authority makes the release decision.',
      },
      rwe: {
        label: 'READY WITH EXCEPTIONS',
        color: 'var(--st-rwe)',
        sit: 'Defined conditions are established; named residual issues or coverage limits are explicitly qualified.',
        basis: 'The Assurance Case supports readiness subject to explicit exceptions.',
        cond: 'Agreed core conditions established with evidence.',
        unc: 'Residual uncertainties explicitly named, bounded and carried in the case.',
        next: 'Proceed to decision with exception acknowledgment',
        own: 'Customer release authority accepts or declines named exceptions.',
      },
      nr: {
        label: 'NOT READY',
        color: 'var(--st-nr)',
        sit: 'At least one material condition failed or could not be established; evidence contradicts readiness.',
        basis: 'The Assurance Case contradicts readiness; release would breach agreed standard.',
        cond: 'One or more critical conditions failed or unsupported by evidence.',
        unc: 'Material failure or gap in evidence identified.',
        next: 'Hold release · investigate',
        own: 'Release authority notified of negative determination.',
      },
      ind: {
        label: 'INDETERMINATE',
        color: 'var(--st-ind)',
        sit: 'Assurance cannot proceed because authority, environment or dependency preconditions are broken.',
        basis: 'Mandate preconditions not met; no defensible positive or negative determination possible.',
        cond: 'Cannot evaluate: pre-conditions, dependencies or authority unavailable.',
        unc: 'The state of the system is unknown because assurance could not run.',
        next: 'Resolve precondition · re-evaluate',
        own: 'Precondition failure escalated to customer operating authority.',
      },
    }

    const tabs = document.querySelectorAll('.st-tab')
    const pane = document.getElementById('stPane')
    if (!tabs.length || !pane) return

    const clickHandlers: Array<{ el: Element; fn: () => void }> = []

    tabs.forEach((tb) => {
      const handler = () => {
        tabs.forEach((t) => {
          t.classList.remove('cur')
          t.setAttribute('aria-selected', 'false')
        })
        tb.classList.add('cur')
        tb.setAttribute('aria-selected', 'true')
        const k = tb.getAttribute('data-s')
        const d = k ? S[k] : undefined
        if (!d) return

        const stateEl = pane.querySelector('.pane-state') as HTMLElement | null
        if (stateEl) {
          stateEl.textContent = d.label
          stateEl.style.color = d.color
        }
        const setTxt = (sel: string, val: string) => {
          const el = pane.querySelector(sel)
          if (el) el.textContent = val
        }
        setTxt('.p-sit', d.sit)
        setTxt('.p-basis', d.basis)
        setTxt('.p-cond', d.cond)
        setTxt('.p-unc', d.unc)
        setTxt('.p-next', d.next)
        setTxt('.p-own', d.own)
      }

      tb.addEventListener('click', handler)
      clickHandlers.push({ el: tb, fn: handler })
    })

    return () => {
      clickHandlers.forEach(({ el, fn }) => el.removeEventListener('click', fn))
    }
  }, [])

  return (
    <>
      <HeadMeta
        title="Zuvvix Readiness States | Defensible release positions"
        description="The four defensible release positions in the Zuvvix operating model: Ready, Ready with exceptions, Not ready, and Indeterminate."
        canonicalPath="/readiness/"
      />
      

{/*  01 HERO  */}
<section className="rd-hero" id="top" aria-labelledby="h1">
  <div className="wrap">
    <p className="eyebrow">Readiness states</p>
    <h1 className="h1" id="h1">Do not force certainty the evidence cannot support.</h1>
    <p className="lede">Zuvvix turns the Assurance Case into one of four evidence-backed readiness positions: READY, READY WITH EXCEPTIONS, NOT READY or INDETERMINATE. Each state says what can responsibly be concluded within the Quality Mandate—and what still requires human acceptance, more evidence or escalation.</p>
    <div className="cta-row">
      <a className="btn btn-primary" href="/continuous-release-assurance/">See Continuous Release Assurance</a>
      <a className="btn btn-quiet" href="/assurance-case/">Explore the Assurance Case</a>
    </div>
    <ul className="hero-states" aria-label="The four readiness states">
      <li className="r"><i aria-hidden="true"></i>READY</li>
      <li className="w"><i aria-hidden="true"></i>READY WITH EXCEPTIONS</li>
      <li className="n"><i aria-hidden="true"></i>NOT READY</li>
      <li className="d"><i aria-hidden="true"></i>INDETERMINATE</li>
    </ul>
  </div>
</section>

{/*  02 NOT A TRAFFIC LIGHT  */}
<section className="sec tint" id="traffic" aria-labelledby="h-tl">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">02</span><span className="label">Readiness is not a traffic light</span></p>
      <h2 className="h2" id="h-tl" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>Enterprise quality is not always binary.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>A green/red dashboard implies the answer is always binary. Enterprise quality is often not. A release can have explicit residual issues that the enterprise may choose to accept. Or the evidence can be too weak, stale or incomplete to justify any readiness conclusion. Those are different conditions and must remain different states.</p>
    </div>
    <div className="tl">
      <div className="tl-old" aria-label="Binary dashboard"><span className="label">A binary dashboard</span><div className="bin"><span>PASS</span><span>FAIL</span></div><p>Two answers. Residual issues and missing evidence have nowhere to go.</p></div>
      <div className="tl-new" aria-label="Four evidence positions">
        <div className="r"><b>READY</b><span>Conditions satisfied.</span></div>
        <div className="w"><b>READY WITH EXCEPTIONS</b><span>Residual issue, visible and accepted.</span></div>
        <div className="n"><b>NOT READY</b><span>Material failure established.</span></div>
        <div className="d"><b>INDETERMINATE</b><span>Not enough evidence to decide.</span></div>
      </div>
    </div>
    <div className="co dark"><span className="label">Trust rule</span><p>INDETERMINATE is not a cosmetic error state. It is the correct answer when Zuvvix cannot establish readiness from the available evidence.</p></div>
  </div>
</section>

{/*  03 FOUR STATES (ZW-08A)  */}
<section className="sec" id="states" aria-labelledby="h-st">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">03</span><span className="label">The four states</span></p>
      <h2 className="h2" id="h-st" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>Readiness is an evidence position—not a confidence score.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>Each state says what can responsibly be concluded within the Quality Mandate.</p>
    </div>
    <div className="four">
      <article className="sc4 r" aria-labelledby="s-r"><span className="pill" id="s-r"><i aria-hidden="true"></i>READY</span><small>Definition</small><p className="def">Agreed assurance conditions are satisfied and no material unresolved issue is known within mandate scope.</p><div className="dm"><small>Decision meaning</small><span>What the evidence supports: proceed within the agreed mandate.</span></div></article>
      <article className="sc4 w" aria-labelledby="s-w"><span className="pill" id="s-w"><i aria-hidden="true"></i>READY WITH EXCEPTIONS</span><small>Definition</small><p className="def">Conditions are substantially satisfied, but explicit residual issues require customer acceptance.</p><div className="dm"><small>Decision meaning</small><span>What the evidence supports: proceed only with visible, accepted exceptions.</span></div></article>
      <article className="sc4 n" aria-labelledby="s-n"><span className="pill" id="s-n"><i aria-hidden="true"></i>NOT READY</span><small>Definition</small><p className="def">Material evidence indicates unacceptable failure or required conditions remain unsatisfied.</p><div className="dm"><small>Decision meaning</small><span>What the evidence supports: do not treat the change as ready within the mandate.</span></div></article>
      <article className="sc4 d" aria-labelledby="s-d"><span className="pill" id="s-d"><i aria-hidden="true"></i>INDETERMINATE</span><small>Definition</small><p className="def">There is not enough evidence to make a defensible readiness conclusion.</p><div className="dm"><small>Decision meaning</small><span>What the evidence supports: no readiness conclusion yet. More evidence or a decision is required.</span></div></article>
    </div>
    <p className="colornote">Labels, wording and evidence carry the meaning. Colour is only a secondary cue.</p>
    <div className="noscore"><s aria-hidden="true">87% ready</s><p><b>Do not turn this into a score.</b>A readiness state is not “87% ready,” an LLM confidence number or a count of passing tests. The state must be supported by the Assurance Case and its evidence validity.</p></div>
  </div>
</section>

{/*  04 REASONING PATH (ZW-08B)  */}
<section className="sec tint" id="path" aria-labelledby="h-rp">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">04</span><span className="label">Reference reasoning path</span></p>
      <h2 className="h2" id="h-rp" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>Ask about evidence sufficiency before asking whether the answer is green.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>The following reasoning path is a website explanation of the four definitions. It is not a universal hard-coded algorithm. Each Quality Mandate still defines its own acceptance conditions, materiality thresholds, authority and evidence requirements.</p>
    </div>
    <div data-anim>
      <div className="path" aria-label="Reference readiness reasoning path">
        <div className="q q1 first s1"><small>STEP 1</small>Is there sufficient evidence for a defensible assessment?</div>
        <div className="hd l s1" aria-hidden="true"><span>NO</span></div>
        <div className="out d s1"><b>INDETERMINATE</b><span>No defensible readiness conclusion yet</span></div>
        <div className="vd vd1 s2" aria-hidden="true"><span>YES</span></div>
        <div className="q q2 s2"><small>STEP 2</small>Does material evidence show unacceptable failure or unsatisfied required conditions?</div>
        <div className="hd r2 s2" aria-hidden="true"><span>YES</span></div>
        <div className="out n s2"><b>NOT READY</b><span>Material failure / condition unmet</span></div>
        <div className="vd vd2 s3" aria-hidden="true"><span>NO</span></div>
        <div className="q q3 s3"><small>STEP 3</small>Are there explicit residual issues that require customer acceptance?</div>
        <div className="hd r3 s3" aria-hidden="true"><span>YES</span></div>
        <div className="out w s3"><b>READY WITH EXCEPTIONS</b><span>Residual issues need explicit acceptance</span></div>
        <div className="vd vd3 s4" aria-hidden="true"><span>NO</span></div>
        <div className="out r s4"><b>READY</b><span>Conditions satisfied; no known material unresolved issue</span></div>
        <div className="auth-note"><small>AUTHORITY BOUNDARY</small>Readiness supports the decision. The customer initially authorizes release.</div>
      </div>
    </div>
    <dl className="steps3" aria-label="Reasoning steps in text">
      <div><dt>1</dt><dd className="qq">Is there sufficient evidence for a defensible assessment?</dd><dd>No → INDETERMINATE. Yes → evaluate agreed conditions.</dd></div>
      <div><dt>2</dt><dd className="qq">Does material evidence indicate unacceptable failure or required conditions remain unsatisfied?</dd><dd>Yes → NOT READY. No → evaluate residual issues.</dd></div>
      <div><dt>3</dt><dd className="qq">Are there explicit residual issues requiring customer acceptance?</dd><dd>Yes → READY WITH EXCEPTIONS. No → READY, provided the agreed conditions are satisfied and no material unresolved issue is known.</dd></div>
    </dl>
  </div>
</section>

{/*  05 EXECUTIVE BRIEF (ZW-08C)  */}
<section className="sec" id="brief" aria-labelledby="h-br">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">05</span><span className="label">The executive readiness brief</span></p>
      <h2 className="h2" id="h-br" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>A senior executive should understand the position without reading thousands of test results.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>Every readiness assessment must answer six questions.</p>
    </div>
    <div className="brief">
      <ol aria-label="Six questions every readiness assessment answers">
        <li><span className="hd2"><span className="num">01</span><span className="qt">WHAT CHANGED?</span></span><p>Exact change, scope and version.</p></li>
        <li><span className="hd2"><span className="num">02</span><span className="qt">WHAT COULD BE AFFECTED?</span></span><p>Material journeys, systems, interfaces, data and controls.</p></li>
        <li><span className="hd2"><span className="num">03</span><span className="qt">WHAT DID ZUVVIX DO?</span></span><p>Assurance selected and performed to establish quality.</p></li>
        <li><span className="hd2"><span className="num">04</span><span className="qt">WHAT EVIDENCE SUPPORTS IT?</span></span><p>Traceable observations, derivations, findings and verification.</p></li>
        <li><span className="hd2"><span className="num">05</span><span className="qt">WHAT REMAINS UNCERTAIN?</span></span><p>Exceptions, limitations, residual issues and unresolved assumptions.</p></li>
        <li className="rec"><span className="hd2"><span className="num">06</span><span className="qt">WHAT DECISION IS RECOMMENDED?</span></span><p>Readiness position plus any acceptance or escalation required.</p></li>
      </ol>
      <aside aria-label="Readiness state in the brief"><span className="label">Readiness state</span><ul><li>READY</li><li>READY WITH EXCEPTIONS</li><li>NOT READY</li><li>INDETERMINATE</li></ul><p>One of four positions, always stated with its basis and a link back to the case.</p></aside>
    </div>
    <div className="backline"><b>ASSURANCE CASE → READINESS BRIEF</b><span>The summary never replaces the underlying evidence. It points back to it.</span></div>
  </div>
</section>

{/*  06 MISINTERPRETATIONS  */}
<section className="sec tint" id="misuse" aria-labelledby="h-mu">
  <div className="wrap">
    <p className="kicker"><span className="idx">06</span><span className="label">What the states must not mean</span></p>
    <h2 className="h2" id="h-mu" style={{ maxWidth: '20ch' }}>Protect the decision model from misuse.</h2>
    <div className="mis">
      <div className="mi"><span className="wrong"><s>READY = zero risk</s></span><p className="why">No assurance can establish absence of all risk.</p><p className="right"><small>Correct treatment</small>READY means agreed assurance conditions are satisfied and no material unresolved issue is known within mandate scope.</p></div>
      <div className="mi"><span className="wrong"><s>READY WITH EXCEPTIONS = almost ready</s></span><p className="why">The issue is not a percentage shortfall.</p><p className="right"><small>Correct treatment</small>Residual issues are explicit and require customer acceptance.</p></div>
      <div className="mi"><span className="wrong"><s>NOT READY = the system failed</s></span><p className="why">NOT READY can be a successful assurance outcome.</p><p className="right"><small>Correct treatment</small>Material evidence has revealed an unacceptable condition before release.</p></div>
      <div className="mi"><span className="wrong"><s>INDETERMINATE = technical error</s></span><p className="why">Insufficient evidence may be the most honest outcome.</p><p className="right"><small>Correct treatment</small>State what evidence is missing, why it matters and what is required next.</p></div>
      <div className="mi"><span className="wrong"><s>More passing tests = more ready</s></span><p className="why">Activity quantity is not evidence sufficiency.</p><p className="right"><small>Correct treatment</small>Assess risk-relevant evidence against agreed conditions.</p></div>
      <div className="mi"><span className="wrong"><s>AI confidence = readiness</s></span><p className="why">Model confidence is not evidence.</p><p className="right"><small>Correct treatment</small>Readiness derives from the Assurance Case and evidence contract.</p></div>
    </div>
  </div>
</section>

{/*  07 ONE CHANGE, FOUR OUTCOMES + STATE CARD CONTRACT  */}
<section className="sec" id="outcomes" aria-labelledby="h-oc">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">07</span><span className="label">One change, four possible outcomes</span></p>
      <h2 className="h2" id="h-oc" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>Each state should open the evidence behind it.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>The same cross-system change can end in any of the four states. Select one to see what its state card must show. These are explanatory scenarios only, not claims of demonstrated Zuvvix performance.</p>
    </div>
    <div className="explorer">
      <div className="ex-top"><span className="label" style={{ color: 'var(--navy)' }}>State card · payment service change</span><span className="tag">Illustrative—not production evidence</span></div>
      <div className="tabs" role="tablist" aria-label="Readiness outcome">
        <button className="tab" role="tab" id="tab-ready" data-s="ready" aria-selected="false" aria-controls="panel" tabIndex={-1}><i aria-hidden="true"></i>READY</button>
        <button className="tab" role="tab" id="tab-rwe" data-s="rwe" aria-selected="true" aria-controls="panel" tabIndex={0}><i aria-hidden="true"></i>READY WITH EXCEPTIONS</button>
        <button className="tab" role="tab" id="tab-nr" data-s="nr" aria-selected="false" aria-controls="panel" tabIndex={-1}><i aria-hidden="true"></i>NOT READY</button>
        <button className="tab" role="tab" id="tab-ind" data-s="ind" aria-selected="false" aria-controls="panel" tabIndex={-1}><i aria-hidden="true"></i>INDETERMINATE</button>
      </div>
      <div className="panel" id="panel" role="tabpanel" aria-labelledby="tab-rwe" aria-live="polite">
        <h3 id="p-state" style={{ color: 'var(--st-rwe)' }}>READY WITH EXCEPTIONS <span className="ill">Illustrative scenario</span></h3>
        <p className="sit" id="p-sit">Core journey is established, but one explicit residual condition remains and requires business acceptance.</p>
        <dl className="fields">
          <div><dt>Basis</dt><dd id="p-basis">The conclusion is defensible only with the exception made visible and accepted.</dd></div>
          <div><dt>Conditions</dt><dd id="p-cond">Core journey conditions satisfied; one residual condition open.</dd></div>
          <div><dt>Evidence</dt><dd id="p-ev"><a href="/assurance-case/#contrary">Supporting and contrary evidence in the Assurance Case</a></dd></div>
          <div><dt>Uncertainty</dt><dd id="p-unc">One explicit residual condition, carried into the brief.</dd></div>
          <div><dt>Next action</dt><dd id="p-next">Accept exception</dd></div>
          <div><dt>Owner</dt><dd id="p-own">Customer business owner accepts or declines the exception.</dd></div>
          <div><dt>Validity</dt><dd id="p-val">This change, its versions, environment and current evidence set.</dd></div>
          <div><dt>Release</dt><dd>Customer release authorization remains a separate decision.</dd></div>
        </dl>
      </div>
    </div>
  </div>
</section>

{/*  08 VERSIONED  */}
<section className="sec tint" id="versioned" aria-labelledby="h-ve">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">08</span><span className="label">Readiness is versioned</span></p>
      <h2 className="h2" id="h-ve" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>A state can change when the evidence basis changes.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>A readiness position applies to a specific assignment, context and evidence set. A new change, invalidated dependency, stale evidence, corrected business rule or new observation can require reassessment. Historical readiness outputs should remain preserved rather than overwritten.</p>
    </div>
    <div className="ver">
      <div className="vc"><span className="tr"><span className="t-r">READY</span><i>→</i><span className="t-d">INDETERMINATE</span></span><p>READY can become INDETERMINATE if material evidence becomes stale or a dependency changes.</p></div>
      <div className="vc"><span className="tr"><span className="t-w">READY WITH EXCEPTIONS</span><i>→</i><span className="t-r">READY</span></span><p>READY WITH EXCEPTIONS can become READY when the residual condition is resolved and verified.</p></div>
      <div className="vc"><span className="tr"><span className="t-n">NOT READY</span><i>→</i><span className="t-x">NEW REASSESSMENT</span><i>→</i><span className="t-r">READY</span></span><p>NOT READY can become READY only through a new evidence-backed reassessment—not by editing the old conclusion.</p></div>
      <div className="vc"><span className="tr"><span className="t-d">INDETERMINATE</span><i>→</i><span className="t-x">MISSING EVIDENCE OR DECISION</span></span><p>INDETERMINATE should identify the missing evidence or decision required to progress.</p></div>
    </div>
    <div className="co dark"><span className="label">Versioning rule</span><p>Never rewrite history to make the latest state look cleaner. Preserve the prior Assurance Case and create a linked reassessment when the basis changes.</p></div>
  </div>
</section>

{/*  09 FALSE-GREEN  */}
<section className="sec" id="falsegreen" aria-labelledby="h-fg">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">09</span><span className="label">False-green control</span></p>
      <h2 className="h2" id="h-fg" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>The most dangerous state error is unjustified READY.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>Mandate 01 identifies False-Green Rate as a critical customer-facing quality metric: releases assessed READY where a material in-scope assurance failure should have prevented that conclusion. The readiness experience therefore biases toward evidence sufficiency and explicit uncertainty rather than optimism.</p>
    </div>
    <dl className="fg">
      <div><dt>No silent missing condition</dt><dd>Every agreed condition appears in the Assurance Case.</dd></div>
      <div><dt>No hidden contrary evidence</dt><dd>Evidence that cuts against the conclusion remains visible.</dd></div>
      <div><dt>No stale-evidence reuse</dt><dd>Material version/context changes invalidate or flag affected evidence.</dd></div>
      <div><dt>No confidence substitution</dt><dd>Model confidence cannot compensate for missing independent evidence.</dd></div>
      <div><dt>No SLA override</dt><dd>Operational pressure cannot convert insufficient evidence into READY.</dd></div>
      <div className="first"><dt>First-class INDETERMINATE</dt><dd>If evidence is insufficient, the system stops short of a readiness conclusion.</dd></div>
    </dl>
  </div>
</section>

{/*  10 AUTHORITY  */}
<section className="sec tint" id="authority" aria-labelledby="h-au">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">10</span><span className="label">Authority boundary</span></p>
      <h2 className="h2" id="h-au" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>Readiness supports the decision; it does not seize the decision.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>For the initial Zuvvix mandate, Zuvvix owns the quality of the assessment and the work required within mandate scope. The customer retains final release authorization. A READY state is never equivalent to autonomous production approval.</p>
    </div>
    <div className="boundary">
      <div className="bz"><span className="label">Zuvvix produces</span><p>An evidence-backed readiness position.</p></div>
      <div className="bgap" aria-hidden="true"><i></i></div>
      <div className="bc"><span className="label">The enterprise retains</span><p>The consequential release decision, initially.</p></div>
    </div>
    <p style={{ marginTop: '24px' }}><a className="link-arrow" href="/quality-mandate/#boundary">See the full responsibility boundary</a></p>
  </div>
</section>

{/*  11 CTA + CLAIMS  */}
<section className="sec" id="next" aria-labelledby="h-nx">
  <div className="wrap">
    <p className="kicker"><span className="idx">11</span><span className="label">Designed today</span></p>
    <h2 className="h2" id="h-nx" style={{ maxWidth: '22ch' }}>A precise decision model. Accuracy still to be proven.</h2>
    <div className="cl6" role="table" aria-label="Claims maturity">
      <div className="hr" role="row"><span className="h" role="columnheader">Claim</span><span className="h" role="columnheader">State today</span><span className="h" role="columnheader">How we say it</span></div>
      <div role="row"><span className="c" role="cell">Four-state readiness model</span><span className="s" role="cell">DESIGNED</span><span className="l" role="cell">The states and their semantics, defined exactly.</span></div>
      <div role="row"><span className="c" role="cell">Reference reasoning path</span><span className="s" role="cell">DESIGNED</span><span className="l" role="cell">Explanatory logic; mandate-specific conditions govern the actual assessment.</span></div>
      <div role="row"><span className="c" role="cell">Executive six-question brief</span><span className="s" role="cell">DESIGNED</span><span className="l" role="cell">The required output structure.</span></div>
      <div role="row"><span className="c" role="cell">False-green control mechanisms</span><span className="s" role="cell">DESIGNED</span><span className="l" role="cell">Safeguards explained; no measured reduction claimed yet.</span></div>
      <div role="row"><span className="c" role="cell">Decision accuracy / escape reduction</span><span className="s n" role="cell">NOT YET PROVEN</span><span className="l" role="cell">No production outcome claims until evidence exists.</span></div>
      <div role="row"><span className="c" role="cell">Autonomous material readiness judgment</span><span className="s n" role="cell">NOT THE INITIAL MODEL</span><span className="l" role="cell">Material readiness judgment remains human-owned initially in Mandate 01.</span></div>
    </div>
    <div className="cta-row" style={{ marginTop: '36px' }}>
      <a className="btn btn-primary" href="/continuous-release-assurance/">See Continuous Release Assurance</a>
      <a className="btn btn-quiet" href="/assurance-case/">Explore the Assurance Case</a>
    </div>
    <div className="finalstd"><p>Zuvvix should look more trustworthy when it refuses to overclaim—not less capable.</p></div>
  </div>
</section>

    </>
  )
}
