'use client';

import { useEffect, useRef } from 'react';

const MILESTONES = [25, 50, 75, 100];

export default function useScrollMilestones(onMilestone) {
  const fired = useRef(new Set());
  const callbackRef = useRef(onMilestone);
  callbackRef.current = onMilestone;

  useEffect(() => {
    const check = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      if (!scrollHeight) return;
      const depth = ((window.scrollY + window.innerHeight) / scrollHeight) * 100;

      for (const milestone of MILESTONES) {
        if (depth >= milestone && !fired.current.has(milestone)) {
          fired.current.add(milestone);
          callbackRef.current(milestone);
        }
      }
    };

    check(); // short pages can already be past thresholds on mount
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);
}
