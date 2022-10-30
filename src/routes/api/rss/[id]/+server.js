import { error } from '@sveltejs/kit';
import fs from "fs";
import { genReport } from "../../../../lib/genReport";

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    let rss = { created: 0 };
    if (fs.existsSync(`./feeds/${url.pathname.slice(9)}.json`)) {
        rss = JSON.parse(fs.readFileSync(`./feeds/${url.pathname.slice(9)}.json`));
    }
    if (rss.created >= new Date().getTime() - 3.6e+6) {
        return new Response(JSON.stringify(rss.content));
    } else {
        let res = await fetch(`https://www.reddit.com/r/${url.pathname.slice(9)}/top.json`).then(r => r.json());
        let posts = res.data.children;
        let reports = [];
        for (let i = 0; i < posts.length; i++) {
            if (typeof posts[i].data.url != "undefined" && posts[i].data.url.indexOf("reddit") == -1) {
                let report = await genReport(posts[i].data.url);
                reports.push(report);
            }
        }
        reports = shuffle(reports);

        fs.writeFileSync(`./feeds/${url.pathname.slice(9)}.json`, JSON.stringify({ created: new Date().getTime(), content: reports }));
        return new Response(JSON.stringify(reports));
    }
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