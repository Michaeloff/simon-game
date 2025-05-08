const canvas = document.getElementById("triangleCanvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "blue";
ctx.beginPath();
ctx.moveTo(150, 50);   // Top point
ctx.lineTo(50, 250);   // Bottom left
ctx.lineTo(250, 250);  // Bottom right
ctx.closePath();
ctx.fill();