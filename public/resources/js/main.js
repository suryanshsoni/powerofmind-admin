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
var entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

function escapeHtml (string) {
  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return entityMap[s];
  });
}
//----------------------------------CUSTOM FUNCTIONS---------------------------------------------------------------
function getExactDate(d){
    var date = new Date(d.replace("T"," ").replace(/-/g,"/"));
    var mdate=date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
    return mdate;
}
//------------------------------------------VIDEO STARTS -----------------------------------------------------------
function addVideo(){
 
  sendobject=JSON.stringify($('#addVideoForm').serializeObject());
  console.log(sendobject);
 
 $.ajax({
     type:'POST',
     url:globalroot+"addVideo",
     contentType: "application/json",
     data:sendobject,
     encode:true
 }).done(function(data){
     console.log(data);
     $('#addVideoForm')[0].reset();
      $.snackbar({content:"Video added successfully!", timeout: 2000,id:"mysnack"});
 }).fail(function(data){
     console.log(data);
      $.snackbar({content:"Video addition failed!", timeout: 2000,id:"mysnack"});
 });
    
  getVideos();

 

}

function getVideos(){
     $.ajax({
            type        : 'POST', 
            url         : globalroot+'videos', 
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
                             console.log(video);
                             var mdate=getExactDate(video.created);
                             //var vidurl="https://www.youtube.com/embed/"+video.videoPath.split("=").pop();
                               // console.log(vidurl);
                             output.mustache('video-template', {id:video._id, title: video.title,date:mdate,url:video.videoPath,desc:video.desc });
                         });
                       
                    });
               
                // here we will handle errors and validation messages
            })
            .fail(function(data){
        
                console.log(data);
            });
}
function updateVideo(video){
    id=video.split("-")[1];
    $.ajax({
            type        : 'POST', 
            url         : globalroot+'audios', 
            data        : {'id':id},
            encode      : true
        })
            // using the done promise callback
            .done(function(data) {

                // log data to the console so we can see
                console.log(data);
                $('#videoHeader').val("Editing "+data.title);
                $('#videotitle').val(data.title);
                $('#videodesc').val(data.desc);
                $('#videourl').val(data.videoPath);
                /*
                    
                */
                 $.snackbar({content:"Video updated successfully!", timeout: 2000,id:"mysnack"});
            })
            .fail(function(data){
        
                console.log(data);
            });
    getVideos();
   // $.snackbar({content:"Video deleted successfully!", timeout: 2000,id:"mysnack"});
}
//------------------------------------------VIDEO ENDS  -----------------------------------------------------------

//------------------------------------------AUDIO STARTS -----------------------------------------------------------
function addAudio(){
  
  sendobject=JSON.stringify($('#addAudioForm').serializeObject());
  console.log(sendobject);
  $.ajax({
      type:'POST',
      
  });
  getAudios();

 

}

function getAudios(){
     $.ajax({
            type        : 'POST', 
            url         : globalroot+'audios', 
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
                            console.log(audio);
                             var mdate=getExactDate(audio.created);
                             output.mustache('audio-template', { id:audio._id,title: audio.title,date:mdate,url:globalroot+audio.audioPath });
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
  
  sendobject=JSON.stringify($('#addMessageForm').serializeObject());
  console.log(sendobject);
    
    $.ajax({
         type:'POST',
         url:globalroot+"writemessage",
         contentType: "application/json",
         data:sendobject,
         encode:true
     }).done(function(data){
         console.log(data);
         $('#addMessageForm')[0].reset();
         getMessages();
        $.snackbar({content:"Message added successfully!", timeout: 2000,id:"mysnack"});
     }).fail(function(data){
         console.log(data);
        $.snackbar({content:"Addition of message failed!", timeout: 2000,id:"mysnack"});
     });
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
                            console.log(message);
                            var date = new Date(
                                message.date
                                .replace("T"," ")
                                .replace(/-/g,"/")
                            );
                             var mdate=date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
                             
                            if(message.imagePath!=""){
                                output.mustache('message-img-template', {date:mdate,thought:message.message,url:globalroot+message.imagePath});
                            }
                           else{
                               console.log("outputing without image")
                               output.mustache('message-template', {date:mdate,thought:message.message});
                           }
                            
                             
                         });
                    
                       
                    });
               
                // here we will handle errors and validation messages
            })
            .fail(function(data){
        
                console.log(data);
            });
}

//------------------------------------------MESSAGE ENDS-----------------------------------------------------------

//------------------------------------------Live Darshan STARTS -----------------------------------------------------------
function addLiveVideo(){
 
  sendobject=JSON.stringify($('#addLiveVideoForm').serializeObject());
  console.log(sendobject);
 
 $.ajax({
     type:'POST',
     url:globalroot+"addLiveDarshan",
     contentType: "application/json",
     data:sendobject,
     encode:true
 }).done(function(data){
     console.log(data);
     $('#addLiveVideoForm')[0].reset();
      $.snackbar({content:"Live stream added successfully!", timeout: 2000,id:"mysnack"});
 }).fail(function(data){
     console.log(data);
 });
    
  getLiveVideos();

 

}

function getLiveVideos(){
     $.ajax({
            type        : 'POST', 
            url         : globalroot+'liveDarshan', 
            encode      : true
        })
            // using the done promise callback
            .done(function(data) {

                // log data to the console so we can see
                console.log(data);
                $.Mustache.load('templates/live-video.htm')
					.fail(function () { 
						console.log('Failed to load templates from <code>templates.htm</code>');
					})
					.done(function () {
                        var output=$('#live-video-box');
                        
                        output.empty();
                        data.forEach(function(video){
                            
                             var mdate=getExactDate(video.created);
                             output.mustache('live-video-template', { title: video.title,date:mdate,url:video.videoPath,desc:video.desc });
                         });
                       
                    });
               
                // here we will handle errors and validation messages
            })
            .fail(function(data){
        
                console.log(data);
            });
}

//------------------------------------------LIVE DARSHAN  ENDS  -----------------------------------------------------------
//------------------------------------------NEWS STARTS -----------------------------------------------------------
function addNews(){
  
    title=$("#news-title").val();
    content=escapeHtml($("#news-editor").val());
   
   
    sendob=JSON.stringify({'title':title,'desc':content});
 
    $.ajax({
         type:'POST',
         url:globalroot+"addNews",
         contentType: "application/json",
         data:sendob,
         encode:true
     }).done(function(data){
         console.log(data);
         $('#addNewsForm')[0].reset();
        
        $.snackbar({content:"News added successfully!", timeout: 2000,id:"mysnack"});
     }).fail(function(data){
         console.log(data);
        $.snackbar({content:"Addition of  news failed!", timeout: 2000,id:"mysnack"});
     });
  

 

}

function getNews(){
     $.ajax({
            type        : 'POST', 
            url         : 'http://139.59.64.249:3000/news', 
            encode      : true
        })
            // using the done promise callback
            .done(function(data) {

                // log data to the console so we can see
                console.log(data);
                $.Mustache.load('templates/news.htm')
					.fail(function () { 
						console.log('Failed to load templates from <code>templates.htm</code>');
					})
					.done(function () {
                        var output=$('#latest-news');
                       
                        output.empty();
                        data.forEach(function(news){
                            console.log(news);
                            var date = new Date(
                                news.created
                                .replace("T"," ")
                                .replace(/-/g,"/")
                            );
                             var mdate=date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
                             
                            
                                output.mustache('latest-news-template', {id:news._id,title:news.title,content:news.desc,date:mdate});
                           
                          
                             
                         });
                    
                       
                    });
               
                // here we will handle errors and validation messages
            })
            .fail(function(data){
        
                console.log(data);
            });
}

//------------------------------------------NEWS ENDS-----------------------------------------------------------
