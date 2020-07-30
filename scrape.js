const fs = require("fs");
const _ = require("lodash");
const axios = require("axios");
const cheerio = require("cheerio");

const resultsFileName = "results.json";
const urls = ["http://prawojazdywroclaw.pl"];
const linksArr = [];

const visitUrl = (url, i) => {
  (async () => {
    try {
      const res = await axios.get(url);
      const $ = cheerio.load(res.data);
      $("a").each((index, value) => linksArr.push($(value).attr("href")));
      if (i === urls.length - 1) createJson(linksArr);
    } catch (err) {
      console.log(`err = ${err}`);
    }
  })();
};

urls.forEach((url, i) => {
  visitUrl(url, i);
});

const createJson = (linksArr) => {
  linksArr = _.uniq(linksArr);
  const obj = {
    linksArrLength: linksArr.length,
    linksArr: linksArr.map((item) => {
      return { href: item };
    }),
  };

  fs.writeFile(resultsFileName, JSON.stringify(obj), (err) => {
    if (err) throw err;
    console.log(`Scrapping finnished and ${resultsFileName} created.`);
  });
};
