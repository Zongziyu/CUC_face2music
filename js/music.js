$(document).ready(function(){
	var audio = document.getElementById("audio");
	audio.volume = 0.8;
	audio.src='./0.m4a';
	
	/*播放时间可视化 play_time controls*/
	$.fn.musictime_show = function()
	{
		var music_duration = audio.duration;//音频长度
		var time_precent = audio.currentTime / music_duration;
		var music_now_sec = parseInt(audio.currentTime % 60);
		var music_now_min = Math.floor(audio.currentTime / 60);//向下取整
		if( music_now_min < 10)
		{
			music_now_min = "0" + music_now_min;
		}
		if( music_now_sec < 10)
		{
			music_now_sec = "0" + music_now_sec;
		}
		$(".current_bar").css("width", time_precent * 100 + "px");
		$(".now_playTime").text( music_now_min+":"+music_now_sec);

		setTimeout("$('').musictime_show()", 500);
	}

	/*播放暂停　play and pause controls */
	$.fn.playmusic =function (){
		audio.play();
		$(this).children("div").css("background-image","url('./pic/music_controls/pause.png')");
		$(this).attr("title","play");
		$(".play_pause").musictime_show();
	}
	$.fn.pausemusic =function (){
		audio.pause();
		$(this).children("div").css("background-image","url('./pic/music_controls/play.png')");
		$(this).attr("title","pause");	
	}
	
	$(".play_pause").mousedown(function()
		{
			if($(this).attr("title") == "pause")
			{
				$(this).playmusic();
			}
			else
			{
				$(this).pausemusic();
			}
		});
    $(".change_speed").mousedown(function()
         {
        if($(this).attr("param")=="back")
        {
            if(audio.currentTime>10)
            audio.currentTime = audio.currentTime-10;
            else audio.currentTime = 0;
        }
        else if($(this).attr("param")=="forward")
        {
            if(audio.currentTime<audio.duration-10)
            audio.currentTime = audio.currentTime+10;
            else audio.currentTime = audio.duration;
        }
    });
	/*控制播放进程按钮*/
	$(".time_change").mousedown(function(e){
		$(".play_pause").pausemusic();
		var that = $(this).prev();
		var x = e.pageX;
		var bar_width_str = that.css("width").split("px");

		$(document).mousemove(function(e){
			var dx = e.pageX - x;
			var bar_width = parseInt(bar_width_str[0]) + dx;
			audio.currentTime = audio.duration * bar_width *0.01;
			that.css("width", bar_width+"px");
			$(document).mouseup(function(){
				$(".play_pause").playmusic();
				$(this).unbind();
			});
		});
	});

	/**/

	$(".volume_icon").mousedown(function(){
		if($(this).next().css("display") == "none")
		{
			$(this).next().css("display", "block");	
		}
		else
		{
			$(this).next().css("display", "none")
		}
	});

	$(".volume_change").mousedown(function(e){
		var that = $(this).prev();
		var y = e.pageY;
		var bar_height_str = that.css("height").split("px");

		$(document).mousemove(function(e){
			var dy = e.pageY - y;
			var bar_height = parseInt(bar_height_str[0]) + dy;
			audio.volume = (100 - bar_height) * 0.01;
			that.css("height", bar_height+"px");
			if( bar_height == 100 )
			{
				$(".volume_icon").css("background-image","url('./pic/music_controls/volume3.png')");
			}
			else if( bar_height == 0 )
			{
				$(".volume_icon").css("background-image","url('./pic/music_controls/volume2.png')");
			}
			else
			{
				$(".volume_icon").css("background-image","url('./pic/music_controls/volume1.png')");	
			}
			$(document).mouseup(function(){
				$(this).unbind();
			});
		});
	});
});