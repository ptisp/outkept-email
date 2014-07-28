var mongoClient = require('mongodb').MongoClient,
  mubsub = require('mubsub'),
  config = require('./conf/config'),
  emailjs = require('emailjs');

var email  = emailjs.server.connect({
  user: config.mail_user,
  password: config.mail_password,
  host: config.mail_host
});


mongoClient.connect('mongodb://' + config.mongo_host + ':' + config.mongo_port + '/' + config.mongo_database, function(err, conn) {
  if(err){
    console.log(err.message);
    throw new Error(err);
  } else {
    db = conn;
    var channel = mubsub(db).channel('pubsub');
    channel.on('error', console.error);
    main(channel);
  }
});


function main(mongopubsub) {
  mongopubsub.subscribe('events', function (event) {
    console.log(event);
    if(event.type == 'feed') {
      var message = '';

      email.send({
        text: message,
        from: config.mail_from,
        to: config.mail_to,
        subject: "Outkept reporting"
      }, function (err, message) {
        //console.log(err || message);
      });
    }
  });


  /*
  mongopubsub.subscribe('messages', function (message) {
    console.log(message);
  });
  */

  console.log('Notifier started.');
}
