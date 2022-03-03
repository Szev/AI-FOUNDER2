status= "";
objects= [];
function setup()
{
    canvas= createCanvas(300, 250);
    canvas.center();

    video= createCapture(VIDEO);
    video.size(300, 250);
    video.hide();
}
function draw()
{
    image(video, 0, 0, 380, 250);
    objectDetector.detect(video, gotResult);
    for(i=0; i<objects.length; i++)
    {
        document.getElementById("status").innerHTML= "status object detected";
        document.getElementById("numeber_of_objects").innerHTML= "Number of objects detected are"+objects.length;

        fill("#03f4fc");
        percent= floor(objects[i].confidence*100);
        text(objects[i].label+""+percent+"%", objects[i].x+15, objects[i].y+15);
        noFill();
        stroke("#03f4fc");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        if(objects[i].label==object_name)
        {
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("object_status").innerHTML= object_name+"found";
            synth= window.speechSynthesis;
            utterThis= new SpeechSynthesisUtterance(object_name+"found");
            synth.speak(utterThis);
        }
        else
        {
            document.getElementById("object_status").innerHTML= object_name+"not found";
        }
    }
}
function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects= results;
}
function start()
{
    objectDetector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML= "status: detecting objects";
    object_name= document.getElementById("object_name").value;
}
function modelLoaded()
{
    console.log("modelLoaded");
    status=true;
}