import { error } from '@sveltejs/kit';
import Parser from "rss-parser";
import fs from "fs";

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    // let rss = { created: 0 };
    // if (fs.existsSync("./rss.json")) {
    //     rss = JSON.parse(fs.readFileSync("./rss.json"));
    // }
    // if (rss.created >= new Date().getTime() - 3.6e+6) {
    //     return new Response(JSON.stringify(rss.content));
    // } else {
    let feeds = [
        'http://rss.cnn.com/rss/cnn_topstories.rss',
        'https://www.huffpost.com/section/front-page/feed?x=1',
        'https://moxie.foxnews.com/google-publisher/latest.xml',
        'https://cdn.feedcontrol.net/8/1114-wioSIX3uu8MEj.xml',
        'http://www.politico.com/rss/politicopicks.xml',
        'https://www.yahoo.com/news/rss',
        'https://www.latimes.com/local/rss2.0.xml',
        'https://rss.nytimes.com/services/xml/rss/nyt/Politics.xml'
    ];
    let rssItems = [];
    let parser = new Parser({
        customFields: {
            item: [
                'media:content', 'meta:content'
            ]
        }
    });
    for (let i = 0; i < feeds.length; i++) {
        const feed = feeds[i];
        let rss = await parser.parseURL(`https://cors.lowsh.workers.dev?${feed}`);
        rssItems.push(...rss.items);
    }
    rssItems = shuffle(rssItems);

    // fs.writeFileSync("./rss.json", JSON.stringify({ created: new Date().getTime(), content: rssItems }));
    return new Response(JSON.stringify(rssItems));

    // }
}

function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * array.length);
        currentIndex -= 1;
        let temp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;
    }
    return array;
}