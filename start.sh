#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
echo "Starting PCIP Study App on http://localhost:8080 ..."
open "http://localhost:8080" 2>/dev/null || open "$DIR/index.html"
cd "$DIR" && python3 -m http.server 8080
