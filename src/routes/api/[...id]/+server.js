import Readability from '@mozilla/readability';
import { keySentence } from './keySentence';
import { JSDOM } from 'jsdom';
import { error } from '@sveltejs/kit';
import { removeStopwords } from "stopword/dist/stopword.esm.mjs";
import { search } from 'serp';

const allowed_sites = [
    'cnn.com',
    'huffpost.com',
    'foxnews.com',
    'politico.com',
    'yahoo.com',
    'latimes.com',
    'nypost.com',
    'businessinsider.com'
]

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {

    let baseRpt = await genReport(`${url.pathname.slice(5)}`);
    return new Promise((resolve, reject) => {
        search({
            host: "google.com",
            qs: {
                q: baseRpt.title
            }
        }).then(async (res) => {
            console.log("Google");
            console.log(res);
            let sw = removeStopwords((baseRpt.title).toLowerCase().replace(/\?|\!/g, ".").replace(/[^\w.\s]+/g, "").replace(/\s+/g, " ").split(" "));
            let sortedResults = [];
            for (let a = 0; a < res.length; a++) {
                for (let b = 0; b < allowed_sites.length; b++) {
                    if (res[a].url.indexOf(allowed_sites[b]) != -1) {
                        let score = 0;
                        for (let c = 0; c < sw.length; c++) {
                            if (res[a].title.toLowerCase().indexOf(sw[c]) != -1) {
                                score += 1;
                            }
                        }
                        res[a].score = score;
                        sortedResults.push(res[a]);
                    }
                }
            }

            let baseURL = new URL(url.pathname.slice(5))
            let mainURL = baseURL.host.split(".").slice(-2).join(".");
            let refinedResults = [];
            for (let i = 0; i < sortedResults.length; i++) {
                if (sortedResults[i].url.indexOf(mainURL) == -1) {
                    refinedResults.push(sortedResults[i]);
                }
            }
            console.log(refinedResults);
            let reports = [baseRpt];
            for (let i = 0; i < refinedResults.length; i++) {
                const r = refinedResults[i];
                reports.push(await genReport(refinedResults[i].url));
            }
            console.log(reports);
            resolve(new Response(JSON.stringify(baseRpt)));
        })
    })

}

async function genReport(url) {
    let content = [''];
    let newContent = [''];

    let data = {};
    const html = await fetch(url).then((res) => res.text()).catch(() => {
        throw error(400, "Invalid url");
    });

    let doc = new JSDOM(html);
    data.image = doc.window.document.querySelector('meta[property="og:image"]').content;
    let article = new Readability.Readability(doc.window.document).parse();
    let parsed = new JSDOM(article.content).window.document;
    content = [...parsed.querySelectorAll('p')];
    content = content.filter((a) => {
        return (
            a.innerHTML.trim() != '' &&
            a.innerHTML.toLowerCase().indexOf('read also') == -1 &&
            a.innerHTML.toLowerCase().indexOf('img') == -1
        );
    });

    let cntLn = 0;
    for (let i = 0; i < content.length; i++) {
        cntLn += content[i].textContent.length;
    }
    cntLn = cntLn / content.length;
    let massText = [];
    for (let i = 0; i < content.length; i++) {
        if (content[i].textContent.length < cntLn) {
            newContent[newContent.length - 1] += content[i].innerHTML;
            massText[massText.length - 1] += content[i].textContent;
        } else {
            newContent.push(content[i].innerHTML);
            massText.push(content[i].textContent);
        }
    }
    if (newContent[0] == '') {
        newContent = newContent.slice(1);
    }
    let scorer = keySentence(massText.join(' '));
    let summaries = [];
    massText.forEach((element, i) => {
        let sum = scorer(element);
        sum.index = i;
        summaries.push(sum);
    });
    let sum = summaries.sort((a, b) => {
        return a.score - b.score;
    })[0].text;

    let sw = removeStopwords((article.title + " " + sum).toLowerCase().replace(/\?|\!/g, ".").replace(/[^\w.\s]+/g, "").replace(/\s+/g, " ").split(" "));

    for (let a = 0; a < newContent.length; a++) {
        for (let b = 0; b < sw.length; b++) {
            newContent[a] = newContent[a].replaceAll(` ${sw[b]} `, `<g> ${sw[b]} </g>`);
        }
    }

    data.title = article.title;
    data.slides = newContent;
    data.summaries = summaries;
    data.keyPoint = sum;
    data.stopwords = sw;

    return data;
}