interface ScaleResult {
    distance: number;
    label: string;
}

const METRIC_STEPS_M = [
    1, 2, 5, 10, 20, 50, 100, 200, 500,
    1_000, 2_000, 5_000, 10_000, 20_000, 50_000,
    100_000, 200_000, 500_000, 1_000_000,
];

const IMPERIAL_STEPS_FT = [
    1, 2, 5, 10, 20, 50, 100, 200, 500, 1_000, 2_000,
    5_280,
    5_280 * 2,
    5_280 * 5,
    5_280 * 10,
    5_280 * 20,
    5_280 * 50,
    5_280 * 100,
    5_280 * 500,
    5_280 * 1_000,
];

const MIN_BAR_PX = 50;

function selectOptimalStep(maxValue: number, steps: number[], maxWidth: number): number {
    let indexStep = 0;
    for (let i = 0; i < steps.length; i++) {
        if (steps[i] <= maxValue) {
            indexStep = i;
        }
        else {
            break;
        }
    }

    for (let i = indexStep; i < steps.length; i++) {
        const px = (steps[i] / maxValue) * maxWidth;
        if (px >= MIN_BAR_PX) {
            return steps[i];
        }
    }

    return steps[steps.length - 1];
}

export function metricScale(maxMeters: number, maxWidth: number): ScaleResult {
    const distance = selectOptimalStep(maxMeters, METRIC_STEPS_M, maxWidth);
    const label = distance >= 1_000 ? `${distance / 1_000} km` : `${distance} m`;
    return { distance, label };
}

export function imperialScale(maxMeters: number, maxWidth: number): ScaleResult {
    const maxFeet = maxMeters * 3.28084;
    const distanceFt = selectOptimalStep(maxFeet, IMPERIAL_STEPS_FT, maxWidth);
    const label = distanceFt >= 5_280 ? `${distanceFt / 5_280} mi` : `${distanceFt} ft`;
    return { distance: distanceFt / 3.28084, label };
}
