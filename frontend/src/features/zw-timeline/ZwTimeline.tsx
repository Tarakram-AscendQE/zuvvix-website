import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useZwSequencer } from './useZwSequencer'
import { cn } from '@/utils/cn'

export function ZwTimeline() {
  const {
    step,
    running,
    paused,
    play,
    togglePause,
    replay,
    statusText,
    currentStage,
  } = useZwSequencer()

  const sigRef = useRef<HTMLDivElement>(null)
  const hasTriggeredRef = useRef(false)

  useEffect(() => {
    if (!sigRef.current || hasTriggeredRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true
          observer.disconnect()
          play()
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(sigRef.current)
    return () => observer.disconnect()
  }, [play])

  return (
    <div className="sig-frame" id="sig" ref={sigRef}>
      <div className="sig-bar">
        <span className="caption">
          Illustrative Zuvvix operating model — designed behavior.
        </span>
        <span className="sig-status" id="sigStatus" aria-live="polite">
          {statusText}
        </span>
        {running && (
          <button
            className="ctl"
            id="sigPause"
            type="button"
            aria-pressed={paused}
            onClick={togglePause}
          >
            <svg viewBox="0 0 12 12" aria-hidden="true" width="12" height="12">
              <path
                d="M3 2v8M9 2v8"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            <span>{paused ? 'Resume' : 'Pause'}</span>
          </button>
        )}
        <button className="ctl" id="sigReplay" type="button" onClick={replay}>
          <svg viewBox="0 0 12 12" aria-hidden="true" width="12" height="12">
            <path
              d="M10 6a4 4 0 1 1-1.2-2.85M10 1.5V4H7.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          <span>Replay</span>
        </button>
      </div>

      {/* Desktop SVG Visualization */}
      <div className="sig-canvas sig-desk">
        <svg
          id="zw"
          viewBox="0 0 1520 600"
          role="img"
          aria-labelledby="zw-t zw-d"
          className={cn(step > 0 && 'armed')}
        >
          <title id="zw-t">From Change to Evidence: Payment service v3.8</title>
          <desc id="zw-d">
            A payment service v3.8 change enters a Quality Mandate and attaches to Payment API...
          </desc>

          {/* s0 quiet field */}
          <rect
            className="bound"
            x="220"
            y="70"
            width="1110"
            height="500"
            rx="24"
          />
          <rect
            x="246"
            y="56"
            width="164"
            height="30"
            rx="15"
            fill="#101828"
          />
          <text
            x="328"
            y="75.5"
            textAnchor="middle"
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '.1em',
              fill: '#fff',
            }}
          >
            QUALITY MANDATE
          </text>
          <g className="t-lab">
            <text x="24" y="130">CHANGE</text>
            <text x="244" y="130">CONTEXT</text>
            <text x="560" y="130">IMPACT</text>
            <text x="770" y="130">ASSURE</text>
            <text x="1000" y="130">EVIDENCE</text>
            <text x="1356" y="130">READINESS</text>
          </g>
          <path
            className="ln"
            d="M368 224 H392 M306 252 V330 M454 252 V330 M368 358 H392"
          />
          <rect className="n" x="244" y="196" width="124" height="56" rx="12" />
          <text className="t-node" x="306" y="229" textAnchor="middle">
            Payment API
          </text>
          <rect className="n" x="392" y="196" width="124" height="56" rx="12" />
          <text className="t-node" x="454" y="229" textAnchor="middle">
            Order Service
          </text>
          <rect className="n" x="244" y="330" width="124" height="56" rx="12" />
          <text className="t-node" x="306" y="363" textAnchor="middle">
            Checkout UI
          </text>
          <rect className="n" x="392" y="330" width="124" height="56" rx="12" />
          <text className="t-node" x="454" y="363" textAnchor="middle">
            Finance Ledger
          </text>
          <g className="pre" style={{ opacity: step >= 9 ? 0 : 1 }}>
            <rect
              x="1356"
              y="230"
              width="148"
              height="150"
              rx="14"
              fill="#fff"
              stroke="#98A2B3"
              strokeWidth="1.5"
              strokeDasharray="5 5"
            />
            <text
              x="1430"
              y="300"
              textAnchor="middle"
              style={{ fontSize: '13px', fontWeight: 600, fill: '#667085' }}
            >
              No position yet
            </text>
            <text
              x="1430"
              y="320"
              textAnchor="middle"
              style={{ fontSize: '12px', fill: '#98A2B3' }}
            >
              awaits evidence
            </text>
          </g>

          {/* s1 change */}
          <g
            className={cn('s', step >= 1 && 'on')}
            role="img"
            aria-label="Change: Payment service v3.8"
          >
            <rect
              x="24"
              y="186"
              width="160"
              height="76"
              rx="14"
              fill="#2D5BFF"
            />
            <text
              x="104"
              y="219"
              textAnchor="middle"
              style={{ fontSize: '14px', fontWeight: 600, fill: '#fff' }}
            >
              Payment service
            </text>
            <text
              x="104"
              y="240"
              textAnchor="middle"
              style={{ fontSize: '12.5px', fill: '#DCE4FF' }}
            >
              v3.8 change
            </text>
            <path className="ln-on" d="M184 224 H236" />
            <path d="M244 224 l-10 -6 v12 z" fill="#2D5BFF" />
            <rect
              className="n-on"
              x="244"
              y="196"
              width="124"
              height="56"
              rx="12"
            />
            <text
              className="t-sub"
              x="306"
              y="276"
              textAnchor="middle"
              style={{ fill: '#1F45D6' }}
            >
              changed
            </text>
          </g>

          {/* s2 dependencies */}
          <g
            className={cn('s', step >= 2 && 'on')}
            role="img"
            aria-label="Implicated dependencies"
          >
            <path
              className="ln-on"
              d="M368 224 H392 M306 282 V330 M454 252 V330"
            />
            <rect
              x="392"
              y="196"
              width="124"
              height="56"
              rx="12"
              fill="none"
              stroke="#2D5BFF"
              strokeWidth="1.5"
            />
            <rect
              x="244"
              y="330"
              width="124"
              height="56"
              rx="12"
              fill="none"
              stroke="#2D5BFF"
              strokeWidth="1.5"
            />
            <rect
              x="392"
              y="330"
              width="124"
              height="56"
              rx="12"
              fill="none"
              stroke="#2D5BFF"
              strokeWidth="1.5"
            />
          </g>

          {/* s3 context */}
          <g
            className={cn('s', step >= 3 && 'on')}
            role="img"
            aria-label="Sourced context"
          >
            <rect
              x="244"
              y="420"
              width="272"
              height="122"
              rx="10"
              fill="#fff"
              stroke="#D0D5DD"
              strokeWidth="1.5"
            />
            <text className="t-lab" x="262" y="446" style={{ fontSize: '10.5px' }}>
              SOURCED CONTEXT
            </text>
            <text x="262" y="472" style={{ fontSize: '12.5px' }}>
              Refund allocation rule{' '}
              <tspan style={{ fill: '#667085' }}>· intended</tspan>
            </text>
            <text x="262" y="496" style={{ fontSize: '12.5px' }}>
              API contract v3.8{' '}
              <tspan style={{ fill: '#667085' }}>· implemented</tspan>
            </text>
            <text x="262" y="520" style={{ fontSize: '12.5px' }}>
              Sandbox callback differs{' '}
              <tspan style={{ fill: '#B54708' }}>· observed</tspan>
            </text>
            <circle
              cx="498"
              cy="516"
              r="6"
              fill="#FFF7ED"
              stroke="#B54708"
              strokeWidth="2"
            />
          </g>

          {/* s4 impact */}
          <g
            className={cn('s', step >= 4 && 'on')}
            role="img"
            aria-label="Impact hypothesis"
          >
            <path className="ln-on" d="M454 290 H584" />
            <path d="M592 290 l-10 -6 v12 z" fill="#2D5BFF" />
            <polygon
              points="640,242 688,290 640,338 592,290"
              fill="#fff"
              stroke="#2D5BFF"
              strokeWidth="2.5"
            />
            <text
              x="640"
              y="288"
              textAnchor="middle"
              style={{ fontSize: '12px', fontWeight: 700 }}
            >
              IMPACT
            </text>
            <text
              x="640"
              y="304"
              textAnchor="middle"
              style={{ fontSize: '10.5px', fill: '#667085' }}
            >
              hypothesis
            </text>
            <rect
              x="560"
              y="356"
              width="164"
              height="68"
              rx="8"
              fill="#fff"
              stroke="#D0D5DD"
              strokeWidth="1.2"
            />
            <text x="574" y="378" style={{ fontSize: '12px' }}>
              Partial refund may
            </text>
            <text x="574" y="395" style={{ fontSize: '12px' }}>
              allocate incorrectly
            </text>
            <text x="574" y="412" style={{ fontSize: '12px' }}>
              downstream
            </text>
          </g>
          <g
            className={cn('s', step >= 4 && 'on', step >= 5 && 'dim')}
            role="img"
            aria-label="Low-materiality hypothesis set aside"
          >
            <polygon
              points="640,146 664,170 640,194 616,170"
              fill="#fff"
              stroke="#98A2B3"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
            <text x="674" y="166" style={{ fontSize: '11px', fill: '#667085' }}>
              Checkout copy
            </text>
            <text x="674" y="181" style={{ fontSize: '11px', fill: '#98A2B3' }}>
              low materiality
            </text>
          </g>

          {/* s5 assure + authority */}
          <g
            className={cn('s', step >= 5 && 'on')}
            role="img"
            aria-label="Qualified assurance"
          >
            <g>
              <rect
                x="770"
                y="166"
                width="176"
                height="52"
                rx="26"
                fill="#EFF4FF"
                stroke="#2D5BFF"
                strokeWidth="1.8"
              />
              <text
                x="858"
                y="189"
                textAnchor="middle"
                style={{ fontSize: '13px', fontWeight: 600 }}
              >
                API Contract
              </text>
              <text
                x="858"
                y="206"
                textAnchor="middle"
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '9.5px',
                  letterSpacing: '.08em',
                  fill: '#1F45D6',
                }}
              >
                ✓ QUALIFIED
              </text>

              <rect
                x="770"
                y="246"
                width="176"
                height="52"
                rx="26"
                fill="#EFF4FF"
                stroke="#2D5BFF"
                strokeWidth="1.8"
              />
              <text
                x="858"
                y="269"
                textAnchor="middle"
                style={{ fontSize: '13px', fontWeight: 600 }}
              >
                Journey Validation
              </text>
              <text
                x="858"
                y="286"
                textAnchor="middle"
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '9.5px',
                  letterSpacing: '.08em',
                  fill: '#1F45D6',
                }}
              >
                ✓ QUALIFIED
              </text>

              <rect
                x="770"
                y="326"
                width="176"
                height="52"
                rx="26"
                fill="#EFF4FF"
                stroke="#2D5BFF"
                strokeWidth="1.8"
              />
              <text
                x="858"
                y="349"
                textAnchor="middle"
                style={{ fontSize: '13px', fontWeight: 600 }}
              >
                Reconciliation
              </text>
              <text
                x="858"
                y="366"
                textAnchor="middle"
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '9.5px',
                  letterSpacing: '.08em',
                  fill: '#1F45D6',
                }}
              >
                ✓ QUALIFIED
              </text>
            </g>
            <path
              className="ln-on"
              d="M688 290 C 730 290 730 272 770 272"
              style={{ strokeWidth: 1.5, opacity: 0.6 }}
            />
            <line
              x1="975"
              y1="150"
              x2="975"
              y2="480"
              stroke="#101828"
              strokeWidth="3"
            />
            <rect
              x="945"
              y="130"
              width="60"
              height="24"
              rx="12"
              fill="#101828"
            />
            <text
              x="975"
              y="146"
              textAnchor="middle"
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '9.5px',
                fontWeight: 600,
                letterSpacing: '.08em',
                fill: '#fff',
              }}
            >
              POLICY
            </text>
            <path
              className="ln-on"
              d="M946 192 H992 M946 272 H992 M946 352 H992"
              style={{ strokeWidth: 2 }}
            />
            <path
              d="M1000 192 l-9 -5 v10 z M1000 272 l-9 -5 v10 z M1000 352 l-9 -5 v10 z"
              fill="#2D5BFF"
            />
            <text
              x="985"
              y="174"
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '9px',
                letterSpacing: '.06em',
                fill: '#1F45D6',
              }}
            >
              PERMITTED
            </text>
            <path
              d="M790 440 H960"
              stroke="#B42318"
              strokeWidth="1.8"
              strokeDasharray="6 5"
              fill="none"
            />
            <g className="gate-x">
              <circle
                cx="975"
                cy="440"
                r="12"
                fill="#fff"
                stroke="#B42318"
                strokeWidth="2"
              />
              <path
                d="M969 434 l12 12 M981 434 l-12 12"
                stroke="#B42318"
                strokeWidth="2"
              />
            </g>
            <text
              x="790"
              y="428"
              style={{ fontSize: '12px', fill: '#B42318', fontWeight: 600 }}
            >
              Production change · BLOCKED
            </text>
            <text
              x="790"
              y="464"
              style={{ fontSize: '11.5px', fill: '#667085' }}
            >
              routed to customer authority
            </text>
          </g>

          {/* s6 evidence */}
          <g
            className={cn('s', step >= 6 && 'on')}
            role="img"
            aria-label="Evidence: API observation"
          >
            <rect
              x="1004"
              y="165"
              width="146"
              height="54"
              rx="8"
              fill="#fff"
              stroke="#D0D5DD"
              strokeWidth="1.5"
            />
            <text
              x="1016"
              y="183"
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '9px',
                letterSpacing: '.08em',
                fill: '#1F45D6',
              }}
            >
              SOURCE
            </text>
            <text
              x="1016"
              y="204"
              style={{ fontSize: '12.5px', fontWeight: 600 }}
            >
              API observation
            </text>
            <rect
              x="1004"
              y="245"
              width="146"
              height="54"
              rx="8"
              fill="#fff"
              stroke="#D0D5DD"
              strokeWidth="1.5"
            />
            <text
              x="1016"
              y="263"
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '9px',
                letterSpacing: '.08em',
                fill: '#1F45D6',
              }}
            >
              OBSERVATION
            </text>
            <text
              x="1016"
              y="284"
              style={{ fontSize: '12.5px', fontWeight: 600 }}
            >
              Journey trace
            </text>
            <rect
              x="1004"
              y="325"
              width="146"
              height="54"
              rx="8"
              fill="#F5F7FF"
              stroke="#D0D5DD"
              strokeWidth="1.5"
            />
            <text
              x="1016"
              y="343"
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '9px',
                letterSpacing: '.08em',
                fill: '#1F45D6',
              }}
            >
              RECONCILIATION
            </text>
            <text
              x="1016"
              y="364"
              style={{ fontSize: '12.5px', fontWeight: 600 }}
            >
              Independent check
            </text>
            <path
              d="M1140 170 V160 H1030 V165"
              stroke="#98A2B3"
              strokeWidth="1"
              fill="none"
              strokeDasharray="2 3"
            />
          </g>

          {/* s7 uncertainty */}
          <g
            className={cn('s', step >= 7 && 'on')}
            role="img"
            aria-label="Unresolved: sandbox callback fidelity"
          >
            <rect
              x="1004"
              y="405"
              width="146"
              height="60"
              rx="8"
              fill="#FFF7ED"
              stroke="#B54708"
              strokeWidth="1.8"
            />
            <text
              x="1016"
              y="425"
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '9.5px',
                fontWeight: 600,
                letterSpacing: '.08em',
                fill: '#B54708',
              }}
            >
              UNRESOLVED
            </text>
            <text
              x="1016"
              y="446"
              style={{ fontSize: '12.5px', fontWeight: 600 }}
            >
              Callback fidelity
            </text>
            <path
              d="M520 530 C 700 575 950 570 1004 462"
              stroke="#B54708"
              strokeWidth="1.2"
              strokeDasharray="3 5"
              fill="none"
              opacity=".7"
            />
          </g>

          {/* s8 assurance case */}
          <g
            className={cn('s', step >= 8 && 'on')}
            role="img"
            aria-label="Assurance Case"
          >
            <path
              d="M1150 192 H1170 M1150 272 H1170 M1150 352 H1170"
              stroke="#98A2B3"
              strokeWidth="1.2"
            />
            <path
              d="M1150 435 H1170"
              stroke="#B54708"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
            <rect
              x="1170"
              y="150"
              width="140"
              height="330"
              rx="12"
              fill="#fff"
              stroke="#101828"
              strokeWidth="1.8"
            />
            <text
              x="1186"
              y="178"
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '.09em',
                fill: '#101828',
              }}
            >
              ASSURANCE
            </text>
            <text
              x="1186"
              y="193"
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '.09em',
                fill: '#101828',
              }}
            >
              CASE
            </text>
            <line x1="1186" y1="208" x2="1294" y2="208" stroke="#E4E7EC" />
            <circle cx="1191" cy="234" r="4" fill="#2D5BFF" />
            <text x="1202" y="238" style={{ fontSize: '12px' }}>
              Change + scope
            </text>
            <circle cx="1191" cy="262" r="4" fill="#2D5BFF" />
            <text x="1202" y="266" style={{ fontSize: '12px' }}>
              3 evidence items
            </text>
            <circle
              cx="1191"
              cy="290"
              r="4"
              fill="#fff"
              stroke="#B54708"
              strokeWidth="2"
            />
            <text x="1202" y="294" style={{ fontSize: '12px' }}>
              1 exception
            </text>
            <line x1="1186" y1="318" x2="1294" y2="318" stroke="#E4E7EC" />
            <text x="1186" y="342" style={{ fontSize: '11px', fill: '#667085' }}>
              Release authority
            </text>
            <text x="1186" y="358" style={{ fontSize: '11px', fill: '#667085' }}>
              stays with customer
            </text>
          </g>

          {/* s9 readiness */}
          <g
            className={cn('s', step >= 9 && 'on')}
            role="img"
            aria-label="Readiness: Ready with exceptions"
          >
            <path className="ln-on" d="M1310 305 H1348" />
            <path d="M1356 305 l-10 -6 v12 z" fill="#2D5BFF" />
            <rect
              x="1356"
              y="230"
              width="148"
              height="150"
              rx="14"
              fill="#EFF4FF"
              stroke="#2D5BFF"
              strokeWidth="2.5"
            />
            <text
              x="1430"
              y="260"
              textAnchor="middle"
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '9.5px',
                letterSpacing: '.1em',
                fill: '#667085',
              }}
            >
              READINESS
            </text>
            <text
              x="1430"
              y="294"
              textAnchor="middle"
              style={{ fontSize: '17px', fontWeight: 700 }}
            >
              READY WITH
            </text>
            <text
              x="1430"
              y="316"
              textAnchor="middle"
              style={{ fontSize: '17px', fontWeight: 700 }}
            >
              EXCEPTIONS
            </text>
            <circle
              cx="1398"
              cy="349"
              r="5"
              fill="#fff"
              stroke="#B54708"
              strokeWidth="2"
            />
            <text
              x="1410"
              y="353"
              style={{ fontSize: '12px', fill: '#344054' }}
            >
              1 exception
            </text>
            <text
              x="1356"
              y="408"
              style={{ fontSize: '12px', fill: '#344054' }}
            >
              Sandbox callback fidelity
            </text>
            <text
              x="1356"
              y="424"
              style={{ fontSize: '12px', fill: '#344054' }}
            >
              not established.
            </text>
          </g>
        </svg>
      </div>

      {/* Mobile vertical causal spine */}
      <div className="sig-canvas sig-mob">
        <ol
          className={cn('spine', step > 0 && 'armed')}
          id="spine"
          aria-label="From Change to Evidence, in causal order"
        >
          <li className={cn(step >= 1 && 'on')}>
            <div className="st">CHANGE</div>
            <p className="mc">A relevant enterprise change enters the mandate.</p>
            <div className="obj">
              <span className="chip blue full">
                Payment service v3.8 <small>change enters the mandate</small>
              </span>
            </div>
          </li>
          <li className={cn(step >= 3 && 'on')}>
            <div className="st">CONTEXT</div>
            <p className="mc">
              Retrieve the business, system and operating context that applies.
            </p>
            <div className="obj">
              <span className="chip on">
                Payment API <small>changed</small>
              </span>
              <span className="chip on">Order Service</span>
              <span className="chip on">Checkout UI</span>
              <span className="chip on">Finance Ledger</span>
              <div className="claims">
                <span className="label" style={{ fontSize: '10px' }}>
                  Sourced context
                </span>
                <span>Refund allocation rule · intended</span>
                <span>API contract v3.8 · implemented</span>
                <span className="amb">Sandbox callback differs · observed</span>
              </div>
            </div>
          </li>
          <li className={cn(step >= 4 && 'on')}>
            <div className="st">IMPACT</div>
            <p className="mc">
              Identify what could be affected, and where knowledge is incomplete.
            </p>
            <div className="obj">
              <span className="chip on full">
                ◇ Partial refund may allocate incorrectly downstream
              </span>
            </div>
          </li>
          <li className={cn(step >= 5 && 'on')}>
            <div className="st">ASSURE</div>
            <p className="mc">
              Select and perform qualified assurance inside explicit authority.
            </p>
            <div className="obj">
              <span className="chip cap">
                API Contract <small>✓ QUALIFIED</small>
              </span>
              <span className="chip cap">
                Journey Validation <small>✓ QUALIFIED</small>
              </span>
              <span className="chip cap">
                Reconciliation <small>✓ QUALIFIED</small>
              </span>
              <span className="chip blocked full">
                ✕ Production change blocked · routed to customer authority
              </span>
            </div>
          </li>
          <li className={cn(step >= 7 && 'on')}>
            <div className="st">EVIDENCE</div>
            <p className="mc">
              Preserve observations, provenance, findings and limitations.
            </p>
            <div className="obj">
              <span className="chip">
                API observation <small>source</small>
              </span>
              <span className="chip">
                Journey trace <small>observation</small>
              </span>
              <span className="chip">
                Independent check <small>reconciliation</small>
              </span>
              <span className="chip amber full">
                UNRESOLVED{' '}
                <small style={{ color: '#B54708' }}>
                  sandbox callback fidelity
                </small>
              </span>
            </div>
          </li>
          <li className={cn(step >= 9 && 'on')}>
            <div className="st">READINESS</div>
            <p className="mc">Produce a defensible position.</p>
            <div className="obj">
              <div className="rcard">
                <b>READY WITH EXCEPTIONS</b>
                <span>1 unresolved condition retained in the Assurance Case</span>
              </div>
            </div>
          </li>
        </ol>
      </div>

      <ol className="stages" id="stages" aria-label="Stages">
        <li
          className={cn(
            currentStage === 0 && running && 'cur',
            currentStage >= 0 && 'done'
          )}
        >
          <div className="st">
            <i>1</i>CHANGE
          </div>
          <p>A relevant enterprise change enters the mandate.</p>
        </li>
        <li
          className={cn(
            currentStage === 1 && running && 'cur',
            currentStage >= 1 && 'done'
          )}
        >
          <div className="st">
            <i>2</i>CONTEXT
          </div>
          <p>Retrieve the business, system and operating context that applies.</p>
        </li>
        <li
          className={cn(
            currentStage === 2 && running && 'cur',
            currentStage >= 2 && 'done'
          )}
        >
          <div className="st">
            <i>3</i>IMPACT
          </div>
          <p>
            Identify what could be affected, and where knowledge is incomplete.
          </p>
        </li>
        <li
          className={cn(
            currentStage === 3 && running && 'cur',
            currentStage >= 3 && 'done'
          )}
        >
          <div className="st">
            <i>4</i>ASSURE
          </div>
          <p>Select and perform qualified assurance inside explicit authority.</p>
        </li>
        <li
          className={cn(
            currentStage === 4 && running && 'cur',
            currentStage >= 4 && 'done'
          )}
        >
          <div className="st">
            <i>5</i>EVIDENCE
          </div>
          <p>Preserve observations, provenance, findings and limitations.</p>
        </li>
        <li
          className={cn(
            currentStage === 5 && running && 'cur',
            currentStage >= 5 && 'done'
          )}
        >
          <div className="st">
            <i>6</i>READINESS
          </div>
          <p>Produce a defensible position.</p>
        </li>
      </ol>

      <div className="ready-note">
        <strong>READY WITH EXCEPTIONS</strong>
        <span className="ex">Sandbox callback fidelity not established.</span>
        <span style={{ color: 'var(--mid)', fontSize: '14px' }}>
          Other possible positions: Ready · Not ready · Indeterminate
        </span>
      </div>
    </div>
  )
}

