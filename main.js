var matches = null;
var currentMatchIndex = 0;
$(function () {
  // 初始化
  matches = new Matches();
  matches.initialize();
  matches.matchList[currentMatchIndex].createBattle();

  handleClick = new HandleClick();
  handleClick.init();
  
  
  // 监听点击事件
  $('.j-add-match').on('click', handleClick.addMatch.bind(handleClick));
  $('.j-add-ok').on('click', handleClick.addTeam.bind(handleClick));
  $('.j-modify').on('click', handleClick.selectedTeam.bind(handleClick));
  $('.j-modify-ok').on('click', handleClick.modifyTeam.bind(handleClick));
  $('.j-remove').on('click', handleClick.selectedTeam.bind(handleClick));
  $('.j-remove-ok').on('click', handleClick.removeTeam.bind(handleClick));
  $('.j-update').on('click', handleClick.updateBattle.bind(handleClick));
  $('.j-ok-update').on('click', handleClick.addAndUpdate.bind(handleClick));
  $('.j-nav-item').on('click', handleClick.setCurrentMatch.bind(handleClick));
})