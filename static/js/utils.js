

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
var emotion_info_board;
var flag_play = false;

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
    
    expand(document.getElementById("video_"));
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

		var MIME_TYPE = "image/png";
		var imgURL = photo_.toDataURL(MIME_TYPE).split(",")[1];

		var ctx = photo_.getContext('2d');
		ctx.drawImage(video, 0, 0);
        console.log(video.videoWidth);
        console.log(video.videoHeight);
        //把canvas图像转为img图片
        //img.src = photo_.toDataURL("image/png");
        arr = ctx.getImageData(0,0,video.videoWidth, video.videoHeight).data

        send(arr);
        var box = document.getElementById("faceBox");
        box.style.top=(100+(photo_.height-100)/2)+"px";
        main_show(1);
        face_location_status.innerHTML="Finding...";
	}

}

function toL(ctx, width, height)
{
	var c=ctx.getImageData(0,0,width, height);
	data_="";
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
		data_=data_ + data_line;
	}
}
/*
Camera catching program (CCP)

*******End **********
 */




 /*
 Face Box
 ****Begin*****
 */

function locateFace(data)
{
	var box = document.getElementById("faceBox");
	console.log(data)
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
		}
	}
	data_[num]=parseInt(data.substring(last,len));
	box.style.height=(data_[2]-data_[0])+"px";
	box.style.top=(data_[2])+"px";
	box.style.left=(data_[3]+(800-photo_.width)/2)+"px";
	box.style.width=(data_[1]-data_[3])+"px";
	box.style.marginTop="-"+box.style.height;
	box.style.backgroundImage="url('/static/pic/Face_Found.svg')";

}

/*
 Face Box
 ****End*****
 */


/*
switch btn
*****Start*****
*/
function send(data__)
{
    $.ajax({
        url:"/send",
        type:"POST",
        data: data__,
        datatype:"json",
        async:true,
        cache:false,
        contentType:"application/json",
        processData:false,
        success:function(returndata){
            processMessage(returndata)
        },
        error:function(returndata){
            alert(returndata)
        }
    })
}

function play_audio()
{
	if (!flag_play) {alert("you have to take a pic first!");return ;}
	main_show(4);
	var audio = document.getElementById("audio");
	audio.src = "gen_audio";
	$(".play_pause").playmusic();
	expand(document.getElementById("expandable_music_board"));
}
var face_location_status = document.getElementById("face_location_status");
var server_status_board = document.getElementById("server_status_board");
var face_location_status_board = document.getElementById("face_location_status_board");

 function processMessage(message)
 {
 	console.log(message)
 	if(message=="failed")
	{
		face_location_status.innerHTML="Failed";
		face_location_status.setAttribute("class", "title title-2 right red");
		face_location_status_board.setAttribute("class", "main-board bg-red");
		alert("Face recognition failed! Maybe it's to dark! Or you are out of internet!");
	}
	else if(message=="[]"){alert("Internet is slow, so I cannot get the data!")}
	else {
		var len = message.length;
		var locations = message.substring(0,len-2),
		emotion = message.substring(len-1, len);
		console.log([locations, emotion])
		locateFace(locations);
		show_emotion_info(parseInt(emotion));
		face_location_status.innerHTML="Sucessed";
		face_location_status.setAttribute("class", "title title-2 right white");
		face_location_status_board.setAttribute("class", "main-board bg-green");
		//允许播放音乐
		flag_play = true;

	}
 }

var emotion_fun = {1:"happy"};

 function show_emotion_info(emotion)
 {
 	emotion_info_board = document.createElement("div");
 	face_location_status.parentElement.parentElement.appendChild(emotion_info_board);
 	emotion_info_board.outerHTML = "<div class='title-2-board sub-basic' style='background-color:white;'><div class='title title-2'>It Seems you are "+"<strong>"+emotion_fun[emotion]+"</strong></div>";
 }