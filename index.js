// path of template files
exports.path = './template'

// mili version >= 2.0.0
exports.engines = ">=2.0.0<3.0.0"


exports.rules = [
  {
    path: './template',
    upgrade: 'keep',
  },
  {
    path: './index.js',
    upgrade: 'keep',
  },
  {
    path: 'package.json.mustache',
    upgrade: 'merge',
    handlers: ['mustache']
  },
  {
    path: '.gitignore',
    upgrade: 'merge',
  },
  {
    path: 'README.md.mustache',
    handlers: [
      core => core.extractArea('content', '<!-- custom -->'),
      'mustache',
    ],
  },
]
