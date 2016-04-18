/**
 * Created by User on 18.04.2016.
 */
define(["util", "vec2", "Scene", "PointDragger"],
    function (util, vec2, Scene, PointDragger) {
        "use strict";

        var Circle = function (point, rad, lineStyle) {
            this.lineStyle = lineStyle || {width: "2", color: "#0000AA"};
            this.point = point || [10, 10];
            this.rad = rad || [20, 20];
        };

        Circle.prototype.draw = function (context) {

            // draw actual line
            context.beginPath();
            context.arc(this.point[0], this.point[1], Math.sqrt(Math.pow(this.rad[0] - this.point[0], 2) + Math.pow(this.rad[1] - this.point[1], 2)), 0, 2*Math.PI,false);
            context.lineWidth = this.lineStyle.width;
            context.strokeStyle = this.lineStyle.color;

            context.stroke();

        };

        Circle.prototype.isHit = function (context, pos) {

            var rad = Math.sqrt(Math.pow(this.rad[0] - this.point[0], 2) + Math.pow(this.rad[1] - this.point[1], 2));
            return rad;

        };


        Circle.prototype.createDraggers = function () {

            var draggerStyle = {radius: 4, color: this.lineStyle.color, width: 0, fill: true}
            var draggers = [];

            // create closure and callbacks for dragger
            var _line = this;
            var getPoint = function () {
                return _line.point;
            };

            var setPoint = function (dragEvent) {
                _line.point = dragEvent.position;
            };
            draggers.push(new PointDragger(getPoint, setPoint, draggerStyle));

            return draggers;

        };

        return Circle;
    });