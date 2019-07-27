# Desk
A light-weight ide for competitive programming. The editor uses [ace-editor](https://github.com/ajaxorg/ace) as syntax highlighter and [electron](https://electronjs.org/) that wraps up everything.

# Features
- Auto Detect language from file extensions and configure its system commands accordingly. No need to setup build files, install and ready to go.
- There is a IO panel to quickly change inputs. Custom IO files are also supported.
- Keyboard shortcuts to compile/run/stop.
- Minimal design, dark theme.

![Screenshot](https://github.com/svr8/Desk/blob/master/Preview.PNG)

# Downloads
+ [Windows](https://www.dropbox.com/s/tv8rl6djl43kbrp/Desk%20Setup%201.1.5.exe?dl=0)
+ [Linux(.deb)](https://www.dropbox.com/s/wc6ybs1nfisajcg/desk_1.1.5_amd64.deb?dl=0)
+ [Mac](https://www.dropbox.com/s/dlyraihv8murusg/Desk-darwin-x64.zip?dl=0)

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

#### Windows Build
`electron-builder --windows nsis:ia32`

## Contribution
Feel free to fork and send PRs or even open issues. Please send any feature requests as issues too. It would be great if you can help in adding support for more languages.
Moreover, there is a custom source-code-editor in pre-alpha stage [here](https://github.com/MFOSSociety/sourcecodearea).
# Credits
Designed By : [Divyakant Singh](https://www.behance.net/divyakantsingh) and [Veer Singh](https://www.instagram.com/weavingweb/) <br/>
Developed By : Shikhar Vaish ([MIT LICENSE](https://github.com/svr8/Desk/blob/master/LICENSE))
