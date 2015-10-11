"use strict";

function CanvasPadApp() {
    var version="v4.1",
        canvas2d = new Canvas2D($("#main>canvas")),
        drawing=false,
        points=[],
        actions=[];
    
    function setStatus(message) {
        $("#app>footer").text(message);
    }
    function onMouseMove(e) {
        penMoved(e.pageX, e.pageY);
    }   
    
    function showCoordinates(point) {
        $("#coords").text(point.x +", "+point.y);
    }
    
    $("#main>canvas").mousemove(onMouseMove)
            .mousedown(onMouseDown)
            .mouseup(onMouseUp)
            .mouseout(onMouseUp);
    
    function onMouseDown(e) {
        e.preventDefault();
        penDown(e.pageX,e.pageY);
    }
    
    function penDown(pageX, pageY) {
        drawing = true;
        points= [];
        points.push(canvas2d.getCanvasPoint(pageX, pageY));
        actions.push(points);
    }
    
    function penMoved(pageX, pageY) {
        var canvasPoint = canvas2d.getCanvasPoint(pageX, pageY);
        showCoordinates(canvasPoint);
        if(drawing) {
            points.push(canvasPoint);
            redraw();
        }
    }
    
    function onMouseUp(e) {
        penUp();
    }
    
    function penUp() {
        drawing=false;
    }
    
    function redraw() {
        canvas2d.clear();
        for(var i in actions) {
            canvas2d.drawPoints(actions[i]);
        }
    }
    
    this.start=function() {
        $("#app>header").append(version);
        $("#main>canvas").mousemove(onMouseMove);
//        setStatus("ready");
    };
}
$(function() {
   window.app=new CanvasPadApp();
   window.app.start();
});