# October 8 2023
## Work Distribution 
* Justin - implemented block snapping in blockly [deisgn-blocks](https://github.com/PatrickPolcuch/CPSC354Project/blob/main/design-blocks/custom_blocks.js)
* Spencer - worked with Justin on exporting code and saving code in Blockly [design-blocks](https://github.com/PatrickPolcuch/CPSC354Project/blob/main/design-blocks/custom_blocks.js)
* Chris - started audio software research and playing noises in JavaScript (language may change) [reference](https://gomakethings.com/how-to-play-a-sound-with-javascript/)
* Patrick - made sample audio player in JS [SampleAudioPlayer](https://github.com/PatrickPolcuch/CPSC354Project/blob/main/milestone1/SampleAudioPlayer.js)

## AI Used 
* GitHub Co-Pilot was used to help make Blockly blocks in JS 
* Chat GPT was used to get reference to the use of audio in programming languages

# October 17 2023
## Changelog - Chris
### ADSR Envelope 
* ADSR stands for Attack, Decay, Sustain, and Release.  This allows you to change parts of a synth wave sound, allowing more accurate customization of sounds.
* The audio context kit uses an oscillator and with very few oscillator types including sine, square, and triangle.  None of these types sound like any instrument, so custom sound is the direction we want to go in.
* Audio players were brute forced for milestone 1 in order to achieve basic chords.  Mapping of these notes along with each duration and full set of notes will be necessary going forward.