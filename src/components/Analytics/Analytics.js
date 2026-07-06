'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initPostHog, capture } from '@/lib/analytics';

// Reads window.location.search instead of useSearchParams() so no Suspense
// boundary is needed — a deferred mount would let page-level events (e.g.
// case_study_opened) fire before $pageview, breaking strict-order funnels
// for visitors landing directly on a case study.
export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    initPostHog();
  }, []);

  useEffect(() => {
    if (!pathname) return;
    capture('$pageview', {
      $current_url: window.origin + pathname + window.location.search,
    });
  }, [pathname]);

  return null;
}
