

/*
@author:Arron_liu
@description: this is a simple js script for the web app , which is about face recognization and music producting.
@parts:
	Camera cathching program
	Left (Board) Show
	Left Board Generation
	Expandable
	Face Box
	Connection & Processing
 */


/*
Camera catching program (CCP)

*******Starting **********
 */



var video = document.getElementById('cam');
var video_btn = document.getElementById("cam-ctrl");	
var cameraStream = null; 
var cameraFlag = false;  
//get video stream
navigator.getMedia = navigator.getUserMedia ||
                     navagator.webkitGetUserMedia ||
                     navigator.mozGetUserMedia ||
                     navigator.msGetUserMedia;

video_btn.onclick=function()
{
	if(!cameraFlag)
	{navigator.getUserMedia({video:true,audio: false }, onSuccess, function(e){});cameraFlag=true;
	function onSuccess(stream) {
	    video.srcObject=stream;
	    cameraStream = stream;
	}cameraFlag=true;}
	openCam();
}
function openCam()
{
	var cam_ctrl = document.getElementById("cam-ctrl");
	if(cam_ctrl.checked)
	{
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
var data_;
var img = document.getElementById("img");


function getPic()
{
	
	if(video.paused)
	{
		alert("Please open The Camera first!")
		return;
	}
	else
	{
		photo_.height =video.videoHeight;
		photo_.width = video.videoWidth;
		var ctx = photo_.getContext('2d');
		ctx.drawImage(video, 0, 0);
        console.log(video.videoWidth);
        console.log(video.videoHeight);
        //把canvas图像转为img图片
        //img.src = photo_.toDataURL("image/png");
        toL(ctx,photo_.width, photo_.height)

        var box = document.getElementById("faceBox");
        box.style.top=(100+(photo_.height-100)/2)+"px";
        main_show(1);
        face_location_status.innerHTML="Finding...";
	}
	send();
}

function toL(ctx, width, height)
{
	var c=ctx.getImageData(0,0,width, height);
	data_=new Array();
	for(var i=0;i<height;i++)
	{
		var data_line="";
		for(var j=0;j<width;j++)
		{
			var x=(i*4)*width+(j*4);
            var r=c.data[x];
            var g=c.data[x+1];
            var b=c.data[x+2];
            var gray=0.229*r+0.587*b+0.114*g;
            data_line=data_line+String.fromCharCode(parseInt(gray));
		}
		data_[i]=data_line;
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
Left Show
*********End***
 */


/*
Left Board Generation
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

Left Board Generation
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

 /*
 Face Box
 ****Begin*****
 */

function locateFace(data)
{
	var box = document.getElementById("faceBox");
	data=data.substring(2,data.length-2);
	var data_=new Array();
	console.log(data);
	var num =0;
	var last=0;
	var len = data.length;
	for(var i = 0; i<len;i++)
	{
		if(data[i]!=',')continue;
		else 
		{
			data_[num]=parseInt(data.substring(last,i));
			last=i+1;
			num++;
			console.log(data_[num-1]);
		}
	}
	data_[num]=parseInt(data.substring(last,len));
	console.log(data_[3]);
	box.style.height=(data_[2]-data_[0])+"px";
	box.style.top=(data_[2])+"px";
	box.style.left=(data_[3]+(800-photo_.width)/2)+"px";
	box.style.width=(data_[1]-data_[3])+"px";
	box.style.marginTop="-"+box.style.height;
	box.style.backgroundImage="url('./pic/Face_Found.svg')";

}

/*
 Face Box
 ****End*****
 */

/*
Connection & Processing
****Begin****
*/
var server_status = document.getElementById("server_status");
var face_location_status = document.getElementById("face_location_status");
var server_status_board = document.getElementById("server_status_board");
var face_location_status_board = document.getElementById("face_location_status_board");
 function sucessedConnection()
 {
 	server_status.innerHTML="connected";
	server_status.setAttribute("class", "title title-2 right white");
	server_status_board.setAttribute("class", "main-board bg-green");
	console.log("ws connected!");
 }
 function closedConnection()
 {
 	server_status.innerHTML="closed";
	server_status.setAttribute("class", "title title-2 right white");
	server_status_board.setAttribute("class", "main-board bg-red");
	console.log("ws closed!");
 }

 function processMessage(message)
 {
 	if(message.data=="failed")
	{
		face_location_status.innerHTML="Failed";
		face_location_status.setAttribute("class", "title title-2 right red");
		face_location_status_board.setAttribute("class", "main-board bg-red");
		alert("Face recognition failed! Maybe it's to dark! Or you are out of internet!");
	}
	else if(message.data=="[]"){alert("Internet is slow, so I cannot get the data!")}
	else {
		locateFace(message.data);
		face_location_status.innerHTML="Sucessed";
		face_location_status.setAttribute("class", "title title-2 right white");
		face_location_status_board.setAttribute("class", "main-board bg-green");
	}
 }
/*
Connection & Processing
****End****
*/

/*
switch btn
*****Start*****
*/