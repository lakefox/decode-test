export async function interlace(reports, query) {
    let keysentances = [];
    let queryWords = query.replaceAll(/^\w+/g, "").toLowerCase().split(" ");
    let topScore = 0;
    let topIndex = 0;

    for (let a = 0; a < reports.length; a++) {
        const report = reports[a];
        for (let b = 0; b < report.summaries.length; b++) {
            const summary = report.summaries[b];
            keysentances.push({
                summary: summary,
                report: a,
                words: summary.text.replaceAll(/^\w+/g, "").toLowerCase().split(" "),
                scores: [],
                score: summary.score,
                index: b,
                total: report.summaries.length
            });
            let localScore = 0;
            for (let c = 0; c < queryWords.length; c++) {
                if (keysentances[keysentances.length - 1].words.indexOf(queryWords[c]) != -1) {
                    localScore++;
                }
            }
            if (localScore > topScore) {
                topIndex = keysentances.length - 1;
                topScore = localScore;
            }
        }
    }

    for (let a = 0; a < keysentances.length; a++) {
        const keysentance = keysentances[a];
        for (let b = 0; b < keysentances.length; b++) {
            const compare = keysentances[b];
            if (a != b) {
                keysentances[a].scores.push({
                    score: 0,
                    index: b,
                    length: compare.words.length
                });
                for (let c = 0; c < compare.words.length; c++) {
                    if (keysentance.words.indexOf(compare.words[c]) != -1) {
                        keysentances[a].scores[keysentances[a].scores.length - 1].score++;
                    }
                }
            }
        }
        keysentances[a].scores = keysentances[a].scores.sort((a, b) => { return b.score - a.score });
    }

    let chain = [
        {
            text: keysentances[topIndex].summary.text,
            report: keysentances[topIndex].report,
            index: keysentances[topIndex].index,
            referTo: keysentances[topIndex].scores[0].index,
            score: keysentances[topIndex].score
        }
    ];

    let usedIndex = [topIndex];

    for (let i = 0; i < keysentances.length; i++) {
        let current = chain[chain.length - 1];
        let ref = keysentances[current.referTo].scores[0].index;
        if (usedIndex.indexOf(ref) != -1) {
            for (let e = 0; e < keysentances[current.referTo].scores.length; e++) {
                if (usedIndex.indexOf(keysentances[current.referTo].scores[e].index) == -1) {
                    ref = keysentances[current.referTo].scores[e].index;
                    break;
                }
            }
        }

        usedIndex.push(ref);
        chain.push({
            text: keysentances[current.referTo].summary.text,
            report: keysentances[current.referTo].report,
            index: keysentances[current.referTo].index,
            referTo: ref,
            score: keysentances[ref].score
        });
    }

    for (let a = 0; a < chain.length; a++) {
        for (let b = 0; b < chain.length; b++) {
            if (chain[a].text == chain[b].text && a != b) {
                chain[b].text = "";
            }
        }
    }

    chain = chain.filter((e) => { return e.text != "" });

    return chain;
}