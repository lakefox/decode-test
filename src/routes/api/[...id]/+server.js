import Readability from '@mozilla/readability';
import { keySentence } from './keySentence';
import { JSDOM } from 'jsdom';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    let content = [''];
    let newContent = [''];

    let data = {};
    const html = await fetch(`https://cors.lowsh.workers.dev?${url.pathname.slice(5)}`).then((res) => res.text()).catch(() => {
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


    data.title = article.title;
    data.slides = newContent;
    data.summaries = summaries;
    data.keyPoint = sum;

    return new Response(JSON.stringify(data));
}