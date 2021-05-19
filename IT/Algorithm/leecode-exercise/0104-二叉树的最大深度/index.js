function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
const maxDepth = function (root) {
  if(root == null) {
    return 0
  }else {
    let leftHeight = maxDepth(root.left)
    let rightHeight = maxDepth(root.right)
    return Math.max(leftHeight, rightHeight) + 1
  }
};

// 4
console.log(maxDepth(new TreeNode(
  0,
  new TreeNode(
    2,
    new TreeNode(1, new TreeNode(5, null, null), new TreeNode(1, null, null)),
    null),
  new TreeNode(
    4,
    new TreeNode(3, null, new TreeNode(6, null, null)),
    new TreeNode(2, null, new TreeNode(8, null, null))
  )
)));


// 7
console.log(
  maxDepth(new TreeNode(
    1,
    new TreeNode(2, null, null),
    new TreeNode(
      3,
      new TreeNode(
        4,
        new TreeNode(
          5,
          null,
          new TreeNode(
            8,
            new TreeNode(7, new TreeNode(1, null, null), null),
            null
          )),
        new TreeNode(
          6,
          null,
          null
        )),
      new TreeNode(
        7,
        null,
        null)
    )
  )));
