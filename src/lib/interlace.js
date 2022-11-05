export async function interlace(reports) {
    // get which sentances/paragraphs are not in the og article then add them in
    // you need to figure out the key sentance and all the info that needs to be included to make it make sense
    // use stopword removal and keyword distance like if a sentance doesn't have the keywords and its not beofer or after
    // then don't include it

    // might take the keysentances then build them out then figure where they should be placed in the article

    // add paragraph swapping plus the src of the article


    return reports;
}

function breakSentace(sentances, keep = false) {
    if (keep) {
        return sentances.replaceAll(/[^Mr|mr|Mrs|mrs|Ms|ms](\.|\?|\!)\s[A-Z]/g, r => r.replace(/\s/, "{break}")).split("{break}");
    } else {
        return sentances.replaceAll(/[^Mr|mr|Mrs|mrs|Ms|ms](\.|\?|\!)\s[A-Z]/g, r => r.replace(/\s/, "{break}")).toLowerCase().split("{break}");
    }
}
function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * array.length);
        currentIndex -= 1;
        let temp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;
    }
    return array;
}