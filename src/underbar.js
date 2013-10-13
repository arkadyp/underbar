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
    if(n == null) {
      return array[0];
    }
    else {
      return array.slice(0, n)
    }
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if(n == null) {
      return array[array.length-1];
    }
    else if(n > array.length){
      return array;
    }
    else {
      return array.slice(array.length-n, array.length);
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    for(var a in collection) {
      iterator(collection[a], a, collection);
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    _.index = -1;
    var test = _.each(array, function(value, key, array) {
      if(target == value && _.index == -1) {
        _.index = Number(key);
      }
    });
    return _.index;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
    _.filteredArray = [];
    _.each(collection, function(value, key, array) {
      if(iterator(value)) {        
        _.filteredArray.push(value);
      }
    });
    return _.filteredArray;    
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
    // TIP: see if you can re-use _.select() here, without simply
    // copying code in and modifying it
    var keptValues = [], droppedValues = _.filter(collection, iterator);    
    _.each(collection, function(value, key, array) {
      if(_.indexOf(droppedValues, value) == -1) {
        keptValues.push(value);
      }
    });
    return keptValues;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var uniqArray = [];
    _.each(array, function(value, key, array) {
      if(_.indexOf(uniqArray, value) == -1) {   
        uniqArray.push(value);
      }
    });
    return uniqArray;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var mappedArray = [];
    _.each(array, function(value, key, array) {
      mappedArray.push(iterator(value));
    });
    return mappedArray;
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
    return _.map(list, function(value) {
      return (typeof(methodName) == 'function' ? methodName : value[methodName]).apply(value, args);
    })
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
    var a = _.each(collection, function(value) {
      context = iterator(context, value);
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
    if(typeof(iterator)=='undefined') {
      return true;
    }
    
    return _.reduce(collection, function(allTrue, item) {
      if(!allTrue) {
        return false;
      }
      return Boolean(iterator(item));
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    //EVERY:  ALL A IS TRUE
    //SOME:  NOT(ALL A IS FALSE)
    if(typeof(iterator)=='undefined') {
      iterator = function(item){return Boolean(item)};
    }

    return !_.every(collection, function(item) {
      return !iterator(item);
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
    if(typeof(obj) == 'undefined') {
      obj = {};
    }

    _.each(arguments, function(object, key, arguments) {      
      _.each(object, function(propValue, propName, object) {         
        obj[propName] = propValue;
      });
    });
    return obj;    
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    if(typeof(obj) == 'undefined') {
      obj = {};
    }

    _.each(arguments, function(object, key, arguments) {      
      _.each(object, function(propValue, propName, object) {         
        if(!(propName in obj)) {
          obj[propName] = propValue;  
        }        
      });
    });  
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
    
    var results = {};  //store key-value pair for result of particular function calls
    
    return function(key){
      if(!(key in results)) {
        results[key] = func.apply(this, arguments);
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
    setTimeout(function(){
      func.apply(this, args.slice(2));
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Shuffle an array.
  _.shuffle = function(array) {
    var randomized = [];
    _.each(array, function(value) {
      randomized.push([value, Math.random()])
    });
    randomized.sort(function(a,b) {return a[1] - b[1]});
    
    array = [];
    
    _.each(randomized, function(value) {
      array.push(value[0]);
    });

    return array;
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
    if(typeof(iterator) === 'string') {
      collection.sort(function(a,b) {
        return a[iterator] - b[iterator];
      });
    }
    else {
      collection.sort(function(a,b) {
        return iterator(a) - iterator(b);
      })
    }    
    return collection;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    //find largest array in argument
    var maxLength = 0;    
    _.each(arguments, function(array, argNum, collection) {
        if(array.length > maxLength) {
          maxLength = array.length;
        }     
    })
    
    var zipArr = [];    
    for(var i = 0; i < maxLength; i++) {  //cycle through all array elements
      zipArr[i] = []; //inital empty array that will store array[i] of each argument
      for(var j = 0; j < arguments.length; j++) { //cycle through all arryas        
        zipArr[i].push(arguments[j][i]);        
      }      
    }
    return zipArr;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    if(typeof(result) === 'undefined' || typeof(result) === 'null') { //initialize array to store flattened result
      result = [];
    }
    for(var i = 0; i < nestedArray.length; i++) { //loop through each element of nested array
      if(Array.isArray(nestedArray[i])) { //check if element is an array
        var newArr = [];
        _.each(nestedArray[i], function(val){ //add each element in inner array to flattened result
          newArr.push(val);
        });
        for(var j = i+1; j < nestedArray.length; j++) { //add remainder of nested array elements
          newArr.push(nestedArray[j]);
        }
        return _.flatten(newArr, result); //recall fuction w/ one layer flattened
        break;
      }
      else {
        result.push(nestedArray[i]); //if element isn't an array, add the value to flattened result
        if(i === nestedArray.length-1) {
          return result;
        }
      }      
    }    
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    //find the index of smallest array
    var smallestLength = arguments[0].length, 
        smallest = 0; //index of the smallest array
    for(var i = 1; i < arguments.length; i++) {
      if(arguments[i].length < smallestLength) {
        smallestLength = arguments[i].length;
        smallest = i;
      }
    }
    
    var intersection = [], hasValue;
    for(var index = 0; index < arguments[smallest].length; index++) { //cycle through values in smallest array
      hasValue = true;
      for(var i = 0; i < arguments.length; i++) { //cycle through all arrays;
        //stop checking through arrays for matching value if one of the arrays wasn't a match
        //do not check smallest array against itself
        if(!(i === smallest) && hasValue) {
          hasValue = _.contains(arguments[i], arguments[smallest][index]);
          //console.log(arguments[i]+" has "+arguments[smallest][index]+": "+_.contains(arguments[i], arguments[smallest][index]));          
        }
      }
      if(hasValue === true) {
        //console.log(arguments[smallest][index]+" pushed on to "+intersection);
        intersection.push(arguments[smallest][index]);      
      }
    }
    return intersection;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var difference = [], hasValue;
    for(var index = 0; index < arguments[0].length; index++) { //cycle through values in first array
      hasValue = false;
      for(var i = 1; i < arguments.length; i++) {
        if(!hasValue) {          
          //console.log(arguments[0][index]+" in "+arguments[i]+": "+_.contains(arguments[i], arguments[0][index]));
          hasValue = _.contains(arguments[i], arguments[0][index]);  
        }
      }
      if(!hasValue) {
        //console.log(arguments[0][index]+" pushed on to "+difference);
        difference.push(arguments[0][index]);
      }
      //console.log('\n');
    }
    //console.log(difference);
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
  };

}).call(this);
