var incorrect;

incorrect = [
  '://',
  'http://',
  'http://.',
  'http://..',
  'http://../',
  'http://?',
  'http://??',
  'http://??/',
  'http://#',
  'http://##',
  'http://##/',
  '//',
  '//a',
  '///a',
  '///',
  'http:///a',
  'rdar://1234',
  'h://test',
  'http://3628126748'
];

/* Although technically incorrect, I dont really care about these edge
 * cases:
 *
 * 'ftps://foo.bar/',
 * 'http://-error-.invalid/',
 * 'http://a.b--c.de/',
 * 'http://-a.b.co',
 * 'http://a.b-.co',
 * 'http://0.0.0.0',
 * 'http://10.1.1.0',
 * 'http://10.1.1.255',
 * 'http://224.1.1.1',
 * 'http://1.1.1.1.1',
 * 'http://123.123.123',
 * 'http://.www.foo.bar/',
 * 'http://www.foo.bar./',
 * 'http://.www.foo.bar./',
 * 'http://10.1.1.1',
 * 'http://10.1.1.254'
 */

module.exports = incorrect;
