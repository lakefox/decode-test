export function keySentence(text) {
    // Change all punction to . and remove everything else, make lower case then split into sentances
    let sentances = text.replace(/\?|\!/g, ".").replace(/[^\w.\s]+/g, "").replace(/\s+/g, " ").toLowerCase().split(".");
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
        let sentances = paragraph.replace(/\?|\!/g, ".").replace(/[^\w.\s]+/g, "").replace(/\s+/g, " ").toLowerCase().split(".");
        let scores = {}
        for (let a = 0; a < sentances.length; a++) {
            scores[sentances[a]] = 0;
            const words = sentances[a].trim().split(" ");
            for (let b = 0; b < words.length; b++) {
                const word = words[b];
                scores[sentances[a]] += wordList[word];
            }
            scores[sentances[a]] = scores[sentances[a]] / words.length;
        }
        if (scores[""]) {
            delete scores[""];
        }
        let max = Math.max(...Object.values(scores));
        return Object.keys(scores).filter(key => scores[key] == max)[0];
    }
}