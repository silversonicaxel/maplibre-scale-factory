import './index.css';
import type { IControl, Map } from "maplibre-gl";
import { imperialScale, metricScale } from "./utils";

export interface MapLibreScaleFactoryOptions {
	maxWidth?: number;
	withLabelOverflow?: boolean;
}

interface ScaleResult {
	distance: number;
	label: string;
}

export class MapLibreScaleFactory implements IControl {
	#map?: Map;
    #container?: HTMLDivElement;
    #metricBar?: HTMLElement;
	#imperialBar?: HTMLElement;
	#isRightSide: boolean = false;
	readonly #maxWidth: number;
	readonly #withLabelOverflow: boolean;

	constructor(options: MapLibreScaleFactoryOptions = {}) {
		this.#maxWidth = options.maxWidth || 120;
		this.#withLabelOverflow = options.withLabelOverflow || false;
	}

	#createContainer(): HTMLDivElement {
		const container = document.createElement("div");
		container.className = "scale-factory-container maplibregl-ctrl";

		const [metricBar] = this.#buildBar("metric");
		const [imperialBar] = this.#buildBar("imperial");

		this.#metricBar = metricBar;
		this.#imperialBar = imperialBar;

		container.appendChild(metricBar);
		container.appendChild(imperialBar);
		return container;
  	}

  	#buildBar(system: "metric" | "imperial"): [HTMLElement] {
		const bar = document.createElement("div");
		const clipClass = this.#withLabelOverflow ? "" : " scale-factory-bar-clip";
		bar.className = `scale-factory-bar scale-factory-bar--${system}${clipClass}`;
		bar.style.width = `${this.#maxWidth}px`;

		const label = document.createElement("span");
		label.className = `scale-factory-label scale-factory-label--${system}`;

		bar.appendChild(label);
		return [bar];
  	}

  	#updateBars = (): void => {
		const map = this.#map;
		if (!map || !this.#metricBar || !this.#imperialBar) {
			return;
		}

		const containerHeight = map.getContainer().clientHeight;
		const containerMiddleY = containerHeight / 2;

		const left = map.unproject([0, containerMiddleY]);
		const right = map.unproject([this.#maxWidth, containerMiddleY]);
		const mapDistanceMeters = left.distanceTo(right);

		if (!isFinite(mapDistanceMeters) || mapDistanceMeters <= 0) {
			return;
		}

		this.#updateScale(this.#metricBar, metricScale(mapDistanceMeters, this.#maxWidth), mapDistanceMeters);
		this.#updateScale(this.#imperialBar, imperialScale(mapDistanceMeters, this.#maxWidth), mapDistanceMeters);
  	};

	#updateScale(bar: HTMLElement, scale: ScaleResult, distanceMeters: number): void {
		const ratio = Math.min(scale.distance / distanceMeters, 1);
		const width = Math.max(Math.round(this.#maxWidth * ratio), 20);
		bar.style.width = `${width}px`;

		const label = bar.querySelector("span");
		if (label) {
			label.textContent = scale.label;
		}
	}

  	onAdd(map: Map): HTMLElement {
		this.#map = map;

		this.#container = this.#createContainer();
		map.on("move", this.#updateBars);
		map.on("moveend", this.#updateBars);
		this.#updateBars();

		requestAnimationFrame(() => {
			const group = this.#container?.parentElement;
			this.#isRightSide = group?.classList.contains("maplibregl-ctrl-top-right") || group?.classList.contains("maplibregl-ctrl-bottom-right") || false;

			if (this.#isRightSide) {
				this.#container?.classList.add("scale-factory-container--align-right");
			}

			if (this.#withLabelOverflow && this.#isRightSide) {
				this.#metricBar?.classList.add("scale-factory-bar--overflow-left");
				this.#imperialBar?.classList.add("scale-factory-bar--overflow-left");
			}
		});

    	return this.#container;
	}

  	onRemove(): void {
		this.#map?.off("move", this.#updateBars);
		this.#map?.off("moveend", this.#updateBars);
		this.#container?.parentNode?.removeChild(this.#container);
		this.#container?.remove();
		this.#map = undefined;
		this.#container = undefined;
	}
}
