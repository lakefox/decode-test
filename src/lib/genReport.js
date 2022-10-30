import Readability from '@mozilla/readability';
import { keySentence } from './keySentence';
import { JSDOM } from 'jsdom';
import { removeStopwords } from "stopword/dist/stopword.esm.mjs";
import { getCatagory } from "./categories";
import { error } from '@sveltejs/kit';

export async function genReport(url) {
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

    summaries = summaries.filter((a) => {
        return (typeof a.text != "undefined" && typeof a.score != "undefined" && typeof a.index != "undefined");
    })

    let sum = summaries.sort((a, b) => {
        return a.score - b.score;
    });


    let sw = removeStopwords((article.title + " " + sum[0].text).replaceAll(/[^a-z0-9\s]/gi, "").toLowerCase().replace(/[^\w.\s]+/g, "").replace(/\s+/g, " ").split(" "));

    for (let a = 0; a < newContent.length; a++) {
        for (let b = 0; b < sw.length; b++) {
            newContent[a] = newContent[a].replaceAll(` ${sw[b]} `, `<g> ${sw[b]} </g>`);
        }
    }

    let catagory = getCatagory(massText.join(" "));

    data.title = article.title;
    data.slides = newContent;
    data.summaries = sum;
    data.keyPoint = sum[0].text;
    data.stopwords = sw;
    data.text = massText;
    data.catagory = catagory;
    data.url = url;

    data.slides.push(`<a href="${url}">SOURCE</a>`)

    return data;
}