![Monk banner](banner.webp)
``` text
author: monkvision
name: monk-translation-generator
description: Tool generating a translations JSON file
version: 1.0.0
```

## Usage

``` sh
git clone https://github.com/monkvision/translation-generator.git
cp .env .env.local
yarn install
yarn start
```

## Examples

**Env**
.env.local
``` dotenv
# .env.local
RUN=true

TRANSLATE_API_BASE_URL=https://libretranslate.de
FILE_PREVSTATE=files/prevState.json
FILE_ADDKEYS=files/addKeys.json
FILE_NEXTSTATE=files/nextState.json

SOURCE_LNG=en
TARGET_LNG=fr

DEBUG=true
AUTOTRANSLATE=true
NESTED_JSON=
```

**Inputs**
files/prevState.json
``` json
{
  "zero": "zero",
  "one": "one",
  "two": "two",
  "three": "three",
  "four": "four",
  "five": "five"
}
```
files/addKeys.json
``` json
[
  "six",
  "seven",
  "eight",
  "nine"
]
```

**Output**
files/nexState.json
``` json
{
  "zero": "zéro",
  "one": "un",
  "two": "deux",
  "three": "trois",
  "four": "quatre",
  "five": "cinq",
  "six": "six",
  "seven": "sept",
  "eight": "huit",
  "nine": "neuf"
}
```

## License

This project is licensed under the Clear BSD license. See the [LICENSE](LICENSE) file for more info.
