/*jshint eqnull:true, expr:true*/
//Arkady's project

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return (n === undefined) ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    var start = Math.max(0, array.length - n);
    return (n === undefined) ? array[array.length-1] : array.slice(start);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    if(Array.isArray(collection)) {
      for(var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for(var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var index = -1;
    _.each(array, function(val, i){
      if(val === target && index === -1) {
        index = Number(i);
      }
    });
    return index;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
    var filteredArray = [];
    _.each(collection, function(val){
      if(iterator(val)) {
        filteredArray.push(val);
      }
    });
    return filteredArray;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
    // TIP: see if you can re-use _.select() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(val){
      return !iterator(val);
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var uniqVals = [];
    _.each(array, function(val) {
      if(_.indexOf(uniqVals, val) === -1) {
        uniqVals.push(val);
      }
    });
    return uniqVals;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var mapArr = [];
    _.each(array, function(key, val, collection){
      mapArr.push(iterator(key, val, collection));
    });
    return mapArr;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(array, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    return _.map(list, function(value){
      return (typeof(methodName) === 'function' ? methodName : value[methodName]).apply(value, args);
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. Defaults to 0.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  _.reduce = function(collection, iterator, initialValue) {
    var context = initialValue || 0;
    _.each(collection, function(val) {
      context = iterator(context, val);
    });
    return context;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if(wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    return _.reduce(collection, function(context, val) {
      if(context) {
        return iterator === undefined ? Boolean(val) : Boolean(iterator(val));
      } else {
        return false;
      }
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    var _iterator = (iterator === undefined) ? function(val){return Boolean(val)} : iterator;

    return !_.every(collection, function(val) {
      return !_iterator(val); 
    })
  };

  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    for(var i = 1; i < arguments.length; i++) {
      _.each(arguments[i], function(val, key) {
        obj[key] = val;
      });
    };
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    for(var i = 1; i < arguments.length; i++) {
      _.each(arguments[i], function(val, key) {
        if(!(key in obj)) {
          obj[key] = val;
        }
      });
    };
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;
    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function(){
      if(!alreadyCalled){
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var results = {};

    return function(key) {
      if(!(key in results)) {
        results[key] = func.call(this, key);
      }
      return results[key];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments);
    setTimeout(function() {
      func.apply(this, args.slice(2));
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Shuffle an array.
  _.shuffle = function(array) {
    var arr2 = array.slice(0);
    var rand; //random array index
    var temp; //temp storage for swapping array elements
    for(var i = arr2.length - 1; i >= 0; i--) {
      rand = Math.floor(Math.random()*i); //find random element from unswapped items
      temp = arr2[rand]; //store random element
      arr2[rand] = arr2[i]; //swap random element with last element
      arr2[i] = temp; //swap last element with random element
    }
    return arr2;
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    return collection.sort(function(a, b) {
      if(typeof(iterator) === 'string') {
        return a[iterator] - b[iterator];
      } else {
        return iterator(a) - iterator(b);
      }
    });
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    //STEP 1: Find array with the most elements
    var biggest = -1;
    for(var i = 0; i < arguments.length; i++) {
      if(arguments[i].length > biggest) {
        biggest = arguments[i].length;
      }
    }

    //STEP 2: Cycle through all arrays and zip together elements of same index
    var zipped = [];    
    for(var element = 0; element < biggest; element++) {  
      zipped[element] = [];
      for(var array = 0; array < arguments.length; array++) {
        zipped[element].push(arguments[array][element]);
      }
    }
    return zipped;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    result = result || [];
    _.each(nestedArray, function(val) {
      if(Array.isArray(val)) {
        _.flatten(val, result);
      } else {
        result.push(val);
      }
    });
    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    //Find array with smallest length
    var smallest = arguments[0].length;
    var smallestIndex = 0;
    _.each(arguments, function(array, key) {
      if(array.length < smallest) {
        smallest = array.length;
        smallestIndex = key;
      }
    });

    var intersection = [];
    for(var index = 0; index < smallest; index++) { //cycle through smallest arrays elements
      var match = true;
      for(var array = 0; array < arguments.length; array++) {
        if(match && arguments[smallestIndex][index] !== arguments[array][index]) {
          match = false;
        }
      }
      if(match) {
        intersection.push(arguments[smallestIndex][index]);
      }
    }
    return intersection;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    if(arguments.length < 2) {
      return array;
    }
    var otherVals = {};
    var temp = {};
    for(var arr = 1; arr < arguments.length; arr++) { //cycle through 'other' passed in arrays
      _.each(arguments[arr], function(val) {        
        temp = {};
        temp[val] = true;
        _.defaults(otherVals, temp); //add keys to 'otherVals' to store vals from other arrays
      });
    }

    var difference = [];
    _.each(array, function(val) {
      if(!(val in otherVals)) {
        difference.push(val);
      }
    });
    return difference;
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
    var callTime; //time the function was called
    var endWait = 0; //time difference between callTime and wait
    var que = 0; //number of func calls waiting to be performed
    var result; //result of the latest func call;

    return function() {
      callTime = Number(new Date());

      if(callTime > endWait) { //call function because wait period is over
        endWait = callTime + wait;
        result = func.apply(this, Array.prototype.slice.call(arguments, 2));
      } else if(que === 0) {
        que = 1;
        setTimeout(function() {
          callTime = Number(new Date());
          endWait = callTime + wait;
          result = func.apply(this, Array.prototype.slice.call(arguments, 2));
          que = 1;
        }, endWait - callTime);
      }
      return result;
    }
  };

}).call(this);