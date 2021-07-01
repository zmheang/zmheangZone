function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}



const postSequence1 = (root) => {
  let res = []
  const func = (root) => {
    if(root = null) {
      return
    }
    func(root.left)
    func(root.right)
    res.push(root.val)
  }
  func(root)
  return res
}


console.log(postSequence1(new TreeNode(1, null, new TreeNode(2, new TreeNode(3, null, null), null))));
