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
  initialized = true;
}

export function capture(event, properties) {
  initPostHog();
  if (!initialized) return;
  posthog.capture(event, properties);
}
