'use strict';

if (process.argv.length < 3) {
    console.error(`Usage  ${process.argv.slice(0, 2).join(' ')} payloadJSON`);
    process.exit(1);
}

const payload = JSON.parse(process.argv[2]);

(() => {
    console.log('Payload: ', payload);
})();