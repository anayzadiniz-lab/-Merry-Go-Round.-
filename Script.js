const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const carousel = document.getElementById('carousel');
const lapCounter = document.getElementById('lap-counter');
const emotionTitle = document.getElementById('emotion-title');
const reflectionText = document.getElementById('reflection-text');
const musicName = document.getElementById('music-name');
const audioPlayer = document.getElementById('audio-player');

// Dados de cada uma das 7 voltas (personalize com suas músicas e textos!)
const lapsData = [
  {
    title: "Volta 1: O Despertar",
    text: "O dia começa e o carrossel gira. Parece exatamente igual a ontem.",
    musicTitle: "Faixa 01 - Amanhecer",
    audioSrc: "audio/musica1.mp3"
  },
  {
    title: "Volta 2: O Ritmo Acelera",
    text: "As horas correm, as cobranças chegam, mas continuamos no mesmo eixo.",
    musicTitle: "Faixa 02 - Movimento",
    audioSrc: "audio/musica2.mp3"
  },
  {
    title: "Volta 3: O Silêncio no Meio do Barulho",
    text: "Tanta coisa acontecendo ao redor, e por dentro uma pausa.",
    musicTitle: "Faixa 03 - Pausa",
    audioSrc: "audio/musica3.mp3"
  },
  {
    title: "Volta 4: Euforia Passageira",
    text: "Um sorriso, uma lembrança boa que ilumina o giro por alguns segundos.",
    musicTitle: "Faixa 04 - Luz",
    audioSrc: "audio/musica4.mp3"
  },
  {
    title: "Volta 5: Nostalgia",
    text: "Como na música, a melodia se repete enquanto olhamos para trás.",
    musicTitle: "Faixa 05 - Merry Go Round",
    audioSrc: "audio/musica5.mp3"
  },
  {
    title: "Volta 6: O Peso do Fim do Dia",
    text: "O cansaço bate, mas o movimento não para até o ciclo se fechar.",
    musicTitle: "Faixa 06 - Crepúsculo",
    audioSrc: "audio/musica6.mp3"
  },
  {
    title: "Volta 7: O Ciclo Completo",
    text: "Mesmo voltando ao ponto de partida, quem terminou a 7ª volta já não é a mesma pessoa.",
    musicTitle: "Faixa 07 - Recomeço",
    audioSrc: "audio/musica7.mp3"
  }
];

let angle = 0;
let currentLap = 1;
const totalLaps = 7;
// Velocidade em graus por frame (aprox. 15 segundos por volta a 60fps)
let speed = 0.4; 
let isRunning = false;

function updateLapUI(lapIndex) {
  const data = lapsData[lapIndex];
  lapCounter.textContent = `Volta ${lapIndex + 1} de ${totalLaps}`;
  emotionTitle.textContent = data.title;
  reflectionText.textContent = `"${data.text}"`;
  musicName.textContent = `🎵 ${data.musicTitle}`;

  // Atualiza a cor de fundo do body
  document.body.className = `lap-${lapIndex + 1}`;

  // Troca a música
  audioPlayer.src = data.audioSrc;
  audioPlayer.play().catch(err => console.log("Aguardando áudio:", err));
}

function animate() {
  if (!isRunning) return;

  angle += speed;
  carousel.style.transform = `rotateY(-${angle}deg)`;

  // Calcula quantas voltas completas (360 graus) já foram dadas
  const completedLaps = Math.floor(angle / 360) + 1;

  // Se virou uma nova volta (até a 7ª)
  if (completedLaps > currentLap && completedLaps <= totalLaps) {
    currentLap = completedLaps;
    updateLapUI(currentLap - 1);
  }

  // Na 7ª volta, começa a desacelerar perto do final para parar suavemente
  if (currentLap === totalLaps && angle >= (totalLaps * 360) - 60) {
    speed *= 0.985; // Desaceleração suave
  }

  // Para exatamente ao completar as 7 voltas (2520 graus)
  if (angle >= totalLaps * 360) {
    carousel.style.transform = `rotateY(-${totalLaps * 360}deg)`;
    isRunning = false;
    lapCounter.textContent = "Ciclo Finalizado • 7 Voltas";
    return;
  }

  requestAnimationFrame(animate);
}

startBtn.addEventListener('click', () => {
  startScreen.style.display = 'none';
  isRunning = true;
  updateLapUI(0);
  animate();
});
  
