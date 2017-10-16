var matches = null;
$(function(){
  $('.j-add-match').on('click', handleClick.addMatch);
  $('.j-modify').on('click', handleClick.modifyTeam);
  $('.j-modify-ok').on('click', handleClick.modifyTeamComplete);
  $('.j-remove').on('click', handleClick.removeTeam);
  $('.j-update').on('click', handleClick.updateBattle);
  $('.j-add-ok').on('click', handleClick.addTeam);
  $('.j-ok-update').on('click', handleClick.addAndUpdate);
})