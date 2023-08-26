/* eslint-disable */
require('@blocklet/sdk/lib/error-handler');

console.log('#################################');
console.log('### This is pre config hook ###');
console.log('#################################');

console.log('process.env.SECURE_ENV1', process.env.SECURE_ENV1);
console.log('process.env.SECURE_ENV2', process.env.SECURE_ENV2);
if (process.env.SECURE_ENV1 === '1') {
  throw new Error('error from SECURE_ENV1');
}

if (!['yes', 'no'].includes(process.env.ONLY_YES_OR_NO)) {
  console.error('ONLY_YES_OR_NO can only be yes or no');
  process.exit(1);
}
