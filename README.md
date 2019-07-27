# Desk
A light-weight ide for competitive programming. The editor uses [ace-editor](https://github.com/ajaxorg/ace) as syntax highlighter and [electron](https://electronjs.org/) that wraps up everything.

# Features
- Auto Detect language from file extensions and configure its system commands accordingly. No need to setup build files, install and ready to go.
- There is a IO panel to quickly change inputs. Custom IO files are also supported.
- Keyboard shortcuts to compile/run/stop.
- Minimal design, dark theme.

![Screenshot](https://github.com/svr8/Desk/blob/master/Preview.PNG)

# Downloads
+ [Windows](https://www.mediafire.com/file/3g7d2dmntep23ig/Desk-win32-ia32.zip/file)
+ [Linux(.deb)](https://www.mediafire.com/file/3l4taqh973x8b8z/desk_1.1.5_amd64.deb/file)
+ [Mac](https://www.mediafire.com/file/laekink77nmws72/Desk-darwin-x64.zip/file)

## Important Keyboard Shortcuts
- Ctrl + 1 : Compile
- Ctrl + 2 : Start Execution
- Ctrl + 3 : Stop Execution
- Ctrl + I : Toggle I/O Panel

# Running Locally
## Prerequisites
+ [Git](https://git-scm.com/)
+ [nodejs and npm](https://nodejs.org/en/)

## Setup
+ Install electron globally<br/>
`npm install electron -g`<br/>
You might face installation issues. If the above fails, this should work:<br/>
`npm install -g electron --unsafe-perm=true --allow-root`

+ Clone the repository<br/>
`git clone https://github.com/svr8/Desks.git`

+ Install dependencies<br/>
`cd` into cloned directory and execute:
`npm install`

## Run
+ Run<br/>
`npm start`

## Build
Please refer to the tutorial on [electron-installer-debian](https://www.christianengvall.se/electron-installer-debian-package/) and [electron-packager](https://www.christianengvall.se/electron-packager-tutorial/).

#### Build Linux
`electron-packager . --overwrite --asar=true --platform=linux --arch=x64 --icon=assets/icons/png/512x512.png --prune=true --out=release-builds`

#### Build .deb using Build Linux
`electron-installer-debian --src release-builds/Desk-linux-x64/ --arch amd64 --config debian.json`

#### Mac Build
`electron-packager . --overwrite --platform=darwin --arch=x64 --icon=assets/icons/mac/icon.icns --prune=true --out=release-builds`

## Contribution
Feel free to fork and send PRs or even open issues. Please send any feature requests as issues too. It would be great if you can help in adding support for more languages.
Moreover, there is a custom source-code-editor in pre-alpha stage [here](https://github.com/MFOSSociety/sourcecodearea).
The [Mac version](https://www.mediafire.com/file/ufkhnlmozw6kvb0/Desk-darwin-x64.zip/file) has got bugs. Need help here too.

# Credits
Designed By : [Divyakant Singh](https://www.behance.net/divyakantsingh) and [Veer Singh](https://www.instagram.com/weavingweb/) <br/>
Developed By : Shikhar Vaish ([MIT LICENSE](https://github.com/svr8/Desk/blob/master/LICENSE))
