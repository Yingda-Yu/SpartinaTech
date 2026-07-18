import { execSync } from 'child_process';

const output = execSync('npx vercel@latest api /v2/user', { encoding: 'utf8', cwd: process.cwd() });
console.log('User info:', output);
