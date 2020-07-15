var fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");
const urls = [
  "https://www.jamesqquick.com/",
  "https://www.jamesqquick.com/blog/how-to-test-npm-packages-locally",
  "https://www.jamesqquick.com/courses",
  "https://www.jamesqquick.com/streaming",
];

const linksArr = [];

const visitUrl = (url, i) => {
  axios.get(url).then((res) => {
    const $ = cheerio.load(res.data);
    const links = $("a");
    links.each((index, value) => {
      var link = $(value).attr("href");
      linksArr.push({ link: link });
    });
    if (i === urls.length - 1) createJson(linksArr);
  });
};
urls.forEach((url, i) => {
  visitUrl(url, i);
});

const createJson = (data) => {
  fs.writeFile(
    "myjsonfile.json",
    JSON.stringify({
      data,
    }),
    function (err) {
      if (err) throw err;
      console.log("acrapping done and json created");
    }
  );
};
