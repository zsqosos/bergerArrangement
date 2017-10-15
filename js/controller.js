/**
 * 初始化模型
 */
(function () {
  matches = new Matches();
  matches.initialize();
  matches.matchList[0].createBattle();
})();
/**
 * 处理点击事件
 */
var handleClick = {
  addMatch: function () {
    var matchName = $('.j-match-name').val();
    var isExisted = matches.findMatch(matchName);
    $('.j-match-name').val('');
    // 空字符未做处理
    if (matchName.length === 0 || isExisted !== -1) {
      return
    }
    matches.addMatch(matchName);
  },
  modifyTeam: function (e) {
    // newName
    var teamEl = $(e.target).parent()[0];
    var matchName = teamEl.dataset.match;
    var matchIndex = matches.findMatch(matchName);
    var team = teamEl.dataset.team;
    matches.matchList[matchIndex].modifyTeam(team, newName);
  },
  removeTeam: function (e) {
    var teamEl = $(e.target).parent()[0];
    var matchName = teamEl.dataset.match;
    var matchIndex = matches.findMatch(matchName);
    var team = teamEl.dataset.team;
    matches.matchList[matchIndex].removeTeam(team);
  },
  addTeam: function () {
    var teamEl = $('.j-add-team')[0];
    var matchName = teamEl.dataset.match;
    var matchIndex = matches.findMatch(matchName);
    var team = $('.j-team-input').val();
    $('.j-team-input').val('');
    var isExisted = matches.matchList[matchIndex].findTeam(team);
    // 空字符未做处理
    if (team.length === 0 || isExisted !== -1) {
      return
    }
    matches.matchList[matchIndex].addTeam(team);
  },
  updateBattle: function () {
    var teamEl = $('.j-update').parent()[0];
    var matchName = teamEl.dataset.match;
    var matchIndex = matches.findMatch(matchName);
    var team = matches.matchList[matchIndex].teams;
    matches.matchList[matchIndex].createBattle(team);
  },
  addAndUpdate: function () {
    this.addTeam();
    this.updateBattle();
  }
}