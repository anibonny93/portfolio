import type { NextConfig } from 'next';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants';
export default function config(phase:string):NextConfig { return { distDir:phase===PHASE_DEVELOPMENT_SERVER?'.next-dev':'.next', output: 'export', trailingSlash: true, basePath: process.env.NEXT_PUBLIC_BASE_PATH || '', images: { unoptimized: true }, poweredByHeader: false }; }
