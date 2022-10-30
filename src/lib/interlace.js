import { removeStopwords } from "stopword/dist/stopword.esm.mjs";
import { keySentence } from './keySentence';

export function interlace(reports) {
    // get which sentances/paragraphs are not in the og article then add them in
    // you need to figure out the key sentance and all the info that needs to be included to make it make sense
    // use stopword removal and keyword distance like if a sentance doesn't have the keywords and its not beofer or after
    // then don't include it

    // might take the keysentances then build them out then figure where they should be placed in the article

    // add paragraph swapping plus the src of the article
    console.log("Printing matrix");
    let baseSummary = reports[0].summaries;
    let matrix = {};
    for (let a = 1; a < reports.length; a++) {
        let compareSummary = reports[a].summaries;
        for (let b = 0; b < baseSummary.length; b++) {
            let baseSplit = removeStopwords(splitSentance(baseSummary[b].text));
            matrix[baseSummary[b].text] = {};
            for (let c = 0; c < compareSummary.length; c++) {
                let compareSplit = splitSentance(compareSummary[c].text);
                matrix[baseSummary[b].text][compareSummary[c].text] = 0;
                for (let d = 0; d < baseSplit.length; d++) {
                    if (compareSplit.indexOf(baseSplit[d]) != -1) {
                        matrix[baseSummary[b].text][compareSummary[c].text]++;
                    }
                }
                // matrix[baseSummary[b].text][compareSummary[c].text] = matrix[baseSummary[b].text][compareSummary[c].text] / compareSplit.length;
            }
            console.log(baseSummary[b].text);
            console.log(Object.values(matrix[baseSummary[b].text]).reduce((a, b) => a + b) / Object.values(matrix[baseSummary[b].text]).length);
            console.log(matrix[baseSummary[b].text]);
        }
    }


    function splitSentances(text) {
        return text.replace(/\?|\!/g, ".").replace(/[^\w.\s]+/g, "").replace(/\s+/g, " ").toLowerCase().split(" ");
    }
    function splitSentance(text) {
        return text.trim().replace(/\?|\!/g, ".").replace(/[^\w.\s]+/g, "").replace(/\s+/g, " ").toLowerCase().split(" ");
    }
}