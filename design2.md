Measure block: The measure block will contain two drop down fields and a space for note blocks to fit in. The drop down fields will be for the key signature and the time signature. The key signatures will be one of the 12 standard keys. These will be key objects. These key objects will have a function called evaluateNote, which takes a String that represents a note, and return the corrisponding note in the key signature (if evaluateNote is called on the key object for the key of F, and passes in the note B, the function will return the note Bb).
The keys are as followed:
* C - No sharps or flats
* G - F#
* D - F#, C#
* A - F#, C#, G#
* E - F#, C#, G#, D#
* B - F#, C#, G#, D#, A#
* F# - F#, C#, G#, D#, A#, E#
* Gb - Bb, Eb, Ab, Db, Gb, Cb
* Db - Bb, Eb, Ab, Db, Gb
* Ab - Bb, Eb, Ab, Db
* Eb - Bb, Eb, Ab
* Bb - Bb, Eb
* F - Bb

The measure block will evaluate the keysignature before the accidental. 

```
note EvaluateKeyandAccidentals(note N){// this code applies the correct keysignature and accidental to the note N, and returns the correct note.
  if(N in keySignature){
    apply keySignature to N;
  }
  if(accidental == none){
    return N;
  } else {
    apply accidental to N;
  }
  return N;
}
```

There will be a global function called checkValidNote. This function will take the input of a note, and will return True if the note is valid, and False otherwise. This function will be called any time we alter a note to ensure that it is valid.

Measure block will contain a list of tuples, (int beat, note pointer). The beat will be where the note will be placed in the measure, the note pointer will be a pointer to the note.
The measure block will order the list in accordance to the that the notes should be played

Note block: The note block will have 5 drop down values to determine the sound and placement of the note. These five are: 
* note name (String) - will tell the block which pitch the note will be The values for the drop-down menue will be: [A, B, C, D, E, F, G]
* ocatave (short) - will tell the block which octave to place the note in. The drop-down menue should have the range 0 to 8
* accidental (custom data type) - if the note is played as is (default), sharp, flat, or natural. The drop-down menue should have the values: [(Blank), Natural, Sharp, Flat]
* duration (float)- how long the note will be played. The option for this one should be a text entry box that accepts decimal values
* beat (float)- when the note will be played. The option for this one should be a text entry box that accepts decimal values

The note block will construct an object of type note. Objects of type note contain three properties: String noteName, short octave, and accidental (of the custom accidental data type). 

Song block: This block will be what the measure blocks will be placed in. It will be responsible for: * Tempo * Instrument used * Starting and ending the file * any other responsbilities not covered by the note and measure blocks. For now the only thing we will do is have the song block contain measure blocks.



The following will be implemanted at a later date when we get the sound library and playback functionality:
The note pitches will be evaluated using a dictionary, where the key is the note name (ex. A4) and the value is the pitch (ex. 440)

```
Dictionary<String, float> pitches = new Hashtable<>();
pitches.put("A4", 440);
pitches.put("A#4", 466.16);
pitches.put("Bb4", 466.16);
```
