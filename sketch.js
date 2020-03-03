
var video;
var boxWidth = 10;
var boxHeight = 10;
var slider1;
var slider2;
var slider3;


function setup() {
    createCanvas(640, 480);
    pixelDensity(1);
    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();
    noStroke();
    
  slider1 = createSlider(0,5,0,1);       //filter
  slider1.position(10, 20);                  
  slider1.style('width', '80px');
    
    
  slider2 = createSlider(0,2,0,1);      //pixel form
  slider2.position(10, 60);
  slider2.style('width', '80px');
    
 
  slider3 = createSlider(2,20,0);     //pixel size
  slider3.position(10, 100);   
  slider3.style('width', '80px');
    

}

function draw() {       
    background(55);
    video.loadPixels();
    
    boxWidth = slider3.value();
    boxHeight = slider3.value();
    
    var tot = boxWidth * boxHeight;
    
     for (var x = 0; x < video.width; x += boxWidth) {
         for (var y = 0; y < video.height; y += boxHeight) {
             
             var redChannel = 0, greenChannel = 0, blueChannel = 0;
             
             for(var i = 0; i < boxWidth; i++){
                 for (var j = 0; j< boxHeight; j++)
                 {
                     var index = ((x + i) + ((y + j)* video.width))*4;
                         redChannel += video.pixels[index + 0];
                         greenChannel += video.pixels[index + 1];
                         blueChannel += video.pixels[index + 2];     
                 
                }
                 
                 
            
    
         
         switch (slider1.value()){
             case 0:
                 fill(color(redChannel/tot, greenChannel/tot, blueChannel/tot));
                 break;
                
             case 1:
                 fill(replace8bit(color(redChannel/tot,greenChannel/tot,blueChannel/tot)));
                 break;
                
             case 2:
                 fill(replace4bit(color(redChannel/tot,greenChannel/tot,blueChannel/tot)));
                 break;
                 
             case 3:
                 fill(replace1bit(color(redChannel/tot,greenChannel/tot,blueChannel/tot)));
                 break;
                 
             case 4:
               fill(myPalette(color(redChannel/tot,greenChannel/tot,blueChannel/tot)));
                 break;
                 
             case 5:
              fill(accidentMonochrome(color(redChannel/tot,greenChannel/tot,blueChannel/tot)));
                 break;
                 
         }
            
        switch(slider2.value()){
               
            case 0:
                rect(x,y,boxWidth, boxHeight);
                break;
                 
            case 1:
                 ellipse(x,y,boxWidth+10,boxWidth+10);
                   break;
            case 2:
                ellipse(x,y,boxWidth+1000);
                break;
 
                }
      }
    }
       
 }
   
      fill(0);
      text("new filter",20,20);
      text("new pixel  shape", 20,60);
      text("new pixel  size",  20,100);
        
   
}


                 
function replace8bit(c)
{
    var r = int(red(c) / (255/8)) *(255/8); 
    var g = int(green(c) / (255/8))*(255/8);
    var b = int(blue(c) /(255/4))*(255/4);
    
    return color(r,g,b);
    
}

function replace4bit(c) 
{
 var colors = [color("#000000"), //black
 color("#555555"), // gray
 color("#0000AA"), // blue
 color("#5555FF"), // light blue
 color("#00AA00"), // green
 color("#55FF55"), // light green
 color("#00AAAA"), // cyan
 color("#55FFFF"), // light cyan
 color("#AA0000"), // red
 color("#FF5555"), // light red
 color("#AA00AA"), // magenta
 color("#FF55FF"), // light magenta
 color(170, 85, 0), // brown // #AA5500
 color("#FFFF55"), // yellow
 color("#AAAAAA"), // light gray
 color("#FFFFFF") // white (high intensity)
];

var shortDistance = 1000000;
var index = 0;

for(var f = 0; f < colors.length; f++)
 {
    var d = Math.sqrt(Math.pow((red(c)-red(colors[f]))*0.3,2) + Math.pow((green(c)-green(colors[f]))*0.59,2) + Math.pow((blue(c)-blue(colors[f]))*0.11,2));
    
    if (d< shortDistance)
        {
          shortDistance = d;
            index = f;
           
         }
    }
            
    return color(colors[index]);

            
}
                 
function replace1bit(c)
{
 var colors = [color(0),color(255)] ;
 var shortDistance = 100000;
 var index = 0;
                 
 for(var f = 0; f < colors.length; f++)
{
 var d = Math.sqrt(Math.pow((red(c)-red(colors[f]))*0.3,2) + Math.pow((green(c)-green(colors[f]))*0.59,2) + Math.pow((blue(c)-blue(colors[f]))*0.11,2));
    
 if (d<shortDistance)
    {
     shortDistance = d;
      index = f;
           
    }
 }   
                 
return color(colors[index]);    
                 
                 
}
                 
function myPalette(c)
{
 var colors = [
 color(220,20,60), // crimson
 color(255,160,122), // light salmon	
 color(0,250,154), // medium spring green
 color(189,183,107), // dark khaki
 color(47,79,79), // dark slate gray
 color(72,209,204), // medium turquoise
 color(100,149,237), // corn flower blue
 color(25,25,112), //midnight blue
 color(186,85,211), // medium orchid
 color(255,20,147), // deep pink
 color(255,255,255), // white
 color(143,188,143), // dark sea green	
 color(224,255,255), // light cyan
 color(238,130,238), //violet
 color(250,250,210), // light golden rod yellow
 color(230,230,250) // lavender

];             
     
var shortDistance = 1000000;
var index = 0;

for(var f = 0; f < colors.length; f++)
 {
    var d = Math.sqrt(Math.pow((red(c)-red(colors[f]))*0.3,2) + Math.pow((green(c)-green(colors[f]))*0.59,2) + Math.pow((blue(c)-blue(colors[f]))*0.11,2));
    
    if (d< shortDistance)
        {
          shortDistance = d;
            index = f;
           
         }
    }
            
    return color(colors[index]);
}
                 
 function accidentMonochrome(c)
{
 var colors = [
 color(220,20,60), // crimson
 color(255,160,122), // light salmon	
 color(0,250,154), // medium spring green
 color(189,183,107), // dark khaki
 color(47,79,79), // dark slate gray
 color(72,209,204), // medium turquoise
 color(100,149,237), // corn flower blue
 color(25,25,112), //midnight blue
 color(186,85,211), // medium orchid
 color(255,20,147), // deep pink 
 color(255,255,255), // white
 color(143,188,143), // dark sea green	
 color(224,255,255), // light cyan
 color(238,130,238), //violet
 color(250,250,210), // light golden rod yellow
 color(230,230,250) // lavender
                 ];
var shortDistance = 1000000;
var index = 0;

  for(var f = 0; f < colors.length; f++)
 {
    var d = Math.sqrt(Math.pow((red(c)-red(colors[f]))*0.3,2) + Math.pow((green(c)-green(colors[f]))*0.59,2) + Math.pow((blue(c)-blue(colors[f]))*0.11,2));
    
    if (d< shortDistance)
        {
          shortDistance = d;
          index = f;
           
         }
    }
            
    return color(colors[index]);  
                 
                 
     }
                 
/*For this coding, I have used 5 different type of filters, 3 different type of form(2 ellipse and one square),and 10 different pixel's sizes. In fact, the changes of pixel's shape is not as same as what I expect, just one ellipse rather than ellipse pixels. I try to change the different radius but didn't work....I have no idea about that.*/
