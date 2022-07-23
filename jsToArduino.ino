#include <AFMotor.h> //Adafruit Motor Shield Library. First you must download and install AFMotor library
#include <Servo.h>   //Servo library. This is standard library. (Sketch -> Include Library -> Servo)
String voice;

void setup() 
{ 
  Serial.begin(9600); //start serial communication
  myServo.attach(10); //define our servo pin (the motor shield servo1 input = digital pin 10)
  myServo.write(90);  //servo position is 90 degrees
}

void loop() {

  // Check to see if Serial data is being received
  while (Serial.available()) {
    delay(10); //Delay added to make thing stable 
    char c = Serial.read(); //Conduct a serial read
    if (c == '#') {break;} //Exit the loop when the # is detected after the word
    voice += c;
    // Print received Serial data --- Testing purposes
    Serial.println(voice);    
}
    // Add Arduino code to minilpulate the robot accordingly 
  if (voice.length() > 0){
    if(voice == "*go ahead"){
      forward();
      }
    else if(voice == "*go back"){
      back();
      }
    else if(voice == "*right") {
      right();
    }
    else if(voice == "*left") {
      left();
    }
    else if(voice == "*stop") {
      stop();
    }
    
  voice=""; //Reset the variable after initiating
  }
}

// Functions: 

void forward()
{
  motor1.run(FORWARD);
  motor1.setSpeed(700);
  motor2.run(FORWARD);
  motor2.setSpeed(700);
  delay(2000);
  motor1.run(RELEASE);
  motor2.run(RELEASE);
}
  
void back()
{
  motor1.run(BACKWARD);
  motor1.setSpeed(700);
  motor2.run(BACKWARD);
  motor2.setSpeed(700);
  delay(2000);
  motor1.run(RELEASE);
  motor2.run(RELEASE);
}
  
void right()
{
  myServo.write(0);
  delay(1000);
  myServo.write(90);
  delay(1000);
  motor1.run(FORWARD);
  motor1.setSpeed(190);
  motor2.run(BACKWARD);
  motor2.setSpeed(190);
  delay(1000);
  motor1.run(RELEASE);
  motor2.run(RELEASE);
}
  
void left()
{
  myServo.write(180);
  delay(1000);
  myServo.write(90);
  delay(1000);
  motor1.run(BACKWARD);
  motor1.setSpeed(190);
  motor2.run(FORWARD);
  motor2.setSpeed(190);
  delay(1000);
  motor1.run(RELEASE);
  motor2.run(RELEASE);
}

void stop()
{
  motor1.run(RELEASE);
  motor2.run(RELEASE);
}
