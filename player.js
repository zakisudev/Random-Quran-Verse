const surahsSelect = document.getElementById('surahs');

const audioPlayer = document.getElementById('audioPlayer');
const playerHeader = document.querySelector('.player-header');
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
          console.log(currentTrackIndex);
          audioPlayer.play();
          isPlaying = true;
          playButton.classList.replace('fa-play', 'fa-pause');
          playButton.setAttribute('title', 'Pause');
          playerHeader.innerHTML = `${jsonData[0].name} | Sura ${selectedSurah}`;
        });

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
      }
    });
}

quranPlayer();
