'use strict';

require('dotenv').config();

const AWS = require('aws-sdk');

const SQS = new AWS.SQS({ apiVersion: '2012-11-05' });


function receive() {
    return SQS.receiveMessage({
        QueueUrl: process.env.SQS_QUEUE_URL,
        MaxNumberOfMessages: 10,
        AttributeNames: ["All"],
        WaitTimeSeconds: 600
    }).promise();
}


(async() => {
    console.log('[+] Polling for messages');
    let messages = {};
    try {
        messages = await receive();
    } catch (err) {
        console.error('[-] An Error occured: ', err.message);
    }
    console.log('received messages: ', messages.Messages);
})();
