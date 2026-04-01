# maplibre-scale-factory
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Plugin to display metric and imperial scales in MapLibre GL JS.

## Features

- Scales in metric and imperial units with optional label overflow
- Custom max width

## Installation

```bash
npm install maplibre-scale-factory
```

## Api

### Scale Factory Options

| Option | Type | Default | Description | Mandatory |
| - | - | - | - | - |
| `maxWidth`| number | 120 | Max width of the scale bar | No |
| `withLabelOverflow`| boolean | false | Show full label even if it overflows | No |

## Example

The example below shows how to use the MapLibre Scale Factory to display metric and imperial scale bars.

```javascript
import { MapLibreScaleFactory } from "maplibre-scale-factory";
import "maplibre-scale-factory/style.css";

const scaleFactory = new MapLibreScaleFactory({ withLabelOverflow: false });
map.addControl(scaleFactory, "bottom-left");
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://studiorabota.com"><img src="https://avatars.githubusercontent.com/u/8339389?v=4?s=100" width="100px;" alt="Vincent Kranendonk"/><br /><sub><b>Vincent Kranendonk</b></sub></a><br /><a href="#design-studiorabota" title="Design">🎨</a> <a href="#ideas-studiorabota" title="Ideas, Planning, & Feedback">🤔</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!