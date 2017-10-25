// 监听model变化,执行相关视图函数
GlobalEvents.on('addTeam', upDateAddView);
GlobalEvents.on('modifyTeam', upDateModifyView);
GlobalEvents.on('removeTeam', upDateRemoveView);
GlobalEvents.on('createBattle', updateBattleView);

function upDateAddView(data) {
  var newTeamEl = $('.j-team-origin').clone(true).removeClass('j-team-origin hide');
  newTeamEl.find('.j-team-name').text(data.team);
  newTeamEl[0].dataset.match = currentMatch;
  newTeamEl[0].dataset.team = data.team;
  newTeamEl.insertBefore($('.j-add-team'));

  updateLenght(data.teamLength);
}

function upDateModifyView (data) {
  var modifyElIndex = data.index + 1;
  $($('.j-team')[modifyElIndex]).find('.j-team-name').text(data.newName);
  $($('.j-team')[modifyElIndex])[0].dataset.team = data.newName;
}

function upDateRemoveView (data) {
  var removeElIndex = data.index + 1;
  $($('.j-team')[removeElIndex]).remove();

  updateLenght(data.teamLength);
}

function updateLenght(num) {
  $('.j-total-team').text(num);
}

function updateBattleView (data) {
  
}
