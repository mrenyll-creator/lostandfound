# PowerShell script to download SQLite amalgamation for Windows

$version = "3460100"
Write-Host "Downloading SQLite amalgamation version $version..."
Invoke-WebRequest -Uri "https://www.sqlite.org/2024/sqlite-amalgamation-$version.zip" -OutFile "sqlite-amalgamation.zip"

Write-Host "Extracting..."
Expand-Archive "sqlite-amalgamation.zip" -DestinationPath "./sqlite-amalgamation"

Copy-Item "./sqlite-amalgamation/sqlite3.c" -Destination "./" -Force
Copy-Item "./sqlite-amalgamation/sqlite3.h" -Destination "./" -Force

Write-Host "Cleaning up..."
Remove-Item "sqlite-amalgamation.zip"
Remove-Item "./sqlite-amalgamation" -Recurse

Write-Host "SQLite amalgamation downloaded and copied."
