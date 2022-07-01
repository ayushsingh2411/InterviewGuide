import React, { useEffect, useState } from 'react'
import './whiteboard.css'
import {io} from 'socket.io-client'

const socket = io.connect("http://localhost:9002");
export default function Whiteboard({id}) {
    var timeout;

    // useEffect(() => {
    //     socket = io('http://localhost:9002/', {
    //   transports: ['websocket'],
    // })

    // }, []);

    useEffect(()=>{
        if(socket == null){
            console.log('Soocket is null');
            return;
        }
        socket.emit('get-document', id);

        socket.once('load-document', function(data){
            var image= new Image();
            var canvas= document.querySelector('#board');
            var ctx= canvas.getContext('2d');
            image.onload= function (){
                ctx.drawImage(image, 0,0);
            };
            image.src= data;
        })

        
    }, [socket, id])

    function drawOnCanvas() {
        var canvas = document.querySelector('#board');
        var ctx = canvas.getContext('2d');

        var sketch = document.querySelector('#sketch');
        var sketch_style = getComputedStyle(sketch);
        canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        canvas.height = parseInt(sketch_style.getPropertyValue('height'));

        var mouse = { x: 0, y: 0 };
        var last_mouse = { x: 0, y: 0 };

        /* Mouse Capturing Work */
        canvas.addEventListener('mousemove', function (e) {
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;

            mouse.x = e.pageX - this.offsetLeft+5;
            mouse.y = e.pageY - this.offsetTop+5;
        }, false);


        /* Drawing on Paint App */
        ctx.lineWidth = 3;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'blue';

        canvas.addEventListener('mousedown', function (e) {
            canvas.addEventListener('mousemove', onPaint, false);
        }, false);

        canvas.addEventListener('mouseup', function () {
            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);

        //var root= this;
        var onPaint = function () {
            ctx.beginPath();
            ctx.moveTo(last_mouse.x, last_mouse.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.closePath();
            ctx.stroke();

            if(timeout !== undefined){
                clearTimeout(timeout);
            }
            timeout= setTimeout(function(){
                var base64Imagedata= document.querySelector("#board").toDataURL();
                console.log(socket);
                socket.emit('canvas-data', base64Imagedata);
            }, 100)
        };
    }

    useEffect(() => {
        drawOnCanvas();
    });

    useEffect(() => {
        if(socket== null) return;
        socket.on('canvas-data', function(data){
            var image= new Image();
            var canvas= document.querySelector('#board');
            var ctx= canvas.getContext('2d');
            image.onload= function (){
                ctx.drawImage(image, 0,0);
            };
            image.src= data;
        })
    }, [socket]);

    return (
        <div className='sketch' id='sketch'>
            <canvas className='board' id='board'></canvas>
        </div>
    )
}



