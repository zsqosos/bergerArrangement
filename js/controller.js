/**
 * 处理点击事件
 */
function HandleClick() {
  // 定义当前被点击的比赛和队伍
  this.match = null;
  this.team = null;

  this.addMatch = function () {
    var matchName = $('.j-match-name').val();
    $('.j-match-name').val('');
    // 空字符未做处理
    if (matchName.length === 0) {
      return
    }
    var addMatchResult = matches.addMatch(matchName);
    if (addMatchResult) {
      currentMatchIndex = matches.matchList.length - 1;
      this.match = matches.matchList[currentMatchIndex];
      this.updateBattle();
    }
    // console.log(matches.matchList)
  }

  this.selectedTeam = function (e) {
    var teamEl = $(e.target).parent()[0];
    this.setCurrentTeam(teamEl);
  }


  this.modifyTeam = function () {
    var newName = $('.j-team-modify-input').val();
    $('.j-team-modify-input').val('');
    this.match.modifyTeam(this.team, newName);
    // console.log(this.match.teams);
  }

  this.removeTeam = function () {
    this.match.removeTeam(this.team);
  }

  this.addTeam = function () {
    // this.match = matches.matchList[currentMatchIndex];
    var team = $('.j-team-add-input').val();
    $('.j-team-add-input').val('');
    // 空字符未做处理
    if (team.length === 0) {
      return
    }
    this.match.addTeam(team);
    // console.log(this.match.teams);
  }

  this.updateBattle = function (e) {
    if (e) {
      e.stopPropagation();
    }
    var teams = this.match.teams;
    this.match.createBattle(teams);
  }

  this.addAndUpdate = function () {
    this.addTeam();
    this.updateBattle();
  }

  // 根据被点击的元素设置当前队伍
  this.setCurrentTeam = function (teamEl) {
    this.team = teamEl.dataset.team;
  }

  this.setCurrentMatch = function (e) {
    var matchName = e.target.dataset.match;
    if (currentMatchIndex === matches.findMatch(matchName)) return;
    currentMatchIndex = matches.findMatch(matchName);
    this.match = matches.matchList[currentMatchIndex];
    this.updateBattle();
  }

  this.init = function () {
    this.match = matches.matchList[currentMatchIndex];
  }
}