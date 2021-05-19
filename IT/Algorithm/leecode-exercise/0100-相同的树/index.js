function TreeNode(val, left, right) {
  this.val = (val === undefined? 0: val)
  this.left = (left === undefined? 0: left)
  this.right = (right === undefined? 0: right)
}

// let t2 = new TreeNode(1, null, 1)
let t1 = new TreeNode(1, 1)
let t2 = new TreeNode(1, 1)

const isSameTree = function(q, p) {
  // 如果
  if (p == null && q == null) {
    return true;
  } else if (p == null || q == null) {
    return false;
  } else if (p.val != q.val) {
    return false;
  } else {
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
  }

  // if (p == null) return q == null;
  // return q != null && p.val == q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};

console.log(isSameTree(t1, t2));



