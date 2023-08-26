const proContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progressEl = document.getElementById('progress');

const surahsSelect = document.getElementById('surahs');
const audioPlayer = document.getElementById('audioPlayer');
const playerHeader = document.querySelector('#title');

const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const stopButton = document.getElementById('stop');
const surahUrl =
  'https://www.mp3quran.net/api/v3/reciters?language=eng&reciter=54';

function quranPlayer() {
  fetch(surahUrl)
    .then((res) => res.json())
    .then((data) => {
      const jsonData = data.reciters;

      if (jsonData && jsonData.length > 0) {
        const surahList = jsonData[0].moshaf[0].surah_list.split(',');

        surahList.forEach((surahNumber) => {
          const option = document.createElement('option');
          option.value = surahNumber;
          option.textContent = `Surah ${surahNumber}`;
          surahsSelect.appendChild(option);
        });

        // Define the audio URLs for the surahs
        const url = jsonData[0].moshaf[0].server;
        const audioUrls = surahList.map((surahNumber) => {
          if (surahNumber < 10) {
            return `${url}00${surahNumber}.mp3`;
          } else if (surahNumber >= 10 && surahNumber <= 99) {
            return `${url}0${surahNumber}.mp3`;
          } else {
            return `${url}${surahNumber}.mp3`;
          }
        });

        let currentTrackIndex = 0; // Start with the first track
        let isPlaying = false;
        function playTrack() {
          audioPlayer.src = audioUrls[currentTrackIndex];
          audioPlayer.play();
          isPlaying = true;
          playButton.classList.replace('fa-play', 'fa-pause');
          playButton.setAttribute('title', 'Pause');
          playerHeader.innerHTML = `${jsonData[0].name} | Sura ${surahList[currentTrackIndex]}`;
        }

        function pauseTrack() {
          audioPlayer.pause();
          isPlaying = false;
          playButton.classList.replace('fa-pause', 'fa-play');
          playButton.setAttribute('title', 'Play');
        }

        function nextTrack() {
          currentTrackIndex = (currentTrackIndex + 1) % audioUrls.length;
          playTrack();
        }

        function prevTrack() {
          currentTrackIndex =
            (currentTrackIndex - 1 + audioUrls.length) % audioUrls.length;
          playTrack();
        }
        surahsSelect.addEventListener('change', () => {
          let selectedSurah = surahsSelect.value;
          if (selectedSurah < 10) {
            selectedSurah = '00' + selectedSurah;
          } else if (selectedSurah >= 10 && selectedSurah <= 99) {
            selectedSurah = '0' + selectedSurah;
          }
          let newUrl = `${url}${selectedSurah}.mp3`;

          audioPlayer.src = newUrl;
          currentTrackIndex = parseInt(selectedSurah - 1);
          audioPlayer.play();
          isPlaying = true;
          playButton.classList.replace('fa-play', 'fa-pause');
          playButton.setAttribute('title', 'Pause');
          playerHeader.innerHTML = `${jsonData[0].name} | Sura ${
            currentTrackIndex + 1
          }`;
        });

        // Progress bar
        function updateProgressBar(e) {
          if (isPlaying) {
            // Update the width of the progress bar
            const { duration, currentTime } = e.srcElement;
            const progressPercent = (currentTime / duration) * 100;
            progress.style.width = `${progressPercent}%`;

            // Calculate display for progress
            const progressMinutes = Math.floor(currentTime / 60);
            let progressSeconds = Math.floor(currentTime % 60);
            if (progressSeconds < 10) {
              progressSeconds = `0${progressSeconds}`;
            }
            if (progressSeconds) {
              currentTimeEl.textContent = `${progressMinutes}:${progressSeconds}`;
            }
            // Calculate display for duration
            const durationMinutes = Math.floor(duration / 60);
            let durationSeconds = Math.floor(duration % 60);
            if (durationSeconds < 10) {
              durationSeconds = `0${durationSeconds}`;
            }
            if (durationSeconds) {
              durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
            }
          } else {
            progress.style.width = 0;
          }
        }
        // Set progress bar
        function setProgressBar(e) {
          const width = this.clientWidth;
          const clickX = e.offsetX;
          const { duration } = audioPlayer;
          audioPlayer.currentTime = (clickX / width) * duration;
        }
        // Event listeners
        playButton.addEventListener('click', () =>
          isPlaying ? pauseTrack() : playTrack()
        );
        nextButton.addEventListener('click', nextTrack);
        prevButton.addEventListener('click', prevTrack);
        stopButton.addEventListener('click', () => {
          audioPlayer.pause();
          audioPlayer.currentTime = 0;
          isPlaying = false;
          playButton.classList.replace('fa-pause', 'fa-play');
          playButton.setAttribute('title', 'Play');
        });

        // Event listeners
        audioPlayer.addEventListener('timeupdate', updateProgressBar);
        audioPlayer.addEventListener('ended', nextTrack);
        proContainer.addEventListener('click', setProgressBar);
      }
    });
}

quranPlayer();
