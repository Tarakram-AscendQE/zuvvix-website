import React from 'react'
import { Link } from 'react-router-dom'
import { HeadMeta } from '@/components/seo/HeadMeta'

export function Privacy() {
  return (
    <>
      <HeadMeta
        title="Privacy | Zuvvix"
        description="Zuvvix privacy notice."
        canonicalPath="/privacy/"
      />
      
<section className="pg" id="top">
  <div className="wrap">
    <p className="eyebrow">Privacy</p>
    <h1 className="h1">Privacy notice</h1>
    <p className="lede">Zuvvix collects as little as possible. This page explains what this website collects, why, and how to reach us about it.</p>
    <div className="legal">
      <p className="upd">Last updated: 30 September 2026</p>
      <div><h2>What we collect</h2>
        <p>This website collects personal information only when you submit a form:</p>
        <ul>
          <li><b>Follow the build:</b> your work email address.</li>
          <li><b>Design-partnership conversation:</b> your name, work email, company, role, the business journey you describe and any optional context you choose to add.</li>
        </ul>
      </div>
      <div><h2>Why we use it</h2>
        <p>We use your email address to send Zuvvix Thinking updates: essays, build notes and evidence notes. We use design-partnership details only to respond to your request and arrange a conversation. We do not sell your information, and we do not add you to unrelated marketing.</p>
      </div>
      <div><h2>Cookies, analytics and third parties</h2>
        <p>This website sets no advertising or analytics cookies and runs no tracking scripts. Fonts are served from this website, not from a third party. Form submissions are received and stored by our hosting provider, Netlify, on our behalf.</p>
      </div>
      <div><h2>How long we keep it</h2>
        <p>We keep form submissions only as long as needed for the purpose above. You can unsubscribe from updates at any time, and we delete your details on request.</p>
      </div>
      <div><h2>Your choices</h2>
        <p>You can ask to see, correct or delete the information you have given us, or withdraw your consent to updates. Write to <a href="mailto:hello@zuvvix.com">hello@zuvvix.com</a> and we will respond promptly.</p>
      </div>
      <div><h2>Changes</h2>
        <p>If we change how this website handles personal information, we will update this page and its date.</p>
      </div>
    </div>
  </div>
</section>

    </>
  )
}
