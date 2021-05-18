console.log('hello world ~~~')

const text = '这是一段很长的文本这是一段本这是一段很长的文本这是一段很长的文本这是一段很长的文本这是一段很长的文本这是一段很长的文本这是一段很长的文本这是一段很长的文本这是一段很长的文本这是一段很长的文本这是一段很长的文本这是一段很长的文本这是一段很长的文本这是一段很长的文本这是一段很长的文本';
const totalTextLen = text.length;
const formatStr = () => {
  const ele = document.getElementsByClassName('main_container3')[0];
  const lineNum = 2;
  const baseWidth = window.getComputedStyle(ele).width;
  const baseFontSize = window.getComputedStyle(ele).fontSize;
  const lineWidth = +baseWidth.slice(0, -2);

  // 所计算的strNum为元素内部一行可容纳的字数(不区分中英文)
  const strNum = Math.floor(lineWidth / +baseFontSize.slice(0, -2));

  let content = '';

  // 多行可容纳总字数
  const totalStrNum = Math.floor(strNum * lineNum);

  const lastIndex = totalStrNum - totalTextLen;

  if (totalTextLen > totalStrNum) {
    content = text.slice(0, lastIndex - 3).concat('...');
  } else {
    content = text;
  }
  ele.innerHTML = content;
}

formatStr();

window.onresize = () => formatStr();
