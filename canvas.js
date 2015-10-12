"use strict";

function CanvasPadApp() {
    var version = "v4.2",
            canvas2d = new Canvas2D($("#main>canvas")),
            toolbar = new Toolbar($("#toolbar")),
            drawing = false,
            points = [],
            actions = [];

    function setStatus(message) {
        $("#app>footer").text(message);
    }
    function onMouseMove(e) {
        penMoved(e.pageX, e.pageY);
    }

    function showCoordinates(point) {
        $("#coords").text(point.x + ", " + point.y);
    }

    $("#main>canvas").mousemove(onMouseMove)
            .mousedown(onMouseDown)
            .mouseup(onMouseUp)
            .mouseout(onMouseUp);

    function onMouseDown(e) {
        e.preventDefault();
        penDown(e.pageX, e.pageY);
    }

    function penDown(pageX, pageY) {
        drawing = true;
        points = [];
        points.push(canvas2d.getCanvasPoint(pageX, pageY));
        actions.push(points);
    }

    function penMoved(pageX, pageY) {
        var canvasPoint = canvas2d.getCanvasPoint(pageX, pageY);
        showCoordinates(canvasPoint);
        if (drawing) {
            points.push(canvasPoint);
            redraw();
        }
    }

    function onMouseUp(e) {
        penUp();
    }

    function penUp() {
        drawing = false;
    }

    function redraw() {
        canvas2d.clear();
        for (var i in actions) {
            canvas2d.drawPoints(actions[i]);
        }
    }

    function toolbarButtonClicked(action) {
        switch (action) {
            case "clear":
                if (confirm("Clear the canvas?")) {
                    actions = [];
                    redraw();
                }
                break;
            case "undo":
                actions.pop();
                redraw();
                break;
        }
    }
    ;

    function menuItemClicked(option, value) {
        canvas2d[option](value);
    }

    function initColorMenu() {
        $("#color-menu li").each(function (i, e) {
            $(e).css("background-color", $(e).data("value"));
        });
    }
    ;

    function initWidthMenu() {
        $("#width-menu li").each(function (i, e) {
            $(e).css("border-bottom",
                    $(e).data("value") + "px solid black");
        });
    }
    ;

    this.start = function () {
        toolbar.toolbarButtonClicked = toolbarButtonClicked;
        toolbar.menuItemClicked = menuItemClicked;
        initColorMenu();
        initWidthMenu();
        $("#app>header").append(version);
        $("#main>canvas").mousemove(onMouseMove);
//        setStatus("ready");
    };
}
$(function () {
    window.app = new CanvasPadApp();
    window.app.start();
});
