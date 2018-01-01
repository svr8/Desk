# Desk
A light-weight ide for competitive programming. The editor uses [ace-editor](https://github.com/ajaxorg/ace) as syntax highlighter and [electron](https://electronjs.org/) that wraps up everything.

![Screenshot](https://github.com/svr8/Desk/blob/master/Screenshot.PNG)

# Downloads
+ [Windows](http://www.mediafire.com/file/ki3m3nyi0u333ks/Desk-1.0.0-Windows.zip)
+ [Ubuntu](http://www.mediafire.com/file/m7w5akr74dg9btw/Desk-1.0.0-Linux-x86_64.tar.gz)

# How to use
You'll find a `commands` folder after you download and extract.
Find the file `java.js` in your os(windows/linux). This is a build file that contains terminal commands for java, to compile, run and stop. Edit this file to suit your language. In the app, update settings and you're ready to code.
# Running Locally
## Prerequisites
+ [Git](https://git-scm.com/)
+ [nodejs and npm](https://nodejs.org/en/)
+ [yarn](https://www.npmjs.com/package/yarn) (recommended for [electron-builder](https://www.npmjs.com/package/electron-builder))

## Setup
+ Install electron globally<br/>
`sudo npm install electron -g`<br/>
You might face installation issues. If the above fails, this should work:<br/>
`sudo npm install -g electron --unsafe-perm=true --allow-root`

+ Clone the repository<br/>
`git clone https://github.com/svr8/Desks.git`

+ Install dependencies<br/>
`cd` into cloned directory and execute:
`npm install`

## Run
+ Run<br/>
`npm run`

+ Build<br/>
`yarn dist`

## CREDITS
Designed By : [Divyakant Singh](https://www.behance.net/divyakantsingh) and [Veer Singh](https://www.instagram.com/weavingweb/) <br/>
Developed By : Shikhar Vaish ([MIT LICENSE](https://github.com/svr8/Desk/blob/master/LICENSE))
