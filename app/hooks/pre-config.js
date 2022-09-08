/* eslint-disable */
require('@blocklet/sdk/lib/error-handler');

console.log('#################################');
console.log('### This is pre config hook ###');
console.log('#################################');

if (!['yes', 'no'].includes(process.env.ONLY_YES_OR_NO)) {
  console.error('ONLY_YES_OR_NO can only be yes or no');
  process.exit(1);
}
