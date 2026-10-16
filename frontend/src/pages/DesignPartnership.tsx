import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { HeadMeta } from '@/components/seo/HeadMeta'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useModal } from '@/context/ModalContext'

export function DesignPartnership() {
  useScrollReveal()
  const { openFollow } = useModal()

  useEffect(() => {
    const f = document.getElementById('pform') as HTMLFormElement | null
    if (!f) return

    const handleSubmit = async (e: SubmitEvent) => {
      e.preventDefault()
      const reqs = f.querySelectorAll('[required]') as NodeListOf<HTMLInputElement | HTMLTextAreaElement>
      let firstBad: HTMLElement | null = null
      let badCount = 0

      reqs.forEach((inp) => {
        const err = f.querySelector('#e-' + inp.name) as HTMLElement | null
        const ok = inp.value.trim() !== '' && (!inp.checkValidity || inp.checkValidity())
        if (err) err.hidden = ok
        inp.setAttribute('aria-invalid', String(!ok))
        if (!ok) {
          badCount++
          if (!firstBad) firstBad = inp
        }
      })

      if (firstBad) {
        ;(firstBad as HTMLElement).focus()
        return
      }

      const submitBtn = f.querySelector('button[type="submit"]') as HTMLButtonElement | null
      const originalBtnText = submitBtn ? submitBtn.innerText : 'Start the conversation'
      if (submitBtn) {
        submitBtn.disabled = true
        submitBtn.innerText = 'Sending...'
      }

      try {
        const formData = new FormData(f)
        const payload = {
          formType: 'design-partnership',
          name: (formData.get('name') as string)?.trim() || '',
          email: (formData.get('email') as string)?.trim() || '',
          company: (formData.get('company') as string)?.trim() || '',
          role: (formData.get('role') as string)?.trim() || '',
          journey: (formData.get('journey') as string)?.trim() || '',
          systems: (formData.get('systems') as string) || '',
          frequency: (formData.get('frequency') as string) || '',
          difficulty: (formData.get('difficulty') as string)?.trim() || '',
          next: (formData.get('next') as string) || '',
        }

        // Try /api/send-email first (Node backend), fallback to /send-email.php (PHP)
        let response = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

        if (response.status === 404) {
          response = await fetch('/send-email.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
        }

        const text = await response.text()
        let result: any = null
        try {
          result = JSON.parse(text)
        } catch {
          if (text.startsWith('<?php')) {
            throw new Error('PHP execution is not supported by Vite. Please start the backend server to test email delivery locally.')
          }
          throw new Error('Unexpected response from email service.')
        }

        if (response.ok && result?.success) {
          toast.success('Thank you! Your partnership conversation request has been received.')
          const done = document.createElement('div')
          done.className = 'done-msg'
          done.setAttribute('role', 'status')
          done.innerHTML = '<strong>Thank you.</strong> We have received your details and will write back to review whether this journey is a fit for a design partnership.'
          f.innerHTML = ''
          f.appendChild(done)
        } else {
          toast.error(result?.message || 'Failed to send message. Please try again.')
          if (submitBtn) {
            submitBtn.disabled = false
            submitBtn.innerText = originalBtnText
          }
        }
      } catch (err: any) {
        console.error('Error submitting design partnership form:', err)
        toast.error(err.message || 'Failed to send message. Please try again.')
        if (submitBtn) {
          submitBtn.disabled = false
          submitBtn.innerText = originalBtnText
        }
      }
    }

    f.addEventListener('submit', handleSubmit)
    return () => f.removeEventListener('submit', handleSubmit)
  }, [])

  return (
    <>
      <HeadMeta
        title="Design Partnership | Zuvvix"
        description="Explore a design partnership with Zuvvix: start with one critical journey, draft a bounded Quality Mandate, and agree what must be proven first."
        canonicalPath="/design-partnership/"
      />
      

{/*  01 HERO  */}
<section className="dp-hero" id="top" aria-labelledby="h1">
  <div className="wrap dp-hero-grid">
    <div>
      <p className="eyebrow">Design partnership</p>
      <h1 className="h1" id="h1">Prove one quality responsibility before expanding the promise.</h1>
      <p className="lede">Choose one critical digital business journey. Give Zuvvix controlled visibility into the changes affecting it. We will run alongside your existing process, determine what needs assurance, perform the work within agreed authority and produce an evidence-backed readiness position for every relevant release.</p>
      <div className="cta-row">
        <a className="btn btn-primary" href="#start">Start a design-partnership conversation</a>
        <a className="btn btn-quiet" href="/continuous-release-assurance/">See Continuous Release Assurance</a>
      </div>
      <p className="matnote"><span className="tag blue"><span className="dot"></span>Designed</span><span>A designed engagement model. There are no named customers or quantified outcomes to show yet; evidence will be published as it is earned.</span></p>
    </div>
    <aside className="notthis" aria-label="What a design partnership is and is not">
      <span className="label" style={{ color: 'var(--navy)' }}>What this is</span>
      <div className="row is"><small>IS</small><span>A controlled engagement that produces evidence about one bounded responsibility.</span></div>
      <div className="row is"><small>IS</small><span>One critical journey, in shadow mode first.</span></div>
      <div className="row isnt"><small>IS NOT</small><span>An early-access sales program or discounted pilot.</span></div>
      <div className="row isnt"><small>IS NOT</small><span>A promise to transform enterprise QE before the proof exists.</span></div>
    </aside>
  </div>
</section>

{/*  02 MUTUAL PROOF CONTRACT (ZW-11A)  */}
<section className="sec tint" id="contract" aria-labelledby="h-mpc">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">02</span><span className="label">A mutual proof contract</span></p>
      <h2 className="h2" id="h-mpc" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>Both sides contribute to the evidence.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>One bounded quality responsibility. Two parties. Explicit contributions. The enterprise creates the conditions for a fair test; Zuvvix accepts the bounded responsibility and makes its evidence, limitations and operating effort inspectable.</p>
    </div>
    <div className="mpc" aria-label="Mutual proof contract">
      <div className="side ent"><h3>THE ENTERPRISE CONTRIBUTES</h3><ul>
        <li>One critical business journey</li><li>Recurring changes / releases</li><li>Relevant ALM, CI/CD and context access</li><li>Named business + QE owners</li><li>Stable enough environment</li><li>Baseline effort / outcomes</li><li>Shadow-mode comparison rights</li></ul></div>
      <div className="mid-ar" aria-hidden="true"><i></i></div>
      <div className="side zx"><h3>ZUVVIX CONTRIBUTES</h3><ul>
        <li>Bounded Quality Mandate</li><li>Context + impact reasoning</li><li>Qualified assurance within authority</li><li>Assurance Case + readiness position</li><li>Visible limitations + uncertainty</li><li>Operating telemetry + interventions</li><li>Evidence-based expansion decision</li></ul></div>
    </div>
    <div className="shared"><small>SHARED OUTPUT</small><b>Evidence that justifies expand / hold / change / stop</b></div>

    <div className="detail2">
      <div>
        <h3>What the enterprise contributes</h3>
        <p className="sub">A design partnership requires operational conditions, not just executive interest.</p>
        <dl className="dl2 e">
          <div><dt>Critical journey + scope</dt><dd>Name the business journey, key systems, boundaries and relevant release/change stream.</dd></div>
          <div><dt>Intent owners</dt><dd>Business owner(s) able to resolve expected behavior and ambiguity.</dd></div>
          <div><dt>Executive sponsor + QE leader</dt><dd>Authority to provide access, compare outcomes and resolve blocked decisions.</dd></div>
          <div><dt>Controlled information access</dt><dd>Relevant ALM, CI/CD, source/configuration metadata, tests, environment and observability subject to agreed policy.</dd></div>
          <div><dt>Stable enough non-production conditions</dt><dd>Sufficient environment/data consistency to produce interpretable evidence.</dd></div>
          <div><dt>Historical context where available</dt><dd>Change, defect and incident history that can inform impact and comparison.</dd></div>
          <div><dt>Baseline metrics</dt><dd>Current effort, lead time, coordination, escapes or other agreed measures.</dd></div>
          <div><dt>Comparison and outcome rights</dt><dd>Permission to compare Zuvvix outputs with current process and record outcome evidence within agreed confidentiality/rights.</dd></div>
        </dl>
      </div>
      <div>
        <h3>What Zuvvix commits</h3>
        <p className="sub">Evidence and limitations—not theatre.</p>
        <dl className="dl2 z">
          <div><dt>Bounded Quality Mandate</dt><dd>Explicit responsibility, scope, exclusions, authority, evidence requirements and service dimensions.</dd></div>
          <div><dt>Versioned context basis</dt><dd>A visible record of what Zuvvix knew, relied upon and could not establish for each assignment.</dd></div>
          <div><dt>Risk-specific assurance</dt><dd>Work selected because of material change/risk, not simply more regression.</dd></div>
          <div><dt>Qualified + policy-controlled execution</dt><dd>Actions performed only where demonstrated competence and authority permit.</dd></div>
          <div><dt>Assurance Case + readiness position</dt><dd>Traceable evidence, findings, exceptions, uncertainty and decision-support output.</dd></div>
          <div><dt>Transparent interventions</dt><dd>Human/expert interventions recorded with reason rather than hidden from automation metrics.</dd></div>
          <div><dt>Operating telemetry</dt><dd>Elapsed time, blocked time, customer effort, expert effort, retries/rework and cost drivers where measured.</dd></div>
          <div><dt>Evidence-based review</dt><dd>A clear recommendation to expand, hold, change the model or stop—based on evidence, not sunk-cost pressure.</dd></div>
        </dl>
      </div>
    </div>
  </div>
</section>

{/*  03 PARTNER FIT (ZW-11C)  */}
<section className="sec" id="fit" aria-labelledby="h-fit">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">03</span><span className="label">What makes a good first design partner</span></p>
      <h2 className="h2" id="h-fit" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>Complex enough to matter. Bounded enough to measure.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>A good design partner gives the hypothesis a fair test.</p>
    </div>
    <div className="fit">
      <div className="fit-yes"><h3>STRONG FIRST-PARTNER SIGNALS</h3>
        <ul className="sig">
          <li><span className="t">BOUNDABLE</span><span><b>Clearly identifiable critical business journey</b><span className="w">Creates a bounded responsibility and understandable business outcome.</span></span></li>
          <li><span className="t">CONNECTED</span><span><b>Several interacting systems (approximately 3–8)</b><span className="w">Exposes cross-system risk without making the first proof unbounded.</span></span></li>
          <li><span className="t">REPEATED</span><span><b>Meaningful release/change frequency</b><span className="w">Creates repeated assignments so correctness and operating behavior can be observed.</span></span></li>
          <li><span className="t">EQUIPPED</span><span><b>Existing automation/testing assets</b><span className="w">Lets Zuvvix coordinate existing capabilities rather than rebuild commodity execution.</span></span></li>
          <li><span className="t">OBSERVABLE</span><span><b>Accessible ALM / CI/CD / change context</b><span className="w">Supports timely intake and reproducible context.</span></span></li>
          <li><span className="t">HISTORIED</span><span><b>6–12 months of history if possible</b><span className="w">Helps establish failure patterns and baseline context.</span></span></li>
          <li><span className="t">OWNED</span><span><b>Identifiable business owners + empowered sponsor</b><span className="w">Provides authority for intent clarification, access, decisions and comparison.</span></span></li>
          <li><span className="t">STABLE</span><span><b>Stable enough environment</b><span className="w">Allows evidence to reflect the product/journey rather than permanent environmental noise.</span></span></li>
          <li><span className="t">COOPERATIVE</span><span><b>Willingness to begin in shadow mode</b><span className="w">Creates comparative evidence before consequential authority expands.</span></span></li>
          <li><span className="t">MEASURABLE</span><span><b>Measurable current cost/effort + outcome evidence</b><span className="w">Makes operating leverage and economics assessable rather than anecdotal.</span></span></li>
        </ul>
      </div>
      <div className="fit-no"><h3>NOT YET A GOOD FIRST FIT</h3>
        <p className="i">Bad first conditions create ambiguous evidence. These are reasons to wait, not a judgment of the organization.</p>
        <ul>
          <li>No accountable owner for expected behavior or business intent.</li>
          <li>Permanently unstable environments that prevent meaningful validation.</li>
          <li>Release/change data or critical dependencies are inaccessible.</li>
          <li>Every change follows a different approval structure, making comparison impossible.</li>
          <li>All relevant validation is undocumented and cannot be observed or compared.</li>
          <li>The first proposed journey is life-critical, irreversible or otherwise outside the bounded consequence profile.</li>
          <li>The organization will not allow Zuvvix recommendations or outcomes to be compared with the existing process.</li>
        </ul>
      </div>
    </div>
    <div className="co dark"><span className="label">Selection rule</span><p>A poor first design partner can make a sound hypothesis look false—or make a weak system look successful. Selection quality is part of the experiment design.</p></div>
  </div>
</section>

{/*  04 SHADOW MODE (ZW-11B)  */}
<section className="sec tint" id="shadow" aria-labelledby="h-sh">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">04</span><span className="label">Shadow mode first</span></p>
      <h2 className="h2" id="h-sh" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>Responsibility expands only after evidence earns it.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>The first operating posture is shadow mode—not a broad autonomous handoff. Zuvvix runs beside the existing process before taking more responsibility.</p>
    </div>
    <div className="s2e" data-anim>
      <ol aria-label="From shadow mode to expansion">
        <li className="s1"><span className="n">01</span><b>BOUND THE JOURNEY</b><p>Agree mandate, scope, authority, evidence and baseline.</p></li>
        <li className="s2"><span className="n">02</span><b>SHADOW</b><p>Run beside the existing process; no consequential takeover.</p></li>
        <li className="s3"><span className="n">03</span><b>COMPARE</b><p>Compare evidence, escapes, lead time, effort and interventions.</p></li>
        <li className="s4"><span className="n">04</span><b>QUALIFY</b><p>Confirm what is repeatable and where human judgment remains essential.</p></li>
        <li className="egate" aria-label="Evidence gate"><span>EVIDENCE GATE</span></li>
        <li className="s5"><span className="n">05</span><b>EXPAND CAREFULLY</b><p>Increase responsibility or autonomy only where evidence supports it.</p></li>
      </ol>
      <div className="gate-band"><small>EVIDENCE GATE · NOT A CALENDAR MILESTONE</small><b>Correctness • Repeatability • Transfer • Customer effort • Economics</b></div>
    </div>
    <div className="lanes" aria-label="What shadow mode looks like">
      <div className="lanes-top"><span className="label" style={{ color: 'var(--navy)' }}>Shadow mode, per relevant change</span><span className="tag">Designed</span></div>
      <div className="lane ex"><span className="who">EXISTING PROCESS<small>Keeps consequential authority</small></span><span className="steps"><span>Current assurance</span><i>→</i><span>Current decision</span><i>→</i><span className="auth">Release authority</span></span></div>
      <div className="lane zx"><span className="who">ZUVVIX, IN PARALLEL<small>Executes the full operating model</small></span><span className="steps"><span>Assignment</span><i>→</i><span>Evidence assembled</span><i>→</i><span>Interventions recorded</span><i>→</i><span>Readiness position</span></span></div>
      <div className="lane cmp"><span className="who">COMPARISON<small>Evidence accumulates</small></span><span className="steps"><span>Agreement and disagreement</span><span>Missed conditions</span><span>Effort and lead time</span></span></div>
    </div>
    <div className="co"><span className="label">Shadow is not free observation</span><p>Zuvvix still executes the defined operating model, assembles evidence, records interventions and produces its readiness position. Consequential authority stays with the existing process while evidence accumulates.</p></div>
  </div>
</section>

{/*  05 SUCCESS  */}
<section className="sec" id="success" aria-labelledby="h-su">
  <div className="wrap">
    <p className="kicker"><span className="idx">05</span><span className="label">How success will be judged</span></p>
    <h2 className="h2" id="h-su" style={{ maxWidth: '22ch' }}>A pilot is not successful because the demo looked impressive.</h2>
    <dl className="judge">
      <div className="ns"><dt>Correctness</dt><dd>Were material impact and readiness conclusions supported—and did false-green behavior remain acceptably low?</dd></div>
      <div><dt>Repeatability</dt><dd>Can the same mandate be executed repeatedly through common contracts rather than custom heroics?</dd></div>
      <div><dt>Transfer</dt><dd>Can the approach be reused on another comparable journey without rebuilding the core?</dd></div>
      <div><dt>Decision lead time</dt><dd>Does the operating model reach a defensible position fast enough to matter?</dd></div>
      <div><dt>Critical-journey assurance coverage</dt><dd>Do agreed material risks have current evidence?</dd></div>
      <div><dt>Material uncertainty exposure</dt><dd>Does the system surface important unresolved conditions before release?</dd></div>
      <div><dt>Customer effort</dt><dd>Does the partnership reduce clarification, coordination and supervision burden over time?</dd></div>
      <div><dt>Expert effort</dt><dd>Are human minutes per comparable accepted assignment declining without degrading quality?</dd></div>
      <div><dt>Economics</dt><dd>Can a usable assurance assignment be delivered at a viable recurring cost?</dd></div>
    </dl>
    <div className="co dark"><span className="label">North-star quality principle</span><p>False-Green Rate matters more than “automation rate.” A fast READY that should not have been issued is failure, not efficiency.</p></div>
  </div>
</section>

{/*  06 EXPANSION DECISION  */}
<section className="sec tint" id="decision" aria-labelledby="h-de">
  <div className="wrap">
    <div>
      <p className="kicker"><span className="idx">06</span><span className="label">The expansion decision</span></p>
      <h2 className="h2" id="h-de" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>Evidence can support four legitimate outcomes.</h2>
      <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>Stop is not a commercial failure. Early disconfirming evidence is valuable because it prevents scaling the wrong operating model.</p>
    </div>
    <div className="outs4">
      <div className="o4 ex"><b>EXPAND</b><p>Evidence supports broader mandate scope, greater repetition, or carefully increased bounded autonomy.</p></div>
      <div className="o4 ho"><b>HOLD</b><p>Current scope is useful, but more evidence is needed before expanding responsibility.</p></div>
      <div className="o4 ch"><b>CHANGE THE MODEL</b><p>Evidence exposes a wrong assumption, weak operating mechanism or customer condition that requires redesign.</p></div>
      <div className="o4 st"><b>STOP</b><p>The economics, correctness, transfer or operating burden do not justify continuation in the current form.</p></div>
    </div>
  </div>
</section>

{/*  07 FIRST ENGAGEMENT  */}
<section className="sec" id="shape" aria-labelledby="h-fe">
  <div className="wrap">
    <p className="kicker"><span className="idx">07</span><span className="label">First engagement shape</span></p>
    <h2 className="h2" id="h-fe" style={{ maxWidth: '22ch' }}>A bounded working sequence—not a transformation program.</h2>
    <ol className="phases" aria-label="First engagement phases">
      <li><span className="pn">01</span><b>FRAME</b><p>Select the journey; define mandate boundary, authority, evidence requirements and baseline.</p><span className="out"><small>OUTPUT</small>Agreed Quality Mandate + baseline plan</span></li>
      <li><span className="pn">02</span><b>CONNECT</b><p>Establish controlled access to the agreed context, tooling and environment.</p><span className="out"><small>OUTPUT</small>Context readiness + known gaps</span></li>
      <li className="sh"><span className="pn">03</span><b>SHADOW</b><p>Run recurring assignments beside the existing process.</p><span className="out"><small>OUTPUT</small>Assurance Cases + readiness positions + intervention/effort telemetry</span></li>
      <li><span className="pn">04</span><b>COMPARE</b><p>Evaluate correctness, disagreement, missed conditions, customer effort and economics.</p><span className="out"><small>OUTPUT</small>Evidence review</span></li>
      <li className="dc"><span className="pn">05</span><b>DECIDE</b><p>Expand, hold, change the model or stop.</p><span className="out"><small>OUTPUT</small>Joint evidence-backed next-step decision</span></li>
    </ol>
  </div>
</section>

{/*  08 CLAIMS  */}
<section className="sec tint" id="claims" aria-labelledby="h-cl">
  <div className="wrap">
    <p className="kicker"><span className="idx">08</span><span className="label">Claim maturity</span></p>
    <h2 className="h2" id="h-cl" style={{ maxWidth: '22ch' }}>The partnership offer must not outrun the product.</h2>
    <div className="cl6" role="table" aria-label="Claims maturity">
      <div className="hr" role="row"><span className="h" role="columnheader">Claim</span><span className="h" role="columnheader">State today</span><span className="h" role="columnheader">What that means</span></div>
      <div role="row"><span className="c" role="cell">Design-partnership model</span><span className="s" role="cell">DESIGNED</span><span className="l" role="cell">The proposed engagement and selection logic described on this page.</span></div>
      <div role="row"><span className="c" role="cell">Shadow-mode operating sequence</span><span className="s" role="cell">DESIGNED</span><span className="l" role="cell">Not yet in recurring customer operation.</span></div>
      <div role="row"><span className="c" role="cell">Reliability / correctness improvements</span><span className="s n" role="cell">UNPROVEN</span><span className="l" role="cell">Claimed only after comparative operating evidence exists.</span></div>
      <div role="row"><span className="c" role="cell">Reduced human coordination / better economics</span><span className="s e" role="cell">HYPOTHESIS</span><span className="l" role="cell">To be measured, not a promised result.</span></div>
      <div role="row"><span className="c" role="cell">Transfer to a second journey or customer</span><span className="s e" role="cell">EXPANSION CONDITION</span><span className="l" role="cell">Not claimed until demonstrated.</span></div>
      <div role="row"><span className="c" role="cell">Greater Zuvvix responsibility or autonomy</span><span className="s e" role="cell">EVIDENCE-DEPENDENT</span><span className="l" role="cell">Never automatic after a fixed time period.</span></div>
    </div>
  </div>
</section>

{/*  09 START  */}
<section className="sec start" id="start" aria-labelledby="h-st">
  <div className="wrap start-grid">
    <div className="stack">
      <p className="kicker"><span className="idx">09</span><span className="label">Start a conversation</span></p>
      <h2 className="h2" id="h-st">Choose one critical business journey.</h2>
      <p className="lede">We will use a working conversation to determine whether it is bounded, observable and measurable enough for a meaningful proof engagement.</p>
      <div className="alt">
        <span><a href="/continuous-release-assurance/">See Continuous Release Assurance →</a><br /><small>The first mandate a partnership would operate.</small></span>
        <span><a href="/thinking/#follow">Follow the build →</a><br /><small>Not ready yet? Follow the ideas, experiments and evidence.</small></span>
      </div>
    </div>
    <form name="design-partnership" method="POST" data-netlify="true" netlify-honeypot="bot-field" className="pform" id="pform" noValidate aria-labelledby="pf-h">
<input type="hidden" name="form-name" value="design-partnership" /><p hidden><label>Leave this field empty <input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
      <h3 id="pf-h">Start a design-partnership conversation</h3>
      <p className="req">Five required fields. No budget, timeline or phone number.</p>
      <fieldset>
        <legend>ABOUT YOU</legend>
        <div className="two">
          <div className="fld"><label htmlFor="f-name">Name</label><input id="f-name" name="name" autoComplete="name" required aria-describedby="e-name" /><span className="err" id="e-name" hidden>Enter your name.</span></div>
          <div className="fld"><label htmlFor="f-email">Work email</label><input id="f-email" name="email" type="email" autoComplete="email" required aria-describedby="e-email" /><span className="err" id="e-email" hidden>Enter a valid work email, like name@company.com.</span></div>
        </div>
        <div className="two">
          <div className="fld"><label htmlFor="f-co">Company</label><input id="f-co" name="company" autoComplete="organization" required aria-describedby="e-co" /><span className="err" id="e-co" hidden>Enter your company.</span></div>
          <div className="fld"><label htmlFor="f-role">Role / responsibility</label><input id="f-role" name="role" list="roles" required aria-describedby="e-role" placeholder="e.g. Head of QE" /><datalist id="roles"><option value="CIO / CTO" /><option value="EVP / VP Engineering" /><option value="Head of QE / TCoE" /><option value="Product / Application leader" /></datalist><span className="err" id="e-role" hidden>Enter your role.</span></div>
        </div>
        <div className="fld"><label htmlFor="f-journey">Critical journey / use case</label><textarea id="f-journey" name="journey" required aria-describedby="e-journey" placeholder="e.g. Partial refunds across commerce, payments and finance"></textarea><span className="err" id="e-journey" hidden>Describe the journey in a sentence.</span></div>
      </fieldset>
      <fieldset className="opt">
        <legend>OPTIONAL CONTEXT</legend>
        <div className="two">
          <div className="fld"><label htmlFor="f-sys">Approximate interacting systems <small>(optional)</small></label><select id="f-sys" name="systems"><option value="">Choose a range</option><option>1–2</option><option>3–5</option><option>6–8</option><option>More than 8</option></select></div>
          <div className="fld"><label htmlFor="f-freq">Release / change frequency <small>(optional)</small></label><select id="f-freq" name="frequency"><option value="">Choose a range</option><option>Daily or more</option><option>Weekly</option><option>Every 2–4 weeks</option><option>Monthly or less</option></select></div>
        </div>
        <div className="fld"><label htmlFor="f-hard">What makes quality difficult today? <small>(optional)</small></label><textarea id="f-hard" name="difficulty"></textarea></div>
        <div className="fld"><span style={{ fontSize: '13.5px', fontWeight: '600', color: 'var(--navy)' }} id="f-next-l">Preferred next step <small style={{ fontWeight: '400', color: 'var(--mid)' }}>(optional)</small></span>
          <div className="radios" role="radiogroup" aria-labelledby="f-next-l">
            <label><input type="radio" name="next" value="conversation" id="f-next-a" /> Working conversation</label>
            <label><input type="radio" name="next" value="context" id="f-next-b" /> Share more context first</label>
          </div>
        </div>
      </fieldset>
      <div className="cta-row" style={{ marginTop: '4px' }}><button className="btn btn-primary" type="submit">Start the conversation</button></div>
      <p className="pv-note">We use these details only to respond to this request. <a href="/privacy/">Privacy</a></p>
    </form>
  </div>
</section>

<section className="sec" aria-label="Closing">
  <div className="wrap">
    <div className="finalstd">
      <p>The disciplined beginning of an <span style={{ whiteSpace: 'nowrap' }}>evidence-backed</span> operating relationship—not a discounted pilot, an AI showcase, or a promise to transform the enterprise before the proof exists.</p>
    </div>
  </div>
</section>

    </>
  )
}
