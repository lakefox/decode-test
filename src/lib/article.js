import { interlace } from './interlace';
import { genReport } from './genReport';
import { search } from 'serp';

export async function article(query) {
    console.log(query);
    return new Promise((resolve, reject) => {
        search({
            host: "google.com",
            qs: {
                q: query
            }
        }).then(async (res) => {

            let reports = await multiReports(res);

            let interlaced = await interlace(reports);

            resolve(reports);
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