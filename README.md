# design-jobs-bot

To set up the bot, get your api keys from Twitter and set up your config.js file like below:  

```
module.exports = {
	consumer_key: "...",
	consumer_secret: "...",
	access_token: "...",
	access_token_secret: "...",
};
```  

Also get your generate a bearer token and add it to the bearer_token.js file like below:  

```
module.exports = {
	token:
		"...",
};
```  

Run the command  

```
Node index 
```  

to run the bot from your terminal.
