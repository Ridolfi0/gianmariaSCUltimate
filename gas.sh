#! /bin/bash
echo -e "\n### GAS: Build for Google Apps Script ###\n"

GAS_DIR="./gas"
DIST_DIR="./dist"

# Check if the ./dist folder created
if [ ! -d $DIST_DIR ]
then
    echo -e "\n### GAS: You Need to Build the Project First! ###\n"
    return 0
fi

# Create Root Folder gas if not created
if [ ! -d $GAS_DIR ]
then
    mkdir $GAS_DIR
fi

# Copy ./dist/index.html to ./gas/index.html

cat dist/index.html| sed -E 's/<script type="module".+script>/<?!= includes(\"js.html\"); ?>/' | sed -E "s/<link rel=\"stylesheet\" crossorigin.+>/<?!= includes(\"css.html\"); ?>/"  > ./gas/index.html
#sed -i'' -e 's|</head>|<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">\n<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">\n</head>|' "$GAS_DIR/index.html"
#sed -i'' -e 's|</body>|<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>\n</body>|' "$GAS_DIR/index.html"


echo -e "### GAS: Index.html Created! ###"

# Copy ./dist/assets/index.*.js ./gas/javascript.html
echo "<script type=\"module\" crossorigin>" > ./gas/js.html
cat ./dist/assets/index-*.js >> ./gas/js.html
echo "</script>" >> ./gas/js.html
echo -e "### GAS: js.html Created! ###"


# Copy ./dist/assets/index.*.css ./gas/css.html
echo "<style>" > ./gas/css.html
cat ./dist/assets/index-*.css >> ./gas/css.html
echo "</style>" >> ./gas/css.html
echo -e "### GAS: css.html Created! ###"

echo -e "\n### GAS: Done! ###\n"