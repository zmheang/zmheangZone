console.log('hello world ~')

document.onkeydown = function (e){
  if(e.key === 'Enter') {
    const selObj = window.getSelection();
    console.log(selObj.toString())
    document.execCommand("copy");
  }
}