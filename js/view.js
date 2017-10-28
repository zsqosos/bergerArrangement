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

function upDateModifyView(data) {
  var modifyElIndex = data.index + 1;
  $($('.j-team')[modifyElIndex]).find('.j-team-name').text(data.newName);
  $($('.j-team')[modifyElIndex])[0].dataset.team = data.newName;
}

function upDateRemoveView(data) {
  var removeElIndex = data.index + 1;
  $($('.j-team')[removeElIndex]).remove();

  updateLenght(data.teamLength);
}

function updateLenght(num) {
  $('.j-total-team').text(num);
}

function updateBattleView(data) {
  var battleEl = $('.j-battle-origin').clone(true).removeClass('j-battle-origin hide');
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

  $('#battleM').after(battleEl).remove();
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