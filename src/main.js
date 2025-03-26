import 'fullpage.js/dist/fullpage.min.css';
import './style.css'

import fullpage from 'fullpage.js';

const questionsFile = import.meta.env.VITE_QUESTIONS_FILE;

fetch(questionsFile)
  .then(res => res.json())
  .then(data => {
    const fullpageContainer = document.querySelector('#fullpage');

    data.forEach((entry, index) => {
      const section = document.createElement('div');
      section.classList.add('section');

      const video = document.createElement('video');
      video.src = `/${entry.video}`;
      video.autoplay = true;
      video.muted = true;
      video.loop = !index;
      video.playsInline = true;
      video.classList.add('video');

      if (entry.question) {
      const h2 = document.createElement('h2');
      h2.textContent = entry.question;
      section.appendChild(h2);
      }

      section.appendChild(video);
      fullpageContainer.appendChild(section);
    });

    new fullpage('#fullpage', {
      autoScrolling: true,
      afterLoad: (origin, destination) => {
        document.querySelectorAll('.video').forEach(v => { 
          v.currentTime = 0;
          v.pause();
        });
        const currentVideo = destination.item.querySelector('.video');
        if (currentVideo) {
          currentVideo.play().catch(err => console.warn('Autoplay blocked:', err));
        }
      }
    });
  })
  .catch(err => console.error('Failed to load questions:', err));

