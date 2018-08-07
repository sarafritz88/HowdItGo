Web app that is meant to help business owners and managers easily get reviews from their customers and track how their review links are doing.

This project was built with React, Node.js, Express.js, and Firebase.

— to run this. You need to $ npm start in the root directory and cd into react-ui and $ npm start there as well to start the react server as well as the Node server

*Sign Up Page*

Initially you are brought to a screen where you can either Sign up or Sign In.

![Signup](./assets/signup.png?raw=true "Signup Page")

*Settings Page*

After Signing in or Signing up, you are taken to the settings page where you can enter some basic information and create your message to your customers.

![Settings](./assets/settings.png?raw=true "Settings Page")

*Invite Page*

After editing your settings, you can enter your customers information to send them a text message. The number is validated and then sent over using Twilio.

![Invite](./assets/invite.png?raw=true "Invite Page")

*Text Message*

The information from the settings page is pulled and then sent as a text message.

![Message](./assets/message.png?raw=true "Message Page")

*Stats Page*

View the stats of who clicked the link and who didn't.

![Stats](./assets/stats.png?raw=true "Stats Page")
