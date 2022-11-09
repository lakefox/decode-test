import { interlace } from './interlace';
import { genReport } from './genReport';
import { search } from './search';
import { getCatagory } from "./categories";
import { citation } from "./citation";
import readingTime from 'reading-time';
import { context } from './context';

export async function article(query) {
    return new Promise((resolve, reject) => {
        search("information about " + query).then(async (res) => {

            let reports = await multiReports(res.slice(0, 10));
            let ctx = await context(reports);
            let interlaced = await interlace(ctx, query);

            let text = "";

            for (let i = 0; i < interlaced.length; i++) {
                text += " " + interlaced[i].text;

            }

            let rep = {
                text: text,
                // reports: reports,
                interlaced: interlaced,
                catagory: getCatagory(text),
                readingTime: readingTime(text),
                sources: citation(reports),
                articles: reports
            }

            resolve(rep);
        })
    })
}

async function multiReports(searchRes) {
    let requestedURLs = [];
    let reports = [];
    for (let i = 0; i < searchRes.length; i++) {
        try {
            if (requestedURLs.indexOf(searchRes[i].url) == -1) {
                requestedURLs.push(searchRes[i].url);
                reports.push(await genReport(searchRes[i].url));
            }
        } catch (error) {
            console.log(error);
        }
    }
    return reports;
}