const accountSid = 'AC92a9edf66e5772b78601d0a060beda57';
const authToken = '5c81c6f815aaee25f58b16f00b822ea6';
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'Hello from Node.js Server',
        from: '+12762548738',
        to: '+923238915443'
    })
    .then(message => console.log(message.sid));