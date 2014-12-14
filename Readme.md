# nlcst-link-modifier [![Build Status](https://img.shields.io/travis/wooorm/nlcst-link-modifier.svg?style=flat)](https://travis-ci.org/wooorm/nlcst-link-modifier) [![Coverage Status](https://img.shields.io/coveralls/wooorm/nlcst-link-modifier.svg?style=flat)](https://coveralls.io/r/wooorm/nlcst-link-modifier?branch=master)

Classify links as `LinkNode`s.

Implemented by [retext-link](https://github.com/wooorm/retext-link), but separated for use by standalone (non-[retext](https://github.com/wooorm/retext)) parsers.

> Note: this project is useful in combination with natural language parsers like [parse-latin](https://github.com/wooorm/parse-latin), [parse-dutch](https://github.com/wooorm/parse-dutch), and [parse-english](https://github.com/wooorm/parse-english).

## Installation

npm:
```sh
$ npm install nlcst-link-modifier
```

Component.js:
```sh
$ component install wooorm/nlcst-link-modifier
```

Bower:
```sh
$ bower install nlcst-link-modifier
```

## Usage

```js
var modifier = require('nlcst-link-modifier');
var ParseEnglish = require('parse-english');
var english = new ParseEnglish();

/* Attach the modifier. */
modifier(english);

english.parse(
    'Who doesn’t like http://example.com? You? google.com.'
).children[0].children;
```

Yields:

```json
[
  {
    "type": "SentenceNode",
    "children": [
      {
        "type": "WordNode",
        "children": [
          {
            "type": "TextNode",
            "value": "Who"
          }
        ]
      },
      {
        "type": "WhiteSpaceNode",
        "value": " "
      },
      {
        "type": "WordNode",
        "children": [
          {
            "type": "TextNode",
            "value": "doesn"
          },
          {
            "type": "PunctuationNode",
            "value": "’"
          },
          {
            "type": "TextNode",
            "value": "t"
          }
        ]
      },
      {
        "type": "WhiteSpaceNode",
        "value": " "
      },
      {
        "type": "WordNode",
        "children": [
          {
            "type": "TextNode",
            "value": "like"
          }
        ]
      },
      {
        "type": "WhiteSpaceNode",
        "value": " "
      },
      {
        "type": "LinkNode",
        "value": "http://example.com"
      },
      {
        "type": "PunctuationNode",
        "value": "?"
      }
    ]
  },
  {
    "type": "WhiteSpaceNode",
    "value": " "
  },
  {
    "type": "SentenceNode",
    "children": [
      {
        "type": "WordNode",
        "children": [
          {
            "type": "TextNode",
            "value": "You"
          }
        ]
      },
      {
        "type": "PunctuationNode",
        "value": "?"
      },
      {
        "type": "WhiteSpaceNode",
        "value": " "
      },
      {
        "type": "LinkNode",
        "value": "google.com"
      },
      {
        "type": "PunctuationNode",
        "value": "."
      }
    ]
  }
]
```

## Performance

On a MacBook Air, **parse-english** performs about 2.5% slower on content filled with links, and a 1.5% slower on content without links, when using this modifier.

```
  1,444 op/s » A paragraph (5 sentences, 100 words, 10 links)
  2,160 op/s » A paragraph (5 sentences, 100 words, no links)

             parse w/o modifier
  1,484 op/s » A paragraph (5 sentences, 100 words, 10 links)
  2,192 op/s » A paragraph (5 sentences, 100 words, no links)
```

## Related

- [nlcst](https://github.com/wooorm/nlcst)
- [nlcst-emoji-modifier](https://github.com/wooorm/nlcst-emoji-modifier)
- [parse-latin](https://github.com/wooorm/parse-latin)
- [parse-dutch](https://github.com/wooorm/parse-dutch)
- [parse-english](https://github.com/wooorm/parse-english)
- [retext](https://github.com/wooorm/retext)
- [textom](https://github.com/wooorm/textom)

## License

MIT © [Titus Wormer](http://wooorm.com)
