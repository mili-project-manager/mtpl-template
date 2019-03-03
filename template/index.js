// path of template files
exports.path = './template'

// mili version >= 2.0.0
exports.engines = ">=2.0.0 <3.0.0"


exports.rules = [
  {
    path: 'package.json.mustance',
    upgrade: 'merge',
    handlers: ['mustance']
  },
  {
    path: 'README.md.mustache',
    handlers: [
      'mustance',
      // core => core.extractHtmlCustomArea('custom')
    ],
  },
]
