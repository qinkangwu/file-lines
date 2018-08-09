var argv = require('optimist').argv;
var fs = require('fs');
var cwd,ignoreArr,totalLines = 0;
if(!argv.cwd)throw Error('cwd参数为空');
cwd = argv.cwd;
argv.ignore && (ignoreArr = argv.ignore.split(','));
var arr = diffArray(fs.readdirSync(cwd),ignoreArr);
arr.forEach((res)=>{
    fileLines(cwd + '/' + res);
})
console.log(`${cwd}目录下指定的文件行数为${totalLines}`);
function fileLines(path){
    console.log(path);
    var stat = fs.statSync(path);
    if(stat.isDirectory()){
        var arr2 =diffArray(fs.readdirSync(path),ignoreArr);
        arr2.forEach((res)=>{
            fileLines(path + '/' + res);
        })
    }else{
        totalLines += fs.readFileSync(path).toString().split('\n').length;
    }
}
function diffArray(one, two) {
    if (!Array.isArray(two)) {
      return one.slice();
    }
  
    var tlen = two.length
    var olen = one.length;
    var idx = -1;
    var arr = [];
  
    while (++idx < olen) {
      var ele = one[idx];
  
      var hasEle = false;
      for (var i = 0; i < tlen; i++) {
        var val = two[i];
  
        if (ele === val) {
          hasEle = true;
          break;
        }
      }
  
      if (hasEle === false) {
        arr.push(ele);
      }
    }
    return arr;
}