var elements = document.getElementsByTagName('*');

var sourceWordsToTargetWords = [
    [['fuck', 'shit', 'bitch', 'crap', 'dick', 'retard', 'hell', 'cunt', 'penis', 'vagina',
    	'bastard', 'bollocks', 'nigg', 'frick', 'whore', 'dick', 'dildo', 'sex', 'slut', 'wank', 'wtf', 'fag', 'gay',
    	'lesbian', 'blow', 'weed', 'marijuana', 'cocaine', 'crack', 'boner', 'boob', 'cock', 'balls', 'anal', 'anus'],
    'h*ck'],
    [['god', 'jesus', 'christ', 'lord'], 'gosh'],
    [['damn'], 'darn'],
    [['arse', 'ass'], 'butt']
];

function makeRegex(sourceWords) {
    return new RegExp('\\b' + sourceWords.join('\\b|\\b') + '\\b', 'g');
};

function identity(string) {
    return string;
};

function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
};

function toUpperCase(string) {
    return string.toUpperCase();
};

function makeRegexToTargetWords(sourceWordsToTargetWords, modifyWords) {
    return sourceWordsToTargetWords.map(function(sourceAndTarget) {
        var [source,target] = sourceAndTarget;
        source = source.map(modifyWords);
        target = modifyWords(target);
        return [makeRegex(source), target];
    });
};

var sourceRegexToTargetWords = makeRegexToTargetWords(sourceWordsToTargetWords, identity).concat(makeRegexToTargetWords(sourceWordsToTargetWords, capitalizeFirstLetter)).concat(makeRegexToTargetWords(sourceWordsToTargetWords, toUpperCase));

function replaceTextWithRegexes(text, sourceRegexToTargetWords) {
    for (var k = 0; k < sourceRegexToTargetWords.length; k++) {
        var [regex, targetWord] = sourceRegexToTargetWords[k];
        var replacedText = text.replace(regex, targetWord);
        text = replacedText
    }
    return text;
};

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            var text = node.nodeValue;
            replacedText = replaceTextWithRegexes(text, sourceRegexToTargetWords);

            if (replacedText !== text) {
                console.log('replaced');
                element.replaceChild(document.createTextNode(replacedText), node);
            }
        }
    }
}