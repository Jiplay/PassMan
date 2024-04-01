# PASSMAN!

## About

PassMan is my own PASSword MANager developed integrally by me, for my personal usage. It's built with Go and Typescript
It's a cross-platform application developed with Wails. I'll write some articles in the future about it on my blog https://jgblog.vercel.app/.

I used Wails for the ability to use TS, Fyne was less adapted to my use case according to me

There are several features already developed :
* using bcrypt for the main password
* other password are hashed with SHA-256.
* Generating password
* Cool logo

But I'm not done, I'll create other to develop my skills, and to fill my needs :)

## Building

To build a redistributable, production mode package, use `wails build`.

To build a windows application : `wails build -platform windows/amd64 -nsis`
