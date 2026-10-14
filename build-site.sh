#!/bin/sh
# Builds index.html, the stand-alone web page for GitHub Pages, from bingo-bloom.html.
cd "$(dirname "$0")"
{ printf '<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#3d1680"><style>html,body{height:100%%;margin:0}</style></head><body>\n'; cat bingo-bloom.html; printf '\n</body></html>\n'; } > index.html
