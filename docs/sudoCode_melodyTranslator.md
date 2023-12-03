# Sudo Code for js to melody object for audio player:

The goal is to go from a song object to a melody object in the form:
```
melodyNote{
    String note;       //to be used as a key for const noteFrequencies{String noteName: double frequency} found in AudioPlayer.js
    double duration;   //the duration in seconds
    double startTime;  //the start time in seconds from the beginning of the piece
}

melody{
    Array Notes = an array of melodyNote objects
}

const melody ExampleMelody = {
    Notes = { note: "C4", duration: 0.5, startTime: 0 },
            { note: "E4", duration: 0.5, startTime: 0 },
            { note: "G4", duration: 0.5, startTime: 0 },
            { note: "C5", duration: 0.5, startTime: 0.5 },
            { note: "E5", duration: 0.5, startTime: 0.5 },
            { note: "G5", duration: 0.5, startTime: 0.5 },
};
```

Below is the sudo code for this translation
```
Song { //general form of a song object
    tempo
    instrument
    Measures[Measure1, Measure2, Measure3, ...]   
}

Measure{ //general format of a measure object
    key_signature
    time_signature
    Notes[Note1, Note2, Note3, ...]
}

Note{ //general format for a note block
    note_name
    octave
    Accidental
    Duration
    Beat
}


melody SongToMelody(Song){
    new melody m; // set up the melody that we are going to return
    int beat_Step = Song->tempo / 60.0; //This gives us how many seconds is in each beat

    int beatCount = 0;
    for each measure in Song->Measures{ //itterates through each measure in the song
        keySig = measure->key_signature;
        timeSig = measure->time_signature;

        for each note in measure->Notes{
            new melodyNote mNote;

            mNote->note = note_and_key_to_melodyNote_format(note, key_signature);
            mNote->duration = note->Duration * beat_Step; //gives the duration of the note in seconds
            mNote->startTime = (beatCount + note->Beat) * beat_Step; //gives  the start time in seconds from the beginning of the piece

            m->Notes.append(mNote); // adds our melodyNote to the array of notes in our melody object
        }

        beatCount += beatsInMeasure(measure); //adds the number of beats in the measure to the beatCount so we know when each measure starts
    }

    return m; //returns our melody
}

// returns the number of beats in a measure based off of the measure's time signature
int beatsInMeasure(Measure m){
    switch m->time_signature{
        case: "4/4"
            return 4;
        case: "3/4"
            return 3;
        case: "2/4"
            return 2;
        case: "6/8"
            return 6;
        case: "9/8"
            return 9;
        case: "12/8"
            return 12;
        default:
            return 4; //defaults to 4, doesn't really make sense, but we should never run into the default case anyways
    }
}

// this function applies the correct key signature and accidental to the note N, and returns the note in a the format that melodyNote accepts.
String note_and_key_to_melodyNote_format(note N, keySignature){
  if(N->accidental != "(Blank)"){ //if there is an accidental, that supersedes whatever the key signature says, and makes it simpler
    return N->note_name + N->Accidental + N->octave; //concatinates and returns the strings for note_name, Accidental, and octave
  }
  // if the accidental is blank, we need to evaluate based on key signature

  // gives us the string representation of the appropriate accidental based off of the key
  // go to our keys dictionary
  // find the correct key signature (keySignature)
  // then find the accidental value for note_name, [key:value] = [note_name:accidental]
  string accidental = keys(keySignature)(N->note_name); 

  return N->note_name + accidental + N->octave; //concatinates and returns the strings for note_name, accidental, and octave
}

// this dictionary has a String representing the key signature as the key, and another dictionay as the value. 
// The second dictionary has a string representing the note name as the key, and the appropriate accidental as the value
// I dont know if js supports having a default value for a dictionary if the key isn't found, but if it doesn't we need to fill in the notes not listed as: note_name:""  I think chatGPT would be good for making that fix if we needed
// so the type is keys = [String:dictionary[String:String]]
// and this represents keys = ["Key signature name":dictionary["note name":"accidental value in current key signature"]]
const keys = {
    "C":{   default:""},

    "G":{   "F":"#",
            default:""},

    "D":{   "F":"#",
            "C":"#"
            default:""},

    "A":{   "F":"#",
            "C":"#"
            "G":"#",
            default:""},

    "E":{   "F":"#",
            "C":"#"
            "G":"#",
            "D":"#",
            default:""},

    "B":{   "F":"#",
            "C":"#"
            "G":"#",
            "D":"#",
            "A":"#",
            default:""},

    "F#":{  "F":"#",
            "C":"#"
            "G":"#",
            "D":"#",
            "A":"#",
            "E":"#",
            default:""},

    "Gb":{  "B":"b",
            "E":"b",
            "A":"b",
            "D":"b",
            "G":"b",
            "C":"b",
            default:""},

    "Db":{  "B":"b",
            "E":"b",
            "A":"b",
            "D":"b",
            "G":"b",
            default:""},

    "Ab":{  "B":"b",
            "E":"b",
            "A":"b",
            "D":"b",
            default:""},
    
    "Eb":{  "B":"b",
            "E":"b",
            "A":"b",
            default:""},

    "Bb":{  "B":"b",
            "E":"b",
            default:""},

    "F":{   "B":"b",
            default:""}
};

```