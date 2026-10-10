import test from 'node:test';
import assert from 'node:assert/strict';
import {createApp} from '../src/app.mjs';
test('health y catálogo REST', async()=>{
  const server=createApp().listen(0);
  try {
    const port=server.address().port;
    const health=await fetch(`http://127.0.0.1:${port}/api/health`);
    assert.equal(health.status,200);assert.equal((await health.json()).ok,true);
    const stacks=await fetch(`http://127.0.0.1:${port}/api/stacks`);
    const {data}=await stacks.json();assert.ok(data.some(t=>t.id==='react'));assert.ok(data.some(t=>t.id==='php'));
    const fail=await fetch(`http://127.0.0.1:${port}/api/nope`);
    assert.equal(fail.status,404);
  } finally {await new Promise(resolve=>server.close(resolve));}
});
