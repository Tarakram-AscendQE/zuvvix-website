import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HeadMeta } from '@/components/seo/HeadMeta'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useModal } from '@/context/ModalContext'

export function AssuranceCase() {
  useScrollReveal()
  const { openFollow } = useModal()

  useEffect(() => {
    const grid = document.getElementById('cGrid')
    const svg = document.getElementById('cLines')
    const core = document.getElementById('cCore')
    if (!grid || !svg || !core) return

    function draw() {
      if (!grid || !svg || !core || getComputedStyle(svg).display === 'none') return
      const g = grid.getBoundingClientRect()
      const c = core.getBoundingClientRect()
      svg.setAttribute('viewBox', `0 0 ${g.width} ${g.height}`)
      let out = ''
      grid.querySelectorAll('.ck').forEach((el) => {
        const r = el.getBoundingClientRect()
        const left = r.right <= c.left
        const x1 = (left ? r.right : r.left) - g.left
        const y1 = r.top + r.height / 2 - g.top
        const x2 = (left ? c.left : c.right) - g.left
        const y2 = c.top + c.height / 2 - g.top
        out += `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}"/>`
      })
      svg.innerHTML = out
    }

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
        title="Zuvvix Assurance Case | Evidence for release decisions"
        description="A Zuvvix Assurance Case synthesizes qualified assurance into traceable evidence, identified limitations, explicit residual uncertainty, and a defensible readiness position."
        canonicalPath="/assurance-case/"
      />
      

{/*  01 HERO  */}
<section className="ac-hero" id="top" aria-labelledby="h1">
  <div className="wrap ac-hero-grid">
    <div>
      <p className="eyebrow">Zuvvix Assurance Case</p>
      <h1 className="h1" id="h1">A decision should be inspectable—not merely asserted.</h1>
      <p className="lede">The Zuvvix Assurance Case organizes what changed, what could be affected, what was assured, what evidence exists, what contradicts it, what remains unresolved, and why the resulting readiness position is defensible within the mandate.</p>
      <p className="northstar">A test report tells you what ran. A Zuvvix Assurance Case explains what you can responsibly conclude—and why.</p>
      <div className="cta-row">
        <a className="btn btn-primary" href="/continuous-release-assurance/">See Continuous Release Assurance</a>
        <a className="btn btn-quiet" href="/trust/">Explore Trust &amp; Authority</a>
      </div>
    </div>
    <figure className="ledger" id="ledger" aria-label="Illustrative Assurance Case ledger" style={{ margin: '0' }}>
      <div className="ledger-top"><span className="label" style={{ color: 'var(--navy)' }}>Assurance Case · one assignment</span><span className="tag">Illustrative</span></div>
      <ol>
        <li><span className="n">01</span><span className="t">CHANGE MANIFEST</span><span className="st">RECORDED</span></li>
        <li><span className="n">02</span><span className="t">CONTEXT MANIFEST</span><span className="st">RECORDED</span></li>
        <li><span className="n">03</span><span className="t">IMPACT MAP</span><span className="st">RECORDED</span></li>
        <li><span className="n">04</span><span className="t">ASSURANCE PLAN</span><span className="st">RECORDED</span></li>
        <li><span className="n">05</span><span className="t">EXECUTION EVIDENCE</span><span className="st">RECORDED</span></li>
        <li><span className="n">06</span><span className="t">FINDINGS</span><span className="st">RECORDED</span></li>
        <li className="am"><span className="n">07</span><span className="t">EXCEPTIONS &amp; UNCERTAINTY</span><span className="st am">OPEN · VISIBLE</span></li>
        <li><span className="n">08</span><span className="t">RESIDUAL RISK POSITION</span><span className="st">STATED</span></li>
        <li><span className="n">09</span><span className="t">READINESS ASSESSMENT</span><span className="st nv">ISSUED</span></li>
        <li><span className="n">10</span><span className="t">PROVENANCE</span><span className="st">ATTACHED</span></li>
      </ol>
      <figcaption className="ledger-foot caption">Illustrative Zuvvix operating model — designed behavior.</figcaption>
    </figure>
  </div>
</section>

{/*  02 PROBLEM  */}
<section className="sec tint" id="problem" aria-labelledby="h-pr">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">02</span><span className="label">The problem</span></p>
      <h2 className="h2" id="h-pr" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>Activity does not automatically establish a business conclusion.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>A test report can tell you how many checks ran, what passed, what failed and which defects were raised. Those facts matter. But they do not by themselves answer the executive question: what can we responsibly conclude about this change?</p>
    </div>
    <div className="co"><span className="label">Reframe</span><p>Test activity produces signals. An Assurance Case turns relevant signals into an inspectable argument for a decision.</p></div>
    <div className="mm" role="table" aria-label="From test results to decision evidence">
      <div className="hr" role="row"><span className="h" role="columnheader" style={{ color: 'var(--mid)' }}>Old mental model</span><span aria-hidden="true"></span><span className="h hb" role="columnheader">Zuvvix mental model</span></div>
      <div role="row"><span className="a" role="cell">Pass / fail totals</span><span className="ar" aria-hidden="true"></span><span className="b" role="cell">Condition-by-condition support and contradiction</span></div>
      <div role="row"><span className="a" role="cell">Screenshots / logs</span><span className="ar" aria-hidden="true"></span><span className="b" role="cell">Evidence with provenance, context, method and limitations</span></div>
      <div role="row"><span className="a" role="cell">AI confidence</span><span className="ar" aria-hidden="true"></span><span className="b" role="cell">Inspectable reasoning grounded in evidence</span></div>
      <div role="row"><span className="a" role="cell">One neat answer</span><span className="ar" aria-hidden="true"></span><span className="b" role="cell">Explicit uncertainty and contrary evidence</span></div>
      <div role="row"><span className="a" role="cell">Static report</span><span className="ar" aria-hidden="true"></span><span className="b" role="cell">Validity tied to versions, environment and evidence freshness</span></div>
      <div role="row"><span className="a" role="cell">Release recommendation</span><span className="ar" aria-hidden="true"></span><span className="b" role="cell">Readiness assessment separated from customer authorization</span></div>
    </div>
    <div className="co dark"><span className="label">Category line</span><p>Do not ask only, “Did the tests pass?” Ask, “What evidence justifies the decision?”</p></div>
  </div>
</section>

{/*  03 DEFINITION (ZW-07A)  */}
<section className="sec" id="anatomy" aria-labelledby="h-an">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">03</span><span className="label">The Assurance Case</span></p>
      <h2 className="h2" id="h-an" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>Ten components. One inspectable argument.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>Every assignment culminates in a structured evidence package. The case is organized around the conditions the mandate requires Zuvvix to establish—not around the convenience of a test tool or model output.</p>
    </div>
    <div data-anim>
      <ol className="anat10" aria-label="The ten components of the Zuvvix Assurance Case">
        <li><span className="num">01</span><span><span className="lab">CHANGE MANIFEST</span><b>What changed</b></span></li>
        <li><span className="num">02</span><span><span className="lab">CONTEXT MANIFEST</span><b>What Zuvvix knew and relied upon</b></span></li>
        <li><span className="num">03</span><span><span className="lab">IMPACT MAP</span><b>What could be affected</b></span></li>
        <li><span className="num">04</span><span><span className="lab">ASSURANCE PLAN</span><b>What Zuvvix chose to validate and why</b></span></li>
        <li><span className="num">05</span><span><span className="lab">EXECUTION EVIDENCE</span><b>What was actually performed</b></span></li>
        <li><span className="num">06</span><span><span className="lab">FINDINGS</span><b>What failed or remains questionable</b></span></li>
        <li className="u"><span className="num">07</span><span><span className="lab">EXCEPTIONS &amp; UNCERTAINTY</span><b>What could not be established</b></span></li>
        <li><span className="num">08</span><span><span className="lab">RESIDUAL RISK POSITION</span><b>What meaningful uncertainty remains</b></span></li>
        <li className="r"><span className="num">09</span><span><span className="lab">READINESS ASSESSMENT</span><b>The Zuvvix conclusion</b></span></li>
        <li><span className="num">10</span><span><span className="lab">PROVENANCE</span><b>Models, tools, versions, timestamps and evidence references</b></span></li>
      </ol>
    </div>
    <p className="currency">ASSURANCE CASE = evidence currency for the mandate</p>
    <div className="co"><span className="label">Evidence currency</span><p>The Assurance Case becomes Zuvvix’s evidence currency: a reusable, inspectable record of why a material conclusion was reached.</p></div>
  </div>
</section>

{/*  04 EVIDENCE SEMANTICS (ZW-07B)  */}
<section className="sec tint" id="semantics" aria-labelledby="h-se">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">04</span><span className="label">Evidence semantics</span></p>
      <h2 className="h2" id="h-se" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>Confidence is not evidence. Provenance is.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>Zuvvix must not flatten the evidence chain. A raw observation, a derived measurement, a model interpretation, a finding and an authorized decision are different objects with different epistemic weight.</p>
    </div>
    <ol className="chain5" aria-label="Evidence-to-decision chain">
      <li className="obs"><h3>SOURCE OBSERVATION</h3><p>Raw artefact / API / telemetry / calculation</p><small>Directly tied to a source and collection method.</small></li>
      <li className="der"><h3>DERIVED MEASUREMENT</h3><p>A transformation with visible method</p><small>Must expose upstream evidence and the transformation used.</small></li>
      <li className="int"><h3>MODEL INTERPRETATION</h3><p>Reasoning about the evidence—not evidence by itself</p><small>Never treated as independent correctness evidence by itself.</small></li>
      <li className="fin"><h3>FINDING</h3><p>Supported violation, ambiguity or observation</p><small>Linked to evidence and a condition or hypothesis.</small></li>
      <li className="dec"><h3>AUTHORIZED DECISION</h3><p>Owner + reasoning + scope + review conditions</p><small>Records the evidence considered and when it must be reviewed.</small></li>
    </ol>
    <div className="prov" aria-label="Provenance rail">
      <span className="label">Provenance rail</span>
      <ol><li>SOURCE</li><li>METHOD</li><li>VERSIONS</li><li>TIMESTAMPS</li><li>ENVIRONMENT</li><li>TRANSFORMATIONS</li><li>LIMITATIONS</li><li>OWNER</li></ol>
    </div>
    <div className="travel"><span className="label">Contrary evidence + limitations + unresolved assumptions</span><p>They travel forward. They are never hidden to make the conclusion look cleaner.</p></div>
  </div>
</section>

{/*  05 EVIDENCE CONTRACT (ZW-07C)  */}
<section className="sec" id="contract" aria-labelledby="h-ec">
  <div className="wrap">
    <p className="kicker"><span className="idx">05</span><span className="label">The evidence contract</span></p>
    <h2 className="h2" id="h-ec" style={{ maxWidth: '22ch' }}>Five questions before evidence can support a material conclusion.</h2>
    <div className="contract" id="contractGrid">
      <svg className="lines" id="cLines" aria-hidden="true"></svg>
      <div className="ccore" id="cCore"><span className="label">MATERIAL EVIDENCE</span><b>Provenance-bearing observations and derivations</b><span>not model confidence</span></div>
      <div className="ck" data-k="t"><span className="label">TRACEABILITY</span><b>Can the conclusion be traced to source evidence?</b></div>
      <div className="ck" data-k="a"><span className="label">APPLICABILITY</span><b>Does it apply to this version, environment and change?</b></div>
      <div className="ck" data-k="f"><span className="label">FRESHNESS</span><b>Is the evidence still current?</b></div>
      <div className="ck" data-k="s"><span className="label">SUFFICIENCY</span><b>Is there enough evidence for the claim?</b></div>
      <div className="ck" data-k="i"><span className="label">INDEPENDENCE</span><b>Where consequence warrants it, was correctness established independently?</b></div>
    </div>
    <div className="pass5"><b>PASS ALL FIVE? → DEFENSIBLE SUPPORT</b><span>If not, the limitation remains visible in the Assurance Case.</span></div>
    <div className="co dark"><span className="label">Independence</span><p>A second model agreeing with the first is not independent verification. Independence requires a separate source or method.</p></div>
  </div>
</section>

{/*  06 CONTRARY EVIDENCE  */}
<section className="sec tint" id="contrary" aria-labelledby="h-ce">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">06</span><span className="label">Contrary evidence &amp; uncertainty</span></p>
      <h2 className="h2" id="h-ce" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>A trustworthy case can contain disagreement.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>The Assurance Case must allow evidence to support and oppose the same condition. It must also record assumptions, omissions, material knowledge gaps, stale evidence and conditions that could not be established. The system must not resolve these away merely to produce a cleaner conclusion.</p>
    </div>
    <article className="split2" aria-label="Illustrative condition with supporting and contrary evidence">
      <div className="split2-top"><span><span className="label">Agreed condition · illustrative</span><br /><b>Partial refunds allocate to the correct ledger line</b></span><span className="cstate">STATUS · UNRESOLVED</span></div>
      <div className="sides">
        <div className="sup"><h3>SUPPORTING EVIDENCE</h3><ul>
          <li><small>Source observation · Payment API</small>API contract v3.8 carries the allocation field as intended.</li>
          <li><small>Observation · journey trace</small>Refund posts end to end in the sandbox journey.</li>
        </ul></div>
        <div className="con"><h3>CONTRARY EVIDENCE</h3><ul>
          <li><small>Observation · environment</small>Sandbox callback pattern differs from the production pattern.</li>
          <li><small>Reconciliation · independent</small>Local reconciliation cannot confirm downstream allocation.</li>
        </ul></div>
      </div>
      <div className="attach">
        <div><small>Assumption</small>Sandbox allocation behaves as production does.</div>
        <div><small>Omission</small>Production-equivalent callback evidence not obtained.</div>
        <div><small>Validity · decision owner</small>Payment service v3.8, sandbox. Customer release authority.</div>
      </div>
    </article>
    <ul className="checks" aria-label="What the case must keep visible">
      <li>Supporting evidence is visible.</li>
      <li>Contrary evidence is equally visible.</li>
      <li>Omissions are explicit.</li>
      <li>Unresolved assumptions remain attached to the conclusion.</li>
      <li>Evidence that becomes stale or invalid must be flagged before a new readiness output is issued.</li>
    </ul>
    <dl className="logic" aria-label="Condition-by-condition case logic">
      <div><dt>Agreed condition</dt><dd>Every condition from the assignment acceptance criteria appears in the case.</dd></div>
      <div><dt>Status</dt><dd>Satisfied / violated / unresolved / not applicable, with basis.</dd></div>
      <div><dt>Support</dt><dd>Evidence that supports satisfaction or violation.</dd></div>
      <div><dt>Contrary evidence</dt><dd>Evidence that cuts against the current interpretation.</dd></div>
      <div><dt>Assumptions</dt><dd>What must be true for the conclusion to hold.</dd></div>
      <div><dt>Omissions</dt><dd>Known evidence or checks not obtained/performed.</dd></div>
      <div><dt>Validity</dt><dd>Versions, environment, time period and dependencies under which the conclusion remains applicable.</dd></div>
      <div><dt>Decision owner</dt><dd>Who owns the resulting judgment or escalation.</dd></div>
    </dl>
    <div className="co amb"><span className="label">Trust standard</span><p>INDETERMINATE is preferable to false certainty when the evidence cannot support a defensible conclusion.</p></div>
  </div>
</section>

{/*  07 READINESS BRIDGE  */}
<section className="sec" id="readiness" aria-labelledby="h-rb">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">07</span><span className="label">From Assurance Case to readiness</span></p>
      <h2 className="h2" id="h-rb" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>Decision support, not release authority.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>The Assurance Case supports a four-state readiness assessment: READY, READY WITH EXCEPTIONS, NOT READY or INDETERMINATE.</p>
    </div>
    <div className="bridge" aria-label="Assurance Case to readiness assessment to customer authorization">
      <div className="case"><small>ASSURANCE CASE</small>Condition-by-condition evidence</div>
      <span className="arr" aria-hidden="true"></span>
      <div className="bstates" aria-label="Readiness assessment states"><span className="ok">READY</span><span className="rw">READY WITH EXCEPTIONS</span><span className="nr">NOT READY</span><span className="in">INDETERMINATE</span></div>
      <span className="arr gate" aria-hidden="true"></span>
      <div className="auth"><small>SEPARATE DECISION</small>Customer release authorization</div>
    </div>
    <div className="co dark"><span className="label">Authority boundary</span><p>Zuvvix can own the quality of the assessment within the mandate while the customer retains final release authorization.</p></div>
    <p style={{ marginTop: '24px' }}><a className="link-arrow" href="/readiness/">Explore the readiness states</a></p>
  </div>
</section>

{/*  08 FIRST CAPABILITY  */}
<section className="sec tint" id="first" aria-labelledby="h-fc">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">08</span><span className="label">Where the Assurance Case appears first</span></p>
      <h2 className="h2" id="h-fc" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>Continuous Release Assurance.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>For every relevant change affecting an agreed critical business journey, the first Zuvvix mandate assembles the context, determines impact, performs qualified assurance within explicit authority, exposes unresolved uncertainty and culminates in an Assurance Case plus readiness assessment.</p>
    </div>
    <dl className="cra" aria-label="How assignment evidence maps into the Assurance Case">
      <div><dt>Change + context</dt><dd>Establishes the exact change and knowledge basis.</dd></div>
      <div><dt>Impact + plan</dt><dd>Shows what Zuvvix believed could matter and why it chose specific assurance.</dd></div>
      <div><dt>Execution attempts</dt><dd>Records what actually ran, under which versions and environment.</dd></div>
      <div><dt>Evidence + findings</dt><dd>Connects observations to material conditions and risk hypotheses.</dd></div>
      <div><dt>Exceptions + uncertainty</dt><dd>Shows what could not be established.</dd></div>
      <div><dt>Readiness</dt><dd>Summarizes the resulting position without hiding the underlying case.</dd></div>
    </dl>
    <p style={{ marginTop: '24px', display: 'flex', flexWrap: 'wrap', gap: '12px 28px' }}><a className="link-arrow" href="/from-change-to-evidence/">Watch a case form, step by step</a><a className="link-arrow" href="/quality-mandate/">The Quality Mandate behind it</a></p>
  </div>
</section>

{/*  09 CTA  */}
<section className="sec" id="next" aria-labelledby="h-nx">
  <div className="wrap">
    <p className="kicker"><span className="idx">09</span><span className="label">Designed today. Demonstrated later.</span></p>
    <h2 className="h2" id="h-nx" style={{ maxWidth: '22ch' }}>See the case operating inside a real quality mandate.</h2>
    <div className="cl6" role="table" aria-label="Claims maturity">
      <div className="hr" role="row"><span className="h" role="columnheader">Claim</span><span className="h" role="columnheader">State today</span><span className="h" role="columnheader">How we say it</span></div>
      <div role="row"><span className="c" role="cell">Assurance Case structure</span><span className="s" role="cell">DESIGNED</span><span className="l" role="cell">Designed to organize the evidence described on this page.</span></div>
      <div role="row"><span className="c" role="cell">Evidence type distinction</span><span className="s" role="cell">DESIGNED</span><span className="l" role="cell">An explained contract, not a claim that production telemetry exists.</span></div>
      <div role="row"><span className="c" role="cell">Contrary-evidence handling</span><span className="s" role="cell">DESIGNED</span><span className="l" role="cell">A stated requirement with a reference visualization.</span></div>
      <div role="row"><span className="c" role="cell">Evidence contract</span><span className="s" role="cell">DESIGNED</span><span className="l" role="cell">The governing standard for material conclusions.</span></div>
      <div role="row"><span className="c" role="cell">Pilot case quality</span><span className="s n" role="cell">NOT YET PROVEN</span><span className="l" role="cell">Published only after repeatable design-partner evidence exists.</span></div>
      <div role="row"><span className="c" role="cell">False-green reduction / decision lead time</span><span className="s n" role="cell">NOT YET PROVEN</span><span className="l" role="cell">No outcome percentages until measured in a stated context.</span></div>
    </div>
    <div className="cta-row" style={{ marginTop: '36px' }}>
      <a className="btn btn-primary" href="/continuous-release-assurance/">See Continuous Release Assurance</a>
      <a className="btn btn-quiet" href="/trust/">Explore Trust &amp; Authority</a>
    </div>
    <div className="finalstd"><p>Zuvvix is willing to expose the evidence, contradiction and uncertainty behind its own conclusion—not ask you to trust a black box.</p></div>
  </div>
</section>

    </>
  )
}
