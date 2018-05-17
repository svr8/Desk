# Desk
A light-weight ide for competitive programming. The editor uses [ace-editor](https://github.com/ajaxorg/ace) as syntax highlighter and [electron](https://electronjs.org/) that wraps up everything.

![Screenshot](https://github.com/svr8/Desk/blob/master/Screenshot.PNG)

# Downloads
+ [Windows](http://www.mediafire.com/file/ki3m3nyi0u333ks/Desk-1.0.0-Windows.zip)

# How to use
+ You'll find a `commands` folder after you download and extract.
Find the file `java.js`. This is a build file that contains terminal commands for java, to compile, run and stop. Duplicate this file and edit the commands to suit your language.<br/>
+ In the app, set the build file path as the file you created. The input and output file paths are files that the ide will use to store input and output, respectively. Create 2 .txt files and set their paths. That's it, you're ready to code now.
# Running Locally
## Prerequisites
+ [Git](https://git-scm.com/)
+ [nodejs and npm](https://nodejs.org/en/)
+ [yarn](https://www.npmjs.com/package/yarn) (recommended for [electron-builder](https://www.npmjs.com/package/electron-builder))

## Setup
OS: Windows 10
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

+ Build<br/>
`build -w`

# Credits
Designed By : [Divyakant Singh](https://www.behance.net/divyakantsingh) and [Veer Singh](https://www.instagram.com/weavingweb/) <br/>
Developed By : Shikhar Vaish ([MIT LICENSE](https://github.com/svr8/Desk/blob/master/LICENSE))
