---
author: "Akhil Pandey"
date: 2018-06-28
title: The three C's of Javascript
best: true
---

You might be wondering what the three C’s are : 

* Currying
* Closures
* Callbacks


**Ok what are those ?**

Before I start, let me tell you that in Javascript Functions are Objects. So every object in Javascript, be it Number, String, Array; Every Object in javascript has a prototype object. For instance if the object is declared using an object literal then, it has access to Object.prototype, Similarly all the arrays so declared have access to the Array.prototype. So since functions are objects, they can be used like any other value. They can be stored in variables, objects, and arrays. They can also be passed as arguments to functions, and do not forget that functions can be returned from functions. 

**Currying :**

In Javascript if one wants to partially evaluate functions then one can take advantage of a concept called function currying. Currying allows us to produce a new function by combining a function and an argument. For example let us consider writing an add function, : 

```javascript
function add(foo, bar) {
    if (arguments.length === 1) {
    	return function (boo) {
    		return foo + boo;
    	}
    }
    return foo + bar;
}
```

So for the above code,

```javascript
add(12, 13); // gives 25
add(12)(13); // gives 25
```
The curry method works by creating a closure that holds that original function and the arguments to curry. It returns a function that, when invoked, returns the result of calling that original function, passing it all of the arguments from the invocation of curry and the current invocation.


**Closures :**

Simply put, a closure is an inner function that has access to the outer (enclosing) function’s variables scope chain. Except the parameters and variables that which are defined using this and arguments all, the inner functions have access to all the parameters and variables of the function in which those are defined. 

```javascript
var a = 0;
function counter() {
    var i = 2;
    return i*i;
}

function counter1() {
    return a+= 1;
}

// this wont work as part of Js closures
function counter_foo() {
    var a = 0;
    a += 1;
}

// this also wont work as part of Js closures
function counter_bar() {
    var c = 0;
    function go() { c+= 1;}
    go();
    return counter;
}

// this will work as part of Js closures
var counter_closure = (function () {
    var incr;
    return function() {return incr+= 1;}
})();


show(counter1());
show(counter1());
show(counter1()); // since we are added the counter three times the value of a is set to 3.
show(counter_foo());
show(counter_foo());
show(counter_foo()); //similar to the above but doesnot set the value of a to 3, but returns undefined.
show(counter_bar());
show(counter_bar());
show(counter_bar()); // Neither this works which will always set the value to 1
show(counter_closure());
show(counter_closure());
show(counter_closure()); // Now this is called closures implementation in Js

```

Function Closures in Javascript is all about how are the variables being treated and referred to in the local or global scope. In Js variables can be given : ‘local scope’ ‘global scope’ There is no inbuilt concept for something called private variables, so when there is a requirement for such a scenario Closures are written in Js in order to make scope for variables that are private in scope. Observing the functions ‘counter1()’, ‘counter_foo()’ and ‘counter_bar()’ there is a similarity that can be observed, Basically we can understand that closures are nothing but self invoking functions in Js. Observe the example ‘counter_closure()’ where in we are calling the function thrice and hoping to increment the functional value each time when we call the function. So this self invoking function runs only once but it increments the value each time it is called. The scope of the variable is protected by the anonymous return function making us assume that this can be called implementation of private variables in Js. 

**Callbacks :**

A callback function is a function that is passed to another function as a parameter and giving the provision for the function to “call us back” later. Since the callback function is just a normal function when it is executed, we can pass parameters to it. We can pass any of the containing function’s properties (or global properties) as parameters to the callback function. Let us look at an example : 

```javascript
function manipulate(foo, bar) {
    console.log("Do you know that " + foo + " is better than " + bar);
}

function useIt(boo, callback) {
    var t1 = boo.slice(1,5);
    var t2 = boo.slice(31,36);
    callback(t2, t1);
}
```

The above code can be used like this : 
```javascript
var str =  "Akhil is going to wrestle with hector";
useIt(str, manipulate); // Gives : Do you know that Akhil is better than hector.
```

So that is how we can implement Currying, Closures and Callbacks in Javascript. 

Thats it folks, 
Happy Hacking !! 
