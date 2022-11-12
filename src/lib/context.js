import { breakSentace } from "./utilities/breakSentances";
import { verbs } from "./storage/verbs";
import { nouns } from "./storage/nouns";

export function context(text, fullText) {
    let cmp = { text: checkCompletness(text), fullText: checkCompletness(fullText) };
    return cmp;
}

function checkCompletness(sentance) {
    // the idea is to see if the given text has everything it refers to if not we can add the prevous sentance to it then run it again
    let pos = {
        referers: ["he", "she", "him", "her", "his", "hers", "they", "them", "their"],
        referers_classes: {
            "he": 0,
            "him": 0,
            "his": 0,
            "she": 1,
            "her": 1,
            "hers": 1,
            "they": 2,
            "them": 2,
            "their": 2
        },
        connectors: ["or", "and"],
        object_prefixes: ["the"],
        object_postfixes: ["then"],
        determiners: ["a", "all", "an", "another", "any", "anybody", "anyone", "anything", "anywhere", "both", "certain", "each", "either", "enough", "every", "everybody", "everyone", "everything", "everywhere", "few", "fewer", "fewest", "last", "least", "less", "little", "many", "many", "more", "most", "much", "neither", "next", "no", "no", "nobody", "none", "nothing", "nowhere", "once", "one", "said", "several", "some", "somebody", "something", "somewhere", "sufficient", "that", "the", "these", "this", "those", "three", "thrice", "twice", "two", "us", "various", "we", "what", "whatever", "which", "whichever", "you", "zero"],
        prepositions: ["aboard", "about", "above", "across", "after", "against", "along", "amid", "among", "anti", "around", "as", "at", "before", "behind", "below", "beneath", "beside", "besides", "between", "beyond", "but", "by", "concerning", "considering", "despite", "down", "during", "except", "excepting", "excluding", "following", "for", "from", "in", "inside", "into", "like", "minus", "near", "of", "off", "on", "onto", "opposite", "outside", "over", "past", "per", "plus", "regarding", "round", "save", "since", "than", "through", "to", "toward", "towards", "under", "underneath", "unlike", "until", "up", "upon", "versus", "via", "with", "within", "without"]
    }

    // id the verbs and check before?


    let words = sentance.toLowerCase().replace(/[^a-z0-9\s]/gi, "").replace(/\s+/, " ").split(" ");

    let refObj = [];

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (verbs.indexOf(word) > -1) {
            if (words[i - 1] != undefined) {
                if (nouns.indexOf(words[i - 1]) == -1 && verbs.indexOf(words[i - 1]) == -1 && pos.referers.indexOf(words[i - 1]) == -1 && pos.determiners.indexOf(words[i - 1]) == -1) {
                    refObj.push({
                        word: words[i - 1],
                        index: i,
                        type: "obj"
                    });
                }
            }
        } else if (pos.referers.indexOf(word) > -1) {
            refObj.push({
                word: word,
                class: pos.referers_classes[word],
                index: i,
                type: "ref"
            });
        }
    }

    return refObj;
}
