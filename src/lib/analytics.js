import posthog from 'posthog-js';

let initialized = false;

export function initPostHog() {
  if (initialized) return;
  if (typeof window === 'undefined') return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;

  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    capture_pageview: false, // static export — pageviews fired manually on route change
    capture_pageleave: true,
  });
  window.posthog = posthog; // npm bundle doesn't expose a console handle by default
  if (new URLSearchParams(window.location.search).has('no_track')) {
    posthog.opt_out_capturing(); // visit any page with ?no_track=1 to opt a device out permanently
  }
  initialized = true;
}

export function capture(event, properties) {
  initPostHog();
  if (!initialized) return;
  posthog.capture(event, properties);
}
