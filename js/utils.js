

/*
@author:Arron_liu
@description: this is a simple js script for the web app , which is about face recognization and music producting.

 */


/*
Camera catching program (CCP)

*******Starting **********
 */



var video = document.getElementById('cam');	
var cameraStream = null; 
var cameraFlag = false;  
//get video stream
navigator.getMedia = navigator.getUserMedia ||
                     navagator.webkitGetUserMedia ||
                     navigator.mozGetUserMedia ||
                     navigator.msGetUserMedia;
navigator.getUserMedia({video:true,audio: false }, onSuccess, function(e){});cameraFlag=true;
function onSuccess(stream) {
	    video.srcObject=stream;
	    cameraStream = stream;
}
function openCam()
{
	var cam_ctrl = document.getElementById("cam-ctrl");
	if(cam_ctrl.checked)
	{
		if(!cameraFlag)
	  	{}
	  	video.play();
	  	video.style.display="block";
		//get right of camera & call function and recieve stream
		
	}
	else
	{
		video.pause();
		video.style.display="none";
	}
    
    expand(cam_ctrl.parentElement.parentElement.previousElementSibling.previousElementSibling.firstElementChild);
}


var photo_ = document.getElementById("photo_");

var img = document.getElementById("img");
function getPic()
{
	
	if(video.paused)
	{
		new $.zui.Messager('Please open the Camera.', {
        icon: 'bell', // 定义消息图标
        placement:'center'
    }).show();
		return;
	}
	else
	{
		photo_.height =video.videoHeight;
		photo_.width = video.videoWidth;
		photo_.getContext('2d').drawImage(video, 0, 0);
        console.log(video.videoWidth);
        console.log(video.videoHeight);
        //把canvas图像转为img图片
        //img.src = photo_.toDataURL("image/png");
        main_show(1);
	}
}

/*
Camera catching program (CCP)

*******End **********
 */

/*
Left Show
*********Start******
 */
var Left = document.getElementById("Left_bar");
var left = document.getElementById("left_bar");
function left_show()
{
	
	Left.style.display = "block";
	left.style.left="0px";
}

function left_hide()
{
	Left.style.display = "none";
	left.style.left="-250px";
}
/*
*********End***
 */


/*
left generation

*******Start*******
 */
var left_list = document.getElementsByClassName("board");
var left_length = left_list.length;
var left_list_box = document.getElementById("left_list_box");
for(var i = 0; i < left_length; i++)
{
	left_list_box.innerHTML += "<div class='left-list-node' onclick='main_show("+i+")'><div class='"+left_list[i].childNodes[1].childNodes[1].getAttribute("class")+"'></div><div class='title left-list-node-title'>"+left_list[i].childNodes[1].childNodes[3].innerHTML+"</div></div>"; 
}


var default_num = 0;
function main_show(num)
{
	left_list[default_num].style.display="none";
	left_list[num].style.display = "block";
	default_num = num;
	left_hide();
}
/*

left generation
*********End************
 */


/*
Expandable 
*******Starting**********
 */
function expand(top)
{
	var next = top.nextElementSibling;
	if(! next.getAttribute("class")=="expand-board") return;
	if(top.getAttribute("expand")==0)
	{
		next.style.height = next.getAttribute("param")+"px";
		top.setAttribute("expand",1);
	}
	else
	{
		next.style.height = "0px";
		top.setAttribute("expand", 0);
	}
}

/*
Expandable 
*******End**********
 */