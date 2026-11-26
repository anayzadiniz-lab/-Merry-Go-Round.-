const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const carousel = document.getElementById('carousel');
const lapCounter = document.getElementById('lap-counter');
const emotionTitle = document.getElementById('emotion-title');
const reflectionText = document.getElementById('reflection-text');
const musicName = document.getElementById('music-name');
const audioPlayer = document.getElementById('audio-player');
const panelVideos = document.querySelectorAll('.panel-video');

// Configure cada volta: música, trecho inicial (em segundos) e duração do pedacinho (em segundos)
const lapsData = [
  {
    title: "Volta 1: O Despertar",
    text: "O dia começa e o carrossel gira. Parece exatamente igual a ontem.",
    musicTitle: "Faixa 01 - Amanhecer",
    audioSrc: "audio/musica1.mp3",
    startTime: 0,
    duration: 15
  },
  {
    title: "Volta 2: O Ritmo Acelera",
    text: "As horas correm, as cobranças chegam, mas continuamos no mesmo eixo.",
    musicTitle: "Faixa 02 - Movimento",
    audioSrc: "audio/musica2.mp3",
    startTime: 10,
    duration: 15
  },
  {
    title: "Volta 3: O Silêncio no Meio do Barulho",
    text: "Tanta coisa acontecendo ao redor, e por dentro uma pausa.",
    musicTitle: "Faixa 03 - Pausa",
    audioSrc: "audio/musica3.mp3",
    startTime: 5,
    duration: 15
  },
  {
    title: "Volta 4: Euforia Passageira",
    text: "Um sorriso, uma lembrança boa que ilumina o giro por alguns segundos.",
    musicTitle: "Faixa 04 - Luz",
    audioSrc: "audio/musica4.mp3",
    startTime: 20,
    duration: 15
  },
  {
    title: "Volta 5: Nostalgia",
    text: "Como na música, a melodia se repete enquanto olhamos para trás.",
    musicTitle: "Faixa 05 - Merry Go Round",
    audioSrc: "audio/musica5.mp3",
    startTime: 0,
    duration: 15
  },
  {
    title: "Volta 6: O Peso do Fim do Dia",
    text: "O cansaço bate, mas o movimento não para até o ciclo se fechar.",
    musicTitle: "Faixa 06 - Crepúsculo",
    audioSrc: "audio/musica6.mp3",
    startTime: 12,
    duration: 15
  },
  {
    title: "Volta 7: O Ciclo Completo",
    text: "Mesmo voltando ao ponto de partida, quem terminou a 7ª volta já não é a mesma pessoa.",
    musicTitle: "Faixa 07 - Recomeço",
    audioSrc: "audio/musica7.mp3",
    startTime: 0,
    duration: 15
  }
];

let angle = 0;
let currentLap = 1;
const totalLaps = 7;
let speed = 0.4;
let isRunning = false;
let clipTimer = null;

// Faz o mesmo vídeo de ondas parecer em sequência entre os 7 blocos
function syncSequentialVideos() {
  panelVideos.forEach((video, index) => {
    const offset = index * 0.5;
    const applyOffset = () => {
      if (video.duration && isFinite(video.duration)) {
        video.currentTime = offset % video.duration;
      }
      video.play().catch(() => {});
    };

    if (video.readyState >= 1) {
      applyOffset();
    } else {
      video.addEventListener('loadedmetadata', applyOffset, { once: true });
    }
  });
}

function playMusicSnippet(data) {
  clearTimeout(clipTimer);
  audioPlayer.pause();
  audioPlayer.src = data.audioSrc;

  const startPlay = () => {
    const safeStart = Math.min(data.startTime || 0, Math.max(0, (audioPlayer.duration || 1) - 1));
    audioPlayer.currentTime = safeStart;
    audioPlayer.play().catch(err => console.log("Aguardando áudio:", err));

    if (data.duration) {
      clipTimer = setTimeout(() => {
        audioPlayer.pause();
      }, data.duration * 1000);
    }
  };

  if (audioPlayer.readyState >= 1) {
    startPlay();
  } else {
    audioPlayer.addEventListener('loadedmetadata', startPlay, { once: true });
  }
}

function updateLapUI(lapIndex) {
  const data = lapsData[lapIndex];
  lapCounter.textContent = `Volta ${lapIndex + 1} de ${totalLaps}`;
  emotionTitle.textContent = data.title;
  reflectionText.textContent = `"${data.text}"`;
  musicName.textContent = `🎵 ${data.musicTitle}`;

  document.body.className = `lap-${lapIndex + 1}`;
  playMusicSnippet(data);
}

function animate() {
  if (!isRunning) return;

  angle += speed;
  carousel.style.transform = `rotateY(-${angle}deg)`;

  const completedLaps = Math.floor(angle / 360) + 1;

  if (completedLaps > currentLap && completedLaps <= totalLaps) {
    currentLap = completedLaps;
    updateLapUI(currentLap - 1);
  }

  if (currentLap === totalLaps && angle >= (totalLaps * 360) - 60) {
    speed *= 0.985;
  }

  if (angle >= totalLaps * 360) {
    carousel.style.transform = `rotateY(-${totalLaps * 360}deg)`;
    isRunning = false;
    clearTimeout(clipTimer);
    audioPlayer.pause();
    lapCounter.textContent = "Ciclo Finalizado • 7 Voltas";
    return;
  }

  requestAnimationFrame(animate);
}

startBtn.addEventListener('click', () => {
  startScreen.style.display = 'none';
  isRunning = true;
  syncSequentialVideos();
  updateLapUI(0);
  animate();
});
    
