'use strict';

var expect = require('chai').expect;
var Anonymizer = require('../src/anonymizer.js');

describe('anonymizer', function () {

  describe('#encode(data, schema)', function(){
    it('can encode primitive values', function () {
      var anonymizer = new Anonymizer();

      expect(anonymizer.encode('a', 'String')).to.deep.equal('a');
      expect(anonymizer.encode('a')).to.deep.equal('a');
      expect(anonymizer.encode(10, 'Number')).to.deep.equal(10);
      expect(anonymizer.encode(10)).to.deep.equal(10);

      expect(anonymizer.encode(true, 'Boolean')).to.deep.equal(true);
      expect(anonymizer.encode(true)).to.deep.equal(true);
      expect(anonymizer.encode(false, 'Boolean')).to.deep.equal(false);
      expect(anonymizer.encode(false)).to.deep.equal(false);

      expect(anonymizer.encode(undefined, 'undefined')).to.deep.equal(undefined);
      expect(anonymizer.encode(undefined)).to.deep.equal(undefined);
      expect(anonymizer.encode(null, 'null')).to.deep.equal(null);
      expect(anonymizer.encode(null)).to.deep.equal(null);
    });

    it('can encode string', function () {
      var anonymizer = new Anonymizer();

      expect(anonymizer.encode('abc', 'String')).to.equal('abc');
    });

    it('can encode number', function () {
      var anonymizer = new Anonymizer();

      expect(anonymizer.encode('1', 'Number')).to.equal(1);
      expect(anonymizer.encode('11.11', 'number')).to.equal(11.11);
    });

    it('can encode categorical values', function () {
      var anonymizer = new Anonymizer();

      expect(anonymizer.encode('a', 'Category')).to.equal(1);
      expect(anonymizer.encode('a', 'category')).to.equal(1);
      expect(anonymizer.encode(['a','b','a'], ['Category'])).to.deep.equal([1, 2, 1]);
    });

    it('can encode a simple array', function () {
      var anonymizer = new Anonymizer();

      expect(anonymizer.encode(['a','b','c'], ['String'])).to.deep.equal(['a','b','c']);
      expect(anonymizer.encode(['a','b','c'], [])).to.deep.equal(['a','b','c']);
    });

    it('can encode a simple object', function () {
      var anonymizer = new Anonymizer();

      expect(anonymizer.encode({a: 1, b: true, c: 'test'}, {a: 'Number', b: 'Boolean', c: 'String'})).to.deep.equal([1, true, 'test']);
    });

    it('can encode an array of objects', function(){
      var anonymizer = new Anonymizer();

      expect(anonymizer.encode(
        [
          {a: 1, b: true, c: 'test'},
          {a: 2, b: false, c: 'test2'}
        ],
        [{a: 'Number', b: 'Boolean', c: 'String'}]
      )).to.deep.equal(
        [
          [1, true, 'test'],
          [2, false, 'test2']
        ]
      );
    });

    it('can encode an array of arrays', function(){
      var anonymizer = new Anonymizer();

      expect(anonymizer.encode(
        [
          [1, 2, 3],
          ['a', 'b', 'c']
        ],
        [['Number'], ['String']]
      )).to.deep.equal(
        [
          [1, 2, 3],
          ['a', 'b', 'c']
        ]
      );
    });

    it('can encode an object of arrays', function(){
      var anonymizer = new Anonymizer();

      expect(anonymizer.encode(
        {
          a: [1, 2, 3],
          b: ['a','b','c'],
          c: 'test'
        },
        {a: ['Number'], b: ['String'], c: 'String'}
      )).to.deep.equal(
        [
          [1, 2, 3],
          ['a', 'b', 'c'],
          'test'
        ]
      );
    });

    it('can encode an object of objects', function(){
      var anonymizer = new Anonymizer();

      expect(anonymizer.encode(
        {
          a: {d: 1, e: 2},
          b: ['a','b','c'],
          c: {f: 'test'}
        },
        {a: {d: 'Number', e: 'Number'}, b: ['String'], c: {f: 'String'}}
      )).to.deep.equal(
        [
          [1, 2],
          ['a', 'b', 'c'],
          ['test']
        ]
      );
    });

    it('can handle more than 2-level nested schema', function(){
      var anonymizer = new Anonymizer();

      expect(anonymizer.encode(
        {
          a: {d: 1, e: [{g: 1}, {g: 1}]},
          b: [['a','b','c']],
          c: {f: ['test', 'test', 'test2']}
        },
        {a: {d: 'Number', e: [{g: 'Number'}]}, b: [['String']], c: {f: ['Category']}}
      )).to.deep.equal(
        [
          [1, [[1], [1]]],
          [['a', 'b', 'c']],
          [[1, 1, 2]]
        ]
      );
    });

  });

  describe('#decode(data, schema)', function(){
    it('can decode primitive values', function () {
      var anonymizer = new Anonymizer();

      expect(anonymizer.decode('a', 'String')).to.deep.equal('a');
      expect(anonymizer.decode('a')).to.deep.equal('a');
      expect(anonymizer.decode(10, 'Number')).to.deep.equal(10);
      expect(anonymizer.decode(10)).to.deep.equal(10);

      expect(anonymizer.decode(true, 'Boolean')).to.deep.equal(true);
      expect(anonymizer.decode(true)).to.deep.equal(true);
      expect(anonymizer.decode(false, 'Boolean')).to.deep.equal(false);
      expect(anonymizer.decode(false)).to.deep.equal(false);

      expect(anonymizer.decode(undefined, 'undefined')).to.deep.equal(undefined);
      expect(anonymizer.decode(undefined)).to.deep.equal(undefined);
      expect(anonymizer.decode(null, 'null')).to.deep.equal(null);
      expect(anonymizer.decode(null)).to.deep.equal(null);
    });

    it('can decode categorical values', function () {
      var anonymizer = new Anonymizer(['a', 'b']);

      expect(anonymizer.decode(1, 'Category')).to.equal('a');
      expect(anonymizer.decode([1, 2, 1], ['Category'])).to.deep.equal(['a','b','a']);
    });

    it('can decode a simple array', function () {
      var anonymizer = new Anonymizer();

      expect(anonymizer.decode(['a','b','c'], ['String'])).to.deep.equal(['a','b','c']);
      expect(anonymizer.decode(['a','b','c'], [])).to.deep.equal(['a','b','c']);
    });

    it('can decode a simple object', function () {
      var anonymizer = new Anonymizer();

      expect(anonymizer.decode([1, true, 'test'], {a: 'Number', b: 'Boolean', c: 'String'})).to.deep.equal({a: 1, b: true, c: 'test'});
    });

    it('can decode an array of objects', function(){
      var anonymizer = new Anonymizer();

      expect(anonymizer.decode(
        [
          [1, true, 'test'],
          [2, false, 'test2']
        ],
        [{a: 'Number', b: 'Boolean', c: 'String'}]
      )).to.deep.equal(
        [
          {a: 1, b: true, c: 'test'},
          {a: 2, b: false, c: 'test2'}
        ]
      );
    });

    it('can decode an array of arrays', function(){
      var anonymizer = new Anonymizer();

      expect(anonymizer.decode(
        [
          [1, 2, 3],
          ['a', 'b', 'c']
        ],
        [['Number'], ['String']]
      )).to.deep.equal(
        [
          [1, 2, 3],
          ['a', 'b', 'c']
        ]
      );
    });

    it('can decode an object of arrays', function(){
      var anonymizer = new Anonymizer();

      expect(anonymizer.decode(
        [
          [1, 2, 3],
          ['a', 'b', 'c'],
          'test'
        ],
        {a: ['Number'], b: ['String'], c: 'String'}
      )).to.deep.equal(
        {
          a: [1, 2, 3],
          b: ['a','b','c'],
          c: 'test'
        }
      );
    });

    it('can handle more than 2-level nested schema', function(){
      var anonymizer = new Anonymizer(['test', 'test2']);

      expect(anonymizer.decode(
        [
          [1, [[1], [1]]],
          [['a', 'b', 'c']],
          [[1, 1, 2]]
        ],
        {a: {d: 'Number', e: [{g: 'Number'}]}, b: [['String']], c: {f: ['Category']}}
      )).to.deep.equal(
        {
          a: {d: 1, e: [{g: 1}, {g: 1}]},
          b: [['a','b','c']],
          c: {f: ['test', 'test', 'test2']}
        }
      );
    });

  });

});
