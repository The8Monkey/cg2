/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Hartmut Schirmacher, hschirmacher.beuth-hochschule.de
 * changes by Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: html_controller
 *
 * Defines callback functions for communicating with various 
 * HTML elements on the page, e.g. buttons and parameter fields.
 *
 */


/* requireJS module definition */
define(["jquery", "Line", "Circle", "Dot"],
    function ($, Line, Circle, Dot) {
        "use strict";

        /*
         * define callback functions to react to changes in the HTML page
         * and provide them with a closure defining context and scene
         */
        var HtmlController = function (context, scene, sceneController) {


            // generate random X coordinate within the canvas
            var randomX = function () {
                return Math.floor(Math.random() * (context.canvas.width - 10)) + 5;
            };

            // generate random Y coordinate within the canvas
            var randomY = function () {
                return Math.floor(Math.random() * (context.canvas.height - 10)) + 5;
            };

            // generate random color in hex notation
            var randomColor = function () {

                // convert a byte (0...255) to a 2-digit hex string
                var toHex2 = function (byte) {
                    var s = byte.toString(16); // convert to hex string
                    if (s.length == 1) s = "0" + s; // pad with leading 0
                    return s;
                };

                var r = Math.floor(Math.random() * 25.9) * 10;
                var g = Math.floor(Math.random() * 25.9) * 10;
                var b = Math.floor(Math.random() * 25.9) * 10;

                // convert to hex notation
                return "#" + toHex2(r) + toHex2(g) + toHex2(b);
            };

            /*
             * event handler for "new line button".
             */
            $("#btnNewLine").click((function () {

                // create the actual line and add it to the scene
                var style = {
                    width: Math.floor(Math.random() * 3) + 1,
                    color: randomColor()
                };

                var line = new Line([randomX(), randomY()],
                    [randomX(), randomY()],
                    style);
                scene.addObjects([line]);

                // deselect all objects, then select the newly created object
                sceneController.deselect();
                sceneController.select(line); // this will also redraw

            }));

            $("#btnNewCircle").click(function () {

                var style = {
                    width: Math.floor(Math.random() * 3) + 1,
                    color: randomColor()
                };

                var circle = new Circle(
                    [randomX(), randomY()],
                    randomX() / 2,
                    style
                );

                scene.addObjects([circle]);

                sceneController.deselect();
                sceneController.select(circle);
            });

            $("#btnNewDot").click(function () {

                var style = {
                    width: Math.floor(Math.random() * 3) + 1,
                    color: randomColor()
                };

                var dot = new Dot(
                    [randomX(), randomY()],
                    randomX() / 2,
                    style
                );

                scene.addObjects([dot]);

                sceneController.deselect();
                sceneController.select(dot);
            });

            sceneController.onObjChange(function () {
                var obj = sceneController.getSelectedObject();
                var style = obj.style;
                $('#inCol').val(style.color);
                $('#inThick').val(style.width);
                if("Circle" === obj.constructor.name ){
                    $('#inRadius').val(obj.getRadius());
                    $('#radius').show();
                } else {
                    $('#radius').hide();
                }
            });

            $('#inThick').change(function () {
                var obj = sceneController.getSelectedObject();
                obj.style.width = $('#inThick').val();
                sceneController.scene.draw(sceneController.context);
            });

            $('#inCol').change(function () {
                var obj = sceneController.getSelectedObject();
                obj.style.color = $('#inCol').val();
                sceneController.scene.draw(sceneController.context);
            });

            $('#inRadius').change(function () {
                var obj = sceneController.getSelectedObject();
                obj.radius = [obj.origin[0] + parseInt($('#inRadius').val()), obj.origin[1]];
                sceneController.scene.draw(sceneController.context);
            });
        };

        // return the constructor function
        return HtmlController;


    }); // require






