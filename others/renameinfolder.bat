@echo off
Setlocal enabledelayedexpansion

Set /p Pattern=Ce inlocuiesc?  : 
Set /p Replace=Cu ce il inlocuiesc?  : 

For %%a in (*.*) Do (
    Set "File=%%~a"
    Ren "%%a" "!File:%Pattern%=%Replace%!"
)

Pause&Exit