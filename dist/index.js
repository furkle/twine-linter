exports["TwineLinter"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function isIElementLike(node) {
    return node && node.nodeType === 1;
}
exports.default = isIElementLike;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

(function (global, factory) {
   true ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Immutable = factory());
}(this, function () { 'use strict';var SLICE$0 = Array.prototype.slice;

  function createClass(ctor, superClass) {
    if (superClass) {
      ctor.prototype = Object.create(superClass.prototype);
    }
    ctor.prototype.constructor = ctor;
  }

  function Iterable(value) {
      return isIterable(value) ? value : Seq(value);
    }


  createClass(KeyedIterable, Iterable);
    function KeyedIterable(value) {
      return isKeyed(value) ? value : KeyedSeq(value);
    }


  createClass(IndexedIterable, Iterable);
    function IndexedIterable(value) {
      return isIndexed(value) ? value : IndexedSeq(value);
    }


  createClass(SetIterable, Iterable);
    function SetIterable(value) {
      return isIterable(value) && !isAssociative(value) ? value : SetSeq(value);
    }



  function isIterable(maybeIterable) {
    return !!(maybeIterable && maybeIterable[IS_ITERABLE_SENTINEL]);
  }

  function isKeyed(maybeKeyed) {
    return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL]);
  }

  function isIndexed(maybeIndexed) {
    return !!(maybeIndexed && maybeIndexed[IS_INDEXED_SENTINEL]);
  }

  function isAssociative(maybeAssociative) {
    return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
  }

  function isOrdered(maybeOrdered) {
    return !!(maybeOrdered && maybeOrdered[IS_ORDERED_SENTINEL]);
  }

  Iterable.isIterable = isIterable;
  Iterable.isKeyed = isKeyed;
  Iterable.isIndexed = isIndexed;
  Iterable.isAssociative = isAssociative;
  Iterable.isOrdered = isOrdered;

  Iterable.Keyed = KeyedIterable;
  Iterable.Indexed = IndexedIterable;
  Iterable.Set = SetIterable;


  var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
  var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
  var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
  var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

  // Used for setting prototype methods that IE8 chokes on.
  var DELETE = 'delete';

  // Constants describing the size of trie nodes.
  var SHIFT = 5; // Resulted in best performance after ______?
  var SIZE = 1 << SHIFT;
  var MASK = SIZE - 1;

  // A consistent shared value representing "not set" which equals nothing other
  // than itself, and nothing that could be provided externally.
  var NOT_SET = {};

  // Boolean references, Rough equivalent of `bool &`.
  var CHANGE_LENGTH = { value: false };
  var DID_ALTER = { value: false };

  function MakeRef(ref) {
    ref.value = false;
    return ref;
  }

  function SetRef(ref) {
    ref && (ref.value = true);
  }

  // A function which returns a value representing an "owner" for transient writes
  // to tries. The return value will only ever equal itself, and will not equal
  // the return of any subsequent call of this function.
  function OwnerID() {}

  // http://jsperf.com/copy-array-inline
  function arrCopy(arr, offset) {
    offset = offset || 0;
    var len = Math.max(0, arr.length - offset);
    var newArr = new Array(len);
    for (var ii = 0; ii < len; ii++) {
      newArr[ii] = arr[ii + offset];
    }
    return newArr;
  }

  function ensureSize(iter) {
    if (iter.size === undefined) {
      iter.size = iter.__iterate(returnTrue);
    }
    return iter.size;
  }

  function wrapIndex(iter, index) {
    // This implements "is array index" which the ECMAString spec defines as:
    //
    //     A String property name P is an array index if and only if
    //     ToString(ToUint32(P)) is equal to P and ToUint32(P) is not equal
    //     to 2^32−1.
    //
    // http://www.ecma-international.org/ecma-262/6.0/#sec-array-exotic-objects
    if (typeof index !== 'number') {
      var uint32Index = index >>> 0; // N >>> 0 is shorthand for ToUint32
      if ('' + uint32Index !== index || uint32Index === 4294967295) {
        return NaN;
      }
      index = uint32Index;
    }
    return index < 0 ? ensureSize(iter) + index : index;
  }

  function returnTrue() {
    return true;
  }

  function wholeSlice(begin, end, size) {
    return (begin === 0 || (size !== undefined && begin <= -size)) &&
      (end === undefined || (size !== undefined && end >= size));
  }

  function resolveBegin(begin, size) {
    return resolveIndex(begin, size, 0);
  }

  function resolveEnd(end, size) {
    return resolveIndex(end, size, size);
  }

  function resolveIndex(index, size, defaultIndex) {
    return index === undefined ?
      defaultIndex :
      index < 0 ?
        Math.max(0, size + index) :
        size === undefined ?
          index :
          Math.min(size, index);
  }

  /* global Symbol */

  var ITERATE_KEYS = 0;
  var ITERATE_VALUES = 1;
  var ITERATE_ENTRIES = 2;

  var REAL_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator';

  var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;


  function Iterator(next) {
      this.next = next;
    }

    Iterator.prototype.toString = function() {
      return '[Iterator]';
    };


  Iterator.KEYS = ITERATE_KEYS;
  Iterator.VALUES = ITERATE_VALUES;
  Iterator.ENTRIES = ITERATE_ENTRIES;

  Iterator.prototype.inspect =
  Iterator.prototype.toSource = function () { return this.toString(); }
  Iterator.prototype[ITERATOR_SYMBOL] = function () {
    return this;
  };


  function iteratorValue(type, k, v, iteratorResult) {
    var value = type === 0 ? k : type === 1 ? v : [k, v];
    iteratorResult ? (iteratorResult.value = value) : (iteratorResult = {
      value: value, done: false
    });
    return iteratorResult;
  }

  function iteratorDone() {
    return { value: undefined, done: true };
  }

  function hasIterator(maybeIterable) {
    return !!getIteratorFn(maybeIterable);
  }

  function isIterator(maybeIterator) {
    return maybeIterator && typeof maybeIterator.next === 'function';
  }

  function getIterator(iterable) {
    var iteratorFn = getIteratorFn(iterable);
    return iteratorFn && iteratorFn.call(iterable);
  }

  function getIteratorFn(iterable) {
    var iteratorFn = iterable && (
      (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL]) ||
      iterable[FAUX_ITERATOR_SYMBOL]
    );
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  function isArrayLike(value) {
    return value && typeof value.length === 'number';
  }

  createClass(Seq, Iterable);
    function Seq(value) {
      return value === null || value === undefined ? emptySequence() :
        isIterable(value) ? value.toSeq() : seqFromValue(value);
    }

    Seq.of = function(/*...values*/) {
      return Seq(arguments);
    };

    Seq.prototype.toSeq = function() {
      return this;
    };

    Seq.prototype.toString = function() {
      return this.__toString('Seq {', '}');
    };

    Seq.prototype.cacheResult = function() {
      if (!this._cache && this.__iterateUncached) {
        this._cache = this.entrySeq().toArray();
        this.size = this._cache.length;
      }
      return this;
    };

    // abstract __iterateUncached(fn, reverse)

    Seq.prototype.__iterate = function(fn, reverse) {
      return seqIterate(this, fn, reverse, true);
    };

    // abstract __iteratorUncached(type, reverse)

    Seq.prototype.__iterator = function(type, reverse) {
      return seqIterator(this, type, reverse, true);
    };



  createClass(KeyedSeq, Seq);
    function KeyedSeq(value) {
      return value === null || value === undefined ?
        emptySequence().toKeyedSeq() :
        isIterable(value) ?
          (isKeyed(value) ? value.toSeq() : value.fromEntrySeq()) :
          keyedSeqFromValue(value);
    }

    KeyedSeq.prototype.toKeyedSeq = function() {
      return this;
    };



  createClass(IndexedSeq, Seq);
    function IndexedSeq(value) {
      return value === null || value === undefined ? emptySequence() :
        !isIterable(value) ? indexedSeqFromValue(value) :
        isKeyed(value) ? value.entrySeq() : value.toIndexedSeq();
    }

    IndexedSeq.of = function(/*...values*/) {
      return IndexedSeq(arguments);
    };

    IndexedSeq.prototype.toIndexedSeq = function() {
      return this;
    };

    IndexedSeq.prototype.toString = function() {
      return this.__toString('Seq [', ']');
    };

    IndexedSeq.prototype.__iterate = function(fn, reverse) {
      return seqIterate(this, fn, reverse, false);
    };

    IndexedSeq.prototype.__iterator = function(type, reverse) {
      return seqIterator(this, type, reverse, false);
    };



  createClass(SetSeq, Seq);
    function SetSeq(value) {
      return (
        value === null || value === undefined ? emptySequence() :
        !isIterable(value) ? indexedSeqFromValue(value) :
        isKeyed(value) ? value.entrySeq() : value
      ).toSetSeq();
    }

    SetSeq.of = function(/*...values*/) {
      return SetSeq(arguments);
    };

    SetSeq.prototype.toSetSeq = function() {
      return this;
    };



  Seq.isSeq = isSeq;
  Seq.Keyed = KeyedSeq;
  Seq.Set = SetSeq;
  Seq.Indexed = IndexedSeq;

  var IS_SEQ_SENTINEL = '@@__IMMUTABLE_SEQ__@@';

  Seq.prototype[IS_SEQ_SENTINEL] = true;



  createClass(ArraySeq, IndexedSeq);
    function ArraySeq(array) {
      this._array = array;
      this.size = array.length;
    }

    ArraySeq.prototype.get = function(index, notSetValue) {
      return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
    };

    ArraySeq.prototype.__iterate = function(fn, reverse) {
      var array = this._array;
      var maxIndex = array.length - 1;
      for (var ii = 0; ii <= maxIndex; ii++) {
        if (fn(array[reverse ? maxIndex - ii : ii], ii, this) === false) {
          return ii + 1;
        }
      }
      return ii;
    };

    ArraySeq.prototype.__iterator = function(type, reverse) {
      var array = this._array;
      var maxIndex = array.length - 1;
      var ii = 0;
      return new Iterator(function() 
        {return ii > maxIndex ?
          iteratorDone() :
          iteratorValue(type, ii, array[reverse ? maxIndex - ii++ : ii++])}
      );
    };



  createClass(ObjectSeq, KeyedSeq);
    function ObjectSeq(object) {
      var keys = Object.keys(object);
      this._object = object;
      this._keys = keys;
      this.size = keys.length;
    }

    ObjectSeq.prototype.get = function(key, notSetValue) {
      if (notSetValue !== undefined && !this.has(key)) {
        return notSetValue;
      }
      return this._object[key];
    };

    ObjectSeq.prototype.has = function(key) {
      return this._object.hasOwnProperty(key);
    };

    ObjectSeq.prototype.__iterate = function(fn, reverse) {
      var object = this._object;
      var keys = this._keys;
      var maxIndex = keys.length - 1;
      for (var ii = 0; ii <= maxIndex; ii++) {
        var key = keys[reverse ? maxIndex - ii : ii];
        if (fn(object[key], key, this) === false) {
          return ii + 1;
        }
      }
      return ii;
    };

    ObjectSeq.prototype.__iterator = function(type, reverse) {
      var object = this._object;
      var keys = this._keys;
      var maxIndex = keys.length - 1;
      var ii = 0;
      return new Iterator(function()  {
        var key = keys[reverse ? maxIndex - ii : ii];
        return ii++ > maxIndex ?
          iteratorDone() :
          iteratorValue(type, key, object[key]);
      });
    };

  ObjectSeq.prototype[IS_ORDERED_SENTINEL] = true;


  createClass(IterableSeq, IndexedSeq);
    function IterableSeq(iterable) {
      this._iterable = iterable;
      this.size = iterable.length || iterable.size;
    }

    IterableSeq.prototype.__iterateUncached = function(fn, reverse) {
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var iterable = this._iterable;
      var iterator = getIterator(iterable);
      var iterations = 0;
      if (isIterator(iterator)) {
        var step;
        while (!(step = iterator.next()).done) {
          if (fn(step.value, iterations++, this) === false) {
            break;
          }
        }
      }
      return iterations;
    };

    IterableSeq.prototype.__iteratorUncached = function(type, reverse) {
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterable = this._iterable;
      var iterator = getIterator(iterable);
      if (!isIterator(iterator)) {
        return new Iterator(iteratorDone);
      }
      var iterations = 0;
      return new Iterator(function()  {
        var step = iterator.next();
        return step.done ? step : iteratorValue(type, iterations++, step.value);
      });
    };



  createClass(IteratorSeq, IndexedSeq);
    function IteratorSeq(iterator) {
      this._iterator = iterator;
      this._iteratorCache = [];
    }

    IteratorSeq.prototype.__iterateUncached = function(fn, reverse) {
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var iterator = this._iterator;
      var cache = this._iteratorCache;
      var iterations = 0;
      while (iterations < cache.length) {
        if (fn(cache[iterations], iterations++, this) === false) {
          return iterations;
        }
      }
      var step;
      while (!(step = iterator.next()).done) {
        var val = step.value;
        cache[iterations] = val;
        if (fn(val, iterations++, this) === false) {
          break;
        }
      }
      return iterations;
    };

    IteratorSeq.prototype.__iteratorUncached = function(type, reverse) {
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = this._iterator;
      var cache = this._iteratorCache;
      var iterations = 0;
      return new Iterator(function()  {
        if (iterations >= cache.length) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          cache[iterations] = step.value;
        }
        return iteratorValue(type, iterations, cache[iterations++]);
      });
    };




  // # pragma Helper functions

  function isSeq(maybeSeq) {
    return !!(maybeSeq && maybeSeq[IS_SEQ_SENTINEL]);
  }

  var EMPTY_SEQ;

  function emptySequence() {
    return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
  }

  function keyedSeqFromValue(value) {
    var seq =
      Array.isArray(value) ? new ArraySeq(value).fromEntrySeq() :
      isIterator(value) ? new IteratorSeq(value).fromEntrySeq() :
      hasIterator(value) ? new IterableSeq(value).fromEntrySeq() :
      typeof value === 'object' ? new ObjectSeq(value) :
      undefined;
    if (!seq) {
      throw new TypeError(
        'Expected Array or iterable object of [k, v] entries, '+
        'or keyed object: ' + value
      );
    }
    return seq;
  }

  function indexedSeqFromValue(value) {
    var seq = maybeIndexedSeqFromValue(value);
    if (!seq) {
      throw new TypeError(
        'Expected Array or iterable object of values: ' + value
      );
    }
    return seq;
  }

  function seqFromValue(value) {
    var seq = maybeIndexedSeqFromValue(value) ||
      (typeof value === 'object' && new ObjectSeq(value));
    if (!seq) {
      throw new TypeError(
        'Expected Array or iterable object of values, or keyed object: ' + value
      );
    }
    return seq;
  }

  function maybeIndexedSeqFromValue(value) {
    return (
      isArrayLike(value) ? new ArraySeq(value) :
      isIterator(value) ? new IteratorSeq(value) :
      hasIterator(value) ? new IterableSeq(value) :
      undefined
    );
  }

  function seqIterate(seq, fn, reverse, useKeys) {
    var cache = seq._cache;
    if (cache) {
      var maxIndex = cache.length - 1;
      for (var ii = 0; ii <= maxIndex; ii++) {
        var entry = cache[reverse ? maxIndex - ii : ii];
        if (fn(entry[1], useKeys ? entry[0] : ii, seq) === false) {
          return ii + 1;
        }
      }
      return ii;
    }
    return seq.__iterateUncached(fn, reverse);
  }

  function seqIterator(seq, type, reverse, useKeys) {
    var cache = seq._cache;
    if (cache) {
      var maxIndex = cache.length - 1;
      var ii = 0;
      return new Iterator(function()  {
        var entry = cache[reverse ? maxIndex - ii : ii];
        return ii++ > maxIndex ?
          iteratorDone() :
          iteratorValue(type, useKeys ? entry[0] : ii - 1, entry[1]);
      });
    }
    return seq.__iteratorUncached(type, reverse);
  }

  function fromJS(json, converter) {
    return converter ?
      fromJSWith(converter, json, '', {'': json}) :
      fromJSDefault(json);
  }

  function fromJSWith(converter, json, key, parentJSON) {
    if (Array.isArray(json)) {
      return converter.call(parentJSON, key, IndexedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
    }
    if (isPlainObj(json)) {
      return converter.call(parentJSON, key, KeyedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
    }
    return json;
  }

  function fromJSDefault(json) {
    if (Array.isArray(json)) {
      return IndexedSeq(json).map(fromJSDefault).toList();
    }
    if (isPlainObj(json)) {
      return KeyedSeq(json).map(fromJSDefault).toMap();
    }
    return json;
  }

  function isPlainObj(value) {
    return value && (value.constructor === Object || value.constructor === undefined);
  }

  /**
   * An extension of the "same-value" algorithm as [described for use by ES6 Map
   * and Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Key_equality)
   *
   * NaN is considered the same as NaN, however -0 and 0 are considered the same
   * value, which is different from the algorithm described by
   * [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
   *
   * This is extended further to allow Objects to describe the values they
   * represent, by way of `valueOf` or `equals` (and `hashCode`).
   *
   * Note: because of this extension, the key equality of Immutable.Map and the
   * value equality of Immutable.Set will differ from ES6 Map and Set.
   *
   * ### Defining custom values
   *
   * The easiest way to describe the value an object represents is by implementing
   * `valueOf`. For example, `Date` represents a value by returning a unix
   * timestamp for `valueOf`:
   *
   *     var date1 = new Date(1234567890000); // Fri Feb 13 2009 ...
   *     var date2 = new Date(1234567890000);
   *     date1.valueOf(); // 1234567890000
   *     assert( date1 !== date2 );
   *     assert( Immutable.is( date1, date2 ) );
   *
   * Note: overriding `valueOf` may have other implications if you use this object
   * where JavaScript expects a primitive, such as implicit string coercion.
   *
   * For more complex types, especially collections, implementing `valueOf` may
   * not be performant. An alternative is to implement `equals` and `hashCode`.
   *
   * `equals` takes another object, presumably of similar type, and returns true
   * if the it is equal. Equality is symmetrical, so the same result should be
   * returned if this and the argument are flipped.
   *
   *     assert( a.equals(b) === b.equals(a) );
   *
   * `hashCode` returns a 32bit integer number representing the object which will
   * be used to determine how to store the value object in a Map or Set. You must
   * provide both or neither methods, one must not exist without the other.
   *
   * Also, an important relationship between these methods must be upheld: if two
   * values are equal, they *must* return the same hashCode. If the values are not
   * equal, they might have the same hashCode; this is called a hash collision,
   * and while undesirable for performance reasons, it is acceptable.
   *
   *     if (a.equals(b)) {
   *       assert( a.hashCode() === b.hashCode() );
   *     }
   *
   * All Immutable collections implement `equals` and `hashCode`.
   *
   */
  function is(valueA, valueB) {
    if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
      return true;
    }
    if (!valueA || !valueB) {
      return false;
    }
    if (typeof valueA.valueOf === 'function' &&
        typeof valueB.valueOf === 'function') {
      valueA = valueA.valueOf();
      valueB = valueB.valueOf();
      if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
        return true;
      }
      if (!valueA || !valueB) {
        return false;
      }
    }
    if (typeof valueA.equals === 'function' &&
        typeof valueB.equals === 'function' &&
        valueA.equals(valueB)) {
      return true;
    }
    return false;
  }

  function deepEqual(a, b) {
    if (a === b) {
      return true;
    }

    if (
      !isIterable(b) ||
      a.size !== undefined && b.size !== undefined && a.size !== b.size ||
      a.__hash !== undefined && b.__hash !== undefined && a.__hash !== b.__hash ||
      isKeyed(a) !== isKeyed(b) ||
      isIndexed(a) !== isIndexed(b) ||
      isOrdered(a) !== isOrdered(b)
    ) {
      return false;
    }

    if (a.size === 0 && b.size === 0) {
      return true;
    }

    var notAssociative = !isAssociative(a);

    if (isOrdered(a)) {
      var entries = a.entries();
      return b.every(function(v, k)  {
        var entry = entries.next().value;
        return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
      }) && entries.next().done;
    }

    var flipped = false;

    if (a.size === undefined) {
      if (b.size === undefined) {
        if (typeof a.cacheResult === 'function') {
          a.cacheResult();
        }
      } else {
        flipped = true;
        var _ = a;
        a = b;
        b = _;
      }
    }

    var allEqual = true;
    var bSize = b.__iterate(function(v, k)  {
      if (notAssociative ? !a.has(v) :
          flipped ? !is(v, a.get(k, NOT_SET)) : !is(a.get(k, NOT_SET), v)) {
        allEqual = false;
        return false;
      }
    });

    return allEqual && a.size === bSize;
  }

  createClass(Repeat, IndexedSeq);

    function Repeat(value, times) {
      if (!(this instanceof Repeat)) {
        return new Repeat(value, times);
      }
      this._value = value;
      this.size = times === undefined ? Infinity : Math.max(0, times);
      if (this.size === 0) {
        if (EMPTY_REPEAT) {
          return EMPTY_REPEAT;
        }
        EMPTY_REPEAT = this;
      }
    }

    Repeat.prototype.toString = function() {
      if (this.size === 0) {
        return 'Repeat []';
      }
      return 'Repeat [ ' + this._value + ' ' + this.size + ' times ]';
    };

    Repeat.prototype.get = function(index, notSetValue) {
      return this.has(index) ? this._value : notSetValue;
    };

    Repeat.prototype.includes = function(searchValue) {
      return is(this._value, searchValue);
    };

    Repeat.prototype.slice = function(begin, end) {
      var size = this.size;
      return wholeSlice(begin, end, size) ? this :
        new Repeat(this._value, resolveEnd(end, size) - resolveBegin(begin, size));
    };

    Repeat.prototype.reverse = function() {
      return this;
    };

    Repeat.prototype.indexOf = function(searchValue) {
      if (is(this._value, searchValue)) {
        return 0;
      }
      return -1;
    };

    Repeat.prototype.lastIndexOf = function(searchValue) {
      if (is(this._value, searchValue)) {
        return this.size;
      }
      return -1;
    };

    Repeat.prototype.__iterate = function(fn, reverse) {
      for (var ii = 0; ii < this.size; ii++) {
        if (fn(this._value, ii, this) === false) {
          return ii + 1;
        }
      }
      return ii;
    };

    Repeat.prototype.__iterator = function(type, reverse) {var this$0 = this;
      var ii = 0;
      return new Iterator(function() 
        {return ii < this$0.size ? iteratorValue(type, ii++, this$0._value) : iteratorDone()}
      );
    };

    Repeat.prototype.equals = function(other) {
      return other instanceof Repeat ?
        is(this._value, other._value) :
        deepEqual(other);
    };


  var EMPTY_REPEAT;

  function invariant(condition, error) {
    if (!condition) throw new Error(error);
  }

  createClass(Range, IndexedSeq);

    function Range(start, end, step) {
      if (!(this instanceof Range)) {
        return new Range(start, end, step);
      }
      invariant(step !== 0, 'Cannot step a Range by 0');
      start = start || 0;
      if (end === undefined) {
        end = Infinity;
      }
      step = step === undefined ? 1 : Math.abs(step);
      if (end < start) {
        step = -step;
      }
      this._start = start;
      this._end = end;
      this._step = step;
      this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
      if (this.size === 0) {
        if (EMPTY_RANGE) {
          return EMPTY_RANGE;
        }
        EMPTY_RANGE = this;
      }
    }

    Range.prototype.toString = function() {
      if (this.size === 0) {
        return 'Range []';
      }
      return 'Range [ ' +
        this._start + '...' + this._end +
        (this._step !== 1 ? ' by ' + this._step : '') +
      ' ]';
    };

    Range.prototype.get = function(index, notSetValue) {
      return this.has(index) ?
        this._start + wrapIndex(this, index) * this._step :
        notSetValue;
    };

    Range.prototype.includes = function(searchValue) {
      var possibleIndex = (searchValue - this._start) / this._step;
      return possibleIndex >= 0 &&
        possibleIndex < this.size &&
        possibleIndex === Math.floor(possibleIndex);
    };

    Range.prototype.slice = function(begin, end) {
      if (wholeSlice(begin, end, this.size)) {
        return this;
      }
      begin = resolveBegin(begin, this.size);
      end = resolveEnd(end, this.size);
      if (end <= begin) {
        return new Range(0, 0);
      }
      return new Range(this.get(begin, this._end), this.get(end, this._end), this._step);
    };

    Range.prototype.indexOf = function(searchValue) {
      var offsetValue = searchValue - this._start;
      if (offsetValue % this._step === 0) {
        var index = offsetValue / this._step;
        if (index >= 0 && index < this.size) {
          return index
        }
      }
      return -1;
    };

    Range.prototype.lastIndexOf = function(searchValue) {
      return this.indexOf(searchValue);
    };

    Range.prototype.__iterate = function(fn, reverse) {
      var maxIndex = this.size - 1;
      var step = this._step;
      var value = reverse ? this._start + maxIndex * step : this._start;
      for (var ii = 0; ii <= maxIndex; ii++) {
        if (fn(value, ii, this) === false) {
          return ii + 1;
        }
        value += reverse ? -step : step;
      }
      return ii;
    };

    Range.prototype.__iterator = function(type, reverse) {
      var maxIndex = this.size - 1;
      var step = this._step;
      var value = reverse ? this._start + maxIndex * step : this._start;
      var ii = 0;
      return new Iterator(function()  {
        var v = value;
        value += reverse ? -step : step;
        return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii++, v);
      });
    };

    Range.prototype.equals = function(other) {
      return other instanceof Range ?
        this._start === other._start &&
        this._end === other._end &&
        this._step === other._step :
        deepEqual(this, other);
    };


  var EMPTY_RANGE;

  createClass(Collection, Iterable);
    function Collection() {
      throw TypeError('Abstract');
    }


  createClass(KeyedCollection, Collection);function KeyedCollection() {}

  createClass(IndexedCollection, Collection);function IndexedCollection() {}

  createClass(SetCollection, Collection);function SetCollection() {}


  Collection.Keyed = KeyedCollection;
  Collection.Indexed = IndexedCollection;
  Collection.Set = SetCollection;

  var imul =
    typeof Math.imul === 'function' && Math.imul(0xffffffff, 2) === -2 ?
    Math.imul :
    function imul(a, b) {
      a = a | 0; // int
      b = b | 0; // int
      var c = a & 0xffff;
      var d = b & 0xffff;
      // Shift by 0 fixes the sign on the high part.
      return (c * d) + ((((a >>> 16) * d + c * (b >>> 16)) << 16) >>> 0) | 0; // int
    };

  // v8 has an optimization for storing 31-bit signed numbers.
  // Values which have either 00 or 11 as the high order bits qualify.
  // This function drops the highest order bit in a signed number, maintaining
  // the sign bit.
  function smi(i32) {
    return ((i32 >>> 1) & 0x40000000) | (i32 & 0xBFFFFFFF);
  }

  function hash(o) {
    if (o === false || o === null || o === undefined) {
      return 0;
    }
    if (typeof o.valueOf === 'function') {
      o = o.valueOf();
      if (o === false || o === null || o === undefined) {
        return 0;
      }
    }
    if (o === true) {
      return 1;
    }
    var type = typeof o;
    if (type === 'number') {
      if (o !== o || o === Infinity) {
        return 0;
      }
      var h = o | 0;
      if (h !== o) {
        h ^= o * 0xFFFFFFFF;
      }
      while (o > 0xFFFFFFFF) {
        o /= 0xFFFFFFFF;
        h ^= o;
      }
      return smi(h);
    }
    if (type === 'string') {
      return o.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(o) : hashString(o);
    }
    if (typeof o.hashCode === 'function') {
      return o.hashCode();
    }
    if (type === 'object') {
      return hashJSObj(o);
    }
    if (typeof o.toString === 'function') {
      return hashString(o.toString());
    }
    throw new Error('Value type ' + type + ' cannot be hashed.');
  }

  function cachedHashString(string) {
    var hash = stringHashCache[string];
    if (hash === undefined) {
      hash = hashString(string);
      if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
        STRING_HASH_CACHE_SIZE = 0;
        stringHashCache = {};
      }
      STRING_HASH_CACHE_SIZE++;
      stringHashCache[string] = hash;
    }
    return hash;
  }

  // http://jsperf.com/hashing-strings
  function hashString(string) {
    // This is the hash from JVM
    // The hash code for a string is computed as
    // s[0] * 31 ^ (n - 1) + s[1] * 31 ^ (n - 2) + ... + s[n - 1],
    // where s[i] is the ith character of the string and n is the length of
    // the string. We "mod" the result to make it between 0 (inclusive) and 2^31
    // (exclusive) by dropping high bits.
    var hash = 0;
    for (var ii = 0; ii < string.length; ii++) {
      hash = 31 * hash + string.charCodeAt(ii) | 0;
    }
    return smi(hash);
  }

  function hashJSObj(obj) {
    var hash;
    if (usingWeakMap) {
      hash = weakMap.get(obj);
      if (hash !== undefined) {
        return hash;
      }
    }

    hash = obj[UID_HASH_KEY];
    if (hash !== undefined) {
      return hash;
    }

    if (!canDefineProperty) {
      hash = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
      if (hash !== undefined) {
        return hash;
      }

      hash = getIENodeHash(obj);
      if (hash !== undefined) {
        return hash;
      }
    }

    hash = ++objHashUID;
    if (objHashUID & 0x40000000) {
      objHashUID = 0;
    }

    if (usingWeakMap) {
      weakMap.set(obj, hash);
    } else if (isExtensible !== undefined && isExtensible(obj) === false) {
      throw new Error('Non-extensible objects are not allowed as keys.');
    } else if (canDefineProperty) {
      Object.defineProperty(obj, UID_HASH_KEY, {
        'enumerable': false,
        'configurable': false,
        'writable': false,
        'value': hash
      });
    } else if (obj.propertyIsEnumerable !== undefined &&
               obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {
      // Since we can't define a non-enumerable property on the object
      // we'll hijack one of the less-used non-enumerable properties to
      // save our hash on it. Since this is a function it will not show up in
      // `JSON.stringify` which is what we want.
      obj.propertyIsEnumerable = function() {
        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
      };
      obj.propertyIsEnumerable[UID_HASH_KEY] = hash;
    } else if (obj.nodeType !== undefined) {
      // At this point we couldn't get the IE `uniqueID` to use as a hash
      // and we couldn't use a non-enumerable property to exploit the
      // dontEnum bug so we simply add the `UID_HASH_KEY` on the node
      // itself.
      obj[UID_HASH_KEY] = hash;
    } else {
      throw new Error('Unable to set a non-enumerable property on object.');
    }

    return hash;
  }

  // Get references to ES5 object methods.
  var isExtensible = Object.isExtensible;

  // True if Object.defineProperty works as expected. IE8 fails this test.
  var canDefineProperty = (function() {
    try {
      Object.defineProperty({}, '@', {});
      return true;
    } catch (e) {
      return false;
    }
  }());

  // IE has a `uniqueID` property on DOM nodes. We can construct the hash from it
  // and avoid memory leaks from the IE cloneNode bug.
  function getIENodeHash(node) {
    if (node && node.nodeType > 0) {
      switch (node.nodeType) {
        case 1: // Element
          return node.uniqueID;
        case 9: // Document
          return node.documentElement && node.documentElement.uniqueID;
      }
    }
  }

  // If possible, use a WeakMap.
  var usingWeakMap = typeof WeakMap === 'function';
  var weakMap;
  if (usingWeakMap) {
    weakMap = new WeakMap();
  }

  var objHashUID = 0;

  var UID_HASH_KEY = '__immutablehash__';
  if (typeof Symbol === 'function') {
    UID_HASH_KEY = Symbol(UID_HASH_KEY);
  }

  var STRING_HASH_CACHE_MIN_STRLEN = 16;
  var STRING_HASH_CACHE_MAX_SIZE = 255;
  var STRING_HASH_CACHE_SIZE = 0;
  var stringHashCache = {};

  function assertNotInfinite(size) {
    invariant(
      size !== Infinity,
      'Cannot perform this action with an infinite size.'
    );
  }

  createClass(Map, KeyedCollection);

    // @pragma Construction

    function Map(value) {
      return value === null || value === undefined ? emptyMap() :
        isMap(value) && !isOrdered(value) ? value :
        emptyMap().withMutations(function(map ) {
          var iter = KeyedIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v, k)  {return map.set(k, v)});
        });
    }

    Map.of = function() {var keyValues = SLICE$0.call(arguments, 0);
      return emptyMap().withMutations(function(map ) {
        for (var i = 0; i < keyValues.length; i += 2) {
          if (i + 1 >= keyValues.length) {
            throw new Error('Missing value for key: ' + keyValues[i]);
          }
          map.set(keyValues[i], keyValues[i + 1]);
        }
      });
    };

    Map.prototype.toString = function() {
      return this.__toString('Map {', '}');
    };

    // @pragma Access

    Map.prototype.get = function(k, notSetValue) {
      return this._root ?
        this._root.get(0, undefined, k, notSetValue) :
        notSetValue;
    };

    // @pragma Modification

    Map.prototype.set = function(k, v) {
      return updateMap(this, k, v);
    };

    Map.prototype.setIn = function(keyPath, v) {
      return this.updateIn(keyPath, NOT_SET, function()  {return v});
    };

    Map.prototype.remove = function(k) {
      return updateMap(this, k, NOT_SET);
    };

    Map.prototype.deleteIn = function(keyPath) {
      return this.updateIn(keyPath, function()  {return NOT_SET});
    };

    Map.prototype.update = function(k, notSetValue, updater) {
      return arguments.length === 1 ?
        k(this) :
        this.updateIn([k], notSetValue, updater);
    };

    Map.prototype.updateIn = function(keyPath, notSetValue, updater) {
      if (!updater) {
        updater = notSetValue;
        notSetValue = undefined;
      }
      var updatedValue = updateInDeepMap(
        this,
        forceIterator(keyPath),
        notSetValue,
        updater
      );
      return updatedValue === NOT_SET ? undefined : updatedValue;
    };

    Map.prototype.clear = function() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._root = null;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return emptyMap();
    };

    // @pragma Composition

    Map.prototype.merge = function(/*...iters*/) {
      return mergeIntoMapWith(this, undefined, arguments);
    };

    Map.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return mergeIntoMapWith(this, merger, iters);
    };

    Map.prototype.mergeIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
      return this.updateIn(
        keyPath,
        emptyMap(),
        function(m ) {return typeof m.merge === 'function' ?
          m.merge.apply(m, iters) :
          iters[iters.length - 1]}
      );
    };

    Map.prototype.mergeDeep = function(/*...iters*/) {
      return mergeIntoMapWith(this, deepMerger, arguments);
    };

    Map.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return mergeIntoMapWith(this, deepMergerWith(merger), iters);
    };

    Map.prototype.mergeDeepIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
      return this.updateIn(
        keyPath,
        emptyMap(),
        function(m ) {return typeof m.mergeDeep === 'function' ?
          m.mergeDeep.apply(m, iters) :
          iters[iters.length - 1]}
      );
    };

    Map.prototype.sort = function(comparator) {
      // Late binding
      return OrderedMap(sortFactory(this, comparator));
    };

    Map.prototype.sortBy = function(mapper, comparator) {
      // Late binding
      return OrderedMap(sortFactory(this, comparator, mapper));
    };

    // @pragma Mutability

    Map.prototype.withMutations = function(fn) {
      var mutable = this.asMutable();
      fn(mutable);
      return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
    };

    Map.prototype.asMutable = function() {
      return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
    };

    Map.prototype.asImmutable = function() {
      return this.__ensureOwner();
    };

    Map.prototype.wasAltered = function() {
      return this.__altered;
    };

    Map.prototype.__iterator = function(type, reverse) {
      return new MapIterator(this, type, reverse);
    };

    Map.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      var iterations = 0;
      this._root && this._root.iterate(function(entry ) {
        iterations++;
        return fn(entry[1], entry[0], this$0);
      }, reverse);
      return iterations;
    };

    Map.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        this.__ownerID = ownerID;
        this.__altered = false;
        return this;
      }
      return makeMap(this.size, this._root, ownerID, this.__hash);
    };


  function isMap(maybeMap) {
    return !!(maybeMap && maybeMap[IS_MAP_SENTINEL]);
  }

  Map.isMap = isMap;

  var IS_MAP_SENTINEL = '@@__IMMUTABLE_MAP__@@';

  var MapPrototype = Map.prototype;
  MapPrototype[IS_MAP_SENTINEL] = true;
  MapPrototype[DELETE] = MapPrototype.remove;
  MapPrototype.removeIn = MapPrototype.deleteIn;


  // #pragma Trie Nodes



    function ArrayMapNode(ownerID, entries) {
      this.ownerID = ownerID;
      this.entries = entries;
    }

    ArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      var entries = this.entries;
      for (var ii = 0, len = entries.length; ii < len; ii++) {
        if (is(key, entries[ii][0])) {
          return entries[ii][1];
        }
      }
      return notSetValue;
    };

    ArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      var removed = value === NOT_SET;

      var entries = this.entries;
      var idx = 0;
      for (var len = entries.length; idx < len; idx++) {
        if (is(key, entries[idx][0])) {
          break;
        }
      }
      var exists = idx < len;

      if (exists ? entries[idx][1] === value : removed) {
        return this;
      }

      SetRef(didAlter);
      (removed || !exists) && SetRef(didChangeSize);

      if (removed && entries.length === 1) {
        return; // undefined
      }

      if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) {
        return createNodes(ownerID, entries, key, value);
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newEntries = isEditable ? entries : arrCopy(entries);

      if (exists) {
        if (removed) {
          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
        } else {
          newEntries[idx] = [key, value];
        }
      } else {
        newEntries.push([key, value]);
      }

      if (isEditable) {
        this.entries = newEntries;
        return this;
      }

      return new ArrayMapNode(ownerID, newEntries);
    };




    function BitmapIndexedNode(ownerID, bitmap, nodes) {
      this.ownerID = ownerID;
      this.bitmap = bitmap;
      this.nodes = nodes;
    }

    BitmapIndexedNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var bit = (1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK));
      var bitmap = this.bitmap;
      return (bitmap & bit) === 0 ? notSetValue :
        this.nodes[popCount(bitmap & (bit - 1))].get(shift + SHIFT, keyHash, key, notSetValue);
    };

    BitmapIndexedNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
      var bit = 1 << keyHashFrag;
      var bitmap = this.bitmap;
      var exists = (bitmap & bit) !== 0;

      if (!exists && value === NOT_SET) {
        return this;
      }

      var idx = popCount(bitmap & (bit - 1));
      var nodes = this.nodes;
      var node = exists ? nodes[idx] : undefined;
      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);

      if (newNode === node) {
        return this;
      }

      if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
        return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
      }

      if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {
        return nodes[idx ^ 1];
      }

      if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
        return newNode;
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
      var newNodes = exists ? newNode ?
        setIn(nodes, idx, newNode, isEditable) :
        spliceOut(nodes, idx, isEditable) :
        spliceIn(nodes, idx, newNode, isEditable);

      if (isEditable) {
        this.bitmap = newBitmap;
        this.nodes = newNodes;
        return this;
      }

      return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
    };




    function HashArrayMapNode(ownerID, count, nodes) {
      this.ownerID = ownerID;
      this.count = count;
      this.nodes = nodes;
    }

    HashArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
      var node = this.nodes[idx];
      return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
    };

    HashArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
      var removed = value === NOT_SET;
      var nodes = this.nodes;
      var node = nodes[idx];

      if (removed && !node) {
        return this;
      }

      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);
      if (newNode === node) {
        return this;
      }

      var newCount = this.count;
      if (!node) {
        newCount++;
      } else if (!newNode) {
        newCount--;
        if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
          return packNodes(ownerID, nodes, newCount, idx);
        }
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newNodes = setIn(nodes, idx, newNode, isEditable);

      if (isEditable) {
        this.count = newCount;
        this.nodes = newNodes;
        return this;
      }

      return new HashArrayMapNode(ownerID, newCount, newNodes);
    };




    function HashCollisionNode(ownerID, keyHash, entries) {
      this.ownerID = ownerID;
      this.keyHash = keyHash;
      this.entries = entries;
    }

    HashCollisionNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      var entries = this.entries;
      for (var ii = 0, len = entries.length; ii < len; ii++) {
        if (is(key, entries[ii][0])) {
          return entries[ii][1];
        }
      }
      return notSetValue;
    };

    HashCollisionNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }

      var removed = value === NOT_SET;

      if (keyHash !== this.keyHash) {
        if (removed) {
          return this;
        }
        SetRef(didAlter);
        SetRef(didChangeSize);
        return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
      }

      var entries = this.entries;
      var idx = 0;
      for (var len = entries.length; idx < len; idx++) {
        if (is(key, entries[idx][0])) {
          break;
        }
      }
      var exists = idx < len;

      if (exists ? entries[idx][1] === value : removed) {
        return this;
      }

      SetRef(didAlter);
      (removed || !exists) && SetRef(didChangeSize);

      if (removed && len === 2) {
        return new ValueNode(ownerID, this.keyHash, entries[idx ^ 1]);
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newEntries = isEditable ? entries : arrCopy(entries);

      if (exists) {
        if (removed) {
          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
        } else {
          newEntries[idx] = [key, value];
        }
      } else {
        newEntries.push([key, value]);
      }

      if (isEditable) {
        this.entries = newEntries;
        return this;
      }

      return new HashCollisionNode(ownerID, this.keyHash, newEntries);
    };




    function ValueNode(ownerID, keyHash, entry) {
      this.ownerID = ownerID;
      this.keyHash = keyHash;
      this.entry = entry;
    }

    ValueNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
    };

    ValueNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      var removed = value === NOT_SET;
      var keyMatch = is(key, this.entry[0]);
      if (keyMatch ? value === this.entry[1] : removed) {
        return this;
      }

      SetRef(didAlter);

      if (removed) {
        SetRef(didChangeSize);
        return; // undefined
      }

      if (keyMatch) {
        if (ownerID && ownerID === this.ownerID) {
          this.entry[1] = value;
          return this;
        }
        return new ValueNode(ownerID, this.keyHash, [key, value]);
      }

      SetRef(didChangeSize);
      return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
    };



  // #pragma Iterators

  ArrayMapNode.prototype.iterate =
  HashCollisionNode.prototype.iterate = function (fn, reverse) {
    var entries = this.entries;
    for (var ii = 0, maxIndex = entries.length - 1; ii <= maxIndex; ii++) {
      if (fn(entries[reverse ? maxIndex - ii : ii]) === false) {
        return false;
      }
    }
  }

  BitmapIndexedNode.prototype.iterate =
  HashArrayMapNode.prototype.iterate = function (fn, reverse) {
    var nodes = this.nodes;
    for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
      var node = nodes[reverse ? maxIndex - ii : ii];
      if (node && node.iterate(fn, reverse) === false) {
        return false;
      }
    }
  }

  ValueNode.prototype.iterate = function (fn, reverse) {
    return fn(this.entry);
  }

  createClass(MapIterator, Iterator);

    function MapIterator(map, type, reverse) {
      this._type = type;
      this._reverse = reverse;
      this._stack = map._root && mapIteratorFrame(map._root);
    }

    MapIterator.prototype.next = function() {
      var type = this._type;
      var stack = this._stack;
      while (stack) {
        var node = stack.node;
        var index = stack.index++;
        var maxIndex;
        if (node.entry) {
          if (index === 0) {
            return mapIteratorValue(type, node.entry);
          }
        } else if (node.entries) {
          maxIndex = node.entries.length - 1;
          if (index <= maxIndex) {
            return mapIteratorValue(type, node.entries[this._reverse ? maxIndex - index : index]);
          }
        } else {
          maxIndex = node.nodes.length - 1;
          if (index <= maxIndex) {
            var subNode = node.nodes[this._reverse ? maxIndex - index : index];
            if (subNode) {
              if (subNode.entry) {
                return mapIteratorValue(type, subNode.entry);
              }
              stack = this._stack = mapIteratorFrame(subNode, stack);
            }
            continue;
          }
        }
        stack = this._stack = this._stack.__prev;
      }
      return iteratorDone();
    };


  function mapIteratorValue(type, entry) {
    return iteratorValue(type, entry[0], entry[1]);
  }

  function mapIteratorFrame(node, prev) {
    return {
      node: node,
      index: 0,
      __prev: prev
    };
  }

  function makeMap(size, root, ownerID, hash) {
    var map = Object.create(MapPrototype);
    map.size = size;
    map._root = root;
    map.__ownerID = ownerID;
    map.__hash = hash;
    map.__altered = false;
    return map;
  }

  var EMPTY_MAP;
  function emptyMap() {
    return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
  }

  function updateMap(map, k, v) {
    var newRoot;
    var newSize;
    if (!map._root) {
      if (v === NOT_SET) {
        return map;
      }
      newSize = 1;
      newRoot = new ArrayMapNode(map.__ownerID, [[k, v]]);
    } else {
      var didChangeSize = MakeRef(CHANGE_LENGTH);
      var didAlter = MakeRef(DID_ALTER);
      newRoot = updateNode(map._root, map.__ownerID, 0, undefined, k, v, didChangeSize, didAlter);
      if (!didAlter.value) {
        return map;
      }
      newSize = map.size + (didChangeSize.value ? v === NOT_SET ? -1 : 1 : 0);
    }
    if (map.__ownerID) {
      map.size = newSize;
      map._root = newRoot;
      map.__hash = undefined;
      map.__altered = true;
      return map;
    }
    return newRoot ? makeMap(newSize, newRoot) : emptyMap();
  }

  function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    if (!node) {
      if (value === NOT_SET) {
        return node;
      }
      SetRef(didAlter);
      SetRef(didChangeSize);
      return new ValueNode(ownerID, keyHash, [key, value]);
    }
    return node.update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter);
  }

  function isLeafNode(node) {
    return node.constructor === ValueNode || node.constructor === HashCollisionNode;
  }

  function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
    if (node.keyHash === keyHash) {
      return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
    }

    var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
    var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;

    var newNode;
    var nodes = idx1 === idx2 ?
      [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] :
      ((newNode = new ValueNode(ownerID, keyHash, entry)), idx1 < idx2 ? [node, newNode] : [newNode, node]);

    return new BitmapIndexedNode(ownerID, (1 << idx1) | (1 << idx2), nodes);
  }

  function createNodes(ownerID, entries, key, value) {
    if (!ownerID) {
      ownerID = new OwnerID();
    }
    var node = new ValueNode(ownerID, hash(key), [key, value]);
    for (var ii = 0; ii < entries.length; ii++) {
      var entry = entries[ii];
      node = node.update(ownerID, 0, undefined, entry[0], entry[1]);
    }
    return node;
  }

  function packNodes(ownerID, nodes, count, excluding) {
    var bitmap = 0;
    var packedII = 0;
    var packedNodes = new Array(count);
    for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
      var node = nodes[ii];
      if (node !== undefined && ii !== excluding) {
        bitmap |= bit;
        packedNodes[packedII++] = node;
      }
    }
    return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
  }

  function expandNodes(ownerID, nodes, bitmap, including, node) {
    var count = 0;
    var expandedNodes = new Array(SIZE);
    for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
      expandedNodes[ii] = bitmap & 1 ? nodes[count++] : undefined;
    }
    expandedNodes[including] = node;
    return new HashArrayMapNode(ownerID, count + 1, expandedNodes);
  }

  function mergeIntoMapWith(map, merger, iterables) {
    var iters = [];
    for (var ii = 0; ii < iterables.length; ii++) {
      var value = iterables[ii];
      var iter = KeyedIterable(value);
      if (!isIterable(value)) {
        iter = iter.map(function(v ) {return fromJS(v)});
      }
      iters.push(iter);
    }
    return mergeIntoCollectionWith(map, merger, iters);
  }

  function deepMerger(existing, value, key) {
    return existing && existing.mergeDeep && isIterable(value) ?
      existing.mergeDeep(value) :
      is(existing, value) ? existing : value;
  }

  function deepMergerWith(merger) {
    return function(existing, value, key)  {
      if (existing && existing.mergeDeepWith && isIterable(value)) {
        return existing.mergeDeepWith(merger, value);
      }
      var nextValue = merger(existing, value, key);
      return is(existing, nextValue) ? existing : nextValue;
    };
  }

  function mergeIntoCollectionWith(collection, merger, iters) {
    iters = iters.filter(function(x ) {return x.size !== 0});
    if (iters.length === 0) {
      return collection;
    }
    if (collection.size === 0 && !collection.__ownerID && iters.length === 1) {
      return collection.constructor(iters[0]);
    }
    return collection.withMutations(function(collection ) {
      var mergeIntoMap = merger ?
        function(value, key)  {
          collection.update(key, NOT_SET, function(existing )
            {return existing === NOT_SET ? value : merger(existing, value, key)}
          );
        } :
        function(value, key)  {
          collection.set(key, value);
        }
      for (var ii = 0; ii < iters.length; ii++) {
        iters[ii].forEach(mergeIntoMap);
      }
    });
  }

  function updateInDeepMap(existing, keyPathIter, notSetValue, updater) {
    var isNotSet = existing === NOT_SET;
    var step = keyPathIter.next();
    if (step.done) {
      var existingValue = isNotSet ? notSetValue : existing;
      var newValue = updater(existingValue);
      return newValue === existingValue ? existing : newValue;
    }
    invariant(
      isNotSet || (existing && existing.set),
      'invalid keyPath'
    );
    var key = step.value;
    var nextExisting = isNotSet ? NOT_SET : existing.get(key, NOT_SET);
    var nextUpdated = updateInDeepMap(
      nextExisting,
      keyPathIter,
      notSetValue,
      updater
    );
    return nextUpdated === nextExisting ? existing :
      nextUpdated === NOT_SET ? existing.remove(key) :
      (isNotSet ? emptyMap() : existing).set(key, nextUpdated);
  }

  function popCount(x) {
    x = x - ((x >> 1) & 0x55555555);
    x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
    x = (x + (x >> 4)) & 0x0f0f0f0f;
    x = x + (x >> 8);
    x = x + (x >> 16);
    return x & 0x7f;
  }

  function setIn(array, idx, val, canEdit) {
    var newArray = canEdit ? array : arrCopy(array);
    newArray[idx] = val;
    return newArray;
  }

  function spliceIn(array, idx, val, canEdit) {
    var newLen = array.length + 1;
    if (canEdit && idx + 1 === newLen) {
      array[idx] = val;
      return array;
    }
    var newArray = new Array(newLen);
    var after = 0;
    for (var ii = 0; ii < newLen; ii++) {
      if (ii === idx) {
        newArray[ii] = val;
        after = -1;
      } else {
        newArray[ii] = array[ii + after];
      }
    }
    return newArray;
  }

  function spliceOut(array, idx, canEdit) {
    var newLen = array.length - 1;
    if (canEdit && idx === newLen) {
      array.pop();
      return array;
    }
    var newArray = new Array(newLen);
    var after = 0;
    for (var ii = 0; ii < newLen; ii++) {
      if (ii === idx) {
        after = 1;
      }
      newArray[ii] = array[ii + after];
    }
    return newArray;
  }

  var MAX_ARRAY_MAP_SIZE = SIZE / 4;
  var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
  var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;

  createClass(List, IndexedCollection);

    // @pragma Construction

    function List(value) {
      var empty = emptyList();
      if (value === null || value === undefined) {
        return empty;
      }
      if (isList(value)) {
        return value;
      }
      var iter = IndexedIterable(value);
      var size = iter.size;
      if (size === 0) {
        return empty;
      }
      assertNotInfinite(size);
      if (size > 0 && size < SIZE) {
        return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
      }
      return empty.withMutations(function(list ) {
        list.setSize(size);
        iter.forEach(function(v, i)  {return list.set(i, v)});
      });
    }

    List.of = function(/*...values*/) {
      return this(arguments);
    };

    List.prototype.toString = function() {
      return this.__toString('List [', ']');
    };

    // @pragma Access

    List.prototype.get = function(index, notSetValue) {
      index = wrapIndex(this, index);
      if (index >= 0 && index < this.size) {
        index += this._origin;
        var node = listNodeFor(this, index);
        return node && node.array[index & MASK];
      }
      return notSetValue;
    };

    // @pragma Modification

    List.prototype.set = function(index, value) {
      return updateList(this, index, value);
    };

    List.prototype.remove = function(index) {
      return !this.has(index) ? this :
        index === 0 ? this.shift() :
        index === this.size - 1 ? this.pop() :
        this.splice(index, 1);
    };

    List.prototype.insert = function(index, value) {
      return this.splice(index, 0, value);
    };

    List.prototype.clear = function() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = this._origin = this._capacity = 0;
        this._level = SHIFT;
        this._root = this._tail = null;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return emptyList();
    };

    List.prototype.push = function(/*...values*/) {
      var values = arguments;
      var oldSize = this.size;
      return this.withMutations(function(list ) {
        setListBounds(list, 0, oldSize + values.length);
        for (var ii = 0; ii < values.length; ii++) {
          list.set(oldSize + ii, values[ii]);
        }
      });
    };

    List.prototype.pop = function() {
      return setListBounds(this, 0, -1);
    };

    List.prototype.unshift = function(/*...values*/) {
      var values = arguments;
      return this.withMutations(function(list ) {
        setListBounds(list, -values.length);
        for (var ii = 0; ii < values.length; ii++) {
          list.set(ii, values[ii]);
        }
      });
    };

    List.prototype.shift = function() {
      return setListBounds(this, 1);
    };

    // @pragma Composition

    List.prototype.merge = function(/*...iters*/) {
      return mergeIntoListWith(this, undefined, arguments);
    };

    List.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return mergeIntoListWith(this, merger, iters);
    };

    List.prototype.mergeDeep = function(/*...iters*/) {
      return mergeIntoListWith(this, deepMerger, arguments);
    };

    List.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return mergeIntoListWith(this, deepMergerWith(merger), iters);
    };

    List.prototype.setSize = function(size) {
      return setListBounds(this, 0, size);
    };

    // @pragma Iteration

    List.prototype.slice = function(begin, end) {
      var size = this.size;
      if (wholeSlice(begin, end, size)) {
        return this;
      }
      return setListBounds(
        this,
        resolveBegin(begin, size),
        resolveEnd(end, size)
      );
    };

    List.prototype.__iterator = function(type, reverse) {
      var index = 0;
      var values = iterateList(this, reverse);
      return new Iterator(function()  {
        var value = values();
        return value === DONE ?
          iteratorDone() :
          iteratorValue(type, index++, value);
      });
    };

    List.prototype.__iterate = function(fn, reverse) {
      var index = 0;
      var values = iterateList(this, reverse);
      var value;
      while ((value = values()) !== DONE) {
        if (fn(value, index++, this) === false) {
          break;
        }
      }
      return index;
    };

    List.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        this.__ownerID = ownerID;
        return this;
      }
      return makeList(this._origin, this._capacity, this._level, this._root, this._tail, ownerID, this.__hash);
    };


  function isList(maybeList) {
    return !!(maybeList && maybeList[IS_LIST_SENTINEL]);
  }

  List.isList = isList;

  var IS_LIST_SENTINEL = '@@__IMMUTABLE_LIST__@@';

  var ListPrototype = List.prototype;
  ListPrototype[IS_LIST_SENTINEL] = true;
  ListPrototype[DELETE] = ListPrototype.remove;
  ListPrototype.setIn = MapPrototype.setIn;
  ListPrototype.deleteIn =
  ListPrototype.removeIn = MapPrototype.removeIn;
  ListPrototype.update = MapPrototype.update;
  ListPrototype.updateIn = MapPrototype.updateIn;
  ListPrototype.mergeIn = MapPrototype.mergeIn;
  ListPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
  ListPrototype.withMutations = MapPrototype.withMutations;
  ListPrototype.asMutable = MapPrototype.asMutable;
  ListPrototype.asImmutable = MapPrototype.asImmutable;
  ListPrototype.wasAltered = MapPrototype.wasAltered;



    function VNode(array, ownerID) {
      this.array = array;
      this.ownerID = ownerID;
    }

    // TODO: seems like these methods are very similar

    VNode.prototype.removeBefore = function(ownerID, level, index) {
      if (index === level ? 1 << level : 0 || this.array.length === 0) {
        return this;
      }
      var originIndex = (index >>> level) & MASK;
      if (originIndex >= this.array.length) {
        return new VNode([], ownerID);
      }
      var removingFirst = originIndex === 0;
      var newChild;
      if (level > 0) {
        var oldChild = this.array[originIndex];
        newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
        if (newChild === oldChild && removingFirst) {
          return this;
        }
      }
      if (removingFirst && !newChild) {
        return this;
      }
      var editable = editableVNode(this, ownerID);
      if (!removingFirst) {
        for (var ii = 0; ii < originIndex; ii++) {
          editable.array[ii] = undefined;
        }
      }
      if (newChild) {
        editable.array[originIndex] = newChild;
      }
      return editable;
    };

    VNode.prototype.removeAfter = function(ownerID, level, index) {
      if (index === (level ? 1 << level : 0) || this.array.length === 0) {
        return this;
      }
      var sizeIndex = ((index - 1) >>> level) & MASK;
      if (sizeIndex >= this.array.length) {
        return this;
      }

      var newChild;
      if (level > 0) {
        var oldChild = this.array[sizeIndex];
        newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
        if (newChild === oldChild && sizeIndex === this.array.length - 1) {
          return this;
        }
      }

      var editable = editableVNode(this, ownerID);
      editable.array.splice(sizeIndex + 1);
      if (newChild) {
        editable.array[sizeIndex] = newChild;
      }
      return editable;
    };



  var DONE = {};

  function iterateList(list, reverse) {
    var left = list._origin;
    var right = list._capacity;
    var tailPos = getTailOffset(right);
    var tail = list._tail;

    return iterateNodeOrLeaf(list._root, list._level, 0);

    function iterateNodeOrLeaf(node, level, offset) {
      return level === 0 ?
        iterateLeaf(node, offset) :
        iterateNode(node, level, offset);
    }

    function iterateLeaf(node, offset) {
      var array = offset === tailPos ? tail && tail.array : node && node.array;
      var from = offset > left ? 0 : left - offset;
      var to = right - offset;
      if (to > SIZE) {
        to = SIZE;
      }
      return function()  {
        if (from === to) {
          return DONE;
        }
        var idx = reverse ? --to : from++;
        return array && array[idx];
      };
    }

    function iterateNode(node, level, offset) {
      var values;
      var array = node && node.array;
      var from = offset > left ? 0 : (left - offset) >> level;
      var to = ((right - offset) >> level) + 1;
      if (to > SIZE) {
        to = SIZE;
      }
      return function()  {
        do {
          if (values) {
            var value = values();
            if (value !== DONE) {
              return value;
            }
            values = null;
          }
          if (from === to) {
            return DONE;
          }
          var idx = reverse ? --to : from++;
          values = iterateNodeOrLeaf(
            array && array[idx], level - SHIFT, offset + (idx << level)
          );
        } while (true);
      };
    }
  }

  function makeList(origin, capacity, level, root, tail, ownerID, hash) {
    var list = Object.create(ListPrototype);
    list.size = capacity - origin;
    list._origin = origin;
    list._capacity = capacity;
    list._level = level;
    list._root = root;
    list._tail = tail;
    list.__ownerID = ownerID;
    list.__hash = hash;
    list.__altered = false;
    return list;
  }

  var EMPTY_LIST;
  function emptyList() {
    return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
  }

  function updateList(list, index, value) {
    index = wrapIndex(list, index);

    if (index !== index) {
      return list;
    }

    if (index >= list.size || index < 0) {
      return list.withMutations(function(list ) {
        index < 0 ?
          setListBounds(list, index).set(0, value) :
          setListBounds(list, 0, index + 1).set(index, value)
      });
    }

    index += list._origin;

    var newTail = list._tail;
    var newRoot = list._root;
    var didAlter = MakeRef(DID_ALTER);
    if (index >= getTailOffset(list._capacity)) {
      newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
    } else {
      newRoot = updateVNode(newRoot, list.__ownerID, list._level, index, value, didAlter);
    }

    if (!didAlter.value) {
      return list;
    }

    if (list.__ownerID) {
      list._root = newRoot;
      list._tail = newTail;
      list.__hash = undefined;
      list.__altered = true;
      return list;
    }
    return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
  }

  function updateVNode(node, ownerID, level, index, value, didAlter) {
    var idx = (index >>> level) & MASK;
    var nodeHas = node && idx < node.array.length;
    if (!nodeHas && value === undefined) {
      return node;
    }

    var newNode;

    if (level > 0) {
      var lowerNode = node && node.array[idx];
      var newLowerNode = updateVNode(lowerNode, ownerID, level - SHIFT, index, value, didAlter);
      if (newLowerNode === lowerNode) {
        return node;
      }
      newNode = editableVNode(node, ownerID);
      newNode.array[idx] = newLowerNode;
      return newNode;
    }

    if (nodeHas && node.array[idx] === value) {
      return node;
    }

    SetRef(didAlter);

    newNode = editableVNode(node, ownerID);
    if (value === undefined && idx === newNode.array.length - 1) {
      newNode.array.pop();
    } else {
      newNode.array[idx] = value;
    }
    return newNode;
  }

  function editableVNode(node, ownerID) {
    if (ownerID && node && ownerID === node.ownerID) {
      return node;
    }
    return new VNode(node ? node.array.slice() : [], ownerID);
  }

  function listNodeFor(list, rawIndex) {
    if (rawIndex >= getTailOffset(list._capacity)) {
      return list._tail;
    }
    if (rawIndex < 1 << (list._level + SHIFT)) {
      var node = list._root;
      var level = list._level;
      while (node && level > 0) {
        node = node.array[(rawIndex >>> level) & MASK];
        level -= SHIFT;
      }
      return node;
    }
  }

  function setListBounds(list, begin, end) {
    // Sanitize begin & end using this shorthand for ToInt32(argument)
    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
    if (begin !== undefined) {
      begin = begin | 0;
    }
    if (end !== undefined) {
      end = end | 0;
    }
    var owner = list.__ownerID || new OwnerID();
    var oldOrigin = list._origin;
    var oldCapacity = list._capacity;
    var newOrigin = oldOrigin + begin;
    var newCapacity = end === undefined ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;
    if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
      return list;
    }

    // If it's going to end after it starts, it's empty.
    if (newOrigin >= newCapacity) {
      return list.clear();
    }

    var newLevel = list._level;
    var newRoot = list._root;

    // New origin might need creating a higher root.
    var offsetShift = 0;
    while (newOrigin + offsetShift < 0) {
      newRoot = new VNode(newRoot && newRoot.array.length ? [undefined, newRoot] : [], owner);
      newLevel += SHIFT;
      offsetShift += 1 << newLevel;
    }
    if (offsetShift) {
      newOrigin += offsetShift;
      oldOrigin += offsetShift;
      newCapacity += offsetShift;
      oldCapacity += offsetShift;
    }

    var oldTailOffset = getTailOffset(oldCapacity);
    var newTailOffset = getTailOffset(newCapacity);

    // New size might need creating a higher root.
    while (newTailOffset >= 1 << (newLevel + SHIFT)) {
      newRoot = new VNode(newRoot && newRoot.array.length ? [newRoot] : [], owner);
      newLevel += SHIFT;
    }

    // Locate or create the new tail.
    var oldTail = list._tail;
    var newTail = newTailOffset < oldTailOffset ?
      listNodeFor(list, newCapacity - 1) :
      newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;

    // Merge Tail into tree.
    if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {
      newRoot = editableVNode(newRoot, owner);
      var node = newRoot;
      for (var level = newLevel; level > SHIFT; level -= SHIFT) {
        var idx = (oldTailOffset >>> level) & MASK;
        node = node.array[idx] = editableVNode(node.array[idx], owner);
      }
      node.array[(oldTailOffset >>> SHIFT) & MASK] = oldTail;
    }

    // If the size has been reduced, there's a chance the tail needs to be trimmed.
    if (newCapacity < oldCapacity) {
      newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
    }

    // If the new origin is within the tail, then we do not need a root.
    if (newOrigin >= newTailOffset) {
      newOrigin -= newTailOffset;
      newCapacity -= newTailOffset;
      newLevel = SHIFT;
      newRoot = null;
      newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);

    // Otherwise, if the root has been trimmed, garbage collect.
    } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
      offsetShift = 0;

      // Identify the new top root node of the subtree of the old root.
      while (newRoot) {
        var beginIndex = (newOrigin >>> newLevel) & MASK;
        if (beginIndex !== (newTailOffset >>> newLevel) & MASK) {
          break;
        }
        if (beginIndex) {
          offsetShift += (1 << newLevel) * beginIndex;
        }
        newLevel -= SHIFT;
        newRoot = newRoot.array[beginIndex];
      }

      // Trim the new sides of the new root.
      if (newRoot && newOrigin > oldOrigin) {
        newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
      }
      if (newRoot && newTailOffset < oldTailOffset) {
        newRoot = newRoot.removeAfter(owner, newLevel, newTailOffset - offsetShift);
      }
      if (offsetShift) {
        newOrigin -= offsetShift;
        newCapacity -= offsetShift;
      }
    }

    if (list.__ownerID) {
      list.size = newCapacity - newOrigin;
      list._origin = newOrigin;
      list._capacity = newCapacity;
      list._level = newLevel;
      list._root = newRoot;
      list._tail = newTail;
      list.__hash = undefined;
      list.__altered = true;
      return list;
    }
    return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
  }

  function mergeIntoListWith(list, merger, iterables) {
    var iters = [];
    var maxSize = 0;
    for (var ii = 0; ii < iterables.length; ii++) {
      var value = iterables[ii];
      var iter = IndexedIterable(value);
      if (iter.size > maxSize) {
        maxSize = iter.size;
      }
      if (!isIterable(value)) {
        iter = iter.map(function(v ) {return fromJS(v)});
      }
      iters.push(iter);
    }
    if (maxSize > list.size) {
      list = list.setSize(maxSize);
    }
    return mergeIntoCollectionWith(list, merger, iters);
  }

  function getTailOffset(size) {
    return size < SIZE ? 0 : (((size - 1) >>> SHIFT) << SHIFT);
  }

  createClass(OrderedMap, Map);

    // @pragma Construction

    function OrderedMap(value) {
      return value === null || value === undefined ? emptyOrderedMap() :
        isOrderedMap(value) ? value :
        emptyOrderedMap().withMutations(function(map ) {
          var iter = KeyedIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v, k)  {return map.set(k, v)});
        });
    }

    OrderedMap.of = function(/*...values*/) {
      return this(arguments);
    };

    OrderedMap.prototype.toString = function() {
      return this.__toString('OrderedMap {', '}');
    };

    // @pragma Access

    OrderedMap.prototype.get = function(k, notSetValue) {
      var index = this._map.get(k);
      return index !== undefined ? this._list.get(index)[1] : notSetValue;
    };

    // @pragma Modification

    OrderedMap.prototype.clear = function() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._map.clear();
        this._list.clear();
        return this;
      }
      return emptyOrderedMap();
    };

    OrderedMap.prototype.set = function(k, v) {
      return updateOrderedMap(this, k, v);
    };

    OrderedMap.prototype.remove = function(k) {
      return updateOrderedMap(this, k, NOT_SET);
    };

    OrderedMap.prototype.wasAltered = function() {
      return this._map.wasAltered() || this._list.wasAltered();
    };

    OrderedMap.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return this._list.__iterate(
        function(entry ) {return entry && fn(entry[1], entry[0], this$0)},
        reverse
      );
    };

    OrderedMap.prototype.__iterator = function(type, reverse) {
      return this._list.fromEntrySeq().__iterator(type, reverse);
    };

    OrderedMap.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      var newMap = this._map.__ensureOwner(ownerID);
      var newList = this._list.__ensureOwner(ownerID);
      if (!ownerID) {
        this.__ownerID = ownerID;
        this._map = newMap;
        this._list = newList;
        return this;
      }
      return makeOrderedMap(newMap, newList, ownerID, this.__hash);
    };


  function isOrderedMap(maybeOrderedMap) {
    return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
  }

  OrderedMap.isOrderedMap = isOrderedMap;

  OrderedMap.prototype[IS_ORDERED_SENTINEL] = true;
  OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;



  function makeOrderedMap(map, list, ownerID, hash) {
    var omap = Object.create(OrderedMap.prototype);
    omap.size = map ? map.size : 0;
    omap._map = map;
    omap._list = list;
    omap.__ownerID = ownerID;
    omap.__hash = hash;
    return omap;
  }

  var EMPTY_ORDERED_MAP;
  function emptyOrderedMap() {
    return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
  }

  function updateOrderedMap(omap, k, v) {
    var map = omap._map;
    var list = omap._list;
    var i = map.get(k);
    var has = i !== undefined;
    var newMap;
    var newList;
    if (v === NOT_SET) { // removed
      if (!has) {
        return omap;
      }
      if (list.size >= SIZE && list.size >= map.size * 2) {
        newList = list.filter(function(entry, idx)  {return entry !== undefined && i !== idx});
        newMap = newList.toKeyedSeq().map(function(entry ) {return entry[0]}).flip().toMap();
        if (omap.__ownerID) {
          newMap.__ownerID = newList.__ownerID = omap.__ownerID;
        }
      } else {
        newMap = map.remove(k);
        newList = i === list.size - 1 ? list.pop() : list.set(i, undefined);
      }
    } else {
      if (has) {
        if (v === list.get(i)[1]) {
          return omap;
        }
        newMap = map;
        newList = list.set(i, [k, v]);
      } else {
        newMap = map.set(k, list.size);
        newList = list.set(list.size, [k, v]);
      }
    }
    if (omap.__ownerID) {
      omap.size = newMap.size;
      omap._map = newMap;
      omap._list = newList;
      omap.__hash = undefined;
      return omap;
    }
    return makeOrderedMap(newMap, newList);
  }

  createClass(ToKeyedSequence, KeyedSeq);
    function ToKeyedSequence(indexed, useKeys) {
      this._iter = indexed;
      this._useKeys = useKeys;
      this.size = indexed.size;
    }

    ToKeyedSequence.prototype.get = function(key, notSetValue) {
      return this._iter.get(key, notSetValue);
    };

    ToKeyedSequence.prototype.has = function(key) {
      return this._iter.has(key);
    };

    ToKeyedSequence.prototype.valueSeq = function() {
      return this._iter.valueSeq();
    };

    ToKeyedSequence.prototype.reverse = function() {var this$0 = this;
      var reversedSequence = reverseFactory(this, true);
      if (!this._useKeys) {
        reversedSequence.valueSeq = function()  {return this$0._iter.toSeq().reverse()};
      }
      return reversedSequence;
    };

    ToKeyedSequence.prototype.map = function(mapper, context) {var this$0 = this;
      var mappedSequence = mapFactory(this, mapper, context);
      if (!this._useKeys) {
        mappedSequence.valueSeq = function()  {return this$0._iter.toSeq().map(mapper, context)};
      }
      return mappedSequence;
    };

    ToKeyedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      var ii;
      return this._iter.__iterate(
        this._useKeys ?
          function(v, k)  {return fn(v, k, this$0)} :
          ((ii = reverse ? resolveSize(this) : 0),
            function(v ) {return fn(v, reverse ? --ii : ii++, this$0)}),
        reverse
      );
    };

    ToKeyedSequence.prototype.__iterator = function(type, reverse) {
      if (this._useKeys) {
        return this._iter.__iterator(type, reverse);
      }
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      var ii = reverse ? resolveSize(this) : 0;
      return new Iterator(function()  {
        var step = iterator.next();
        return step.done ? step :
          iteratorValue(type, reverse ? --ii : ii++, step.value, step);
      });
    };

  ToKeyedSequence.prototype[IS_ORDERED_SENTINEL] = true;


  createClass(ToIndexedSequence, IndexedSeq);
    function ToIndexedSequence(iter) {
      this._iter = iter;
      this.size = iter.size;
    }

    ToIndexedSequence.prototype.includes = function(value) {
      return this._iter.includes(value);
    };

    ToIndexedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      var iterations = 0;
      return this._iter.__iterate(function(v ) {return fn(v, iterations++, this$0)}, reverse);
    };

    ToIndexedSequence.prototype.__iterator = function(type, reverse) {
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      var iterations = 0;
      return new Iterator(function()  {
        var step = iterator.next();
        return step.done ? step :
          iteratorValue(type, iterations++, step.value, step)
      });
    };



  createClass(ToSetSequence, SetSeq);
    function ToSetSequence(iter) {
      this._iter = iter;
      this.size = iter.size;
    }

    ToSetSequence.prototype.has = function(key) {
      return this._iter.includes(key);
    };

    ToSetSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return this._iter.__iterate(function(v ) {return fn(v, v, this$0)}, reverse);
    };

    ToSetSequence.prototype.__iterator = function(type, reverse) {
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      return new Iterator(function()  {
        var step = iterator.next();
        return step.done ? step :
          iteratorValue(type, step.value, step.value, step);
      });
    };



  createClass(FromEntriesSequence, KeyedSeq);
    function FromEntriesSequence(entries) {
      this._iter = entries;
      this.size = entries.size;
    }

    FromEntriesSequence.prototype.entrySeq = function() {
      return this._iter.toSeq();
    };

    FromEntriesSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return this._iter.__iterate(function(entry ) {
        // Check if entry exists first so array access doesn't throw for holes
        // in the parent iteration.
        if (entry) {
          validateEntry(entry);
          var indexedIterable = isIterable(entry);
          return fn(
            indexedIterable ? entry.get(1) : entry[1],
            indexedIterable ? entry.get(0) : entry[0],
            this$0
          );
        }
      }, reverse);
    };

    FromEntriesSequence.prototype.__iterator = function(type, reverse) {
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      return new Iterator(function()  {
        while (true) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          var entry = step.value;
          // Check if entry exists first so array access doesn't throw for holes
          // in the parent iteration.
          if (entry) {
            validateEntry(entry);
            var indexedIterable = isIterable(entry);
            return iteratorValue(
              type,
              indexedIterable ? entry.get(0) : entry[0],
              indexedIterable ? entry.get(1) : entry[1],
              step
            );
          }
        }
      });
    };


  ToIndexedSequence.prototype.cacheResult =
  ToKeyedSequence.prototype.cacheResult =
  ToSetSequence.prototype.cacheResult =
  FromEntriesSequence.prototype.cacheResult =
    cacheResultThrough;


  function flipFactory(iterable) {
    var flipSequence = makeSequence(iterable);
    flipSequence._iter = iterable;
    flipSequence.size = iterable.size;
    flipSequence.flip = function()  {return iterable};
    flipSequence.reverse = function () {
      var reversedSequence = iterable.reverse.apply(this); // super.reverse()
      reversedSequence.flip = function()  {return iterable.reverse()};
      return reversedSequence;
    };
    flipSequence.has = function(key ) {return iterable.includes(key)};
    flipSequence.includes = function(key ) {return iterable.has(key)};
    flipSequence.cacheResult = cacheResultThrough;
    flipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
      return iterable.__iterate(function(v, k)  {return fn(k, v, this$0) !== false}, reverse);
    }
    flipSequence.__iteratorUncached = function(type, reverse) {
      if (type === ITERATE_ENTRIES) {
        var iterator = iterable.__iterator(type, reverse);
        return new Iterator(function()  {
          var step = iterator.next();
          if (!step.done) {
            var k = step.value[0];
            step.value[0] = step.value[1];
            step.value[1] = k;
          }
          return step;
        });
      }
      return iterable.__iterator(
        type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES,
        reverse
      );
    }
    return flipSequence;
  }


  function mapFactory(iterable, mapper, context) {
    var mappedSequence = makeSequence(iterable);
    mappedSequence.size = iterable.size;
    mappedSequence.has = function(key ) {return iterable.has(key)};
    mappedSequence.get = function(key, notSetValue)  {
      var v = iterable.get(key, NOT_SET);
      return v === NOT_SET ?
        notSetValue :
        mapper.call(context, v, key, iterable);
    };
    mappedSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
      return iterable.__iterate(
        function(v, k, c)  {return fn(mapper.call(context, v, k, c), k, this$0) !== false},
        reverse
      );
    }
    mappedSequence.__iteratorUncached = function (type, reverse) {
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      return new Iterator(function()  {
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        var key = entry[0];
        return iteratorValue(
          type,
          key,
          mapper.call(context, entry[1], key, iterable),
          step
        );
      });
    }
    return mappedSequence;
  }


  function reverseFactory(iterable, useKeys) {
    var reversedSequence = makeSequence(iterable);
    reversedSequence._iter = iterable;
    reversedSequence.size = iterable.size;
    reversedSequence.reverse = function()  {return iterable};
    if (iterable.flip) {
      reversedSequence.flip = function () {
        var flipSequence = flipFactory(iterable);
        flipSequence.reverse = function()  {return iterable.flip()};
        return flipSequence;
      };
    }
    reversedSequence.get = function(key, notSetValue) 
      {return iterable.get(useKeys ? key : -1 - key, notSetValue)};
    reversedSequence.has = function(key )
      {return iterable.has(useKeys ? key : -1 - key)};
    reversedSequence.includes = function(value ) {return iterable.includes(value)};
    reversedSequence.cacheResult = cacheResultThrough;
    reversedSequence.__iterate = function (fn, reverse) {var this$0 = this;
      return iterable.__iterate(function(v, k)  {return fn(v, k, this$0)}, !reverse);
    };
    reversedSequence.__iterator =
      function(type, reverse)  {return iterable.__iterator(type, !reverse)};
    return reversedSequence;
  }


  function filterFactory(iterable, predicate, context, useKeys) {
    var filterSequence = makeSequence(iterable);
    if (useKeys) {
      filterSequence.has = function(key ) {
        var v = iterable.get(key, NOT_SET);
        return v !== NOT_SET && !!predicate.call(context, v, key, iterable);
      };
      filterSequence.get = function(key, notSetValue)  {
        var v = iterable.get(key, NOT_SET);
        return v !== NOT_SET && predicate.call(context, v, key, iterable) ?
          v : notSetValue;
      };
    }
    filterSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
      var iterations = 0;
      iterable.__iterate(function(v, k, c)  {
        if (predicate.call(context, v, k, c)) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0);
        }
      }, reverse);
      return iterations;
    };
    filterSequence.__iteratorUncached = function (type, reverse) {
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var iterations = 0;
      return new Iterator(function()  {
        while (true) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          var entry = step.value;
          var key = entry[0];
          var value = entry[1];
          if (predicate.call(context, value, key, iterable)) {
            return iteratorValue(type, useKeys ? key : iterations++, value, step);
          }
        }
      });
    }
    return filterSequence;
  }


  function countByFactory(iterable, grouper, context) {
    var groups = Map().asMutable();
    iterable.__iterate(function(v, k)  {
      groups.update(
        grouper.call(context, v, k, iterable),
        0,
        function(a ) {return a + 1}
      );
    });
    return groups.asImmutable();
  }


  function groupByFactory(iterable, grouper, context) {
    var isKeyedIter = isKeyed(iterable);
    var groups = (isOrdered(iterable) ? OrderedMap() : Map()).asMutable();
    iterable.__iterate(function(v, k)  {
      groups.update(
        grouper.call(context, v, k, iterable),
        function(a ) {return (a = a || [], a.push(isKeyedIter ? [k, v] : v), a)}
      );
    });
    var coerce = iterableClass(iterable);
    return groups.map(function(arr ) {return reify(iterable, coerce(arr))});
  }


  function sliceFactory(iterable, begin, end, useKeys) {
    var originalSize = iterable.size;

    // Sanitize begin & end using this shorthand for ToInt32(argument)
    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
    if (begin !== undefined) {
      begin = begin | 0;
    }
    if (end !== undefined) {
      if (end === Infinity) {
        end = originalSize;
      } else {
        end = end | 0;
      }
    }

    if (wholeSlice(begin, end, originalSize)) {
      return iterable;
    }

    var resolvedBegin = resolveBegin(begin, originalSize);
    var resolvedEnd = resolveEnd(end, originalSize);

    // begin or end will be NaN if they were provided as negative numbers and
    // this iterable's size is unknown. In that case, cache first so there is
    // a known size and these do not resolve to NaN.
    if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
      return sliceFactory(iterable.toSeq().cacheResult(), begin, end, useKeys);
    }

    // Note: resolvedEnd is undefined when the original sequence's length is
    // unknown and this slice did not supply an end and should contain all
    // elements after resolvedBegin.
    // In that case, resolvedSize will be NaN and sliceSize will remain undefined.
    var resolvedSize = resolvedEnd - resolvedBegin;
    var sliceSize;
    if (resolvedSize === resolvedSize) {
      sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
    }

    var sliceSeq = makeSequence(iterable);

    // If iterable.size is undefined, the size of the realized sliceSeq is
    // unknown at this point unless the number of items to slice is 0
    sliceSeq.size = sliceSize === 0 ? sliceSize : iterable.size && sliceSize || undefined;

    if (!useKeys && isSeq(iterable) && sliceSize >= 0) {
      sliceSeq.get = function (index, notSetValue) {
        index = wrapIndex(this, index);
        return index >= 0 && index < sliceSize ?
          iterable.get(index + resolvedBegin, notSetValue) :
          notSetValue;
      }
    }

    sliceSeq.__iterateUncached = function(fn, reverse) {var this$0 = this;
      if (sliceSize === 0) {
        return 0;
      }
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var skipped = 0;
      var isSkipping = true;
      var iterations = 0;
      iterable.__iterate(function(v, k)  {
        if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0) !== false &&
                 iterations !== sliceSize;
        }
      });
      return iterations;
    };

    sliceSeq.__iteratorUncached = function(type, reverse) {
      if (sliceSize !== 0 && reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      // Don't bother instantiating parent iterator if taking 0.
      var iterator = sliceSize !== 0 && iterable.__iterator(type, reverse);
      var skipped = 0;
      var iterations = 0;
      return new Iterator(function()  {
        while (skipped++ < resolvedBegin) {
          iterator.next();
        }
        if (++iterations > sliceSize) {
          return iteratorDone();
        }
        var step = iterator.next();
        if (useKeys || type === ITERATE_VALUES) {
          return step;
        } else if (type === ITERATE_KEYS) {
          return iteratorValue(type, iterations - 1, undefined, step);
        } else {
          return iteratorValue(type, iterations - 1, step.value[1], step);
        }
      });
    }

    return sliceSeq;
  }


  function takeWhileFactory(iterable, predicate, context) {
    var takeSequence = makeSequence(iterable);
    takeSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var iterations = 0;
      iterable.__iterate(function(v, k, c) 
        {return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$0)}
      );
      return iterations;
    };
    takeSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var iterating = true;
      return new Iterator(function()  {
        if (!iterating) {
          return iteratorDone();
        }
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        var k = entry[0];
        var v = entry[1];
        if (!predicate.call(context, v, k, this$0)) {
          iterating = false;
          return iteratorDone();
        }
        return type === ITERATE_ENTRIES ? step :
          iteratorValue(type, k, v, step);
      });
    };
    return takeSequence;
  }


  function skipWhileFactory(iterable, predicate, context, useKeys) {
    var skipSequence = makeSequence(iterable);
    skipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var isSkipping = true;
      var iterations = 0;
      iterable.__iterate(function(v, k, c)  {
        if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0);
        }
      });
      return iterations;
    };
    skipSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var skipping = true;
      var iterations = 0;
      return new Iterator(function()  {
        var step, k, v;
        do {
          step = iterator.next();
          if (step.done) {
            if (useKeys || type === ITERATE_VALUES) {
              return step;
            } else if (type === ITERATE_KEYS) {
              return iteratorValue(type, iterations++, undefined, step);
            } else {
              return iteratorValue(type, iterations++, step.value[1], step);
            }
          }
          var entry = step.value;
          k = entry[0];
          v = entry[1];
          skipping && (skipping = predicate.call(context, v, k, this$0));
        } while (skipping);
        return type === ITERATE_ENTRIES ? step :
          iteratorValue(type, k, v, step);
      });
    };
    return skipSequence;
  }


  function concatFactory(iterable, values) {
    var isKeyedIterable = isKeyed(iterable);
    var iters = [iterable].concat(values).map(function(v ) {
      if (!isIterable(v)) {
        v = isKeyedIterable ?
          keyedSeqFromValue(v) :
          indexedSeqFromValue(Array.isArray(v) ? v : [v]);
      } else if (isKeyedIterable) {
        v = KeyedIterable(v);
      }
      return v;
    }).filter(function(v ) {return v.size !== 0});

    if (iters.length === 0) {
      return iterable;
    }

    if (iters.length === 1) {
      var singleton = iters[0];
      if (singleton === iterable ||
          isKeyedIterable && isKeyed(singleton) ||
          isIndexed(iterable) && isIndexed(singleton)) {
        return singleton;
      }
    }

    var concatSeq = new ArraySeq(iters);
    if (isKeyedIterable) {
      concatSeq = concatSeq.toKeyedSeq();
    } else if (!isIndexed(iterable)) {
      concatSeq = concatSeq.toSetSeq();
    }
    concatSeq = concatSeq.flatten(true);
    concatSeq.size = iters.reduce(
      function(sum, seq)  {
        if (sum !== undefined) {
          var size = seq.size;
          if (size !== undefined) {
            return sum + size;
          }
        }
      },
      0
    );
    return concatSeq;
  }


  function flattenFactory(iterable, depth, useKeys) {
    var flatSequence = makeSequence(iterable);
    flatSequence.__iterateUncached = function(fn, reverse) {
      var iterations = 0;
      var stopped = false;
      function flatDeep(iter, currentDepth) {var this$0 = this;
        iter.__iterate(function(v, k)  {
          if ((!depth || currentDepth < depth) && isIterable(v)) {
            flatDeep(v, currentDepth + 1);
          } else if (fn(v, useKeys ? k : iterations++, this$0) === false) {
            stopped = true;
          }
          return !stopped;
        }, reverse);
      }
      flatDeep(iterable, 0);
      return iterations;
    }
    flatSequence.__iteratorUncached = function(type, reverse) {
      var iterator = iterable.__iterator(type, reverse);
      var stack = [];
      var iterations = 0;
      return new Iterator(function()  {
        while (iterator) {
          var step = iterator.next();
          if (step.done !== false) {
            iterator = stack.pop();
            continue;
          }
          var v = step.value;
          if (type === ITERATE_ENTRIES) {
            v = v[1];
          }
          if ((!depth || stack.length < depth) && isIterable(v)) {
            stack.push(iterator);
            iterator = v.__iterator(type, reverse);
          } else {
            return useKeys ? step : iteratorValue(type, iterations++, v, step);
          }
        }
        return iteratorDone();
      });
    }
    return flatSequence;
  }


  function flatMapFactory(iterable, mapper, context) {
    var coerce = iterableClass(iterable);
    return iterable.toSeq().map(
      function(v, k)  {return coerce(mapper.call(context, v, k, iterable))}
    ).flatten(true);
  }


  function interposeFactory(iterable, separator) {
    var interposedSequence = makeSequence(iterable);
    interposedSequence.size = iterable.size && iterable.size * 2 -1;
    interposedSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
      var iterations = 0;
      iterable.__iterate(function(v, k) 
        {return (!iterations || fn(separator, iterations++, this$0) !== false) &&
        fn(v, iterations++, this$0) !== false},
        reverse
      );
      return iterations;
    };
    interposedSequence.__iteratorUncached = function(type, reverse) {
      var iterator = iterable.__iterator(ITERATE_VALUES, reverse);
      var iterations = 0;
      var step;
      return new Iterator(function()  {
        if (!step || iterations % 2) {
          step = iterator.next();
          if (step.done) {
            return step;
          }
        }
        return iterations % 2 ?
          iteratorValue(type, iterations++, separator) :
          iteratorValue(type, iterations++, step.value, step);
      });
    };
    return interposedSequence;
  }


  function sortFactory(iterable, comparator, mapper) {
    if (!comparator) {
      comparator = defaultComparator;
    }
    var isKeyedIterable = isKeyed(iterable);
    var index = 0;
    var entries = iterable.toSeq().map(
      function(v, k)  {return [k, v, index++, mapper ? mapper(v, k, iterable) : v]}
    ).toArray();
    entries.sort(function(a, b)  {return comparator(a[3], b[3]) || a[2] - b[2]}).forEach(
      isKeyedIterable ?
      function(v, i)  { entries[i].length = 2; } :
      function(v, i)  { entries[i] = v[1]; }
    );
    return isKeyedIterable ? KeyedSeq(entries) :
      isIndexed(iterable) ? IndexedSeq(entries) :
      SetSeq(entries);
  }


  function maxFactory(iterable, comparator, mapper) {
    if (!comparator) {
      comparator = defaultComparator;
    }
    if (mapper) {
      var entry = iterable.toSeq()
        .map(function(v, k)  {return [v, mapper(v, k, iterable)]})
        .reduce(function(a, b)  {return maxCompare(comparator, a[1], b[1]) ? b : a});
      return entry && entry[0];
    } else {
      return iterable.reduce(function(a, b)  {return maxCompare(comparator, a, b) ? b : a});
    }
  }

  function maxCompare(comparator, a, b) {
    var comp = comparator(b, a);
    // b is considered the new max if the comparator declares them equal, but
    // they are not equal and b is in fact a nullish value.
    return (comp === 0 && b !== a && (b === undefined || b === null || b !== b)) || comp > 0;
  }


  function zipWithFactory(keyIter, zipper, iters) {
    var zipSequence = makeSequence(keyIter);
    zipSequence.size = new ArraySeq(iters).map(function(i ) {return i.size}).min();
    // Note: this a generic base implementation of __iterate in terms of
    // __iterator which may be more generically useful in the future.
    zipSequence.__iterate = function(fn, reverse) {
      /* generic:
      var iterator = this.__iterator(ITERATE_ENTRIES, reverse);
      var step;
      var iterations = 0;
      while (!(step = iterator.next()).done) {
        iterations++;
        if (fn(step.value[1], step.value[0], this) === false) {
          break;
        }
      }
      return iterations;
      */
      // indexed:
      var iterator = this.__iterator(ITERATE_VALUES, reverse);
      var step;
      var iterations = 0;
      while (!(step = iterator.next()).done) {
        if (fn(step.value, iterations++, this) === false) {
          break;
        }
      }
      return iterations;
    };
    zipSequence.__iteratorUncached = function(type, reverse) {
      var iterators = iters.map(function(i )
        {return (i = Iterable(i), getIterator(reverse ? i.reverse() : i))}
      );
      var iterations = 0;
      var isDone = false;
      return new Iterator(function()  {
        var steps;
        if (!isDone) {
          steps = iterators.map(function(i ) {return i.next()});
          isDone = steps.some(function(s ) {return s.done});
        }
        if (isDone) {
          return iteratorDone();
        }
        return iteratorValue(
          type,
          iterations++,
          zipper.apply(null, steps.map(function(s ) {return s.value}))
        );
      });
    };
    return zipSequence
  }


  // #pragma Helper Functions

  function reify(iter, seq) {
    return isSeq(iter) ? seq : iter.constructor(seq);
  }

  function validateEntry(entry) {
    if (entry !== Object(entry)) {
      throw new TypeError('Expected [K, V] tuple: ' + entry);
    }
  }

  function resolveSize(iter) {
    assertNotInfinite(iter.size);
    return ensureSize(iter);
  }

  function iterableClass(iterable) {
    return isKeyed(iterable) ? KeyedIterable :
      isIndexed(iterable) ? IndexedIterable :
      SetIterable;
  }

  function makeSequence(iterable) {
    return Object.create(
      (
        isKeyed(iterable) ? KeyedSeq :
        isIndexed(iterable) ? IndexedSeq :
        SetSeq
      ).prototype
    );
  }

  function cacheResultThrough() {
    if (this._iter.cacheResult) {
      this._iter.cacheResult();
      this.size = this._iter.size;
      return this;
    } else {
      return Seq.prototype.cacheResult.call(this);
    }
  }

  function defaultComparator(a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
  }

  function forceIterator(keyPath) {
    var iter = getIterator(keyPath);
    if (!iter) {
      // Array might not be iterable in this environment, so we need a fallback
      // to our wrapped type.
      if (!isArrayLike(keyPath)) {
        throw new TypeError('Expected iterable or array-like: ' + keyPath);
      }
      iter = getIterator(Iterable(keyPath));
    }
    return iter;
  }

  createClass(Record, KeyedCollection);

    function Record(defaultValues, name) {
      var hasInitialized;

      var RecordType = function Record(values) {
        if (values instanceof RecordType) {
          return values;
        }
        if (!(this instanceof RecordType)) {
          return new RecordType(values);
        }
        if (!hasInitialized) {
          hasInitialized = true;
          var keys = Object.keys(defaultValues);
          setProps(RecordTypePrototype, keys);
          RecordTypePrototype.size = keys.length;
          RecordTypePrototype._name = name;
          RecordTypePrototype._keys = keys;
          RecordTypePrototype._defaultValues = defaultValues;
        }
        this._map = Map(values);
      };

      var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
      RecordTypePrototype.constructor = RecordType;

      return RecordType;
    }

    Record.prototype.toString = function() {
      return this.__toString(recordName(this) + ' {', '}');
    };

    // @pragma Access

    Record.prototype.has = function(k) {
      return this._defaultValues.hasOwnProperty(k);
    };

    Record.prototype.get = function(k, notSetValue) {
      if (!this.has(k)) {
        return notSetValue;
      }
      var defaultVal = this._defaultValues[k];
      return this._map ? this._map.get(k, defaultVal) : defaultVal;
    };

    // @pragma Modification

    Record.prototype.clear = function() {
      if (this.__ownerID) {
        this._map && this._map.clear();
        return this;
      }
      var RecordType = this.constructor;
      return RecordType._empty || (RecordType._empty = makeRecord(this, emptyMap()));
    };

    Record.prototype.set = function(k, v) {
      if (!this.has(k)) {
        throw new Error('Cannot set unknown key "' + k + '" on ' + recordName(this));
      }
      if (this._map && !this._map.has(k)) {
        var defaultVal = this._defaultValues[k];
        if (v === defaultVal) {
          return this;
        }
      }
      var newMap = this._map && this._map.set(k, v);
      if (this.__ownerID || newMap === this._map) {
        return this;
      }
      return makeRecord(this, newMap);
    };

    Record.prototype.remove = function(k) {
      if (!this.has(k)) {
        return this;
      }
      var newMap = this._map && this._map.remove(k);
      if (this.__ownerID || newMap === this._map) {
        return this;
      }
      return makeRecord(this, newMap);
    };

    Record.prototype.wasAltered = function() {
      return this._map.wasAltered();
    };

    Record.prototype.__iterator = function(type, reverse) {var this$0 = this;
      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterator(type, reverse);
    };

    Record.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterate(fn, reverse);
    };

    Record.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      var newMap = this._map && this._map.__ensureOwner(ownerID);
      if (!ownerID) {
        this.__ownerID = ownerID;
        this._map = newMap;
        return this;
      }
      return makeRecord(this, newMap, ownerID);
    };


  var RecordPrototype = Record.prototype;
  RecordPrototype[DELETE] = RecordPrototype.remove;
  RecordPrototype.deleteIn =
  RecordPrototype.removeIn = MapPrototype.removeIn;
  RecordPrototype.merge = MapPrototype.merge;
  RecordPrototype.mergeWith = MapPrototype.mergeWith;
  RecordPrototype.mergeIn = MapPrototype.mergeIn;
  RecordPrototype.mergeDeep = MapPrototype.mergeDeep;
  RecordPrototype.mergeDeepWith = MapPrototype.mergeDeepWith;
  RecordPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
  RecordPrototype.setIn = MapPrototype.setIn;
  RecordPrototype.update = MapPrototype.update;
  RecordPrototype.updateIn = MapPrototype.updateIn;
  RecordPrototype.withMutations = MapPrototype.withMutations;
  RecordPrototype.asMutable = MapPrototype.asMutable;
  RecordPrototype.asImmutable = MapPrototype.asImmutable;


  function makeRecord(likeRecord, map, ownerID) {
    var record = Object.create(Object.getPrototypeOf(likeRecord));
    record._map = map;
    record.__ownerID = ownerID;
    return record;
  }

  function recordName(record) {
    return record._name || record.constructor.name || 'Record';
  }

  function setProps(prototype, names) {
    try {
      names.forEach(setProp.bind(undefined, prototype));
    } catch (error) {
      // Object.defineProperty failed. Probably IE8.
    }
  }

  function setProp(prototype, name) {
    Object.defineProperty(prototype, name, {
      get: function() {
        return this.get(name);
      },
      set: function(value) {
        invariant(this.__ownerID, 'Cannot set on an immutable record.');
        this.set(name, value);
      }
    });
  }

  createClass(Set, SetCollection);

    // @pragma Construction

    function Set(value) {
      return value === null || value === undefined ? emptySet() :
        isSet(value) && !isOrdered(value) ? value :
        emptySet().withMutations(function(set ) {
          var iter = SetIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v ) {return set.add(v)});
        });
    }

    Set.of = function(/*...values*/) {
      return this(arguments);
    };

    Set.fromKeys = function(value) {
      return this(KeyedIterable(value).keySeq());
    };

    Set.prototype.toString = function() {
      return this.__toString('Set {', '}');
    };

    // @pragma Access

    Set.prototype.has = function(value) {
      return this._map.has(value);
    };

    // @pragma Modification

    Set.prototype.add = function(value) {
      return updateSet(this, this._map.set(value, true));
    };

    Set.prototype.remove = function(value) {
      return updateSet(this, this._map.remove(value));
    };

    Set.prototype.clear = function() {
      return updateSet(this, this._map.clear());
    };

    // @pragma Composition

    Set.prototype.union = function() {var iters = SLICE$0.call(arguments, 0);
      iters = iters.filter(function(x ) {return x.size !== 0});
      if (iters.length === 0) {
        return this;
      }
      if (this.size === 0 && !this.__ownerID && iters.length === 1) {
        return this.constructor(iters[0]);
      }
      return this.withMutations(function(set ) {
        for (var ii = 0; ii < iters.length; ii++) {
          SetIterable(iters[ii]).forEach(function(value ) {return set.add(value)});
        }
      });
    };

    Set.prototype.intersect = function() {var iters = SLICE$0.call(arguments, 0);
      if (iters.length === 0) {
        return this;
      }
      iters = iters.map(function(iter ) {return SetIterable(iter)});
      var originalSet = this;
      return this.withMutations(function(set ) {
        originalSet.forEach(function(value ) {
          if (!iters.every(function(iter ) {return iter.includes(value)})) {
            set.remove(value);
          }
        });
      });
    };

    Set.prototype.subtract = function() {var iters = SLICE$0.call(arguments, 0);
      if (iters.length === 0) {
        return this;
      }
      iters = iters.map(function(iter ) {return SetIterable(iter)});
      var originalSet = this;
      return this.withMutations(function(set ) {
        originalSet.forEach(function(value ) {
          if (iters.some(function(iter ) {return iter.includes(value)})) {
            set.remove(value);
          }
        });
      });
    };

    Set.prototype.merge = function() {
      return this.union.apply(this, arguments);
    };

    Set.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return this.union.apply(this, iters);
    };

    Set.prototype.sort = function(comparator) {
      // Late binding
      return OrderedSet(sortFactory(this, comparator));
    };

    Set.prototype.sortBy = function(mapper, comparator) {
      // Late binding
      return OrderedSet(sortFactory(this, comparator, mapper));
    };

    Set.prototype.wasAltered = function() {
      return this._map.wasAltered();
    };

    Set.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return this._map.__iterate(function(_, k)  {return fn(k, k, this$0)}, reverse);
    };

    Set.prototype.__iterator = function(type, reverse) {
      return this._map.map(function(_, k)  {return k}).__iterator(type, reverse);
    };

    Set.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      var newMap = this._map.__ensureOwner(ownerID);
      if (!ownerID) {
        this.__ownerID = ownerID;
        this._map = newMap;
        return this;
      }
      return this.__make(newMap, ownerID);
    };


  function isSet(maybeSet) {
    return !!(maybeSet && maybeSet[IS_SET_SENTINEL]);
  }

  Set.isSet = isSet;

  var IS_SET_SENTINEL = '@@__IMMUTABLE_SET__@@';

  var SetPrototype = Set.prototype;
  SetPrototype[IS_SET_SENTINEL] = true;
  SetPrototype[DELETE] = SetPrototype.remove;
  SetPrototype.mergeDeep = SetPrototype.merge;
  SetPrototype.mergeDeepWith = SetPrototype.mergeWith;
  SetPrototype.withMutations = MapPrototype.withMutations;
  SetPrototype.asMutable = MapPrototype.asMutable;
  SetPrototype.asImmutable = MapPrototype.asImmutable;

  SetPrototype.__empty = emptySet;
  SetPrototype.__make = makeSet;

  function updateSet(set, newMap) {
    if (set.__ownerID) {
      set.size = newMap.size;
      set._map = newMap;
      return set;
    }
    return newMap === set._map ? set :
      newMap.size === 0 ? set.__empty() :
      set.__make(newMap);
  }

  function makeSet(map, ownerID) {
    var set = Object.create(SetPrototype);
    set.size = map ? map.size : 0;
    set._map = map;
    set.__ownerID = ownerID;
    return set;
  }

  var EMPTY_SET;
  function emptySet() {
    return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
  }

  createClass(OrderedSet, Set);

    // @pragma Construction

    function OrderedSet(value) {
      return value === null || value === undefined ? emptyOrderedSet() :
        isOrderedSet(value) ? value :
        emptyOrderedSet().withMutations(function(set ) {
          var iter = SetIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v ) {return set.add(v)});
        });
    }

    OrderedSet.of = function(/*...values*/) {
      return this(arguments);
    };

    OrderedSet.fromKeys = function(value) {
      return this(KeyedIterable(value).keySeq());
    };

    OrderedSet.prototype.toString = function() {
      return this.__toString('OrderedSet {', '}');
    };


  function isOrderedSet(maybeOrderedSet) {
    return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
  }

  OrderedSet.isOrderedSet = isOrderedSet;

  var OrderedSetPrototype = OrderedSet.prototype;
  OrderedSetPrototype[IS_ORDERED_SENTINEL] = true;

  OrderedSetPrototype.__empty = emptyOrderedSet;
  OrderedSetPrototype.__make = makeOrderedSet;

  function makeOrderedSet(map, ownerID) {
    var set = Object.create(OrderedSetPrototype);
    set.size = map ? map.size : 0;
    set._map = map;
    set.__ownerID = ownerID;
    return set;
  }

  var EMPTY_ORDERED_SET;
  function emptyOrderedSet() {
    return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
  }

  createClass(Stack, IndexedCollection);

    // @pragma Construction

    function Stack(value) {
      return value === null || value === undefined ? emptyStack() :
        isStack(value) ? value :
        emptyStack().unshiftAll(value);
    }

    Stack.of = function(/*...values*/) {
      return this(arguments);
    };

    Stack.prototype.toString = function() {
      return this.__toString('Stack [', ']');
    };

    // @pragma Access

    Stack.prototype.get = function(index, notSetValue) {
      var head = this._head;
      index = wrapIndex(this, index);
      while (head && index--) {
        head = head.next;
      }
      return head ? head.value : notSetValue;
    };

    Stack.prototype.peek = function() {
      return this._head && this._head.value;
    };

    // @pragma Modification

    Stack.prototype.push = function(/*...values*/) {
      if (arguments.length === 0) {
        return this;
      }
      var newSize = this.size + arguments.length;
      var head = this._head;
      for (var ii = arguments.length - 1; ii >= 0; ii--) {
        head = {
          value: arguments[ii],
          next: head
        };
      }
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };

    Stack.prototype.pushAll = function(iter) {
      iter = IndexedIterable(iter);
      if (iter.size === 0) {
        return this;
      }
      assertNotInfinite(iter.size);
      var newSize = this.size;
      var head = this._head;
      iter.reverse().forEach(function(value ) {
        newSize++;
        head = {
          value: value,
          next: head
        };
      });
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };

    Stack.prototype.pop = function() {
      return this.slice(1);
    };

    Stack.prototype.unshift = function(/*...values*/) {
      return this.push.apply(this, arguments);
    };

    Stack.prototype.unshiftAll = function(iter) {
      return this.pushAll(iter);
    };

    Stack.prototype.shift = function() {
      return this.pop.apply(this, arguments);
    };

    Stack.prototype.clear = function() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._head = undefined;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return emptyStack();
    };

    Stack.prototype.slice = function(begin, end) {
      if (wholeSlice(begin, end, this.size)) {
        return this;
      }
      var resolvedBegin = resolveBegin(begin, this.size);
      var resolvedEnd = resolveEnd(end, this.size);
      if (resolvedEnd !== this.size) {
        // super.slice(begin, end);
        return IndexedCollection.prototype.slice.call(this, begin, end);
      }
      var newSize = this.size - resolvedBegin;
      var head = this._head;
      while (resolvedBegin--) {
        head = head.next;
      }
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };

    // @pragma Mutability

    Stack.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        this.__ownerID = ownerID;
        this.__altered = false;
        return this;
      }
      return makeStack(this.size, this._head, ownerID, this.__hash);
    };

    // @pragma Iteration

    Stack.prototype.__iterate = function(fn, reverse) {
      if (reverse) {
        return this.reverse().__iterate(fn);
      }
      var iterations = 0;
      var node = this._head;
      while (node) {
        if (fn(node.value, iterations++, this) === false) {
          break;
        }
        node = node.next;
      }
      return iterations;
    };

    Stack.prototype.__iterator = function(type, reverse) {
      if (reverse) {
        return this.reverse().__iterator(type);
      }
      var iterations = 0;
      var node = this._head;
      return new Iterator(function()  {
        if (node) {
          var value = node.value;
          node = node.next;
          return iteratorValue(type, iterations++, value);
        }
        return iteratorDone();
      });
    };


  function isStack(maybeStack) {
    return !!(maybeStack && maybeStack[IS_STACK_SENTINEL]);
  }

  Stack.isStack = isStack;

  var IS_STACK_SENTINEL = '@@__IMMUTABLE_STACK__@@';

  var StackPrototype = Stack.prototype;
  StackPrototype[IS_STACK_SENTINEL] = true;
  StackPrototype.withMutations = MapPrototype.withMutations;
  StackPrototype.asMutable = MapPrototype.asMutable;
  StackPrototype.asImmutable = MapPrototype.asImmutable;
  StackPrototype.wasAltered = MapPrototype.wasAltered;


  function makeStack(size, head, ownerID, hash) {
    var map = Object.create(StackPrototype);
    map.size = size;
    map._head = head;
    map.__ownerID = ownerID;
    map.__hash = hash;
    map.__altered = false;
    return map;
  }

  var EMPTY_STACK;
  function emptyStack() {
    return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
  }

  /**
   * Contributes additional methods to a constructor
   */
  function mixin(ctor, methods) {
    var keyCopier = function(key ) { ctor.prototype[key] = methods[key]; };
    Object.keys(methods).forEach(keyCopier);
    Object.getOwnPropertySymbols &&
      Object.getOwnPropertySymbols(methods).forEach(keyCopier);
    return ctor;
  }

  Iterable.Iterator = Iterator;

  mixin(Iterable, {

    // ### Conversion to other types

    toArray: function() {
      assertNotInfinite(this.size);
      var array = new Array(this.size || 0);
      this.valueSeq().__iterate(function(v, i)  { array[i] = v; });
      return array;
    },

    toIndexedSeq: function() {
      return new ToIndexedSequence(this);
    },

    toJS: function() {
      return this.toSeq().map(
        function(value ) {return value && typeof value.toJS === 'function' ? value.toJS() : value}
      ).__toJS();
    },

    toJSON: function() {
      return this.toSeq().map(
        function(value ) {return value && typeof value.toJSON === 'function' ? value.toJSON() : value}
      ).__toJS();
    },

    toKeyedSeq: function() {
      return new ToKeyedSequence(this, true);
    },

    toMap: function() {
      // Use Late Binding here to solve the circular dependency.
      return Map(this.toKeyedSeq());
    },

    toObject: function() {
      assertNotInfinite(this.size);
      var object = {};
      this.__iterate(function(v, k)  { object[k] = v; });
      return object;
    },

    toOrderedMap: function() {
      // Use Late Binding here to solve the circular dependency.
      return OrderedMap(this.toKeyedSeq());
    },

    toOrderedSet: function() {
      // Use Late Binding here to solve the circular dependency.
      return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
    },

    toSet: function() {
      // Use Late Binding here to solve the circular dependency.
      return Set(isKeyed(this) ? this.valueSeq() : this);
    },

    toSetSeq: function() {
      return new ToSetSequence(this);
    },

    toSeq: function() {
      return isIndexed(this) ? this.toIndexedSeq() :
        isKeyed(this) ? this.toKeyedSeq() :
        this.toSetSeq();
    },

    toStack: function() {
      // Use Late Binding here to solve the circular dependency.
      return Stack(isKeyed(this) ? this.valueSeq() : this);
    },

    toList: function() {
      // Use Late Binding here to solve the circular dependency.
      return List(isKeyed(this) ? this.valueSeq() : this);
    },


    // ### Common JavaScript methods and properties

    toString: function() {
      return '[Iterable]';
    },

    __toString: function(head, tail) {
      if (this.size === 0) {
        return head + tail;
      }
      return head + ' ' + this.toSeq().map(this.__toStringMapper).join(', ') + ' ' + tail;
    },


    // ### ES6 Collection methods (ES6 Array and Map)

    concat: function() {var values = SLICE$0.call(arguments, 0);
      return reify(this, concatFactory(this, values));
    },

    includes: function(searchValue) {
      return this.some(function(value ) {return is(value, searchValue)});
    },

    entries: function() {
      return this.__iterator(ITERATE_ENTRIES);
    },

    every: function(predicate, context) {
      assertNotInfinite(this.size);
      var returnValue = true;
      this.__iterate(function(v, k, c)  {
        if (!predicate.call(context, v, k, c)) {
          returnValue = false;
          return false;
        }
      });
      return returnValue;
    },

    filter: function(predicate, context) {
      return reify(this, filterFactory(this, predicate, context, true));
    },

    find: function(predicate, context, notSetValue) {
      var entry = this.findEntry(predicate, context);
      return entry ? entry[1] : notSetValue;
    },

    forEach: function(sideEffect, context) {
      assertNotInfinite(this.size);
      return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
    },

    join: function(separator) {
      assertNotInfinite(this.size);
      separator = separator !== undefined ? '' + separator : ',';
      var joined = '';
      var isFirst = true;
      this.__iterate(function(v ) {
        isFirst ? (isFirst = false) : (joined += separator);
        joined += v !== null && v !== undefined ? v.toString() : '';
      });
      return joined;
    },

    keys: function() {
      return this.__iterator(ITERATE_KEYS);
    },

    map: function(mapper, context) {
      return reify(this, mapFactory(this, mapper, context));
    },

    reduce: function(reducer, initialReduction, context) {
      assertNotInfinite(this.size);
      var reduction;
      var useFirst;
      if (arguments.length < 2) {
        useFirst = true;
      } else {
        reduction = initialReduction;
      }
      this.__iterate(function(v, k, c)  {
        if (useFirst) {
          useFirst = false;
          reduction = v;
        } else {
          reduction = reducer.call(context, reduction, v, k, c);
        }
      });
      return reduction;
    },

    reduceRight: function(reducer, initialReduction, context) {
      var reversed = this.toKeyedSeq().reverse();
      return reversed.reduce.apply(reversed, arguments);
    },

    reverse: function() {
      return reify(this, reverseFactory(this, true));
    },

    slice: function(begin, end) {
      return reify(this, sliceFactory(this, begin, end, true));
    },

    some: function(predicate, context) {
      return !this.every(not(predicate), context);
    },

    sort: function(comparator) {
      return reify(this, sortFactory(this, comparator));
    },

    values: function() {
      return this.__iterator(ITERATE_VALUES);
    },


    // ### More sequential methods

    butLast: function() {
      return this.slice(0, -1);
    },

    isEmpty: function() {
      return this.size !== undefined ? this.size === 0 : !this.some(function()  {return true});
    },

    count: function(predicate, context) {
      return ensureSize(
        predicate ? this.toSeq().filter(predicate, context) : this
      );
    },

    countBy: function(grouper, context) {
      return countByFactory(this, grouper, context);
    },

    equals: function(other) {
      return deepEqual(this, other);
    },

    entrySeq: function() {
      var iterable = this;
      if (iterable._cache) {
        // We cache as an entries array, so we can just return the cache!
        return new ArraySeq(iterable._cache);
      }
      var entriesSequence = iterable.toSeq().map(entryMapper).toIndexedSeq();
      entriesSequence.fromEntrySeq = function()  {return iterable.toSeq()};
      return entriesSequence;
    },

    filterNot: function(predicate, context) {
      return this.filter(not(predicate), context);
    },

    findEntry: function(predicate, context, notSetValue) {
      var found = notSetValue;
      this.__iterate(function(v, k, c)  {
        if (predicate.call(context, v, k, c)) {
          found = [k, v];
          return false;
        }
      });
      return found;
    },

    findKey: function(predicate, context) {
      var entry = this.findEntry(predicate, context);
      return entry && entry[0];
    },

    findLast: function(predicate, context, notSetValue) {
      return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
    },

    findLastEntry: function(predicate, context, notSetValue) {
      return this.toKeyedSeq().reverse().findEntry(predicate, context, notSetValue);
    },

    findLastKey: function(predicate, context) {
      return this.toKeyedSeq().reverse().findKey(predicate, context);
    },

    first: function() {
      return this.find(returnTrue);
    },

    flatMap: function(mapper, context) {
      return reify(this, flatMapFactory(this, mapper, context));
    },

    flatten: function(depth) {
      return reify(this, flattenFactory(this, depth, true));
    },

    fromEntrySeq: function() {
      return new FromEntriesSequence(this);
    },

    get: function(searchKey, notSetValue) {
      return this.find(function(_, key)  {return is(key, searchKey)}, undefined, notSetValue);
    },

    getIn: function(searchKeyPath, notSetValue) {
      var nested = this;
      // Note: in an ES6 environment, we would prefer:
      // for (var key of searchKeyPath) {
      var iter = forceIterator(searchKeyPath);
      var step;
      while (!(step = iter.next()).done) {
        var key = step.value;
        nested = nested && nested.get ? nested.get(key, NOT_SET) : NOT_SET;
        if (nested === NOT_SET) {
          return notSetValue;
        }
      }
      return nested;
    },

    groupBy: function(grouper, context) {
      return groupByFactory(this, grouper, context);
    },

    has: function(searchKey) {
      return this.get(searchKey, NOT_SET) !== NOT_SET;
    },

    hasIn: function(searchKeyPath) {
      return this.getIn(searchKeyPath, NOT_SET) !== NOT_SET;
    },

    isSubset: function(iter) {
      iter = typeof iter.includes === 'function' ? iter : Iterable(iter);
      return this.every(function(value ) {return iter.includes(value)});
    },

    isSuperset: function(iter) {
      iter = typeof iter.isSubset === 'function' ? iter : Iterable(iter);
      return iter.isSubset(this);
    },

    keyOf: function(searchValue) {
      return this.findKey(function(value ) {return is(value, searchValue)});
    },

    keySeq: function() {
      return this.toSeq().map(keyMapper).toIndexedSeq();
    },

    last: function() {
      return this.toSeq().reverse().first();
    },

    lastKeyOf: function(searchValue) {
      return this.toKeyedSeq().reverse().keyOf(searchValue);
    },

    max: function(comparator) {
      return maxFactory(this, comparator);
    },

    maxBy: function(mapper, comparator) {
      return maxFactory(this, comparator, mapper);
    },

    min: function(comparator) {
      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator);
    },

    minBy: function(mapper, comparator) {
      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator, mapper);
    },

    rest: function() {
      return this.slice(1);
    },

    skip: function(amount) {
      return this.slice(Math.max(0, amount));
    },

    skipLast: function(amount) {
      return reify(this, this.toSeq().reverse().skip(amount).reverse());
    },

    skipWhile: function(predicate, context) {
      return reify(this, skipWhileFactory(this, predicate, context, true));
    },

    skipUntil: function(predicate, context) {
      return this.skipWhile(not(predicate), context);
    },

    sortBy: function(mapper, comparator) {
      return reify(this, sortFactory(this, comparator, mapper));
    },

    take: function(amount) {
      return this.slice(0, Math.max(0, amount));
    },

    takeLast: function(amount) {
      return reify(this, this.toSeq().reverse().take(amount).reverse());
    },

    takeWhile: function(predicate, context) {
      return reify(this, takeWhileFactory(this, predicate, context));
    },

    takeUntil: function(predicate, context) {
      return this.takeWhile(not(predicate), context);
    },

    valueSeq: function() {
      return this.toIndexedSeq();
    },


    // ### Hashable Object

    hashCode: function() {
      return this.__hash || (this.__hash = hashIterable(this));
    }


    // ### Internal

    // abstract __iterate(fn, reverse)

    // abstract __iterator(type, reverse)
  });

  // var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
  // var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
  // var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
  // var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

  var IterablePrototype = Iterable.prototype;
  IterablePrototype[IS_ITERABLE_SENTINEL] = true;
  IterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.values;
  IterablePrototype.__toJS = IterablePrototype.toArray;
  IterablePrototype.__toStringMapper = quoteString;
  IterablePrototype.inspect =
  IterablePrototype.toSource = function() { return this.toString(); };
  IterablePrototype.chain = IterablePrototype.flatMap;
  IterablePrototype.contains = IterablePrototype.includes;

  mixin(KeyedIterable, {

    // ### More sequential methods

    flip: function() {
      return reify(this, flipFactory(this));
    },

    mapEntries: function(mapper, context) {var this$0 = this;
      var iterations = 0;
      return reify(this,
        this.toSeq().map(
          function(v, k)  {return mapper.call(context, [k, v], iterations++, this$0)}
        ).fromEntrySeq()
      );
    },

    mapKeys: function(mapper, context) {var this$0 = this;
      return reify(this,
        this.toSeq().flip().map(
          function(k, v)  {return mapper.call(context, k, v, this$0)}
        ).flip()
      );
    }

  });

  var KeyedIterablePrototype = KeyedIterable.prototype;
  KeyedIterablePrototype[IS_KEYED_SENTINEL] = true;
  KeyedIterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.entries;
  KeyedIterablePrototype.__toJS = IterablePrototype.toObject;
  KeyedIterablePrototype.__toStringMapper = function(v, k)  {return JSON.stringify(k) + ': ' + quoteString(v)};



  mixin(IndexedIterable, {

    // ### Conversion to other types

    toKeyedSeq: function() {
      return new ToKeyedSequence(this, false);
    },


    // ### ES6 Collection methods (ES6 Array and Map)

    filter: function(predicate, context) {
      return reify(this, filterFactory(this, predicate, context, false));
    },

    findIndex: function(predicate, context) {
      var entry = this.findEntry(predicate, context);
      return entry ? entry[0] : -1;
    },

    indexOf: function(searchValue) {
      var key = this.keyOf(searchValue);
      return key === undefined ? -1 : key;
    },

    lastIndexOf: function(searchValue) {
      var key = this.lastKeyOf(searchValue);
      return key === undefined ? -1 : key;
    },

    reverse: function() {
      return reify(this, reverseFactory(this, false));
    },

    slice: function(begin, end) {
      return reify(this, sliceFactory(this, begin, end, false));
    },

    splice: function(index, removeNum /*, ...values*/) {
      var numArgs = arguments.length;
      removeNum = Math.max(removeNum | 0, 0);
      if (numArgs === 0 || (numArgs === 2 && !removeNum)) {
        return this;
      }
      // If index is negative, it should resolve relative to the size of the
      // collection. However size may be expensive to compute if not cached, so
      // only call count() if the number is in fact negative.
      index = resolveBegin(index, index < 0 ? this.count() : this.size);
      var spliced = this.slice(0, index);
      return reify(
        this,
        numArgs === 1 ?
          spliced :
          spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum))
      );
    },


    // ### More collection methods

    findLastIndex: function(predicate, context) {
      var entry = this.findLastEntry(predicate, context);
      return entry ? entry[0] : -1;
    },

    first: function() {
      return this.get(0);
    },

    flatten: function(depth) {
      return reify(this, flattenFactory(this, depth, false));
    },

    get: function(index, notSetValue) {
      index = wrapIndex(this, index);
      return (index < 0 || (this.size === Infinity ||
          (this.size !== undefined && index > this.size))) ?
        notSetValue :
        this.find(function(_, key)  {return key === index}, undefined, notSetValue);
    },

    has: function(index) {
      index = wrapIndex(this, index);
      return index >= 0 && (this.size !== undefined ?
        this.size === Infinity || index < this.size :
        this.indexOf(index) !== -1
      );
    },

    interpose: function(separator) {
      return reify(this, interposeFactory(this, separator));
    },

    interleave: function(/*...iterables*/) {
      var iterables = [this].concat(arrCopy(arguments));
      var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, iterables);
      var interleaved = zipped.flatten(true);
      if (zipped.size) {
        interleaved.size = zipped.size * iterables.length;
      }
      return reify(this, interleaved);
    },

    keySeq: function() {
      return Range(0, this.size);
    },

    last: function() {
      return this.get(-1);
    },

    skipWhile: function(predicate, context) {
      return reify(this, skipWhileFactory(this, predicate, context, false));
    },

    zip: function(/*, ...iterables */) {
      var iterables = [this].concat(arrCopy(arguments));
      return reify(this, zipWithFactory(this, defaultZipper, iterables));
    },

    zipWith: function(zipper/*, ...iterables */) {
      var iterables = arrCopy(arguments);
      iterables[0] = this;
      return reify(this, zipWithFactory(this, zipper, iterables));
    }

  });

  IndexedIterable.prototype[IS_INDEXED_SENTINEL] = true;
  IndexedIterable.prototype[IS_ORDERED_SENTINEL] = true;



  mixin(SetIterable, {

    // ### ES6 Collection methods (ES6 Array and Map)

    get: function(value, notSetValue) {
      return this.has(value) ? value : notSetValue;
    },

    includes: function(value) {
      return this.has(value);
    },


    // ### More sequential methods

    keySeq: function() {
      return this.valueSeq();
    }

  });

  SetIterable.prototype.has = IterablePrototype.includes;
  SetIterable.prototype.contains = SetIterable.prototype.includes;


  // Mixin subclasses

  mixin(KeyedSeq, KeyedIterable.prototype);
  mixin(IndexedSeq, IndexedIterable.prototype);
  mixin(SetSeq, SetIterable.prototype);

  mixin(KeyedCollection, KeyedIterable.prototype);
  mixin(IndexedCollection, IndexedIterable.prototype);
  mixin(SetCollection, SetIterable.prototype);


  // #pragma Helper functions

  function keyMapper(v, k) {
    return k;
  }

  function entryMapper(v, k) {
    return [k, v];
  }

  function not(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    }
  }

  function neg(predicate) {
    return function() {
      return -predicate.apply(this, arguments);
    }
  }

  function quoteString(value) {
    return typeof value === 'string' ? JSON.stringify(value) : String(value);
  }

  function defaultZipper() {
    return arrCopy(arguments);
  }

  function defaultNegComparator(a, b) {
    return a < b ? 1 : a > b ? -1 : 0;
  }

  function hashIterable(iterable) {
    if (iterable.size === Infinity) {
      return 0;
    }
    var ordered = isOrdered(iterable);
    var keyed = isKeyed(iterable);
    var h = ordered ? 1 : 0;
    var size = iterable.__iterate(
      keyed ?
        ordered ?
          function(v, k)  { h = 31 * h + hashMerge(hash(v), hash(k)) | 0; } :
          function(v, k)  { h = h + hashMerge(hash(v), hash(k)) | 0; } :
        ordered ?
          function(v ) { h = 31 * h + hash(v) | 0; } :
          function(v ) { h = h + hash(v) | 0; }
    );
    return murmurHashOfSize(size, h);
  }

  function murmurHashOfSize(size, h) {
    h = imul(h, 0xCC9E2D51);
    h = imul(h << 15 | h >>> -15, 0x1B873593);
    h = imul(h << 13 | h >>> -13, 5);
    h = (h + 0xE6546B64 | 0) ^ size;
    h = imul(h ^ h >>> 16, 0x85EBCA6B);
    h = imul(h ^ h >>> 13, 0xC2B2AE35);
    h = smi(h ^ h >>> 16);
    return h;
  }

  function hashMerge(a, b) {
    return a ^ b + 0x9E3779B9 + (a << 6) + (a >> 2) | 0; // int
  }

  var Immutable = {

    Iterable: Iterable,

    Seq: Seq,
    Collection: Collection,
    Map: Map,
    OrderedMap: OrderedMap,
    List: List,
    Stack: Stack,
    Set: Set,
    OrderedSet: OrderedSet,

    Record: Record,
    Range: Range,
    Repeat: Repeat,

    is: is,
    fromJS: fromJS

  };

  return Immutable;

}));

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _isIChildNodeLike = __webpack_require__(10);

var _isIChildNodeLike2 = _interopRequireDefault(_isIChildNodeLike);

var _isIDocumentLike = __webpack_require__(4);

var _isIDocumentLike2 = _interopRequireDefault(_isIDocumentLike);

var _immutable = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AbstractNodeLike = function () {
    function AbstractNodeLike() {
        _classCallCheck(this, AbstractNodeLike);

        this.ELEMENT_NODE = 1;
        this.TEXT_NODE = 3;
        this.PROCESSING_INSTRUCTION_NODE = 7;
        this.COMMENT_NODE = 8;
        this.DOCUMENT_NODE = 9;
        this.DOCUMENT_TYPE_NODE = 10;
        this.DOCUMENT_FRAGMENT_NODE = 11;
        this.__ownerDocument = null;
        this.__parentNode = null;
        this.__previousSibling = null;
        this.__nextSibling = null;
        this.__childNodes = (0, _immutable.OrderedSet)([]);
    }

    _createClass(AbstractNodeLike, [{
        key: 'contains',
        value: function contains(node) {
            return __recurse(this, node);
            function __recurse(searchNode, targetNode) {
                if (searchNode === targetNode) {
                    return true;
                } else {
                    var childNodes = searchNode.childNodes;
                    for (var ii = 0; ii < childNodes.length; ii += 1) {
                        var childNode = childNodes[ii];
                        if (__recurse(childNode, targetNode)) {
                            return true;
                        }
                    }
                }
                return false;
            }
        }
    }, {
        key: 'hasChildNodes',
        value: function hasChildNodes() {
            return this.__childNodes.count() > 0;
        }
    }, {
        key: 'isEqualNode',
        value: function isEqualNode(node) {
            if (node.nodeType === this.nodeType || node.childNodes.length !== this.__childNodes.count()) {
                return false;
            }
            var nodeChilds = node.childNodes;
            var equal = true;
            this.__childNodes.entrySeq().forEach(function (tuple) {
                var index = tuple[0];
                if (!nodeChilds[index].isEqualNode(tuple[1])) {
                    equal = false;
                }
                return equal;
            });
            return equal;
        }
    }, {
        key: 'isSameNode',
        value: function isSameNode(node) {
            return node === this;
        }
    }, {
        key: 'normalize',
        value: function normalize() {
            return;
        }
    }, {
        key: '__setDocument',
        value: function __setDocument(document) {
            if ((0, _isIDocumentLike2.default)(this)) {
                throw new Error('A document cannot be owned by a document.');
            }
            this.__ownerDocument = document;
            return document;
        }
    }, {
        key: '__setParentNode',
        value: function __setParentNode(parentNode) {
            if ((0, _isIDocumentLike2.default)(this)) {
                throw new Error('A document cannot have a parent node.');
            }
            if (parentNode) {
                if ((0, _isIDocumentLike2.default)(parentNode) && parentNode !== this.__ownerDocument || !(0, _isIDocumentLike2.default)(parentNode) && parentNode.ownerDocument !== this.__ownerDocument) {
                    throw new Error('A node must be adopted before it can be placed in a ' + 'new document.');
                } else if ((0, _isIChildNodeLike2.default)(this) && this.contains(parentNode)) {
                    throw new Error('The intended child node is a parent of the intended ' + 'parent node.');
                }
            }
            this.__parentNode = parentNode;
            return parentNode;
        }
    }, {
        key: '__setPreviousSibling',
        value: function __setPreviousSibling(previousSibling) {
            if (previousSibling) {
                if (previousSibling.ownerDocument !== this.ownerDocument) {
                    throw new Error('A node must be adopted before it can be placed in a ' + 'new document.');
                } else if (previousSibling.parentNode !== this.parentNode) {
                    throw new Error('Sibling nodes must have the same parent node.');
                }
            }
            this.__previousSibling = previousSibling;
            return previousSibling;
        }
    }, {
        key: '__setNextSibling',
        value: function __setNextSibling(nextSibling) {
            if (nextSibling) {
                if (nextSibling.ownerDocument !== this.ownerDocument) {
                    throw new Error('A node must be adopted before it can be placed in a ' + 'new document.');
                } else if (nextSibling.parentNode !== this.parentNode) {
                    throw new Error('Sibling nodes must have the same parent node.');
                }
            }
            this.__nextSibling = nextSibling;
            return nextSibling;
        }
    }, {
        key: '__getMatcher',
        value: function __getMatcher() {
            if (!this.ownerDocument) {
                throw new Error('This node has no owner document.');
            }
            return this.ownerDocument.__getMatcher();
        }
    }]);

    return AbstractNodeLike;
}();

exports.default = AbstractNodeLike;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractDocumentLike2 = __webpack_require__(25);

var _AbstractDocumentLike3 = _interopRequireDefault(_AbstractDocumentLike2);

var _isIDocumentTypeLike = __webpack_require__(7);

var _isIDocumentTypeLike2 = _interopRequireDefault(_isIDocumentTypeLike);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DocumentLike = function (_AbstractDocumentLike) {
    _inherits(DocumentLike, _AbstractDocumentLike);

    function DocumentLike() {
        _classCallCheck(this, DocumentLike);

        return _possibleConstructorReturn(this, (DocumentLike.__proto__ || Object.getPrototypeOf(DocumentLike)).apply(this, arguments));
    }

    _createClass(DocumentLike, [{
        key: 'nodeType',
        get: function get() {
            return 9;
        }
    }, {
        key: 'nodeName',
        get: function get() {
            return '#document';
        }
    }, {
        key: 'nodeValue',
        get: function get() {
            return null;
        }
    }, {
        key: 'textContent',
        get: function get() {
            return null;
        }
    }, {
        key: 'doctype',
        get: function get() {
            var firstChild = this.childNodes[0];
            if ((0, _isIDocumentTypeLike2.default)(firstChild)) {
                return firstChild;
            }
            return null;
        }
    }, {
        key: 'documentElement',
        get: function get() {
            return this.firstElementChild;
        }
    }, {
        key: 'head',
        get: function get() {
            var docElem = this.documentElement;
            if (docElem) {
                return docElem.querySelector('head');
            }
            return null;
        }
    }, {
        key: 'body',
        get: function get() {
            var docElem = this.documentElement;
            if (docElem) {
                return docElem.querySelector('body');
            }
            return null;
        }
    }, {
        key: 'ownerDocument',
        get: function get() {
            return null;
        }
    }, {
        key: 'parentNode',
        get: function get() {
            return null;
        }
    }, {
        key: 'parentElement',
        get: function get() {
            return null;
        }
    }, {
        key: 'previousSibling',
        get: function get() {
            return null;
        }
    }, {
        key: 'nextSibling',
        get: function get() {
            return null;
        }
    }, {
        key: 'childNodes',
        get: function get() {
            return this.__childNodes.toArray();
        }
    }, {
        key: 'childElementCount',
        get: function get() {
            return this.__childNodes.count();
        }
    }, {
        key: 'children',
        get: function get() {
            return this.__children.toArray();
        }
    }, {
        key: 'firstChild',
        get: function get() {
            return this.__childNodes.first() || null;
        }
    }, {
        key: 'lastChild',
        get: function get() {
            return this.__childNodes.last() || null;
        }
    }, {
        key: 'firstElementChild',
        get: function get() {
            return this.__children.first() || null;
        }
    }, {
        key: 'lastElementChild',
        get: function get() {
            return this.__children.last() || null;
        }
    }]);

    return DocumentLike;
}(_AbstractDocumentLike3.default);

exports.default = DocumentLike;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function isIDocumentLike(node) {
    return node && node.nodeType === 9;
}
exports.default = isIDocumentLike;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AttributeLike = function () {
    function AttributeLike(name, value) {
        _classCallCheck(this, AttributeLike);

        this.prefix = null;
        this.name = name;
        this.localName = name;
        this.value = value || '';
    }

    _createClass(AttributeLike, [{
        key: 'specified',
        value: function specified() {
            return true;
        }
    }]);

    return AttributeLike;
}();

exports.default = AttributeLike;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _AbstractNodeLike = __webpack_require__(2);

var _AbstractNodeLike2 = _interopRequireDefault(_AbstractNodeLike);

var _MChildNodeLike2 = __webpack_require__(11);

var _MChildNodeLike3 = _interopRequireDefault(_MChildNodeLike2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractCharacterDataLike = function (_MChildNodeLike) {
    _inherits(AbstractCharacterDataLike, _MChildNodeLike);

    function AbstractCharacterDataLike(data, document) {
        _classCallCheck(this, AbstractCharacterDataLike);

        var _this = _possibleConstructorReturn(this, (AbstractCharacterDataLike.__proto__ || Object.getPrototypeOf(AbstractCharacterDataLike)).call(this));

        _this.__data = '';
        _this.__parentNode = null;
        _this.__previousSibling = null;
        _this.__nextSibling = null;
        _this.__data = data;
        _this.__ownerDocument = document;
        return _this;
    }

    _createClass(AbstractCharacterDataLike, [{
        key: 'appendData',
        value: function appendData(data) {
            this.data += data;
            return this.data;
        }
    }, {
        key: 'deleteData',
        value: function deleteData(offset, length) {
            if (offset < 0 || offset % 1 !== 0) {
                throw new Error('The offset argument was invalid.');
            }
            if (length < 0 || length % 1 !== 0) {
                throw new Error('The length argument was invalid.');
            } else if (length === 0) {
                return this.data;
            }
            var before = this.data.slice(0, offset);
            var after = this.data.slice(offset + length, this.length);
            this.data = before + after;
            return this.data;
        }
    }, {
        key: 'insertData',
        value: function insertData(offset, data) {
            if (offset < 0 || offset % 1 !== 0) {
                throw new Error('The offset argument was invalid.');
            }
            if (data.length === 0) {
                return this.data;
            }
            var before = this.data.slice(0, offset);
            var after = this.data.slice(offset, this.length);
            this.data = before + data + after;
            return this.data;
        }
    }, {
        key: 'replaceData',
        value: function replaceData(offset, length, data) {
            if (offset < 0 || offset % 1 !== 0) {
                throw new Error('The offset argument was invalid.');
            }
            if (length < 0 || length % 1 !== 0) {
                throw new Error('The length argument was invalid.');
            }
            if (data.length === 0) {
                return this.data;
            }
            var before = this.data.slice(0, offset);
            var after = this.data.slice(offset + length, this.length);
            this.data = before + data + after;
            return this.data;
        }
    }, {
        key: 'substringData',
        value: function substringData(offset, length) {
            if (offset < 0 || offset % 1 !== 0) {
                throw new Error('The offset argument was invalid.');
            }
            if (length < 0 || length % 1 !== 0) {
                throw new Error('The length argument was invalid.');
            }
            return this.data.slice(offset, length);
        }
    }, {
        key: 'appendChild',
        value: function appendChild(node) {
            node;
            throw new Error('Text nodes do not support appending children.');
        }
    }, {
        key: 'removeChild',
        value: function removeChild(node) {
            node;
            throw new Error('Text nodes do not support removing children.');
        }
    }, {
        key: 'insertBefore',
        value: function insertBefore(newNode, referenceNode) {
            newNode;
            referenceNode;
            throw new Error('Character data nodes cannot have child nodes, and as ' + 'such insertions cannot be performed on them.');
        }
    }, {
        key: 'replaceChild',
        value: function replaceChild(oldNode, newNode) {
            oldNode;
            newNode;
            throw new Error('Character data nodes cannot have child nodes, and as ' + 'such replacements cannot be performed on a child of ' + 'theirs.');
        }
    }, {
        key: 'normalize',
        value: function normalize() {
            return;
        }
    }, {
        key: '__setParentNode',
        value: function __setParentNode(parent) {
            _get(AbstractCharacterDataLike.prototype.__proto__ || Object.getPrototypeOf(AbstractCharacterDataLike.prototype), '__setParentNode', this).call(this, parent);
            return parent;
        }
    }, {
        key: '__setPreviousSibling',
        value: function __setPreviousSibling(previousSibling) {
            _get(AbstractCharacterDataLike.prototype.__proto__ || Object.getPrototypeOf(AbstractCharacterDataLike.prototype), '__setPreviousSibling', this).call(this, previousSibling);
            return previousSibling;
        }
    }]);

    return AbstractCharacterDataLike;
}((0, _MChildNodeLike3.default)(_AbstractNodeLike2.default));

exports.default = AbstractCharacterDataLike;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function isIDocumentTypeLike(node) {
    return node && node.nodeType === 10;
}
exports.default = isIDocumentTypeLike;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _isIDocumentLike = __webpack_require__(4);

var _isIDocumentLike2 = _interopRequireDefault(_isIDocumentLike);

var _isIParentNodeLike = __webpack_require__(30);

var _isIParentNodeLike2 = _interopRequireDefault(_isIParentNodeLike);

var _immutable = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function MParentNodeLike(Base) {
    var MParentNodeLike = function (_Base) {
        _inherits(MParentNodeLike, _Base);

        function MParentNodeLike() {
            _classCallCheck(this, MParentNodeLike);

            var _this2 = _possibleConstructorReturn(this, (MParentNodeLike.__proto__ || Object.getPrototypeOf(MParentNodeLike)).apply(this, arguments));

            _this2.__childNodes = (0, _immutable.OrderedSet)([]);
            _this2.__children = (0, _immutable.OrderedSet)([]);
            return _this2;
        }

        _createClass(MParentNodeLike, [{
            key: 'getDescendantNodes',
            value: function getDescendantNodes() {
                return this.__childNodes.map(function (node) {
                    if ((0, _isIParentNodeLike2.default)(node)) {
                        var _node = node;
                        var arr = [node];
                        return arr.concat(_node.getDescendantNodes());
                    } else {
                        return [node];
                    }
                }).reduce(function (previousArray, nextArray) {
                    return previousArray.concat(nextArray);
                }, []);
            }
        }, {
            key: 'getDescendants',
            value: function getDescendants() {
                if (!(0, _isIParentNodeLike2.default)(this)) {
                    throw new Error('This node is not a parent node, and therefore cannot ' + 'have children.');
                }
                return this.__getMatcher().byTag('*');
            }
        }, {
            key: 'querySelector',
            value: function querySelector(selector) {
                if (!(0, _isIParentNodeLike2.default)(this)) {
                    throw new Error('The node on which the MParentNodeLike mixin was ' + 'applied does not satisfy the type guard for parent ' + 'nodes.');
                }
                return this.__getMatcher().first(selector, this);
            }
        }, {
            key: 'querySelectorAll',
            value: function querySelectorAll(selector) {
                if (!(0, _isIParentNodeLike2.default)(this)) {
                    throw new Error('The node on which the MParentNodeLike mixin was ' + 'applied does not satisfy the type guard for parent ' + 'nodes.');
                }
                return this.__getMatcher().select(selector, this);
            }
        }, {
            key: 'append',
            value: function append() {
                for (var _len = arguments.length, contents = Array(_len), _key = 0; _key < _len; _key++) {
                    contents[_key] = arguments[_key];
                }

                if ((0, _isIDocumentLike2.default)(this)) {
                    var _this = this;
                    contents.forEach(function (value) {
                        if (typeof value === 'string') {
                            throw new Error('A document cannot contain a text node as a ' + 'child.');
                        }
                        var node = value;
                        _this.appendChild(node);
                    });
                } else if ((0, _isIParentNodeLike2.default)(this)) {
                    var _this3 = this;
                    var document = this.ownerDocument;
                    contents.forEach(function (value) {
                        var node = value;
                        if (typeof value === 'string') {
                            node = document.createTextNode(value);
                        }
                        node = node;
                        _this3.appendChild(node);
                    });
                } else {
                    throw new Error('The node to which the ParentNodeLike mixin was ' + 'applied does not meet the IParentNodeLike type ' + 'guard.');
                }
            }
        }, {
            key: 'prepend',
            value: function prepend() {
                for (var _len2 = arguments.length, contents = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    contents[_key2] = arguments[_key2];
                }

                if ((0, _isIDocumentLike2.default)(this)) {
                    var _this = this;
                    var firstChild = _this.firstChild;
                    contents.forEach(function (value) {
                        if (typeof value === 'string') {
                            throw new Error('A document cannot contain a text node as a ' + 'child.');
                        }
                        var node = value;
                        if (firstChild) {
                            _this.insertBefore(node, firstChild);
                        } else {
                            _this.appendChild(node);
                        }
                    });
                } else if ((0, _isIParentNodeLike2.default)(this)) {
                    var _this4 = this;
                    var _firstChild = _this4.firstChild;
                    var document = this.ownerDocument;
                    contents.forEach(function (value) {
                        var node = value;
                        if (typeof value === 'string') {
                            node = document.createTextNode(value);
                        }
                        node = node;
                        if (_firstChild) {
                            _this4.insertBefore(node, _firstChild);
                        } else {
                            _this4.appendChild(node);
                        }
                    });
                } else {
                    throw new Error('The node to which the ParentNodeLike mixin was ' + 'applied does not meet the IParentNodeLike type ' + 'guard.');
                }
            }
        }]);

        return MParentNodeLike;
    }(Base);

    return MParentNodeLike;
}
exports.default = MParentNodeLike;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _DocumentLike = __webpack_require__(3);

var _DocumentLike2 = _interopRequireDefault(_DocumentLike);

var _isIDocumentLike = __webpack_require__(4);

var _isIDocumentLike2 = _interopRequireDefault(_isIDocumentLike);

var _storyDataFactory = __webpack_require__(38);

var _storyDataFactory2 = _interopRequireDefault(_storyDataFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var docConstruct = function docConstruct() {
    return new _DocumentLike2.default();
};
function documentFactory(storyMap) {
    var documentConstructor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : docConstruct;

    var doc = null;
    if (documentConstructor && typeof documentConstructor === 'function') {
        doc = documentConstructor();
    }
    if (!(0, _isIDocumentLike2.default)(doc)) {
        throw new Error('The documentConstructor function did not create a ' + 'valid document.');
    }
    var documentElement = doc.createElement('html');
    doc.appendChild(documentElement);
    var head = doc.createElement('head');
    documentElement.appendChild(head);
    var body = doc.createElement('body');
    documentElement.appendChild(body);
    var storyData = (0, _storyDataFactory2.default)(storyMap, doc);
    body.appendChild(storyData);
    return doc;
}
exports.default = documentFactory;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function isIChildNodeLike(node) {
    return node && typeof node.before === 'function';
}
exports.default = isIChildNodeLike;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _isIChildNodeLike = __webpack_require__(10);

var _isIChildNodeLike2 = _interopRequireDefault(_isIChildNodeLike);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function MChildNodeLike(Base) {
    var MChildNodeLike = function (_Base) {
        _inherits(MChildNodeLike, _Base);

        function MChildNodeLike() {
            _classCallCheck(this, MChildNodeLike);

            return _possibleConstructorReturn(this, (MChildNodeLike.__proto__ || Object.getPrototypeOf(MChildNodeLike)).apply(this, arguments));
        }

        _createClass(MChildNodeLike, [{
            key: 'before',
            value: function before() {
                if (!(0, _isIChildNodeLike2.default)(this)) {
                    throw new Error('The object implementing the MChildNodeLike mixin ' + 'does not pass the isIChildNodeLike type guard.');
                }
                var _this = this;
                var parent = _this.parentNode;
                if (!parent) {
                    throw new Error('The node has no parent.');
                }
                var ownerDocument = _this.ownerDocument;
                if (!ownerDocument) {
                    throw new Error('The node has no owner document.');
                }
                var childNodes = parent.childNodes;
                var index = childNodes.indexOf(_this);
                if (index === -1) {
                    throw new Error('The node on which before was called is not a ' + 'member of its parent\'s childNodes.');
                }

                for (var _len = arguments.length, contents = Array(_len), _key = 0; _key < _len; _key++) {
                    contents[_key] = arguments[_key];
                }

                contents.forEach(function (value) {
                    var newNode = value;
                    if (typeof value === 'string') {
                        newNode = ownerDocument.createTextNode(value);
                    }
                    newNode = newNode;
                    parent.insertBefore(newNode, _this);
                });
            }
        }, {
            key: 'after',
            value: function after() {
                if (!(0, _isIChildNodeLike2.default)(this)) {
                    throw new Error('The object implementing the MChildNodeLike mixin ' + 'does not pass the isIChildNodeLike type guard.');
                }
                var _this = this;
                var parent = _this.parentNode;
                if (!parent) {
                    throw new Error('The node has no parent.');
                }
                var ownerDocument = _this.ownerDocument;
                if (!ownerDocument) {
                    throw new Error('The node has no owner document.');
                }

                for (var _len2 = arguments.length, contents = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    contents[_key2] = arguments[_key2];
                }

                contents.forEach(function (value) {
                    var newNode = value;
                    if (typeof value === 'string') {
                        newNode = ownerDocument.createTextNode(value);
                    }
                    newNode = newNode;
                    parent.insertBefore(newNode, _this);
                });
            }
        }, {
            key: 'replaceWith',
            value: function replaceWith() {
                if (!(0, _isIChildNodeLike2.default)(this)) {
                    throw new Error('The object implementing the MChildNodeLike mixin ' + 'does not pass the isIChildNodeLike type guard.');
                }
                var _this = this;
                var parent = _this.parentNode;
                if (!parent) {
                    throw new Error('The node has no parent.');
                }
                var ownerDocument = _this.ownerDocument;
                if (!ownerDocument) {
                    throw new Error('The node has no owner document.');
                }
                var sibling = _this.nextSibling;
                parent.removeChild(_this);

                for (var _len3 = arguments.length, contents = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                    contents[_key3] = arguments[_key3];
                }

                contents.forEach(function (value) {
                    var newNode = value;
                    if (typeof value === 'string') {
                        newNode = ownerDocument.createTextNode(value);
                    }
                    newNode = newNode;
                    if (sibling) {
                        parent.insertBefore(sibling, newNode);
                    } else {
                        parent.appendChild(newNode);
                    }
                });
            }
        }, {
            key: 'remove',
            value: function remove() {
                if (!(0, _isIChildNodeLike2.default)(this)) {
                    throw new Error('The object implementing the MChildNodeLike mixin ' + 'does not pass the isIChildNodeLike type guard.');
                }
                var _this = this;
                var parent = _this.parentNode;
                if (!parent) {
                    throw new Error('The node has no parent.');
                }
                parent.removeChild(_this);
            }
        }]);

        return MChildNodeLike;
    }(Base);

    return MChildNodeLike;
}
exports.default = MChildNodeLike;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function isIDocumentFragmentLike(node) {
    return node && node.nodeType === 11;
}
exports.default = isIDocumentFragmentLike;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractTextLike2 = __webpack_require__(37);

var _AbstractTextLike3 = _interopRequireDefault(_AbstractTextLike2);

var _isIElementLike = __webpack_require__(0);

var _isIElementLike2 = _interopRequireDefault(_isIElementLike);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextLike = function (_AbstractTextLike) {
    _inherits(TextLike, _AbstractTextLike);

    function TextLike() {
        _classCallCheck(this, TextLike);

        return _possibleConstructorReturn(this, (TextLike.__proto__ || Object.getPrototypeOf(TextLike)).apply(this, arguments));
    }

    _createClass(TextLike, [{
        key: 'data',
        get: function get() {
            return this.__data;
        },
        set: function set(data) {
            this.__data = data;
        }
    }, {
        key: 'textContent',
        get: function get() {
            return this.__data;
        },
        set: function set(textContent) {
            this.__data = textContent;
        }
    }, {
        key: 'nodeValue',
        get: function get() {
            return this.__data;
        },
        set: function set(value) {
            this.__data = value;
        }
    }, {
        key: 'length',
        get: function get() {
            return this.__data.length;
        }
    }, {
        key: 'ownerDocument',
        get: function get() {
            return this.__ownerDocument;
        }
    }, {
        key: 'parentElement',
        get: function get() {
            return this.__parentNode;
        }
    }, {
        key: 'parentNode',
        get: function get() {
            return this.__parentNode;
        }
    }, {
        key: 'previousSibling',
        get: function get() {
            return this.__previousSibling;
        }
    }, {
        key: 'nextSibling',
        get: function get() {
            return this.__nextSibling;
        }
    }, {
        key: 'previousElementSibling',
        get: function get() {
            if (!this.__parentNode) {
                return null;
            }
            var node = this.__previousSibling;
            var counter = 0;
            var length = this.__parentNode.childNodes.length;
            while (node) {
                if (counter > length) {
                    throw new Error('Possible infinite loop detected. A previousSibling ' + 'property may be misset.');
                }
                if ((0, _isIElementLike2.default)(node)) {
                    return node;
                }
                node = node.previousSibling;
                counter += 1;
            }
            return null;
        }
    }, {
        key: 'nextElementSibling',
        get: function get() {
            if (!this.__parentNode) {
                return null;
            }
            var node = this.nextSibling;
            var counter = 0;
            var length = this.__parentNode.childNodes.length;
            while (node) {
                if (counter > length) {
                    throw new Error('Possible infinite loop detected. A nextSibling ' + 'property may be misset.');
                }
                if ((0, _isIElementLike2.default)(node)) {
                    return node;
                }
                node = node.nextSibling;
                counter += 1;
            }
            return null;
        }
    }, {
        key: 'childNodes',
        get: function get() {
            return [];
        }
    }, {
        key: 'firstChild',
        get: function get() {
            return null;
        }
    }, {
        key: 'lastChild',
        get: function get() {
            return null;
        }
    }]);

    return TextLike;
}(_AbstractTextLike3.default);

exports.default = TextLike;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Copyright (C) 2007-2017 Diego Perini
 * All rights reserved.
 *
 * nwmatcher.js - A fast CSS selector engine and matcher
 *
 * Author: Diego Perini <diego.perini at gmail com>
 * Version: 1.4.3
 * Created: 20070722
 * Release: 20171011
 *
 * License:
 *  http://javascript.nwbox.com/NWMatcher/MIT-LICENSE
 * Download:
 *  http://javascript.nwbox.com/NWMatcher/nwmatcher.js
 */

(function(global, factory) {

  if (true) {
    module.exports = factory;
  } else if (typeof define === 'function' && define["amd"]) {
    define(factory);
  } else {
    global.NW || (global.NW = { });
    global.NW.Dom = factory(global);
  }

})(this, function(global) {

  var version = 'nwmatcher-1.4.3',

  // processing context & root element
  doc = global.document,
  root = doc.documentElement,

  // save utility methods references
  slice = [ ].slice,

  // persist previous parsed data
  isSingleMatch,
  isSingleSelect,

  lastSlice,
  lastContext,
  lastPosition,

  lastMatcher,
  lastSelector,

  lastPartsMatch,
  lastPartsSelect,

  // accepted prefix identifiers
  // (id, class & pseudo-class)
  prefixes = '(?:[#.:]|::)?',

  // accepted attribute operators
  operators = '([~*^$|!]?={1})',

  // accepted whitespace characters
  whitespace = '[\\x20\\t\\n\\r\\f]',

  // 4 combinators F E, F>E, F+E, F~E
  combinators = '\\x20|[>+~](?=[^>+~])',

  // an+b format params for pseudo-classes
  pseudoparms = '(?:[-+]?\\d*n)?[-+]?\\d*',

  // skip [ ], ( ), { } brackets groups
  skip_groups = '\\[.*\\]|\\(.*\\)|\\{.*\\}',

  // any escaped char
  any_esc_chr = '\\\\.',
  // alpha chars & low dash
  alphalodash = '[_a-zA-Z]',
  // non-ascii chars (utf-8)
  non_asc_chr = '[^\\x00-\\x9f]',
  // escape sequences in strings
  escaped_chr = '\\\\[^\\n\\r\\f0-9a-fA-F]',
  // Unicode chars including trailing whitespace
  unicode_chr = '\\\\[0-9a-fA-F]{1,6}(?:\\r\\n|' + whitespace + ')?',

  // CSS quoted string values
  quotedvalue = '"[^"\\\\]*(?:\\\\.[^"\\\\]*)*"' + "|'[^'\\\\]*(?:\\\\.[^'\\\\]*)*'",

  // regular expression used to skip single/nested brackets groups (round, square, curly)
  // used to split comma groups excluding commas inside quotes '' "" or brackets () [] {}
  reSplitGroup = /([^,\\()[\]]+|\[[^[\]]*\]|\[.*\]|\([^()]+\)|\(.*\)|\{[^{}]+\}|\{.*\}|\\.)+/g,

  // regular expression to trim extra leading/trailing whitespace in selector strings
  // whitespace is any combination of these 5 character [\x20\t\n\r\f]
  // http://www.w3.org/TR/css3-selectors/#selector-syntax
  reTrimSpaces = RegExp('[\\n\\r\\f]|^' + whitespace + '+|' + whitespace + '+$', 'g'),

  // regular expression used in convertEscapes and unescapeIdentifier
  reEscapedChars = /\\([0-9a-fA-F]{1,6}[\x20\t\n\r\f]?|.)|([\x22\x27])/g,

  // for in excess whitespace removal
  reWhiteSpace = /[\x20\t\n\r\f]+/g,

  standardValidator, extendedValidator, reValidator,

  attrcheck, attributes, attrmatcher, pseudoclass,

  reOptimizeSelector, reSimpleNot, reSplitToken,

  Optimize, reClass, reSimpleSelector,

  // http://www.w3.org/TR/css3-syntax/#characters
  // unicode/ISO 10646 characters \xA0 and higher
  // NOTE: Safari 2.0.x crashes with escaped (\\)
  // Unicode ranges in regular expressions so we
  // use a negated character range class instead
  // now assigned at runtime from config options
  identifier,

  // placeholder for extensions
  extensions = '.+',

  // precompiled Regular Expressions
  Patterns = {
    // structural pseudo-classes and child selectors
    spseudos: /^\:(root|empty|(?:first|last|only)(?:-child|-of-type)|nth(?:-last)?(?:-child|-of-type)\(\s*(even|odd|(?:[-+]{0,1}\d*n\s*)?[-+]{0,1}\s*\d*)\s*\))?(.*)/i,
    // uistates + dynamic + negation pseudo-classes
    dpseudos: /^\:(link|visited|target|active|focus|hover|checked|disabled|enabled|selected|lang\(([-\w]{2,})\)|(?:matches|not)\(\s*(:nth(?:-last)?(?:-child|-of-type)\(\s*(?:even|odd|(?:[-+]{0,1}\d*n\s*)?[-+]{0,1}\s*\d*)\s*\)|[^()]*)\s*\))?(.*)/i,
    // pseudo-elements selectors
    epseudos: /^((?:[:]{1,2}(?:after|before|first-letter|first-line))|(?:[:]{2,2}(?:selection|backdrop|placeholder)))?(.*)/i,
    // E > F
    children: RegExp('^' + whitespace + '*\\>' + whitespace + '*(.*)'),
    // E + F
    adjacent: RegExp('^' + whitespace + '*\\+' + whitespace + '*(.*)'),
    // E ~ F
    relative: RegExp('^' + whitespace + '*\\~' + whitespace + '*(.*)'),
    // E F
    ancestor: RegExp('^' + whitespace + '+(.*)'),
    // all
    universal: RegExp('^\\*(.*)')
  },

  Tokens = {
    prefixes: prefixes,
    identifier: identifier,
    attributes: attributes
  },

  /*----------------------------- FEATURE TESTING ----------------------------*/

  // detect native methods
  isNative = (function() {
    var re = / \w+\(/,
    isnative = String(({ }).toString).replace(re, ' (');
    return function(method) {
      return method && typeof method != 'string' &&
        isnative == String(method).replace(re, ' (');
    };
  })(),

  // NATIVE_XXXXX true if method exist and is callable
  // detect if DOM methods are native in browsers
  NATIVE_FOCUS = isNative(doc.hasFocus),
  NATIVE_QSAPI = isNative(doc.querySelector),
  NATIVE_GEBID = isNative(doc.getElementById),
  NATIVE_GEBTN = isNative(root.getElementsByTagName),
  NATIVE_GEBCN = isNative(root.getElementsByClassName),

  // detect native getAttribute/hasAttribute methods,
  // frameworks extend these to elements, but it seems
  // this does not work for XML namespaced attributes,
  // used to check both getAttribute/hasAttribute in IE
  NATIVE_GET_ATTRIBUTE = isNative(root.getAttribute),
  NATIVE_HAS_ATTRIBUTE = isNative(root.hasAttribute),

  // check if slice() can convert nodelist to array
  // see http://yura.thinkweb2.com/cft/
  NATIVE_SLICE_PROTO =
    (function() {
      var isBuggy = false;
      try {
        isBuggy = !!slice.call(doc.childNodes, 0)[0];
      } catch(e) { }
      return isBuggy;
    })(),

  // supports the new traversal API
  NATIVE_TRAVERSAL_API =
    'nextElementSibling' in root && 'previousElementSibling' in root,

  // BUGGY_XXXXX true if method is feature tested and has known bugs
  // detect buggy gEBID
  BUGGY_GEBID = NATIVE_GEBID ?
    (function() {
      var isBuggy = true, x = 'x' + String(+new Date),
        a = doc.createElementNS ? 'a' : '<a name="' + x + '">';
      (a = doc.createElement(a)).name = x;
      root.insertBefore(a, root.firstChild);
      isBuggy = !!doc.getElementById(x);
      root.removeChild(a);
      return isBuggy;
    })() :
    true,

  // detect IE gEBTN comment nodes bug
  BUGGY_GEBTN = NATIVE_GEBTN ?
    (function() {
      var div = doc.createElement('div');
      div.appendChild(doc.createComment(''));
      return !!div.getElementsByTagName('*')[0];
    })() :
    true,

  // detect Opera gEBCN second class and/or UTF8 bugs as well as Safari 3.2
  // caching class name results and not detecting when changed,
  // tests are based on the jQuery selector test suite
  BUGGY_GEBCN = NATIVE_GEBCN ?
    (function() {
      var isBuggy, div = doc.createElement('div'), test = '\u53f0\u5317';

      // Opera tests
      div.appendChild(doc.createElement('span')).
        setAttribute('class', test + 'abc ' + test);
      div.appendChild(doc.createElement('span')).
        setAttribute('class', 'x');

      isBuggy = !div.getElementsByClassName(test)[0];

      // Safari test
      div.lastChild.className = test;
      return isBuggy || div.getElementsByClassName(test).length != 2;
    })() :
    true,

  // detect IE bug with dynamic attributes
  BUGGY_GET_ATTRIBUTE = NATIVE_GET_ATTRIBUTE ?
    (function() {
      var input = doc.createElement('input');
      input.setAttribute('value', 5);
      return input.defaultValue != 5;
    })() :
    true,

  // detect IE bug with non-standard boolean attributes
  BUGGY_HAS_ATTRIBUTE = NATIVE_HAS_ATTRIBUTE ?
    (function() {
      var option = doc.createElement('option');
      option.setAttribute('selected', 'selected');
      return !option.hasAttribute('selected');
    })() :
    true,

  // detect Safari bug with selected option elements
  BUGGY_SELECTED =
    (function() {
      var select = doc.createElement('select');
      select.appendChild(doc.createElement('option'));
      return !select.firstChild.selected;
    })(),

  // initialized with the loading context
  // and reset for each different context
  BUGGY_QUIRKS_GEBCN,
  BUGGY_QUIRKS_QSAPI,

  QUIRKS_MODE,
  XML_DOCUMENT,

  // detect Opera browser
  OPERA = typeof global.opera != 'undefined' &&
    (/opera/i).test(({ }).toString.call(global.opera)),

  // skip simple selector optimizations for Opera >= 11
  OPERA_QSAPI = OPERA && parseFloat(global.opera.version()) >= 11,

  // check Selector API implementations
  RE_BUGGY_QSAPI = NATIVE_QSAPI ?
    (function() {
      var pattern = [ ], context, element,

      expect = function(selector, element, n) {
        var result = false;
        context.appendChild(element);
        try { result = context.querySelectorAll(selector).length == n; } catch(e) { }
        while (context.firstChild) { context.removeChild(context.firstChild); }
        return result;
      };

      // certain bugs can only be detected in standard documents
      // to avoid writing a live loading document create a fake one
      if (doc.implementation && doc.implementation.createDocument) {
        // use a shadow document body as context
        context = doc.implementation.createDocument('', '', null).
          appendChild(doc.createElement('html')).
          appendChild(doc.createElement('head')).parentNode.
          appendChild(doc.createElement('body'));
      } else {
        // use an unattached div node as context
        context = doc.createElement('div');
      }

      // fix for Safari 8.x and other engines that
      // fail querying filtered sibling combinators
      element = doc.createElement('div');
      element.innerHTML = '<p id="a"></p><br>';
      expect('p#a+*', element, 0) &&
        pattern.push('\\w+#\\w+.*[+~]');

      // ^= $= *= operators bugs with empty values (Opera 10 / IE8)
      element = doc.createElement('p');
      element.setAttribute('class', '');
      expect('[class^=""]', element, 1) &&
        pattern.push('[*^$]=[\\x20\\t\\n\\r\\f]*(?:""|' + "'')");

      // :checked bug with option elements (Firefox 3.6.x)
      // it wrongly includes 'selected' options elements
      // HTML5 rules says selected options also match
      element = doc.createElement('option');
      element.setAttribute('selected', 'selected');
      expect(':checked', element, 0) &&
        pattern.push(':checked');

      // :enabled :disabled bugs with hidden fields (Firefox 3.5)
      // http://www.w3.org/TR/html5/links.html#selector-enabled
      // http://www.w3.org/TR/css3-selectors/#enableddisabled
      // not supported by IE8 Query Selector
      element = doc.createElement('input');
      element.setAttribute('type', 'hidden');
      expect(':enabled', element, 0) &&
        pattern.push(':enabled', ':disabled');

      // :link bugs with hyperlinks matching (Firefox/Safari)
      element = doc.createElement('link');
      element.setAttribute('href', 'x');
      expect(':link', element, 1) ||
        pattern.push(':link');

      // avoid attribute selectors for IE QSA
      if (BUGGY_HAS_ATTRIBUTE) {
        // IE fails in reading:
        // - original values for input/textarea
        // - original boolean values for controls
        pattern.push('\\[[\\x20\\t\\n\\r\\f]*(?:checked|disabled|ismap|multiple|readonly|selected|value)');
      }

      return pattern.length ?
        RegExp(pattern.join('|')) :
        { 'test': function() { return false; } };

    })() :
    true,

  /*----------------------------- LOOKUP OBJECTS -----------------------------*/

  IE_LT_9 = typeof doc.addEventListener != 'function',

  LINK_NODES = { 'a': 1, 'A': 1, 'area': 1, 'AREA': 1, 'link': 1, 'LINK': 1 },

  // boolean attributes should return attribute name instead of true/false
  ATTR_BOOLEAN = {
    'checked': 1, 'disabled': 1, 'ismap': 1,
    'multiple': 1, 'readonly': 1, 'selected': 1
  },

  // dynamic attributes that needs to be checked against original HTML value
  ATTR_DEFAULT = {
    'value': 'defaultValue',
    'checked': 'defaultChecked',
    'selected': 'defaultSelected'
  },

  // attributes referencing URI data values need special treatment in IE
  ATTR_URIDATA = {
    'action': 2, 'cite': 2, 'codebase': 2, 'data': 2, 'href': 2,
    'longdesc': 2, 'lowsrc': 2, 'src': 2, 'usemap': 2
  },

  // HTML 5 draft specifications
  // http://www.whatwg.org/specs/web-apps/current-work/#selectors
  HTML_TABLE = {
    // NOTE: class name attribute selectors must always be treated using a
    // case-sensitive match, this has changed from previous specifications
    'accept': 1, 'accept-charset': 1, 'align': 1, 'alink': 1, 'axis': 1,
    'bgcolor': 1, 'charset': 1, 'checked': 1, 'clear': 1, 'codetype': 1, 'color': 1,
    'compact': 1, 'declare': 1, 'defer': 1, 'dir': 1, 'direction': 1, 'disabled': 1,
    'enctype': 1, 'face': 1, 'frame': 1, 'hreflang': 1, 'http-equiv': 1, 'lang': 1,
    'language': 1, 'link': 1, 'media': 1, 'method': 1, 'multiple': 1, 'nohref': 1,
    'noresize': 1, 'noshade': 1, 'nowrap': 1, 'readonly': 1, 'rel': 1, 'rev': 1,
    'rules': 1, 'scope': 1, 'scrolling': 1, 'selected': 1, 'shape': 1, 'target': 1,
    'text': 1, 'type': 1, 'valign': 1, 'valuetype': 1, 'vlink': 1
  },

  /*-------------------------- REGULAR EXPRESSIONS ---------------------------*/

  // placeholder to add functionalities
  Selectors = {
    // as a simple example this will check
    // for chars not in standard ascii table
    //
    // 'mySpecialSelector': {
    //  'Expression': /\u0080-\uffff/,
    //  'Callback': mySelectorCallback
    // }
    //
    // 'mySelectorCallback' will be invoked
    // only after passing all other standard
    // checks and only if none of them worked
  },

  // attribute operators
  Operators = {
     '=': "n=='%m'",
    '^=': "n.indexOf('%m')==0",
    '*=': "n.indexOf('%m')>-1",
    '|=': "(n+'-').indexOf('%m-')==0",
    '~=': "(' '+n+' ').indexOf(' %m ')>-1",
    '$=': "n.substr(n.length-'%m'.length)=='%m'"
  },

  /*------------------------------ UTIL METHODS ------------------------------*/

  // concat elements to data
  concatList =
    function(data, elements) {
      var i = -1, element;
      if (!data.length && Array.slice)
        return Array.slice(elements);
      while ((element = elements[++i]))
        data[data.length] = element;
      return data;
    },

  // concat elements to data and callback
  concatCall =
    function(data, elements, callback) {
      var i = -1, element;
      while ((element = elements[++i])) {
        if (false === callback(data[data.length] = element)) { break; }
      }
      return data;
    },

  // change context specific variables
  switchContext =
    function(from, force) {
      var div, oldDoc = doc;
      // save passed context
      lastContext = from;
      // set new context document
      doc = from.ownerDocument || from;
      if (force || oldDoc !== doc) {
        // set document root
        root = doc.documentElement;
        // set host environment flags
        XML_DOCUMENT = doc.createElement('DiV').nodeName == 'DiV';

        // In quirks mode css class names are case insensitive.
        // In standards mode they are case sensitive. See docs:
        // https://developer.mozilla.org/en/Mozilla_Quirks_Mode_Behavior
        // http://www.whatwg.org/specs/web-apps/current-work/#selectors
        QUIRKS_MODE = !XML_DOCUMENT &&
          typeof doc.compatMode == 'string' ?
          doc.compatMode.indexOf('CSS') < 0 :
          (function() {
            var style = doc.createElement('div').style;
            return style && (style.width = 1) && style.width == '1px';
          })();

        div = doc.createElement('div');
        div.appendChild(doc.createElement('p')).setAttribute('class', 'xXx');
        div.appendChild(doc.createElement('p')).setAttribute('class', 'xxx');

        // GEBCN buggy in quirks mode, match count is:
        // Firefox 3.0+ [xxx = 1, xXx = 1]
        // Opera 10.63+ [xxx = 0, xXx = 2]
        BUGGY_QUIRKS_GEBCN =
          !XML_DOCUMENT && NATIVE_GEBCN && QUIRKS_MODE &&
          (div.getElementsByClassName('xxx').length != 2 ||
          div.getElementsByClassName('xXx').length != 2);

        // QSAPI buggy in quirks mode, match count is:
        // At least Chrome 4+, Firefox 3.5+, Opera 10.x+, Safari 4+ [xxx = 1, xXx = 2]
        // Safari 3.2 QSA doesn't work with mixedcase in quirksmode [xxx = 1, xXx = 0]
        // https://bugs.webkit.org/show_bug.cgi?id=19047
        // must test the attribute selector '[class~=xxx]'
        // before '.xXx' or the bug may not present itself
        BUGGY_QUIRKS_QSAPI =
          !XML_DOCUMENT && NATIVE_QSAPI && QUIRKS_MODE &&
          (div.querySelectorAll('[class~=xxx]').length != 2 ||
          div.querySelectorAll('.xXx').length != 2);

        Config.CACHING && Dom.setCache(true, doc);
      }
    },

  // convert single codepoint to UTF-16 encoding
  codePointToUTF16 =
    function(codePoint) {
      // out of range, use replacement character
      if (codePoint < 1 || codePoint > 0x10ffff ||
        (codePoint > 0xd7ff && codePoint < 0xe000)) {
        return '\\ufffd';
      }
      // javascript strings are UTF-16 encoded
      if (codePoint < 0x10000) {
        var lowHex = '000' + codePoint.toString(16);
        return '\\u' + lowHex.substr(lowHex.length - 4);
      }
      // supplementary high + low surrogates
      return '\\u' + (((codePoint - 0x10000) >> 0x0a) + 0xd800).toString(16) +
             '\\u' + (((codePoint - 0x10000) % 0x400) + 0xdc00).toString(16);
    },

  // convert single codepoint to string
  stringFromCodePoint =
    function(codePoint) {
      // out of range, use replacement character
      if (codePoint < 1 || codePoint > 0x10ffff ||
        (codePoint > 0xd7ff && codePoint < 0xe000)) {
        return '\ufffd';
      }
      if (codePoint < 0x10000) {
        return String.fromCharCode(codePoint);
      }
      return String.fromCodePoint ?
        String.fromCodePoint(codePoint) :
        String.fromCharCode(
          ((codePoint - 0x10000) >> 0x0a) + 0xd800,
          ((codePoint - 0x10000) % 0x400) + 0xdc00);
    },

  // convert escape sequence in a CSS string or identifier
  // to javascript string with javascript escape sequences
  convertEscapes =
    function(str) {
      return str.replace(reEscapedChars,
          function(substring, p1, p2) {
            // unescaped " or '
            return p2 ? '\\' + p2 :
              // javascript strings are UTF-16 encoded
              /^[0-9a-fA-F]/.test(p1) ? codePointToUTF16(parseInt(p1, 16)) :
              // \' \"
              /^[\\\x22\x27]/.test(p1) ? substring :
              // \g \h \. \# etc
              p1;
          }
        );
    },

  // convert escape sequence in a CSS string or identifier
  // to javascript string with characters representations
  unescapeIdentifier =
    function(str) {
      return str.replace(reEscapedChars,
          function(substring, p1, p2) {
            // unescaped " or '
            return p2 ? p2 :
              // javascript strings are UTF-16 encoded
              /^[0-9a-fA-F]/.test(p1) ? stringFromCodePoint(parseInt(p1, 16)) :
              // \' \"
              /^[\\\x22\x27]/.test(p1) ? substring :
              // \g \h \. \# etc
              p1;
          }
        );
    },

  /*------------------------------ DOM METHODS -------------------------------*/

  // element by id (raw)
  // @return reference or null
  byIdRaw =
    function(id, elements) {
      var i = -1, element;
      while ((element = elements[++i])) {
        if (element.getAttribute('id') == id) {
          break;
        }
      }
      return element || null;
    },

  // element by id
  // @return reference or null
  _byId = !BUGGY_GEBID ?
    function(id, from) {
      id = (/\\/).test(id) ? unescapeIdentifier(id) : id;
      return from.getElementById && from.getElementById(id) ||
        byIdRaw(id, from.getElementsByTagName('*'));
    } :
    function(id, from) {
      var element = null;
      id = (/\\/).test(id) ? unescapeIdentifier(id) : id;
      if (XML_DOCUMENT || from.nodeType != 9) {
        return byIdRaw(id, from.getElementsByTagName('*'));
      }
      if ((element = from.getElementById(id)) &&
        element.name == id && from.getElementsByName) {
        return byIdRaw(id, from.getElementsByName(id));
      }
      return element;
    },

  // publicly exposed byId
  // @return reference or null
  byId =
    function(id, from) {
      from || (from = doc);
      if (lastContext !== from) { switchContext(from); }
      return _byId(id, from);
    },

  // elements by tag (raw)
  // @return array
  byTagRaw =
    function(tag, from) {
      var any = tag == '*', element = from, elements = [ ], next = element.firstChild;
      any || (tag = tag.toUpperCase());
      while ((element = next)) {
        if (element.tagName > '@' && (any || element.tagName.toUpperCase() == tag)) {
          elements[elements.length] = element;
        }
        if ((next = element.firstChild || element.nextSibling)) continue;
        while (!next && (element = element.parentNode) && element !== from) {
          next = element.nextSibling;
        }
      }
      return elements;
    },

  // elements by tag
  // @return array
  _byTag = !BUGGY_GEBTN && NATIVE_SLICE_PROTO ?
    function(tag, from) {
      return XML_DOCUMENT || from.nodeType == 11 ? byTagRaw(tag, from) :
        slice.call(from.getElementsByTagName(tag), 0);
    } :
    function(tag, from) {
      var i = -1, j = i, data = [ ], element,
        elements = XML_DOCUMENT || from.nodeType == 11 ?
        byTagRaw(tag, from) : from.getElementsByTagName(tag);
      if (tag == '*') {
        while ((element = elements[++i])) {
          if (element.nodeName > '@') {
            data[++j] = element;
          }
        }
      } else {
        while ((element = elements[++i])) {
          data[i] = element;
        }
      }
      return data;
    },

  // publicly exposed byTag
  // @return array
  byTag =
    function(tag, from) {
      from || (from = doc);
      if (lastContext !== from) { switchContext(from); }
      return _byTag(tag, from);
    },

  // publicly exposed byName
  // @return array
  byName =
    function(name, from) {
      return select('[name="' + name.replace(/\\([^\\]{1})/g, '$1') + '"]', from);
    },

  // elements by class (raw)
  // @return array
  byClassRaw =
    function(name, from) {
      var i = -1, j = i, data = [ ], element, elements = _byTag('*', from), n;
      name = ' ' + (QUIRKS_MODE ? name.toLowerCase() : name) + ' ';
      while ((element = elements[++i])) {
        n = XML_DOCUMENT ? element.getAttribute('class') : element.className;
        if (n && n.length && (' ' + (QUIRKS_MODE ? n.toLowerCase() : n).
          replace(reWhiteSpace, ' ') + ' ').indexOf(name) > -1) {
          data[++j] = element;
        }
      }
      return data;
    },

  // elements by class
  // @return array
  _byClass =
    function(name, from) {
      name = QUIRKS_MODE ? name.toLowerCase() : name;
      name = (/\\/).test(name) ? unescapeIdentifier(name) : name;
      return (BUGGY_GEBCN || BUGGY_QUIRKS_GEBCN || XML_DOCUMENT || !from.getElementsByClassName) ?
        byClassRaw(name, from) : slice.call(from.getElementsByClassName(name));
    },

  // publicly exposed byClass
  // @return array
  byClass =
    function(name, from) {
      from || (from = doc);
      if (lastContext !== from) { switchContext(from); }
      return _byClass(name, from);
    },

  // check element is descendant of container
  // @return boolean
  contains = 'compareDocumentPosition' in root ?
    function(container, element) {
      return (container.compareDocumentPosition(element) & 16) == 16;
    } : 'contains' in root ?
    function(container, element) {
      return container !== element && container.contains(element);
    } :
    function(container, element) {
      while ((element = element.parentNode)) {
        if (element === container) return true;
      }
      return false;
    },

  // attribute value
  // @return string
  getAttribute = !BUGGY_GET_ATTRIBUTE && !IE_LT_9 ?
    function(node, attribute) {
      return node.getAttribute(attribute);
    } :
    function(node, attribute) {
      attribute = attribute.toLowerCase();
      if (typeof node[attribute] == 'object') {
        return node.attributes[attribute] &&
          node.attributes[attribute].value;
      }
      return (
        // 'type' can only be read by using native getAttribute
        attribute == 'type' ? node.getAttribute(attribute) :
        // specific URI data attributes (parameter 2 to fix IE bug)
        ATTR_URIDATA[attribute] ? node.getAttribute(attribute, 2) :
        // boolean attributes should return name instead of true/false
        ATTR_BOOLEAN[attribute] ? node.getAttribute(attribute) ? attribute : 'false' :
          (node = node.getAttributeNode(attribute)) && node.value);
    },

  // attribute presence
  // @return boolean
  hasAttribute = !BUGGY_HAS_ATTRIBUTE && !IE_LT_9 ?
    function(node, attribute) {
      return XML_DOCUMENT ?
        !!node.getAttribute(attribute) :
        node.hasAttribute(attribute);
    } :
    function(node, attribute) {
      // read the node attribute object
      var obj = node.getAttributeNode(attribute = attribute.toLowerCase());
      return ATTR_DEFAULT[attribute] && attribute != 'value' ?
        node[ATTR_DEFAULT[attribute]] : obj && obj.specified;
    },

  // check node emptyness
  // @return boolean
  isEmpty =
    function(node) {
      node = node.firstChild;
      while (node) {
        if (node.nodeType == 3 || node.nodeName > '@') return false;
        node = node.nextSibling;
      }
      return true;
    },

  // check if element matches the :link pseudo
  // @return boolean
  isLink =
    function(element) {
      return hasAttribute(element,'href') && LINK_NODES[element.nodeName];
    },

  // child position by nodeType
  // @return number
  nthElement =
    function(element, last) {
      var count = 1, succ = last ? 'nextSibling' : 'previousSibling';
      while ((element = element[succ])) {
        if (element.nodeName > '@') ++count;
      }
      return count;
    },

  // child position by nodeName
  // @return number
  nthOfType =
    function(element, last) {
      var count = 1, succ = last ? 'nextSibling' : 'previousSibling', type = element.nodeName;
      while ((element = element[succ])) {
        if (element.nodeName == type) ++count;
      }
      return count;
    },

  /*------------------------------- DEBUGGING --------------------------------*/

  // get/set (string/object) working modes
  configure =
    function(option) {
      if (typeof option == 'string') { return !!Config[option]; }
      if (typeof option != 'object') { return Config; }
      for (var i in option) {
        Config[i] = !!option[i];
        if (i == 'SIMPLENOT') {
          matchContexts = { };
          matchResolvers = { };
          selectContexts = { };
          selectResolvers = { };
          if (!Config[i]) { Config['USE_QSAPI'] = false; }
        } else if (i == 'USE_QSAPI') {
          Config[i] = !!option[i] && NATIVE_QSAPI;
        }
      }
      setIdentifierSyntax();
      reValidator = RegExp(Config.SIMPLENOT ?
        standardValidator : extendedValidator);
      return true;
    },

  // control user notifications
  emit =
    function(message) {
      if (Config.VERBOSITY) { throw Error(message); }
      if (Config.LOGERRORS && console && console.log) {
        console.log(message);
      }
    },

  Config = {

    // true to enable caching of result sets, false to disable
    CACHING: false,

    // true to allow CSS escaped identifiers, false to disallow
    ESCAPECHR: true,

    // true to allow identifiers containing non-ASCII (utf-8) chars
    NON_ASCII: true,

    // switch syntax RE, true to use Level 3, false to use Level 2
    SELECTOR3: true,

    // true to allow identifiers containing Unicode (utf-16) chars
    UNICODE16: true,

    // by default do not add missing left/right context
    // to mangled selector strings like "+div" or "ul>"
    // callable Dom.shortcuts method has to be available
    SHORTCUTS: false,

    // true to disable complex selectors nested in
    // ':not()' pseudo-classes as for specifications
    SIMPLENOT: true,

    // true to match lowercase tag names of SVG elements in HTML
    SVG_LCASE: false,

    // strict QSA match all non-unique IDs (false)
    // speed & libs compat match unique ID (true)
    UNIQUE_ID: true,

    // true to follow HTML5 specs handling of ":checked"
    // pseudo-class and similar UI states (indeterminate)
    USE_HTML5: true,

    // true to use browsers native Query Selector API if available
    USE_QSAPI: NATIVE_QSAPI,

    // true to throw exceptions, false to skip throwing exceptions
    VERBOSITY: true,

    // true to print console errors or warnings, false to mute them
    LOGERRORS: true

  },

  /*---------------------------- COMPILER METHODS ----------------------------*/

  // init REs and context
  initialize =
    function(doc) {
      setIdentifierSyntax();
      switchContext(doc, true);
    },

  // set/reset default identifier syntax
  // based on user configuration options
  // rebuild the validator and other REs
  setIdentifierSyntax =
    function() {

      var syntax = '', start = Config['SELECTOR3'] ? '-{2}|' : '';

      Config['NON_ASCII'] && (syntax += '|' + non_asc_chr);
      Config['UNICODE16'] && (syntax += '|' + unicode_chr);
      Config['ESCAPECHR'] && (syntax += '|' + escaped_chr);

      syntax += (Config['UNICODE16'] || Config['ESCAPECHR']) ? '' : '|' + any_esc_chr;

      identifier = '-?(?:' + start + alphalodash + syntax + ')(?:-|[0-9]|' + alphalodash + syntax + ')*';

      // build attribute string
      attrcheck = '(' + quotedvalue + '|' + identifier + ')';
      attributes = whitespace + '*(' + identifier + '(?::' + identifier + ')?)' +
        whitespace + '*(?:' + operators + whitespace + '*' + attrcheck + ')?' + whitespace + '*' + '(i)?' + whitespace + '*';
      attrmatcher = attributes.replace(attrcheck, '([\\x22\\x27]*)((?:\\\\?.)*?)\\3');

      // build pseudoclass string
      pseudoclass = '((?:' +
        // an+b parameters or quoted string
        pseudoparms + '|' + quotedvalue + '|' +
        // id, class, pseudo-class selector
        prefixes + identifier + '|' +
        // nested HTML attribute selector
        '\\[' + attributes + '\\]|' +
        // nested pseudo-class selector
        '\\(.+\\)|' + whitespace + '*|' +
        // nested pseudos/separators
        ',)+)';

      // CSS3: syntax scanner and
      // one pass validation only
      // using regular expression
      standardValidator =
        // discard start
        '(?=[\\x20\\t\\n\\r\\f]*[^>+~(){}<>])' +
        // open match group
        '(' +
        //universal selector
        '\\*' +
        // id/class/tag/pseudo-class identifier
        '|(?:' + prefixes + identifier + ')' +
        // combinator selector
        '|' + combinators +
        // HTML attribute selector
        '|\\[' + attributes + '\\]' +
        // pseudo-classes parameters
        '|\\(' + pseudoclass + '\\)' +
        // dom properties selector (extension)
        '|\\{' + extensions + '\\}' +
        // selector group separator (comma)
        '|(?:,|' + whitespace + '*)' +
        // close match group
        ')+';

      // only allow simple selectors nested in ':not()' pseudo-classes
      reSimpleNot = RegExp('^(' +
        '(?!:not)' +
        '(' + prefixes + identifier +
        '|\\([^()]*\\))+' +
        '|\\[' + attributes + '\\]' +
        ')$');

      // split last, right most, selector group token
      reSplitToken = RegExp('(' +
        prefixes + identifier + '|' +
        '\\[' + attributes + '\\]|' +
        '\\(' + pseudoclass + '\\)|' +
        '\\\\.|[^\\x20\\t\\n\\r\\f>+~])+', 'g');

      reOptimizeSelector = RegExp(identifier + '|^$');

      reSimpleSelector = RegExp(
        BUGGY_GEBTN && BUGGY_GEBCN || OPERA ?
          '^#?' + identifier + '$' : BUGGY_GEBTN ?
          '^[.#]?' + identifier + '$' : BUGGY_GEBCN ?
          '^(?:\\*|#' + identifier + ')$' :
          '^(?:\\*|[.#]?' + identifier + ')$');

      // matches class selectors
      reClass = RegExp('(?:\\[[\\x20\\t\\n\\r\\f]*class\\b|\\.' + identifier + ')');

      Optimize = {
        ID: RegExp('^\\*?#(' + identifier + ')|' + skip_groups),
        TAG: RegExp('^(' + identifier + ')|' + skip_groups),
        CLASS: RegExp('^\\.(' + identifier + '$)|' + skip_groups)
      };

      Patterns.id = RegExp('^#(' + identifier + ')(.*)');
      Patterns.tagName = RegExp('^(' + identifier + ')(.*)');
      Patterns.className = RegExp('^\\.(' + identifier + ')(.*)');
      Patterns.attribute = RegExp('^\\[' + attrmatcher + '\\](.*)');

      Tokens.identifier = identifier;
      Tokens.attributes = attributes;

      // validator for complex selectors in ':not()' pseudo-classes
      extendedValidator = standardValidator.replace(pseudoclass, '.*');

      // validator for standard selectors as default
      reValidator = RegExp(standardValidator);
    },

  // code string reused to build compiled functions
  ACCEPT_NODE = 'r[r.length]=c[k];if(f&&false===f(c[k]))break main;else continue main;',

  // compile a comma separated group of selector
  // @mode boolean true for select, false for match
  // return a compiled function
  compile =
    function(selector, source, mode) {

      var parts = typeof selector == 'string' ? selector.match(reSplitGroup) : selector;

      // ensures that source is a string
      typeof source == 'string' || (source = '');

      if (parts.length == 1) {
        source += compileSelector(parts[0], mode ? ACCEPT_NODE : 'f&&f(k);return true;', mode);
      } else {
        // for each selector in the group
        var i = -1, seen = { }, token;
        while ((token = parts[++i])) {
          token = token.replace(reTrimSpaces, '');
          // avoid repeating the same token
          // in comma separated group (p, p)
          if (!seen[token] && (seen[token] = true)) {
            source += compileSelector(token, mode ? ACCEPT_NODE : 'f&&f(k);return true;', mode);
          }
        }
      }

      if (mode) {
        // for select method
        return Function('c,s,d,h,g,f',
          'var N,n,x=0,k=-1,e,r=[];main:while((e=c[++k])){' + source + '}return r;');
      } else {
        // for match method
        return Function('e,s,d,h,g,f',
          'var N,n,x=0,k=e;' + source + 'return false;');
      }
    },

  // compile a CSS3 string selector into ad-hoc javascript matching function
  // @return string (to be compiled)
  compileSelector =
    function(selector, source, mode) {

      var a, b, n, k = 0, expr, match, result, status, test, type;

      while (selector) {

        k++;

        // *** Universal selector
        // * match all (empty block, do not remove)
        if ((match = selector.match(Patterns.universal))) {
          // do nothing, handled in the compiler where
          // BUGGY_GEBTN return comment nodes (ex: IE)
          expr = '';
        }

        // *** ID selector
        // #Foo Id case sensitive
        else if ((match = selector.match(Patterns.id))) {
          // document can contain conflicting elements (id/name)
          // prototype selector unit need this method to recover bad HTML forms
          match[1] = (/\\/).test(match[1]) ? convertEscapes(match[1]) : match[1];
          source = 'if(' + (XML_DOCUMENT ?
            's.getAttribute(e,"id")' :
            '(e.submit?s.getAttribute(e,"id"):e.id)') +
            '=="' + match[1] + '"' +
            '){' + source + '}';
        }

        // *** Type selector
        // Foo Tag (case insensitive)
        else if ((match = selector.match(Patterns.tagName))) {
          // both tagName and nodeName properties may be upper/lower case
          // depending on their creation NAMESPACE in createElementNS()
          test = Config.SVG_LCASE ? '||e.nodeName=="' + match[1].toLowerCase() + '"' : '';
          source = 'if(e.nodeName' + (XML_DOCUMENT ?
            '=="' + match[1] + '"' : '.toUpperCase()' +
            '=="' + match[1].toUpperCase() + '"' + test) +
            '){' + source + '}';
        }

        // *** Class selector
        // .Foo Class (case sensitive)
        else if ((match = selector.match(Patterns.className))) {
          // W3C CSS3 specs: element whose "class" attribute has been assigned a
          // list of whitespace-separated values, see section 6.4 Class selectors
          // and notes at the bottom; explicitly non-normative in this specification.
          match[1] = (/\\/).test(match[1]) ? convertEscapes(match[1]) : match[1];
          match[1] = QUIRKS_MODE ? match[1].toLowerCase() : match[1];
          source = 'if((n=' + (XML_DOCUMENT ?
            's.getAttribute(e,"class")' : 'e.className') +
            ')&&n.length&&(" "+' + (QUIRKS_MODE ? 'n.toLowerCase()' : 'n') +
            '.replace(/' + whitespace + '+/g," ")+" ").indexOf(" ' + match[1] + ' ")>-1' +
            '){' + source + '}';
        }

        // *** Attribute selector
        // [attr] [attr=value] [attr="value"] [attr='value'] and !=, *=, ~=, |=, ^=, $=
        // case sensitivity is treated differently depending on the document type (see map)
        else if ((match = selector.match(Patterns.attribute))) {

          // xml namespaced attribute ?
          expr = match[1].split(':');
          expr = expr.length == 2 ? expr[1] : expr[0] + '';

          if (match[2] && !Operators[match[2]]) {
            emit('Unsupported operator in attribute selectors "' + selector + '"');
            return '';
          }

          test = 'false';

          // replace Operators parameter if needed
          if (match[2] && match[4] && (test = Operators[match[2]])) {
            match[4] = (/\\/).test(match[4]) ? convertEscapes(match[4]) : match[4];
            // case treatment depends on document type
            type = match[5] == 'i' || HTML_TABLE[expr.toLowerCase()];
            test = test.replace(/\%m/g, type ? match[4].toLowerCase() : match[4]);
          } else if (match[2] == '!=' || match[2] == '=') {
            test = 'n' + match[2] + '=""';
          }

          source = 'if(n=s.hasAttribute(e,"' + match[1] + '")){' +
            (match[2] ? 'n=s.getAttribute(e,"' + match[1] + '")' : '') +
            (type && match[2] ? '.toLowerCase();' : ';') +
            'if(' + (match[2] ? test : 'n') + '){' + source + '}}';

        }

        // *** Adjacent sibling combinator
        // E + F (F adiacent sibling of E)
        else if ((match = selector.match(Patterns.adjacent))) {
          source = NATIVE_TRAVERSAL_API ?
            'var N' + k + '=e;if((e=e.previousElementSibling)){' + source + '}e=N' + k + ';' :
            'var N' + k + '=e;while((e=e.previousSibling)){if(e.nodeType==1){' + source + 'break;}}e=N' + k + ';';
        }

        // *** General sibling combinator
        // E ~ F (F relative sibling of E)
        else if ((match = selector.match(Patterns.relative))) {
          source = NATIVE_TRAVERSAL_API ?
            'var N' + k + '=e;while((e=e.previousElementSibling)){' + source + '}e=N' + k + ';' :
            'var N' + k + '=e;while((e=e.previousSibling)){if(e.nodeType==1){' + source + '}}e=N' + k + ';';
        }

        // *** Child combinator
        // E > F (F children of E)
        else if ((match = selector.match(Patterns.children))) {
          source = 'var N' + k + '=e;if((e=e.parentNode)&&e.nodeType==1){' + source + '}e=N' + k + ';';
        }

        // *** Descendant combinator
        // E F (E ancestor of F)
        else if ((match = selector.match(Patterns.ancestor))) {
          source = 'var N' + k + '=e;while((e=e.parentNode)&&e.nodeType==1){' + source + '}e=N' + k + ';';
        }

        // *** Structural pseudo-classes
        // :root, :empty,
        // :first-child, :last-child, :only-child,
        // :first-of-type, :last-of-type, :only-of-type,
        // :nth-child(), :nth-last-child(), :nth-of-type(), :nth-last-of-type()
        else if ((match = selector.match(Patterns.spseudos)) && match[1]) {

          switch (match[1]) {
            case 'root':
              // element root of the document
              if (match[3]) {
                source = 'if(e===h||s.contains(h,e)){' + source + '}';
              } else {
                source = 'if(e===h){' + source + '}';
              }
              break;

            case 'empty':
              // element that has no children
              source = 'if(s.isEmpty(e)){' + source + '}';
              break;

            default:
              if (match[1] && match[2]) {
                if (match[2] == 'n') {
                  source = 'if(e!==h){' + source + '}';
                  break;
                } else if (match[2] == 'even') {
                  a = 2;
                  b = 0;
                } else if (match[2] == 'odd') {
                  a = 2;
                  b = 1;
                } else {
                  // assumes correct "an+b" format, "b" before "a" to keep "n" values
                  b = ((n = match[2].match(/(-?\d+)$/)) ? parseInt(n[1], 10) : 0);
                  a = ((n = match[2].match(/(-?\d*)n/i)) ? parseInt(n[1], 10) : 0);
                  if (n && n[1] == '-') a = -1;
                }

                // build test expression out of structural pseudo (an+b) parameters
                // see here: http://www.w3.org/TR/css3-selectors/#nth-child-pseudo
                test = a > 1 ?
                  (/last/i.test(match[1])) ? '(n-(' + b + '))%' + a + '==0' :
                  'n>=' + b + '&&(n-(' + b + '))%' + a + '==0' : a < -1 ?
                  (/last/i.test(match[1])) ? '(n-(' + b + '))%' + a + '==0' :
                  'n<=' + b + '&&(n-(' + b + '))%' + a + '==0' : a === 0 ?
                  'n==' + b : a == -1 ? 'n<=' + b : 'n>=' + b;

                // 4 cases: 1 (nth) x 4 (child, of-type, last-child, last-of-type)
                source =
                  'if(e!==h){' +
                    'n=s[' + (/-of-type/i.test(match[1]) ? '"nthOfType"' : '"nthElement"') + ']' +
                      '(e,' + (/last/i.test(match[1]) ? 'true' : 'false') + ');' +
                    'if(' + test + '){' + source + '}' +
                  '}';

              } else {
                // 6 cases: 3 (first, last, only) x 1 (child) x 2 (-of-type)
                a = /first/i.test(match[1]) ? 'previous' : 'next';
                n = /only/i.test(match[1]) ? 'previous' : 'next';
                b = /first|last/i.test(match[1]);

                type = /-of-type/i.test(match[1]) ? '&&n.nodeName!=e.nodeName' : '&&n.nodeName<"@"';

                source = 'if(e!==h){' +
                  ( 'n=e;while((n=n.' + a + 'Sibling)' + type + ');if(!n){' + (b ? source :
                    'n=e;while((n=n.' + n + 'Sibling)' + type + ');if(!n){' + source + '}') + '}' ) + '}';
              }
              break;
          }

        }

        // *** negation, user action and target pseudo-classes
        // *** UI element states and dynamic pseudo-classes
        // CSS4 :matches 
        // CSS3 :not, :checked, :enabled, :disabled, :target
        // CSS3 :active, :hover, :focus
        // CSS3 :link, :visited
        else if ((match = selector.match(Patterns.dpseudos)) && match[1]) {

          switch (match[1].match(/^\w+/)[0]) {
            // CSS4 matches pseudo-class
            case 'matches':
              expr = match[3].replace(reTrimSpaces, '');
              source = 'if(s.match(e, "' + expr.replace(/\x22/g, '\\"') + '",g)){' + source +'}';
              break;

            // CSS3 negation pseudo-class
            case 'not':
              // compile nested selectors, DO NOT pass the callback parameter
              // SIMPLENOT allow disabling complex selectors nested
              // in ':not()' pseudo-classes, breaks some test units
              expr = match[3].replace(reTrimSpaces, '');

              if (Config.SIMPLENOT && !reSimpleNot.test(expr)) {
                // see above, log error but continue execution
                emit('Negation pseudo-class only accepts simple selectors "' + selector + '"');
                return '';
              } else {
                if ('compatMode' in doc) {
                  source = 'if(!' + compile(expr, '', false) + '(e,s,d,h,g)){' + source + '}';
                } else {
                  source = 'if(!s.match(e, "' + expr.replace(/\x22/g, '\\"') + '",g)){' + source +'}';
                }
              }
              break;

            // CSS3 UI element states
            case 'checked':
              // for radio buttons checkboxes (HTML4) and options (HTML5)
              source = 'if((typeof e.form!=="undefined"&&(/^(?:radio|checkbox)$/i).test(e.type)&&e.checked)' +
                (Config.USE_HTML5 ? '||(/^option$/i.test(e.nodeName)&&(e.selected||e.checked))' : '') +
                '){' + source + '}';
              break;
            case 'disabled':
              // does not consider hidden input fields
              source = 'if(((typeof e.form!=="undefined"' +
                (Config.USE_HTML5 ? '' : '&&!(/^hidden$/i).test(e.type)') +
                ')||s.isLink(e))&&e.disabled===true){' + source + '}';
              break;
            case 'enabled':
              // does not consider hidden input fields
              source = 'if(((typeof e.form!=="undefined"' +
                (Config.USE_HTML5 ? '' : '&&!(/^hidden$/i).test(e.type)') +
                ')||s.isLink(e))&&e.disabled===false){' + source + '}';
              break;

            // CSS3 lang pseudo-class
            case 'lang':
              test = '';
              if (match[2]) test = match[2].substr(0, 2) + '-';
              source = 'do{(n=e.lang||"").toLowerCase();' +
                'if((n==""&&h.lang=="' + match[2].toLowerCase() + '")||' +
                '(n&&(n=="' + match[2].toLowerCase() +
                '"||n.substr(0,3)=="' + test.toLowerCase() + '")))' +
                '{' + source + 'break;}}while((e=e.parentNode)&&e!==g);';
              break;

            // CSS3 target pseudo-class
            case 'target':
              source = 'if(e.id==d.location.hash.slice(1)){' + source + '}';
              break;

            // CSS3 dynamic pseudo-classes
            case 'link':
              source = 'if(s.isLink(e)&&!e.visited){' + source + '}';
              break;
            case 'visited':
              source = 'if(s.isLink(e)&&e.visited){' + source + '}';
              break;

            // CSS3 user action pseudo-classes IE & FF3 have native support
            // these capabilities may be emulated by some event managers
            case 'active':
              if (XML_DOCUMENT) break;
              source = 'if(e===d.activeElement){' + source + '}';
              break;
            case 'hover':
              if (XML_DOCUMENT) break;
              source = 'if(e===d.hoverElement){' + source + '}';
              break;
            case 'focus':
              if (XML_DOCUMENT) break;
              source = NATIVE_FOCUS ?
                'if(e===d.activeElement&&d.hasFocus()&&(e.type||e.href||typeof e.tabIndex=="number")){' + source + '}' :
                'if(e===d.activeElement&&(e.type||e.href)){' + source + '}';
              break;

            // CSS2 selected pseudo-classes, not part of current CSS3 drafts
            // the 'selected' property is only available for option elements
            case 'selected':
              // fix Safari selectedIndex property bug
              expr = BUGGY_SELECTED ? '||(n=e.parentNode)&&n.options[n.selectedIndex]===e' : '';
              source = 'if(/^option$/i.test(e.nodeName)&&(e.selected||e.checked' + expr + ')){' + source + '}';
              break;

            default:
              break;
          }

        }

        else if ((match = selector.match(Patterns.epseudos)) && match[1]) {
          source = 'if(!(/1|11/).test(e.nodeType)){' + source + '}';
        }

        else {

          // this is where external extensions are
          // invoked if expressions match selectors
          expr = false;
          status = false;
          for (expr in Selectors) {
            if ((match = selector.match(Selectors[expr].Expression)) && match[1]) {
              result = Selectors[expr].Callback(match, source);
              if ('match' in result) { match = result.match; }
              source = result.source;
              status = result.status;
              if (status) { break; }
            }
          }

          // if an extension fails to parse the selector
          // it must return a false boolean in "status"
          if (!status) {
            // log error but continue execution, don't throw real exceptions
            // because blocking following processes maybe is not a good idea
            emit('Unknown pseudo-class selector "' + selector + '"');
            return '';
          }

          if (!expr) {
            // see above, log error but continue execution
            emit('Unknown token in selector "' + selector + '"');
            return '';
          }

        }

        // error if no matches found by the pattern scan
        if (!match) {
          emit('Invalid syntax in selector "' + selector + '"');
          return '';
        }

        // ensure "match" is not null or empty since
        // we do not throw real DOMExceptions above
        selector = match && match[match.length - 1];
      }

      return source;
    },

  /*----------------------------- QUERY METHODS ------------------------------*/

  // match element with selector
  // @return boolean
  match =
    function(element, selector, from, callback) {

      var parts;

      if (!(element && element.nodeType == 1)) {
        emit('Invalid element argument');
        return false;
      } else if (typeof selector != 'string') {
        emit('Invalid selector argument');
        return false;
      } else if (from && from.nodeType == 1 && !contains(from, element)) {
        return false;
      } else if (lastContext !== from) {
        // reset context data when it changes
        // and ensure context is set to a default
        switchContext(from || (from = element.ownerDocument));
      }

      // normalize the selector string, remove [\n\r\f]
      // whitespace, replace codepoints 0 with '\ufffd'
      // trim non-relevant leading/trailing whitespaces
      selector = selector.
        replace(reTrimSpaces, '').
        replace(/\x00|\\$/g, '\ufffd');

      Config.SHORTCUTS && (selector = Dom.shortcuts(selector, element, from));

      if (lastMatcher != selector) {
        // process valid selector strings
        if ((parts = selector.match(reValidator)) && parts[0] == selector) {
          isSingleMatch = (parts = selector.match(reSplitGroup)).length < 2;
          // save passed selector
          lastMatcher = selector;
          lastPartsMatch = parts;
        } else {
          emit('The string "' + selector + '", is not a valid CSS selector');
          return false;
        }
      } else parts = lastPartsMatch;

      // compile matcher resolvers if necessary
      if (!matchResolvers[selector] || matchContexts[selector] !== from) {
        matchResolvers[selector] = compile(isSingleMatch ? [selector] : parts, '', false);
        matchContexts[selector] = from;
      }

      return matchResolvers[selector](element, Snapshot, doc, root, from, callback);
    },

  // select only the first element
  // matching selector (document ordered)
  first =
    function(selector, from) {
      return select(selector, from, function() { return false; })[0] || null;
    },

  // select elements matching selector
  // using new Query Selector API
  // or cross-browser client API
  // @return array
  select =
    function(selector, from, callback) {

      var i, changed, element, elements, parts, token, original = selector;

      if (arguments.length === 0) {
        emit('Not enough arguments');
        return [ ];
      } else if (typeof selector != 'string') {
        return [ ];
      } else if (from && !(/1|9|11/).test(from.nodeType)) {
        emit('Invalid or illegal context element');
        return [ ];
      } else if (lastContext !== from) {
        // reset context data when it changes
        // and ensure context is set to a default
        switchContext(from || (from = doc));
      }

      if (Config.CACHING && (elements = Dom.loadResults(original, from, doc, root))) {
        return callback ? concatCall([ ], elements, callback) : elements;
      }

      // normalize the selector string, remove [\n\r\f]
      // whitespace, replace codepoints 0 with '\ufffd'
      // trim non-relevant leading/trailing whitespaces
      selector = selector.
        replace(reTrimSpaces, '').
        replace(/\x00|\\$/g, '\ufffd');

      if (!OPERA_QSAPI && reSimpleSelector.test(selector)) {
        switch (selector.charAt(0)) {
          case '#':
            if (Config.UNIQUE_ID) {
              elements = (element = _byId(selector.slice(1), from)) ? [ element ] : [ ];
            }
            break;
          case '.':
            elements = _byClass(selector.slice(1), from);
            break;
          default:
            elements = _byTag(selector, from);
            break;
        }
      }

      else if (!XML_DOCUMENT && Config.USE_QSAPI &&
        !(BUGGY_QUIRKS_QSAPI && reClass.test(selector)) &&
        !RE_BUGGY_QSAPI.test(selector)) {
        try {
          elements = from.querySelectorAll(selector);
        } catch(e) { }
      }

      if (elements) {
        elements = callback ? concatCall([ ], elements, callback) :
          NATIVE_SLICE_PROTO ? slice.call(elements) : concatList([ ], elements);
        Config.CACHING && Dom.saveResults(original, from, doc, elements);
        return elements;
      }

      Config.SHORTCUTS && (selector = Dom.shortcuts(selector, from));

      if ((changed = lastSelector != selector)) {
        // process valid selector strings
        if ((parts = selector.match(reValidator)) && parts[0] == selector) {
          isSingleSelect = (parts = selector.match(reSplitGroup)).length < 2;
          // save passed selector
          lastSelector = selector;
          lastPartsSelect = parts;
        } else {
          emit('The string "' + selector + '", is not a valid CSS selector');
          return [ ];
        }
      } else parts = lastPartsSelect;

      // commas separators are treated sequentially to maintain order
      if (from.nodeType == 11) {

        elements = byTagRaw('*', from);

      } else if (!XML_DOCUMENT && isSingleSelect) {

        if (changed) {
          // get right most selector token
          parts = selector.match(reSplitToken);
          token = parts[parts.length - 1];

          // only last slice before :not rules
          lastSlice = token.split(':not');
          lastSlice = lastSlice[lastSlice.length - 1];

          // position where token was found
          lastPosition = selector.length - token.length;
        }

        // ID optimization RTL, to reduce number of elements to visit
        if (Config.UNIQUE_ID && lastSlice && (parts = lastSlice.match(Optimize.ID)) && (token = parts[1])) {
          if ((element = _byId(token, from))) {
            if (match(element, selector)) {
              callback && callback(element);
              elements = [element];
            } else elements = [ ];
          }
        }

        // ID optimization LTR, to reduce selection context searches
        else if (Config.UNIQUE_ID && (parts = selector.match(Optimize.ID)) && (token = parts[1])) {
          if ((element = _byId(token, doc))) {
            if ('#' + token == selector) {
              callback && callback(element);
              elements = [element];
            } else if (/[>+~]/.test(selector)) {
              from = element.parentNode;
            } else {
              from = element;
            }
          } else elements = [ ];
        }

        if (elements) {
          Config.CACHING && Dom.saveResults(original, from, doc, elements);
          return elements;
        }

        if (!NATIVE_GEBCN && lastSlice && (parts = lastSlice.match(Optimize.TAG)) && (token = parts[1])) {
          if ((elements = _byTag(token, from)).length === 0) { return [ ]; }
          selector = selector.slice(0, lastPosition) + selector.slice(lastPosition).replace(token, '*');
        }

        else if (lastSlice && (parts = lastSlice.match(Optimize.CLASS)) && (token = parts[1])) {
          if ((elements = _byClass(token, from)).length === 0) { return [ ]; }
          selector = selector.slice(0, lastPosition) + selector.slice(lastPosition).replace('.' + token,
            reOptimizeSelector.test(selector.charAt(selector.indexOf(token) - 1)) ? '' : '*');
        }

        else if ((parts = selector.match(Optimize.CLASS)) && (token = parts[1])) {
          if ((elements = _byClass(token, from)).length === 0) { return [ ]; }
          for (i = 0, els = [ ]; elements.length > i; ++i) {
            els = concatList(els, elements[i].getElementsByTagName('*'));
          }
          elements = els;
          selector = selector.slice(0, lastPosition) + selector.slice(lastPosition).replace('.' + token,
            reOptimizeSelector.test(selector.charAt(selector.indexOf(token) - 1)) ? '' : '*');
        }

        else if (NATIVE_GEBCN && lastSlice && (parts = lastSlice.match(Optimize.TAG)) && (token = parts[1])) {
          if ((elements = _byTag(token, from)).length === 0) { return [ ]; }
          selector = selector.slice(0, lastPosition) + selector.slice(lastPosition).replace(token, '*');
        }

      }

      if (!elements) {
        if (IE_LT_9) {
          elements = /^(?:applet|object)$/i.test(from.nodeName) ? from.children : byTagRaw('*', from);
        } else {
          elements = from.getElementsByTagName('*');
        }
      }
      // end of prefiltering pass

      // compile selector resolver if necessary
      if (!selectResolvers[selector] || selectContexts[selector] !== from) {
        selectResolvers[selector] = compile(isSingleSelect ? [selector] : parts, '', true);
        selectContexts[selector] = from;
      }

      elements = selectResolvers[selector](elements, Snapshot, doc, root, from, callback);

      Config.CACHING && Dom.saveResults(original, from, doc, elements);

      return elements;
    },

  /*-------------------------------- STORAGE ---------------------------------*/

  // empty function handler
  FN = function(x) { return x; },

  // compiled match functions returning booleans
  matchContexts = { },
  matchResolvers = { },

  // compiled select functions returning collections
  selectContexts = { },
  selectResolvers = { },

  // used to pass methods to compiled functions
  Snapshot = {

    // element indexing methods
    nthElement: nthElement,
    nthOfType: nthOfType,

    // element inspection methods
    getAttribute: getAttribute,
    hasAttribute: hasAttribute,

    // element selection methods
    byClass: _byClass,
    byName: byName,
    byTag: _byTag,
    byId: _byId,

    // helper/check methods
    contains: contains,
    isEmpty: isEmpty,
    isLink: isLink,

    // selection/matching
    select: select,
    match: match
  },

  /*------------------------------- PUBLIC API -------------------------------*/

  // code referenced by extensions
  Dom = {

    ACCEPT_NODE: ACCEPT_NODE,

    // retrieve element by id attr
    byId: byId,

    // retrieve elements by tag name
    byTag: byTag,

    // retrieve elements by name attr
    byName: byName,

    // retrieve elements by class name
    byClass: byClass,

    // read the value of the attribute
    // as was in the original HTML code
    getAttribute: getAttribute,

    // check for the attribute presence
    // as was in the original HTML code
    hasAttribute: hasAttribute,

    // element match selector, return boolean true/false
    match: match,

    // first element match only, return element or null
    first: first,

    // elements matching selector, starting from element
    select: select,

    // compile selector into ad-hoc javascript resolver
    compile: compile,

    // check that two elements are ancestor/descendant
    contains: contains,

    // handle selector engine configuration settings
    configure: configure,

    // initialize caching for each document
    setCache: FN,

    // load previously collected result set
    loadResults: FN,

    // save previously collected result set
    saveResults: FN,

    // handle missing context in selector strings
    shortcuts: FN,

    // log resolvers errors/warnings
    emit: emit,

    // options enabing specific engine functionality
    Config: Config,

    // pass methods references to compiled resolvers
    Snapshot: Snapshot,

    // operators descriptor
    // for attribute operators extensions
    Operators: Operators,

    // selectors descriptor
    // for pseudo-class selectors extensions
    Selectors: Selectors,

    // export validators REs
    Tokens: Tokens,

    // export version string
    Version: version,

    // add or overwrite user defined operators
    registerOperator:
      function(symbol, resolver) {
        Operators[symbol] || (Operators[symbol] = resolver);
      },

    // add selector patterns for user defined callbacks
    registerSelector:
      function(name, rexp, func) {
        Selectors[name] || (Selectors[name] = {
          Expression: rexp,
          Callback: func
        });
      }

  };

  /*---------------------------------- INIT ----------------------------------*/

  // init context specific variables
  initialize(doc);

  return Dom;
});


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _TextLike = __webpack_require__(13);

var _TextLike2 = _interopRequireDefault(_TextLike);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function nodeFactory(value, document) {
    if (typeof value === 'string') {
        return new _TextLike2.default(value, document);
    } else if (value.type === 'variable') {
        var element = document.createElement('tw-variable');
        var key = 'data-name';
        var name = value.name ? value.name : 'UNKNOWN';
        element.setAttribute(key, name);
        return element;
    } else if (value.type === 'string') {
        var _element = document.createElement('tw-string');
        var _key = 'data-subtype';
        var subtype = value.subtype ? value.subtype : 'UNKNOWN';
        _element.setAttribute(_key, subtype);
        _element.textContent = value.value;
        return _element;
    } else if (value.type === 'number') {
        var _element2 = document.createElement('tw-number');
        _element2.textContent = value.value;
    } else if (value.type === 'invocation' || value.type === 'element' || value.type === 'link') {
        var tagName = void 0;
        if (value.type === 'invocation') {
            tagName = 'tw-invocation';
        } else if (value.type === 'link') {
            tagName = 'tw-link';
        } else {
            tagName = value.tagName ? value.tagName : 'tw-unknown-element';
        }
        var _element3 = document.createElement(tagName);
        var _key2 = 'data-subtype';
        var _subtype = value.subtype ? value.subtype : 'UNKNOWN';
        _element3.setAttribute(_key2, _subtype);
        if (value.type === 'invocation') {
            var _key3 = 'data-name';
            _element3.setAttribute(_key3, value.name);
        }
        var args = value.arguments;
        var children = value.children;
        var nodes = args.map(function (child) {
            return nodeFactory(child, document);
        });
        if (children && (typeof children === 'undefined' ? 'undefined' : _typeof(children)) === 'object' && children.length >= 1) {
            var body = document.createElement('tw-invocation-body');
            var childNodes = children.map(function (child) {
                return nodeFactory(child, document);
            });
            body.append.apply(body, _toConsumableArray(childNodes));
            nodes.push(body);
        }
        _element3.append.apply(_element3, _toConsumableArray(nodes));
        return _element3;
    } else if (value.type === 'comment') {
        return document.createComment(value.value);
    } else if (value.type === 'processingInstruction') {
        return document.createProcessingInstruction(value.target, value.data);
    }
    throw new Error('No condition was matched for constructing a node.');
}
exports.default = nodeFactory;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Recurser = __webpack_require__(41);

var _Recurser2 = _interopRequireDefault(_Recurser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AbstractTask = function AbstractTask(functionOrFunctionMap) {
    var _this = this;

    _classCallCheck(this, AbstractTask);

    this.accumulator = {};
    this.recurser = new _Recurser2.default();
    this.execute = function (document, format, version, options) {
        var node = document.documentElement;
        if (!node) {
            throw new Error('The node has no root element.');
        }
        var opts = options || {};
        var recursionMode = 'left-top';
        if (opts.recursionMode && typeof opts.recursionMode === 'string') {
            recursionMode = opts.recursionMode;
        }
        var callback = _this.executeMicrotask;
        if (/left-?top/i.test(recursionMode)) {
            _this.recurser.leftTopRecurse(node, format, version, callback, opts);
        } else if (/left-?bottom/i.test(recursionMode)) {
            _this.recurser.leftBottomRecurse(node, format, version, callback, opts);
        } else if (/right-?top/i.test(recursionMode)) {
            _this.recurser.rightTopRecurse(node, format, version, callback, opts);
        } else if (/right-?bottom/i.test(recursionMode)) {
            _this.recurser.rightBottomRecurse(node, format, version, callback, opts);
        } else {
            throw new Error('Unrecognized recursionMode value.');
        }
    };
    this.preSetup = function () {
        return;
    };
    this.setup = function () {
        return;
    };
    this.postSetup = function () {
        return;
    };
    this.preExecute = function () {
        return;
    };
    this.postExecute = function () {
        return;
    };
    this.preComplete = function () {
        return;
    };
    this.complete = function () {
        return;
    };
    this.postComplete = function () {
        return;
    };
    if (typeof functionOrFunctionMap === 'function') {
        this.executeMicrotask = functionOrFunctionMap;
    } else if (typeof functionOrFunctionMap !== 'undefined') {
        var functionMap = functionOrFunctionMap;
        if (typeof functionMap.preSetup === 'function') {
            this.preSetup = functionMap.preSetup.bind(this);
        }
        if (typeof functionMap.setup === 'function') {
            this.setup = functionMap.setup.bind(this);
        }
        if (typeof functionMap.postSetup === 'function') {
            this.postSetup = functionMap.postSetup.bind(this);
        }
        if (typeof functionMap.preExecute === 'function') {
            this.preExecute = functionMap.preExecute.bind(this);
        }
        if (typeof functionMap.execute === 'function') {
            this.execute = functionMap.execute.bind(this);
        }
        if (typeof functionMap.executeMicrotask !== 'function') {
            throw new Error('The executeMicrotask function was not ' + 'provided.');
        }
        this.executeMicrotask = functionMap.executeMicrotask;
        if (typeof functionMap.postExecute === 'function') {
            this.postExecute = functionMap.postExecute.bind(this);
        }
        if (typeof functionMap.preComplete === 'function') {
            this.preComplete = functionMap.preComplete.bind(this);
        }
        if (typeof functionMap.complete === 'function') {
            this.complete = functionMap.complete.bind(this);
        }
        if (typeof functionMap.postComplete === 'function') {
            this.postComplete = functionMap.postComplete.bind(this);
        }
    }
};

exports.default = AbstractTask;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _detectFormat = __webpack_require__(18);

var _detectFormat2 = _interopRequireDefault(_detectFormat);

var _detectVersion = __webpack_require__(19);

var _detectVersion2 = _interopRequireDefault(_detectVersion);

var _documentConstructor = __webpack_require__(43);

var _documentConstructor2 = _interopRequireDefault(_documentConstructor);

var _documentFactory = __webpack_require__(9);

var _documentFactory2 = _interopRequireDefault(_documentFactory);

var _isIElementLike = __webpack_require__(0);

var _isIElementLike2 = _interopRequireDefault(_isIElementLike);

var _constants = __webpack_require__(20);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var semver = __webpack_require__(21);

var Linter = function () {
    function Linter(storyDataElem, parser) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        _classCallCheck(this, Linter);

        if (!(0, _isIElementLike2.default)(storyDataElem)) {
            throw new Error('The storyDataElem argument is not an element.');
        }
        this.storyData = storyDataElem;
        if (!parser || typeof parser.parse !== 'function') {
            throw new Error('The parser argument did not have a parse method.');
        }
        this.parser = parser;
        if (!options || (typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
            throw new Error('The options argument was not an object.');
        }
        var opts = {};
        if ('passageIgnores' in options) {
            if (_typeof(options.passageIgnores) !== 'object') {
                throw new Error('The passageIgnores property of the options ' + 'argument was not an object.');
            }
            opts.passageIgnores = options.passageIgnores;
        } else {
            opts.passageIgnores = _constants2.default.passageIgnores;
        }
        if ('detectionMode' in options) {
            if (typeof options.detectionMode !== 'string') {
                throw new Error('The detectionMode property of the options argument ' + 'was not a string.');
            }
            var detectionMode = options.detectionMode.toLowerCase();
            if (_constants2.default.detectionModes.indexOf(detectionMode) === -1) {
                throw new Error('The detectionMode property of the options argument ' + 'was not a recognized detection mode. Recognized modes ' + ('are ' + _constants2.default.detectionModes.join(', ') + '.'));
            }
            opts.detectionMode = detectionMode;
        } else {
            opts.detectionMode = 'manual';
        }
        if ('format' in options) {
            if (typeof options.format !== 'string') {
                throw new Error('The format property of the options argument was ' + 'not a string.');
            }
            var format = options.format.toLowerCase();
            if (_constants2.default.formats.indexOf(format) === -1) {
                throw new Error('The format property of the options argument ' + 'was not a recognized format. Recognized formats ' + ('are ' + _constants2.default.formats.join(', ') + '.'));
            }
            opts.format = format;
        } else {
            opts.format = (0, _detectFormat2.default)(storyDataElem, opts.detectionMode);
        }
        if ('version' in options) {
            if (typeof options.version !== 'string') {
                throw new Error('The version property of the options argument was ' + 'not a string.');
            } else if (!semver.valid(options.version)) {
                throw new Error('The version property of the options argument was ' + 'not a valid semantic version.');
            }
            opts.version = options.version;
        } else {
            opts.version = (0, _detectVersion2.default)(storyDataElem, opts.detectionMode);
        }
        if ('documentConstructor' in options) {
            if (typeof options.documentConstructor !== 'function') {
                throw new Error('The documentConstructor property of the options ' + 'argument is not a function.');
            }
            opts.documentConstructor = options.documentConstructor;
        } else {
            opts.documentConstructor = _documentConstructor2.default;
        }
        this.options = opts;
    }

    _createClass(Linter, [{
        key: 'lint',
        value: function lint(tasks) {
            if (!tasks || (typeof tasks === 'undefined' ? 'undefined' : _typeof(tasks)) !== 'object' || Number.isNaN(Number(tasks.length)) || typeof tasks.forEach !== 'function') {
                throw new Error('The tasks argument was not an array.');
            } else if (tasks.length <= 0) {
                throw new Error('No tasks were provided to the lint method.');
            }
            tasks.forEach(function (task) {
                if (!task || (typeof task === 'undefined' ? 'undefined' : _typeof(task)) !== 'object') {
                    throw new Error('One of the tasks was not an object.');
                }
                if (typeof task.execute !== 'function' && typeof task.executeMicrotask !== 'function') {
                    throw new Error('One of the tasks had neither an execute nor an ' + 'executeMicrotask method.');
                }
            });
            var storyMap = this.generateStoryMap(this.storyData);
            var opts = this.options || {};
            var isolationChambers = [];
            var len = 1;
            if (opts.runInIsolation) {
                len = tasks.length;
            }
            for (var ii = 0; ii < len; ii += 1) {
                var doc = (0, _documentFactory2.default)(storyMap, opts.documentConstructor);
                isolationChambers.push(doc);
            }
            return this.runTasks(tasks, isolationChambers, opts);
        }
    }, {
        key: 'generateStoryMap',
        value: function generateStoryMap(storyDataElem) {
            if (!(0, _isIElementLike2.default)(storyDataElem)) {
                throw new Error('The storyDataElem argument was not an element.');
            }
            var passages = [];
            var passageNames = [];
            var counter = 0;
            for (var ii = 0; ii < storyDataElem.children.length; ii += 1) {
                var child = this.storyData.children[ii];
                var tagName = child.tagName.toLowerCase();
                var passageName = void 0;
                if (semver.satisfies(this.options.version, '1')) {
                    passageName = child.getAttribute('tiddler');
                } else if (semver.satisfies(this.options.version, '2')) {
                    passageName = child.getAttribute('name');
                } else {
                    passageName = 'UNKNOWN_' + counter;
                }
                if (!passageName) {
                    throw new Error('A passage name could not be found in one of the ' + 'passage elements.');
                }
                if (this.options.passageIgnores.elementTags.indexOf(tagName) !== -1 || this.options.passageIgnores.passageNames.indexOf(passageName) !== -1) {
                    continue;
                }
                var tags = (child.getAttribute('tags') || '').split(' ');
                var found = false;
                for (var _ii = 0; _ii < tags.length; _ii += 1) {
                    var tag = tags[_ii];
                    if (this.options.passageIgnores.passageTags.indexOf(tag) !== -1) {
                        found = true;
                        break;
                    }
                }
                if (found) {
                    continue;
                }
                var parsed = this.parser.parse(child.textContent);
                if (!parsed) {
                    throw new Error('There is no output.');
                }
                passages.push(parsed);
                passageNames.push(passageName);
                counter += 1;
            }
            return {
                passages: passages,
                passageNames: passageNames
            };
        }
    }, {
        key: 'runTasks',
        value: function runTasks(tasks, isolationChambers, linterOptions) {
            var taskOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

            if (linterOptions.runInIsolation) {
                return this.runTasksInIsolation(tasks, isolationChambers, linterOptions, taskOptions);
            } else {
                return this.runTasksInParallel(tasks, isolationChambers[0], linterOptions, taskOptions);
            }
        }
    }, {
        key: 'runTasksInParallel',
        value: function runTasksInParallel(tasks, document, linterOptions) {
            var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

            tasks.forEach(function (task) {
                task.preSetup(document, options);
            });
            tasks.forEach(function (task) {
                task.setup(document, options);
            });
            tasks.forEach(function (task) {
                task.postSetup(document, options);
            });
            tasks.forEach(function (task) {
                task.preExecute(document, options);
            });
            var children = document.querySelector('tw-storydata').children;

            var _loop = function _loop(ii) {
                var passageData = children[ii];
                var passageName = passageData.getAttribute('name');
                var descendants = passageData.querySelectorAll('*');

                var _loop2 = function _loop2(jj) {
                    var descendant = descendants[jj];
                    tasks.forEach(function (task) {
                        task.executeMicrotask(descendant, passageName, linterOptions.format, linterOptions.version);
                    });
                };

                for (var jj = 0; jj < descendants.length; jj += 1) {
                    _loop2(jj);
                }
            };

            for (var ii = 0; ii < children.length; ii += 1) {
                _loop(ii);
            }
            tasks.forEach(function (task) {
                task.postExecute(document, options);
            });
            tasks.forEach(function (task) {
                task.preComplete(document, options);
            });
            tasks.forEach(function (task) {
                task.complete(document, options);
            });
            tasks.forEach(function (task) {
                task.postComplete(document, options);
            });
            return tasks;
        }
    }, {
        key: 'runTasksInIsolation',
        value: function runTasksInIsolation(tasks, isolationChambers, linterOptions) {
            var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

            tasks.forEach(function (task, ii) {
                task.preSetup(isolationChambers[ii], options);
            });
            tasks.forEach(function (task, ii) {
                task.setup(isolationChambers[ii], options);
            });
            tasks.forEach(function (task, ii) {
                task.postSetup(isolationChambers[ii], options);
            });
            tasks.forEach(function (task, ii) {
                task.preExecute(isolationChambers[ii], options);
            });
            tasks.forEach(function (task, ii) {
                if (typeof task.execute === 'function') {
                    task.execute(isolationChambers[ii], options);
                } else if (typeof task.executeMicrotask === 'function') {
                    var doc = isolationChambers[ii];
                    doc.querySelector('tw-storydata').children.forEach(function (passageData) {
                        var passageName = passageData.getAttribute('name');
                        passageData.getDescendants().forEach(function (descendant) {
                            task.executeMicrotask(descendant, passageName, linterOptions.format, linterOptions.version);
                        });
                    });
                } else {
                    throw new Error('ITask has neither execute or executeMicrotask ' + 'methods.');
                }
            });
            tasks.forEach(function (task, ii) {
                task.postExecute(isolationChambers[ii], options);
            });
            tasks.forEach(function (task, ii) {
                task.preComplete(isolationChambers[ii], options);
            });
            tasks.forEach(function (task, ii) {
                task.complete(isolationChambers[ii], options);
            });
            tasks.forEach(function (task, ii) {
                task.postComplete(isolationChambers[ii], options);
            });
            return tasks;
        }
    }]);

    return Linter;
}();

;
exports.default = Linter;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function detectFormat(value, detectionMode) {
    var formatStr = value;
    if (typeof value !== 'string') {
        formatStr = value.getAttribute('format');
        if (!formatStr) {
            if (detectionMode === 'manual') {
                throw new Error('Detection mode was manual, ' + 'but there was no format attribute.');
            }
            if (value.getAttribute('id') === 'storeArea') {
                formatStr = 'sugarcane';
            }
            if (!formatStr) {
                for (var ii = 0; ii < value.children.length; ii += 1) {
                    var child = value.children[ii];
                    if (child.getAttribute('tiddler')) {
                        formatStr = 'sugarcane';
                        break;
                    }
                }
                if (!formatStr) {
                    throw new Error('Format could not be detected in ' + 'element value.');
                }
            }
        }
    } else if (!formatStr) {
        throw new Error('The value argument was a string, but the string ' + 'was empty.');
    }
    return formatStr.toUpperCase();
}
exports.default = detectFormat;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = __webpack_require__(20);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var semver = __webpack_require__(21);
function detectVersion(value) {
    var detectionMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'auto';
    var versionMap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _constants2.default.versions;

    var versionStr = value;
    if (typeof value !== 'string') {
        versionStr = value.getAttribute('creator-version');
        if (!versionStr) {
            if (detectionMode === 'manual') {
                throw new Error('Detection mode was manual, ' + 'but there was no version attribute.');
            }
            if (value.getAttribute('id') === 'storeArea') {
                versionStr = '1.0.0';
            }
            if (!versionStr) {
                for (var ii = 0; ii < value.children.length; ii += 1) {
                    var child = value.children[ii];
                    if (child.getAttribute('tiddler')) {
                        versionStr = '1.0.0';
                        break;
                    } else if (child.tagName.toLowerCase() === 'tw-passagedata') {
                        versionStr = '2.0.0';
                        break;
                    }
                }
                if (!versionStr) {
                    throw new Error('Version could not be detected in ' + 'element value.');
                }
            }
        }
    } else if (!versionStr) {
        throw new Error('The value argument was a string, but the string ' + 'was empty.');
    }
    var cleanVersion = semver.clean(versionStr);
    if (!semver.valid(cleanVersion)) {
        throw new Error('The version string was not a valid semantic ' + 'version.');
    }
    var keys = Object.keys(versionMap);
    var valid = false;
    for (var _ii = 0; _ii < keys.length; _ii += 1) {
        var key = keys[_ii];
        if (semver.satisfies(cleanVersion, key)) {
            valid = true;
            versionStr = versionMap[key];
            break;
        }
    }
    if (!valid) {
        throw new Error('The version was found, but it did not fulfill a ' + 'recognized version.');
    }
    return versionStr.toUpperCase();
}
exports.default = detectVersion;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    detectionModes: ['auto', 'manual'],
    formats: ['gately', 'harlowe', 'sugarcane', 'sugarcube', 'unknown'],
    passageIgnores: {
        elementTags: ['script', 'style'],
        passageNames: ['lint', 'linter', 'twinelint', 'twinelinter'],
        passageTags: ['lint', 'linter', 'twinelint', 'twinelinter']
    },
    versions: {
        '^1': '1.0.0',
        '^2': '2.0.0'
    }
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {exports = module.exports = SemVer;

// The debug function is excluded entirely from the minified version.
/* nomin */ var debug;
/* nomin */ if (typeof process === 'object' &&
    /* nomin */ process.env &&
    /* nomin */ process.env.NODE_DEBUG &&
    /* nomin */ /\bsemver\b/i.test(process.env.NODE_DEBUG))
  /* nomin */ debug = function() {
    /* nomin */ var args = Array.prototype.slice.call(arguments, 0);
    /* nomin */ args.unshift('SEMVER');
    /* nomin */ console.log.apply(console, args);
    /* nomin */ };
/* nomin */ else
  /* nomin */ debug = function() {};

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
exports.SEMVER_SPEC_VERSION = '2.0.0';

var MAX_LENGTH = 256;
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;

// The actual regexps go on exports.re
var re = exports.re = [];
var src = exports.src = [];
var R = 0;

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

var NUMERICIDENTIFIER = R++;
src[NUMERICIDENTIFIER] = '0|[1-9]\\d*';
var NUMERICIDENTIFIERLOOSE = R++;
src[NUMERICIDENTIFIERLOOSE] = '[0-9]+';


// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

var NONNUMERICIDENTIFIER = R++;
src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*';


// ## Main Version
// Three dot-separated numeric identifiers.

var MAINVERSION = R++;
src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')';

var MAINVERSIONLOOSE = R++;
src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')';

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

var PRERELEASEIDENTIFIER = R++;
src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] +
                            '|' + src[NONNUMERICIDENTIFIER] + ')';

var PRERELEASEIDENTIFIERLOOSE = R++;
src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] +
                                 '|' + src[NONNUMERICIDENTIFIER] + ')';


// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

var PRERELEASE = R++;
src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] +
                  '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))';

var PRERELEASELOOSE = R++;
src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] +
                       '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))';

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

var BUILDIDENTIFIER = R++;
src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+';

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

var BUILD = R++;
src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] +
             '(?:\\.' + src[BUILDIDENTIFIER] + ')*))';


// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

var FULL = R++;
var FULLPLAIN = 'v?' + src[MAINVERSION] +
                src[PRERELEASE] + '?' +
                src[BUILD] + '?';

src[FULL] = '^' + FULLPLAIN + '$';

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] +
                 src[PRERELEASELOOSE] + '?' +
                 src[BUILD] + '?';

var LOOSE = R++;
src[LOOSE] = '^' + LOOSEPLAIN + '$';

var GTLT = R++;
src[GTLT] = '((?:<|>)?=?)';

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
var XRANGEIDENTIFIERLOOSE = R++;
src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*';
var XRANGEIDENTIFIER = R++;
src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*';

var XRANGEPLAIN = R++;
src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:' + src[PRERELEASE] + ')?' +
                   src[BUILD] + '?' +
                   ')?)?';

var XRANGEPLAINLOOSE = R++;
src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:' + src[PRERELEASELOOSE] + ')?' +
                        src[BUILD] + '?' +
                        ')?)?';

var XRANGE = R++;
src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$';
var XRANGELOOSE = R++;
src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$';

// Tilde ranges.
// Meaning is "reasonably at or greater than"
var LONETILDE = R++;
src[LONETILDE] = '(?:~>?)';

var TILDETRIM = R++;
src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+';
re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g');
var tildeTrimReplace = '$1~';

var TILDE = R++;
src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$';
var TILDELOOSE = R++;
src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$';

// Caret ranges.
// Meaning is "at least and backwards compatible with"
var LONECARET = R++;
src[LONECARET] = '(?:\\^)';

var CARETTRIM = R++;
src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+';
re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g');
var caretTrimReplace = '$1^';

var CARET = R++;
src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$';
var CARETLOOSE = R++;
src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$';

// A simple gt/lt/eq thing, or just "" to indicate "any version"
var COMPARATORLOOSE = R++;
src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$';
var COMPARATOR = R++;
src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$';


// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
var COMPARATORTRIM = R++;
src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] +
                      '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')';

// this one has to use the /g flag
re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g');
var comparatorTrimReplace = '$1$2$3';


// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
var HYPHENRANGE = R++;
src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' +
                   '\\s+-\\s+' +
                   '(' + src[XRANGEPLAIN] + ')' +
                   '\\s*$';

var HYPHENRANGELOOSE = R++;
src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s+-\\s+' +
                        '(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s*$';

// Star ranges basically just allow anything at all.
var STAR = R++;
src[STAR] = '(<|>)?=?\\s*\\*';

// Compile to actual regexp objects.
// All are flag-free, unless they were created above with a flag.
for (var i = 0; i < R; i++) {
  debug(i, src[i]);
  if (!re[i])
    re[i] = new RegExp(src[i]);
}

exports.parse = parse;
function parse(version, loose) {
  if (version instanceof SemVer)
    return version;

  if (typeof version !== 'string')
    return null;

  if (version.length > MAX_LENGTH)
    return null;

  var r = loose ? re[LOOSE] : re[FULL];
  if (!r.test(version))
    return null;

  try {
    return new SemVer(version, loose);
  } catch (er) {
    return null;
  }
}

exports.valid = valid;
function valid(version, loose) {
  var v = parse(version, loose);
  return v ? v.version : null;
}


exports.clean = clean;
function clean(version, loose) {
  var s = parse(version.trim().replace(/^[=v]+/, ''), loose);
  return s ? s.version : null;
}

exports.SemVer = SemVer;

function SemVer(version, loose) {
  if (version instanceof SemVer) {
    if (version.loose === loose)
      return version;
    else
      version = version.version;
  } else if (typeof version !== 'string') {
    throw new TypeError('Invalid Version: ' + version);
  }

  if (version.length > MAX_LENGTH)
    throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters')

  if (!(this instanceof SemVer))
    return new SemVer(version, loose);

  debug('SemVer', version, loose);
  this.loose = loose;
  var m = version.trim().match(loose ? re[LOOSE] : re[FULL]);

  if (!m)
    throw new TypeError('Invalid Version: ' + version);

  this.raw = version;

  // these are actually numbers
  this.major = +m[1];
  this.minor = +m[2];
  this.patch = +m[3];

  if (this.major > MAX_SAFE_INTEGER || this.major < 0)
    throw new TypeError('Invalid major version')

  if (this.minor > MAX_SAFE_INTEGER || this.minor < 0)
    throw new TypeError('Invalid minor version')

  if (this.patch > MAX_SAFE_INTEGER || this.patch < 0)
    throw new TypeError('Invalid patch version')

  // numberify any prerelease numeric ids
  if (!m[4])
    this.prerelease = [];
  else
    this.prerelease = m[4].split('.').map(function(id) {
      if (/^[0-9]+$/.test(id)) {
        var num = +id;
        if (num >= 0 && num < MAX_SAFE_INTEGER)
          return num;
      }
      return id;
    });

  this.build = m[5] ? m[5].split('.') : [];
  this.format();
}

SemVer.prototype.format = function() {
  this.version = this.major + '.' + this.minor + '.' + this.patch;
  if (this.prerelease.length)
    this.version += '-' + this.prerelease.join('.');
  return this.version;
};

SemVer.prototype.toString = function() {
  return this.version;
};

SemVer.prototype.compare = function(other) {
  debug('SemVer.compare', this.version, this.loose, other);
  if (!(other instanceof SemVer))
    other = new SemVer(other, this.loose);

  return this.compareMain(other) || this.comparePre(other);
};

SemVer.prototype.compareMain = function(other) {
  if (!(other instanceof SemVer))
    other = new SemVer(other, this.loose);

  return compareIdentifiers(this.major, other.major) ||
         compareIdentifiers(this.minor, other.minor) ||
         compareIdentifiers(this.patch, other.patch);
};

SemVer.prototype.comparePre = function(other) {
  if (!(other instanceof SemVer))
    other = new SemVer(other, this.loose);

  // NOT having a prerelease is > having one
  if (this.prerelease.length && !other.prerelease.length)
    return -1;
  else if (!this.prerelease.length && other.prerelease.length)
    return 1;
  else if (!this.prerelease.length && !other.prerelease.length)
    return 0;

  var i = 0;
  do {
    var a = this.prerelease[i];
    var b = other.prerelease[i];
    debug('prerelease compare', i, a, b);
    if (a === undefined && b === undefined)
      return 0;
    else if (b === undefined)
      return 1;
    else if (a === undefined)
      return -1;
    else if (a === b)
      continue;
    else
      return compareIdentifiers(a, b);
  } while (++i);
};

// preminor will bump the version up to the next minor release, and immediately
// down to pre-release. premajor and prepatch work the same way.
SemVer.prototype.inc = function(release, identifier) {
  switch (release) {
    case 'premajor':
      this.prerelease.length = 0;
      this.patch = 0;
      this.minor = 0;
      this.major++;
      this.inc('pre', identifier);
      break;
    case 'preminor':
      this.prerelease.length = 0;
      this.patch = 0;
      this.minor++;
      this.inc('pre', identifier);
      break;
    case 'prepatch':
      // If this is already a prerelease, it will bump to the next version
      // drop any prereleases that might already exist, since they are not
      // relevant at this point.
      this.prerelease.length = 0;
      this.inc('patch', identifier);
      this.inc('pre', identifier);
      break;
    // If the input is a non-prerelease version, this acts the same as
    // prepatch.
    case 'prerelease':
      if (this.prerelease.length === 0)
        this.inc('patch', identifier);
      this.inc('pre', identifier);
      break;

    case 'major':
      // If this is a pre-major version, bump up to the same major version.
      // Otherwise increment major.
      // 1.0.0-5 bumps to 1.0.0
      // 1.1.0 bumps to 2.0.0
      if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0)
        this.major++;
      this.minor = 0;
      this.patch = 0;
      this.prerelease = [];
      break;
    case 'minor':
      // If this is a pre-minor version, bump up to the same minor version.
      // Otherwise increment minor.
      // 1.2.0-5 bumps to 1.2.0
      // 1.2.1 bumps to 1.3.0
      if (this.patch !== 0 || this.prerelease.length === 0)
        this.minor++;
      this.patch = 0;
      this.prerelease = [];
      break;
    case 'patch':
      // If this is not a pre-release version, it will increment the patch.
      // If it is a pre-release it will bump up to the same patch version.
      // 1.2.0-5 patches to 1.2.0
      // 1.2.0 patches to 1.2.1
      if (this.prerelease.length === 0)
        this.patch++;
      this.prerelease = [];
      break;
    // This probably shouldn't be used publicly.
    // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
    case 'pre':
      if (this.prerelease.length === 0)
        this.prerelease = [0];
      else {
        var i = this.prerelease.length;
        while (--i >= 0) {
          if (typeof this.prerelease[i] === 'number') {
            this.prerelease[i]++;
            i = -2;
          }
        }
        if (i === -1) // didn't increment anything
          this.prerelease.push(0);
      }
      if (identifier) {
        // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
        // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
        if (this.prerelease[0] === identifier) {
          if (isNaN(this.prerelease[1]))
            this.prerelease = [identifier, 0];
        } else
          this.prerelease = [identifier, 0];
      }
      break;

    default:
      throw new Error('invalid increment argument: ' + release);
  }
  this.format();
  this.raw = this.version;
  return this;
};

exports.inc = inc;
function inc(version, release, loose, identifier) {
  if (typeof(loose) === 'string') {
    identifier = loose;
    loose = undefined;
  }

  try {
    return new SemVer(version, loose).inc(release, identifier).version;
  } catch (er) {
    return null;
  }
}

exports.diff = diff;
function diff(version1, version2) {
  if (eq(version1, version2)) {
    return null;
  } else {
    var v1 = parse(version1);
    var v2 = parse(version2);
    if (v1.prerelease.length || v2.prerelease.length) {
      for (var key in v1) {
        if (key === 'major' || key === 'minor' || key === 'patch') {
          if (v1[key] !== v2[key]) {
            return 'pre'+key;
          }
        }
      }
      return 'prerelease';
    }
    for (var key in v1) {
      if (key === 'major' || key === 'minor' || key === 'patch') {
        if (v1[key] !== v2[key]) {
          return key;
        }
      }
    }
  }
}

exports.compareIdentifiers = compareIdentifiers;

var numeric = /^[0-9]+$/;
function compareIdentifiers(a, b) {
  var anum = numeric.test(a);
  var bnum = numeric.test(b);

  if (anum && bnum) {
    a = +a;
    b = +b;
  }

  return (anum && !bnum) ? -1 :
         (bnum && !anum) ? 1 :
         a < b ? -1 :
         a > b ? 1 :
         0;
}

exports.rcompareIdentifiers = rcompareIdentifiers;
function rcompareIdentifiers(a, b) {
  return compareIdentifiers(b, a);
}

exports.major = major;
function major(a, loose) {
  return new SemVer(a, loose).major;
}

exports.minor = minor;
function minor(a, loose) {
  return new SemVer(a, loose).minor;
}

exports.patch = patch;
function patch(a, loose) {
  return new SemVer(a, loose).patch;
}

exports.compare = compare;
function compare(a, b, loose) {
  return new SemVer(a, loose).compare(new SemVer(b, loose));
}

exports.compareLoose = compareLoose;
function compareLoose(a, b) {
  return compare(a, b, true);
}

exports.rcompare = rcompare;
function rcompare(a, b, loose) {
  return compare(b, a, loose);
}

exports.sort = sort;
function sort(list, loose) {
  return list.sort(function(a, b) {
    return exports.compare(a, b, loose);
  });
}

exports.rsort = rsort;
function rsort(list, loose) {
  return list.sort(function(a, b) {
    return exports.rcompare(a, b, loose);
  });
}

exports.gt = gt;
function gt(a, b, loose) {
  return compare(a, b, loose) > 0;
}

exports.lt = lt;
function lt(a, b, loose) {
  return compare(a, b, loose) < 0;
}

exports.eq = eq;
function eq(a, b, loose) {
  return compare(a, b, loose) === 0;
}

exports.neq = neq;
function neq(a, b, loose) {
  return compare(a, b, loose) !== 0;
}

exports.gte = gte;
function gte(a, b, loose) {
  return compare(a, b, loose) >= 0;
}

exports.lte = lte;
function lte(a, b, loose) {
  return compare(a, b, loose) <= 0;
}

exports.cmp = cmp;
function cmp(a, op, b, loose) {
  var ret;
  switch (op) {
    case '===':
      if (typeof a === 'object') a = a.version;
      if (typeof b === 'object') b = b.version;
      ret = a === b;
      break;
    case '!==':
      if (typeof a === 'object') a = a.version;
      if (typeof b === 'object') b = b.version;
      ret = a !== b;
      break;
    case '': case '=': case '==': ret = eq(a, b, loose); break;
    case '!=': ret = neq(a, b, loose); break;
    case '>': ret = gt(a, b, loose); break;
    case '>=': ret = gte(a, b, loose); break;
    case '<': ret = lt(a, b, loose); break;
    case '<=': ret = lte(a, b, loose); break;
    default: throw new TypeError('Invalid operator: ' + op);
  }
  return ret;
}

exports.Comparator = Comparator;
function Comparator(comp, loose) {
  if (comp instanceof Comparator) {
    if (comp.loose === loose)
      return comp;
    else
      comp = comp.value;
  }

  if (!(this instanceof Comparator))
    return new Comparator(comp, loose);

  debug('comparator', comp, loose);
  this.loose = loose;
  this.parse(comp);

  if (this.semver === ANY)
    this.value = '';
  else
    this.value = this.operator + this.semver.version;

  debug('comp', this);
}

var ANY = {};
Comparator.prototype.parse = function(comp) {
  var r = this.loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
  var m = comp.match(r);

  if (!m)
    throw new TypeError('Invalid comparator: ' + comp);

  this.operator = m[1];
  if (this.operator === '=')
    this.operator = '';

  // if it literally is just '>' or '' then allow anything.
  if (!m[2])
    this.semver = ANY;
  else
    this.semver = new SemVer(m[2], this.loose);
};

Comparator.prototype.toString = function() {
  return this.value;
};

Comparator.prototype.test = function(version) {
  debug('Comparator.test', version, this.loose);

  if (this.semver === ANY)
    return true;

  if (typeof version === 'string')
    version = new SemVer(version, this.loose);

  return cmp(version, this.operator, this.semver, this.loose);
};

Comparator.prototype.intersects = function(comp, loose) {
  if (!(comp instanceof Comparator)) {
    throw new TypeError('a Comparator is required');
  }

  var rangeTmp;

  if (this.operator === '') {
    rangeTmp = new Range(comp.value, loose);
    return satisfies(this.value, rangeTmp, loose);
  } else if (comp.operator === '') {
    rangeTmp = new Range(this.value, loose);
    return satisfies(comp.semver, rangeTmp, loose);
  }

  var sameDirectionIncreasing =
    (this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '>=' || comp.operator === '>');
  var sameDirectionDecreasing =
    (this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '<=' || comp.operator === '<');
  var sameSemVer = this.semver.version === comp.semver.version;
  var differentDirectionsInclusive =
    (this.operator === '>=' || this.operator === '<=') &&
    (comp.operator === '>=' || comp.operator === '<=');
  var oppositeDirectionsLessThan =
    cmp(this.semver, '<', comp.semver, loose) &&
    ((this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '<=' || comp.operator === '<'));
  var oppositeDirectionsGreaterThan =
    cmp(this.semver, '>', comp.semver, loose) &&
    ((this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '>=' || comp.operator === '>'));

  return sameDirectionIncreasing || sameDirectionDecreasing ||
    (sameSemVer && differentDirectionsInclusive) ||
    oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
};


exports.Range = Range;
function Range(range, loose) {
  if (range instanceof Range) {
    if (range.loose === loose) {
      return range;
    } else {
      return new Range(range.raw, loose);
    }
  }

  if (range instanceof Comparator) {
    return new Range(range.value, loose);
  }

  if (!(this instanceof Range))
    return new Range(range, loose);

  this.loose = loose;

  // First, split based on boolean or ||
  this.raw = range;
  this.set = range.split(/\s*\|\|\s*/).map(function(range) {
    return this.parseRange(range.trim());
  }, this).filter(function(c) {
    // throw out any that are not relevant for whatever reason
    return c.length;
  });

  if (!this.set.length) {
    throw new TypeError('Invalid SemVer Range: ' + range);
  }

  this.format();
}

Range.prototype.format = function() {
  this.range = this.set.map(function(comps) {
    return comps.join(' ').trim();
  }).join('||').trim();
  return this.range;
};

Range.prototype.toString = function() {
  return this.range;
};

Range.prototype.parseRange = function(range) {
  var loose = this.loose;
  range = range.trim();
  debug('range', range, loose);
  // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
  var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
  range = range.replace(hr, hyphenReplace);
  debug('hyphen replace', range);
  // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
  range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace);
  debug('comparator trim', range, re[COMPARATORTRIM]);

  // `~ 1.2.3` => `~1.2.3`
  range = range.replace(re[TILDETRIM], tildeTrimReplace);

  // `^ 1.2.3` => `^1.2.3`
  range = range.replace(re[CARETTRIM], caretTrimReplace);

  // normalize spaces
  range = range.split(/\s+/).join(' ');

  // At this point, the range is completely trimmed and
  // ready to be split into comparators.

  var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
  var set = range.split(' ').map(function(comp) {
    return parseComparator(comp, loose);
  }).join(' ').split(/\s+/);
  if (this.loose) {
    // in loose mode, throw out any that are not valid comparators
    set = set.filter(function(comp) {
      return !!comp.match(compRe);
    });
  }
  set = set.map(function(comp) {
    return new Comparator(comp, loose);
  });

  return set;
};

Range.prototype.intersects = function(range, loose) {
  if (!(range instanceof Range)) {
    throw new TypeError('a Range is required');
  }

  return this.set.some(function(thisComparators) {
    return thisComparators.every(function(thisComparator) {
      return range.set.some(function(rangeComparators) {
        return rangeComparators.every(function(rangeComparator) {
          return thisComparator.intersects(rangeComparator, loose);
        });
      });
    });
  });
};

// Mostly just for testing and legacy API reasons
exports.toComparators = toComparators;
function toComparators(range, loose) {
  return new Range(range, loose).set.map(function(comp) {
    return comp.map(function(c) {
      return c.value;
    }).join(' ').trim().split(' ');
  });
}

// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
function parseComparator(comp, loose) {
  debug('comp', comp);
  comp = replaceCarets(comp, loose);
  debug('caret', comp);
  comp = replaceTildes(comp, loose);
  debug('tildes', comp);
  comp = replaceXRanges(comp, loose);
  debug('xrange', comp);
  comp = replaceStars(comp, loose);
  debug('stars', comp);
  return comp;
}

function isX(id) {
  return !id || id.toLowerCase() === 'x' || id === '*';
}

// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
function replaceTildes(comp, loose) {
  return comp.trim().split(/\s+/).map(function(comp) {
    return replaceTilde(comp, loose);
  }).join(' ');
}

function replaceTilde(comp, loose) {
  var r = loose ? re[TILDELOOSE] : re[TILDE];
  return comp.replace(r, function(_, M, m, p, pr) {
    debug('tilde', comp, _, M, m, p, pr);
    var ret;

    if (isX(M))
      ret = '';
    else if (isX(m))
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
    else if (isX(p))
      // ~1.2 == >=1.2.0 <1.3.0
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
    else if (pr) {
      debug('replaceTilde pr', pr);
      if (pr.charAt(0) !== '-')
        pr = '-' + pr;
      ret = '>=' + M + '.' + m + '.' + p + pr +
            ' <' + M + '.' + (+m + 1) + '.0';
    } else
      // ~1.2.3 == >=1.2.3 <1.3.0
      ret = '>=' + M + '.' + m + '.' + p +
            ' <' + M + '.' + (+m + 1) + '.0';

    debug('tilde return', ret);
    return ret;
  });
}

// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
// ^1.2.3 --> >=1.2.3 <2.0.0
// ^1.2.0 --> >=1.2.0 <2.0.0
function replaceCarets(comp, loose) {
  return comp.trim().split(/\s+/).map(function(comp) {
    return replaceCaret(comp, loose);
  }).join(' ');
}

function replaceCaret(comp, loose) {
  debug('caret', comp, loose);
  var r = loose ? re[CARETLOOSE] : re[CARET];
  return comp.replace(r, function(_, M, m, p, pr) {
    debug('caret', comp, _, M, m, p, pr);
    var ret;

    if (isX(M))
      ret = '';
    else if (isX(m))
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
    else if (isX(p)) {
      if (M === '0')
        ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
      else
        ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0';
    } else if (pr) {
      debug('replaceCaret pr', pr);
      if (pr.charAt(0) !== '-')
        pr = '-' + pr;
      if (M === '0') {
        if (m === '0')
          ret = '>=' + M + '.' + m + '.' + p + pr +
                ' <' + M + '.' + m + '.' + (+p + 1);
        else
          ret = '>=' + M + '.' + m + '.' + p + pr +
                ' <' + M + '.' + (+m + 1) + '.0';
      } else
        ret = '>=' + M + '.' + m + '.' + p + pr +
              ' <' + (+M + 1) + '.0.0';
    } else {
      debug('no pr');
      if (M === '0') {
        if (m === '0')
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + m + '.' + (+p + 1);
        else
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + (+m + 1) + '.0';
      } else
        ret = '>=' + M + '.' + m + '.' + p +
              ' <' + (+M + 1) + '.0.0';
    }

    debug('caret return', ret);
    return ret;
  });
}

function replaceXRanges(comp, loose) {
  debug('replaceXRanges', comp, loose);
  return comp.split(/\s+/).map(function(comp) {
    return replaceXRange(comp, loose);
  }).join(' ');
}

function replaceXRange(comp, loose) {
  comp = comp.trim();
  var r = loose ? re[XRANGELOOSE] : re[XRANGE];
  return comp.replace(r, function(ret, gtlt, M, m, p, pr) {
    debug('xRange', comp, ret, gtlt, M, m, p, pr);
    var xM = isX(M);
    var xm = xM || isX(m);
    var xp = xm || isX(p);
    var anyX = xp;

    if (gtlt === '=' && anyX)
      gtlt = '';

    if (xM) {
      if (gtlt === '>' || gtlt === '<') {
        // nothing is allowed
        ret = '<0.0.0';
      } else {
        // nothing is forbidden
        ret = '*';
      }
    } else if (gtlt && anyX) {
      // replace X with 0
      if (xm)
        m = 0;
      if (xp)
        p = 0;

      if (gtlt === '>') {
        // >1 => >=2.0.0
        // >1.2 => >=1.3.0
        // >1.2.3 => >= 1.2.4
        gtlt = '>=';
        if (xm) {
          M = +M + 1;
          m = 0;
          p = 0;
        } else if (xp) {
          m = +m + 1;
          p = 0;
        }
      } else if (gtlt === '<=') {
        // <=0.7.x is actually <0.8.0, since any 0.7.x should
        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
        gtlt = '<';
        if (xm)
          M = +M + 1;
        else
          m = +m + 1;
      }

      ret = gtlt + M + '.' + m + '.' + p;
    } else if (xm) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
    } else if (xp) {
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
    }

    debug('xRange return', ret);

    return ret;
  });
}

// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
function replaceStars(comp, loose) {
  debug('replaceStars', comp, loose);
  // Looseness is ignored here.  star is always as loose as it gets!
  return comp.trim().replace(re[STAR], '');
}

// This function is passed to string.replace(re[HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0
function hyphenReplace($0,
                       from, fM, fm, fp, fpr, fb,
                       to, tM, tm, tp, tpr, tb) {

  if (isX(fM))
    from = '';
  else if (isX(fm))
    from = '>=' + fM + '.0.0';
  else if (isX(fp))
    from = '>=' + fM + '.' + fm + '.0';
  else
    from = '>=' + from;

  if (isX(tM))
    to = '';
  else if (isX(tm))
    to = '<' + (+tM + 1) + '.0.0';
  else if (isX(tp))
    to = '<' + tM + '.' + (+tm + 1) + '.0';
  else if (tpr)
    to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr;
  else
    to = '<=' + to;

  return (from + ' ' + to).trim();
}


// if ANY of the sets match ALL of its comparators, then pass
Range.prototype.test = function(version) {
  if (!version)
    return false;

  if (typeof version === 'string')
    version = new SemVer(version, this.loose);

  for (var i = 0; i < this.set.length; i++) {
    if (testSet(this.set[i], version))
      return true;
  }
  return false;
};

function testSet(set, version) {
  for (var i = 0; i < set.length; i++) {
    if (!set[i].test(version))
      return false;
  }

  if (version.prerelease.length) {
    // Find the set of versions that are allowed to have prereleases
    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
    // That should allow `1.2.3-pr.2` to pass.
    // However, `1.2.4-alpha.notready` should NOT be allowed,
    // even though it's within the range set by the comparators.
    for (var i = 0; i < set.length; i++) {
      debug(set[i].semver);
      if (set[i].semver === ANY)
        continue;

      if (set[i].semver.prerelease.length > 0) {
        var allowed = set[i].semver;
        if (allowed.major === version.major &&
            allowed.minor === version.minor &&
            allowed.patch === version.patch)
          return true;
      }
    }

    // Version has a -pre, but it's not one of the ones we like.
    return false;
  }

  return true;
}

exports.satisfies = satisfies;
function satisfies(version, range, loose) {
  try {
    range = new Range(range, loose);
  } catch (er) {
    return false;
  }
  return range.test(version);
}

exports.maxSatisfying = maxSatisfying;
function maxSatisfying(versions, range, loose) {
  var max = null;
  var maxSV = null;
  try {
    var rangeObj = new Range(range, loose);
  } catch (er) {
    return null;
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) { // satisfies(v, range, loose)
      if (!max || maxSV.compare(v) === -1) { // compare(max, v, true)
        max = v;
        maxSV = new SemVer(max, loose);
      }
    }
  })
  return max;
}

exports.minSatisfying = minSatisfying;
function minSatisfying(versions, range, loose) {
  var min = null;
  var minSV = null;
  try {
    var rangeObj = new Range(range, loose);
  } catch (er) {
    return null;
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) { // satisfies(v, range, loose)
      if (!min || minSV.compare(v) === 1) { // compare(min, v, true)
        min = v;
        minSV = new SemVer(min, loose);
      }
    }
  })
  return min;
}

exports.validRange = validRange;
function validRange(range, loose) {
  try {
    // Return '*' instead of '' so that truthiness works.
    // This will throw if it's invalid anyway
    return new Range(range, loose).range || '*';
  } catch (er) {
    return null;
  }
}

// Determine if version is less than all the versions possible in the range
exports.ltr = ltr;
function ltr(version, range, loose) {
  return outside(version, range, '<', loose);
}

// Determine if version is greater than all the versions possible in the range.
exports.gtr = gtr;
function gtr(version, range, loose) {
  return outside(version, range, '>', loose);
}

exports.outside = outside;
function outside(version, range, hilo, loose) {
  version = new SemVer(version, loose);
  range = new Range(range, loose);

  var gtfn, ltefn, ltfn, comp, ecomp;
  switch (hilo) {
    case '>':
      gtfn = gt;
      ltefn = lte;
      ltfn = lt;
      comp = '>';
      ecomp = '>=';
      break;
    case '<':
      gtfn = lt;
      ltefn = gte;
      ltfn = gt;
      comp = '<';
      ecomp = '<=';
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }

  // If it satisifes the range it is not outside
  if (satisfies(version, range, loose)) {
    return false;
  }

  // From now on, variable terms are as if we're in "gtr" mode.
  // but note that everything is flipped for the "ltr" function.

  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i];

    var high = null;
    var low = null;

    comparators.forEach(function(comparator) {
      if (comparator.semver === ANY) {
        comparator = new Comparator('>=0.0.0')
      }
      high = high || comparator;
      low = low || comparator;
      if (gtfn(comparator.semver, high.semver, loose)) {
        high = comparator;
      } else if (ltfn(comparator.semver, low.semver, loose)) {
        low = comparator;
      }
    });

    // If the edge version comparator has a operator then our version
    // isn't outside it
    if (high.operator === comp || high.operator === ecomp) {
      return false;
    }

    // If the lowest version comparator has an operator and our version
    // is less than it then it isn't higher than the range
    if ((!low.operator || low.operator === comp) &&
        ltefn(version, low.semver)) {
      return false;
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false;
    }
  }
  return true;
}

exports.prerelease = prerelease;
function prerelease(version, loose) {
  var parsed = parse(version, loose);
  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null;
}

exports.intersects = intersects;
function intersects(r1, r2, loose) {
  r1 = new Range(r1, loose)
  r2 = new Range(r2, loose)
  return r1.intersects(r2)
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(42)))

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _SugarParser = __webpack_require__(23);

function parserFactory(format) {
    if (/sugar(cane|cube)?/i.test(format)) {
        return { parse: _SugarParser.parse };
    } else {
        throw new Error('Format type not implemented.');
    }
}
exports.default = parserFactory;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function peg$subclass(child, parent) {
    function ctor() {
        this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
}
function peg$SyntaxError(message, expected, found, location) {
    this.message = message;
    this.expected = expected;
    this.found = found;
    this.location = location;
    this.name = "SyntaxError";
    if (typeof Error.captureStackTrace === "function") {
        Error.captureStackTrace(this, peg$SyntaxError);
    }
}
peg$subclass(peg$SyntaxError, Error);
peg$SyntaxError.buildMessage = function (expected, found) {
    var DESCRIBE_EXPECTATION_FNS = {
        literal: function literal(expectation) {
            return "\"" + literalEscape(expectation.text) + "\"";
        },
        "class": function _class(expectation) {
            var escapedParts = "",
                i;
            for (i = 0; i < expectation.parts.length; i++) {
                escapedParts += expectation.parts[i] instanceof Array ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1]) : classEscape(expectation.parts[i]);
            }
            return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
        },
        any: function any(expectation) {
            return "any character";
        },
        end: function end(expectation) {
            return "end of input";
        },
        other: function other(expectation) {
            return expectation.description;
        }
    };
    function hex(ch) {
        return ch.charCodeAt(0).toString(16).toUpperCase();
    }
    function literalEscape(s) {
        return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\0/g, '\\0').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/[\x00-\x0F]/g, function (ch) {
            return '\\x0' + hex(ch);
        }).replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) {
            return '\\x' + hex(ch);
        });
    }
    function classEscape(s) {
        return s.replace(/\\/g, '\\\\').replace(/\]/g, '\\]').replace(/\^/g, '\\^').replace(/-/g, '\\-').replace(/\0/g, '\\0').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/[\x00-\x0F]/g, function (ch) {
            return '\\x0' + hex(ch);
        }).replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) {
            return '\\x' + hex(ch);
        });
    }
    function describeExpectation(expectation) {
        return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
    }
    function describeExpected(expected) {
        var descriptions = new Array(expected.length),
            i,
            j;
        for (i = 0; i < expected.length; i++) {
            descriptions[i] = describeExpectation(expected[i]);
        }
        descriptions.sort();
        if (descriptions.length > 0) {
            for (i = 1, j = 1; i < descriptions.length; i++) {
                if (descriptions[i - 1] !== descriptions[i]) {
                    descriptions[j] = descriptions[i];
                    j++;
                }
            }
            descriptions.length = j;
        }
        switch (descriptions.length) {
            case 1:
                return descriptions[0];
            case 2:
                return descriptions[0] + " or " + descriptions[1];
            default:
                return descriptions.slice(0, -1).join(", ") + ", or " + descriptions[descriptions.length - 1];
        }
    }
    function describeFound(found) {
        return found ? "\"" + literalEscape(found) + "\"" : "end of input";
    }
    return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};
function peg$parse(input, options) {
    options = options !== void 0 ? options : {};
    var peg$FAILED = {},
        peg$startRuleFunctions = { start: peg$parsestart },
        peg$startRuleFunction = peg$parsestart,
        peg$c0 = peg$anyExpectation(),
        peg$c1 = peg$otherExpectation("whitespace"),
        peg$c2 = /^[\n\r\t ]/,
        peg$c3 = peg$classExpectation(["\n", "\r", "\t", " "], false, false),
        peg$c4 = ",",
        peg$c5 = peg$literalExpectation(",", false),
        peg$c6 = /^[0-9]/,
        peg$c7 = peg$classExpectation([["0", "9"]], false, false),
        peg$c8 = ".",
        peg$c9 = peg$literalExpectation(".", false),
        peg$c10 = function peg$c10(val) {
        return {
            type: 'number',
            value: Number(val)
        };
    },
        peg$c11 = "\"",
        peg$c12 = peg$literalExpectation("\"", false),
        peg$c13 = "'",
        peg$c14 = peg$literalExpectation("'", false),
        peg$c15 = function peg$c15(text) {
        return {
            type: 'string',
            subtype: 'single',
            value: text
        };
    },
        peg$c16 = function peg$c16(text) {
        return {
            type: 'string',
            subtype: 'double',
            value: text
        };
    },
        peg$c17 = function peg$c17(text) {
        return {
            type: 'string',
            subtype: 'bare',
            value: text
        };
    },
        peg$c18 = function peg$c18(c) {
        return c;
    },
        peg$c19 = peg$otherExpectation("character"),
        peg$c20 = "\\",
        peg$c21 = peg$literalExpectation("\\", false),
        peg$c22 = "/",
        peg$c23 = peg$literalExpectation("/", false),
        peg$c24 = "b",
        peg$c25 = peg$literalExpectation("b", false),
        peg$c26 = function peg$c26() {
        return '\b';
    },
        peg$c27 = "f",
        peg$c28 = peg$literalExpectation("f", false),
        peg$c29 = function peg$c29() {
        return '\f';
    },
        peg$c30 = "n",
        peg$c31 = peg$literalExpectation("n", false),
        peg$c32 = function peg$c32() {
        return '\n';
    },
        peg$c33 = "r",
        peg$c34 = peg$literalExpectation("r", false),
        peg$c35 = function peg$c35() {
        return '\r';
    },
        peg$c36 = "t",
        peg$c37 = peg$literalExpectation("t", false),
        peg$c38 = function peg$c38() {
        return '\t';
    },
        peg$c39 = "u",
        peg$c40 = peg$literalExpectation("u", false),
        peg$c41 = function peg$c41(digits) {
        return String.fromCharCode(parseInt(digits, 16));
    },
        peg$c42 = function peg$c42(sequence) {
        return sequence;
    },
        peg$c43 = /^[ -!#-[\]-\u10FFFF]/,
        peg$c44 = peg$classExpectation([[" ", "!"], ["#", "["], ["]", "\u10FF"], "F", "F"], false, false),
        peg$c45 = /^[0-9a-f]/i,
        peg$c46 = peg$classExpectation([["0", "9"], ["a", "f"]], false, true),
        peg$c47 = /^[^\n\r\t <>\/$,=|]/,
        peg$c48 = peg$classExpectation(["\n", "\r", "\t", " ", "<", ">", "/", "$", ",", "=", "|"], true, false),
        peg$c49 = function peg$c49(linkContents) {
        return linkContents;
    },
        peg$c50 = function peg$c50(linkTextContents, ender, passageName) {
        if (!passageName) {
            throw new Error('There was no passage name.');
        }
        var subtype = void 0;
        if (ender === '->') {
            subtype = 'rightArrow';
        } else if (ender === '|') {
            subtype = 'bar';
        } else {
            subtype = 'passageNameOnly';
        }
        return {
            type: 'link',
            subtype: subtype,
            passageName: passageName,
            children: linkTextContents
        };
    },
        peg$c51 = function peg$c51(passageName) {
        return {
            type: 'link',
            subtype: 'onePart',
            passageName: passageName,
            children: []
        };
    },
        peg$c52 = /^[^\]]/,
        peg$c53 = peg$classExpectation(["]"], true, false),
        peg$c54 = "[[",
        peg$c55 = peg$literalExpectation("[[", false),
        peg$c56 = "]]",
        peg$c57 = peg$literalExpectation("]]", false),
        peg$c58 = "->",
        peg$c59 = peg$literalExpectation("->", false),
        peg$c60 = "|",
        peg$c61 = peg$literalExpectation("|", false),
        peg$c62 = "]",
        peg$c63 = peg$literalExpectation("]", false),
        peg$c64 = "<",
        peg$c65 = peg$literalExpectation("<", false),
        peg$c66 = "-->",
        peg$c67 = peg$literalExpectation("-->", false),
        peg$c68 = function peg$c68(val) {
        return val;
    },
        peg$c69 = function peg$c69($value) {
        return {
            type: 'comment',
            value: value
        };
    },
        peg$c70 = "<!--",
        peg$c71 = peg$literalExpectation("<!--", false),
        peg$c72 = function peg$c72(elem) {
        if (elem.tagName === 'tw-link') {
            var passageName = '___ERROR_NO_PASSAGE-NAME_ATTRIBUTE';
            elem.type = 'link';
            elem.subtype = 'linkElement';
            for (var ii = 0; ii < elem.attributes.length; ii += 1) {
                var attr = elem.attributes[ii];
                if (attr.key === 'passage-name') {
                    passageName = attr.value;
                    break;
                }
            }
            elem.passageName = passageName;
        }
        return elem;
    },
        peg$c73 = "<script",
        peg$c74 = peg$literalExpectation("<script", false),
        peg$c75 = ">",
        peg$c76 = peg$literalExpectation(">", false),
        peg$c77 = "</script>",
        peg$c78 = peg$literalExpectation("</script>", false),
        peg$c79 = "</script",
        peg$c80 = peg$literalExpectation("</script", false),
        peg$c81 = function peg$c81(attrs, contents) {
        return {
            type: 'element',
            tagName: 'script',
            attributes: attrs,
            children: [contents]
        };
    },
        peg$c82 = "<style",
        peg$c83 = peg$literalExpectation("<style", false),
        peg$c84 = "</style>",
        peg$c85 = peg$literalExpectation("</style>", false),
        peg$c86 = "</style",
        peg$c87 = peg$literalExpectation("</style", false),
        peg$c88 = function peg$c88(attrs, contents) {
        return {
            type: 'element',
            tagName: 'style',
            attributes: attrs,
            children: [contents]
        };
    },
        peg$c89 = function peg$c89(attrs) {
        return attrs;
    },
        peg$c90 = function peg$c90(attrs) {
        return attrs;
    },
        peg$c91 = peg$otherExpectation("voidElement"),
        peg$c92 = function peg$c92(tagName, attrs) {
        return {
            type: 'element',
            tagName: tagName,
            attributes: attrs,
            children: []
        };
    },
        peg$c93 = peg$otherExpectation("elementWithTwoTags"),
        peg$c94 = function peg$c94(tagName, attrs, children) {
        return {
            type: 'element',
            tagName: tagName,
            attributes: attrs,
            children: children
        };
    },
        peg$c95 = peg$otherExpectation("elementOpeningCharacter"),
        peg$c96 = peg$otherExpectation("elementClosingCharacter"),
        peg$c97 = peg$otherExpectation("elementTagNameOrAttributeKey"),
        peg$c98 = peg$otherExpectation("Element key character"),
        peg$c99 = /^[a-zA-Z\-]/,
        peg$c100 = peg$classExpectation([["a", "z"], ["A", "Z"], "-"], false, false),
        peg$c101 = peg$otherExpectation("elementTagName"),
        peg$c102 = peg$otherExpectation("elementAttribute"),
        peg$c103 = "=",
        peg$c104 = peg$literalExpectation("=", false),
        peg$c105 = function peg$c105(key, value) {
        return value;
    },
        peg$c106 = function peg$c106(key, attrValue) {
        return {
            type: 'elementAttribute',
            key: key,
            value: (attrValue || {}).value || ''
        };
    },
        peg$c107 = peg$otherExpectation("elementAttributeKey"),
        peg$c108 = peg$otherExpectation("elementAttributeValue"),
        peg$c109 = peg$otherExpectation("invocationOpen"),
        peg$c110 = "<<",
        peg$c111 = peg$literalExpectation("<<", false),
        peg$c112 = peg$otherExpectation("invocationClose"),
        peg$c113 = ">>",
        peg$c114 = peg$literalExpectation(">>", false),
        peg$c115 = peg$otherExpectation("variableOpener"),
        peg$c116 = "$",
        peg$c117 = peg$literalExpectation("$", false),
        peg$c118 = function peg$c118(varName) {
        return {
            type: 'variable',
            name: varName
        };
    },
        peg$c119 = peg$otherExpectation("argument"),
        peg$c120 = function peg$c120(arg) {
        if (arg.type === 'invocation') {
            return arg;
        }
        var argument = {
            type: arg.type,
            value: arg.value
        };
        if ('subtype' in arg) {
            argument.subtype = arg.subtype;
        }
        return arg;
    },
        peg$c121 = function peg$c121(invokeName, args) {
        return {
            type: 'invocation',
            subtype: 'withoutBody',
            name: invokeName,
            arguments: args,
            children: []
        };
    },
        peg$c122 = "end",
        peg$c123 = peg$literalExpectation("end", false),
        peg$c124 = function peg$c124(invoke, children) {
        return {
            type: 'invocation',
            subtype: 'withBody',
            functionName: invoke.name,
            arguments: invoke.arguments,
            children: children
        };
    },
        peg$c125 = function peg$c125(characters) {
        return characters;
    },
        peg$currPos = 0,
        peg$savedPos = 0,
        peg$posDetailsCache = [{ line: 1, column: 1 }],
        peg$maxFailPos = 0,
        peg$maxFailExpected = [],
        peg$silentFails = 0,
        peg$result;
    if ("startRule" in options) {
        if (!(options.startRule in peg$startRuleFunctions)) {
            throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
        }
        peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }
    function text() {
        return input.substring(peg$savedPos, peg$currPos);
    }
    function location() {
        return peg$computeLocation(peg$savedPos, peg$currPos);
    }
    function expected(description, location) {
        location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos);
        throw peg$buildStructuredError([peg$otherExpectation(description)], input.substring(peg$savedPos, peg$currPos), location);
    }
    function error(message, location) {
        location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos);
        throw peg$buildSimpleError(message, location);
    }
    function peg$literalExpectation(text, ignoreCase) {
        return { type: "literal", text: text, ignoreCase: ignoreCase };
    }
    function peg$classExpectation(parts, inverted, ignoreCase) {
        return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
    }
    function peg$anyExpectation() {
        return { type: "any" };
    }
    function peg$endExpectation() {
        return { type: "end" };
    }
    function peg$otherExpectation(description) {
        return { type: "other", description: description };
    }
    function peg$computePosDetails(pos) {
        var details = peg$posDetailsCache[pos],
            p;
        if (details) {
            return details;
        } else {
            p = pos - 1;
            while (!peg$posDetailsCache[p]) {
                p--;
            }
            details = peg$posDetailsCache[p];
            details = {
                line: details.line,
                column: details.column
            };
            while (p < pos) {
                if (input.charCodeAt(p) === 10) {
                    details.line++;
                    details.column = 1;
                } else {
                    details.column++;
                }
                p++;
            }
            peg$posDetailsCache[pos] = details;
            return details;
        }
    }
    function peg$computeLocation(startPos, endPos) {
        var startPosDetails = peg$computePosDetails(startPos),
            endPosDetails = peg$computePosDetails(endPos);
        return {
            start: {
                offset: startPos,
                line: startPosDetails.line,
                column: startPosDetails.column
            },
            end: {
                offset: endPos,
                line: endPosDetails.line,
                column: endPosDetails.column
            }
        };
    }
    function peg$fail(expected) {
        if (peg$currPos < peg$maxFailPos) {
            return;
        }
        if (peg$currPos > peg$maxFailPos) {
            peg$maxFailPos = peg$currPos;
            peg$maxFailExpected = [];
        }
        peg$maxFailExpected.push(expected);
    }
    function peg$buildSimpleError(message, location) {
        return new peg$SyntaxError(message, null, null, location);
    }
    function peg$buildStructuredError(expected, found, location) {
        return new peg$SyntaxError(peg$SyntaxError.buildMessage(expected, found), expected, found, location);
    }
    function peg$parsestart() {
        var s0, s1;
        s0 = [];
        s1 = peg$parseallGlobalTypes();
        while (s1 !== peg$FAILED) {
            s0.push(s1);
            s1 = peg$parseallGlobalTypes();
        }
        return s0;
    }
    function peg$parseallGlobalTypes() {
        var s0;
        s0 = peg$parselinkLiteral();
        if (s0 === peg$FAILED) {
            s0 = peg$parsecomment();
            if (s0 === peg$FAILED) {
                s0 = peg$parseelem();
                if (s0 === peg$FAILED) {
                    s0 = peg$parseinvocation();
                    if (s0 === peg$FAILED) {
                        s0 = peg$parsevariable();
                        if (s0 === peg$FAILED) {
                            s0 = peg$parsetext();
                        }
                    }
                }
            }
        }
        return s0;
    }
    function peg$parseany() {
        var s0;
        if (input.length > peg$currPos) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
        } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c0);
            }
        }
        return s0;
    }
    function peg$parsews() {
        var s0, s1;
        peg$silentFails++;
        if (peg$c2.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
        } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c3);
            }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c1);
            }
        }
        return s0;
    }
    function peg$parsecomma() {
        var s0;
        if (input.charCodeAt(peg$currPos) === 44) {
            s0 = peg$c4;
            peg$currPos++;
        } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c5);
            }
        }
        return s0;
    }
    function peg$parsenumber() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = [];
        if (peg$c6.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
        } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c7);
            }
        }
        while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c6.test(input.charAt(peg$currPos))) {
                s3 = input.charAt(peg$currPos);
                peg$currPos++;
            } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c7);
                }
            }
        }
        if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 46) {
                s3 = peg$c8;
                peg$currPos++;
            } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c9);
                }
            }
            if (s3 !== peg$FAILED) {
                s4 = [];
                if (peg$c6.test(input.charAt(peg$currPos))) {
                    s5 = input.charAt(peg$currPos);
                    peg$currPos++;
                } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c7);
                    }
                }
                if (s5 !== peg$FAILED) {
                    while (s5 !== peg$FAILED) {
                        s4.push(s5);
                        if (peg$c6.test(input.charAt(peg$currPos))) {
                            s5 = input.charAt(peg$currPos);
                            peg$currPos++;
                        } else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c7);
                            }
                        }
                    }
                } else {
                    s4 = peg$FAILED;
                }
                if (s4 !== peg$FAILED) {
                    s2 = [s2, s3, s4];
                    s1 = s2;
                } else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                }
            } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
        } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
        }
        if (s1 === peg$FAILED) {
            s1 = [];
            if (peg$c6.test(input.charAt(peg$currPos))) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
            } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c7);
                }
            }
            if (s2 !== peg$FAILED) {
                while (s2 !== peg$FAILED) {
                    s1.push(s2);
                    if (peg$c6.test(input.charAt(peg$currPos))) {
                        s2 = input.charAt(peg$currPos);
                        peg$currPos++;
                    } else {
                        s2 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c7);
                        }
                    }
                }
            } else {
                s1 = peg$FAILED;
            }
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c10(s1);
        }
        s0 = s1;
        return s0;
    }
    function peg$parsedoubleQuote() {
        var s0;
        if (input.charCodeAt(peg$currPos) === 34) {
            s0 = peg$c11;
            peg$currPos++;
        } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c12);
            }
        }
        return s0;
    }
    function peg$parsesingleQuote() {
        var s0;
        if (input.charCodeAt(peg$currPos) === 39) {
            s0 = peg$c13;
            peg$currPos++;
        } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c14);
            }
        }
        return s0;
    }
    function peg$parsestring() {
        var s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        s1 = peg$parsedoubleQuote();
        if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            s3 = [];
            s4 = peg$parsedoubleQuoteCharacter();
            while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parsedoubleQuoteCharacter();
            }
            if (s3 !== peg$FAILED) {
                s2 = input.substring(s2, peg$currPos);
            } else {
                s2 = s3;
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parsedoubleQuote();
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c15(s2);
                    s0 = s1;
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parsesingleQuote();
            if (s1 !== peg$FAILED) {
                s2 = peg$currPos;
                s3 = [];
                s4 = peg$parsesingleQuoteCharacter();
                while (s4 !== peg$FAILED) {
                    s3.push(s4);
                    s4 = peg$parsesingleQuoteCharacter();
                }
                if (s3 !== peg$FAILED) {
                    s2 = input.substring(s2, peg$currPos);
                } else {
                    s2 = s3;
                }
                if (s2 !== peg$FAILED) {
                    s3 = peg$parsesingleQuote();
                    if (s3 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c16(s2);
                        s0 = s1;
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        return s0;
    }
    function peg$parsebareString() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = [];
        s3 = peg$parseinvokeNameChar();
        if (s3 !== peg$FAILED) {
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                s3 = peg$parseinvokeNameChar();
            }
        } else {
            s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
            s1 = input.substring(s1, peg$currPos);
        } else {
            s1 = s2;
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c17(s1);
        }
        s0 = s1;
        return s0;
    }
    function peg$parsedoubleQuoteCharacter() {
        var s0, s1, s2;
        s0 = peg$currPos;
        s1 = peg$currPos;
        peg$silentFails++;
        s2 = peg$parsedoubleQuote();
        peg$silentFails--;
        if (s2 === peg$FAILED) {
            s1 = void 0;
        } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsestrChar();
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c18(s2);
                s0 = s1;
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsesingleQuoteCharacter() {
        var s0, s1, s2;
        s0 = peg$currPos;
        s1 = peg$currPos;
        peg$silentFails++;
        s2 = peg$parsesingleQuote();
        peg$silentFails--;
        if (s2 === peg$FAILED) {
            s1 = void 0;
        } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsestrChar();
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c18(s2);
                s0 = s1;
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsestrChar() {
        var s0, s1;
        peg$silentFails++;
        s0 = peg$parseescapeSequence();
        if (s0 === peg$FAILED) {
            s0 = peg$parseunescaped();
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c19);
            }
        }
        return s0;
    }
    function peg$parseescapeSequence() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
        s0 = peg$currPos;
        s1 = peg$parseescapeCharacter();
        if (s1 !== peg$FAILED) {
            s2 = peg$parsedoubleQuote();
            if (s2 === peg$FAILED) {
                s2 = peg$parsesingleQuote();
                if (s2 === peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 92) {
                        s2 = peg$c20;
                        peg$currPos++;
                    } else {
                        s2 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c21);
                        }
                    }
                    if (s2 === peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 47) {
                            s2 = peg$c22;
                            peg$currPos++;
                        } else {
                            s2 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c23);
                            }
                        }
                        if (s2 === peg$FAILED) {
                            s2 = peg$currPos;
                            if (input.charCodeAt(peg$currPos) === 98) {
                                s3 = peg$c24;
                                peg$currPos++;
                            } else {
                                s3 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c25);
                                }
                            }
                            if (s3 !== peg$FAILED) {
                                peg$savedPos = s2;
                                s3 = peg$c26();
                            }
                            s2 = s3;
                            if (s2 === peg$FAILED) {
                                s2 = peg$currPos;
                                if (input.charCodeAt(peg$currPos) === 102) {
                                    s3 = peg$c27;
                                    peg$currPos++;
                                } else {
                                    s3 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c28);
                                    }
                                }
                                if (s3 !== peg$FAILED) {
                                    peg$savedPos = s2;
                                    s3 = peg$c29();
                                }
                                s2 = s3;
                                if (s2 === peg$FAILED) {
                                    s2 = peg$currPos;
                                    if (input.charCodeAt(peg$currPos) === 110) {
                                        s3 = peg$c30;
                                        peg$currPos++;
                                    } else {
                                        s3 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                            peg$fail(peg$c31);
                                        }
                                    }
                                    if (s3 !== peg$FAILED) {
                                        peg$savedPos = s2;
                                        s3 = peg$c32();
                                    }
                                    s2 = s3;
                                    if (s2 === peg$FAILED) {
                                        s2 = peg$currPos;
                                        if (input.charCodeAt(peg$currPos) === 114) {
                                            s3 = peg$c33;
                                            peg$currPos++;
                                        } else {
                                            s3 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                                peg$fail(peg$c34);
                                            }
                                        }
                                        if (s3 !== peg$FAILED) {
                                            peg$savedPos = s2;
                                            s3 = peg$c35();
                                        }
                                        s2 = s3;
                                        if (s2 === peg$FAILED) {
                                            s2 = peg$currPos;
                                            if (input.charCodeAt(peg$currPos) === 116) {
                                                s3 = peg$c36;
                                                peg$currPos++;
                                            } else {
                                                s3 = peg$FAILED;
                                                if (peg$silentFails === 0) {
                                                    peg$fail(peg$c37);
                                                }
                                            }
                                            if (s3 !== peg$FAILED) {
                                                peg$savedPos = s2;
                                                s3 = peg$c38();
                                            }
                                            s2 = s3;
                                            if (s2 === peg$FAILED) {
                                                s2 = peg$currPos;
                                                if (input.charCodeAt(peg$currPos) === 117) {
                                                    s3 = peg$c39;
                                                    peg$currPos++;
                                                } else {
                                                    s3 = peg$FAILED;
                                                    if (peg$silentFails === 0) {
                                                        peg$fail(peg$c40);
                                                    }
                                                }
                                                if (s3 !== peg$FAILED) {
                                                    s4 = peg$currPos;
                                                    s5 = peg$currPos;
                                                    s6 = peg$parseHEXDIG();
                                                    if (s6 !== peg$FAILED) {
                                                        s7 = peg$parseHEXDIG();
                                                        if (s7 !== peg$FAILED) {
                                                            s8 = peg$parseHEXDIG();
                                                            if (s8 !== peg$FAILED) {
                                                                s9 = peg$parseHEXDIG();
                                                                if (s9 !== peg$FAILED) {
                                                                    s6 = [s6, s7, s8, s9];
                                                                    s5 = s6;
                                                                } else {
                                                                    peg$currPos = s5;
                                                                    s5 = peg$FAILED;
                                                                }
                                                            } else {
                                                                peg$currPos = s5;
                                                                s5 = peg$FAILED;
                                                            }
                                                        } else {
                                                            peg$currPos = s5;
                                                            s5 = peg$FAILED;
                                                        }
                                                    } else {
                                                        peg$currPos = s5;
                                                        s5 = peg$FAILED;
                                                    }
                                                    if (s5 !== peg$FAILED) {
                                                        s4 = input.substring(s4, peg$currPos);
                                                    } else {
                                                        s4 = s5;
                                                    }
                                                    if (s4 !== peg$FAILED) {
                                                        peg$savedPos = s2;
                                                        s3 = peg$c41(s4);
                                                        s2 = s3;
                                                    } else {
                                                        peg$currPos = s2;
                                                        s2 = peg$FAILED;
                                                    }
                                                } else {
                                                    peg$currPos = s2;
                                                    s2 = peg$FAILED;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c42(s2);
                s0 = s1;
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseunescaped() {
        var s0;
        if (peg$c43.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
        } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c44);
            }
        }
        return s0;
    }
    function peg$parseescapeCharacter() {
        var s0;
        if (input.charCodeAt(peg$currPos) === 92) {
            s0 = peg$c20;
            peg$currPos++;
        } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c21);
            }
        }
        return s0;
    }
    function peg$parseHEXDIG() {
        var s0;
        if (peg$c45.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
        } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c46);
            }
        }
        return s0;
    }
    function peg$parseinvokeNameChar() {
        var s0;
        if (peg$c47.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
        } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c48);
            }
        }
        return s0;
    }
    function peg$parselinkLiteral() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$parselinkOpen();
        if (s1 !== peg$FAILED) {
            s2 = peg$parsetwoPartLinkContents();
            if (s2 === peg$FAILED) {
                s2 = peg$parseonePartLinkContents();
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parselinkClose();
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c49(s2);
                    s0 = s1;
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsetwoPartLinkContents() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parselinkTextItem();
        if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
                s1.push(s2);
                s2 = peg$parselinkTextItem();
            }
        } else {
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parselinkTextEnder();
            if (s2 !== peg$FAILED) {
                s3 = peg$currPos;
                s4 = [];
                s5 = peg$parsepassageNameChar();
                if (s5 !== peg$FAILED) {
                    while (s5 !== peg$FAILED) {
                        s4.push(s5);
                        s5 = peg$parsepassageNameChar();
                    }
                } else {
                    s4 = peg$FAILED;
                }
                if (s4 !== peg$FAILED) {
                    s3 = input.substring(s3, peg$currPos);
                } else {
                    s3 = s4;
                }
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c50(s1, s2, s3);
                    s0 = s1;
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseonePartLinkContents() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = [];
        s3 = peg$parsepassageNameChar();
        if (s3 !== peg$FAILED) {
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                s3 = peg$parsepassageNameChar();
            }
        } else {
            s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
            s1 = input.substring(s1, peg$currPos);
        } else {
            s1 = s2;
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c51(s1);
        }
        s0 = s1;
        return s0;
    }
    function peg$parselinkChar() {
        var s0;
        if (peg$c52.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
        } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c53);
            }
        }
        return s0;
    }
    function peg$parselinkOpen() {
        var s0;
        if (input.substr(peg$currPos, 2) === peg$c54) {
            s0 = peg$c54;
            peg$currPos += 2;
        } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c55);
            }
        }
        return s0;
    }
    function peg$parselinkClose() {
        var s0;
        if (input.substr(peg$currPos, 2) === peg$c56) {
            s0 = peg$c56;
            peg$currPos += 2;
        } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c57);
            }
        }
        return s0;
    }
    function peg$parselinkTextItem() {
        var s0, s1, s2, s3, s4;
        s0 = peg$parsecomment();
        if (s0 === peg$FAILED) {
            s0 = peg$parseelem();
            if (s0 === peg$FAILED) {
                s0 = peg$parsevariable();
                if (s0 === peg$FAILED) {
                    s0 = peg$parseinvocation();
                    if (s0 === peg$FAILED) {
                        s0 = peg$currPos;
                        s1 = [];
                        s2 = peg$currPos;
                        s3 = peg$currPos;
                        peg$silentFails++;
                        s4 = peg$parselinkTextEnder();
                        peg$silentFails--;
                        if (s4 === peg$FAILED) {
                            s3 = void 0;
                        } else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                        if (s3 !== peg$FAILED) {
                            s4 = peg$parseany();
                            if (s4 !== peg$FAILED) {
                                s3 = [s3, s4];
                                s2 = s3;
                            } else {
                                peg$currPos = s2;
                                s2 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s2;
                            s2 = peg$FAILED;
                        }
                        if (s2 !== peg$FAILED) {
                            while (s2 !== peg$FAILED) {
                                s1.push(s2);
                                s2 = peg$currPos;
                                s3 = peg$currPos;
                                peg$silentFails++;
                                s4 = peg$parselinkTextEnder();
                                peg$silentFails--;
                                if (s4 === peg$FAILED) {
                                    s3 = void 0;
                                } else {
                                    peg$currPos = s3;
                                    s3 = peg$FAILED;
                                }
                                if (s3 !== peg$FAILED) {
                                    s4 = peg$parseany();
                                    if (s4 !== peg$FAILED) {
                                        s3 = [s3, s4];
                                        s2 = s3;
                                    } else {
                                        peg$currPos = s2;
                                        s2 = peg$FAILED;
                                    }
                                } else {
                                    peg$currPos = s2;
                                    s2 = peg$FAILED;
                                }
                            }
                        } else {
                            s1 = peg$FAILED;
                        }
                        if (s1 !== peg$FAILED) {
                            s0 = input.substring(s0, peg$currPos);
                        } else {
                            s0 = s1;
                        }
                    }
                }
            }
        }
        return s0;
    }
    function peg$parselinkTextEnder() {
        var s0, s1, s2;
        if (input.substr(peg$currPos, 2) === peg$c58) {
            s0 = peg$c58;
            peg$currPos += 2;
        } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c59);
            }
        }
        if (s0 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 124) {
                s0 = peg$c60;
                peg$currPos++;
            } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c61);
                }
            }
            if (s0 === peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 93) {
                    s0 = peg$c62;
                    peg$currPos++;
                } else {
                    s0 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c63);
                    }
                }
                if (s0 === peg$FAILED) {
                    s0 = peg$currPos;
                    if (input.charCodeAt(peg$currPos) === 60) {
                        s1 = peg$c64;
                        peg$currPos++;
                    } else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c65);
                        }
                    }
                    if (s1 !== peg$FAILED) {
                        s2 = peg$parseelemKeyChar();
                        if (s2 !== peg$FAILED) {
                            s1 = [s1, s2];
                            s0 = s1;
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
            }
        }
        return s0;
    }
    function peg$parsepassageNameChar() {
        var s0;
        if (peg$c52.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
        } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c53);
            }
        }
        return s0;
    }
    function peg$parsecomment() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = peg$parsecommentOpen();
        if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$currPos;
            s4 = peg$currPos;
            peg$silentFails++;
            if (input.substr(peg$currPos, 3) === peg$c66) {
                s5 = peg$c66;
                peg$currPos += 3;
            } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c67);
                }
            }
            peg$silentFails--;
            if (s5 === peg$FAILED) {
                s4 = void 0;
            } else {
                peg$currPos = s4;
                s4 = peg$FAILED;
            }
            if (s4 !== peg$FAILED) {
                s5 = peg$parseany();
                if (s5 !== peg$FAILED) {
                    peg$savedPos = s3;
                    s4 = peg$c68(s5);
                    s3 = s4;
                } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
            }
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                s3 = peg$currPos;
                s4 = peg$currPos;
                peg$silentFails++;
                if (input.substr(peg$currPos, 3) === peg$c66) {
                    s5 = peg$c66;
                    peg$currPos += 3;
                } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c67);
                    }
                }
                peg$silentFails--;
                if (s5 === peg$FAILED) {
                    s4 = void 0;
                } else {
                    peg$currPos = s4;
                    s4 = peg$FAILED;
                }
                if (s4 !== peg$FAILED) {
                    s5 = peg$parseany();
                    if (s5 !== peg$FAILED) {
                        peg$savedPos = s3;
                        s4 = peg$c68(s5);
                        s3 = s4;
                    } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parsecommentClose();
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c69(s2);
                    s0 = s1;
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsecommentOpen() {
        var s0;
        if (input.substr(peg$currPos, 4) === peg$c70) {
            s0 = peg$c70;
            peg$currPos += 4;
        } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c71);
            }
        }
        return s0;
    }
    function peg$parsecommentClose() {
        var s0;
        if (input.substr(peg$currPos, 3) === peg$c66) {
            s0 = peg$c66;
            peg$currPos += 3;
        } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c67);
            }
        }
        return s0;
    }
    function peg$parseelem() {
        var s0, s1;
        s0 = peg$currPos;
        s1 = peg$parsescript();
        if (s1 === peg$FAILED) {
            s1 = peg$parsestyle();
            if (s1 === peg$FAILED) {
                s1 = peg$parsedoubleTagElement();
                if (s1 === peg$FAILED) {
                    s1 = peg$parsesingleTagElement();
                }
            }
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c72(s1);
        }
        s0 = s1;
        return s0;
    }
    function peg$parsescript() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 7) === peg$c73) {
            s1 = peg$c73;
            peg$currPos += 7;
        } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c74);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsescriptOrStyleAttrs();
            if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 62) {
                    s3 = peg$c75;
                    peg$currPos++;
                } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c76);
                    }
                }
                if (s3 !== peg$FAILED) {
                    s4 = [];
                    s5 = peg$currPos;
                    s6 = peg$currPos;
                    peg$silentFails++;
                    if (input.substr(peg$currPos, 9) === peg$c77) {
                        s7 = peg$c77;
                        peg$currPos += 9;
                    } else {
                        s7 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c78);
                        }
                    }
                    peg$silentFails--;
                    if (s7 === peg$FAILED) {
                        s6 = void 0;
                    } else {
                        peg$currPos = s6;
                        s6 = peg$FAILED;
                    }
                    if (s6 !== peg$FAILED) {
                        s7 = peg$parseany();
                        if (s7 !== peg$FAILED) {
                            s6 = [s6, s7];
                            s5 = s6;
                        } else {
                            peg$currPos = s5;
                            s5 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s5;
                        s5 = peg$FAILED;
                    }
                    while (s5 !== peg$FAILED) {
                        s4.push(s5);
                        s5 = peg$currPos;
                        s6 = peg$currPos;
                        peg$silentFails++;
                        if (input.substr(peg$currPos, 9) === peg$c77) {
                            s7 = peg$c77;
                            peg$currPos += 9;
                        } else {
                            s7 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c78);
                            }
                        }
                        peg$silentFails--;
                        if (s7 === peg$FAILED) {
                            s6 = void 0;
                        } else {
                            peg$currPos = s6;
                            s6 = peg$FAILED;
                        }
                        if (s6 !== peg$FAILED) {
                            s7 = peg$parseany();
                            if (s7 !== peg$FAILED) {
                                s6 = [s6, s7];
                                s5 = s6;
                            } else {
                                peg$currPos = s5;
                                s5 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s5;
                            s5 = peg$FAILED;
                        }
                    }
                    if (s4 !== peg$FAILED) {
                        if (input.substr(peg$currPos, 8) === peg$c79) {
                            s5 = peg$c79;
                            peg$currPos += 8;
                        } else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c80);
                            }
                        }
                        if (s5 !== peg$FAILED) {
                            s6 = [];
                            s7 = peg$parsews();
                            while (s7 !== peg$FAILED) {
                                s6.push(s7);
                                s7 = peg$parsews();
                            }
                            if (s6 !== peg$FAILED) {
                                s7 = peg$parseelemCloseChar();
                                if (s7 !== peg$FAILED) {
                                    peg$savedPos = s0;
                                    s1 = peg$c81(s2, s4);
                                    s0 = s1;
                                } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsestyle() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 6) === peg$c82) {
            s1 = peg$c82;
            peg$currPos += 6;
        } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c83);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsescriptOrStyleAttrs();
            if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 62) {
                    s3 = peg$c75;
                    peg$currPos++;
                } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c76);
                    }
                }
                if (s3 !== peg$FAILED) {
                    s4 = peg$currPos;
                    s5 = [];
                    s6 = peg$currPos;
                    s7 = peg$currPos;
                    peg$silentFails++;
                    if (input.substr(peg$currPos, 8) === peg$c84) {
                        s8 = peg$c84;
                        peg$currPos += 8;
                    } else {
                        s8 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c85);
                        }
                    }
                    peg$silentFails--;
                    if (s8 === peg$FAILED) {
                        s7 = void 0;
                    } else {
                        peg$currPos = s7;
                        s7 = peg$FAILED;
                    }
                    if (s7 !== peg$FAILED) {
                        s8 = peg$parseany();
                        if (s8 !== peg$FAILED) {
                            s7 = [s7, s8];
                            s6 = s7;
                        } else {
                            peg$currPos = s6;
                            s6 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s6;
                        s6 = peg$FAILED;
                    }
                    while (s6 !== peg$FAILED) {
                        s5.push(s6);
                        s6 = peg$currPos;
                        s7 = peg$currPos;
                        peg$silentFails++;
                        if (input.substr(peg$currPos, 8) === peg$c84) {
                            s8 = peg$c84;
                            peg$currPos += 8;
                        } else {
                            s8 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c85);
                            }
                        }
                        peg$silentFails--;
                        if (s8 === peg$FAILED) {
                            s7 = void 0;
                        } else {
                            peg$currPos = s7;
                            s7 = peg$FAILED;
                        }
                        if (s7 !== peg$FAILED) {
                            s8 = peg$parseany();
                            if (s8 !== peg$FAILED) {
                                s7 = [s7, s8];
                                s6 = s7;
                            } else {
                                peg$currPos = s6;
                                s6 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s6;
                            s6 = peg$FAILED;
                        }
                    }
                    if (s5 !== peg$FAILED) {
                        s4 = input.substring(s4, peg$currPos);
                    } else {
                        s4 = s5;
                    }
                    if (s4 !== peg$FAILED) {
                        if (input.substr(peg$currPos, 7) === peg$c86) {
                            s5 = peg$c86;
                            peg$currPos += 7;
                        } else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c87);
                            }
                        }
                        if (s5 !== peg$FAILED) {
                            s6 = [];
                            s7 = peg$parsews();
                            while (s7 !== peg$FAILED) {
                                s6.push(s7);
                                s7 = peg$parsews();
                            }
                            if (s6 !== peg$FAILED) {
                                s7 = peg$parseelemCloseChar();
                                if (s7 !== peg$FAILED) {
                                    peg$savedPos = s0;
                                    s1 = peg$c88(s2, s4);
                                    s0 = s1;
                                } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsescriptOrStyleAttrs() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$currPos;
        s3 = [];
        s4 = peg$parsews();
        if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parsews();
            }
        } else {
            s3 = peg$FAILED;
        }
        if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parseelemAttr();
            while (s5 !== peg$FAILED) {
                s4.push(s5);
                s5 = peg$parseelemAttr();
            }
            if (s4 !== peg$FAILED) {
                peg$savedPos = s2;
                s3 = peg$c89(s4);
                s2 = s3;
            } else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
        } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
        }
        while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$currPos;
            s3 = [];
            s4 = peg$parsews();
            if (s4 !== peg$FAILED) {
                while (s4 !== peg$FAILED) {
                    s3.push(s4);
                    s4 = peg$parsews();
                }
            } else {
                s3 = peg$FAILED;
            }
            if (s3 !== peg$FAILED) {
                s4 = [];
                s5 = peg$parseelemAttr();
                while (s5 !== peg$FAILED) {
                    s4.push(s5);
                    s5 = peg$parseelemAttr();
                }
                if (s4 !== peg$FAILED) {
                    peg$savedPos = s2;
                    s3 = peg$c89(s4);
                    s2 = s3;
                } else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
            } else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c90(s1);
        }
        s0 = s1;
        return s0;
    }
    function peg$parsesingleTagElement() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseelemOpenChar();
        if (s1 !== peg$FAILED) {
            s2 = peg$parseelemTag();
            if (s2 !== peg$FAILED) {
                s3 = [];
                s4 = peg$parsews();
                while (s4 !== peg$FAILED) {
                    s3.push(s4);
                    s4 = peg$parsews();
                }
                if (s3 !== peg$FAILED) {
                    s4 = [];
                    s5 = peg$parseelemAttr();
                    while (s5 !== peg$FAILED) {
                        s4.push(s5);
                        s5 = peg$parseelemAttr();
                    }
                    if (s4 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 47) {
                            s5 = peg$c22;
                            peg$currPos++;
                        } else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c23);
                            }
                        }
                        if (s5 === peg$FAILED) {
                            s5 = null;
                        }
                        if (s5 !== peg$FAILED) {
                            s6 = [];
                            s7 = peg$parsews();
                            while (s7 !== peg$FAILED) {
                                s6.push(s7);
                                s7 = peg$parsews();
                            }
                            if (s6 !== peg$FAILED) {
                                s7 = peg$parseelemCloseChar();
                                if (s7 !== peg$FAILED) {
                                    peg$savedPos = s0;
                                    s1 = peg$c92(s2, s4);
                                    s0 = s1;
                                } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c91);
            }
        }
        return s0;
    }
    function peg$parsedoubleTagElement() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseelemOpenChar();
        if (s1 !== peg$FAILED) {
            s2 = peg$parseelemTag();
            if (s2 !== peg$FAILED) {
                s3 = [];
                s4 = peg$parsews();
                while (s4 !== peg$FAILED) {
                    s3.push(s4);
                    s4 = peg$parsews();
                }
                if (s3 !== peg$FAILED) {
                    s4 = [];
                    s5 = peg$parseelemAttr();
                    while (s5 !== peg$FAILED) {
                        s4.push(s5);
                        s5 = peg$parseelemAttr();
                    }
                    if (s4 !== peg$FAILED) {
                        s5 = [];
                        s6 = peg$parsews();
                        while (s6 !== peg$FAILED) {
                            s5.push(s6);
                            s6 = peg$parsews();
                        }
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parseelemCloseChar();
                            if (s6 !== peg$FAILED) {
                                s7 = peg$parseelemContents();
                                if (s7 !== peg$FAILED) {
                                    s8 = peg$parseelemClose();
                                    if (s8 !== peg$FAILED) {
                                        peg$savedPos = s0;
                                        s1 = peg$c94(s2, s4, s7);
                                        s0 = s1;
                                    } else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c93);
            }
        }
        return s0;
    }
    function peg$parseelemOpenChar() {
        var s0, s1;
        peg$silentFails++;
        if (input.charCodeAt(peg$currPos) === 60) {
            s0 = peg$c64;
            peg$currPos++;
        } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c65);
            }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c95);
            }
        }
        return s0;
    }
    function peg$parseelemCloseChar() {
        var s0, s1;
        peg$silentFails++;
        if (input.charCodeAt(peg$currPos) === 62) {
            s0 = peg$c75;
            peg$currPos++;
        } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c76);
            }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c96);
            }
        }
        return s0;
    }
    function peg$parseelemKey() {
        var s0, s1, s2;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parseelemKeyChar();
        if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
                s1.push(s2);
                s2 = peg$parseelemKeyChar();
            }
        } else {
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
        } else {
            s0 = s1;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c97);
            }
        }
        return s0;
    }
    function peg$parseelemKeyChar() {
        var s0, s1, s2, s3;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$currPos;
        peg$silentFails++;
        if (input.charCodeAt(peg$currPos) === 62) {
            s2 = peg$c75;
            peg$currPos++;
        } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c76);
            }
        }
        peg$silentFails--;
        if (s2 === peg$FAILED) {
            s1 = void 0;
        } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            s2 = [];
            if (peg$c99.test(input.charAt(peg$currPos))) {
                s3 = input.charAt(peg$currPos);
                peg$currPos++;
            } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c100);
                }
            }
            if (s3 !== peg$FAILED) {
                while (s3 !== peg$FAILED) {
                    s2.push(s3);
                    if (peg$c99.test(input.charAt(peg$currPos))) {
                        s3 = input.charAt(peg$currPos);
                        peg$currPos++;
                    } else {
                        s3 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c100);
                        }
                    }
                }
            } else {
                s2 = peg$FAILED;
            }
            if (s2 !== peg$FAILED) {
                s1 = [s1, s2];
                s0 = s1;
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c98);
            }
        }
        return s0;
    }
    function peg$parseelemTag() {
        var s0, s1;
        peg$silentFails++;
        s0 = peg$parseelemKey();
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c101);
            }
        }
        return s0;
    }
    function peg$parseelemAttr() {
        var s0, s1, s2, s3, s4, s5, s6;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseelemAttrKey();
        if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 61) {
                s3 = peg$c103;
                peg$currPos++;
            } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c104);
                }
            }
            if (s3 !== peg$FAILED) {
                s4 = peg$parseelemAttrValue();
                if (s4 !== peg$FAILED) {
                    s5 = [];
                    s6 = peg$parsews();
                    while (s6 !== peg$FAILED) {
                        s5.push(s6);
                        s6 = peg$parsews();
                    }
                    if (s5 !== peg$FAILED) {
                        peg$savedPos = s2;
                        s3 = peg$c105(s1, s4);
                        s2 = s3;
                    } else {
                        peg$currPos = s2;
                        s2 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
            } else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                s3 = [];
                s4 = peg$parsews();
                while (s4 !== peg$FAILED) {
                    s3.push(s4);
                    s4 = peg$parsews();
                }
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c106(s1, s2);
                    s0 = s1;
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c102);
            }
        }
        return s0;
    }
    function peg$parseelemAttrKey() {
        var s0, s1;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseelemKey();
        if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
        } else {
            s0 = s1;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c107);
            }
        }
        return s0;
    }
    function peg$parseelemAttrValue() {
        var s0, s1;
        peg$silentFails++;
        s0 = peg$parsestring();
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c108);
            }
        }
        return s0;
    }
    function peg$parseelemOpen() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = peg$parseelemOpenChar();
        if (s1 !== peg$FAILED) {
            s2 = peg$parseelemTag();
            if (s2 !== peg$FAILED) {
                s3 = [];
                s4 = peg$parsews();
                while (s4 !== peg$FAILED) {
                    s3.push(s4);
                    s4 = peg$parsews();
                }
                if (s3 !== peg$FAILED) {
                    s4 = [];
                    s5 = peg$parseelemAttr();
                    while (s5 !== peg$FAILED) {
                        s4.push(s5);
                        s5 = peg$parseelemAttr();
                    }
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parseelemCloseChar();
                        if (s5 !== peg$FAILED) {
                            s1 = [s1, s2, s3, s4, s5];
                            s0 = s1;
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseelemContents() {
        var s0, s1;
        s0 = [];
        s1 = peg$parseallGlobalTypes();
        while (s1 !== peg$FAILED) {
            s0.push(s1);
            s1 = peg$parseallGlobalTypes();
        }
        return s0;
    }
    function peg$parseelemClose() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = peg$parseelemOpenChar();
        if (s1 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 47) {
                s2 = peg$c22;
                peg$currPos++;
            } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c23);
                }
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parseelemTag();
                if (s3 !== peg$FAILED) {
                    s4 = [];
                    s5 = peg$parsews();
                    while (s5 !== peg$FAILED) {
                        s4.push(s5);
                        s5 = peg$parsews();
                    }
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parseelemCloseChar();
                        if (s5 !== peg$FAILED) {
                            s1 = [s1, s2, s3, s4, s5];
                            s0 = s1;
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseinvokeOpen() {
        var s0, s1;
        peg$silentFails++;
        if (input.substr(peg$currPos, 2) === peg$c110) {
            s0 = peg$c110;
            peg$currPos += 2;
        } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c111);
            }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c109);
            }
        }
        return s0;
    }
    function peg$parseinvokeClose() {
        var s0, s1;
        peg$silentFails++;
        if (input.substr(peg$currPos, 2) === peg$c113) {
            s0 = peg$c113;
            peg$currPos += 2;
        } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c114);
            }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c112);
            }
        }
        return s0;
    }
    function peg$parseinvokeName() {
        var s0, s1, s2;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parseinvokeNameChar();
        if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
                s1.push(s2);
                s2 = peg$parseinvokeNameChar();
            }
        } else {
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
        } else {
            s0 = s1;
        }
        return s0;
    }
    function peg$parsevariableOpen() {
        var s0, s1;
        peg$silentFails++;
        if (input.charCodeAt(peg$currPos) === 36) {
            s0 = peg$c116;
            peg$currPos++;
        } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c117);
            }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c115);
            }
        }
        return s0;
    }
    function peg$parsevariable() {
        var s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        s1 = peg$parsevariableOpen();
        if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            s3 = [];
            s4 = peg$parseinvokeNameChar();
            if (s4 !== peg$FAILED) {
                while (s4 !== peg$FAILED) {
                    s3.push(s4);
                    s4 = peg$parseinvokeNameChar();
                }
            } else {
                s3 = peg$FAILED;
            }
            if (s3 !== peg$FAILED) {
                s2 = input.substring(s2, peg$currPos);
            } else {
                s2 = s3;
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c118(s2);
                s0 = s1;
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsearg() {
        var s0, s1, s2, s3, s4, s5, s6;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseinvocation();
        if (s1 === peg$FAILED) {
            s1 = peg$parsestring();
            if (s1 === peg$FAILED) {
                s1 = peg$parsenumber();
                if (s1 === peg$FAILED) {
                    s1 = peg$parsevariable();
                    if (s1 === peg$FAILED) {
                        s1 = peg$parsebareString();
                    }
                }
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            s3 = [];
            s4 = peg$parsews();
            while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parsews();
            }
            if (s3 !== peg$FAILED) {
                s4 = peg$parsecomma();
                if (s4 !== peg$FAILED) {
                    s5 = [];
                    s6 = peg$parsews();
                    while (s6 !== peg$FAILED) {
                        s5.push(s6);
                        s6 = peg$parsews();
                    }
                    if (s5 !== peg$FAILED) {
                        s3 = [s3, s4, s5];
                        s2 = s3;
                    } else {
                        peg$currPos = s2;
                        s2 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
            } else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
            if (s2 === peg$FAILED) {
                s2 = [];
                s3 = peg$parsews();
                if (s3 !== peg$FAILED) {
                    while (s3 !== peg$FAILED) {
                        s2.push(s3);
                        s3 = peg$parsews();
                    }
                } else {
                    s2 = peg$FAILED;
                }
            }
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c120(s1);
                s0 = s1;
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c119);
            }
        }
        return s0;
    }
    function peg$parseinvocation() {
        var s0;
        s0 = peg$parsewithBodyInvocation();
        if (s0 === peg$FAILED) {
            s0 = peg$parsewithoutBodyInvocation();
        }
        return s0;
    }
    function peg$parsewithoutBodyInvocation() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = peg$parseinvokeOpen();
        if (s1 !== peg$FAILED) {
            s2 = peg$parseinvokeName();
            if (s2 !== peg$FAILED) {
                s3 = [];
                s4 = peg$parsews();
                while (s4 !== peg$FAILED) {
                    s3.push(s4);
                    s4 = peg$parsews();
                }
                if (s3 !== peg$FAILED) {
                    s4 = [];
                    s5 = peg$parsearg();
                    while (s5 !== peg$FAILED) {
                        s4.push(s5);
                        s5 = peg$parsearg();
                    }
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parseinvokeClose();
                        if (s5 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c121(s2, s4);
                            s0 = s1;
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsewithBodyInvocation() {
        var s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;
        s1 = peg$parsewithoutBodyInvocation();
        if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parseallGlobalTypes();
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                s3 = peg$parseallGlobalTypes();
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parseinvokeOpen();
                if (s3 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 47) {
                        s4 = peg$c22;
                        peg$currPos++;
                    } else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c23);
                        }
                    }
                    if (s4 === peg$FAILED) {
                        if (input.substr(peg$currPos, 3) === peg$c122) {
                            s4 = peg$c122;
                            peg$currPos += 3;
                        } else {
                            s4 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c123);
                            }
                        }
                    }
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parseinvokeName();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parseinvokeClose();
                            if (s6 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c124(s1, s2);
                                s0 = s1;
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsetext() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$currPos;
        peg$silentFails++;
        s5 = peg$parseinvokeOpen();
        if (s5 === peg$FAILED) {
            s5 = peg$parselinkOpen();
            if (s5 === peg$FAILED) {
                s5 = peg$currPos;
                s6 = peg$parseelemOpenChar();
                if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 47) {
                        s7 = peg$c22;
                        peg$currPos++;
                    } else {
                        s7 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c23);
                        }
                    }
                    if (s7 === peg$FAILED) {
                        s7 = peg$parseelemKeyChar();
                    }
                    if (s7 !== peg$FAILED) {
                        s6 = [s6, s7];
                        s5 = s6;
                    } else {
                        peg$currPos = s5;
                        s5 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s5;
                    s5 = peg$FAILED;
                }
                if (s5 === peg$FAILED) {
                    s5 = peg$parsevariableOpen();
                }
            }
        }
        peg$silentFails--;
        if (s5 === peg$FAILED) {
            s4 = void 0;
        } else {
            peg$currPos = s4;
            s4 = peg$FAILED;
        }
        if (s4 !== peg$FAILED) {
            s5 = peg$parseany();
            if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
            } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
            }
        } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
        }
        if (s3 !== peg$FAILED) {
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                s3 = peg$currPos;
                s4 = peg$currPos;
                peg$silentFails++;
                s5 = peg$parseinvokeOpen();
                if (s5 === peg$FAILED) {
                    s5 = peg$parselinkOpen();
                    if (s5 === peg$FAILED) {
                        s5 = peg$currPos;
                        s6 = peg$parseelemOpenChar();
                        if (s6 !== peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 47) {
                                s7 = peg$c22;
                                peg$currPos++;
                            } else {
                                s7 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c23);
                                }
                            }
                            if (s7 === peg$FAILED) {
                                s7 = peg$parseelemKeyChar();
                            }
                            if (s7 !== peg$FAILED) {
                                s6 = [s6, s7];
                                s5 = s6;
                            } else {
                                peg$currPos = s5;
                                s5 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s5;
                            s5 = peg$FAILED;
                        }
                        if (s5 === peg$FAILED) {
                            s5 = peg$parsevariableOpen();
                        }
                    }
                }
                peg$silentFails--;
                if (s5 === peg$FAILED) {
                    s4 = void 0;
                } else {
                    peg$currPos = s4;
                    s4 = peg$FAILED;
                }
                if (s4 !== peg$FAILED) {
                    s5 = peg$parseany();
                    if (s5 !== peg$FAILED) {
                        s4 = [s4, s5];
                        s3 = s4;
                    } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            }
        } else {
            s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
            s1 = input.substring(s1, peg$currPos);
        } else {
            s1 = s2;
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c125(s1);
        }
        s0 = s1;
        return s0;
    }
    peg$result = peg$startRuleFunction();
    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
        return peg$result;
    } else {
        if (peg$result !== peg$FAILED && peg$currPos < input.length) {
            peg$fail(peg$endExpectation());
        }
        throw peg$buildStructuredError(peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
    }
}
module.exports = {
    SyntaxError: peg$SyntaxError,
    parse: peg$parse
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _documentFactory = __webpack_require__(9);

var _documentFactory2 = _interopRequireDefault(_documentFactory);

var _DisplayUsageTask = __webpack_require__(40);

var _DisplayUsageTask2 = _interopRequireDefault(_DisplayUsageTask);

var _DocumentLike = __webpack_require__(3);

var _DocumentLike2 = _interopRequireDefault(_DocumentLike);

var _nodeFactory = __webpack_require__(15);

var _nodeFactory2 = _interopRequireDefault(_nodeFactory);

var _Linter = __webpack_require__(17);

var _Linter2 = _interopRequireDefault(_Linter);

var _linterFactory = __webpack_require__(44);

var _linterFactory2 = _interopRequireDefault(_linterFactory);

var _parserFactory = __webpack_require__(22);

var _parserFactory2 = _interopRequireDefault(_parserFactory);

var _VariableUsageTask = __webpack_require__(45);

var _VariableUsageTask2 = _interopRequireDefault(_VariableUsageTask);

var _SugarParser = __webpack_require__(23);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nwmatcher = __webpack_require__(14);
exports.default = {
    documentFactory: _documentFactory2.default,
    DocumentLike: _DocumentLike2.default,
    Linter: _Linter2.default,
    linterFactory: _linterFactory2.default,
    nodeFactory: _nodeFactory2.default,
    nwmatcher: nwmatcher,
    parserFactory: _parserFactory2.default,
    parsers: {
        SugarParser: { parse: _SugarParser.parse }
    },
    tasks: {
        DisplayUsageTask: _DisplayUsageTask2.default,
        VariableUsageTask: _VariableUsageTask2.default
    }
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractNodeLike = __webpack_require__(2);

var _AbstractNodeLike2 = _interopRequireDefault(_AbstractNodeLike);

var _AttributeLike = __webpack_require__(5);

var _AttributeLike2 = _interopRequireDefault(_AttributeLike);

var _CommentLike = __webpack_require__(26);

var _CommentLike2 = _interopRequireDefault(_CommentLike);

var _DocumentFragmentLike = __webpack_require__(28);

var _DocumentFragmentLike2 = _interopRequireDefault(_DocumentFragmentLike);

var _ElementLike = __webpack_require__(31);

var _ElementLike2 = _interopRequireDefault(_ElementLike);

var _isIDocumentFragmentLike = __webpack_require__(12);

var _isIDocumentFragmentLike2 = _interopRequireDefault(_isIDocumentFragmentLike);

var _isIDocumentTypeLike = __webpack_require__(7);

var _isIDocumentTypeLike2 = _interopRequireDefault(_isIDocumentTypeLike);

var _isIElementLike = __webpack_require__(0);

var _isIElementLike2 = _interopRequireDefault(_isIElementLike);

var _MParentNodeLike2 = __webpack_require__(8);

var _MParentNodeLike3 = _interopRequireDefault(_MParentNodeLike2);

var _ProcessingInstructionLike = __webpack_require__(35);

var _ProcessingInstructionLike2 = _interopRequireDefault(_ProcessingInstructionLike);

var _TextLike = __webpack_require__(13);

var _TextLike2 = _interopRequireDefault(_TextLike);

var _immutable = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var nwmatcher = __webpack_require__(14);

var AbstractDocumentLike = function (_MParentNodeLike) {
    _inherits(AbstractDocumentLike, _MParentNodeLike);

    function AbstractDocumentLike() {
        _classCallCheck(this, AbstractDocumentLike);

        var _this = _possibleConstructorReturn(this, (AbstractDocumentLike.__proto__ || Object.getPrototypeOf(AbstractDocumentLike)).call(this));

        _this.__head = null;
        _this.__childNodes = (0, _immutable.OrderedSet)([]);
        return _this;
    }

    _createClass(AbstractDocumentLike, [{
        key: 'getElementById',
        value: function getElementById(id) {
            if (!this.documentElement) {
                return null;
            }
            return this.__getMatcher().byId(id);
        }
    }, {
        key: 'getElementsByTagName',
        value: function getElementsByTagName(tagName) {
            if (!this.documentElement) {
                return [];
            }
            return this.__getMatcher().byTag(tagName);
        }
    }, {
        key: 'getElementsByClassName',
        value: function getElementsByClassName(className) {
            if (!this.documentElement) {
                return [];
            }
            return this.__getMatcher().byClass(className);
        }
    }, {
        key: 'getElementsByName',
        value: function getElementsByName(name) {
            if (!this.documentElement) {
                return [];
            }
            return this.__getMatcher().byName(name);
        }
    }, {
        key: 'createAttribute',
        value: function createAttribute(name) {
            return new _AttributeLike2.default(name);
        }
    }, {
        key: 'createElement',
        value: function createElement(tagName) {
            return new _ElementLike2.default(tagName, this);
        }
    }, {
        key: 'createTextNode',
        value: function createTextNode() {
            var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            return new _TextLike2.default(value, this);
        }
    }, {
        key: 'createComment',
        value: function createComment() {
            var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            return new _CommentLike2.default(text, this);
        }
    }, {
        key: 'createProcessingInstruction',
        value: function createProcessingInstruction() {
            var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

            return new _ProcessingInstructionLike2.default(target, data, this);
        }
    }, {
        key: 'createDocumentFragment',
        value: function createDocumentFragment() {
            return new _DocumentFragmentLike2.default(this);
        }
    }, {
        key: 'appendChild',
        value: function appendChild(child) {
            if ((0, _isIDocumentFragmentLike2.default)(child)) {
                this.append.apply(this, _toConsumableArray(child.childNodes));
                return child;
            }
            var count = this.__childNodes.count();
            if (child.ownerDocument !== this) {
                throw new Error('A child cannot be appended to a document it is not ' + 'owned by.');
            } else if (count === 1) {
                var firstChild = this.firstChild;
                if ((0, _isIDocumentTypeLike2.default)(firstChild)) {
                    if (!(0, _isIElementLike2.default)(child)) {
                        throw new Error('Documents can only contain a doctype and an ' + 'element node.');
                    }
                } else if ((0, _isIElementLike2.default)(firstChild)) {
                    throw new Error('Only one element can be contained in a document.');
                } else {
                    throw new Error('An unknown node type was found as a document child.');
                }
            } else if (count > 1) {
                throw new Error('A document can only contain two nodes.');
            }
            child.__setParentNode(this);
            var lastChild = this.lastChild;
            child.__setPreviousSibling(lastChild);
            if (lastChild) {
                lastChild.__setNextSibling(child);
            }
            this.__childNodes = this.__childNodes.add(child);
            if ((0, _isIElementLike2.default)(child)) {
                this.__children = this.__children.add(child);
            }
            return child;
        }
    }, {
        key: 'removeChild',
        value: function removeChild(child) {
            if (!this.__childNodes.contains(child)) {
                throw new Error('The child argument is not a child of the document.');
            }
            child.__setParentNode(null);
            var prev = child.previousSibling;
            var next = child.nextSibling;
            if (prev) {
                prev.__setNextSibling(next);
            }
            if (next) {
                next.__setPreviousSibling(prev);
            }
            this.__childNodes = this.__childNodes.remove(child);
            return child;
        }
    }, {
        key: 'insertBefore',
        value: function insertBefore(newChild, referenceNode) {
            if (newChild.ownerDocument !== this.ownerDocument) {
                throw new Error('A node must be adopted before it can be inserted ' + 'into a document.');
            } else if ((0, _isIDocumentTypeLike2.default)(this.firstChild)) {
                throw new Error('The document already has a doctype.');
            }
            referenceNode.__setPreviousSibling(newChild);
            var arr = [newChild];
            this.__childNodes = (0, _immutable.OrderedSet)(arr).union(this.__childNodes);
            return newChild;
        }
    }, {
        key: 'replaceChild',
        value: function replaceChild(oldChild, newChild) {
            if (newChild.ownerDocument !== this) {
                throw new Error('A node must be adopted before it can be inserted ' + 'into a document.');
            } else if (!this.__childNodes.contains(oldChild)) {
                throw new Error('The node to be replaced is not a child of this document.');
            }
            var oldType = void 0;
            if ((0, _isIDocumentTypeLike2.default)(oldChild)) {
                oldType = 'DocumentType';
            } else {
                oldType = 'Element';
            }
            var newType = void 0;
            if ((0, _isIDocumentTypeLike2.default)(newChild)) {
                newType = 'DocumentType';
            } else if ((0, _isIDocumentFragmentLike2.default)(newChild)) {
                if (oldType === 'DocumentType') {
                    throw new Error('A document type element cannot be replaced with a ' + 'non-document type node. As document fragments ' + 'cannot contain document type nodes, this usage is ' + 'forbidden.');
                }
                this.removeChild(oldChild);
                this.append.apply(this, _toConsumableArray(newChild.childNodes));
                return newChild;
            } else {
                newType = 'Element';
            }
            if (oldType !== newType) {
                if (oldType === 'DocumentType') {
                    throw new Error('A document type node cannot be replaced with an ' + 'element node.');
                } else {
                    throw new Error('An element node cannot be replaced with a document ' + 'type node.');
                }
            }
            var func = function func(node) {
                if (node === oldChild) {
                    var prev = node.previousSibling;
                    if (prev) {
                        prev.__setNextSibling(newChild);
                    }
                    var next = node.nextSibling;
                    if (next) {
                        next.__setPreviousSibling(newChild);
                    }
                    return newChild;
                } else {
                    return node;
                }
            };
            this.__childNodes = (0, _immutable.OrderedSet)(this.__childNodes.map(func));
            if (oldType === 'Element') {
                var _func = function _func(node) {
                    if (node === oldChild) {
                        return newChild;
                    } else {
                        return node;
                    }
                };
                this.__children = (0, _immutable.OrderedSet)(this.__children.map(_func));
            }
            return newChild;
        }
    }, {
        key: 'cloneNode',
        value: function cloneNode() {
            var deep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var ctor = this.constructor;
            var doc = new ctor();
            var childNodes = this.childNodes;
            if (deep) {
                childNodes.forEach(function (node) {
                    doc.appendChild(node.cloneNode(deep));
                });
            }
            return doc;
        }
    }, {
        key: 'adoptNode',
        value: function adoptNode(externalNode) {
            externalNode.__setDocument(this);
            return externalNode;
        }
    }, {
        key: 'importNode',
        value: function importNode(externalNode) {
            var deep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var imported = externalNode.cloneNode(deep);
            return this.adoptNode(imported);
        }
    }, {
        key: '__setParentNode',
        value: function __setParentNode(parent) {
            parent;
            throw new Error('Cannot set the parent node of a document.');
        }
    }, {
        key: '__setDocument',
        value: function __setDocument(document) {
            document;
            throw new Error('Cannot set the owner document of a document.');
        }
    }, {
        key: '__setPreviousSibling',
        value: function __setPreviousSibling(previousSibling) {
            previousSibling;
            throw new Error('A document cannot have siblings.');
        }
    }, {
        key: '__setNextSibling',
        value: function __setNextSibling(nextSibling) {
            nextSibling;
            throw new Error('A document cannot have siblings.');
        }
    }, {
        key: '__getMatcher',
        value: function __getMatcher() {
            if (!this.__matcher) {
                this.__matcher = new nwmatcher({ document: this });
            }
            return this.__matcher;
        }
    }, {
        key: '__setHead',
        value: function __setHead(head) {
            this.__head = head;
            return head;
        }
    }, {
        key: '__setBody',
        value: function __setBody(body) {
            this.__body = body;
            return body;
        }
    }]);

    return AbstractDocumentLike;
}((0, _MParentNodeLike3.default)(_AbstractNodeLike2.default));

exports.default = AbstractDocumentLike;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractCommentLike2 = __webpack_require__(27);

var _AbstractCommentLike3 = _interopRequireDefault(_AbstractCommentLike2);

var _isIElementLike = __webpack_require__(0);

var _isIElementLike2 = _interopRequireDefault(_isIElementLike);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CommentLike = function (_AbstractCommentLike) {
    _inherits(CommentLike, _AbstractCommentLike);

    function CommentLike() {
        _classCallCheck(this, CommentLike);

        return _possibleConstructorReturn(this, (CommentLike.__proto__ || Object.getPrototypeOf(CommentLike)).apply(this, arguments));
    }

    _createClass(CommentLike, [{
        key: 'nodeType',
        get: function get() {
            return 8;
        }
    }, {
        key: 'nodeName',
        get: function get() {
            return '#comment';
        }
    }, {
        key: 'data',
        get: function get() {
            return this.__data;
        },
        set: function set(data) {
            this.__data = data;
        }
    }, {
        key: 'textContent',
        get: function get() {
            return this.__data;
        },
        set: function set(textContent) {
            this.__data = textContent;
        }
    }, {
        key: 'nodeValue',
        get: function get() {
            return this.__data;
        },
        set: function set(value) {
            this.__data = value;
        }
    }, {
        key: 'length',
        get: function get() {
            return this.__data.length;
        }
    }, {
        key: 'ownerDocument',
        get: function get() {
            return this.__ownerDocument;
        }
    }, {
        key: 'parentNode',
        get: function get() {
            return this.__parentNode;
        }
    }, {
        key: 'parentElement',
        get: function get() {
            return this.__parentNode;
        }
    }, {
        key: 'previousSibling',
        get: function get() {
            return this.__previousSibling;
        }
    }, {
        key: 'nextSibling',
        get: function get() {
            return this.__nextSibling;
        }
    }, {
        key: 'previousElementSibling',
        get: function get() {
            if (!this.__parentNode) {
                return null;
            }
            var node = this.previousSibling;
            var counter = 0;
            var length = this.__parentNode.childNodes.length;
            while (node) {
                if (counter > length) {
                    throw new Error('Possible infinite loop detected. A previousSibling ' + 'property may be misset.');
                }
                if ((0, _isIElementLike2.default)(node)) {
                    return node;
                }
                node = node.previousSibling;
                counter += 1;
            }
            return null;
        }
    }, {
        key: 'nextElementSibling',
        get: function get() {
            if (!this.__parentNode) {
                return null;
            }
            var node = this.nextSibling;
            var counter = 0;
            var length = this.__parentNode.childNodes.length;
            while (node) {
                if (counter > length) {
                    throw new Error('Possible infinite loop detected. A previousSibling ' + 'property may be misset.');
                }
                if ((0, _isIElementLike2.default)(node)) {
                    return node;
                }
                node = node.nextSibling;
                counter += 1;
            }
            return null;
        }
    }, {
        key: 'childNodes',
        get: function get() {
            return [];
        }
    }, {
        key: 'firstChild',
        get: function get() {
            return null;
        }
    }, {
        key: 'lastChild',
        get: function get() {
            return null;
        }
    }]);

    return CommentLike;
}(_AbstractCommentLike3.default);

exports.default = CommentLike;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractCharacterDataLike = __webpack_require__(6);

var _AbstractCharacterDataLike2 = _interopRequireDefault(_AbstractCharacterDataLike);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractCommentLike = function (_AbstractCharacterDat) {
    _inherits(AbstractCommentLike, _AbstractCharacterDat);

    function AbstractCommentLike() {
        _classCallCheck(this, AbstractCommentLike);

        return _possibleConstructorReturn(this, (AbstractCommentLike.__proto__ || Object.getPrototypeOf(AbstractCommentLike)).apply(this, arguments));
    }

    _createClass(AbstractCommentLike, [{
        key: 'normalize',
        value: function normalize() {
            return;
        }
    }, {
        key: 'cloneNode',
        value: function cloneNode() {
            var deep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            deep;
            var ctor = this.constructor;
            var comment = new ctor(this.__data);
            return comment;
        }
    }]);

    return AbstractCommentLike;
}(_AbstractCharacterDataLike2.default);

exports.default = AbstractCommentLike;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractDocumentFragmentLike = __webpack_require__(29);

var _AbstractDocumentFragmentLike2 = _interopRequireDefault(_AbstractDocumentFragmentLike);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DocumentFragmentLike = function (_AbstractDocumentFrag) {
    _inherits(DocumentFragmentLike, _AbstractDocumentFrag);

    function DocumentFragmentLike() {
        _classCallCheck(this, DocumentFragmentLike);

        return _possibleConstructorReturn(this, (DocumentFragmentLike.__proto__ || Object.getPrototypeOf(DocumentFragmentLike)).apply(this, arguments));
    }

    _createClass(DocumentFragmentLike, [{
        key: 'nodeType',
        get: function get() {
            return 11;
        }
    }, {
        key: 'nodeName',
        get: function get() {
            return '#document-fragment';
        }
    }, {
        key: 'nodeValue',
        get: function get() {
            return null;
        }
    }, {
        key: 'textContent',
        get: function get() {
            return null;
        }
    }, {
        key: 'ownerDocument',
        get: function get() {
            return this.__ownerDocument;
        }
    }, {
        key: 'parentNode',
        get: function get() {
            return null;
        }
    }, {
        key: 'parentElement',
        get: function get() {
            return null;
        }
    }, {
        key: 'previousSibling',
        get: function get() {
            return null;
        }
    }, {
        key: 'nextSibling',
        get: function get() {
            return null;
        }
    }, {
        key: 'childNodes',
        get: function get() {
            return this.__childNodes.toArray();
        }
    }, {
        key: 'childElementCount',
        get: function get() {
            return this.__childNodes.count();
        }
    }, {
        key: 'children',
        get: function get() {
            return this.__children.toArray();
        }
    }, {
        key: 'firstChild',
        get: function get() {
            return this.__childNodes.first() || null;
        }
    }, {
        key: 'lastChild',
        get: function get() {
            return this.__childNodes.last() || null;
        }
    }, {
        key: 'firstElementChild',
        get: function get() {
            return this.__children.first() || null;
        }
    }, {
        key: 'lastElementChild',
        get: function get() {
            return this.__children.last() || null;
        }
    }]);

    return DocumentFragmentLike;
}(_AbstractDocumentFragmentLike2.default);

exports.default = DocumentFragmentLike;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractNodeLike = __webpack_require__(2);

var _AbstractNodeLike2 = _interopRequireDefault(_AbstractNodeLike);

var _isIDocumentTypeLike = __webpack_require__(7);

var _isIDocumentTypeLike2 = _interopRequireDefault(_isIDocumentTypeLike);

var _isIElementLike = __webpack_require__(0);

var _isIElementLike2 = _interopRequireDefault(_isIElementLike);

var _MParentNodeLike2 = __webpack_require__(8);

var _MParentNodeLike3 = _interopRequireDefault(_MParentNodeLike2);

var _immutable = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractDocumentFragmentLike = function (_MParentNodeLike) {
    _inherits(AbstractDocumentFragmentLike, _MParentNodeLike);

    function AbstractDocumentFragmentLike(document) {
        _classCallCheck(this, AbstractDocumentFragmentLike);

        var _this = _possibleConstructorReturn(this, (AbstractDocumentFragmentLike.__proto__ || Object.getPrototypeOf(AbstractDocumentFragmentLike)).call(this));

        _this.__childNodes = (0, _immutable.OrderedSet)([]);
        _this.__setDocument(document);
        return _this;
    }

    _createClass(AbstractDocumentFragmentLike, [{
        key: 'getElementById',
        value: function getElementById(id) {
            return this.__getMatcher().byId(id);
        }
    }, {
        key: 'getElementsByTagName',
        value: function getElementsByTagName(tagName) {
            return this.__getMatcher().byTag(tagName);
        }
    }, {
        key: 'getElementsByClassName',
        value: function getElementsByClassName(className) {
            return this.__getMatcher().byClass(className);
        }
    }, {
        key: 'getElementsByName',
        value: function getElementsByName(name) {
            return this.__getMatcher().byName(name);
        }
    }, {
        key: 'appendChild',
        value: function appendChild(child) {
            var count = this.__childNodes.count();
            if (child.ownerDocument !== this.ownerDocument) {
                throw new Error('A node cannot be appended to a parent node if the ' + 'parent is not owned by the same document as the ' + 'child.');
            } else if (count === 1) {
                var firstChild = this.firstChild;
                if ((0, _isIDocumentTypeLike2.default)(firstChild)) {
                    if (!(0, _isIElementLike2.default)(child)) {
                        throw new Error('Documents can only contain a doctype and an ' + 'element node.');
                    }
                } else if ((0, _isIElementLike2.default)(firstChild)) {
                    throw new Error('Only one element can be contained in a document.');
                } else {
                    throw new Error('An unknown node type was found as a document child.');
                }
            } else if (count > 1) {
                throw new Error('A document can only contain two nodes.');
            }
            child.__setParentNode(this);
            var lastChild = this.lastChild;
            child.__setPreviousSibling(lastChild);
            if (lastChild) {
                lastChild.__setNextSibling(child);
            }
            this.__childNodes = this.__childNodes.add(child);
            if ((0, _isIElementLike2.default)(child)) {
                this.__children = this.__children.add(child);
            }
            return child;
        }
    }, {
        key: 'removeChild',
        value: function removeChild(child) {
            if (!this.__childNodes.contains(child)) {
                throw new Error('The child argument is not a child of the document.');
            }
            child.__setParentNode(null);
            var prev = child.previousSibling;
            var next = child.nextSibling;
            if (prev) {
                prev.__setNextSibling(next);
            }
            if (next) {
                next.__setPreviousSibling(prev);
            }
            this.__childNodes = this.__childNodes.remove(child);
            return child;
        }
    }, {
        key: 'insertBefore',
        value: function insertBefore(newChild, referenceNode) {
            if (newChild.ownerDocument !== this.ownerDocument) {
                throw new Error('A node cannot be inserted into a document it is not ' + 'owned by.');
            }
            var childNodes = this.__childNodes.toIndexedSeq();
            var refIndex = childNodes.indexOf(referenceNode);
            if (refIndex === -1) {
                throw new Error('The reference node was not a child of this node.');
            }
            newChild.__setParentNode(this);
            var prev = referenceNode.previousSibling;
            if (prev) {
                prev.__setNextSibling(newChild);
            }
            referenceNode.__setPreviousSibling(newChild);
            var before = childNodes.slice(0, refIndex);
            var after = childNodes.slice(refIndex);
            this.__childNodes = (0, _immutable.OrderedSet)(before.concat([newChild]).concat(after));
            if ((0, _isIElementLike2.default)(newChild)) {
                var func = function func(node) {
                    if ((0, _isIElementLike2.default)(node)) {
                        return node;
                    } else {
                        return null;
                    }
                };
                var children = this.__childNodes.map(func).filter(function (aa) {
                    return Boolean(aa);
                });
                this.__children = (0, _immutable.OrderedSet)(children);
            }
            return newChild;
        }
    }, {
        key: 'replaceChild',
        value: function replaceChild(oldChild, newChild) {
            if (newChild.ownerDocument !== this.ownerDocument) {
                throw new Error('A node must be adopted before it can be inserted ' + 'into a document.');
            } else if (!this.__childNodes.contains(oldChild)) {
                throw new Error('The reference node is not a child of the parent node.');
            }
            var oldType = void 0;
            if ((0, _isIDocumentTypeLike2.default)(oldChild)) {
                oldType = 'DocumentType';
            } else {
                oldType = 'Element';
            }
            var newType = void 0;
            if ((0, _isIDocumentTypeLike2.default)(newChild)) {
                newType = 'DocumentType';
            } else {
                newType = 'Element';
            }
            if (oldType !== newType) {
                if (oldType === 'DocumentType') {
                    throw new Error('A document type node cannot be replaced with an ' + 'element node.');
                    ;
                } else {
                    throw new Error('An element node cannot be replaced with a document ' + 'type node.');
                }
            }
            var func = function func(node) {
                if (node === oldChild) {
                    var prev = node.previousSibling;
                    if (prev) {
                        prev.__setNextSibling(newChild);
                    }
                    var next = node.nextSibling;
                    if (next) {
                        next.__setPreviousSibling(newChild);
                    }
                    return newChild;
                } else {
                    return node;
                }
            };
            this.__childNodes = (0, _immutable.OrderedSet)(this.__childNodes.map(func));
            if ((0, _isIElementLike2.default)(oldChild) || (0, _isIElementLike2.default)(newChild)) {
                var elements = this.__childNodes.filter(function (node) {
                    return (0, _isIElementLike2.default)(node);
                });
                this.__children = (0, _immutable.OrderedSet)(elements);
            }
            return newChild;
        }
    }, {
        key: 'cloneNode',
        value: function cloneNode() {
            var deep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var ctor = this.constructor;
            var doc = new ctor(this.ownerDocument);
            var childNodes = this.__childNodes;
            if (deep) {
                childNodes.forEach(function (node) {
                    doc.appendChild(node.cloneNode(deep));
                });
            }
            return doc;
        }
    }, {
        key: '__setParentNode',
        value: function __setParentNode() {
            throw new Error('Cannot set the parent node of a document fragment.');
        }
    }, {
        key: '__setDocument',
        value: function __setDocument(document) {
            this.__ownerDocument = document;
            return document;
        }
    }, {
        key: '__setPreviousSibling',
        value: function __setPreviousSibling() {
            throw new Error('A document fragment cannot have siblings.');
        }
    }, {
        key: '__setNextSibling',
        value: function __setNextSibling() {
            throw new Error('A document fragment cannot have siblings.');
        }
    }]);

    return AbstractDocumentFragmentLike;
}((0, _MParentNodeLike3.default)(_AbstractNodeLike2.default));

exports.default = AbstractDocumentFragmentLike;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function isIParentNodeLike(node) {
    return node && node.children && _typeof(node.children) === 'object' && node.children.length >= 0;
}
exports.default = isIParentNodeLike;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractElementLike2 = __webpack_require__(32);

var _AbstractElementLike3 = _interopRequireDefault(_AbstractElementLike2);

var _AttributeLike = __webpack_require__(5);

var _AttributeLike2 = _interopRequireDefault(_AttributeLike);

var _isIElementLike = __webpack_require__(0);

var _isIElementLike2 = _interopRequireDefault(_isIElementLike);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ElementLike = function (_AbstractElementLike) {
    _inherits(ElementLike, _AbstractElementLike);

    function ElementLike() {
        _classCallCheck(this, ElementLike);

        var _this = _possibleConstructorReturn(this, (ElementLike.__proto__ || Object.getPrototypeOf(ElementLike)).apply(this, arguments));

        _this.nodeType = 1;
        return _this;
    }

    _createClass(ElementLike, [{
        key: 'nodeName',
        get: function get() {
            return this.tagName;
        }
    }, {
        key: 'nodeValue',
        get: function get() {
            return null;
        }
    }, {
        key: 'textContent',
        get: function get() {
            return this.childNodes.reduce(function (str, node) {
                return str + (node.textContent || '');
            }, '');
        },
        set: function set(content) {
            var _this2 = this;

            this.childNodes.forEach(function (node) {
                _this2.removeChild(node);
            });
            var textNode = this.ownerDocument.createTextNode(content);
            this.__childNodes = this.__childNodes.add(textNode);
            textNode.__setParentNode(this);
        }
    }, {
        key: 'attributes',
        get: function get() {
            return this.__attributes.toObject();
        }
    }, {
        key: 'id',
        get: function get() {
            var attr = this.__attributes.get('id');
            if (attr) {
                return attr.value;
            } else {
                return '';
            }
        },
        set: function set(value) {
            var name = 'id';
            this.__attributes.set(name, new _AttributeLike2.default(name, value));
        }
    }, {
        key: 'className',
        get: function get() {
            var attr = this.__attributes.get('class');
            if (attr) {
                return attr.value;
            } else {
                return '';
            }
        },
        set: function set(value) {
            var name = 'class';
            this.__attributes.set(name, new _AttributeLike2.default(name, value));
        }
    }, {
        key: 'classList',
        get: function get() {
            return this.__classList;
        }
    }, {
        key: 'ownerDocument',
        get: function get() {
            return this.__ownerDocument;
        }
    }, {
        key: 'parentNode',
        get: function get() {
            return this.__parentNode;
        }
    }, {
        key: 'parentElement',
        get: function get() {
            if ((0, _isIElementLike2.default)(this.__parentNode)) {
                return this.__parentNode;
            }
            return null;
        }
    }, {
        key: 'previousSibling',
        get: function get() {
            return this.__previousSibling;
        }
    }, {
        key: 'nextSibling',
        get: function get() {
            return this.__nextSibling;
        }
    }, {
        key: 'previousElementSibling',
        get: function get() {
            if (!this.__parentNode) {
                return null;
            }
            var node = this.previousSibling;
            var counter = 0;
            var length = this.__parentNode.childNodes.length;
            while (node) {
                if (counter > length) {
                    throw new Error('Possible infinite loop detected. A previousSibling ' + 'property may be misset.');
                }
                if ((0, _isIElementLike2.default)(node)) {
                    return node;
                }
                node = node.previousSibling;
                counter += 1;
            }
            return null;
        }
    }, {
        key: 'nextElementSibling',
        get: function get() {
            if (!this.__parentNode) {
                return null;
            }
            var node = this.nextSibling;
            var counter = 0;
            var length = this.__parentNode.childNodes.length;
            while (node) {
                if (counter > length) {
                    throw new Error('Possible infinite loop detected. A previousSibling ' + 'property may be misset.');
                }
                if ((0, _isIElementLike2.default)(node)) {
                    return node;
                }
                node = node.nextSibling;
                counter += 1;
            }
            return null;
        }
    }, {
        key: 'childNodes',
        get: function get() {
            return this.__childNodes.toArray();
        }
    }, {
        key: 'firstChild',
        get: function get() {
            return this.__childNodes.first() || null;
        }
    }, {
        key: 'lastChild',
        get: function get() {
            return this.__childNodes.last() || null;
        }
    }, {
        key: 'children',
        get: function get() {
            return this.__children.toArray();
        }
    }, {
        key: 'firstElementChild',
        get: function get() {
            return this.__children.first() || null;
        }
    }, {
        key: 'lastElementChild',
        get: function get() {
            return this.__children.last() || null;
        }
    }, {
        key: 'childElementCount',
        get: function get() {
            return this.children.length;
        }
    }]);

    return ElementLike;
}(_AbstractElementLike3.default);

exports.default = ElementLike;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractNodeLike = __webpack_require__(2);

var _AbstractNodeLike2 = _interopRequireDefault(_AbstractNodeLike);

var _AttributeLike = __webpack_require__(5);

var _AttributeLike2 = _interopRequireDefault(_AttributeLike);

var _ClassListLike = __webpack_require__(33);

var _ClassListLike2 = _interopRequireDefault(_ClassListLike);

var _isIDocumentFragmentLike = __webpack_require__(12);

var _isIDocumentFragmentLike2 = _interopRequireDefault(_isIDocumentFragmentLike);

var _isIElementLike = __webpack_require__(0);

var _isIElementLike2 = _interopRequireDefault(_isIElementLike);

var _isITextLike = __webpack_require__(34);

var _isITextLike2 = _interopRequireDefault(_isITextLike);

var _MChildNodeLike = __webpack_require__(11);

var _MChildNodeLike2 = _interopRequireDefault(_MChildNodeLike);

var _MParentNodeLike2 = __webpack_require__(8);

var _MParentNodeLike3 = _interopRequireDefault(_MParentNodeLike2);

var _immutable = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractElementLike = function (_MParentNodeLike) {
    _inherits(AbstractElementLike, _MParentNodeLike);

    function AbstractElementLike(tagName, document) {
        _classCallCheck(this, AbstractElementLike);

        var _this = _possibleConstructorReturn(this, (AbstractElementLike.__proto__ || Object.getPrototypeOf(AbstractElementLike)).call(this));

        _this.__attributes = (0, _immutable.Map)([]);
        _this.__classList = new _ClassListLike2.default(_this);
        _this.__childNodes = (0, _immutable.OrderedSet)([]);
        if (!tagName) {
            throw new Error('Empty tag name.');
        }
        _this.tagName = tagName;
        _this.__ownerDocument = document;
        return _this;
    }

    _createClass(AbstractElementLike, [{
        key: 'hasAttribute',
        value: function hasAttribute(name) {
            return this.__attributes.has(name);
        }
    }, {
        key: 'getAttribute',
        value: function getAttribute(name) {
            var attr = this.__attributes.get(name);
            if (attr) {
                return attr.value;
            } else {
                return null;
            }
        }
    }, {
        key: 'setAttribute',
        value: function setAttribute(name, value) {
            var attribute = new _AttributeLike2.default(name, value);
            this.__attributes = this.__attributes.set(name, attribute);
            if (name === 'class') {
                this.__classList.__pullFromParent();
            }
        }
    }, {
        key: 'removeAttribute',
        value: function removeAttribute(name) {
            this.__attributes = this.__attributes.remove(name);
            if (name === 'class') {
                this.__classList.__pullFromParent();
            }
        }
    }, {
        key: 'appendChild',
        value: function appendChild(child) {
            if (child.ownerDocument !== this.ownerDocument) {
                throw new Error('A node cannot be appended to an element owned by a ' + 'different document than it.');
            }
            if ((0, _isIDocumentFragmentLike2.default)(child)) {
                this.append.apply(this, _toConsumableArray(child.childNodes));
                return child;
            }
            var oldParent = child.parentNode;
            if (oldParent) {
                oldParent.removeChild(child);
            }
            child.__setParentNode(this);
            var last = this.lastChild;
            if (last) {
                last.__setNextSibling(child);
                child.__setPreviousSibling(last);
            }
            this.__childNodes = this.__childNodes.add(child);
            if ((0, _isIElementLike2.default)(child)) {
                this.__children = this.__children.add(child);
            }
            return child;
        }
    }, {
        key: 'removeChild',
        value: function removeChild(child) {
            if (!this.__childNodes.contains(child)) {
                throw new Error('The provided child was not a child of this ' + 'element.');
            }
            if ((0, _isIElementLike2.default)(child)) {
                this.__children = this.__children.remove(child);
            }
            this.__childNodes = this.__childNodes.remove(child);
            child.__setParentNode(null);
            var prev = child.previousSibling;
            var next = child.nextSibling;
            if (prev) {
                prev.__setNextSibling(next);
            }
            if (next) {
                next.__setPreviousSibling(prev);
            }
            child.__setPreviousSibling(null);
            child.__setNextSibling(null);
            return child;
        }
    }, {
        key: 'insertBefore',
        value: function insertBefore(newChild, referenceNode) {
            if (newChild.ownerDocument !== this.ownerDocument) {
                throw new Error('A node cannot be inserted into a document it is not ' + 'owned by.');
            }
            var childNodes = this.__childNodes.toIndexedSeq();
            var refIndex = childNodes.indexOf(referenceNode);
            if (refIndex === -1) {
                throw new Error('The reference node was not a child of this node.');
            }
            newChild.__setParentNode(this);
            var prev = referenceNode.previousSibling;
            if (prev) {
                prev.__setNextSibling(newChild);
            }
            referenceNode.__setPreviousSibling(newChild);
            var before = childNodes.slice(0, refIndex);
            var after = childNodes.slice(refIndex);
            this.__childNodes = (0, _immutable.OrderedSet)(before.concat([newChild]).concat(after));
            if ((0, _isIElementLike2.default)(newChild)) {
                var func = function func(node) {
                    if ((0, _isIElementLike2.default)(node)) {
                        return node;
                    } else {
                        return null;
                    }
                };
                var children = this.__childNodes.map(func).filter(function (aa) {
                    return Boolean(aa);
                });
                this.__children = (0, _immutable.OrderedSet)(children);
            }
            return newChild;
        }
    }, {
        key: 'replaceChild',
        value: function replaceChild(oldChild, newChild) {
            var _this2 = this;

            if (!this.__childNodes.has(oldChild)) {
                throw new Error('The child to be replaced was not inside of the ' + 'parent on which replaceChild was called.');
            } else if (newChild.ownerDocument !== this.ownerDocument) {
                throw new Error('A document cannot append a child not owned by it ' + 'without adopting the node first.');
            }
            var iterable = this.__childNodes.map(function (node) {
                if (node === oldChild) {
                    newChild.__setParentNode(_this2);
                    var prev = oldChild.previousSibling;
                    if (prev) {
                        prev.__setNextSibling(newChild);
                    }
                    var next = oldChild.nextSibling;
                    if (next) {
                        next.__setPreviousSibling(newChild);
                    }
                    node.__setParentNode(null);
                    node.__setPreviousSibling(null);
                    node.__setNextSibling(null);
                    return newChild;
                } else {
                    return node;
                }
            });
            this.__childNodes = (0, _immutable.OrderedSet)(iterable);
            if ((0, _isIElementLike2.default)(oldChild) || (0, _isIElementLike2.default)(newChild)) {
                var func = function func(node) {
                    if ((0, _isIElementLike2.default)(node)) {
                        return node;
                    } else {
                        return null;
                    }
                };
                var children = this.__childNodes.map(func).filter(function (aa) {
                    return Boolean(aa);
                });
                this.__children = (0, _immutable.OrderedSet)(children);
            }
            newChild.__setParentNode(this);
            return newChild;
        }
    }, {
        key: 'cloneNode',
        value: function cloneNode() {
            var deep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var ctor = this.constructor;
            var elem = new ctor(this.tagName, this.ownerDocument);
            var childNodes = this.childNodes;
            if (deep) {
                childNodes.forEach(function (node) {
                    elem.appendChild(node.cloneNode(deep));
                });
            }
            return elem;
        }
    }, {
        key: 'normalize',
        value: function normalize() {
            var _this3 = this;

            var buffer = '';
            var lastSeenText = null;
            this.childNodes.forEach(function (node) {
                if ((0, _isITextLike2.default)(node)) {
                    if (!lastSeenText) {
                        lastSeenText = node;
                    }
                    buffer += node.data;
                    var replaced = false;
                    if (!(0, _isITextLike2.default)(node.nextSibling)) {
                        if (buffer) {
                            lastSeenText.data = buffer;
                            buffer = '';
                            lastSeenText = null;
                            replaced = true;
                        }
                    }
                    if (!replaced) {
                        _this3.removeChild(node);
                    }
                }
                node.normalize();
            });
        }
    }]);

    return AbstractElementLike;
}((0, _MParentNodeLike3.default)((0, _MChildNodeLike2.default)(_AbstractNodeLike2.default)));

exports.default = AbstractElementLike;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ClassListLike = function () {
    _createClass(ClassListLike, [{
        key: 'length',
        get: function get() {
            return this.classes.count();
        }
    }, {
        key: 'value',
        get: function get() {
            return this.classes.join(' ');
        }
    }]);

    function ClassListLike(element) {
        _classCallCheck(this, ClassListLike);

        this.element = element;
        this.__pullFromParent();
    }

    _createClass(ClassListLike, [{
        key: 'add',
        value: function add() {
            var _this = this;

            for (var _len = arguments.length, classes = Array(_len), _key = 0; _key < _len; _key++) {
                classes[_key] = arguments[_key];
            }

            var updated = false;
            classes.forEach(function (cls) {
                if (classes.indexOf(cls) === -1) {
                    _this.classes = _this.classes.push(cls);
                    updated = true;
                }
            });
            if (updated) {
                this.__pushToParent();
            }
        }
    }, {
        key: 'remove',
        value: function remove() {
            var _this2 = this;

            var updated = false;

            for (var _len2 = arguments.length, classes = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                classes[_key2] = arguments[_key2];
            }

            classes.forEach(function (cls) {
                var index = _this2.classes.indexOf(cls);
                if (index !== -1) {
                    _this2.classes = _this2.classes.delete(index);
                    updated = true;
                }
            });
            if (updated) {
                this.__pushToParent();
            }
        }
    }, {
        key: 'item',
        value: function item(index) {
            return this.classes.get(index) || '';
        }
    }, {
        key: 'toggle',
        value: function toggle() {
            var _this3 = this;

            for (var _len3 = arguments.length, classes = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                classes[_key3] = arguments[_key3];
            }

            classes.forEach(function (cls) {
                var index = _this3.classes.indexOf(cls);
                if (index === -1) {
                    _this3.classes = _this3.classes.delete(index);
                } else {
                    _this3.classes = _this3.classes.push(cls);
                }
            });
            this.__pushToParent();
        }
    }, {
        key: 'replace',
        value: function replace(oldClass, newClass) {
            var index = this.classes.indexOf(oldClass);
            if (index !== -1) {
                this.classes = this.classes.set(index, newClass);
                this.__pushToParent();
            }
        }
    }, {
        key: 'contains',
        value: function contains(cls) {
            return this.classes.indexOf(cls) !== -1;
        }
    }, {
        key: '__pushToParent',
        value: function __pushToParent() {
            this.element.setAttribute('class', this.value);
        }
    }, {
        key: '__pullFromParent',
        value: function __pullFromParent() {
            var classes = this.element.className.split(' ').filter(function (cls) {
                return cls.length > 0;
            });
            this.classes = (0, _immutable.List)(classes);
        }
    }]);

    return ClassListLike;
}();

exports.default = ClassListLike;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function isITextLike(node) {
    return node && node.nodeType === 3;
}
exports.default = isITextLike;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractProcessingInstructionLike = __webpack_require__(36);

var _AbstractProcessingInstructionLike2 = _interopRequireDefault(_AbstractProcessingInstructionLike);

var _isIElementLike = __webpack_require__(0);

var _isIElementLike2 = _interopRequireDefault(_isIElementLike);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProcessingInstructionLike = function (_AbstractProcessingIn) {
    _inherits(ProcessingInstructionLike, _AbstractProcessingIn);

    function ProcessingInstructionLike() {
        _classCallCheck(this, ProcessingInstructionLike);

        return _possibleConstructorReturn(this, (ProcessingInstructionLike.__proto__ || Object.getPrototypeOf(ProcessingInstructionLike)).apply(this, arguments));
    }

    _createClass(ProcessingInstructionLike, [{
        key: 'nodeType',
        get: function get() {
            return 7;
        }
    }, {
        key: 'nodeName',
        get: function get() {
            return this.__target;
        }
    }, {
        key: 'target',
        get: function get() {
            return this.__target;
        },
        set: function set(target) {
            this.__target = target;
        }
    }, {
        key: 'data',
        get: function get() {
            return this.__data;
        },
        set: function set(data) {
            this.__data = data;
        }
    }, {
        key: 'textContent',
        get: function get() {
            return this.__data;
        },
        set: function set(textContent) {
            this.__data = textContent;
        }
    }, {
        key: 'nodeValue',
        get: function get() {
            return this.__data;
        },
        set: function set(value) {
            this.__data = value;
        }
    }, {
        key: 'length',
        get: function get() {
            return this.__data.length;
        }
    }, {
        key: 'ownerDocument',
        get: function get() {
            return this.__ownerDocument;
        }
    }, {
        key: 'parentElement',
        get: function get() {
            return this.__parentNode;
        }
    }, {
        key: 'parentNode',
        get: function get() {
            return this.__parentNode;
        }
    }, {
        key: 'previousSibling',
        get: function get() {
            return this.__previousSibling;
        }
    }, {
        key: 'nextSibling',
        get: function get() {
            return this.__nextSibling;
        }
    }, {
        key: 'previousElementSibling',
        get: function get() {
            if (!this.__parentNode) {
                return null;
            }
            var node = this.__previousSibling;
            var counter = 0;
            var length = this.__parentNode.childNodes.length;
            while (node) {
                if (counter > length) {
                    throw new Error('Possible infinite loop detected. A previousSibling ' + 'property may be misset.');
                }
                if ((0, _isIElementLike2.default)(node)) {
                    return node;
                }
                node = node.previousSibling;
                counter += 1;
            }
            return null;
        }
    }, {
        key: 'nextElementSibling',
        get: function get() {
            if (!this.__parentNode) {
                return null;
            }
            var node = this.nextSibling;
            var counter = 0;
            var length = this.__parentNode.childNodes.length;
            while (node) {
                if (counter > length) {
                    throw new Error('Possible infinite loop detected. A nextSibling ' + 'property may be misset.');
                }
                if ((0, _isIElementLike2.default)(node)) {
                    return node;
                }
                node = node.nextSibling;
                counter += 1;
            }
            return null;
        }
    }, {
        key: 'childNodes',
        get: function get() {
            return [];
        }
    }, {
        key: 'firstChild',
        get: function get() {
            return null;
        }
    }, {
        key: 'lastChild',
        get: function get() {
            return null;
        }
    }]);

    return ProcessingInstructionLike;
}(_AbstractProcessingInstructionLike2.default);

exports.default = ProcessingInstructionLike;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractCharacterDataLike = __webpack_require__(6);

var _AbstractCharacterDataLike2 = _interopRequireDefault(_AbstractCharacterDataLike);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractProcessingInstructionLike = function (_AbstractCharacterDat) {
    _inherits(AbstractProcessingInstructionLike, _AbstractCharacterDat);

    function AbstractProcessingInstructionLike(target, data, document) {
        _classCallCheck(this, AbstractProcessingInstructionLike);

        var _this = _possibleConstructorReturn(this, (AbstractProcessingInstructionLike.__proto__ || Object.getPrototypeOf(AbstractProcessingInstructionLike)).call(this, data, document));

        _this.__target = '';
        _this.__target = target;
        return _this;
    }

    _createClass(AbstractProcessingInstructionLike, [{
        key: 'cloneNode',
        value: function cloneNode() {
            var deep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            deep;
            return this.ownerDocument.createProcessingInstruction(this.target, this.data);
        }
    }]);

    return AbstractProcessingInstructionLike;
}(_AbstractCharacterDataLike2.default);

exports.default = AbstractProcessingInstructionLike;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractCharacterDataLike = __webpack_require__(6);

var _AbstractCharacterDataLike2 = _interopRequireDefault(_AbstractCharacterDataLike);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractTextLike = function (_AbstractCharacterDat) {
    _inherits(AbstractTextLike, _AbstractCharacterDat);

    function AbstractTextLike() {
        _classCallCheck(this, AbstractTextLike);

        var _this = _possibleConstructorReturn(this, (AbstractTextLike.__proto__ || Object.getPrototypeOf(AbstractTextLike)).apply(this, arguments));

        _this.nodeType = 3;
        _this.nodeName = '#text';
        return _this;
    }

    _createClass(AbstractTextLike, [{
        key: 'cloneNode',
        value: function cloneNode() {
            var deep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            deep;
            return this.ownerDocument.createTextNode(this.textContent);
        }
    }, {
        key: 'splitText',
        value: function splitText(offset) {
            var data = this.__data;
            var before = data.slice(0, offset);
            var after = data.slice(offset);
            this.__data = before;
            var afterNode = this.ownerDocument.createTextNode(after);
            this.after(afterNode);
            return afterNode;
        }
    }]);

    return AbstractTextLike;
}(_AbstractCharacterDataLike2.default);

exports.default = AbstractTextLike;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _passageDataFactory = __webpack_require__(39);

var _passageDataFactory2 = _interopRequireDefault(_passageDataFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function storyDataFactory(storyMap, document) {
    var storyData = document.createElement('tw-storydata');
    var counter = 0;
    var nodes = storyMap.passages.map(function (passage, index) {
        var passageName = storyMap.passageNames[index];
        if (!passageName) {
            passageName = 'UNKNOWN_' + counter;
            counter += 1;
        }
        return (0, _passageDataFactory2.default)(passage, passageName, document);
    });
    storyData.append.apply(storyData, _toConsumableArray(nodes));
    return storyData;
}
exports.default = storyDataFactory;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _nodeFactory = __webpack_require__(15);

var _nodeFactory2 = _interopRequireDefault(_nodeFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function passageDataFactory(passage, passageName, document) {
    var passageData = document.createElement('tw-passagedata');
    passageData.setAttribute('name', passageName);
    var nodes = passage.map(function (node) {
        return (0, _nodeFactory2.default)(node, document);
    });
    passageData.append.apply(passageData, _toConsumableArray(nodes));
    return passageData;
}
exports.default = passageDataFactory;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _AbstractTask2 = __webpack_require__(16);

var _AbstractTask3 = _interopRequireDefault(_AbstractTask2);

var _isIElementLike = __webpack_require__(0);

var _isIElementLike2 = _interopRequireDefault(_isIElementLike);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DisplayUsageTask = function (_AbstractTask) {
    _inherits(DisplayUsageTask, _AbstractTask);

    function DisplayUsageTask() {
        _classCallCheck(this, DisplayUsageTask);

        var _this = _possibleConstructorReturn(this, (DisplayUsageTask.__proto__ || Object.getPrototypeOf(DisplayUsageTask)).apply(this, arguments));

        _this.executeMicrotask = function (node, passageName, format, version) {
            var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];

            format;
            version;
            options;
            if ((0, _isIElementLike2.default)(node)) {
                var tagName = node.tagName.toLowerCase();
                var accumulator = _this.accumulator;
                var dataName = node.getAttribute('data-name');
                var lineNumber = node.getAttribute('data-line-number');
                var columnNumber = node.getAttribute('data-column-number');
                if (tagName === 'tw-invocation' && dataName === 'display') {
                    var elem = node.firstElementChild || {};
                    var macroPassageName = elem.textContent || 'UNKNOWN';
                    accumulator = accumulator;
                    if (passageName in _this.accumulator) {
                        if (macroPassageName in accumulator[passageName].displays) {
                            accumulator[passageName].displays[macroPassageName].push({
                                lineNumber: lineNumber,
                                columnNumber: columnNumber
                            });
                        } else {
                            accumulator[passageName].displays[macroPassageName] = [{
                                lineNumber: lineNumber,
                                columnNumber: columnNumber
                            }];
                        }
                    } else {
                        accumulator[passageName] = {
                            displays: _defineProperty({}, macroPassageName, {
                                lineNumber: lineNumber,
                                columnNumber: columnNumber
                            }),
                            links: {}
                        };
                    }
                } else if (tagName === 'tw-link') {
                    var _macroPassageName = node.getAttribute('passage-name');
                    if (!_macroPassageName) {
                        throw new Error('There is no passage-name on a link.');
                    }
                    accumulator = accumulator;
                    if (passageName in _this.accumulator) {
                        if (_macroPassageName in accumulator[passageName].links) {
                            accumulator[passageName].links[_macroPassageName].push({
                                lineNumber: lineNumber,
                                columnNumber: columnNumber
                            });
                        } else {
                            accumulator[passageName].links[_macroPassageName] = [{
                                lineNumber: lineNumber,
                                columnNumber: columnNumber
                            }];
                        }
                    } else {
                        accumulator[passageName] = {
                            displays: {},
                            links: _defineProperty({}, _macroPassageName, {
                                lineNumber: lineNumber,
                                columnNumber: columnNumber
                            })
                        };
                    }
                }
            }
        };
        return _this;
    }

    return DisplayUsageTask;
}(_AbstractTask3.default);

exports.default = DisplayUsageTask;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Recurser = function () {
    function Recurser() {
        _classCallCheck(this, Recurser);
    }

    _createClass(Recurser, [{
        key: "leftTopRecurse",
        value: function leftTopRecurse(node, format, version, callback, options) {
            callback(node, format, version, options);
            var childNodes = node.childNodes;
            for (var ii = 0; ii < childNodes.length; ii += 1) {
                var childNode = childNodes[ii];
                this.leftTopRecurse(childNode, format, version, callback, options);
            }
        }
    }, {
        key: "leftBottomRecurse",
        value: function leftBottomRecurse(node, format, version, callback, options) {
            var childNodes = node.childNodes;
            for (var ii = 0; ii < childNodes.length; ii += 1) {
                var childNode = childNodes[ii];
                this.leftBottomRecurse(childNode, format, version, callback, options);
            }
            callback(node, format, version, options);
        }
    }, {
        key: "rightTopRecurse",
        value: function rightTopRecurse(node, format, version, callback, options) {
            callback(node, format, version, options);
            var childNodes = node.childNodes;
            for (var ii = childNodes.length - 1; ii >= 0; ii -= 1) {
                var child = childNodes[ii];
                this.rightTopRecurse(child, format, version, callback, options);
            }
        }
    }, {
        key: "rightBottomRecurse",
        value: function rightBottomRecurse(element, format, version, callback, options) {
            var childNodes = element.childNodes;
            for (var ii = childNodes.length - 1; ii >= 0; ii -= 1) {
                var child = childNodes[ii];
                this.rightBottomRecurse(child, format, version, callback, options);
            }
            callback(element, format, version, options);
        }
    }]);

    return Recurser;
}();

exports.default = Recurser;

/***/ }),
/* 42 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _DocumentLike = __webpack_require__(3);

var _DocumentLike2 = _interopRequireDefault(_DocumentLike);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function documentConstructor() {
    if (typeof Document === 'function') {
        return new Document();
    } else {
        return new _DocumentLike2.default();
    }
}
exports.default = documentConstructor;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _detectFormat = __webpack_require__(18);

var _detectFormat2 = _interopRequireDefault(_detectFormat);

var _detectVersion = __webpack_require__(19);

var _detectVersion2 = _interopRequireDefault(_detectVersion);

var _Linter = __webpack_require__(17);

var _Linter2 = _interopRequireDefault(_Linter);

var _parserFactory = __webpack_require__(22);

var _parserFactory2 = _interopRequireDefault(_parserFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function linterFactory(storyData) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var formatDetector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _detectFormat2.default;
    var versionDetector = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _detectVersion2.default;

    var parser = void 0;
    var opts = options || {};
    var format = opts.format;
    if (!format) {
        if (opts.detectionMode === 'auto') {
            format = formatDetector(storyData);
        } else {
            throw new Error('No format was provided, but the detection mode ' + 'was manual.');
        }
    }
    if (!format) {
        throw new Error('No format could be detected.');
    }
    format = format;
    var version = opts.version;
    if (!version) {
        if (opts.detectionMode === 'auto') {
            version = versionDetector(storyData);
        } else {
            throw new Error('No version was provided, but the detection mode ' + 'was manual.');
        }
    }
    if (!version) {
        throw new Error('No version could be detected.');
    }
    version = version;
    parser = (0, _parserFactory2.default)(format);
    opts.format = format;
    opts.version = version;
    opts.detectionMode = options.detectionMode || 'manual';
    opts.documentConstructor = options.documentConstructor;
    return new _Linter2.default(storyData, parser, opts);
}
exports.default = linterFactory;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _AbstractTask2 = __webpack_require__(16);

var _AbstractTask3 = _interopRequireDefault(_AbstractTask2);

var _isIElementLike = __webpack_require__(0);

var _isIElementLike2 = _interopRequireDefault(_isIElementLike);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VariableUsageTask = function (_AbstractTask) {
    _inherits(VariableUsageTask, _AbstractTask);

    function VariableUsageTask() {
        _classCallCheck(this, VariableUsageTask);

        var _this = _possibleConstructorReturn(this, (VariableUsageTask.__proto__ || Object.getPrototypeOf(VariableUsageTask)).apply(this, arguments));

        _this.executeMicrotask = function (node, passageName, format, version) {
            var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];

            format;
            version;
            options;
            if ((0, _isIElementLike2.default)(node)) {
                var tagName = node.tagName.toLowerCase();
                var accumulator = _this.accumulator;
                var dataName = node.getAttribute('data-name');
                var lineNumber = node.getAttribute('data-line-number');
                var columnNumber = node.getAttribute('data-column-number');
                if (tagName === 'tw-invocation' && dataName === 'set') {
                    var elem = node.firstElementChild || {};
                    var variableName = elem.getAttribute('data-name');
                    if (!variableName) {
                        throw new Error('A variable was detected without a data-name ' + 'attribute.');
                    }
                    accumulator = accumulator;
                    if (passageName in _this.accumulator) {
                        if (variableName in accumulator[passageName]) {
                            accumulator[passageName].defines[variableName].push({
                                lineNumber: lineNumber,
                                columnNumber: columnNumber
                            });
                        } else {
                            accumulator[passageName].defines[variableName] = [{
                                lineNumber: lineNumber,
                                columnNumber: columnNumber
                            }];
                        }
                    } else {
                        accumulator[passageName] = {
                            defines: _defineProperty({}, variableName, [{
                                lineNumber: lineNumber,
                                columnNumber: columnNumber
                            }]),
                            usages: {}
                        };
                    }
                } else if (tagName === 'tw-variable') {
                    var _variableName = node.getAttribute('data-name');
                    if (!_variableName) {
                        throw new Error('The data-name attribute in the tw-variable was ' + 'missing.');
                    }
                    if (node.parentElement && node.parentElement.tagName.toLowerCase() === 'tw-invocation' && node.nextElementSibling && node.nextElementSibling.tagName.toLowerCase() === 'tw-string' && (node.nextElementSibling.textContent === 'to' || node.nextElementSibling.textContent === '=')) {
                        return;
                    }
                    accumulator = accumulator;
                    if (passageName in _this.accumulator) {
                        if (_variableName in accumulator[passageName].usages) {
                            accumulator[passageName].usages[_variableName].push({
                                lineNumber: lineNumber,
                                columnNumber: columnNumber
                            });
                        } else {
                            accumulator[passageName].usages[_variableName] = [{
                                lineNumber: lineNumber,
                                columnNumber: columnNumber
                            }];
                        }
                    } else {
                        accumulator[passageName] = {
                            defines: {},
                            usages: _defineProperty({}, _variableName, [{
                                lineNumber: lineNumber,
                                columnNumber: columnNumber
                            }])
                        };
                    }
                }
            }
        };
        return _this;
    }

    return VariableUsageTask;
}(_AbstractTask3.default);

exports.default = VariableUsageTask;

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map