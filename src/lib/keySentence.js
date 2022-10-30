export function keySentence(text) {
    // Change all punction to . and remove everything else, make lower case then split into sentances
    let sentances = breakSentace(text);
    let wordList = {};
    // Count the word frequency
    for (let a = 0; a < sentances.length; a++) {
        const words = sentances[a].trim().split(" ");
        for (let b = 0; b < words.length; b++) {
            const word = words[b];
            if (!wordList[word]) {
                wordList[word] = 0;
            }
            wordList[word]++;
        }
    }

    return (paragraph) => {
        let sentances = breakSentace(paragraph);
        let sentances2 = breakSentace(paragraph, true);
        let scores = {}
        for (let a = 0; a < sentances.length; a++) {
            if (sentances[a].split(" ").length > 3) {
                let score = 0;
                const words = sentances[a].trim().split(" ");
                for (let b = 0; b < words.length; b++) {
                    const word = words[b];
                    score += wordList[word];
                }
                if (sentances2[a]) {
                    scores[sentances[a]] = { score: score / words.length, text: sentances2[a] };
                }
            }
        }
        if (scores[""]) {
            delete scores[""];
        }
        let el = { score: 0 };
        for (let i = 0; i < Object.keys(scores).length; i++) {
            const element = scores[Object.keys(scores)[i]];
            if (element.score > el.score) {
                el = element;
            }
        }
        return el;
    }
    function breakSentace(sentances, keep = false) {
        if (keep) {
            return sentances.replaceAll(/[^Mr|mr|Mrs|mrs|Ms|ms](\.|\?|\!)\s[A-Z]/g, r => r.replace(/\s/, "{break}")).split("{break}");
        } else {
            return sentances.replaceAll(/[^Mr|mr|Mrs|mrs|Ms|ms](\.|\?|\!)\s[A-Z]/g, r => r.replace(/\s/, "{break}")).toLowerCase().split("{break}");
        }
    }
}