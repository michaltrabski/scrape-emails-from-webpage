const axios = require("axios");
const cheerio = require("cheerio");

axios.get("https://www.jamesqquick.com/").then((res) => {
  console.log(res.data);
});
