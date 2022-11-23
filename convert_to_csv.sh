#!/usr/bin/env bash

# ---- VARIABLES ----
EXISTS_XLSX2CSV=$(which xlsx2csv)
FILENAME="./docs/Pokemon_Go.xlsx"
OUTPUT="./docs/Pokemon_Go.csv"

# ---- TESTS ---
if [ -z "$EXISTS_XLSX2CSV" ]; then
    echo "xlsx2csv is not installed, please install it first."
    sudo apt install xlsx2csv
fi

# --- EXECUTION ----
xlsx2csv "$FILENAME" >"$OUTPUT"
