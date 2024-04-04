function Graph({ id, width = 300, height = 300, WIN, callbacks }) {
    let canvas;
    if (id) {
        canvas = document.getElementById(id);
    } else {
        canvas = document.createElement("canvas");
        document.querySelector("body").appendChild(canvas);
    }
    const { wheel, mousemove, mouseleave, mouseup, mousedown } = callbacks;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    canvas.addEventListener("wheel", wheel);
    canvas.addEventListener("mousemove", mousemove);
    canvas.addEventListener("mouseleave", mouseleave);
    canvas.addEventListener("mouseup", mouseup);
    canvas.addEventListener("mousedown", mousedown);

    const PI2 = 2 * Math.PI;

    function xs(x) {
        return (x - WIN.LEFT) / WIN.WIDTH * canvas.width;
    }
    function ys(y) {
        return canvas.height - (y - WIN.BOTTOM) / WIN.HEIGHT * canvas.height;
    }

    this.sx = x => x * WIN.WIDTH / canvas.width;

    this.sy = y => -y * WIN.HEIGHT / canvas.height;

    this.clear = function () {
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    //чертит линию(начало по (x, y), конец по (x, y), цвет, толщина)
    this.line = function (x1, y1, x2, y2, color, width) {
        ctx.beginPath();
        ctx.strokeStyle = color || "red";
        ctx.lineWidth = width || 2;
        ctx.moveTo(xs(x1), ys(y1));
        ctx.lineTo(xs(x2), ys(y2));
        ctx.stroke();
        ctx.closePath();
    }

    //ставит точку по декарту
    this.point = function (x, y, color, size) {
        ctx.beginPath();
        ctx.strokeStyle = color || "f00";
        ctx.arc(xs(x), ys(y), size || 2, 0, PI2);
        ctx.stroke();
        ctx.closePath();
    }

    //добавляет текст
    this.text = function (text, x, y) {
        ctx.beginPath();
        ctx.fillStyle = "#fff";
        ctx.fillText(text, xs(x), ys(y));
        ctx.stroke();
        ctx.closePath();
    }

    this.polygon = function (points, color = '#f805') {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.moveTo(xs(points[0].x), ys(points[0].y));
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(xs(points[i].x), ys(points[i].y));
        }
        ctx.lineTo(xs(points[0].x), ys(points[0].y));
        ctx.closePath();
        ctx.fill();
    }
}