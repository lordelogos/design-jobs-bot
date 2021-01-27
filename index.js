let Twit = require("twit");
let fs = require("fs");
let config = require("./config");
const axios = require("axios");
const bearer = require("./bearer_token");

console.log("bot is running");
let T = new Twit(config);

let uiDesign, productDesign, productDesign2, graphicDesign, graphicDesign2;

// For retweet mentions
let stream = T.stream("statuses/filter", { track: "@designjobsbot" });

const retweet = (arg) => {
	let id = { id: `${arg}` };
	let retweetCallback = (err, data, response) => {
		//do something after RT
	};

	T.post("statuses/retweet/:id", id, retweetCallback);
};

stream.on("tweet", function (tweet) {
	// mention function to run here
	axios
		.get(
			`https://api.twitter.com/2/tweets/${tweet.in_reply_to_status_id_str}`,
			{
				headers: {
					Authorization: `Bearer ${bearer.token}`,
				},
			}
		)
		.then((res) => {
			axios
				.get(
					`https://api.telegram.org/bot1627912531:AAFMTLWMWhaV4tknQeRihIozu6wFoqbLSHo/sendMessage?chat_id=1111509292&text=RT\n${res.data.data.text}`
				)
				.then((response) => {
					console.log("retweeted");
				})
				.catch((error) => {
					console.log(error);
				});
		})
		.catch(console.log);

	retweet(tweet.in_reply_to_status_id_str);
});

// For search and retweet
// UI design
const uiFetch = () => {
	let query = {
		q: "ui vacancy since:2020-12-01 -filter:replies -filter:videos",
		count: 20,
		lang: "en",
	};

	const search = (err, data, response) => {
		uiDesign = data;
	};

	return T.get("search/tweets", query, search);
};

// Product design
const productFetch = () => {
	let query = {
		q: "product design vacancy since:2020-12-01 -filter:replies -filter:videos",
		count: 20,
		lang: "en",
	};

	const search = (err, data, response) => {
		productDesign = data;
	};

	return T.get("search/tweets", query, search);
};

const productFetch2 = () => {
	let query = {
		q:
			"hiring for product design since:2020-12-01 -filter:replies -filter:videos",
		count: 20,
		lang: "en",
	};

	const search = (err, data, response) => {
		productDesign2 = data;
	};

	return T.get("search/tweets", query, search);
};

// Graphic design
const graphicFetch = () => {
	let query = {
		q: "graphic design vacancy since:2020-12-01 -filter:replies -filter:videos",
		count: 20,
		lang: "en",
	};

	const search = (err, data, response) => {
		graphicDesign = data;
	};

	return T.get("search/tweets", query, search);
};

const graphicFetch2 = () => {
	let query = {
		q:
			"hiring for graphic design since:2020-12-01 -filter:replies -filter:videos",
		count: 20,
		lang: "en",
	};

	const search = (err, data, response) => {
		graphicDesign2 = data;
	};

	return T.get("search/tweets", query, search);
};

// To make it run every hour
const getJobs = () => {
	uiFetch();
	productFetch();
	productFetch2();
	graphicFetch();
	graphicFetch2();
};

const displayJobs = () => {
	console.log("check twitter");
	// display a job every 10 seconds
	uiDesign.statuses.map((ui) =>
		setTimeout(function () {
			retweet(ui.id_str);
		}, 1000 * 10)
	);
	productDesign.statuses.map((pr) =>
		setTimeout(function () {
			retweet(pr.id_str);
		}, 1000 * 10)
	);
	graphicDesign.statuses.map((gr) =>
		setTimeout(function () {
			retweet(gr.id_str);
		}, 1000 * 10)
	);
	productDesign2.statuses.map((pr2) =>
		setTimeout(function () {
			retweet(pr2.id_str);
		}, 1000 * 10)
	);
	graphicDesign2.statuses.map((gr2) =>
		setTimeout(function () {
			retweet(gr2.id_str);
		}, 1000 * 10)
	);
};

const jobSearch = () => {
	getJobs();
	// wait to fetch jobs first
	setTimeout(displayJobs, 1000 * 10);
};

jobSearch();
setInterval(jobSearch, 1000 * 60 * 60);
