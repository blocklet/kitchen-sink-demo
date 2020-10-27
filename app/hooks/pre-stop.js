/* eslint-disable */
require('@abtnode/util/lib/error-handler');

console.log('#############################');
console.log('### This is pre stop hook ###');
console.log('#############################');

if (new Date().getMinutes() % 2 == 0) {
  console.error('Kitchen Sink Blocklet can only stop in odd minutes');
  process.exit(1);
}
