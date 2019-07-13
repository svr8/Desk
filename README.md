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
+ [Linux(.deb)](https://www.mediafire.com/file/null/desk_1.1.4_amd64.deb/file)
+ [Linux(Portable)](https://www.mediafire.com/file/pdx6a3l2xdt4y3z/Desk-linux-x64.zip/file)
+ [Mac](https://www.mediafire.com/file/ufkhnlmozw6kvb0/Desk-darwin-x64.zip/file)

# Instructions
## On First Time Startup
- Create 2 empty files(example: `input.txt`, `output.txt`) anywhere you desire on your computer. These files will be used as input output sources.
- Go to settings(button on bottom left).
- You'll see 2 options to set the files. Set them as the files you just created
- Run the executable file and you're ready to go. No language-specific prequisites as in previous versions. The IDE will automatically detect the file from its file extensions(`.java`, `.c`, `.cpp`, `.py`) and configure itself accordingly.

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
Please refer to the instructions [here](https://www.christianengvall.se/electron-installer-debian-package/).

## Contribution
Feel free to fork and send PRs or even open issues. Please send any feature requests as issues too. It would be great if you can help in adding support for more languages.
Moreover, there is a custom source-code-editor in pre-alpha stage [here](https://github.com/MFOSSociety/sourcecodearea).

# Credits
Designed By : [Divyakant Singh](https://www.behance.net/divyakantsingh) and [Veer Singh](https://www.instagram.com/weavingweb/) <br/>
Developed By : Shikhar Vaish ([MIT LICENSE](https://github.com/svr8/Desk/blob/master/LICENSE))
