objects=[];
status="";
let video;

function preload(){
video=createVideo("video.mp4");
}

function setup(){
    canvas=createCanvas(600,450);
    canvas.center();
    video.hide();
}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status_id").innerHTML="Status: Detecting Objects";
}

function modelLoaded(){
console.log("model loaded ;)");
status=true;
video.loop();
video.speed(1);
video.volume(0);
}

function gotResult(error,results){
if(error){
    console.log(error);
}
else{
    console.log(results);
    objects=results;
}
}

function draw(){
    image(video,0,0,600,450);

    if(status!=""){
        objectDetector.detect(video,gotResult);
        for (i=0;i<objects.length;i++){
            document.getElementById("status_id").innerHTML="Objects Detected";
            document.getElementById("no_of_objects").innerHTML="no of objects detected : "+objects.length;
            fill("#d4374c");
            stroke("#d4374c");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+""+percent+"%",objects[i].x+10,objects[i].y+10);
            noFill();
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            
        }
    }  
}
