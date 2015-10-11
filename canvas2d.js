"use strict";

function Canvas2D($canvas) {
    var context = $canvas[0].getContext("2d"),
        width=$canvas[0].width,
        height=$canvas[0].height,
        pageOffset=$canvas.offset();

//    context.beginPath();
//    context.moveTo(0,0);
//    context.lineTo(300,100);
//    context.lineTo(400,300);
//    context.closePath();
//    context.fill();
//    context.stroke();

    this.clear = function() {
        context.clearRect(0,0,width,height);
        return this;
    };
    
    this.drawPoints = function(points) {
        context.beginPath();
        context.moveTo(points[0].x, points[0].y)
        for(var i=1;i<points.length;i++) {
            context.lineTo(points[i].x,points[i].y);
        }
        context.stroke();
        return this;
    }

    this.getCanvasPoint = function(pageX, pageY) {
        return {
            x: pageX - pageOffset.left,
            y: pageY - pageOffset.top
        };
    };
    
    $(window).resize(function() {
        pageOffset=$canvas.offset();
    });
}

