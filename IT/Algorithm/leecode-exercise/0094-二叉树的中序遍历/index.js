// 二叉树的中序遍历
// 中序遍历：按照 ’左子树 -> 根节点 -> 右子树‘ 的顺序遍历整棵树，在访问左子树或者右子树的时候按照同样的方式，直到遍历完整棵树

function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

// 递归
const inorderTraversal1 = function(root) {
  const res = []
  const inorder = (root) => {
    if(!root) {
      return
    }
    inorder(root.left)
    res.push(root.val)
    inorder(root.right)
  }
  inorder(root)
  return res
};

// 迭代
const inorderTraversal2 = function(root) {
  const res = []
  const stk = []
  while(root || stk.length) {
    while(root) {
      stk.push(root)
      root = root.left
    }
    root = stk.pop()
    res.push(root.val)
    root = root.right
  }
}

// Morris中序遍历
// 解析：假设遍历到当前节点为X
// 1. 如果X无左孩子，先将X的值加入到答案数组中，在访问X的右孩子，即X = X.right
// 2. 如果X有左孩子，则找到X左子树最右的节点（即左子树中序遍历的最后一个节点，X在中序遍历中的前驱节点），我们记为predecessor，
//    根据predecessor的右孩子是否为空，进行如下操作：
//    · 如果predecessor的右孩子为空，则将其右孩子指向X，然后访问X的左孩子，即X = X.left
//    · 如果predecessor的右孩子不为空，则此时其右孩子指向X，说明我们已经遍历完X的左子树，我们将predecessor的右孩子置空，
//      将X的值加入答案数组中，然后访问X的右孩子，即X = X.right
// 3. 重复上述操作
const inorderTraversal3 = function(root) {
  const res = []
  let predecessor = null
  while(root) {
    if(root.left) {
      predecessor = root.left
      while(predecessor.right && predecessor.right !== root) {
        predecessor = predecessor.right
      }
      if(!predecessor.right) {
        predecessor.right = root
        root = root.left
      }else {
        res.push(root.val)
        predecessor.right = null
        root = root.right
      }
    }else {
      res.push(root.val)
      root = root.right
    }
  }
  return res
}

const test1 = (root) => {
  let res = []
  const traverse = (root) => {
    if(!root) {
      return
    }
    traverse(root.left)
    res.push(root.val)
    traverse(root.right)
  }
  traverse(root)
  return res
}

console.log(test1(new TreeNode(1, null, new TreeNode(2, 3, null))))
