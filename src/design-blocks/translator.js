// Define the melodyNote object
function MelodyNote(note, duration, startTime) {
    this.note = note; // to be used as a key for const noteFrequencies{String noteName: double frequency} found in AudioPlayer.js
    this.duration = duration; // the duration in seconds
    this.startTime = startTime; // the start time in seconds from the beginning of the piece
}

// Define the melody object
function Melody() {
    this.Notes = []; // an array of melodyNote objects
}

// Example usage:
// let note1EX = new MelodyNote("C4", 0.5, 0);
// let melody = new Melody();
// melody.Notes.push(note1);

// Define the Song object
function Song(tempo, instrument, measures) {
    this.tempo = tempo;
    this.instrument = instrument;
    this.Measures = measures || []; // an array of Measure objects
}

// Define the Measure object
function Measure(key_signature, time_signature, notes) {
    this.key_signature = key_signature;
    this.time_signature = time_signature;
    this.Notes = notes || []; // an array of Note objects
}

// Define the Note object
function Note(note_name, octave, Accidental, Duration, Beat) {
    this.note_name = note_name;
    this.octave = octave;
    this.Accidental = Accidental;
    this.Duration = Duration;
    this.Beat = Beat;
}

// Example usage:
// let note1 = new Note("C", 4, "", 0.5, 0);
// let measure1 = new Measure("C", "4/4", [note1]);
// let song = new Song(120, "piano", [measure1]);

// This function converts a Song object to a Melody object
function SongToMelody(Song){
    let m = new Melody(); // set up the melody that we are going to return
    let beat_Step = Song.tempo / 60.0; //This gives us how many seconds is in each beat

    let beatCount = 0;
    for (let measure of Song.Measures){ //iterates through each measure in the song
        let keySig = measure.key_signature;
        let timeSig = measure.time_signature;

        for (let note of measure.Notes){
            let mNote = new MelodyNote();

            mNote.note = note_and_key_to_melodyNote_format(note, keySig);
            mNote.duration = note.Duration * beat_Step; //gives the duration of the note in seconds
            mNote.startTime = (beatCount + note.Beat) * beat_Step; //gives  the start time in seconds from the beginning of the piece

            m.Notes.push(mNote); // adds our melodyNote to the array of notes in our melody object
        }

        beatCount += beatsInMeasure(measure); //adds the number of beats in the measure to the beatCount so we know when each measure starts
    }

    return m; //returns our melody
}

// returns the number of beats in a measure based off of the measure's time signature
function beatsInMeasure(m){
    switch (m.time_signature){
        case "4/4":
            return 4;
        case "3/4":
            return 3;
        case "2/4":
            return 2;
        case "6/8":
            return 6;
        case "9/8":
            return 9;
        case "12/8":
            return 12;
        default:
            return 4; // Default to 4 beats per measure
    }
}

function objectToMelody(obj) {
    var translatedObj = translateObject(obj);

    if (translatedObj instanceof Song) {
        // If the translated object is a Song, convert it to a melody
        return SongToMelody(translatedObj);
    } else {
        throw new Error("Unknown object type: " + typeof translatedObj);
    }
}

function translateObject(obj) {
    if (obj.type === "song") {
        return translateSong(obj);
    } else if (obj.type === "measure") {
        return translateMeasure(obj);
    } else {
        throw new Error("Unknown object type: " + obj.type);
    }
}

function translateSong(songObj) {
    // Convert the measures object into a Measure instance
    var measure = translateMeasure(songObj.measures);

    // Convert the song object into a Song instance
    var song = new Song(
        songObj.tempo,
        songObj.instrument,
        [measure] // The measures property is an array of Measure instances
    );

    return song;
}

function translateMeasure(measureObj) {
    // Convert each note object into a Note instance
    var notes = measureObj.notes.map(function(noteObj) {
        return new Note(
            noteObj.noteName,
            noteObj.octave,
            noteObj.accidental,
            noteObj.duration,
            noteObj.beat
        );
    });

    // Convert the measure object into a Measure instance
    var measure = new Measure(
        measureObj.key,
        measureObj.time,
        notes // The notes property is an array of Note instances
    );

    return measure;
}

// Example usage:
// var songObj = { "type": "song", "tempo": 120, "instrument": "piano", "measures": { "type": "measure", "key": "C", "time": "4/4", "notes": { "type": "note", "noteName": "A", "octave": "0", "accidental": "", "duration": "1.0", "beat": "1.0" } } };
// var song2 = translateObject(songObj);

// This function applies the correct key signature and accidental to the note N, and returns the note in a the format that melodyNote accepts.
function note_and_key_to_melodyNote_format(N, keySignature){
    if(N.Accidental !== "(Blank)"){ //if there is an accidental, that supersedes whatever the key signature says, and makes it simpler
      return N.note_name + N.Accidental + N.octave; //concatenates and returns the strings for note_name, Accidental, and octave
    }
    // if the accidental is blank, we need to evaluate based on key signature
  
    // gives us the string representation of the appropriate accidental based off of the key
    // go to our keys dictionary
    // find the correct key signature (keySignature)
    // then find the accidental value for note_name, [key:value] = [note_name:accidental]
    let accidental = keys[keySignature][N.note_name] || ""; 
  
    return N.note_name + accidental + N.octave; //concatenates and returns the strings for note_name, accidental, and octave
  }
  
  // Define the keys dictionary
const keys = {
    "C":{},

    "G":{   "F":"#"},

    "D":{   "F":"#",
            "C":"#"},

    "A":{   "F":"#",
            "C":"#",
            "G":"#"},

    "E":{   "F":"#",
            "C":"#",
            "G":"#",
            "D":"#"},

    "B":{   "F":"#",
            "C":"#",
            "G":"#",
            "D":"#",
            "A":"#"},

    "F#":{  "F":"#",
            "C":"#",
            "G":"#",
            "D":"#",
            "A":"#",
            "E":"#"},

    "Gb":{  "B":"b",
            "E":"b",
            "A":"b",
            "D":"b",
            "G":"b",
            "C":"b"},

    "Db":{  "B":"b",
            "E":"b",
            "A":"b",
            "D":"b",
            "G":"b"},

    "Ab":{  "B":"b",
            "E":"b",
            "A":"b",
            "D":"b"},
    
    "Eb":{  "B":"b",
            "E":"b",
            "A":"b"},

    "Bb":{  "B":"b",
            "E":"b"},

    "F":{   "B":"b"}
};

// // Test case 1: Note with accidental
// console.log(note_and_key_to_melodyNote_format({note_name: "C", Accidental: "#", octave: "4"}, "C")); // Expected output: "C#4"

// // Test case 2: Note without accidental in key with no accidentals
// console.log(note_and_key_to_melodyNote_format({note_name: "C", Accidental: "(Blank)", octave: "4"}, "C")); // Expected output: "C4"

// // Test case 3: Note without accidental in key with accidentals
// console.log(note_and_key_to_melodyNote_format({note_name: "F", Accidental: "(Blank)", octave: "4"}, "G")); // Expected output: "F#4"

// // Test case 4: Note without accidental in key with accidentals, but the note is not affected by the key
// console.log(note_and_key_to_melodyNote_format({note_name: "E", Accidental: "(Blank)", octave: "4"}, "G")); // Expected output: "E4"