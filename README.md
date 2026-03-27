# maplibre-scale-factory

Plugin to display metric and imperial scales in MapLibre GL JS.

## Features

- Scale

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
import { MapLibreScaleFactory } from './src/index.ts';
import "maplibre-scale-factory/style.css";

const scaleFactory = new MapLibreScaleFactory({ withLabelOverflow: false });
map.addControl(scaleFactory, "bottom-left");
```
