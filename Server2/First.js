// **** These function cannot change our original array
//map function 
let arr = [45,21,28]

let a = arr.map((value,index,array)=>{
    console.log(value,index,array)
    return value + index
});
console.log(a);

// main difference in foreach and map function is that map function create a new array 
// for each can also take 3 arguements
//Filter method


let arr2 = [45,21,28,0,13,4,6,8]
let aa = arr2.filter((el)=>{
    return el<10
})
console.log(aa);


// Reduce Method
//it return a single value
let arr3 = [1,2,3,4,5,1]
let newarr = arr3.reduce((t,u)=>{
    return t+u
})
console.log(newarr) //it prints the sum of all the elements in an arra





