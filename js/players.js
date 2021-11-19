const players = [
    {num: 1, type: "伝統拳術A", style: "形意拳", name:"縄稚俊介", exclude: false},
    {num: 2, type: "伝統拳術A", style: "開門腰八極拳", name:"辻　真緒", exclude: false},
    {num: 3, type: "伝統拳術A", style: "形意拳", name:"縄稚俊介", exclude: false},
    {num: 4, type: "伝統拳術A", style: "形意拳", name:"縄稚俊介", exclude: false},
    {num: 5, type: "伝統拳術A", style: "形意拳", name:"縄稚俊介", exclude: true},
    {num: 6, type: "伝統拳術A", style: "形意拳", name:"縄稚俊介", exclude: false},
];

const scores = [0, 1, 2, 3];

const votersSelectList = document.getElementById("__voters-list");
// 出場者のDOMリスト
players.forEach((player) => {
    const optionSelector = document.createElement('option');
    const text = `${player.num} ${player.style} ${player.name}`;
    optionSelector.innerText = text;
    votersSelectList.appendChild(optionSelector);
});

// 選択肢（入力要素）
const createScoreInfo = (playerNum) => {
    const scoreInfo = document.createElement('div');
    scoreInfo.classList.add('score-box');
    scores.forEach(score => {
        const scoreContent = document.createElement('label');
        scoreContent.classList.add('form-check', 'score-box-content');
        const input = document.createElement('input');
        input.type = "radio";
        input.name = `player-${playerNum}`;
        input.value = score;
        if (score < 1) {
            input.checked = true;
        }
        const scoreLabel = document.createElement('span');
        scoreLabel.classList.add("score-box-label");
        scoreLabel.innerHTML = `${score}`;
        scoreContent.appendChild(input);
        scoreContent.appendChild(scoreLabel);
        // 
        scoreInfo.appendChild(scoreContent);
    });
    return scoreInfo;
};

const playerScoreList = document.getElementById("__player-score-list");
// 選択肢本体
players.forEach((player) => {
    const playerBox = document.createElement('div');
    playerBox.classList.add('input-group', 'form-check');

    const playerInfo = document.createElement('div');
    playerInfo.classList.add('player-info');
    const nameStyleBox = document.createElement('div');
    nameStyleBox.classList.add('name-style');
    nameStyleBox.innerHTML = `${player.num} ${player.style}`;
    const nameBox = document.createElement('div');
    nameBox.classList.add('name');
    nameBox.innerHTML = `${player.name}`;
    playerInfo.appendChild(nameStyleBox);
    playerInfo.appendChild(nameBox);
    
    playerBox.appendChild(playerInfo);

    if (player.exclude) {
        const scoreMessage = document.createElement('div');
        scoreMessage.innerText = `投票対象外`;
        playerBox.appendChild(scoreMessage);
    } else {
        const scoreInfo = createScoreInfo(player.num);
        playerBox.appendChild(scoreInfo);
    }

    playerScoreList.appendChild(playerBox);
});

const MAX_POINT = 15;

window.addEventListener("DOMContentLoaded" , ()=> {
    // 計算
    const calcSumPoint = () => {
        var sumPoint = 0;
        const inputList = document.querySelectorAll('input[type="radio"]');
        for(var i = 0; i < inputList.length; i++) {
            if (inputList[i].checked) {
                const inputPoint = parseInt(inputList[i].value);
                sumPoint += inputPoint;
            }
        }
        return sumPoint; 
    }

    // イベント登録
    const form = document.getElementById('__player-score-list');
    form.addEventListener("change", e => {
        if (e.target.type !== "radio") return;
        // 入力値を計算
        const sumPoint = calcSumPoint();
        const remainPoint = MAX_POINT - sumPoint;

        // DOM要素の更新
        const pointElements = document.getElementsByClassName("__remain-point");
        for( var i = 0; i < pointElements.length; i++ ){
            pointElements[i].innerText = `${remainPoint}点`;
        }

        // 投票ボタンを無効にする
        const submitButton = document.getElementById("__submit");
        if (remainPoint < 0) {
            submitButton.classList.remove('btn--green');
            submitButton.classList.add('btn--gray');
            submitButton.disabled = true;
        } else {
            submitButton.classList.remove('btn--gray');
            submitButton.classList.add('btn--green');
            submitButton.disabled = false;
        }
    })
});