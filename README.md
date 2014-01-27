# StaticSite [![Build Status](https://secure.travis-ci.org/adrianolaru/generator-staticsite.png?branch=master)](https://travis-ci.org/adrianolaru/generator-staticsite)

A generator for [Yeoman](http://yeoman.io) with support for:
 
- [Assemble](http://assemble.io/), a static site generator for [Grunt](http://gruntjs.com/) with Layouts, [Handleblars Templates](http://handlebarsjs.com/), Markdown and Data separation
- [SASS](http://sass-lang.com/) with [Bourbon](http://bourbon.io/) and [Neat](http://neat.bourbon.io/)
- [CoffeeScript](http://coffeescript.org/)
- Optimized Build including concataneted, minified, cache busted assets
- Development server with LiveReload support


## Getting Started

Install Yeoman:

```bash
npm install -g yo
```

Install the generator:

```bash
npm install -g generator-staticsite
```

## Usage

Create a new project:

```bash
mkdir project && cd $_
yo staticsite
```

## Boilerplate

The following directory structure generated after run `yo staticsite`:

    .
    ├── .editorconfig
    ├── .jshintrc
    ├── .gitignore
    ├── Gruntfile.js
    ├── package.json
    ├── src
    │   ├── assets
    │   │   ├─── scripts
    │   |   │   ├── module1.js
    │   |   │   └── module2.coffee
    │   │   └── styles
    │   |   │   ├── modules
    │   |   │   |   ├── _all.scss
    │   |   │   |   └── _header.scss
    │   |   │   └── main.scss
    │   ├── content
    │   │   └── markdown.md
    │   ├── data
    │   │   └── site.yml
    │   └── templates
    │       ├── layouts
    │       │   └── default.hbs
    │       ├── pages
    │       │   ├── index.hbs
    │       └── partials
    │           └── header.hbs
    └── node_modules


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
