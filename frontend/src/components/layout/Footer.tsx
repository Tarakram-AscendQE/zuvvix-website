import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export function Footer() {
  const location = useLocation()

  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <img
              src="/assets/img/zuvvix-logo-white.png"
              alt="Zuvvix"
              width="122"
              height="26"
            />
            <p className="tagline">Enterprise quality, operated.</p>
          </div>
          <div>
            <h4>Idea &amp; Category</h4>
            <ul>
              <li>
                <Link to="/category/">Why Zuvvix</Link>
              </li>
              <li>
                <Link to="/category/#definition">The category</Link>
              </li>
              <li>
                <Link to="/#problem">The problem</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>System</h4>
            <ul>
              <li>
                <Link to="/how-it-works/">How Zuvvix works</Link>
              </li>
              <li>
                <Link to="/quality-mandate/">Quality Mandate</Link>
              </li>
              <li>
                <Link to="/assurance-case/">Assurance Case</Link>
              </li>
              <li>
                <Link to="/readiness/">Readiness states</Link>
              </li>
              <li>
                <Link to="/trust/">Trust &amp; Authority</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Capability &amp; Evidence</h4>
            <ul>
              <li>
                <Link to="/continuous-release-assurance/">
                  Continuous Release Assurance
                </Link>
              </li>
              <li>
                <Link to="/#evidence">Evidence</Link>
              </li>
              <li>
                <Link to="/thinking/">Thinking</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li>
                <Link to="/design-partnership/">Design partnership</Link>
              </li>
              <li>
                <Link
                  to="/thinking/#follow"
                  onClick={() => {
                    if (location.pathname.startsWith('/thinking')) {
                      const el = document.getElementById('follow')
                      if (el) el.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                >
                  Follow the build
                </Link>
              </li>
              <li>
                <Link to="/privacy/">Privacy</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-base">
          <p>
            Zuvvix is in active build. Visualizations show the designed operating model unless labeled otherwise. Performance and customer-outcome claims will be published only after measurement, with scope and permission.
          </p>
          <span>© 2026 Zuvvix</span>
        </div>
      </div>
    </footer>
  )
}

