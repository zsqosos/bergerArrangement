var matches = null;
$(function () {
  // 初始化
  handleClick = new HandleClick();

  matches = new Matches();
  matches.initialize();
  matches.matchList[0].createBattle();
  
  // 监听点击事件
  $('.j-add-match').on('click', handleClick.addMatch.bind(handleClick));
  $('.j-modify').on('click', handleClick.modifyTeam.bind(handleClick));
  $('.j-modify-ok').on('click', handleClick.modifyTeamComplete.bind(handleClick));
  $('.j-remove').on('click', handleClick.removeTeam.bind(handleClick));
  $('.j-update').on('click', handleClick.updateBattle.bind(handleClick));
  $('.j-add-ok').on('click', handleClick.addTeam.bind(handleClick));
  $('.j-ok-update').on('click', handleClick.addAndUpdate.bind(handleClick));
})