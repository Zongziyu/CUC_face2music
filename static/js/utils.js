

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
		change_status("camera", 1)
		
	}
	else
	{
		video.pause();
		video.style.display="none";
		change_status("camera", 0);
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
    change_status(target="face", 1)
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
	music_v();
}

var face_location_status = document.getElementById("face_location_status");
var server_status_board = document.getElementById("server_status_board");
var face_location_status_board = document.getElementById("face_location_status_board");

 function processMessage(message)
 {
    var len = message.length;
    var locations = message.substring(0,len-2),
    emotion = message.substring(len-1, len);
    console.log([locations, emotion])
 	if(locations=="failed")
	{
		face_location_status.innerHTML="Failed";
		face_location_status.setAttribute("class", "title title-2 right");
		face_location_status_board.setAttribute("class", "main-board bg-red");
		alert("Face recognition failed! Maybe it's to dark! Or you are out of internet!");
	}
	else if(message==""){alert("Internet is slow, so I cannot get the data!")}
	else {

		locateFace(locations);
		show_emotion_info(parseInt(emotion));
		face_location_status.innerHTML="Sucessed";
		face_location_status.setAttribute("class", "title title-2 right white");
		face_location_status_board.setAttribute("class", "main-board bg-green");
		//允许播放音乐
		flag_play = true;

	}
 }

var emotion_fun = {0:"angry",1:"disgust", 2:"fear", 3:"happy",4:"sad",5:"surprised",6:"normal"};

 function show_emotion_info(emotion)
 {
    change_status("emotion", 1)
 	emotion_info_board = document.createElement("div");
 	face_location_status.parentElement.parentElement.appendChild(emotion_info_board);
 	emotion_info_board.outerHTML = "<div class='title-2-board sub-basic' style='background-color:white;'><div class='title title-2'>It Seems you are "+"<strong>"+emotion_fun[emotion]+"</strong></div>";
 }

 function time_line_show(){
    var chart = $(function () {
    $('#figure-timeline').highcharts({
        chart: {
            zoomType: 'x'
        },
        title: {
            text: ' '
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
            'Click and drag in the plot area to zoom in' :
            'Pinch the chart to zoom in'
        },
        xAxis: {
            type: 'datetime',
            labels: {
                formatter: function() {
                    return  Highcharts.dateFormat('%Y-%m-%d', this.value);
                },
            },
        },
        yAxis: {
            title: {
                text: '数量'
            },
            labels: {
    formatter:function(){
      if(this.value ==0) {
        return "Angry("+this.value+")";
      }else if(this.value ==1) {
        return "Disgust("+this.value+")";
      }else if(this.value ==2) {
        return "Fear("+this.value+")";
      }else if(this.value ==3) {
        return "Happy("+this.value+")";
      }else if(this.value ==4) {
        return "Sad("+this.value+")";
      }else if(this.value ==5) {
        return "Surprised("+this.value+")";
      }else if(this.value ==6){
        return "Normal("+this.value+")";
      }
    step:0},
        }},
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },
        series: [{
            type: 'area',
            name: 'Emotion',
            //pointInterval: 24 * 3600 * 1000,
            //pointStart: Date.UTC(2015, 2, 19),
            data: [
                [Date.UTC(2009,2,19),6],[Date.UTC(2009,2,20),1],[Date.UTC(2009,2,23),2],[Date.UTC(2009,2,24),0],[Date.UTC(2009,2,26),3],[Date.UTC(2009,2,27),0],[Date.UTC(2009,2,30),0],[Date.UTC(2009,3,27),3],[Date.UTC(2009,4,15),4],[Date.UTC(2009,4,19),3],[Date.UTC(2009,5,23),3],[Date.UTC(2009,5,24),6],[Date.UTC(2009,6,2),3]
            ]
        }]
    });
});
    chart.reflow();
 }

function rate_show(){
    // Make monochrome colors and set them as default for all pies
    Highcharts.getOptions().plotOptions.pie.colors = (function () {
        var colors = [],
            base = Highcharts.getOptions().colors[0],
            i;
        for (i = 0; i < 10; i += 1) {
            // Start out with a darkened base color (negative brighten), and end
            // up with a much brighter color
            colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
        }
        return colors;
    }());
    // 初始化图表
    var chart = Highcharts.chart('figure-rate', {
        title: {
            text: ' '
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: '浏览器占比',
            data: [
                ['Angry',   45.0],
                ['Sad',       26.8],
                {
                    name: 'Happy',
                    y: 12.8,
                    sliced: true,
                    selected: true
                },
                ['Fear',    8.5],
                ['Normal',     6.2],
                ['Surprise',   0.7]
            ]
        }]
    });
    chart.reflow();
}

/*****Music visualization******/
function music_v(){

//资源载入
    var music_svg_h = 200;
    var music_addx = 7.4;
    var music_xStart = 20;
    var music_y =100;

    //音乐&图片
//    var musicPath = "./Music/Jue.mp3";
//    var imgPath = './image/jue.png'
//    var audio = document.getElementById('audio');
//    audio.setAttribute('src',musicPath);
    // document.getElementById("audioElement").style.background-image = url(imgPath)


    //可视化
    var musicsvg = document.getElementById("music_show_svg");

    var svgrec = new Array();
    var svgcir = new Array();
    var svgcir2 = new Array();
    var svgcir3 = new Array();

    for(var i=0;i<100;i++){
        var h=0;

        svgrec[i] = document.createElement("rect");
        svgcir[i] = document.createElement("circle")
        svgcir2[i] = document.createElement("circle")
        svgcir3[i] = document.createElement("circle")

        musicsvg.appendChild(svgrec[i]);
        musicsvg.appendChild(svgcir[i]);
        musicsvg.appendChild(svgcir2[i]);
        musicsvg.appendChild(svgcir3[i]);

        svgrec[i].outerHTML="<rect class = 'MusicRec' x="+(music_xStart + i*music_addx)+" y="+(music_y-h)+" width="+(music_addx*0.5)+" height="+h+" style='fill:rgba(108, 92, 231,1.0)'>";
        svgcir[i].outerHTML="<circle class = 'MusicCir' cx="+(music_xStart + i*music_addx)+" cy ="+(music_y-h)+" r = "+(music_addx * 0.3)+" style = 'fill:rgba(52, 152, 219,1.0)' >";
        svgcir2[i].outerHTML="<circle class = 'MusicCir2' cx="+(music_xStart + i*music_addx)+" cy ="+(music_y-h)+" r = "+(music_addx * 0.3)+" style = 'fill:rgba(116, 185, 255,1.0)' >"
        svgcir3[i].outerHTML="<circle class = 'MusicCir3' cx="+(music_xStart + i*music_addx)+" cy ="+(music_y-h)+" r = "+(music_addx * 0.3)+" style = 'fill:rgba(162, 155, 254,1.0)' >"
    }

    //取音乐的频率
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var audioElement = document.getElementById('audio');

    var audioSrc = audioCtx.createMediaElementSource(audioElement);
    var analyser = audioCtx.createAnalyser();

    audioSrc.connect(analyser);
    audioSrc.connect(audioCtx.destination);

    var myhist = document.getElementsByClassName("MusicRec");
    var mycir = document.getElementsByClassName("MusicCir");
    var mycir2 = document.getElementsByClassName("MusicCir2");
    var mycir3 = document.getElementsByClassName("MusicCir3");

    var frequencyData = new Uint8Array(100);


    function everyViz(){
        analyser.getByteFrequencyData(frequencyData);
        for(var idx in myhist) {
            if (myhist[idx].getAttribute && frequencyData[idx])
            {
                thish = frequencyData[idx]/4;
                thish2 = frequencyData[idx]/8;
                thish3 = frequencyData[idx]/16;
                myhist[idx].setAttribute("y", music_y);
                myhist[idx].setAttribute("height", thish);
                mycir[idx].setAttribute("cy",music_y - thish);
                mycir2[idx].setAttribute("cy",music_y - thish2);
                mycir3[idx].setAttribute("cy",music_y - thish3);
            }
        }

    }
    window.setInterval(everyViz, 20);

}

/*********/