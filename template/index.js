// path of template files
exports.path = './template'

// mili version should >= 3.5.0 and < 4.0.0
exports.engines = '>=3.5.0 <4.0.0'

exports.rules = [
  {
    path: 'package.json.mustache',
    upgrade: 'merge',
    handlers: ['mustache'],
  },
  {
    path: 'README.md.mustache',
    handlers: [
      core => core.extractArea('description', '<!-- description -->'),
      'mustache',
    ],
  },
]
