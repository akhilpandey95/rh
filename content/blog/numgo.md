---
author: "Akhil Pandey"
date: 2017-11-01
title: numgo - ND Array based math library for Go
best: true
---

# numgo - ND Array based math library for Go
Mathematical computations and statistical operations contribute immensely to the development of machine learning models in diverse disciplines. Arrays are the most frequently used data structure in most of these applications. Basing on this I have thought of porting python’s **numpy** library to **go-lang.** The name of the project is  [numgo.](https://github.com/akhilpandey95/numgo)  After learning **go-lang** I always wanted to practically implement something with the knowledge I have gathered. The project therefore, meant a lot to me since It is both a programming excercise and an opportunity to build something in **go-lang.** As mentioned before, the repository is inspired by numpy for python therefore, most of the concepts and ideas are broadly taken from numpy. 

**ND Array**

An N-Dimensional array is a multidimensional array that contains items of fixed size and type. The number of elements present in the N-D array can be calculated using the dimensions of the array. For suppose, _D_ is a tuple indicative of the Dimensions attributed to the 1N-D Array then the number of elements that could fit in to the array would be calculated by _d1_,_d2_,_d3_,_……..dn_. So, an array of shape _{1, 2, 3, 4}_ would fit `1*2*3*4` i.e 24 elements. Also, there is no limitation to the potential of the N-D Array with regard to the data type which N-D Array belongs to. An n-dimensional float array or an n-dimensional string array will have the same potential. Although, all the member functions supporting a float type cannot equally support string type there is no restriction to the scale at which operations could be performed on both the arrays. 

**Algorithm**

```go
func NDArrayGenElements(value float64, details ...float64) []float64 {
  parameters := extract_parameters(details)
  if len(parameters) > 0 {
    dim := parameters[0]
    rem := parameters[1:]
    arr := []float64{}
    for i := 0; i < int(dim); i++ {
      arr = append(arr, NDArrayGenElements(value, rem...)...)
    }
    return arr
    }  else {
      return []float64{value}
    }
  }

func NDArray(details ...float64) (n *NArray) {
  parameters := extract_parameters(details)
  n = &NArray{
    Data:    NDArrayGenElements(0, details...),
    Details: parameters,
    Index:   make([]float64, len(parameters)),
  }
  return n
}
```


**Areas to be covered**

`numgo `aims to broadly cover the following concepts: 

* Algebra
* Arithmatics
* Trigonometry
* Exponents and logarithms
* Universal Functions
* Logical Functions

The toughest part involved with writing code for `numgo` is to support N-Dimensional array creation, manipulation over various data types. Although, the initial support is given only for float64 there is an intention to support N-Dimensional array operations for the types string and complex. Since, it is not ideal to have heterogeneous arrays there is no plan to extend support in that direction. 


**Usage**
```go
package main

import (
  "fmt"
  "github.com/akhilpandey95/numgo"
)

func main() {
  fmt.Println(numgo.NDArray(3, 3, 3))  // would init a NDArray of shape 3,3,3
  fmt.Println(numgo.Xrange(8, 20))     // would print from 8 to 20
  fmt.Println(numgo.Xrange(8, 9, 0.1)) // would print from 8.1 to 8.9
}
```
Documentation on other methods could be found  [here](https://github.com/akhilpandey95/numGo/blob/master/README.md)  

**v0.1**

The package in its entirety is under development v0.1 will most likely be shipped by the end of December 2017 or mid January 2018. 

**Github repository:**  [numgo](https://github.com/akhilpandey95/numgo) . 

The repository is licensed under MPL(Mozilla Public License) so feel free to fork it. If you like the implementation give it a star. If there is something wrong with the code, please raise an issue. Also, I would be grateful to have someone contribute to the repository. 

Thats it folks, 
Happy Hacking !!
