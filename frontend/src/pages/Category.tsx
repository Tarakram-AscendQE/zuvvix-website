import React from 'react'
import { Link } from 'react-router-dom'
import { HeadMeta } from '@/components/seo/HeadMeta'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useModal } from '@/context/ModalContext'

export function Category() {
  useScrollReveal()
  const { openFollow } = useModal()

  return (
    <>
      <HeadMeta
        title="Outcome-Accountable Quality Operations | Zuvvix"
        description="The category definition for Outcome-Accountable Quality Operations: from quality by activity to quality by accountability."
        canonicalPath="/category/"
      />
      

{/*  01 HERO  */}
<section className="cat-hero" id="top" aria-labelledby="h1">
  <div className="wrap">
    <p className="eyebrow">Outcome-Accountable Quality Operations</p>
    <h1 className="h1" id="h1">Quality should be accountable for the decision—not the activity.</h1>
    <p className="lede">Enterprise quality has long been measured through people, tests, automation, defects and effort. Those signals matter. But the enterprise question is larger: what quality responsibility is being accepted, what evidence supports the decision, and what remains uncertain?</p>
    <div className="cta-row">
      <a className="btn btn-primary" href="/how-it-works/">See how Zuvvix works</a>
      <a className="btn btn-quiet" href="/continuous-release-assurance/">Explore Continuous Release Assurance</a>
    </div>
    <div className="transit" aria-label="From Quality by Activity to Quality by Accountability">
      <span className="o">Quality by Activity</span><i aria-hidden="true"></i><span className="n">Quality by Accountability</span>
    </div>
  </div>
</section>

{/*  02 MISMATCH  */}
<section className="sec tint" id="mismatch" aria-labelledby="h-mm">
  <div className="wrap">
    <p className="kicker"><span className="idx">02</span><span className="label">The operating-model mismatch</span></p>
    <h2 className="h2" id="h-mm" style={{ maxWidth: '24ch' }}>Quality by Activity is not a criticism of testers. It is a description of the operating model.</h2>
    <p className="lede" style={{ marginTop: '22px' }}>Modern enterprises ask whether a change can be made responsibly. Traditional quality systems often answer with activity metrics: how many tests ran, how many defects were found, how much automation exists and how many people are assigned. Those signals are useful. They are not the business answer.</p>
    <div className="mm" role="table" aria-label="What Quality by Activity measures, and what the enterprise still needs to know">
      <div className="mm-head" role="row"><span className="label" role="columnheader">Quality by Activity measures</span><span aria-hidden="true"></span><span className="label" role="columnheader" style={{ color: 'var(--navy)' }}>The enterprise still needs to know</span></div>
      <div className="mm-row" role="row"><span className="tok" role="cell">People assigned</span><span className="dash" aria-hidden="true"></span><span className="q" role="cell">Who accepts the quality responsibility?</span></div>
      <div className="mm-row" role="row"><span className="tok" role="cell">Tests executed</span><span className="dash" aria-hidden="true"></span><span className="q" role="cell">What material conditions have actually been established?</span></div>
      <div className="mm-row" role="row"><span className="tok" role="cell">Automation percentage</span><span className="dash" aria-hidden="true"></span><span className="q" role="cell">Was the right assurance performed for the risk?</span></div>
      <div className="mm-row" role="row"><span className="tok" role="cell">Defect count</span><span className="dash" aria-hidden="true"></span><span className="q" role="cell">Which material conditions are violated?</span></div>
      <div className="mm-row" role="row"><span className="tok" role="cell">Regression hours</span><span className="dash" aria-hidden="true"></span><span className="q" role="cell">How quickly can we reach a defensible decision?</span></div>
      <div className="mm-row" role="row"><span className="tok" role="cell">Pass / fail dashboard</span><span className="dash" aria-hidden="true"></span><span className="q" role="cell">What remains uncertain, and why?</span></div>
    </div>
    <div className="question"><span className="label">The question</span><p>Can we responsibly release this change—and what evidence supports that decision?</p></div>
  </div>
</section>

{/*  03 CATEGORY SHIFT (ZW-04A)  */}
<section className="sec" id="shift" aria-labelledby="h-shift">
  <div className="wrap">
    <p className="kicker"><span className="idx">03</span><span className="label">The category shift</span></p>
    <h2 className="h2" id="h-shift" style={{ maxWidth: '20ch' }}>From Quality by Activity to Quality by Accountability.</h2>
    <p className="lede" style={{ marginTop: '22px' }}>The shift is not from manual testing to automation. It is from counting activity to accepting a bounded responsibility and producing the evidence required to discharge it.</p>

    <figure className="cs" data-anim aria-label="Change the unit of value: from activity signals to an accepted quality responsibility" style={{ marginInline: '0' }}>
      <div className="cs-card cs-old">
        <span className="label">Quality by Activity</span>
        <h3>Useful signals.<br />Incomplete answer.</h3>
        <div className="chips"><span>People assigned</span><span>Tests executed</span><span>Automation %</span><span>Defects raised</span><span>Regression hours</span><span>Pass / fail</span></div>
        <div className="unans"><small>Still unanswered:</small><b>What responsibility is accepted?</b></div>
      </div>
      <div className="cs-mid" aria-hidden="true">
        <span className="mob">Change the unit of value.</span>
        <span className="pill">UNIT OF VALUE</span>
        <span className="arr"></span>
      </div>
      <div className="cs-card cs-new">
        <span className="label">Quality by Accountability</span>
        <h3>Accepted quality responsibility</h3>
        <div className="mandate-box"><span className="label">Quality Mandate</span><p>Scope • authority • evidence • obligations • service levels</p></div>
        <div className="rail5" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
        <p className="rail-cap">Context → qualified assurance → evidence → readiness</p>
        <div className="badges"><span className="eb">Evidence-backed</span><span className="uv">Uncertainty visible</span></div>
      </div>
    </figure>
    <p className="cs-foot">The shift is not manual → automation. It is activity → accountability.</p>

    <div className="tbl" role="table" aria-label="Quality by Activity compared with Quality by Accountability">
      <div className="tbl-row h" role="row"><span className="a" role="columnheader">Quality by Activity</span><span className="b" role="columnheader">Quality by Accountability</span></div>
      <div className="tbl-row" role="row"><span className="a" role="cell">People assigned</span><span className="b" role="cell">Responsibility accepted</span></div>
      <div className="tbl-row" role="row"><span className="a" role="cell">Tests executed</span><span className="b" role="cell">Evidence established</span></div>
      <div className="tbl-row" role="row"><span className="a" role="cell">Automation percentage</span><span className="b" role="cell">Qualified work performed</span></div>
      <div className="tbl-row" role="row"><span className="a" role="cell">Defect count</span><span className="b" role="cell">Material conditions violated</span></div>
      <div className="tbl-row" role="row"><span className="a" role="cell">Coverage as a quantity</span><span className="b" role="cell">Coverage as risk-relevant evidence</span></div>
      <div className="tbl-row" role="row"><span className="a" role="cell">Pass / fail dashboard</span><span className="b" role="cell">Readiness with explicit uncertainty</span></div>
      <div className="tbl-row" role="row"><span className="a" role="cell">Release gate</span><span className="b" role="cell">Continuous quality operation</span></div>
      <div className="tbl-row" role="row"><span className="a" role="cell">Knowledge in people and documents</span><span className="b" role="cell">Persistent enterprise intelligence</span></div>
      <div className="tbl-row" role="row"><span className="a" role="cell">AI output</span><span className="b" role="cell">Evidence with provenance</span></div>
    </div>
    <div className="co"><span className="label">Core shift</span><p>The unit of value moves from testing activity to an accepted quality responsibility.</p></div>
  </div>
</section>

{/*  04 DEFINITION  */}
<section className="sec tint" id="definition" aria-labelledby="h-def">
  <div className="wrap">
    <p className="kicker"><span className="idx">04</span><span className="label">Define the category</span></p>
    <h2 className="h2" id="h-def" style={{ maxWidth: '18ch' }}>Outcome-Accountable Quality Operations</h2>
    <p className="lede" style={{ marginTop: '22px' }}>A simpler shorthand is <strong style={{ color: 'var(--navy)' }}>Enterprise Quality Operations</strong>. “Outcome-accountable” explains what makes the model different.</p>
    <div className="def-card">
      <span className="label">Plain-English definition</span>
      <p className="plain">An operating model in which a provider accepts a bounded quality responsibility, develops the enterprise context needed to discharge it, applies qualified human and machine competence, performs permitted assurance work, substantiates material conclusions, manages exceptions and produces evidence against agreed quality outcomes.</p>
      <details className="formal" id="formal">
        <summary>Read the formal definition</summary>
        <p>Outcome-Accountable Quality Operations is an operating model in which a provider accepts a bounded enterprise quality mandate, continuously acquires the context needed to execute it, applies qualified human and machine competencies, performs permitted assurance work, independently verifies material conclusions, manages exceptions and produces auditable evidence against agreed quality outcomes.</p>
      </details>
    </div>
  </div>
</section>

{/*  05 SIX COMPONENTS (ZW-04B)  */}
<section className="sec" id="components" aria-labelledby="h-six">
  <div className="wrap">
    <p className="kicker"><span className="idx">05</span><span className="label">The operating contract</span></p>
    <h2 className="h2" id="h-six">The six-part operating contract.</h2>
    <p className="lede" style={{ marginTop: '22px' }}>Responsibility and accountability bookend the operating system. Context, competence, action and evidence form the chain between them.</p>
    <ol className="contract" data-anim aria-label="Six-part operating contract, in order">
      <li className="end"><span className="cn">RESPONSIBILITY</span><span className="ring" aria-hidden="true"></span><p>Accept an explicit mandate rather than merely supply resources.</p></li>
      <li><span className="cn">CONTEXT</span><span className="ring" aria-hidden="true"></span><p>Maintain enough enterprise understanding to discharge that responsibility.</p></li>
      <li><span className="cn">COMPETENCE</span><span className="ring" aria-hidden="true"></span><p>Use human, machine or combined capabilities only where they are qualified for the conditions.</p></li>
      <li><span className="cn">ACTION</span><span className="ring" aria-hidden="true"></span><p>Perform permitted assurance work—not only recommend what someone else should test.</p></li>
      <li><span className="cn">EVIDENCE</span><span className="ring" aria-hidden="true"></span><p>Substantiate material conclusions with traceable evidence, not model confidence.</p></li>
      <li className="end"><span className="cn">ACCOUNTABILITY</span><span className="ring" aria-hidden="true"></span><p>Measure the operation against the quality responsibility it accepted.</p></li>
    </ol>
    <div className="complete"><span className="label">The category is the complete operating model</span><p>Not an agent count. Not an automation percentage. Not a testing package.</p></div>
  </div>
</section>

{/*  06 NOT ANOTHER AI LABEL  */}
<section className="sec tint" id="different" aria-labelledby="h-diff">
  <div className="wrap">
    <p className="kicker"><span className="idx">06</span><span className="label">Not another label for AI testing</span></p>
    <h2 className="h2" id="h-diff" style={{ maxWidth: '20ch' }}>The category is not defined by how many agents it uses.</h2>
    <p className="lede" style={{ marginTop: '22px' }}>Agentic execution may be part of the machinery. It is not the category. The differentiation is the complete operating system behind accountability.</p>
    <div className="models" role="table" aria-label="Adjacent models compared">
      <div className="mrow2 h" role="row"><span role="columnheader">Model</span><span role="columnheader">Primary unit</span><span role="columnheader">What is still missing for outcome accountability</span></div>
      <div className="mrow2" role="row"><span className="m" role="cell">Testing tool</span><span className="u" role="cell"><span className="ml">Primary unit</span>Execution / automation</span><span className="g" role="cell"><span className="ml">Still missing</span>Accepted responsibility, enterprise context, authority, independent evidence and operating accountability.</span></div>
      <div className="mrow2" role="row"><span className="m" role="cell">Agentic QE</span><span className="u" role="cell"><span className="ml">Primary unit</span>Automated QE tasks</span><span className="g" role="cell"><span className="ml">Still missing</span>Qualification by context, explicit authority, evidence independence and commercial responsibility.</span></div>
      <div className="mrow2" role="row"><span className="m" role="cell">Managed testing / QE</span><span className="u" role="cell"><span className="ml">Primary unit</span>Service delivery</span><span className="g" role="cell"><span className="ml">Still missing</span>A mandate-centered unit of value, persistent enterprise intelligence and explicit evidence/uncertainty contracts.</span></div>
      <div className="mrow2 target" role="row"><span className="m" role="cell">Outcome-Accountable Quality Operations</span><span className="u" role="cell"><span className="ml">Primary unit</span>Bounded quality responsibility</span><span className="g" role="cell"><span className="ml">Target model</span>This is the target operating model: mandate + context + qualified competence + bounded action + evidence + accountability.</span></div>
    </div>
    <div className="sysline" aria-label="Differentiating system">
      <span className="label">Differentiating system</span>
      <span className="t">Mandate</span><b>+</b><span className="t">Enterprise Intelligence</span><b>+</b><span className="t">Qualified Competence</span><b>+</b><span className="t">Bounded Autonomy</span><b>+</b><span className="t">Independent Evidence</span><b>+</b><span className="t">Agency Operations</span><b>+</b><span className="t">Outcome Economics</span>
    </div>
  </div>
</section>

{/*  07 PROGRESSION (ZW-04C)  */}
<section className="sec" id="progression" aria-labelledby="h-prog">
  <div className="wrap">
    <p className="kicker"><span className="idx">07</span><span className="label">The progression</span></p>
    <h2 className="h2" id="h-prog" style={{ maxWidth: '22ch' }}>Capabilities remain. The operating model changes.</h2>
    <p className="lede" style={{ marginTop: '22px' }}>This progression is conceptual, not a claim that earlier disciplines disappear. Testing remains essential. The category changes how those capabilities are organized, governed and measured.</p>
    <ol className="prog" aria-label="Testing, Assurance, Quality Operations, Accountability">
      <li><span className="pn">TESTING</span><span className="ring" aria-hidden="true"></span><p>An activity.</p></li>
      <li><span className="pn">ASSURANCE</span><span className="ring" aria-hidden="true"></span><p>A capability.</p></li>
      <li><span className="pn">QUALITY OPERATIONS</span><span className="ring" aria-hidden="true"></span><p>An operating system.</p></li>
      <li className="end"><span className="pn">ACCOUNTABILITY</span><span className="ring" aria-hidden="true"></span><p>The business model.</p></li>
    </ol>
    <p className="prog-line">Testing → Assurance → Quality Operations → Accountability</p>
  </div>
</section>

{/*  08 ZUVVIX CONNECTION  */}
<section className="sec tint" id="zuvvix" aria-labelledby="h-zx">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">08</span><span className="label">How Zuvvix is designed to operationalize it</span></p>
      <h2 className="h2" id="h-zx" style={{ maxWidth: 'none' }}>Simple outside. Deep inside.</h2>
      <p className="lede" style={{ marginTop: '18px', maxWidth: '78ch' }}>Zuvvix is designed around five proof pillars: Understand, Assure, Act, Prove and Improve.</p>
      <div style={{ marginTop: '14px' }}><span><span className="tag blue"><span className="dot"></span>Designed · building now</span></span></div>
    </div>
    <div className="pil" role="table" aria-label="Five proof pillars">
      <div className="pil-row" role="row"><span className="pv" role="cell">UNDERSTAND</span><span className="wm" role="cell">Persistent Enterprise Intelligence captures intent, implementation, observed behaviour, dependencies and uncertainty.</span><span className="we" role="cell">Know what matters before deciding what to test.</span></div>
      <div className="pil-row" role="row"><span className="pv" role="cell">ASSURE</span><span className="wm" role="cell">Qualified human and machine competencies perform the appropriate work for the risk.</span><span className="we" role="cell">Use the right assurance—not simply more assurance.</span></div>
      <div className="pil-row" role="row"><span className="pv" role="cell">ACT</span><span className="wm" role="cell">Agentic execution operates tools and workflows within explicit authority.</span><span className="we" role="cell">Autonomy is earned, bounded and enforced.</span></div>
      <div className="pil-row" role="row"><span className="pv" role="cell">PROVE</span><span className="wm" role="cell">Material conclusions are supported by traceable, independently verifiable evidence.</span><span className="we" role="cell">AI output is not evidence.</span></div>
      <div className="pil-row" role="row"><span className="pv" role="cell">IMPROVE</span><span className="wm" role="cell">Delivery evidence can improve future capability through controlled evaluation.</span><span className="we" role="cell">Learn without uncontrolled self-modification.</span></div>
    </div>
    <p style={{ marginTop: '28px' }}><a className="link-arrow" href="/from-change-to-evidence/">See the operating model in motion</a></p>
  </div>
</section>

{/*  09 BOUNDARIES  */}
<section className="sec" id="boundaries" aria-labelledby="h-bd">
  <div className="wrap">
    <p className="kicker"><span className="idx">09</span><span className="label">Boundaries</span></p>
    <h2 className="h2" id="h-bd">What the category does not mean</h2>
    <div className="pairs">
      <div className="pair"><span className="nt"><s>Guaranteed quality</s></span><span className="in">Evidence-backed readiness within a bounded mandate.</span></div>
      <div className="pair"><span className="nt"><s>Autonomous QE everywhere</s></span><span className="in">Qualified, bounded execution by action and context.</span></div>
      <div className="pair"><span className="nt"><s>AI replacing testers</s></span><span className="in">Machines handle suitable repeatable work; experts retain ambiguity, consequence and qualification.</span></div>
      <div className="pair"><span className="nt"><s>AI output as evidence</s></span><span className="in">Evidence carries provenance, applicability, validity and limitations.</span></div>
      <div className="pair"><span className="nt"><s>One “single source of truth”</s></span><span className="in">Intended, implemented and observed behaviour can conflict and remain distinguishable.</span></div>
      <div className="pair"><span className="nt"><s>Customer gives away all release authority</s></span><span className="in">Service responsibility and final business authority remain explicit and separable.</span></div>
    </div>
    <div className="stance"><span className="ind">INDETERMINATE</span><p>When the evidence is insufficient, the trustworthy answer is INDETERMINATE.</p></div>
  </div>
</section>

{/*  10 POSTURE + CTA  */}
<section className="sec tint" id="posture" aria-labelledby="h-post">
  <div className="wrap">
    <p className="kicker"><span className="idx">10</span><span className="label">Current posture</span></p>
    <h2 className="h2" id="h-post" style={{ maxWidth: '22ch' }}>The category is public now. The evidence will grow with the product.</h2>
    <p className="lede" style={{ marginTop: '22px' }}>Zuvvix is building the operating system described here. The first capabilities will be released incrementally starting next quarter, with broader platform capability developed over the following six months. We will distinguish clearly between what is thesis, designed, demonstrated and proven as evidence becomes available.</p>
    <ol className="mat" aria-label="Claims maturity">
      <li className="on"><span className="st">THESIS</span><p>Outcome-Accountable Quality Operations as a category.</p><span className="what">Stated with confidence. Not an established analyst category.</span></li>
      <li className="now"><span className="st">DESIGNED</span><p>The Zuvvix operating system, Quality Mandate and proof pillars.</p><span className="what">Where Zuvvix is today.</span></li>
      <li><span className="st">DEMONSTRATED</span><p>Capabilities shown end to end in bounded prototypes.</p><span className="what">Begins with incremental releases.</span></li>
      <li><span className="st">PROVEN</span><p>Repeated real-world evidence within a stated context.</p><span className="what">Published only with scope and permission.</span></li>
    </ol>
    <div className="cta-block">
      <div className="stack">
        <p className="sup">Explore the operating system behind the category: mandate, enterprise intelligence, qualified competence, bounded authority and evidence.</p>
        <div className="cta-row" style={{ marginTop: '4px' }}>
          <a className="btn btn-primary" href="/how-it-works/">See how Zuvvix works</a>
          <a className="btn btn-quiet" href="/continuous-release-assurance/">Explore Continuous Release Assurance</a>
        </div>
      </div>
      <p className="ed"><a href="/thinking/#follow">Follow the build</a>: the ideas, experiments, evidence and lessons shaping Zuvvix.</p>
    </div>
  </div>
</section>

    </>
  )
}
