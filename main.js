var matches = null;
$(function(){
  $('.j-add-match').on('click', handleClick.addMatch);
  $('.j-modify').on('click', handleClick.modifyTeam);
  $('.j-remove').on('click', handleClick.removeTeam);
  // $('.j-add-team').on('click', handleClick.addTeam);
  $('.j-update').on('click', handleClick.updateBattle);
  $('.j-add-ok').on('click', handleClick.addTeam);
  $('.j-ok-update').on('click', handleClick.addAndUpdate);
})