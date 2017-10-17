/**
 * 处理点击事件
 */
function HandleClick() {
  // this.matchName = '';
  this.match = '';
  this.team = '';
  this.addMatch = function () {
    var matchName = $('.j-match-name').val();
    $('.j-match-name').val('');
    // 空字符未做处理
    if (matchName.length === 0) {
      return
    }
    matches.addMatch(matchName);
    console.log(matches.matchList)
  }
  this.modifyTeam = function (e) {
    var teamEl = $(e.target).parent()[0];
    this.elToModel(teamEl);
    this.teamInputEl = $(e.target).siblings('.j-input-wrapper');
    this.teamInputEl.show();
  }
  // 确保在modifyTeam后执行
  this.modifyTeamComplete = function () {
    var newName = this.teamInputEl.find('.j-team-input').val();
    this.match.modifyTeam(this.team, newName);
    console.log(this.match.teams);
  }
  this.removeTeam = function (e) {
    var teamEl = $(e.target).parent()[0];
    this.elToModel(teamEl);
    this.match.removeTeam(this.team);
    console.log(this.match.teams);
  }
  this.addTeam = function () {
    var teamEl = $('.j-add-team')[0];
    this.elToModel(teamEl);
    var team = $('.j-team-add-input').val();
    $('.j-team-input').val('');
    // 空字符未做处理
    if (team.length === 0) {
      return
    }
    this.match.addTeam(team);
    console.log(this.match.teams);
  }
  this.updateBattle = function () {
    var teamEl = $('.j-update').parent()[0];
    this.elToModel(teamEl);
    // var matchName = teamEl.dataset.match;
    // var matchIndex = matches.findMatch(matchName);
    var teams = this.match.teams;
    this.match.createBattle(teams);
    console.log(this.match.battles);
  }
  this.addAndUpdate = function () {
    this.addTeam();
    this.updateBattle();
  }
  // 将元素映射到模型
  this.elToModel = function (teamEl) {
    var matchName = teamEl.dataset.match;
    var matchIndex = matches.findMatch(matchName);
    this.team = teamEl.dataset.team;
    this.match = matches.matchList[matchIndex];
  }
}