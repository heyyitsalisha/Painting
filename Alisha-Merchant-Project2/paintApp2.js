let colorList = [];
//let drawVal = false;
let i = 0;
let currentColor = colorList[i];
let stopVar = 0;

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
const width = 600;
const height = 600;

let brush =
{
    currentX : undefined,
    currentY : undefined,
    lineSize : 1,
    drawVal : false
};

function draw(event)
{
    if (brush.drawVal == true)
    {
        ctx.beginPath();
        ctx.strokeStyle = document.getElementById("colorSelector").value;
        ctx.lineWidth = brush.lineSize;
        //ctx.fillStyle = document.getElementById("colorSelector").value;
        if (brush.currentX == undefined || brush.currentY == undefined)
            ctx.moveTo(event.offsetX, event.offsetY);
        else
        {
            ctx.moveTo (brush.currentX, brush.currentY);
            ctx.lineTo(event.offsetX, event.offsetY);
        }
        //ctx.arc(event.offsetX, event.offsetY,5,0,2*Math.PI);
        //ctx.fill();
        ctx.stroke();
        brush.currentX = event.offsetX;
        brush.currentY = event.offsetY;
    }
}

function drawValTrue()
{
    brush.drawVal = true;
}

function drawValFalse()
{
    brush.drawVal = false;
    brush.currentX = undefined;
    brush.currentY = undefined;
}

function eraseCanvas(event)
{
    if (event.key == "R" || event.key == "r")
        ctx.clearRect(0, 0, width, height);
}

function rememberMe()
{
    let color = document.getElementById("colorSelector").value;
    colorList.push(color);
    document.getElementById("colorListResult").innerHTML = colorList.toString();
    i++;
}

function resetColorArray(event)
{
    if (event.key == "E" || event.key == "e")
    {
        colorList=[];
        document.getElementById("colorListResult").innerHTML = "No colors stored!";
    }
}

function changeLineWidth(event)
{
    if (event.key == "ArrowUp")
        brush.lineSize ++;
    else if (event.key == "ArrowDown")
        brush.lineSize --;
}

let isPressed = false;
let cycleInterval;
function cycleColors()
{
    i = 0; 
    console.log(" in cycle colors" );
    if(!isPressed)
    {
        cycleInterval= setInterval (colorInterval, 2000);
        function colorInterval()
        {
            console.log(" in cycle interval " + colorList[i] );
            ctx.beginPath();
            ctx.fillStyle = colorList[i];
            ctx.fillRect(0, 0, width, height);
            ctx.fill();
            i++;
            if (i > colorList.length-1)
                i=0;
        }
        isPressed = true;
    }
}

function stopCycle()
    {
        clearInterval (cycleInterval);
        isPressed = false;
    }



canvas.addEventListener("mousedown", drawValTrue);
canvas.addEventListener("mouseup", drawValFalse);
canvas.addEventListener("mousemove", draw);

document.addEventListener("keydown", eraseCanvas);
document.addEventListener("keydown", resetColorArray);
document.addEventListener("keydown", changeLineWidth);

let rememberClick = document.getElementById("rememberButton");
rememberClick.onclick = rememberMe;
let cycleClick = document.getElementById("cycleButton");
cycleClick.onclick = cycleColors;
let stopClick = document.getElementById("stopButton");
stopClick.onclick = stopCycle;
