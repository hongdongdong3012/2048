var y,x; // player
const MY=50, MX=50; //필드
var snakeQueue = new Array();
const snakeColor = "#ED5B5B",
    tileColor = "#EEEEEE"
    wallColor = "#2E2E2E",
    coinColor = "#4476C6";

init();

// 키보드 입력 이벤트 처리
document.onkeydown = keyDownEventHandler;
function keyDownEventHandler(e){
    if(e.keyCode==38 && direction!=1) direction = 0; // up
    else if(e.keyCode==40 && direction!=0) direction = 1; // down
    else if(e.keyCode==37 && direction!=3) direction = 2; // left
    else if(e.keyCode==39 && direction!=2) direction = 3; // right
}


// 초기설정
function init() {
    drawBoard();
    drawWall();
    y=parseInt(MY/2);
    x=parseInt(MX/2);
    setSnake(y,x);
    score=0;
    direction=-1;
    speed=75;
    keepMove = setInterval("move(direction)",speed);
}

//보드판 표시
function drawBoard() {
    let boardTag = "<table border=0>"
    for (let i = 0; i<MY; i++) {
        boardTag += "<tr>"
        for(let j = 0; j < MX; j++) {
            boardTag += `<td id='${i} ${j}'></td>`
        }
        boardTag += "</tr>"
    }
    boardTag += "</table>"
    document.write(boardTag);
}

//벽 표시
function drawWall(){
    let wallCell = new Array(); //1
    for(let i=0;i<MY; i++) wallCell.push(new Array(i,0)); //2
    for(let i=0;i<MX; i++) wallCell.push(new Array(0, i)); //3
    for(let i=0;i<MY; i++) wallCell.push(new Array(i, MY-1)) //4
    for(let i=0;i<MX; i++) wallCell.push(new Array(MX-1, i)) //5

    console.log(wallCell);
    for(let i=0;i<wallCell.length;i++){
        
        let wy = wallCell[i][0];
        let wx = wallCell[i][1];
        document.getElementById(String(wy)+" "+String(wx)).style.background = wallColor;
        document.getElementById(String(wy)+" "+String(wx)).style.borderRadius = "1.5px";

    }
}

// 뱀 표시
function setSnake(y,x){
    snakeQueue.push(new Array(y,x));
    document.getElementById(String(y)+" "+String(x)).style.background = snakeColor;
}
function removeSnake(){
    var ty = snakeQueue[0][0];
    var tx = snakeQueue[0][1];
    snakeQueue.shift();
    document.getElementById(String(ty)+" "+String(tx)).style.background = tileColor;
}

// 뱀 조작
function move(direction){
    switch(direction){
        case 0: y-=1; break;
        case 1: y+=1; break;
        case 2: x-=1; break;
        case 3: x+=1; break;
        default: return;
    }

    setSnake(y,x);

}



/*
1. 1차원 배열을 생성한다. 
2. 2차원 배열을 생성해서 넣는데 가로로 0 0 ~ 0 49

*/