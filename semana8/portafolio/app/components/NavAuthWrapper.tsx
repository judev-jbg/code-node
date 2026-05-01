'use client';

import dynamic from 'next/dynamic';

const NavAuth = dynamic(() => import('./NavAuth'), { ssr: false });

export default function NavAuthWrapper() {
  return <NavAuth />;
}
