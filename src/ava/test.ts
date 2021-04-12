import test from 'ava';
import * as mm from '../matchmaker';

test('mr', t => {

  let mNumber = mm.mr(/^(\d*)(.*)/s, 'number');

  t.like(mNumber('10'), { rest: '', acc: { tpe: 'number', value: '10' }});
  
});
