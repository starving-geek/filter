# filter

fun filter (f,xs) =
      case xs of
               [] => []
             | x::xs' => if f x
                         then x::(filter(f,xs'))
                         else filter(f,xs')

---

fun myFilter (xs,n) = filter (fn x => x > n, xs)   <---- <, <=, >, >=, =

val myList = [...]   <------ list with [3, 9] random numbers [0, 9]
val myList = [1, 3, 6, 7, 2, 3, 7]
val x = myFilter (myList, <x>)   <------ number from 0 to 9
val x = myFilter (myList, 3) (using >) --> [6, 7, 7]
---


fun myFilter (xs, l) = filter (fn x => String.size x < l, xs)   <---- <, <=, >, >=, =

val myList = ["soup", "dog", "orange", "park", "cat", "helps", "talks", "castle", "genius", "flaming"]  <---- choose 3 to 9 randomly
val x = myFilter (myList, <x>) <----- number from 3 to 6

val myList = ["soup", "dog", "orange"]
val x = myFilter (myList, 3)  (using >) ---> ["soup", "orange"]
