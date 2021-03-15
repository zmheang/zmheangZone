function TreeNode(val, left, right) {
  this.val = (val === undefined? 0: val)
  this.left = (left === undefined? 0: left)
  this.right = (right === undefined? 0: right)
}

let t1 = new TreeNode(1, 1, 2)
let t2 = new TreeNode(1, 2, 3)

var isSameTree = function(tree1, tree2) {
  console.log(typeof tree1)

  return true
};

console.log(isSameTree(t1, t2));



