function bergerArrange(arr) {
  var arr = arr.slice();
  if (arr.length < 2) {
    return
  }
  var result = [];
  var totalRound = Math.ceil((arr.length / 2)) * 2 - 1;
  // jumpNum为间隔数
  var jumpNum = Math.max(Math.ceil(arr.length / 2 - 2), 0);
  var lastTeam = arr.length % 2 === 0 ? arr[arr.length - 1] : 0;
  // 队伍数量若为偶数，则去掉最后一支队伍
  if (arr.length % 2 === 0) {
    arr.pop();
  }
  // moveNum为队伍数量的一半，当前队伍数量为奇数，需将队伍数量进位为偶数后计算
  var moveNum = (arr.length + 1) / 2;
  for (var i = 0; i < totalRound; i++) {
    result.push([]);
    // 将当前展开的数组首与尾两两对应，组成一队对战队伍
    for (var j = 0; j < (arr.length + 1) / 2; j++) {
      var newArr = arr.slice();
      // 偶数轮在数组末尾补上最后一队，奇数轮在数组开头补上最后一队
      if (i % 2 === 0) {
        newArr.push(lastTeam);
      } else {
        newArr.unshift(lastTeam);
      }
      result[i].push([newArr[j], newArr[newArr.length - j - 1]]);
    }
    // 偶数轮时，将当前数组后jumpNum个队伍取下来（jumpNum为间隔数），放在当前数组的最前面作为下一轮数组
    // 奇数轮时，将当前数组的后一半队伍取下来（当前数组为奇数，长度加1后，取后一半），放在数组的最前面作为下一轮数组
    if (i % 2 === 0) {
      arr = arr.splice(-jumpNum, jumpNum).concat(arr);
    } else {
      arr = arr.splice(-moveNum, moveNum).concat(arr);
    }
  }
  return result;
}