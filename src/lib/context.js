import { breakSentace } from "./utilities/breakSentances";
import { verbs } from "./storage/verbs";

export async function context(reports) {
    for (let i = 0; i < reports.length; i++) {
        const element = reports[i];

    }
    return reports
}

function checkCompletness(sentance) {
    // the idea is to see if the given text has everything it refers to if not we can add the prevous sentance to it then run it again
    let pos = {
        referers: ["he", "she", "him", "her", "his", "hers", "it", "they", "them", "their"],
        referers_classes: {
            "he": 0,
            "him": 0,
            "his": 0,
            "she": 1,
            "her": 1,
            "hers": 1,
            "they": 2,
            "them": 2,
            "their": 2,
            "it": 3,
            "this": 3,
            "that": 3
        },
        connectors: ["or", "and"],
        object_prefixes: ["the"],
        object_postfixes: ["then"]
    }

    // id the verbs and check before?


    let words = sentance.toLowerCase().replace(/[^a-z0-9\s]/gi, "").replace(/\s+/, " ").split(" ");
    console.log(sentance);

    let pronounsAndObjects = []

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (pos.referers.indexOf(word) != -1) {
            pronounsAndObjects.push(word);
        } else if (pos.connectors.indexOf(word) != -1) {
            pronounsAndObjects.push([(words[(i - 1)] || undefined), word, (words[(i + 1)] || undefined)]);
        } else if (pos.object_prefixes.indexOf(word) != -1) {
            pronounsAndObjects.push([word, (words[(i + 1)] || undefined)]);
        } else if (pos.object_postfixes.indexOf(word) != -1) {
            pronounsAndObjects.push([(words[(i - 1)] || undefined), word]);
        } else if (verbs.indexOf(word) != -1) {
            pronounsAndObjects.push(words[i-1]|| undefined);
        }
    }

    console.log(pronounsAndObjects);

    // rules
    // if there is a referer before object it is false
    // if there are two or more objects before the referer its fine
    // it can go object,referer0, referer0 but not object, referer0, referer,1 if there isn't two objects before
    //      basically there needs to be the same amount of objects as referer types
    // if the sentance starts with a conjuction it needs more

}

checkCompletness("In trying to get Sid to return on a full-time basis, Sid talked Vince McMahon into creating history.")
