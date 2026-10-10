import { spawnSync } from 'node:child_process';
const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const packages = ['bootstrap@^5.3.8', 'bootstrap-icons@^1.13.1'];
const result = spawnSync(command, ['install', ...packages, '--workspace', '@atlas/web'], { stdio:'inherit', shell: process.platform === 'win32' });
if (result.error) { console.error(result.error.message); process.exit(1); }
process.exit(result.status ?? 1);
