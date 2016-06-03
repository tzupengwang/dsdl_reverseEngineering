# NTUEE Info Express Starter Kit

## Overview

這個 Starter Kit 基本上由下列 packages 組成 ：
- Express 與它的小夥伴們
- gulp 與它的小夥伴們
- winston
- browserify (可換成 webpack ，參照後文)
- browserSync

詳細的列表可參照 `package.json` ，而每個 packages 的用法請直接參照它們的文件。

## Usage

下面說明了一些使用上的重點。

- About tools
- About environment variables
- Logging
- Template engine

## Webpack or Browserify?

使用哪一個其實是見人見智的問題，此 repo 為了簡單跟示範如何使用 gulp
，使用 browserify 來處理前端的 javscript 。但是有些情況下使用 webpack
會比較輕鬆，因此獨立出了一塊來介紹如何改用 webpack 。參見
[Use Webpack] 。

## Recipes

這邊列出一些常見的配方，如何搭配就看需求了。

- babel
- react + redux
- vuejs + redux
- socket.io
