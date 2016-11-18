   "use strict";

   function Task() {
       var cnv = document.getElementById("graph"),
           ctx = cnv.getContext("2d"),
           graphWidth = cnv.width,
           graphHeight = cnv.height,
           graphImg = new Image();
       var cleen = function(...n) {
           if (n.length == 0) {
               ctx.clearRect(0, 0, graphWidth, graphHeight);
           } else {
               ctx.clearRect(n[0], n[1], n[2], n[3]);
           }
       };
       this.lastX;
       this.lastY;
       this.getCleen = function(...n) {
           cleen(...n);
       }
       this.draw = function(x, y) {
           ctx.beginPath();
           ctx.strokeStyle = 'black';
           ctx.setLineDash([0]);
           ctx.lineWidth = 12;
           ctx.moveTo(this.lastX + 5, this.lastY + 5);
           ctx.lineTo(x + 5, y + 5);
           ctx.closePath();
           ctx.stroke();
           this.lastX = x;
           this.lastY = y;
       }
       this.find = function(array, value) {
           for (var i = 0; i < array.length; i++) {
               if (array[i] == value) return i;
           }
           return -1;
       }
       this.getCanvas = function() {
           return ctx;
       }
       this.canvasImg = function(...n) {
           if (n.length == 1) {
               graphImg.src = 'images/number_' + n[0] + '_1.png';
               graphImg.onload = function() {
                   ctx.drawImage(graphImg, 0, 0);
                   ctx.beginPath();
                   ctx.strokeStyle = 'rgba(0, 150, 365, 0.9)';
                   ctx.setLineDash([10, 12]);
                   ctx.lineWidth = 1;
                   ctx.moveTo(0, graphHeight / 2);
                   ctx.lineTo(graphWidth, graphHeight / 2);
                   ctx.moveTo(graphWidth / 2, 0);
                   ctx.lineTo(graphWidth / 2, graphHeight);
                   ctx.closePath();
                   ctx.stroke();
                   ctx.beginPath();
                   ctx.setLineDash([0]);
                   ctx.lineWidth = 2;
                   ctx.rect(0, 0, graphWidth, graphHeight);
                   ctx.closePath();
                   ctx.stroke();
               };
           } else if (n.length == 2) {
               graphImg.src = 'images/number_' + n[0] + '_' + n[1] + '.png';
           }
       }
       this.canvasImgSave = function() {
           var type = 'png',
               w = graphWidth / 2,
               h = graphWidth / 2;
           $("#graph_save_picures").append(Canvas2Image.convertToImage(cnv, w, h, type));
       }
   }