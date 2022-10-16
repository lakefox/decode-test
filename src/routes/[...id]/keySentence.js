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
        let sentances2 = paragraph.replace(/\?|\!/g, ".").split(".");
        let scores = {}
        for (let a = 0; a < sentances.length; a++) {
            if (sentances[a].split(" ").length > 3) {
                scores[sentances[a]] = 0;
                const words = sentances[a].trim().split(" ");
                for (let b = 0; b < words.length; b++) {
                    const word = words[b];
                    scores[sentances[a]] += wordList[word];
                }
                scores[sentances[a]] = { score: scores[sentances[a]] / words.length, text: sentances2[a] };
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
}