/**
 * Created by Sebastian Nieling on 4/18/2016.
 */


define(["util", "vec2", "Scene", "PointDragger"],
    (function (util, vec2, Scene, PointDragger) {

        var Point = function Point(center, radius, style){
            //console.log("creating a Circle at [" + this.center[0] + "," +
            //    this.center[1] + "] with radius of " + this.radius);

            this.style = style || { color: "#00AA00"};
            this.center = center || [10,10];
            if(!radius){
                this.radius = [10,10];
            } else {
                this.radius = [center[0] + radius, center[1]];
            }
        };


        Point.prototype.draw = function (context) {

            context.beginPath();
            context.arc(
                this.center[0], this.center[1], // position
                Math.abs(mag(this.center, this.radius)),    // radius
                0.0, Math.PI * 2,           // start and end angle
                true
            );                    // clockwise

            context.lineWidth = this.style.width;
            context.strokeStyle = this.style.color;
            context.fillStyle = this.style.color;
            context.fill();
            context.stroke();
        };

        Point.prototype.isHit = function (context, mousePos){
            var pos = this.center;
            var dx = mousePos[0] - pos[0];
            var dy = mousePos[1] - pos[1];
            var r = mag(this.radius, this.center);
            return(dx * dx + dy * dy) <= (r*r);
        };

        Point.prototype.createDraggers = function () {

            var draggerStyle = {radius: 4, color: this.style.color, width: 0, fill:true };
            var draggers = [];

            var _circle = this;
            var getcenter = function (){
                return _circle.center;
            };


            var setcenter = function(dragEvent){
                _circle.center = dragEvent.position;
                _circle.radius[0] += dragEvent.delta[0];
                _circle.radius[1] += dragEvent.delta[1];
            };

            draggers.push(new PointDragger(getcenter, setcenter, draggerStyle));

            return draggers;

        };

        //function that returns the distance between 2 points
        function mag(a,b){
            return Math.floor(
                Math.sqrt(
                    Math.pow(a[0] - b[0], 2)
                    + Math.pow(a[1] - b[1], 2)
                ));
        }

        return Point;

    }));
