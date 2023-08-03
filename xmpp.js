const xmpp = require('xmpp-server');

const server = xmpp({
  port: 5222, // XMPP port
  domain: 'localhost', // Change this to your desired domain
  path: '/xmpp', // XMPP server path
});

server.on('connection', (client) => {
  console.log('New XMPP client connected:', client.jid.toString());

  client.on('stanza', (stanza) => {
    console.log('Received stanza:', stanza.toString());
  });

  client.on('online', (jid) => {
    console.log('Online:', jid.toString());
  });

  client.on('offline', (jid) => {
    console.log('Offline:', jid.toString());
  });
});

server.on('listening', () => {
  console.log('XMPP server is listening on port 5222');
});
const jid = 'user@localhost'; // Change this to your desired XMPP user JID
const password = 'password'; // Change this to your desired XMPP user password
const xmppServer = 'localhost'; // Change this to the hostname of your XMPP server
const xmppPort = 5222; // XMPP server port

const connection = new Strophe.Connection(`ws://${xmppServer}:${xmppPort}/xmpp`);

connection.connect(jid, password, onConnect);

function onConnect(status) {
  if (status === Strophe.Status.CONNECTED) {
    console.log('Connected as:', jid);

    // Send a message to another XMPP user
    const message = Strophe.xmlElement('message', {
      to: 'receiver@localhost',
      type: 'chat'
    });
    const body = Strophe.xmlElement('body');
    body.textContent = 'Hello, this is a test message!';
    message.appendChild(body);

    connection.send(message);
  } else if (status === Strophe.Status.DISCONNECTED) {
    console.log('Disconnected');
  }
}
