require('dotenv').config();
const cors = require('cors');
const twilio = require('twilio');
const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const PORT = process.env.PORT || 5000;
// const accountSid = process.env.TWILIO_TEST_ACCOUNT_SID;
// const authToken = process.env.TWILIO_TEST_AUTHTOKEN;
// const client = new twilio(accountSid, authToken);

const baseURL = 'https://howd-it-go.firebaseio.com';
const axios = require('axios');
const firebase = require('firebase');
const admin = require('firebase-admin');

//const serviceAccount = require('./service-account-key.json');
// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(
      `Node cluster worker ${
        worker.process.pid
      } exited: code ${code}, signal ${signal}`
    );
  });
} else {
  admin.initializeApp({
    databaseURL: 'https://howd-it-go.firebaseio.com',
    credential: admin.credential.cert({
      project_id: 'howd-it-go',
      client_email:
        'firebase-adminsdk-m7t57@howd-it-go.iam.gserviceaccount.com',
      private_key:
        '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCMclAgHG3P/okD\nEpyA3o9ml46nnE+uZlvCfdtCulplq+zv472xfjQIsLcVPvETYeCGbppb5B0eWjlx\ndRDKssi3P0SfJQGT6SSe+dUB3UlO2xpzhg7C34VGusVp+NA5/Or+AcN7R4db2iKx\nlUZG/lNo9eMDRur6uuxhwzzf47+f+Eqj1LG7qwXZOBqlWKO/mA+0yYhUybj60/Ko\neFVQLqBgw4CSQjVwsTyxExP7AV4fZp+NiPzDqbIhRefS238EBgHCWUQpCUjjhexo\n7zq4sDW3Pn6HbwpMrBOTUsqJuY5V2NnQ/IcjSMfdtkzUiSbpYESZGZX04GLZiZXQ\naxTpvli5AgMBAAECggEAQKGOa+iJRFE/HfHfoZJJ7Y1LMajGJlymV29xiliVpvoi\nVBa6wcZxDZq89gL8D85X86VMVYM5PzGIA8U6j/0MTv/HhXETM8zzdFFGC9CYnrhH\niOglPNp9y5nBpU3CDR1tyqxnGAFHsiZFFvG54IvDOKcG7AgjtHR2uVqOVf3JvkRn\nF5odKeWVNKpQsgudWc7OUQF3Ogtle3ASCkeupiczeQHlv3k5LOMQAn5JUddMXCKa\nQTHOO9WcRdcKSPgFtBmF56zMAy2JC75uBMM1ozmTCnNXk+hAWswTFZw7xObhRCml\nY9zLy5I3MtJ5bAGjJsseSldd/G9V8IiOVP/FkHeNzQKBgQC+ZxlQy/Ye2p0srV9U\n4QPk4K1sZyy9Yf+iqEsYR0COtweikcF8HG/5lE5tIUnAl8dvyR3XupJnOPdJvVXo\nj3JvVwb6DGD3Kx+sbeGVB4DX+t5P7FuxaWDmP/Tq8SMMoFcvQwpVHzDY/NLRTQp2\ncOoBFIK0Cf5NnFygFnPoG8uDHwKBgQC81T2D9Yx9CnnY8KD5mbYlJJkfm5fx2pEf\niaov/VySzY0xHd9sQzMnyJ7lrht8zbOw7XnkzqiWMfu4In1J9RaMDSD5kPXMhv5C\n36JPB+rJW/7sH3hBIxainJ5QT8cijeaP/6VYRRSF045igpI2EKFXZMuB6FNOSk2K\nDjhPTr3BJwKBgQCo/aqbapukoNW1jJ87H4esQbnKp/wujmcsv//+qWbkBBETuhgn\nhrnfo0DEXTIvbMcHMVJ6YU6FrSrWWOSBx6eCqJQ5pHj/h1fSW6hG9GTnzPI5r4dm\nfCgT1BoV2DYKg9k9ylvGVyusuyCFwcISg389vC2Ri/kYezo+oA75qInFcwKBgQCn\n6WY+BQbb2Yjn43EBAjH5bUXL2WuPYC9Tv/JZog3DbIx0dH/LoSXH5pmE2wEORUvX\ntBOD5k/63o9a+TA3p3xZJQOBZ+lp6VAG3x1Q8VVRoEBabtFb+nuSNXqBJ6+Hhm7S\n9RxuFV9ecPRXnIuvD7KoJ7Te21vYbjHs5SAlRXtuWQKBgAFlduD5oEiERloWHrIG\nfs7HeDe0919J630rKozs4QrQyC76w+mjlroNYqTIVa6RXA/Gb8OuUmOgaosB/TMD\nu4mEitZ51TtFQCQd6BqJkPKJm5qMOa2jHR58fw1nUyFv+yadCqAzUg9jFAPIIVaK\nuxMivRD1Mdrsch6T50tzznLA\n-----END PRIVATE KEY-----\n'
    })
  });
  const db = admin.database();
  const ref = db.ref(`/`);
  const app = express();
  app.use(cors());
  app.use(express.json());
  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

  // Answer API requests.
  app.get('/api', (req, res) => {
    res.send({ message: 'Hello from the custom server!' });
  });

  app.patch('/users/:username', (req, res) => {
    const { username } = req.params;
    const { email, password } = req.body;
    const usersRef = ref.child('users');
    usersRef.child(`${username}`).set(
      {
        details: {
          email: email,
          password: password
        }
      },
      err => {
        if (!err) res.send({ success: 'true' });
      }
    );
  });

  // app.post('/message-user', (req, res) => {
  //   const message = req.body;
  //   client.messages
  //     .create({
  //       body: message.text,
  //       to: '+18569744731', // Text this number
  //       from: '+15612796790' // From a valid Twilio number
  //     })
  //     .then(response => res.json(response))
  //     .catch(err => res.json(err));
  // });

  app.post(`${baseURL}/users.json`, (req, res) => {
    axios.get;
    const email = req.body.email;
    const password = req.body.passwordOne;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(err => console.log(err.code, err.message));
  });

  app.post(`${baseURL}/users.json`);
  // app.post('/users/:dbname/name.json', (req, res) => {
  //   const username = req.body;
  //   firebase.
  // })
  // app.post('/signin', (req, res) => {
  //   const { email, password } = req.body;
  //   firebase
  //     .auth()
  //     .signInWithEmailAndPassword(email, password)
  //     .catch(err => console.log(err.code, err.message));
  // });
  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(
      path.resolve(__dirname, '../react-ui/build', 'index.html')
    );
  });

  app.listen(PORT, function() {
    console.error(
      `Node cluster worker ${process.pid}: listening on port ${PORT}`
    );
  });
}
