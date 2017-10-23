/**
 * 处理点击事件
 */
function HandleClick() {
  // 定义当前比赛和队伍
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
    // console.log(matches.matchList)
  }

  // this.modifyTeam = function (e) {
  //   var teamEl = $(e.target).parent()[0];
  //   this.elToModel(teamEl);
    // this.teamInputEl = $(e.target).siblings('.j-input-wrapper');
    // this.teamInputEl.show();
  // }

  // 确保在modifyTeam后执行
  this.modifyTeamComplete = function () {
    var newName = $('.j-team-modify-input').val();
    this.match.modifyTeam(this.team, newName);
    console.log(this.match.teams);
    // console.log(this.teamInputEl.find('.j-team-input'))
    // var newName = this.teamInputEl.find('.j-team-input').val();
    // console.log(newName);
    // this.match.modifyTeam(this.team, newName);
    // console.log(this.match.teams);
  }

  // this.removeTeam = function (e) {
  //   var teamEl = $(e.target).parent()[0];
  //   this.elToModel(teamEl);
  // }

  this.removeTeamComplete = function () {
    this.match.removeTeam(this.team);    
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
    // console.log(this.match.teams);
  }

  this.updateBattle = function (e) {
    e.stopPropagation();
    var teamEl = $('.j-update').parent()[0];
    this.elToModel(teamEl);
    // var matchName = teamEl.dataset.match;
    // var matchIndex = matches.findMatch(matchName);
    var teams = this.match.teams;
    this.match.createBattle(teams);
    // console.log(this.match.battles);
  }

  this.addAndUpdate = function () {
    this.addTeam();
    this.updateBattle();
  }

  // 将点击的元素映射到模型
  this.clickElToModel = function (event) {
    var teamEl = $(event.target).parent()[0];
    var matchName = teamEl.dataset.match;
    var matchIndex = matches.findMatch(matchName);
    this.team = teamEl.dataset.team;
    this.match = matches.matchList[matchIndex];
  }
}