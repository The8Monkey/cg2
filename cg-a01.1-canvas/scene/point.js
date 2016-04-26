/**
 * Created by Sebastian Nieling on 4/18/2016.
 */


define(["util", "vec2", "Scene", "PointDragger"],
    (function (util, vec2, Scene, PointDragger) {

        var Dot = function Dot(origin, radius, style){
            //console.log("creating a Circle at [" + this.origin[0] + "," +
            //    this.origin[1] + "] with radius of " + this.radius);

            this.style = style || { color: "#00AA00"};
            this.origin = origin || [10,10];
            if(!radius){
                this.radius = [10,10];
            } else {
                this.radius = [origin[0] + radius, origin[1]];
            }
        };


        Dot.prototype.draw = function (context) {

            context.beginPath();
            context.arc(
                this.origin[0], this.origin[1], // position
                Math.abs(mag(this.origin, this.radius)),    // radius
                0.0, Math.PI * 2,           // start and end angle
                true
            );                    // clockwise

            context.lineWidth = this.style.width;
            context.strokeStyle = this.style.color;
            context.fillStyle = this.style.color;
            context.fill();
            context.stroke();
        };

        Dot.prototype.isHit = function (context, mousePos){
            var pos = this.origin;
            var dx = mousePos[0] - pos[0];
            var dy = mousePos[1] - pos[1];
            var r = mag(this.radius, this.origin);
            return(dx * dx + dy * dy) <= (r*r);
        };

        Dot.prototype.createDraggers = function () {

            var draggerStyle = {radius: 4, color: this.style.color, width: 0, fill:true };
            var draggers = [];

            var _circle = this;
            var getOrigin = function (){
                return _circle.origin;
            };


            var setOrigin = function(dragEvent){
                _circle.origin = dragEvent.position;
                _circle.radius[0] += dragEvent.delta[0];
                _circle.radius[1] += dragEvent.delta[1];
            };

            draggers.push(new PointDragger(getOrigin, setOrigin, draggerStyle));

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

        return Dot;

    }));
