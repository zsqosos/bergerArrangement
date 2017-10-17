/**
 * 比赛类
 * @param {String} name 
 * @param {Array} teams 
 */
function Match(name, teams) {
  this.name = name;
  this.teams = teams || [];
  this.battles = [];
}

Match.prototype.addTeam = function (team) {
  // 判断添加名称是否已存在
  var isExisted = this.findTeam(team);
  if (isExisted !== -1) {
    return;
  }
  this.teams.push(team);
  return this.teams;
}

Match.prototype.modifyTeam = function (team, newName) {
  var index = this.findTeam(team);
  if (index === -1) {
    return;
  }
  // 判断新名称是否已存在
  var isExisted = this.findTeam(newName);
  if (isExisted !== -1) {
    return;
  }
  this.teams[index] = newName;
  return this.teams;
}

Match.prototype.removeTeam = function (team) {
  var index = this.findTeam(team);
  if (index === -1) {
    return;
  }
  this.teams.splice(index, 1);
  return this.teams;
}

Match.prototype.findTeam = function (team) {
  return this.teams.indexOf(team);
}

Match.prototype.createBattle = function () {
  this.battles = bergerArrange(this.teams);
  return this.battles;
}


function Matches() {
  this.matchList = [];
}

Matches.prototype.initialize = function () {
  var initData = this.getInitData();
  this.matchList.push(initData);
  return this.matchList;
}

Matches.prototype.getInitData = function () {
  var name = '马老师水友赛(示例)';
  var teams = ['皮皮螃战队', '得了急战队', '任里皮战队', '愣头青战队', '铁头娃战队', '石乐志战队', '皮皮马战队'];
  var MATCH_1 = new Match(name, teams);
  return MATCH_1;
}

Matches.prototype.addMatch = function (matchName) {
  var isExisted = this.findMatch(matchName);
  if (isExisted !== -1) {
    return;
  }
  var newMatch = new Match(matchName);
  this.matchList.push(newMatch);
  return this.matchList;
}

Matches.prototype.findMatch = function (matchName) {
  var index = -1;
  for (var i = 0; i < this.matchList.length; i++) {
    if(matchName===this.matchList[i].name){
      index = i;
      return index;
    }
  }
  return index;

}