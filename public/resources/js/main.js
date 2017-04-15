var root="http://localhost:3002/";
var globalroot="http://139.59.64.249:3000/";
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

//------------------------------------------VIDEO STARTS -----------------------------------------------------------
function addVideo(){
  title=$('#videoTitle').val();
  desc=$('#videoDesc').val();
  videoPath=$('#videoPath').val();
  sendobject=JSON.stringify($('#addVideoForm').serializeObject());
  console.log(sendobject);
 
 $.ajax({
     type:'POST',
     url:globalroot+"addVideo",
     data:sendobject,
     encode:true
 }).done(function(data){
     console.log(data);
 }).fail(function(data){
     console.log(data);
 });
  getVideos();

 

}

function getVideos(){
     $.ajax({
            type        : 'GET', 
            url         : root+'videos', 
            encode      : true
        })
            // using the done promise callback
            .done(function(data) {

                // log data to the console so we can see
                console.log(data);
                $.Mustache.load('templates/video.htm')
					.fail(function () { 
						console.log('Failed to load templates from <code>templates.htm</code>');
					})
					.done(function () {
                        var output=$('#video-box');
                        
                        output.empty();
                        data.forEach(function(video){
                             output.mustache('video-template', { title: video.title,date:video.uploadDate,url:video.path,desc:video.desc });
                         });
                       
                    });
               
                // here we will handle errors and validation messages
            })
            .fail(function(data){
        
                console.log(data);
            });
}

//------------------------------------------VIDEO ENDS  -----------------------------------------------------------

//------------------------------------------AUDIO STARTS -----------------------------------------------------------
function addAudio(){
  title=$('#audioTitle').val();
  desc=$('#audioDesc').val();
  videoPath=$('#audioPath').val();
  sendobject=JSON.stringify($('#addAudioForm').serializeObject());
  console.log(sendobject);
 
  getAudios();

 

}

function getAudios(){
     $.ajax({
            type        : 'GET', 
            url         : root+'audios', 
            encode      : true
        })
            // using the done promise callback
            .done(function(data) {

                // log data to the console so we can see
                console.log(data);
                $.Mustache.load('templates/audio.htm')
					.fail(function () { 
						console.log('Failed to load templates from <code>templates.htm</code>');
					})
					.done(function () {
                        var output=$('#audio-box');
                        
                        output.empty();
                        data.forEach(function(audio){
                             output.mustache('audio-template', { title: audio.title,date:audio.uploadDate,url:audio.path });
                         });
                       
                    });
               
                // here we will handle errors and validation messages
            })
            .fail(function(data){
        
                console.log(data);
            });
}

//------------------------------------------AUDIO ENDS-----------------------------------------------------------

//------------------------------------------MESSAGE STARTS -----------------------------------------------------------
function addMessage(){
  title=$('#audioTitle').val();
  desc=$('#audioDesc').val();
  videoPath=$('#audioPath').val();
  sendobject=JSON.stringify($('#addAudioForm').serializeObject());
  console.log(sendobject);
 
  getMessages();

 

}

function getMessages(){
     $.ajax({
            type        : 'POST', 
            url         : 'http://139.59.64.249:3000/message1', 
            encode      : true
        })
            // using the done promise callback
            .done(function(data) {

                // log data to the console so we can see
                console.log(data);
                $.Mustache.load('templates/message.htm')
					.fail(function () { 
						console.log('Failed to load templates from <code>templates.htm</code>');
					})
					.done(function () {
                        var output=$('#message-box');
                       
                        output.empty();
                        data.forEach(function(message){
                            var date = new Date(
                                message.date
                                .replace("T"," ")
                                .replace(/-/g,"/")
                            );
                             var mdate=date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
                             output.mustache('message-template', {date:mdate,thought:message.message});
                         });
                       
                    });
               
                // here we will handle errors and validation messages
            })
            .fail(function(data){
        
                console.log(data);
            });
}

//------------------------------------------MESSAGE ENDS-----------------------------------------------------------