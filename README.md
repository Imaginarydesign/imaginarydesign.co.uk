Personal site of Adam Koniuszewski, Designer
=============================

Hosted at [imaginarydesign.co.uk](http://imaginarydesign.co.uk/).

## Built with

1. [Jekyll](http://jekyllrb.com/)
2. [NodeJS](http://nodejs.org)
3. [GulpJS](https://github.com/gulpjs/gulp)
4. [Sass](http://sass-lang.com/)
5. [BrowserSync](http://www.browsersync.io/)
6. Autoprefixer

## Who This Repo is For
This repo is mostly for me. Feel free to poke around to get ideas for your next Jekyll project.

## Setup

1. Clone it
1. Install node dependencies by `npm install`
2. Install bower dependecies by `bower install`
3. Run `gulp`

## Workflow

1. Develop normally, committing entire repository (with source files) to default **master** branch.
2. When ready to deploy, use "subtree push" to send the "_site" directory to the **gh-pages** branch on GitHub.
`git subtree push --prefix _site origin gh-pages`

## Author

**Adam Koniuszewski**

- Email - <adam@imaginarydesign.co.uk>
- Twitter - [@ImaginaryDesign](https://twitter.com/ImaginaryDesign)
- Dribble - <http://dribbble.com/ImaginaryDesign>
