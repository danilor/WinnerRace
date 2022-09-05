const cheerio = require('cheerio');
const fs = require('fs');


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const originalHTMLPath = 'dist/index.html';
// const newHTMLPath = 'dist/index.php';
const newHTMLPath = 'dist/index.html';

const html = fs.readFileSync(originalHTMLPath);

const $ = cheerio.load(html);

const uniqueId = getRandomInt(10000000000, 99999999999);

$('style').remove();

/**
 * These lines of code are being added per client requirement
 */
$('head').append('\n<meta name="uniqueID"  content="' + uniqueId + '" />\n');
let newHtml = $.html();
newHtml = newHtml.split('.js').join('.js?uniqueID='+uniqueId);
newHtml = newHtml.split('.css').join('.css?uniqueID='+uniqueId);



fs.writeFileSync(originalHTMLPath, newHtml, {flag: "w+"});

fs.renameSync(originalHTMLPath, newHTMLPath);

console.log(newHtml);
