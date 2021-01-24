let Twit = require("twit");
let fs = require("fs");
let config = require("./config");

console.log("bot is running");
let T = new Twit(config);

let uiDesign, productDesign, graphicDesign;

// For retweet mentions
let stream = T.stream("statuses/filter", { track: "@Remotejobs21" });

const retweet = (arg) => {
	let id = { id: `${arg}` };
	let retweetCallback = (err, data, response) => {
		//do something after RT
	};
	T.post("statuses/retweet/:id", id, retweetCallback);
};

// stream.on("tweet", function (tweet) {
// 	// mention function to run here
// 	retweet(tweet.in_reply_to_status_id_str);
// });

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

// To make it run every hour
const getJobs = () => {
	uiFetch();
	productFetch();
	graphicFetch();
};

const displayJobs = () => {
	console.log("check twitter");
	// display a job every 10 seconds
	// uiDesign.statuses.map((ui) =>
	// 	setTimeout(() => retweet(ui.id_str), 1000 * 10)
	// );
	// productDesign.statuses.map((pr) =>
	// 	setTimeout(() => retweet(pr.id_str), 1000 * 10)
	// );
	// graphicDesign.statuses.map((gr) =>
	// 	setTimeout(() => retweet(gr.id_str), 1000 * 10)
	// );
};

const jobSearch = () => {
	getJobs();
	// wait to fetch jobs first
	setTimeout(displayJobs, 1000 * 10);
};

jobSearch();
setInterval(jobSearch, 1000 * 60 * 60);
