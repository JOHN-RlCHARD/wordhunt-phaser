export function formatTime(seconds) {
    var minutes = Math.floor(seconds/60);
    // Seconds
    var partInSeconds = (seconds%60).toString();
    // Adds left zeros to seconds
    partInSeconds = partInSeconds.toString().padStart(2,'0');

    partInSeconds = partInSeconds.substring(0,2)
    // Returns formated time
    return `${minutes}:${partInSeconds}`;
}