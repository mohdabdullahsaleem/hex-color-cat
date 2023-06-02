/**
 * @summary Converts an RGB color value to HEX color.
 *
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @param {number} a
 * @returns {string}
 */
function RGBAToHexA(r, g, b, a) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);
  a = Math.round(a * 255).toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;
  if (a.length == 1) a = "0" + a;

  return "#" + r + g + b + a;
}

/**
 * @description Converts a hex color value to RGB.
 *
 * @param {string} h
 * @returns {number[]}
 */
function hexToRGB(h) {
  let r = 0,
    g = 0,
    b = 0;

  if (h.length == 4) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];
  } else if (h.length == 7) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
  }

  return [+r, +g, +b];
}

/**
 * @description Converts a hex color value to an alpha hex color value.
 *
 * @param {string} hex
 * @param {number} opacity
 * @returns
 */
function hexToHexAlpha(hex, opacity) {
  if (opacity === 1) {
    return hex;
  } else {
    let rgb = hexToRGB(hex);
    return RGBAToHexA(rgb[0], rgb[1], rgb[2], opacity);
  }
}

/**
 * @description Changes the color of the background and the text based upon the color picker and the opacity slider.
 *
 * @returns {void}
 */
function changeColor() {
  // Get the elements
  let colorPicker = document.getElementById("base-color");
  let rangeSlider = document.getElementById("opacity-range");
  let copyButton = document.getElementById("copy-button");
  let colorValue = document.getElementById("base-color");
  let opacityValue = document.getElementById("base-color");

  // Set the initial values
  let color = "#000000";
  let opacity = 1;

  // Add event listener to the color picker
  colorPicker.addEventListener("input", function () {
    color = colorPicker.value;
    colorValue.style.backgroundColor = colorPicker.value;
    colorValue.innerHTML = colorPicker.value;
    opacityValue.style.opacity = rangeSlider.value;
    opacityValue.innerHTML = rangeSlider.value;

    colorValue.style.backgroundColor = hexToHexAlpha(
      colorPicker.value,
      rangeSlider.value / 1000
    );

    opacityValue.style.opacity = rangeSlider.value / 1000;
    opacityValue.innerHTML = rangeSlider.value / 1000;
  });

  // Add event listener to the opacity slider
  rangeSlider.addEventListener("input", function () {
    opacity = rangeSlider.value / 1000;
    colorValue.style.backgroundColor = hexToHexAlpha(
      colorPicker.value,
      rangeSlider.value / 1000
    );

    opacityValue.style.opacity = rangeSlider.value / 1000;
    opacityValue.innerHTML = rangeSlider.value / 1000;
  });

  // Add event listener to the copy button
  copyButton.addEventListener("click", function () {
    navigator.clipboard.writeText(hexToHexAlpha(color, opacity));
    copyButton.innerHTML = "Copied!";

    setTimeout(function () {
      copyButton.innerHTML = "Copy";
    }, 1000);
  });
}

window.addEventListener("load", changeColor, false);
