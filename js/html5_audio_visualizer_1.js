/**
 * An audio spectrum visualizer built with HTML5 Audio API
 * Author:Wayou
 * License: MIT
 * Feb 15, 2014
 * change: liuxiaohao
 * Dwc 28, 2017
 */
var audio_flag = true;
document.querySelector(".play_pause").addEventListener("click", function()
{
    if(audio_flag)
        new Visualizer().ini();
    audio_flag = false;
});
var Visualizer = function() {
    this.audioContext = null;
    this.audio = document.getElementById("audio"); //the audio source
    this.allCapsReachBottom = false;
    this.animationId = null;
};
Visualizer.prototype = {
    ini: function() {
        this._prepareAPI();
        this._start();
    },
    _prepareAPI: function() {
        //fix browser vender for AudioContext and requestAnimationFrame
        window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
        window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame;
        try {
            this.audioContext = new AudioContext();
        } catch (e) 
        {
            console.log(e);
        }
    },
    _start: function() {
        //read and decode the file into audio array buffer
        var that = this;
        var audioContext = that.audioContext;
        this._visualize(audioContext);
    },
    _visualize: function(audioContext) {
        var audioNode = audioContext.createMediaElementSource(this.audio),
            analyser = audioContext.createAnalyser();
        //connect the source to the analyser
        audioNode.connect(analyser);
        //connect the analyser to the destination(the speaker), or we won't hear the sound
        analyser.connect(audioContext.createMediaStreamDestination());

        this._drawQuadratic(analyser);
    },
    _drawQuadratic: function(analyser) {
        var that = this,
            canvas = document.getElementById('music_visulize'),
            cwidth = canvas.width,
            cheight = canvas.height,
            
        ctx = canvas.getContext('2d'),

        /*渐变*/
        gradient = ctx.createLinearGradient(cwidth , cheight , 45, 0);
        gradient.addColorStop(1, '#ce01fa');
        //gradient.addColorStop(0.5, '#ff77d5');
        gradient.addColorStop(0, '#00c2e0');

        var meterNum = 80;
        var value_low = 1;
        var smothness = parseInt(1024/meterNum);
        var step = cwidth/meterNum;
        var drawMeter = function() {
            var array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);

            //var step = Math.round(array.length / meterNum); //sample limited data from the total array
            //alert(step);
            ctx.clearRect(0, 0, cwidth + 400, cheight);
            var sum_field = 0;

            for (var i = 0; i < meterNum; i++) {
                var value = 0;
                for( var j = i * smothness;j <= (i+2) * smothness; j++)
                {
                    value += array[j];
                }
                if(i%2)value = -value;

                value /= smothness*2;
                value /= value_low;

                ctx.beginPath();

                ctx.lineWidth = 2;
                ctx.strokeStyle = gradient; //set the filllStyle to gradient for a better look
                ctx.moveTo(sum_field, cheight / 2 );
                ctx.quadraticCurveTo(sum_field+step/2, cheight / 2 + value , sum_field + step, cheight / 2);
                sum_field += step;
                //step =step + 0.01;
                //ctx.fillRect(i * 12 /*meterWidth+gap*/ , cheight - value + capHeight, meterWidth, cheight); //the meter
                ctx.stroke();
            }
            that.animationId = requestAnimationFrame(drawMeter);
        }
        this.animationId = requestAnimationFrame(drawMeter);
    }

}
