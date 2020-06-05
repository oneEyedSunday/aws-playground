'use strict';

require('dotenv').config();

const AWS = require('aws-sdk');

const SQS = new AWS.SQS({ apiVersion: '2012-11-05' });

// SQS.listQueues().promise()
//     .then(console.log)
//     .catch(console.error);

function sendMessage(message) {
    return SQS.sendMessage({
        // DelaySeconds: 10,
        // MessageAttributes: {
        //   "Title": {
        //     DataType: "String",
        //     StringValue: "The Whistler"
        //   },
        //   "Author": {
        //     DataType: "String",
        //     StringValue: "John Grisham"
        //   },
        //   "WeeksOn": {
        //     DataType: "Number",
        //     StringValue: "6"
        //   }
        // },
        MessageBody: JSON.stringify(message),
        // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
        // MessageGroupId: "Group1",  // Required for FIFO queues
        QueueUrl: process.env.SQS_QUEUE_URL
    }).promise();
}

function sendFifoMessage(message) {
    return SQS.sendMessage({
        // DelaySeconds: 10,
        // MessageAttributes: {
        //   "Title": {
        //     DataType: "String",
        //     StringValue: "The Whistler"
        //   },
        //   "Author": {
        //     DataType: "String",
        //     StringValue: "John Grisham"
        //   },
        //   "WeeksOn": {
        //     DataType: "Number",
        //     StringValue: "6"
        //   }
        // },
        MessageBody: JSON.stringify(message),
        MessageDeduplicationId: Date.now().toString(),  // Required for FIFO queues
        MessageGroupId: "testGroup",  // Required for FIFO queues
        QueueUrl: process.env.SQS_FIFO_QUEUE_URL
    }).promise();
}

if (process.argv.length < 3) {
    console.error(`Usage  ${process.argv.slice(0, 2).join(' ')} payloadJSON`);
    process.exit(1);
}

const payload = JSON.parse(process.argv[2]);

(async () => {
    console.log('Payload: ', payload);
    console.log('[+] Attempting to send message');
    await sendFifoMessage(payload);
    await sendMessage(payload);
    console.log('[+] Successfully sent message');
})();

