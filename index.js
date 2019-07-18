const addAdditionalProperty = require('@mili-handlers/additional-property')

exports.path = './template'
exports.engines = '>=3.2.0 <4.0.0'

const ignoreWhenNoLint = core =>
  core.ignoreWhen(resource => !resource.answers.lint)
const ignoreWhenNoStanderVersion = core =>
  core.ignoreWhen(resource => !resource.answers.standardVersion)
const ignoreWhenLock = core =>
  core.ignoreWhen(resource => resource.answers.lock)
const isNeedGitHook = ({ answers }) => answers.standardVersion || answers.lint
const ignoreWhenNotNeedGitHook = core =>
  core.ignoreWhen(resource => !isNeedGitHook(resource))

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
    path: '.@(lintstagedrc|prettierrc).yml',
    handler: ignoreWhenNoLint,
  },
  {
    path: '@(.czrc|.commitlintrc.yml)',
    handler: ignoreWhenNoStanderVersion,
  },
  {
    path: '.huskyrc.yml.mustache',
    handlers: [ignoreWhenNotNeedGitHook, 'mustache'],
  },
  {
    path: 'package.json.mustache',
    upgrade: 'merge',
    handlers: [addAdditionalProperty('needGitHook', isNeedGitHook), 'mustache'],
  },
  {
    path: '.gitignore.mustache',
    upgrade: 'merge',
    handler: 'mustache',
  },
  {
    path: 'README.md.mustache',
    handlers: [
      core => core.extractArea('description', '<!-- description -->'),
      'mustache',
    ],
  },
  {
    path: '.npmrc',
    handler: ignoreWhenLock,
  },
]

exports.questions = [
  { type: 'confirm', name: 'lint', message: 'use lint' },
  { type: 'confirm', name: 'standardVersion', message: 'use standard version' },
  { type: 'confirm', name: 'lock', message: 'lock dependencies' },
]
