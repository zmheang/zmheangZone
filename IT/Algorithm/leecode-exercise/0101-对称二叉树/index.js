function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

function check(p, q) {
  if(q == null && p == null) {
    return true
  }
  if(p == null || q == null) {
    return false
  }
  return p.val == q.val && check(p.left, q.right) && check(p.right, q.left)
}

const isSymmetric = function(root) {
  return check(root, root)
};

console.log(isSymmetric(new TreeNode(1, new TreeNode(2, 3, 4), new TreeNode(2, 4, 3))));
console.log(isSymmetric(new TreeNode(1, new TreeNode(2, null, null), new TreeNode(3, null, null))));
