var score_rightWrist = 0;
var score_leftWrist = 0;
var song1 = "";
var song2 = "";
var right_wristY = "";
var right_wristX = ""
var left_wristY = "";
var left_wristX = "";
var leftWrist_status = "";
var rightWrist_status = "";
function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
function setup() {
    canvas = createCanvas(480, 480);
    canvas.center();
    camera = createCapture(VIDEO);
    camera.hide();
    posenet = ml5.poseNet(camera, modelLoaded);
    posenet.on("pose", gotPoses);
}
function draw() {
    image(camera, 0, 0, 480, 480);
    fill("teal");
    stroke("crimson");
    leftWrist_status = song1.isPlaying();
    rightWrist_status = song2.isPlaying();
    if (score_leftWrist > 0.2)
    {
        circle(left_wristX, left_wristY, 25);
        song2.stop();
        if(leftWrist_status == false)
        {
            song1.play();
            document.getElementById("song_name").innerHTML = "Playing: Harry Potter Theme";
        }
    }

    if (score_rightWrist > 0.2)
    {
        circle(right_wristX, right_wristY, 25);
        song1.stop();
        if(rightWrist_status == false)
        {
            song2.play();
            document.getElementById("song_name").innerHTML = "Playing: Peter Pan Theme" ;
        }
    }
}
function modelLoaded() {
    console.log("poseNet is initialized!");
}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        right_wristY = results[0].pose.rightWrist.y;
        console.log("right_wristY = " + right_wristY);
        left_wristY = results[0].pose.leftWrist.y;
        console.log("left_wristY = " + left_wristY);
        right_wristX = results[0].pose.rightWrist.x;
        console.log("right_wristX = " + right_wristX);
        left_wristX = results[0].pose.leftWrist.x;
        console.log("left_wristX = " + left_wristX);
        score_leftWrist = results[0].pose.keypoints[9].score;
        console.log("score leftWrist = " + score_leftWrist);
        score_rightWrist = results[0].pose.keypoints[10].score;
        console.log("score rightWrist = " + score_rightWrist);
    }
}
