const btnStartElement = document.querySelector('#start');
const btnOpenElement = document.querySelector('#open');
const btnCloseElement = document.querySelector('#close');
const stepsElement = document.querySelector('#steps');
const stepMessageElement = document.querySelector('#stepMessage');
const nextStepElement = document.querySelector('#nextStep');
const stepImageElement = document.querySelector('#stepImage');

const steps = [
  { message: "HOLA HICE ESTO CON MUCHO CARIÑO PARA TI.", image: "amor.gif" },
  { message: "GRACIAS POR SIEMPRE SER MI COMPAÑERA", image: "ft.jpeg" },
  { message: "ME LA PASO MUY BIEN CONTIGOOO", image: "ft2.jpeg" },
  { message: "GRACIAS POR TODO ESTOS MOMENTOS BONITOS", video: "video1.mp4" },
  { message: "GRACIAS POR TODO ESTOS MOMENTOS BONITOS", image: "ft1.jpeg" },
];

let currentStep = 0;

function showNextStep() {
  if (currentStep < steps.length - 1) {
    currentStep++;
    stepMessageElement.textContent = steps[currentStep].message;

    if (steps[currentStep].video) {
      stepImageElement.style.display = 'none'; // Oculta la imagen si hay un video
      let videoElement = document.querySelector('#stepVideo');
      if (!videoElement) {
        videoElement = document.createElement('video');
        videoElement.id = 'stepVideo';
        videoElement.loop = true; // Configura el bucle
        videoElement.autoplay = true; // Configura la reproducción automática
        videoElement.muted = true; // Opcional: Silencia el video
        videoElement.style.maxWidth = '200px';
        videoElement.style.maxHeight = '200px';
        stepsElement.insertBefore(videoElement, stepMessageElement.nextSibling);
      }
      videoElement.src = steps[currentStep].video;
      videoElement.style.display = 'block';
    } else {
      stepImageElement.src = steps[currentStep].image;
      stepImageElement.style.display = 'block'; // Muestra la imagen si no hay video
      const videoElement = document.querySelector('#stepVideo');
      if (videoElement) {
        videoElement.style.display = 'none'; // Oculta el video si hay una imagen
      }
    }
  } else {
    stepsElement.style.display = 'none';
    btnOpenElement.disabled = false;
  }
}

nextStepElement.addEventListener('click', showNextStep);

btnStartElement.addEventListener('click', () => {
  currentStep = 0; // Reinicia el paso actual al inicio
  stepMessageElement.textContent = steps[0].message;
  stepImageElement.src = steps[0].image;
  stepImageElement.style.display = 'block';
  const videoElement = document.querySelector('#stepVideo');
  if (videoElement) {
    videoElement.style.display = 'none'; // Oculta el video si hay una imagen
  }
  stepsElement.style.display = 'flex';

  btnStartElement.disabled = true;
  btnOpenElement.disabled = true;
  btnCloseElement.disabled = true;

  const backgroundMusic = document.getElementById("backgroundMusic");
  backgroundMusic.currentTime = 0; // Reinicia el audio al principio
  backgroundMusic.play().then(() => {
    console.log('Audio is playing');
  }).catch(error => {
    console.log('Failed to play audio:', error);
  });
  openButton.disabled = false;
  closeButton.disabled = false;
});

btnOpenElement.addEventListener('click', () => {
  btnOpenElement.disabled = true;
  btnCloseElement.disabled = false;
  const coverElement = document.querySelector('.cover');
  coverElement.classList.add('open-cover');

  stepsElement.style.display = 'none';

  setTimeout(() => {
    coverElement.style.zIndex = -1;
    const paperElement = document.querySelector('.paper');
    paperElement.classList.remove('close-paper');
    paperElement.classList.add('open-paper');

    const heartElement = document.querySelector('.heart');
    heartElement.style.display = 'block';

  }, 500);
});

btnCloseElement.addEventListener('click', () => {
  btnCloseElement.disabled = true;
  btnOpenElement.disabled = true;
  btnStartElement.disabled = false;

  const backgroundMusic = document.getElementById("backgroundMusic");
  backgroundMusic.pause(); // Pausa el audio

  const coverElement = document.querySelector('.cover');
  const paperElement = document.querySelector('.paper');
  paperElement.classList.remove('open-paper');
  paperElement.classList.add('close-paper');

  setTimeout(() => {
    coverElement.style.zIndex = 0;
    coverElement.classList.remove('open-cover');

    const heartElement = document.querySelector('.heart');
    heartElement.style.display = 'none';
  }, 500);
});
