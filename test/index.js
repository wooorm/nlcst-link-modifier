'use strict';

/**
 * Dependencies.
 */

var linkModifier,
    ParseEnglish,
    correctURLs,
    pseudoCorrectURLs,
    incorrectURLs,
    assert;

linkModifier = require('../');
ParseEnglish = require('parse-english');
correctURLs = require('./fixtures/correct');
pseudoCorrectURLs = require('./fixtures/pseudo-correct');
incorrectURLs = require('./fixtures/incorrect');
assert = require('assert');

/**
 * `ParseEnglish`.
 */

var parseEnglish;

parseEnglish = new ParseEnglish();

linkModifier(parseEnglish);

/**
 * Fixtures: Add `pseudoCorrectURLs` to `correctURLs`.
 */

correctURLs = correctURLs.concat(pseudoCorrectURLs);

/**
 * Tests.
 */

describe('nlcst-link-modifier()', function () {
    it('should be a `function`', function () {
        assert(typeof linkModifier === 'function');
    });

    it('should throw when not given a parser', function () {
        assert.throws(function () {
            linkModifier({});
        }, /not a valid parser/);

        assert.doesNotThrow(function () {
            linkModifier(new ParseEnglish());
        });
    });

    it('should classify links such as `www.example.com`', function () {
        var tree,
            node;

        tree = parseEnglish.parse('Check out www.example.com!');

        node = tree.children[0].children[0].children[4];

        assert(node.type === 'LinkNode');
        assert(node.value === 'www.example.com');
    });
});

/**
 * Validate a URL.
 *
 * @param {string} valueBefore
 * @param {string} valueAfter
 * @param {number} index - the location of the URL.
 * @param {string} url
 */

function validateURL(valueBefore, valueAfter, index, url) {
    it('should classify `' + url + '` as a link', function () {
        var tree,
            node;

        tree = parseEnglish.parse(valueBefore + url + valueAfter);

        node = tree.children[0].children[0].children[index];

        assert(node.type === 'LinkNode');
        assert(node.value === url);
    });
}

/**
 * Validate a value is NOT classified as a URL.
 * Logs helpful messages.
 *
 * @param {string} valueBefore
 * @param {string} valueAfter
 * @param {number} index - the location of the non-URL.
 * @param {string} url
 */

function validateIncorrectURL(valueBefore, valueAfter, index, url) {
    it('should NOT classify `' + url + '` as a link', function () {
        var tree,
            paragraph;

        tree = parseEnglish.parse(valueBefore + url + valueAfter);

        paragraph = tree.children[0];

        /* istanbul ignore next */
        paragraph.children.forEach(function (sentence) {
            sentence.children.forEach(function (node) {
                if (node.type === 'LinkNode') {
                    console.log(
                        '  - A URL was, however, ' +
                        'detected: ' + node.value
                    );
                }
            });
        });

        assert(paragraph.children[0].children[index].type !== 'LinkNode');
    });
}

describe('Correct urls', function () {
    correctURLs.forEach(function (correctURL) {
        validateURL('Check out ', ' it\'s awesome!', 4, correctURL);
    });
});

describe('Incorrect urls', function () {
    incorrectURLs.forEach(function (incorrectURL) {
        validateIncorrectURL('Check out ', ' it\'s invalid', 4, incorrectURL);
    });
});

describe('Correct urls suffixed by a full-stop', function () {
    correctURLs.forEach(function (correctURL) {
        validateURL('Check out ', '.', 4, correctURL);
    });
});

describe('Incorrect urls suffixed by a full-stop', function () {
    incorrectURLs.forEach(function (incorrectURL) {
        validateIncorrectURL('Check the invalid URL ', '.', 8, incorrectURL);
    });
});

describe('Correct urls suffixed by a comma', function () {
    correctURLs.forEach(function (correctURL) {
        validateURL('Check out ', ', or that.', 4, correctURL);
    });
});

describe('Incorrect urls suffixed by a comma', function () {
    incorrectURLs.forEach(function (incorrectURL) {
        validateIncorrectURL('Check out ', ', its invalid.', 4, incorrectURL);
    });
});

describe('Correct urls suffixed by multiple full-stops', function () {
    correctURLs.forEach(function (correctURL) {
        validateURL('Check out ', '...', 4, correctURL);
    });
});

describe('Incorrect urls suffixed by multiple full-stops', function () {
    incorrectURLs.forEach(function (incorrectURL) {
        validateIncorrectURL('Check out ', '...', 4, incorrectURL);
    });
});
