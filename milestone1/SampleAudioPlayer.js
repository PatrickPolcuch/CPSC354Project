// Create an AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Define piano note frequencies
// we are going to do this a bit differently
const noteFrequencies = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  // Add more notes...
};

// Function to play a single note
function playNote(note, durationInSeconds) {
  const oscillator = audioContext.createOscillator();
  oscillator.type = "sine"; // You can experiment with different waveforms
  oscillator.frequency.setValueAtTime(noteFrequencies[note], audioContext.currentTime);
  oscillator.connect(audioContext.destination);
  
  oscillator.start();
  oscillator.stop(audioContext.currentTime + durationInSeconds);
}

// Example melody
const melody = [
  { note: "C4", duration: 0.5 },
  { note: "E4", duration: 0.5 },
  { note: "G4", duration: 0.5 },
];

// Play the melody
let startTime = audioContext.currentTime;
melody.forEach((noteInfo) => {
  playNote(noteInfo.note, noteInfo.duration);
  startTime += noteInfo.duration;
});
