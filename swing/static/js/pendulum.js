

function Pendulum() {

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var BB = canvas.getBoundingClientRect();
    var offsetX = BB.left;
    var offsetY = BB.top;
    var mount = canvas.clientWidth / 2

    var stringlen = document.getElementById("Length of string").value + 50
    var mass = document.getElementById('Mass').value
    var initialangle = document.getElementById('Initial Angle').value

    console.log(canvas)
    console.log(stringlen, mass)
    console.log(mount)

    function circle(x, y) {
        x += mount;

        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, 2 * Math.PI);
        ctx.rect(x - 1, y - 1, 2, 2);
        ctx.moveTo(x, y);
        ctx.lineTo(mount, 50);
        ctx.stroke();

    }

    var rad = Math.PI / 180;
    i = initialangle
    di = 0.2;

    function animate() {
        requestAnimationFrame(animate)

        let x = stringlen * Math.sin(i * rad);
        let y = stringlen * Math.cos(i * rad);

        circle(x, y);

        i += di;


        if (i > initialangle) {
            di = -di;
            var t1 = performance.now();
        }

        if (i < -initialangle) {
            di = -di;
            var t2 = performance.now();
        }

        if (i > 0 && i < initialangle) {
            di -= rad;
        } else {
            di += rad;
        }

        if (i < 0 && i > -initialangle) {
            di += rad;
        } else {
            di -= rad;


        }



    }

    animate();
}