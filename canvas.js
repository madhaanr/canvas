"use strict";

function CanvasPadApp() {
    var version = "v4.2",
            canvas2d = new Canvas2D($("#main>canvas")),
            toolbar = new Toolbar($("#toolbar")),
            drawing = false,
            points = [],
            curTool = "pen",
            curAction = newAction(curTool),
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
        curAction = newAction(curTool);
        curAction.points.push(
                canvas2d.getCanvasPoint(pageX, pageY));
        actions.push(curAction);
    }

    function penMoved(pageX, pageY) {
        var canvasPoint = canvas2d.getCanvasPoint(pageX, pageY);
        showCoordinates(canvasPoint);
        if (drawing) {
            curAction.points.push(canvasPoint);
            redraw();
        }
    }

    function onMouseUp(e) {
        penUp();
    }

    function penUp() {
        if (drawing) {
            drawing = false;
            if(curAction.points.length<2) {
                actions.pop();
            }
        }
    }

    function redraw() {
        canvas2d.clear();
        canvas2d.savePen();
        for (var i in actions) {
            var action = actions[i];
            canvas2d.penColor(action.color)
                    .penWidth(action.width)
                    .penOpacity(action.opacity);
            canvas2d.drawPoints(action.points);
        }
        canvas2d.restorePen();
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

    function menuItemClicked(option, value) {
        canvas2d[option](value);
    }

    function initColorMenu() {
        $("#color-menu li").each(function (i, e) {
            $(e).css("background-color", $(e).data("value"));
        });
    }

    function initWidthMenu() {
        $("#width-menu li").each(function (i, e) {
            $(e).css("border-bottom",
                    $(e).data("value") + "px solid black");
        });
    }

    function newAction(tool) {
        return {
            tool: tool,
            color: canvas2d.penColor(),
            width: canvas2d.penWidth(),
            opacity: canvas2d.penOpacity(),
            points: []
        };
    }

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
