Blockly.Blocks['measure'] = {
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
        .setCheck("note")
        .appendField("notes");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "measure");
    this.setNextStatement(true, "measure");
    this.setColour(130);
    this.setTooltip("A measure with a specified key signature, time signature, and notes");
    this.setHelpUrl("");
  }
};

function getNoteCode(note) {
  var pitch = note.getFieldValue('NOTE');
  var accidental = note.getFieldValue('ACCIDENTAL');
  var duration = note.getFieldValue('DURATION');
  var code = pitch + accidental + duration;
  return code;
}

Blockly.Blocks['note'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Note");
    this.appendDummyInput()
        .appendField("Note Name:")
        .appendField(new Blockly.FieldDropdown([["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"], ["G", "G"]]), "noteName");
    this.appendDummyInput()
        .appendField("Octave:")
        .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"]]), "octave");
    this.appendDummyInput()
        .appendField("Accidental:")
        .appendField(new Blockly.FieldDropdown([["(Blank)", ""], ["Natural", "natural"], ["Sharp", "sharp"], ["Flat", "flat"]]), "accidental");
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
    this.setPreviousStatement(true, "note");
    this.setNextStatement(true, "note");
  }
};

Blockly.Blocks['song'] = {
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

Blockly.JavaScript['song'] = function(block) {
  var measures = Blockly.JavaScript.statementToCode(block, 'MEASURES');
  var tempo = block.getFieldValue('TEMPO');
  var instrument = block.getFieldValue('INSTRUMENT');
  var json = {
    "type": "song",
    "tempo": tempo,
    "instrument": instrument,
    "measures": JSON.parse(measures)
  };
  var code = JSON.stringify(json, null, 2);
  return code;
};

Blockly.JavaScript['measure'] = function(block) {
  var key = block.getFieldValue('KEY');
  var time = block.getFieldValue('TIME');
  var notes = Blockly.JavaScript.statementToCode(block, 'NOTES');
  var json = {
    "type": "measure",
    "key": key,
    "time": time,
    "notes": JSON.parse(notes)
  };
  var code = JSON.stringify(json, null, 2);
  return code;
};

Blockly.JavaScript['note'] = function(block) {
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
  var code = JSON.stringify(json, null, 2);
  return code;
};