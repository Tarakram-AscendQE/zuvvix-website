import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HeadMeta } from '@/components/seo/HeadMeta'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useModal } from '@/context/ModalContext'

export function FromChangeToEvidence() {
  useScrollReveal()
  const { openFollow } = useModal()

  useEffect(() => {
    const zw = document.getElementById('zw')
    const spine = document.getElementById('spine')
    const status = document.getElementById('sigStatus')
    const pauseBtn = document.getElementById('sigPause') as HTMLButtonElement | null
    const replayBtn = document.getElementById('sigReplay')
    if (!zw || !spine || !status) return

    const parts = zw.querySelectorAll('.s')
    const pre = zw.querySelectorAll('.pre') as NodeListOf<HTMLElement>
    const outs = zw.querySelectorAll('[data-out]')
    const spineItems = spine.querySelectorAll('li')

    const BEATS: [number, string, string][] = [
      [0, 'QUIET FIELD', 'Sparse systems visible. The mandate is faint. Readiness is empty.'],
      [1.5, 'CHANGE', 'Payment service v3.8 enters and attaches to Payment API.'],
      [3, 'DEPENDENCIES', 'Checkout, Orders and Finance illuminate. Unrelated systems stay quiet.'],
      [5, 'CONTEXT', 'Intended rule, implemented contract, observed behavior. One disagrees.'],
      [7, 'IMPACT', 'Two hypotheses form. The low-materiality branch fades; the finance branch stays.'],
      [9, 'ASSURE', 'Qualified competencies act. The gate permits validation and blocks a production change.'],
      [12, 'EVIDENCE', 'Evidence arrives from execution and independent reconciliation, with sources.'],
      [14.5, 'UNCERTAINTY', 'Sandbox callback fidelity stays open. It is not animated away.'],
      [16.5, 'ASSURANCE CASE', 'Evidence and the open condition assemble into the Assurance Case.'],
      [19, 'READINESS', 'A defensible position appears, with its exception stated.'],
    ]

    const beatsEl = document.getElementById('beats')
    if (beatsEl && beatsEl.children.length === 0) {
      BEATS.forEach((b, i) => {
        const li = document.createElement('li')
        li.innerHTML = `<button type="button"><span class="tm">${b[0].toFixed(1)}s</span><span class="bn">${b[1]}</span><span class="mn">${b[2]}</span></button>`
        li.querySelector('button')?.addEventListener('click', () => {
          stop()
          render(i)
        })
        beatsEl.appendChild(li)
      })
    }

    let step = 9
    let timers: number[] = []
    let running = false

    function render(s: number) {
      step = s
      parts.forEach((p) => {
        p.classList.toggle('on', +(p.getAttribute('data-s') || 0) <= s)
      })
      outs.forEach((p) => {
        p.classList.toggle('dim', s >= +(p.getAttribute('data-out') || 0))
      })
      pre.forEach((p) => {
        p.style.opacity = s >= +(p.getAttribute('data-until') || 0) ? '0' : '1'
      })
      spineItems.forEach((li) => {
        li.classList.toggle('on', +(li.getAttribute('data-s') || 0) <= s)
      })
      beatsEl?.querySelectorAll('li').forEach((li, i) => {
        li.classList.toggle('cur', i === s)
      })
      status!.textContent = s >= 9 && !running ? 'Final state: Ready with exceptions' : 'Stage: ' + BEATS[s][1]
    }

    function stop() {
      timers.forEach((t) => clearTimeout(t))
      timers = []
      running = false
      if (pauseBtn) pauseBtn.hidden = true
    }

    function play() {
      stop()
      running = true
      if (pauseBtn) {
        pauseBtn.hidden = false
        const span = pauseBtn.querySelector('span')
        if (span) span.textContent = 'Pause'
      }
      render(0)
      BEATS.forEach((b, i) => {
        if (i > 0) {
          const t = window.setTimeout(() => {
            render(i)
            if (i === BEATS.length - 1) {
              running = false
              if (pauseBtn) pauseBtn.hidden = true
            }
          }, b[0] * 1000)
          timers.push(t)
        }
      })
    }

    replayBtn?.addEventListener('click', play)
    render(9)

    return () => {
      stop()
      replayBtn?.removeEventListener('click', play)
    }
  }, [])

  return (
    <>
      <HeadMeta
        title="From Change to Evidence | Zuvvix"
        description="The complete end-to-end visualization of the Zuvvix operating model: from payment service change to qualified assurance and release readiness."
        canonicalPath="/from-change-to-evidence/"
      />
      
<section className="zw-hero">
  <div className="wrap">
    <a className="back" href="/#how">← Back to the homepage</a>
    <div className="sig-head">
      <div>
        <p className="eyebrow">Signature visualization</p>
        <h1 className="h1">From Change to Evidence</h1>
      </div>
      <div className="stack">
        <p className="lede">Zuvvix does not merely run tests. It reasons from change to the evidence needed for a decision, inside explicit responsibility and authority.</p>
        <div className="zw-meta"><span className="tag blue"><span className="dot"></span>Designed behavior</span><span className="tag">Illustrative scenario</span><span className="tag">No live telemetry</span></div>
      </div>
    </div>
  </div>
</section>

<section className="stage-wrap" aria-label="Interactive visualization">
  <div className="wrap">
    <div className="sig-frame" id="sig" style={{ marginTop: '0' }}>
      <div className="sig-bar">
        <span className="caption">Illustrative Zuvvix operating model — designed behavior.</span>
        <span className="sig-status" id="sigStatus" aria-live="polite">Final state</span>
        <button className="ctl" id="sigPause" type="button" aria-pressed="false" hidden>
          <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 2v8M9 2v8" stroke="currentColor" strokeWidth="2"/></svg><span>Pause</span>
        </button>
        <button className="ctl" id="sigReplay" type="button">
          <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M10 6a4 4 0 1 1-1.2-2.85M10 1.5V4H7.5" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg><span>Replay</span>
        </button>
      </div>
      <div className="endstate">
        <span className="label">Readiness outcome</span>
        <div className="seg" role="group" aria-label="Choose a readiness outcome">
          <button type="button" data-state="ready" aria-pressed="false">Ready</button>
          <button type="button" data-state="rwe" aria-pressed="true">Ready with exceptions</button>
          <button type="button" data-state="nr" aria-pressed="false">Not ready</button>
          <button type="button" data-state="ind" aria-pressed="false">Indeterminate</button>
        </div>
        <span className="caption" style={{ marginLeft: 'auto' }}>Same visual system. Four legitimate outcomes.</span>
      </div>

      <div className="sig-canvas sig-desk">
        <svg id="zw" viewBox="0 0 1520 600" role="img" aria-labelledby="zw-t zw-d">
          <title id="zw-t">From Change to Evidence: Payment service v3.8</title>
          <desc id="zw-d">A payment service v3.8 change enters a Quality Mandate and attaches to Payment API. Dependencies to Order Service, Checkout UI and Finance Ledger are implicated. Sourced context shows an intended refund rule, an implemented API contract and an observed sandbox callback that differs from production. One impact hypothesis remains. Qualified competencies act through a policy gate; a production change is blocked. Evidence arrives with sources. An Assurance Case assembles and a readiness position is produced. The current outcome is described in the text below the visual.</desc>

          <rect className="bound" x="220" y="70" width="1110" height="500" rx="24"/>
          <rect x="246" y="56" width="164" height="30" rx="15" fill="#101828"/>
          <text x="328" y="75.5" textAnchor="middle" style={{ fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: '600', letterSpacing: '.1em', fill: '#fff' }}>QUALITY MANDATE</text>
          <g className="t-lab">
            <text x="24" y="130">CHANGE</text><text x="244" y="130">CONTEXT</text><text x="560" y="130">IMPACT</text>
            <text x="770" y="130">ASSURE</text><text x="1000" y="130">EVIDENCE</text><text x="1356" y="130">READINESS</text>
          </g>
          <path className="ln" d="M368 224 H392 M306 252 V330 M454 252 V330 M368 358 H392"/>
          <rect className="n" x="244" y="196" width="124" height="56" rx="12"/><text className="t-node" x="306" y="229" textAnchor="middle">Payment API</text>
          <rect className="n" x="392" y="196" width="124" height="56" rx="12"/><text className="t-node" x="454" y="229" textAnchor="middle">Order Service</text>
          <rect className="n" x="244" y="330" width="124" height="56" rx="12"/><text className="t-node" x="306" y="363" textAnchor="middle">Checkout UI</text>
          <rect className="n" x="392" y="330" width="124" height="56" rx="12"/><text className="t-node" x="454" y="363" textAnchor="middle">Finance Ledger</text>
          <g className="pre" data-until="9">
            <rect x="1356" y="230" width="148" height="150" rx="14" fill="#fff" stroke="#98A2B3" strokeWidth="1.5" strokeDasharray="5 5"/>
            <text x="1430" y="300" textAnchor="middle" style={{ fontSize: '13px', fontWeight: '600', fill: '#667085' }}>No position yet</text>
            <text x="1430" y="320" textAnchor="middle" style={{ fontSize: '12px', fill: '#98A2B3' }}>awaits evidence</text>
          </g>

          <g className="s" data-s="1">
            <rect x="24" y="186" width="160" height="76" rx="14" fill="#2D5BFF"/>
            <text x="104" y="219" textAnchor="middle" style={{ fontSize: '14px', fontWeight: '600', fill: '#fff' }}>Payment service</text>
            <text x="104" y="240" textAnchor="middle" style={{ fontSize: '12.5px', fill: '#DCE4FF' }}>v3.8 change</text>
            <path className="ln-on" d="M184 224 H236"/><path d="M244 224 l-10 -6 v12 z" fill="#2D5BFF"/>
            <rect className="n-on" x="244" y="196" width="124" height="56" rx="12"/>
            <text className="t-sub" x="306" y="276" textAnchor="middle" style={{ fill: '#1F45D6' }}>changed</text>
          </g>
          <g className="s" data-s="2">
            <path className="ln-on" d="M368 224 H392 M306 282 V330 M454 252 V330"/>
            <rect x="392" y="196" width="124" height="56" rx="12" fill="none" stroke="#2D5BFF" strokeWidth="1.5"/>
            <rect x="244" y="330" width="124" height="56" rx="12" fill="none" stroke="#2D5BFF" strokeWidth="1.5"/>
            <rect x="392" y="330" width="124" height="56" rx="12" fill="none" stroke="#2D5BFF" strokeWidth="1.5"/>
          </g>
          <g className="s" data-s="3">
            <rect x="244" y="420" width="272" height="122" rx="10" fill="#fff" stroke="#D0D5DD" strokeWidth="1.5"/>
            <text className="t-lab" x="262" y="446" style={{ fontSize: '10.5px' }}>SOURCED CONTEXT</text>
            <text x="262" y="472" style={{ fontSize: '12.5px' }}>Refund allocation rule <tspan style={{ fill: '#667085' }}>· intended</tspan></text>
            <text x="262" y="496" style={{ fontSize: '12.5px' }}>API contract v3.8 <tspan style={{ fill: '#667085' }}>· implemented</tspan></text>
            <text x="262" y="520" style={{ fontSize: '12.5px' }}>Sandbox callback differs <tspan style={{ fill: '#B54708' }}>· observed</tspan></text>
            <circle cx="498" cy="516" r="6" fill="#FFF7ED" stroke="#B54708" strokeWidth="2"/>
          </g>
          <g className="s" data-s="4">
            <path className="ln-on" d="M454 290 H584"/><path d="M592 290 l-10 -6 v12 z" fill="#2D5BFF"/>
            <polygon points="640,242 688,290 640,338 592,290" fill="#fff" stroke="#2D5BFF" strokeWidth="2.5"/>
            <text x="640" y="288" textAnchor="middle" style={{ fontSize: '12px', fontWeight: '700' }}>IMPACT</text>
            <text x="640" y="304" textAnchor="middle" style={{ fontSize: '10.5px', fill: '#667085' }}>hypothesis</text>
            <rect x="560" y="356" width="164" height="68" rx="8" fill="#fff" stroke="#D0D5DD" strokeWidth="1.2"/>
            <text x="574" y="378" style={{ fontSize: '12px' }}>Partial refund may</text>
            <text x="574" y="395" style={{ fontSize: '12px' }}>allocate incorrectly</text>
            <text x="574" y="412" style={{ fontSize: '12px' }}>downstream</text>
          </g>
          <g className="s dim" data-s="4" data-out="5">
            <polygon points="640,146 664,170 640,194 616,170" fill="#fff" stroke="#98A2B3" strokeWidth="1.5" strokeDasharray="3 3"/>
            <text x="674" y="166" style={{ fontSize: '11px', fill: '#667085' }}>Checkout copy</text>
            <text x="674" y="181" style={{ fontSize: '11px', fill: '#98A2B3' }}>low materiality</text>
          </g>
          <g className="s" data-s="5">
            <rect x="770" y="166" width="176" height="52" rx="26" fill="#EFF4FF" stroke="#2D5BFF" strokeWidth="1.8"/>
            <text x="858" y="189" textAnchor="middle" style={{ fontSize: '13px', fontWeight: '600' }}>API Contract</text>
            <text x="858" y="206" textAnchor="middle" style={{ fontFamily: 'var(--mono)', fontSize: '9.5px', letterSpacing: '.08em', fill: '#1F45D6' }}>✓ QUALIFIED</text>
            <rect x="770" y="246" width="176" height="52" rx="26" fill="#EFF4FF" stroke="#2D5BFF" strokeWidth="1.8"/>
            <text x="858" y="269" textAnchor="middle" style={{ fontSize: '13px', fontWeight: '600' }}>Journey Validation</text>
            <text x="858" y="286" textAnchor="middle" style={{ fontFamily: 'var(--mono)', fontSize: '9.5px', letterSpacing: '.08em', fill: '#1F45D6' }}>✓ QUALIFIED</text>
            <rect x="770" y="326" width="176" height="52" rx="26" fill="#EFF4FF" stroke="#2D5BFF" strokeWidth="1.8"/>
            <text x="858" y="349" textAnchor="middle" style={{ fontSize: '13px', fontWeight: '600' }}>Reconciliation</text>
            <text x="858" y="366" textAnchor="middle" style={{ fontFamily: 'var(--mono)', fontSize: '9.5px', letterSpacing: '.08em', fill: '#1F45D6' }}>✓ QUALIFIED</text>
            <path className="ln-on" d="M688 290 C 730 290 730 272 770 272" style={{ strokeWidth: '1.5', opacity: '.6' }}/>
            <line x1="975" y1="150" x2="975" y2="480" stroke="#101828" strokeWidth="3"/>
            <rect x="945" y="130" width="60" height="24" rx="12" fill="#101828"/>
            <text x="975" y="146" textAnchor="middle" style={{ fontFamily: 'var(--mono)', fontSize: '9.5px', fontWeight: '600', letterSpacing: '.08em', fill: '#fff' }}>POLICY</text>
            <path className="ln-on" d="M946 192 H992 M946 272 H992 M946 352 H992" style={{ strokeWidth: '2' }}/>
            <path d="M1000 192 l-9 -5 v10 z M1000 272 l-9 -5 v10 z M1000 352 l-9 -5 v10 z" fill="#2D5BFF"/>
            <text x="985" y="174" style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '.06em', fill: '#1F45D6' }}>PERMITTED</text>
            <path d="M790 440 H960" stroke="#B42318" strokeWidth="1.8" strokeDasharray="6 5" fill="none"/>
            <g className="gate-x"><circle cx="975" cy="440" r="12" fill="#fff" stroke="#B42318" strokeWidth="2"/><path d="M969 434 l12 12 M981 434 l-12 12" stroke="#B42318" strokeWidth="2"/></g>
            <text x="790" y="428" style={{ fontSize: '12px', fill: '#B42318', fontWeight: '600' }}>Production change · BLOCKED</text>
            <text x="790" y="464" style={{ fontSize: '11.5px', fill: '#667085' }}>routed to customer authority</text>
          </g>
          <g className="s" data-s="6">
            <rect x="1004" y="165" width="146" height="54" rx="8" fill="#fff" stroke="#D0D5DD" strokeWidth="1.5"/>
            <text x="1016" y="183" style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '.08em', fill: '#1F45D6' }}>SOURCE</text>
            <text x="1016" y="204" style={{ fontSize: '12.5px', fontWeight: '600' }}>API observation</text>
            <rect x="1004" y="245" width="146" height="54" rx="8" fill="#fff" stroke="#D0D5DD" strokeWidth="1.5"/>
            <text x="1016" y="263" style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '.08em', fill: '#1F45D6' }}>OBSERVATION</text>
            <text x="1016" y="284" style={{ fontSize: '12.5px', fontWeight: '600' }}>Journey trace</text>
            <rect id="ev3-box" x="1004" y="325" width="146" height="54" rx="8" fill="#F5F7FF" stroke="#D0D5DD" strokeWidth="1.5"/>
            <text id="ev3-tag" x="1016" y="343" style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '.08em', fill: '#1F45D6' }}>RECONCILIATION</text>
            <text id="ev3-title" x="1016" y="364" style={{ fontSize: '12.5px', fontWeight: '600' }}>Independent check</text>
            <path d="M1140 170 V160 H1030 V165" stroke="#98A2B3" strokeWidth="1" fill="none" strokeDasharray="2 3"/>
          </g>
          <g className="s" data-s="7">
            <rect id="un-box" x="1004" y="405" width="146" height="60" rx="8" fill="#FFF7ED" stroke="#B54708" strokeWidth="1.8"/>
            <text id="un-tag" x="1016" y="425" style={{ fontFamily: 'var(--mono)', fontSize: '9.5px', fontWeight: '600', letterSpacing: '.08em', fill: '#B54708' }}>UNRESOLVED</text>
            <text x="1016" y="446" style={{ fontSize: '12.5px', fontWeight: '600' }}>Callback fidelity</text>
            <path id="unres-tether" d="M520 530 C 700 575 950 570 1004 462" stroke="#B54708" strokeWidth="1.2" strokeDasharray="3 5" fill="none" opacity=".7"/>
          </g>
          <g className="s" data-s="8">
            <path d="M1150 192 H1170 M1150 272 H1170 M1150 352 H1170" stroke="#98A2B3" strokeWidth="1.2"/>
            <path id="ac-tether" d="M1150 435 H1170" stroke="#B54708" strokeWidth="1.5" strokeDasharray="3 3"/>
            <rect x="1170" y="150" width="140" height="330" rx="12" fill="#fff" stroke="#101828" strokeWidth="1.8"/>
            <text x="1186" y="178" style={{ fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: '600', letterSpacing: '.09em', fill: '#101828' }}>ASSURANCE</text>
            <text x="1186" y="193" style={{ fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: '600', letterSpacing: '.09em', fill: '#101828' }}>CASE</text>
            <line x1="1186" y1="208" x2="1294" y2="208" stroke="#E4E7EC"/>
            <circle cx="1191" cy="234" r="4" fill="#2D5BFF"/><text x="1202" y="238" style={{ fontSize: '12px' }}>Change + scope</text>
            <circle cx="1191" cy="262" r="4" fill="#2D5BFF"/><text id="ac-ev" x="1202" y="266" style={{ fontSize: '12px' }}>3 evidence items</text>
            <circle id="ac-mk" cx="1191" cy="290" r="4" fill="#fff" stroke="#B54708" strokeWidth="2"/><text id="ac-ex" x="1202" y="294" style={{ fontSize: '12px' }}>1 exception</text>
            <line x1="1186" y1="318" x2="1294" y2="318" stroke="#E4E7EC"/>
            <text x="1186" y="342" style={{ fontSize: '11px', fill: '#667085' }}>Release authority</text>
            <text x="1186" y="358" style={{ fontSize: '11px', fill: '#667085' }}>stays with customer</text>
          </g>
          <g className="s" data-s="9">
            <path className="ln-on" d="M1310 305 H1348"/><path d="M1356 305 l-10 -6 v12 z" fill="#2D5BFF"/>
            <rect id="rd-card" x="1356" y="230" width="148" height="150" rx="14" fill="#EFF4FF" stroke="#2D5BFF" strokeWidth="2.5"/>
            <text x="1430" y="260" textAnchor="middle" style={{ fontFamily: 'var(--mono)', fontSize: '9.5px', letterSpacing: '.1em', fill: '#667085' }}>READINESS</text>
            <text id="rd-l1" x="1430" y="294" textAnchor="middle" style={{ fontSize: '17px', fontWeight: '700' }}>READY WITH</text>
            <text id="rd-l2" x="1430" y="316" textAnchor="middle" style={{ fontSize: '17px', fontWeight: '700' }}>EXCEPTIONS</text>
            <circle id="rd-mk" cx="1376" cy="349" r="5" fill="#fff" stroke="#B54708" strokeWidth="2"/>
            <text id="rd-ml" x="1388" y="353" style={{ fontSize: '12px', fill: '#344054' }}>1 exception</text>
            <text id="rd-x1" x="1356" y="408" style={{ fontSize: '12px', fill: '#344054' }}>Sandbox callback fidelity</text>
            <text id="rd-x2" x="1356" y="424" style={{ fontSize: '12px', fill: '#344054' }}>not established.</text>
          </g>

          {/*  interaction layer, in causal focus order  */}
          <g id="hots">
            <rect className="hot" tabIndex={0} data-k="change" x="18" y="180" width="172" height="88" rx="16" role="img" aria-label="Change: Payment service v3.8"/>
            <rect className="hot" tabIndex={0} data-k="papi" x="238" y="190" width="136" height="68" rx="14" role="img" aria-label="Payment API"/>
            <rect className="hot" tabIndex={0} data-k="order" x="386" y="190" width="136" height="68" rx="14" role="img" aria-label="Order Service"/>
            <rect className="hot" tabIndex={0} data-k="checkout" x="238" y="324" width="136" height="68" rx="14" role="img" aria-label="Checkout UI"/>
            <rect className="hot" tabIndex={0} data-k="finance" x="386" y="324" width="136" height="68" rx="14" role="img" aria-label="Finance Ledger"/>
            <rect className="hot" tabIndex={0} data-k="context" x="238" y="414" width="284" height="134" rx="12" role="img" aria-label="Sourced context"/>
            <rect className="hot" tabIndex={0} data-k="impact" x="554" y="234" width="176" height="196" rx="10" role="img" aria-label="Impact hypothesis"/>
            <rect className="hot" tabIndex={0} data-k="lowmat" x="608" y="140" width="156" height="60" rx="8" role="img" aria-label="Low-materiality hypothesis"/>
            <rect className="hot" tabIndex={0} data-k="c-api" x="764" y="160" width="188" height="64" rx="30" role="img" aria-label="API Contract competency"/>
            <rect className="hot" tabIndex={0} data-k="c-journey" x="764" y="240" width="188" height="64" rx="30" role="img" aria-label="Journey Validation competency"/>
            <rect className="hot" tabIndex={0} data-k="c-recon" x="764" y="320" width="188" height="64" rx="30" role="img" aria-label="Reconciliation competency"/>
            <rect className="hot" tabIndex={0} data-k="gate" x="956" y="122" width="38" height="290" rx="8" role="img" aria-label="Authority gate"/>
            <rect className="hot" tabIndex={0} data-k="blocked" x="782" y="410" width="212" height="64" rx="8" role="img" aria-label="Blocked production change"/>
            <rect className="hot" tabIndex={0} data-k="ev1" x="998" y="159" width="158" height="66" rx="10" role="img" aria-label="Evidence: API observation"/>
            <rect className="hot" tabIndex={0} data-k="ev2" x="998" y="239" width="158" height="66" rx="10" role="img" aria-label="Evidence: journey trace"/>
            <rect className="hot" tabIndex={0} data-k="ev3" x="998" y="319" width="158" height="66" rx="10" role="img" aria-label="Evidence: reconciliation"/>
            <rect className="hot" tabIndex={0} data-k="unres" x="998" y="399" width="158" height="72" rx="10" role="img" aria-label="Unresolved condition"/>
            <rect className="hot" tabIndex={0} data-k="ac" x="1164" y="144" width="152" height="342" rx="14" role="img" aria-label="Assurance Case"/>
            <rect className="hot" tabIndex={0} data-k="readiness" x="1350" y="224" width="160" height="212" rx="16" role="img" aria-label="Readiness position"/>
          </g>
        </svg>
      </div>

      <div className="sig-canvas sig-mob">
        <ol className="spine" id="spine" aria-label="From Change to Evidence, in causal order">
          <li data-s="1"><div className="st">CHANGE</div><p className="mc">A relevant enterprise change enters the mandate.</p>
            <div className="obj"><span className="chip blue full">Payment service v3.8 <small>change enters the mandate</small></span></div></li>
          <li data-s="3"><div className="st">CONTEXT</div><p className="mc">Retrieve the business, system and operating context that applies.</p>
            <div className="obj"><span className="chip on">Payment API <small>changed</small></span><span className="chip on">Order Service</span><span className="chip on">Checkout UI</span><span className="chip on">Finance Ledger</span>
            <div className="claims"><span className="label" style={{ fontSize: '10px' }}>Sourced context</span><span>Refund allocation rule · intended</span><span>API contract v3.8 · implemented</span><span className="amb">Sandbox callback differs · observed</span></div></div></li>
          <li data-s="4"><div className="st">IMPACT</div><p className="mc">Identify what could be affected, and where knowledge is incomplete.</p>
            <div className="obj"><span className="chip on full">◇ Partial refund may allocate incorrectly downstream</span></div></li>
          <li data-s="5"><div className="st">ASSURE</div><p className="mc">Select and perform qualified assurance inside explicit authority.</p>
            <div className="obj"><span className="chip cap">API Contract <small>✓ QUALIFIED</small></span><span className="chip cap">Journey Validation <small>✓ QUALIFIED</small></span><span className="chip cap">Reconciliation <small>✓ QUALIFIED</small></span><span className="chip blocked full">✕ Production change blocked · routed to customer authority</span></div></li>
          <li data-s="7"><div className="st">EVIDENCE</div><p className="mc">Preserve observations, provenance, findings and limitations.</p>
            <div className="obj"><span className="chip">API observation <small>source</small></span><span className="chip">Journey trace <small>observation</small></span><span className="chip" id="m-ev3">Independent check <small>reconciliation</small></span><span className="chip amber full" id="m-un">UNRESOLVED <small style={{ color: '#B54708' }}>sandbox callback fidelity</small></span></div></li>
          <li data-s="9"><div className="st">READINESS</div><p className="mc">Produce a defensible position.</p>
            <div className="obj"><div className="rcard" id="m-rd"><b>READY WITH EXCEPTIONS</b><span>1 unresolved condition retained in the Assurance Case</span></div></div></li>
        </ol>
      </div>

      <div className="below">
        <div className="inspect" id="inspect" aria-live="polite">
          <span className="label" id="in-lab">Readiness</span>
          <h3 id="in-title">READY WITH EXCEPTIONS</h3>
          <p id="in-body">Substantially satisfied. An explicit residual issue needs acceptance.</p>
          <dl className="kv" id="in-kv"></dl>
          <p className="hint">Hover or tab through any object in the visual to inspect it.</p>
        </div>
        <ol className="beats" id="beats" aria-label="Storyboard beats. Select one to jump to it."></ol>
      </div>
    </div>
  </div>
</section>

<section className="sec tint" aria-labelledby="h-gram">
  <div className="wrap">
    <p className="kicker"><span className="label">Semantic grammar</span></p>
    <h2 className="h2" id="h-gram" style={{ maxWidth: '22ch' }}>Every primitive has one stable meaning.</h2>
    <p className="lede" style={{ marginTop: '18px' }}>The same shapes mean the same things on every Zuvvix surface: homepage, product pages, decks and video.</p>
    <div className="grammar">
      <div className="gi"><svg viewBox="0 0 44 32"><rect x="4" y="8" width="36" height="16" rx="5" fill="#2D5BFF"/></svg><div><b>Change</b><span>A versioned, relevant enterprise change.</span></div></div>
      <div className="gi"><svg viewBox="0 0 44 32"><rect x="3" y="5" width="38" height="24" rx="6" fill="none" stroke="#101828" strokeWidth="1.5"/><rect x="8" y="2" width="16" height="6" rx="3" fill="#101828"/></svg><div><b>Mandate boundary</b><span>Scope of accepted responsibility.</span></div></div>
      <div className="gi"><svg viewBox="0 0 44 32"><rect x="4" y="8" width="36" height="16" rx="4" fill="#fff" stroke="#D0D5DD" strokeWidth="1.5"/></svg><div><b>System</b><span>Application, service, interface, data store or journey step.</span></div></div>
      <div className="gi"><svg viewBox="0 0 44 32"><path d="M2 16h40" stroke="#98A2B3" strokeWidth="1.5"/><path d="M2 22h40" stroke="#2D5BFF" strokeWidth="2"/></svg><div><b>Dependency</b><span>Sourced relationship. Blue only when implicated.</span></div></div>
      <div className="gi"><svg viewBox="0 0 44 32"><rect x="8" y="4" width="26" height="8" rx="2" fill="#fff" stroke="#98A2B3"/><rect x="8" y="13" width="26" height="8" rx="2" fill="#fff" stroke="#98A2B3"/><rect x="8" y="22" width="26" height="8" rx="2" fill="#fff" stroke="#98A2B3"/><circle cx="37" cy="26" r="3" fill="#B54708"/></svg><div><b>Context claim</b><span>Intended, implemented or observed behavior with provenance.</span></div></div>
      <div className="gi"><svg viewBox="0 0 44 32"><polygon points="22,3 35,16 22,29 9,16" fill="#fff" stroke="#2D5BFF" strokeWidth="2"/></svg><div><b>Risk hypothesis</b><span>A plausible failure mechanism that needs discriminating evidence.</span></div></div>
      <div className="gi"><svg viewBox="0 0 44 32"><rect x="3" y="8" width="38" height="16" rx="8" fill="#EFF4FF" stroke="#2D5BFF" strokeWidth="1.5"/><path d="M16 16l3 3 7-7" fill="none" stroke="#2D5BFF" strokeWidth="1.6"/></svg><div><b>Qualified competency</b><span>A procedure allowed to operate in this context.</span></div></div>
      <div className="gi"><svg viewBox="0 0 44 32"><path d="M22 6v24" stroke="#101828" strokeWidth="3"/><rect x="14" y="2" width="16" height="7" rx="3.5" fill="#101828"/></svg><div><b>Authority gate</b><span>Policy permits, pauses or blocks an action.</span></div></div>
      <div className="gi"><svg viewBox="0 0 44 32"><rect x="8" y="8" width="30" height="18" rx="3" fill="#fff" stroke="#D0D5DD" strokeWidth="1.5"/><path d="M2 4h10v4" fill="none" stroke="#98A2B3" strokeDasharray="2 2"/></svg><div><b>Evidence item</b><span>Observation or derived material, tethered to its source.</span></div></div>
      <div className="gi"><svg viewBox="0 0 44 32"><circle cx="22" cy="16" r="9" fill="#FFF7ED" stroke="#B54708" strokeWidth="2"/></svg><div><b>Uncertainty</b><span>A material condition not established. Amber, not alarm red.</span></div></div>
      <div className="gi"><svg viewBox="0 0 44 32"><rect x="8" y="2" width="28" height="28" rx="4" fill="#fff" stroke="#101828" strokeWidth="1.5"/><path d="M13 10h18M13 16h18M13 22h10" stroke="#98A2B3"/></svg><div><b>Assurance Case</b><span>The package that supports the readiness position.</span></div></div>
      <div className="gi"><svg viewBox="0 0 44 32"><rect x="4" y="4" width="36" height="24" rx="5" fill="#EFF4FF" stroke="#2D5BFF" strokeWidth="2"/></svg><div><b>Readiness state</b><span>Ready, Ready with exceptions, Not ready or Indeterminate.</span></div></div>
    </div>
  </div>
</section>

<section className="sec" aria-labelledby="h-states">
  <div className="wrap">
    <p className="kicker"><span className="label">Readiness state grammar</span></p>
    <h2 className="h2" id="h-states" style={{ maxWidth: '24ch' }}>One visual system. Four outcomes. No redesign.</h2>
    <p className="lede" style={{ marginTop: '18px' }}>Select a state to replay the scenario with that ending. INDETERMINATE is shown as a legitimate result, never as an error screen.</p>
    <div className="state-grid" id="stateCards">
      <button type="button" className="sc ready" data-state="ready" aria-pressed="false"><span className="sh"><i></i>READY</span><p>Agreed conditions established. No material unresolved issue known within scope.</p></button>
      <button type="button" className="sc rwe" data-state="rwe" aria-pressed="true"><span className="sh"><i></i>READY WITH EXCEPTIONS</span><p>Substantially satisfied. An explicit residual issue needs acceptance.</p></button>
      <button type="button" className="sc nr" data-state="nr" aria-pressed="false"><span className="sh"><i></i>NOT READY</span><p>Material evidence shows an unacceptable failure or an unsatisfied required condition.</p></button>
      <button type="button" className="sc ind" data-state="ind" aria-pressed="false"><span className="sh"><i></i>INDETERMINATE</span><p>Insufficient evidence for a defensible readiness conclusion.</p><span className="valid">A valid outcome</span></button>
    </div>
    <ul className="rules" aria-label="Rules this visual keeps">
      <li>Material conclusions connect to evidence, never to an AI or avatar.</li>
      <li>An authority gate acts before any consequential action.</li>
      <li>At least one disagreement or unresolved condition stays visible.</li>
      <li>No agent characters, chat bubbles, confidence scores or fake telemetry.</li>
      <li>Static and reduced-motion versions carry the same meaning.</li>
      <li>Desktop and mobile use the same primitives in the same causal order.</li>
    </ul>
  </div>
</section>

    </>
  )
}
