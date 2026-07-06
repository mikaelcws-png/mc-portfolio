'use client';

import { useEffect } from 'react';
import { capture } from '@/lib/analytics';
import useScrollMilestones from '@/hooks/useScrollMilestones';

export default function CaseStudyTracker({ caseStudy }) {
  useEffect(() => {
    capture('case_study_opened', { case_study: caseStudy });
  }, [caseStudy]);

  useScrollMilestones((depth) => {
    capture('scroll_milestone', { depth, case_study: caseStudy });
  });

  return null;
}
