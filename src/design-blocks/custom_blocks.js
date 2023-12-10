/*
 *
 *  Functions for Creating blocks with Blockly
 * 
 */

Blockly.Blocks['song'] = { // Creates block "song", with fields: tempo, instrument. And input being measure blocks.
  init: function() {
    this.appendStatementInput("MEASURES")
        .setCheck("measure")
        .appendField("Song");
    this.appendDummyInput()
        .appendField("tempo")
        .appendField(new Blockly.FieldNumber(120, 1, 300), "TEMPO");
    this.appendDummyInput()
        .appendField("instrument")
        .appendField(new Blockly.FieldDropdown([
          ["piano", "piano"],
          ["guitar", "guitar"],
          ["violin", "violin"],
          ["trumpet", "trumpet"],
          ["drums", "drums"]
        ]), "INSTRUMENT");
    this.setInputsInline(false);
    this.setColour(0);
    this.setTooltip("A song with a specified sequence of measures, tempo, and instrument");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['measure'] = { // Creates block "Measure", with fields: key signature, time signature. And input being note blocks or rest blocks
  init: function() {
    this.appendDummyInput()
        .appendField("Measure");
    this.appendDummyInput()
        .appendField("key signature")
        .appendField(new Blockly.FieldDropdown([
          ["C", "C"],
          ["G", "G"],
          ["D", "D"],
          ["A", "A"],
          ["E", "E"],
          ["B", "B"],
          ["F#", "F#"],
          ["C#", "C#"],
          ["F", "F"],
          ["Bb", "Bb"],
          ["Eb", "Eb"],
          ["Ab", "Ab"],
          ["Db", "Db"],
          ["Gb", "Gb"],
          ["Cb", "Cb"]
        ]), "KEY");
    this.appendDummyInput()
        .appendField("time signature")
        .appendField(new Blockly.FieldDropdown([
          ["4/4", "4/4"],
          ["3/4", "3/4"],
          ["2/4", "2/4"],
          ["6/8", "6/8"],
          ["9/8", "9/8"],
          ["12/8", "12/8"]
        ]), "TIME");
    this.appendStatementInput("NOTES")
        .setCheck(["note", "rest"])
        .appendField("notes");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "measure");
    this.setNextStatement(true, "measure");
    this.setColour(130);
    this.setTooltip("A measure with a specified key signature, time signature, and notes");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['note'] = { // Creates block "Note", with fields: Note Name, Octave, Accidental, Duration, and Beat. Does not accept other blocks as input
  init: function() {
    this.appendDummyInput()
        .appendField("Note");
    this.appendDummyInput()
        .appendField("Note Name:")
        .appendField(new Blockly.FieldDropdown([["A", "A"],
                                                ["B", "B"], 
                                                ["C", "C"], 
                                                ["D", "D"], 
                                                ["E", "E"], 
                                                ["F", "F"], 
                                                ["G", "G"]]), "noteName");
    this.appendDummyInput()
        .appendField("Octave:")
        .appendField(new Blockly.FieldDropdown([["0", "0"], 
                                                ["1", "1"], 
                                                ["2", "2"], 
                                                ["3", "3"], 
                                                ["4", "4"], 
                                                ["5", "5"], 
                                                ["6", "6"], 
                                                ["7", "7"], 
                                                ["8", "8"]]), "octave");
    this.appendDummyInput()
        .appendField("Accidental:")
        .appendField(new Blockly.FieldDropdown([["(Blank)", ""], 
                                                ["Natural", "natural"], 
                                                ["Sharp", "sharp"], 
                                                ["Flat", "flat"]]), "accidental");
    this.appendDummyInput()
        .appendField("Duration:")
        .appendField(new Blockly.FieldTextInput("1.0"), "duration");
    this.appendDummyInput()
        .appendField("Beat:")
        .appendField(new Blockly.FieldTextInput("1.0"), "beat");
    this.setColour(230);
    this.setTooltip("Create a musical note.");
    this.setHelpUrl("");
    this.setInputsInline(false);
    // Add socket to note block
    this.setPreviousStatement(true, ["note", "rest"]);
    // this.setNextStatement(true, "note");
    // this.setPreviousStatement(true, "rest");
    this.setNextStatement(true, ["note", "rest"]);
  }
};

Blockly.Blocks['rest'] = { // Creates block "rest", with fields: Duration, and Beat. Does not accept other blocks as input
  init: function() {
    this.appendDummyInput()
        .appendField("Rest");
    this.appendDummyInput()
      .appendField("Duration:")
      .appendField(new Blockly.FieldTextInput("1.0"), "duration");
    this.appendDummyInput()
      .appendField("Beat:")
      .appendField(new Blockly.FieldTextInput("1.0"), "beat");
    this.setColour(230);
    this.setPreviousStatement(true, ["note", "rest"]);
    // this.setPreviousStatement(true, ["note", "rest"]);
    this.setNextStatement(true, ["note", "rest"]);
    // this.setNextStatement(true, "rest");
  }
}

Blockly.Blocks['dynamic'] = { // Creates block "dynamic", with fields: Marking. 
  init: function() {
    this.appendDummyInput()
        .appendField("Dynamic Marking");
    this.appendDummyInput()
        .appendField("Marking:")
        .appendField(new Blockly.FieldDropdown([
          ["Piano (P)", "piano"],
          ["Mezzo Piano (MP)", "mezzo_piano"],
          ["Mezzo Forte (MF)", "mezzo_forte"],
          ["Forte (F)", "forte"],
          ["Fortissimo (FF)", "fortissimo"]
        ]), "MARKING");
    this.setColour(230);
    this.setTooltip("Insert a dynamic marking to specify the volume or intensity of a musical passage.");
    this.setHelpUrl("");
    this.setInputsInline(false);
    // Add socket to dynamic marking block
    this.setPreviousStatement(true, "note");
    this.setNextStatement(true, "note");
  }
};


/*
 *
 *  Functions for Generating JavaScript code from blocks
 * 
 */

Blockly.JavaScript['song'] = function(block) { // Generates JavaScript code for a song block
  var measures = Blockly.JavaScript.statementToCode(block, 'MEASURES'); //Gets the code for the measures nested in the song block
  var tempo = block.getFieldValue('TEMPO');
  var instrument = block.getFieldValue('INSTRUMENT');
  measures = measures.trim(); // Remove whitespace
  if (measures.endsWith(',')) {
      measures = measures.slice(0, -1); // Remove the trailing comma
  }
  var json = {
    "type": "song",
    "tempo": tempo,
    "instrument": instrument,
    "measures": JSON.parse('[' + measures + ']') // Wrap the measures string in square brackets (to make it an array of measures)
  };
  var code = JSON.stringify(json, null, 2);
  return code;
};

Blockly.JavaScript['measure'] = function(block) {
  var key = block.getFieldValue('KEY');
  var time = block.getFieldValue('TIME');
  var notes = Blockly.JavaScript.statementToCode(block, 'NOTES');
  notes = notes.trim(); // Remove whitespace
  if (notes.endsWith(',')) {
      notes = notes.slice(0, -1); // Remove the trailing comma
  }
  var json = {
      "type": "measure",
      "key": key,
      "time": time,
      "notes": JSON.parse('[' + notes + ']') // Wrap the notes string in square brackets
  };
  var code = JSON.stringify(json, null, 2) + ',';
  return code;
};

Blockly.JavaScript['note'] = function(block) {// Generates JavaScript code for a note block
  var noteName = block.getFieldValue('noteName');
  var octave = block.getFieldValue('octave');
  var accidental = block.getFieldValue('accidental');
  var duration = block.getFieldValue('duration');
  var beat = block.getFieldValue('beat');
  var json = {
    "type": "note",
    "noteName": noteName,
    "octave": octave,
    "accidental": accidental,
    "duration": duration,
    "beat": beat
  };
  var code = JSON.stringify(json, null, 2) + ',';
  return code;
};

Blockly.JavaScript['rest'] = function(block) {// Generates JavaScript code for a rest block
  var restDuration = block.getFieldValue('duration');
  var restBeat = block.getFieldValue('beat');
  var json = {
    "type": "rest",
    "restDuration": restDuration,
    "restBeat": restBeat
  };
  var code = JSON.stringify(json, null, 2);
  return code;
}

Blockly.JavaScript['dynamic'] = function(block) {// Generates JavaScript code for a dynamic block
  var marking = block.getFieldValue('MARKING');
  var json = {
    "type": "dynamic",
    "marking": marking
  };
  var code = JSON.stringify(json, null, 2);
  return code;
};


/*
 *
 *  Helper functions
 * 
 */

function getNoteCode(note) { 
  var pitch = note.getFieldValue('NOTE');
  var accidental = note.getFieldValue('ACCIDENTAL');
  var duration = note.getFieldValue('DURATION');
  var code = pitch + accidental + duration;
  return code;
}
