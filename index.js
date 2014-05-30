#!/usr/bin/env node

var fs = require('fs'),
    _ = require('lodash'),
    css = require('css');

var filename = 'proof-of-concept',
    file = fs.readFileSync('./' + filename +'.css', { encoding: 'utf8' }),
    parsed = css.parse(file),
    o = {
      positioning: [ 'position', 'top', 'right', 'bottom', 'left', 'z-index', 'overflow', 'cursor', 'clip', 'float', 'clear' ],
      sizing: [ 'display', 'box-sizing', 'width', 'height', 'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left', 'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left', 'max-height', 'max-width', 'min-height', 'min-width' ],
      border: [ 'border', 'border-radius', 'border-bottom', 'border-bottom-color', 'border-bottom-style', 'border-bottom-width', 'border-color', 'border-left', 'border-left-color', 'border-left-style', 'border-left-width', 'border-right', 'border-right-color', 'border-right-style', 'border-right-width', 'border-style', 'border-top', 'border-top-color', 'border-top-style', 'border-top-width', 'border-width' ],
      background: [ 'background', 'background-attachment', 'background-color', 'background-image', 'background-position', 'background-repeat', 'background-size' ],
      text: [ 'color', 'direction', 'letter-spacing', 'line-height', 'text-align', 'text-align-last', 'text-decoration', 'text-indent', 'text-shadow', 'text-transform', 'unicode-bidi', 'vertical-align', 'white-space', 'word-spacing', 'word-wrap', 'text-underline-position'],
      font: [ 'font' , 'font-size-adjust' , 'font-stretch' , 'font-family' , 'font-size' , 'font-style' , 'font-variant' , 'font-weight' ],
      list: [ 'list-style', 'list-style-image', 'list-style-position', 'list-style-type' ],
      outline: [ 'outline', 'outline-color',  'outline-style',  'outline-width' ]
    };

_.each(parsed.stylesheet.rules, function (rule, idx) {

  var grouped = _.groupBy(rule.declarations, function (dec) {
    return _.findKey(o, function (props) {
      return _.contains(props, dec.property);
    }) || 'unsorted';
  });

  var groupOrder = _.keys(o);

  var newDecs = [];

  _.each(groupOrder, function (group) {

    if(grouped[group]) {
      newDecs.push({
        'type': 'comment',
        'comment': ' ' + group + ' '
      });
    }

    _.each(grouped[group], function (d) {
      newDecs.push(d);
    });
  });

  rule.declarations = newDecs;

  parsed.stylesheet.rules[idx] = rule;

});

fs.writeFile('./' + filename + '.parsed' + '.css', css.stringify(parsed).replace(/;(\s*)(\/\*)/g,'; \n\n  /*'));
