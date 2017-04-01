var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: '1nbboCPz5H9x10iA2mqe0VRGt',
  consumer_secret: 'WEMJYdpDbnJiRyG6ucKcSkXfCB3w3wWzkuLjwCGaWMS7ZDcGSx',
  access_token_key: '68863258-5hcRQmbRkJAyHBrBjRs8ZDVvVUUuvVHarcMe1VXhA',
  access_token_secret: 'myXPJMkCVqEhTzjp72cNpagKFGwpujdSWIeXgrmkJSsxM'
});
 
var params = ('vmotto', 20);
client.get('search/tweets', {q: params}, function(error, tweets, response) {
  if (error) {
    console.log("Error: " + error);
  }
  else{
  	console.log(tweets);
  }
});

// console.log('this is loaded');



