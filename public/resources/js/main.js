var root="http://localhost:3002/"
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

function addVideo(){
  title=$('#videoTitle').val();
  desc=$('#videoDesc').val();
  videoPath=$('#videoPath').val();
  sendobject=JSON.stringify($('#addVideoForm').serializeObject());
  console.log(sendobject);
 
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
                        output.innerHTML="";
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

