# maplibre-scale-factory

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
