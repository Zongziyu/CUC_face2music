var eyes = document.getElementsByClassName("border");

var height = document.body.clientHeight
var width = document.body.clientWidth
var top_=185
var bottom_ = 185+50
var left_ = width/2 - 45
var right_ = width/2 + 5
document.body.onmousemove = function(e)
{
	var x = e.clientX;
	var y = e.clientY;

    var top__ = y-top_-15
    var left__ = x-left_
    var right__ = x-right_
    if(right__ < 0)right__ = 0;
    else if(right__>10)right__ = 10;
    if(left__ < 0)left__ = 0;
    else if(left__>10)left__ = 10;
    if(top__<0)top__ = 0;
    else if(top__>20)top__ = 20;
    eyes[0].firstElementChild.style.top=top__+"px"
	eyes[0].firstElementChild.firstElementChild.style.top=((top__/4) * 3)+"px"
	eyes[1].firstElementChild.style.top=top__+"px"
	eyes[1].firstElementChild.firstElementChild.style.top=((top__/4) * 3)+"px"
	eyes[0].firstElementChild.style.left=left__+"px"
	eyes[0].firstElementChild.firstElementChild.style.left=((left__/4)*6)+"px"
	eyes[1].firstElementChild.style.left=right__+"px"
	eyes[1].firstElementChild.firstElementChild.style.left=((right__/4)*6)+"px"
}

var open_eyes;

function close_eyes()
{
	eyes[0].firstElementChild.style.height="1px"
	eyes[1].firstElementChild.style.height="1px"
	setTimeout("open_eyes()", 300)
}
open_eyes =  function ()
{
	eyes[0].firstElementChild.style.height="30px"
	eyes[1].firstElementChild.style.height="30px"
	setTimeout("close_eyes()", 3000)
}

window.onload = function(){setTimeout("close_eyes()",3000);}