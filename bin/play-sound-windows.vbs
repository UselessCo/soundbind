Dim oPlayer, filePath
Set oPlayer = CreateObject("WMPlayer.OCX")

' Get arguments
filePath = WScript.Arguments(0)

' Play audio
oPlayer.URL = filePath
oPlayer.controls.play

' Wait until playback finishes
While oPlayer.playState <> 1
  WScript.Sleep 100
Wend

' Release the audio file
oPlayer.close

' Exit cleanly
WScript.Quit