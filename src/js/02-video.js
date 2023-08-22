import VimeoPlayer from "@vimeo/player";
import throttle from "lodash.throttle";

const iframe = document.querySelector('#vimeo-player');
const player = new VimeoPlayer(iframe);


const saveCurrentTimeToLocalStorage = () => {
  player.getCurrentTime().then(currentTime => {
    localStorage.setItem('videoplayer-current-time', currentTime);
  });
};


const throttledSaveTime = throttle(saveCurrentTimeToLocalStorage, 1000);

player.on('timeupdate', throttledSaveTime);


const savedTime = localStorage.getItem('videoplayer-current-time');
if (savedTime) {
  const parsedSavedTime = parseFloat(savedTime);
  player.setCurrentTime(parsedSavedTime).then(actualTime => {
    console.log('Set playback time to:', actualTime);
  }).catch(error => {
    switch (error.name) {
      case 'RangeError':
        console.error('Time is out of range:', error);
        break;
      default:
        console.error('Error setting playback time:', error);
        break;
    }
  });
}
