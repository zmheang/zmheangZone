{
// console.log(1);
// setTimeout(() => {
//   console.log(2);
//   process.nextTick(() => {
//     console.log(3);
//   });
//   new Promise((resolve) => {
//     console.log(4);
//     resolve();
//   }).then(() => {
//     console.log(5);
//   });
// });
// new Promise((resolve) => {
//   console.log(7);
//   resolve();
// }).then(() => {
//   console.log(8);
// });
// process.nextTick(() => {
//   console.log(6);
// });
// setTimeout(() => {
//   console.log(9);
//   process.nextTick(() => {
//     console.log(10);
//   });
//   new Promise((resolve) => {
//     console.log(11);
//     resolve();
//   }).then(() => {
//     console.log(12);
//   });
// });
}

{
  function side(arr) {
    console.log(arr)
    arr[0] = arr[2];
  }
  function a(a, b, c = 3) {
    console.log(arguments)
    c = 10;
    console.log(arguments)
    side(arguments);
    return a + b + c;
  }

  console.log(a(1, 1, 1))
}


