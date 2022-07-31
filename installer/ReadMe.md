# Build the desktop app

## Executable
pip install pyinstaller

pyinstaller --noconfirm --onedir --windowed --icon "<icon path>" --key "<key>" --debug "all" --target-architecture "<arch>" --codesign-identity "<arch identity>" --add-data "<path>;." --add-data "<path>;." --<path><folder>;<folder>/" "<main-path>"
## Installer

1. Download and install [Inno Setup](https://www.jrsoftware.org/isinfo.php)
2. Add the dependencies that need to be installed as instructed in the installerSetup file
3. Modify other sections like _[Setup] [Files] [Icons]_
4. Add your executables to installer/srs/
4. Build setup using Inno Setup compiler
