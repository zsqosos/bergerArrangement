// 监听model变化,执行相关视图函数
GlobalEvents.on('addTeam', upDateAddView);
GlobalEvents.on('modifyTeam', upDateModifyView);
GlobalEvents.on('removeTeam', upDateRemoveView);
GlobalEvents.on('createBattle', updateBattleView);
GlobalEvents.on('addMatch', updateAddMatch);
GlobalEvents.on('dataExisted', teamExistedView);

// 提示框设置
toastr.options.positionClass = 'toast-bottom-right';
toastr.options.timeOut = 2500;

function upDateAddView(data) {
  var newTeamEl = $('.j-team-origin').clone(true).removeClass('j-team-origin hide');
  newTeamEl.attr('title', data.team);
  newTeamEl.find('.j-team-name').text(data.team);
  newTeamEl.find('img').attr('src', './image/' + Math.ceil(Math.random() * 29) + '.jpg')
  newTeamEl[0].dataset.match = matches.matchList[currentMatchIndex].name;
  newTeamEl[0].dataset.team = data.team;

  var rootEl = $('#panes_' + (currentMatchIndex + 1));
  newTeamEl.insertBefore(rootEl.find('.j-add-team'));

  updateLenght();
  // toastr.success('队伍添加成功，请更新对战列表');
}

function upDateModifyView(data) {
  var modifyElIndex = data.index;
  var rootEl = $('#panes_' + (currentMatchIndex + 1));
  $(rootEl.find('.j-team')[modifyElIndex]).attr('title', data.newName).find('.j-team-name').text(data.newName);
  $(rootEl.find('.j-team')[modifyElIndex])[0].dataset.team = data.newName;
}

function upDateRemoveView(data) {
  var removeElIndex = data.index;
  var rootEl = $('#panes_' + (currentMatchIndex + 1));
  $(rootEl.find('.j-team')[removeElIndex]).remove();

  updateLenght();
  // toastr.info('队伍已删除');
}

function updateLenght() {
  var total = matches.matchList[currentMatchIndex].teams.length;
  var rootEl = $('#panes_' + (currentMatchIndex + 1));
  rootEl.find('.j-total-team').text(total);
}

function updateBattleView(data) {
  // 移除其它对战表
  $('.j-battle-content').remove();

  var rootEl = $('#panes_' + (currentMatchIndex + 1));

  // 若队伍过少,则显示无队伍
  if (!data) {
    var noTeamEl = $('.j-no-team-origin').clone(true).removeClass('j-no-team-origin').addClass('j-battle-content');
    rootEl.find('.j-battle').append(noTeamEl);

    // 弹出提示 
    toastr.warning('比赛队伍过少，请先添加比赛队伍');
    return;
  }

  // 根据比赛对战情况渲染对战表
  var battleEl = $('.j-battle-origin').clone(true).removeClass('j-battle-origin hide').addClass('j-battle-content');
  var tabNavEl = battleEl.find('.j-nav-tabs');
  var tabContentEl = battleEl.find('.j-tab-content');
  var tabEl = $('.j-tab-origin');
  var paneEl = $('.j-pane-origin');
  var tableRowEl = $('.j-table-row-origin');

  for (var i = 0; i < data.length; i++) {
    var newTabEl = tabEl.clone(true).removeClass('j-tab-origin hide').addClass('j-tab');
    newTabEl.find('a').attr('href', '#pane_' + (i + 1)).find('.round').text(handleNum(i + 1));
    tabNavEl.append(newTabEl);

    var newPaneEl = paneEl.clone(true).removeClass('j-pane-origin');
    newPaneEl.attr('id', 'pane_' + (i + 1));
    if (i === 0) {
      newTabEl.addClass('active');
      newPaneEl.addClass('active');
    }
    var tableEl = newPaneEl.find('.j-table');
    for (var j = 0; j < data[i].length; j++) {
      var newTableRow = tableRowEl.clone(true).removeClass('j-table-row-origin');
      newTableRow.find('.order').text(j + 1);
      newTableRow.find('.round').text(handleNum(i + 1));
      newTableRow.find('.left-team').text(data[i][j][0]);
      newTableRow.find('.right-team').text(data[i][j][1]);

      tableEl.append(newTableRow);
      tableEl.find('.j-table-row-origin').remove();
    }
    tabContentEl.append(newPaneEl);
  }
  battleEl.find('.j-nav-tabs .j-tab-origin').remove();
  battleEl.find('.j-tab-content .j-pane-origin').remove();
  // 插入对战表
  rootEl.find('.j-battle').append(battleEl);
}

function updateAddMatch(data) {
  var matchListEl = $('.j-match-list-origin').clone(true).removeClass('j-match-list-origin hide').addClass('active');
  var matchContentEl = $('.j-match-origin').clone(true).removeClass('j-match-origin hide').addClass('active');
  matchListEl.find('a').attr('href', '#panes_' + data.matchesLength).text(data.newMatch.name);
  matchListEl.find('a')[0].dataset.match = data.newMatch.name;
  matchContentEl.attr('id', 'panes_' + data.matchesLength);

  $('.j-match-nav').find('li').removeClass('active');
  $('.j-match-nav').append(matchListEl);
  $('.j-match-content').find('div').removeClass('active');
  $('.j-match-content').append(matchContentEl);
}

function teamExistedView(data) {
  toastr.warning(data + '已存在');
}

// 將99以内的数字转化为汉字
function handleNum(num) {
  if (num > 99 || num < 1) return;
  var charItems = ['十', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
  var numStr, temp;
  if (num > 0 && num <= 10) {
    return charItems[num];
  } else if (num > 10 && num < 20) {
    numStr = num.toString();
    return charItems[0] + charItems[numStr[1]];
  } else {
    numStr = num.toString();
    temp = [];
    for (var i = 0; i < numStr.length; i++) {
      temp.push(charItems[numStr[i]]);
    }
    if (temp[temp.length - 1] !== charItems[0]) {
      temp.splice(-1, 0, charItems[0]);
    }
    return temp.join('');
  }
}