Measure block: The measure block will contain two drop down fields and a space for note blocks to fit in. The drop down fields will be for the key signature and the time signature. The key signatures will be one of the 12 standard keys. These will be key objects. When the measure runs, it will call a function on the key that pulls the key data from a hash table. The measure will then interpret the note in the measure and give the corresponding sharp or flat. 

Note block:  The note block will have 5 drop down values to determine the sound and placement of the note. These five are:
              * note name - will tell the block which pitch the note will be
              * ocatave - will tell the block which octave to place the note in
              * accidental - if the note is played as is (default), sharp, flat, or natural
              * duration - how long the note will be played
              * beat - when the note will be played

Song block: This block will be what the measure blocks will be placed in. It will be responsible for:
            * Tempo
            * Instrument used
            * Starting and ending the file
            * any other responsbilities not covered by the note and measure blocks
