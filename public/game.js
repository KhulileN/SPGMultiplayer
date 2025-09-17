const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');
const socket = io();

let role = null;
let players = {};
let ball = {};

socket.on('playerRole', r => { role = r; });
socket.on('full', msg => alert(msg));

socket.on('gameState', state => {
  players = state.players;
  ball = state.ball;
  draw();
});

canvas.addEventListener('mousemove', e => {
  if (!role) return;
  const rect = canvas.getBoundingClientRect();
  const y = e.clientY - rect.top - 50; // adjust for paddle height
  socket.emit('movePaddle', y);
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw paddles
  ctx.fillStyle = 'white';
  if (players.player1) ctx.fillRect(20, players.player1.paddleY, 10, 100);
  if (players.player2) ctx.fillRect(canvas.width - 30, players.player2.paddleY, 10, 100);

  // Draw ball
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, 10, 0, Math.PI * 2);
  ctx.fill();
}
