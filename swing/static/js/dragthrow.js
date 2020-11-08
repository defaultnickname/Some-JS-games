var anchors = [];
var speedx = 0;
var speedy = 0;
var sx = 0;
var sy = 0;
var prevEvent, currentEvent, prevSpeedx,prevSpeedy,accx,accy;

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


setInterval(function () {
    if (prevEvent && currentEvent) {
        var movementX = currentEvent.clientX - prevEvent.clientX;
        var movementY = currentEvent.clientY - prevEvent.clientY;

        //speed=movement/100ms= movement/0.1s= 10*movement/s
        speedx = 10 * movementX;//current speed
        speedy = 10 * movementY;

        accx = 10*(speedx-prevSpeedx);
        accy = 10 *(speedy - prevSpeedy)

    }

    prevEvent = currentEvent;
     prevSpeedx=speedx;
     prevSpeedy=speedy;
}, 100);

function dra() {
    // get canvas related references

    var canvas = document.getElementById("throw");
    var ctx = canvas.getContext("2d");
    var BB = canvas.getBoundingClientRect();
    var offsetX = BB.left;
    var offsetY = BB.top;


    canvas.width = window.innerWidth - 50;
    canvas.height = window.innerHeight - 150;


// listen for mouse events
    canvas.onmousedown = myDown;

    canvas.onmouseup = myUp;
    canvas.onmousemove = myMove;


    function createAnchor(x, y) {
        anchors.push({x: x, y: y, width: 15, height: 15, fill: getRandomColor(), isDragging: false, dy: 0, dx: 0});  //TO DO : check if you want to push same thing more times. If yes - ignore
        draw();
    }

    dra.createAnchor = createAnchor;


    function rect(r) {
        ctx.fillStyle = r.fill;
        ctx.fillRect(r.x, r.y, r.width, r.height);
    }


// drag related variables
    var dragok = false;
    var startX;
    var startY;

// an array of objects that define different shapes

// define 2 rectangles


    function clear() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

// redraw the scene
    function draw() {
        clear();
        // redraw each shape in the shapes[] array
        for (var i = 0; i < anchors.length; i++) {
            // decide if the shape is a rect or circle
            // (it's a rect if it has a width property)
            rect(anchors[i]);
        }
        ctx.beginPath();

        ctx.moveTo(canvas.width,0);
        ctx.lineTo(canvas.width,goal['start']);
        ctx.moveTo(canvas.width,goal['stop']);
        ctx.lineTo(canvas.width,canvas.height);
        ctx.lineWidth = 10;

        ctx.strokeStyle = '#ff0000';
        ctx.stroke();

    }

    dra.draw = draw;


// handle mousedown events
    function myDown(e) {


        // tell the browser we're handling this mouse event
        e.preventDefault();
        e.stopPropagation();

        // get the current mouse position
        var mx = parseInt(e.clientX - offsetX);
        var my = parseInt(e.clientY - offsetY);

        // test each shape to see if mouse is inside
        dragok = false;
        for (var i = 0; i < anchors.length; i++) {
            var s = anchors[i];
            // decide if the shape is a rect or circle
            if (s.width) {
                // test if the mouse is inside this rect
                if (mx > s.x && mx < s.x + s.width && my > s.y && my < s.y + s.height) {
                    // if yes, set that rects isDragging=true
                    dragok = true;
                    s.isDragging = true;
                }
            } else {
                var dx = s.x - mx;
                var dy = s.y - my;
                // test if the mouse is inside this circle
                if (dx * dx + dy * dy < s.r * s.r) {
                    dragok = true;
                    s.isDragging = true;
                }
            }
        }
        // save the current mouse position
        startX = mx;
        startY = my;
    }


// handle mouseup events
    function myUp(e) {



        // tell the browser we're handling this mouse event

        e.preventDefault();
        e.stopPropagation();

        // clear all the dragging flags
        dragok = false;
        for (var i = 0; i < anchors.length; i++) {
            anchors[i].isDragging = false;
        }

    }


// handle mouse moves
    function myMove(e) {
        currentEvent = e;

        sx = speedx;
        sy = speedy;
        // if we're dragging anything...
        if (dragok) {

            // tell the browser we're handling this mouse event
            e.preventDefault();
            e.stopPropagation();

            // get the current mouse position
            var mx = parseInt(e.clientX - offsetX);
            var my = parseInt(e.clientY - offsetY);


            // calculate the distance the mouse has moved
            // since the last mousemove
            var dx = mx - startX;
            var dy = my - startY;

            // move each rect that isDragging
            // by the distance the mouse has moved
            // since the last mousemove
            for (var i = 0; i < anchors.length; i++) {
                var s = anchors[i];
                if (s.isDragging) {
                    s.x += dx;
                    s.y += dy;
                }
            }

            // redraw the scene with the new rect positions
            draw();

            // reset the starting mouse position for the next mousemove
            startX = mx;
            startY = my;
        }

    }

    function randomTarget(score) {
        let randInt = Math.floor(Math.random()  * canvas.height-200)+200 ;

        return {'start': randInt - 100 + score, 'stop': randInt + 100 - score}

    }

    function animate() {
        requestAnimationFrame(animate)

        for (const element of anchors) {


            if (element.isDragging) {
                element.dy = Math.round(sy * 0.004);
                element.dx = Math.round(sx * 0.007);
            }

            if (element.x > canvas.width - element.width && element.y > goal['start'] && element.y < goal['stop']) {
                element.x = 1000;
                element.y = 1000;
                 let score = document.getElementById("score").innerText;

                 document.getElementById("score").innerText = parseInt(score) +1;

                 goal = randomTarget(parseInt(score*2))

            }
            if (element.y < canvas.height - 20 && element.y > 0 && !element.isDragging) {
                element.y += element.dy + 3;
                element.dy *= 0.97;    // with every animation frame lose some of vertical speed

            } else if (element.y < 5) {
                element.dy = 0;          // if ceiling hit, just go down
                element.y += 15;
            }

            if (element.x <= canvas.width -element.width && element.x > 0 && !element.isDragging) {
                element.dx *= 0.9999;                  // with every animation frame lose some of horizontal speed
                element.x += element.dx;
            } else if (element.x > canvas.width-20) {
                element.dx = -element.dx;               //reflect
                element.x -= 25;
            }


            draw();
        }
    }

    var goal = randomTarget(0)
    animate();

}




