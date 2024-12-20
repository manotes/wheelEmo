const emotions = [
    "Enthusiastic", "Alert", "Inspired", "Excited", "Proud", "Determined", "Strong", "Active", "Attentive",
    "Interested", "Distressed", "Upset", "Hostile", "Irritable", "Nervous", "Jittery", "Ashamed", "Guilty",
    "Scared", "Afraid"
];

// Original colors (dark tones)
const colors = [
    "darkred", "red", "orangered", "orange", "gold", "yellow", "lightgreen", "limegreen",
    "green", "teal", "cyan", "blue", "darkblue", "indigo", "purple", "violet", "pink",
    "brown", "maroon", "darkviolet"
];

// Lightened colors (closer to white)
const lightenedColors = colors.map(color => lightenColor(color, 0.4));

const container = document.querySelector('.emotion-wheel');
const centerX = 300; // Center X for the wheel
const centerY = 300; // Center Y for the wheel
const radii = [360, 280, 200, 130]; // Adjusted radii to avoid overlaps
const sizes = [80, 80*0.8, 80*0.6, 80*0.4]; // Adjusted sizes for each layer
const opacities = [1, 0.9, 0.8, 0.7]; // Opacities for the four layers

// Track the currently selected button for each color
const selectedButtons = new Map();

// Loop through each layer
radii.forEach((radius, layerIndex) => {
    emotions.forEach((emotion, index) => {
        const angle = (index / emotions.length) * 2 * Math.PI; // Divide the circle evenly

        const x = centerX + radius * Math.cos(angle); // X position for the button
        const y = centerY + radius * Math.sin(angle); // Y position for the button

        // Create the button
        const button = document.createElement('button');
        button.className = 'emotion-button';
        button.style.backgroundColor = lightenedColors[index % colors.length];
        button.style.opacity = opacities[layerIndex]; // Set the opacity
        button.style.width = `${sizes[layerIndex]}px`; // Adjust size based on the layer
        button.style.height = `${sizes[layerIndex]}px`;
        button.style.left = `${x - sizes[layerIndex] / 2}px`; // Offset to center the button
        button.style.top = `${y - sizes[layerIndex] / 2}px`; // Offset to center the button
        button.style.position = 'absolute';

        // Add text only to the outermost layer
        if (layerIndex === 0) {
            button.innerText = emotion;
        }

        // Add click event to toggle color
        button.addEventListener('click', () => {
            const colorIndex = index % colors.length;
            const originalColor = colors[colorIndex];
            const lightenedColor = lightenedColors[colorIndex];

            // If the button is already selected, deselect it
            if (selectedButtons.get(colorIndex) === button) {
                button.style.backgroundColor = lightenedColor;
                selectedButtons.delete(colorIndex);
            } else {
                // Deselect the previously selected button for this color
                if (selectedButtons.has(colorIndex)) {
                    const prevButton = selectedButtons.get(colorIndex);
                    prevButton.style.backgroundColor = lightenedColor;
                }

                // Select the clicked button
                button.style.backgroundColor = originalColor;
                selectedButtons.set(colorIndex, button);
            }
        });

        container.appendChild(button);
    });
});

// Function to lighten a color
function lightenColor(color, factor) {
    const div = document.createElement("div");
    div.style.color = color;
    document.body.appendChild(div);
    const rgb = getComputedStyle(div).color.match(/\d+/g).map(Number);
    document.body.removeChild(div);

    const [r, g, b] = rgb.map(c => Math.min(255, Math.round(c + (255 - c) * factor)));
    return `rgb(${r}, ${g}, ${b})`;
}
