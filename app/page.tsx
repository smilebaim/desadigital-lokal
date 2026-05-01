'use client';

import { useState, useEffect } from 'react';
import DashboardClient from './DashboardClient';

export default function Page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <DashboardClient />;
}
