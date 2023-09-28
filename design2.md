Measure block will contain a list of tuples, (int beat, note pointer) # beat will be where the note will be placed in the measure, the note pointer will be a pointer to the note.
The measure block will order the list in accordance to the that the notes should be played

The measure block will evaluate the keysignature before the accidental. 

'''
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
'''

The note pitches will be evaluated using a dictionary, where the key is the note name (ex. A4) and the value is the pitch (ex. 440)

'''
Dictionary<String, float> pitches = new Hashtable<>();
pitches.put("A4", 440);
pitches.put("A#4", 466.16);
pitches.put("Bb4", 466.16);
'''
