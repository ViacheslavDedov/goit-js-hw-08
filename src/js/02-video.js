import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
    const player = new Vimeo.Player(iframe);

player.on('timeupdate', throttle(onPlay,1000) );
 
 function onPlay(timeupdate) {
    const time = timeupdate.seconds;
localStorage.setItem('videoplayer-current-time', `${time}`);
    
};

const getTime = localStorage.getItem('videoplayer-current-time');

let newTime = Number(getTime);

player.setCurrentTime(newTime).then(function(seconds) {

    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});
