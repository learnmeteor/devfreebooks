module.exports = function() {

  var harp = require("./harp.json")["globals"]
    , RSS = require("rss")
    , moment = require("moment")
    , fs = require("fs")
    , root_url = harp.root_url[process.env.NODE_ENV]
    , image_root_url = root_url + "assets/images/"
    , output_feed = "public/rss.xml"
  ;

  var feed = new RSS({
    title: harp.title,
    description: harp.description,
    feed_url: root_url + "rss.xml",
    site_url: root_url,
    image_url: image_root_url + "devfreebooks-128.png",
    managingEditor: harp.author,
    pubDate: moment().format("LLLL"),
    ttl: 60
  });
  
  harp.platforms.forEach(function(platform_name) {
    var platform = require("./public/"+ platform_name +"/_data.json")["index"];

    platform.books.forEach(function(book) {
      var book_id = book.title.replace(/[^\w\s]/g, "").replace(/\s/g, "-").toLowerCase();
      var book_link = root_url + platform_name + "/#" + book_id;
      var book_published_at = moment(book.published_at || moment().format("YYYYMMDD"), "YYYYMMDD");

      feed.item({
        title: "Book: " + book.title,
        description: book.description,
        url: book_link,
        author: harp.author,
        date: book_published_at.format("ll")
      });
    });
  });
  fs.writeFileSync(output_feed, feed.xml());
  console.log("Generated RSS:", output_feed);
};