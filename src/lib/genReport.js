import Readability from '@mozilla/readability';
import { keySentence } from './keySentence';
import { JSDOM } from 'jsdom';
import { removeStopwords } from "stopword/dist/stopword.esm.mjs";
import { getCatagory } from "./categories";

export async function genReport(url) {
    let content = [''];
    let newContent = [{ text: "" }];

    let data = {};
    const html = await fetch(url).then((res) => res.text());
    let doc = new JSDOM(html);
    let article = new Readability.Readability(doc.window.document).parse();
    if (article == null) {
        throw new Error("No Content");
    }
    let parsed = new JSDOM(article.content).window.document;
    content = [...parsed.querySelectorAll('p')];
    let images = [...parsed.querySelectorAll('img')].map((e) => { return { src: e.src, title: (e.title || e.alt) } });
    let imgP = [...parsed.querySelectorAll('p, img')];
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
    let imageCount = 0;
    for (let i = 0; i < content.length; i++) {
        if (content[i].textContent.length < cntLn) {
            newContent[newContent.length - 1].text += content[i].innerHTML;
            massText[massText.length - 1] += content[i].textContent;
        } else {
            newContent.push({ text: content[i].innerHTML });
            massText.push(content[i].textContent);
        }

        imgP.shift();
        if (imgP.length > 0) {
            if (imgP[0].nodeName == "IMG") {
                newContent[newContent.length - 1].image = imageCount;
                imageCount++;
            }
        }
    }
    if (newContent[0].text == '') {
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

    let sw = removeStopwords((article.title + " " + (sum[0] || { text: "" }).text).replaceAll(/[^a-z0-9\s]/gi, "").toLowerCase().replace(/[^\w.\s]+/g, "").replace(/\s+/g, " ").split(" "));

    for (let a = 0; a < newContent.length; a++) {
        for (let b = 0; b < sw.length; b++) {
            newContent[a].text = newContent[a].text.replaceAll(` ${sw[b]} `, `<g> ${sw[b]} </g>`);
        }
    }

    let catagory = getCatagory(massText.join(" "));

    data.image = (doc.window.document.querySelector('meta[property="og:image"]') || { content: `https://source.unsplash.com/1600x900/?${catagory}` }).content;
    data.title = article.title;
    data.slides = newContent;
    data.summaries = sum;
    data.keyPoint = (sum[0] || { text: "" }).text;
    data.stopwords = sw;
    data.text = massText;
    data.catagory = catagory;
    data.url = url;
    data.images = images;

    data.slides.push({ text: `<a href="${url}">SOURCE</a>` })

    return data;
}