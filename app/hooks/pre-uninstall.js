/* eslint-disable */
require('@abtnode/util/lib/error-handler');

console.log('##################################');
console.log('### This is pre uninstall hook ###');
console.log('##################################');

throw new Error("pre uninstall hook failure won't block the uninstall");
