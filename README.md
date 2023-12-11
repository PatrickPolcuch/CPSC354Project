# Language for Music (LFM)
Group: Christopher Isidro, Spencer Lafferty, Justin Lee, Patrick Polcuch

https://patrickpolcuch.github.io/CPSC354Project/src/design-blocks/

src/design-blocks is where our current working project is.

Project Description: 

Our group aims to make a language that specializes in music creation and analysis. We intend to use the placement of blocks to represent sound in order to make music creation more accessible to those not musically trained. This programming language will assist in writing sheet music, and creating music compositions.  A sound library will be utilized to allow the programmer to switch between instruments while adding their respective notes to the sheet.  Some smaller ideas the group has for this language are having booleans that analyze your current music and determine whether some notes harmonize or clash.  On top of this you will be able to set time signatures so the language can determine where to place your notes.


# Site
To try LFM, simply go to this site/
https://patrickpolcuch.github.io/CPSC354Project/src/design-blocks/

Drag and drop blocks to create music. Its that simple!


# Videos
Project Introduction: https://www.youtube.com/watch?v=TUVzcDXWZWc

Technical Introduction: https://youtu.be/_0UMbIdliVQ


# Usage Instructions
Language for Music is very simple to use through the Blockly-based web application. It works identically to other blockly applications: drag the blocks onto the design area and fill the parameters as you wish. Blocks attach to and fit inside one another, depending on the type of block. The program should keep the user from building a composiition that is not musically possible. Once you're done with the composition, simply press play and listen to what you've created.  

In order to add your own blocks, you must add it to index.html, and both the functionality and the json generation must be added to custom_blocks.js. 


# Regrets
When we first started this project, the material was almost entirely brand new and only one of us had any real background in music. While we're confident with our final product, we intially underestimated the scope of what we wanted to do. Notably, our attempts to convert to other data types (such as midi) in order to connect it to other music production software ran into dead ends. Most of the popular software costs money, and the few that don't aren't open source, so it's very difficult to try to connect with them. Another goal we were unable to meet was hooking up a small database of musical instruments that users could use. Even for one or two instruments, the database would be far larger than what was realistically accessible, and actually wiring the database into the application would have become another task that was just out of the scope of what we were able to do. 


# Moving forward
LFM is still early on in development, and there is much more functionality to be implemented as well as existent functionality to be improved. 
- The ability to choose instruments to replace the current default, "buzzing" sound. 
- A way to convert compositions into other music making software such as GarageBand and F1 Studio. 
- Easy traversal of the composition while listening. In other words, when you listen to the blocks, you can skip ahead rather than having to listen from the beginning.
- A metronome to help users who are less experienced in music get a grasp of time signatures.
