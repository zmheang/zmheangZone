function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}


const preorderTraversal1 = function(root) {
  let res = []
  const prologue = (root) => {
    if(root == null) {
      return ;
    }
    res.push(root.val)
    prologue(root.left)
    prologue(root.right)
  }
  prologue(root)
  return res
};

const preorderTraversal2 = (root) => {
  let stash = []
  let res = []
  while(stash.length || root) {
    while(root) {
      res.push(root.val)
      stash.push(root)
      root = root.left
    }
    root = stash.pop()
    root = root.right

  }
  return res
}

console.log(preorderTraversal1(new TreeNode(1, null, new TreeNode(2, new TreeNode(3, null, null), null))));
console.log(preorderTraversal2(new TreeNode(1, null, new TreeNode(2, new TreeNode(3, null, null), null))));
