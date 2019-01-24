import test from 'ava';

import stackt from '../index';

test.beforeEach((assert) => {
  process.env.NODE_ENV = 'production'
});

test.afterEach((assert) => {
  assert.is(process.env.NODE_ENV, 'production');
});

test('null input', t => {
  const stack = stackt(null);
  t.is(stack, null);
});

test('undefined input', t => {
  const stack = stackt();
  t.is(stack, undefined);
});

test('array:true,compact:true', t => {
  const error = new Error('Hello World');
  const stack = stackt(error.stack, { array: true, compact: true });
  t.log(`${t.title} example\n${JSON.stringify(stack, null, 2)}`);
  t.snapshot(stack);
});

test('compact:true', t => {
  const error = new Error('Hello World');
  const stack = stackt(error.stack, { compact: true });
  t.log(`${t.title} example\n${JSON.stringify(stack, null, 2)}`);
  t.snapshot(stack);
});

test('default behavior', t => {
  const error = new Error('Hello World');
  const stack = stackt(error.stack);
  t.log(`${t.title} example\n${JSON.stringify(stack, null, 2)}`);
  t.snapshot(stack);
});

test('array:true,multi-line', t => {
  let stack;
  try {
    const method = () => {
      throw new Error('Hello World');
    }
    method();
  } catch (error) {
    stack = stackt(error.stack, { array: true });
  }
  t.log(`${t.title} example\n${JSON.stringify(stack, null, 2)}`);
  t.snapshot(stack);
});

test('stack sample 1', async t => {
  const fs = require('fs')
  , util = require('util')
  const sample = await util.promisify(fs.readFile)('./test/index.test/stack_sample_1.txt', 'utf8');
  const stack = stackt(sample, { array: true, compact: true });
  t.log(`${t.title} example\n${JSON.stringify(stack, null, 2)}`);
  t.snapshot(stack);
});

