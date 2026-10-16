import React from 'react'
import { Link } from 'react-router-dom'
import { HeadMeta } from '@/components/seo/HeadMeta'

export function NotFound() {
  return (
    <>
      <HeadMeta title="Page not found | Zuvvix" />
      
<section className="pg" id="top">
  <div className="wrap">
    <p className="eyebrow">404</p>
    <h1 className="h1">This page is not here.</h1>
    <p className="lede">The address may have changed, or the page may not exist yet. Start from one of these instead.</p>
    <div className="cta-row">
      <a className="btn btn-primary" href="/">Go to the homepage</a>
      <a className="btn btn-quiet" href="/thinking/">Read Zuvvix Thinking</a>
    </div>
  </div>
</section>

    </>
  )
}
