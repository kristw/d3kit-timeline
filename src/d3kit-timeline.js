'use strict';

// Define module using Universal Module Definition pattern
// https://github.com/umdjs/umd/blob/master/returnExports.js

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // Support AMD. Register as an anonymous module.
    // EDIT: List all dependencies in AMD style
    define([], factory);
  }
  else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    // EDIT: Pass dependencies to factory function
    module.exports = factory();
  }
  else {
    // No AMD. Set module as a global variable
    // EDIT: Pass dependencies to factory function
    root.anonymizer = factory();
  }
}(this,
//EDIT: The dependencies are passed to this function
function () {
//---------------------------------------------------
// BEGIN code for this module
//---------------------------------------------------

/**
 * Module dependencies
 */

var isArray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

var isObject = function(x) {
  return typeof x === "object" && x !== null;
};

/**
 * Module code
 */

function Anonymizer(categories){
  if(isArray(categories)){
    this.categories = categories;
    this.categoryLookup = categories.reduce(function(obj, category, i){
      obj[category] = i;
      return obj;
    }, {});
  }
  else{
    this.categories = [];
    this.categoryLookup = {};
  }
}

var proto = Anonymizer.prototype;

proto.getCategoryCode = function(categoryName){
  if(this.categoryLookup.hasOwnProperty(categoryName)){
    return this.categoryLookup[categoryName];
  }
  else{
    this.categories.push(categoryName);
    this.categoryLookup[categoryName] = this.categories.length;
    return this.categories.length;
  }
};

proto.getCategoryName = function(categoryCode){
  return categoryCode>this.categories.length ? null : this.categories[categoryCode-1];
};

proto.getCategories = function(){
  return this.categories;
};

proto.encode = function(data, schema){
  var self = this;

  if(isArray(data)){
    var childSchema = (schema.length > 0) ? schema[0] : null;
    return data.map(function(row, i){
      return self.encode(row, i<schema.length ? schema[i] : childSchema);
    });
  }
  else if(isObject(data)){
    if(!isObject(schema)) throw 'Expect schema to be an object but receive: ' + JSON.stringify(schema);
    return Object.keys(schema).map(function(key){
      return self.encode(data[key], schema[key]);
    });
  }
  else if(schema==='Category' || schema==='category'){
    return this.getCategoryCode(data);
  }
  else if(schema==='Number' || schema==='number'){
    return +data;
  }
  else{
    return data;
  }
};

proto.decode = function(data, schema){
  var self = this;

  if(isArray(schema)){
    var childSchema = (schema.length > 0) ? schema[0] : null;
    return data.map(function(row, i){
      return self.decode(row, i<schema.length ? schema[i] : childSchema);
    });
  }
  else if(isObject(schema)){
    return Object.keys(schema).reduce(function(obj, key, i){
      obj[key] = self.decode(data[i], schema[key]);
      return obj;
    }, {});
  }
  else if(schema==='Category' || schema==='category'){
    return this.getCategoryName(data);
  }
  else{
    return data;
  }
};

/**
 * Module exports
 */

return Anonymizer;

//---------------------------------------------------
// END code for this module
//---------------------------------------------------
}));

