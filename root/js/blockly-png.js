/*
I've only tested this with http://codethemicrobit.com in Chrome, but it should work in other browsers
Paste the JS below into the Chrome Developer Tools Console and hit enter
It will then open the generated PNG file in a new tab, from where it can be copied/saved
Based on https://gist.github.com/acbart/dcda677555e97b59c1c91554270dc80b, with adaptations for styling
and output format
*/

//By default the image will be rendered at the same resolution as your display, but if you increase
//this value you can render a much higher resolution image, which looks better on high density displays
var scaleFactor = 1;

//Any modifications are executed on a deep copy of the element
var cp = Blockly.mainWorkspace.svgBlockCanvas_.cloneNode(true);
cp.removeAttribute("width");
cp.removeAttribute("height");
cp.removeAttribute("transform");

//It is important to create this element in the SVG namespace rather than the XHTML namespace
var styleElem = document.createElementNS("http://www.w3.org/2000/svg", "style");
//I've manually pasted codethemicrobit.com's CSS for blocks in here, but that can be removed as necessary
styleElem.textContent = Blockly.Css.CONTENT.join('') + ".blocklyToolboxDiv {background: rgba(0, 0, 0, 0.05);}.blocklyMainBackground {stroke:none !important;}.blocklyTreeLabel, .blocklyText, .blocklyHtmlInput {font-family:'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace !important;}.blocklyText { font-size:1rem !important;}.rtl .blocklyText {text-align:right;} .blocklyTreeLabel { font-size:1.25rem !important;} .blocklyCheckbox {fill: #ff3030 !important;text-shadow: 0px 0px 6px #f00;font-size: 17pt !important;}";
cp.insertBefore(styleElem, cp.firstChild);

//Creates a complete SVG document with the correct bounds (it is necessary to get the viewbox right, in the case of negative offsets)
var bbox = Blockly.mainWorkspace.svgBlockCanvas_.getBBox();
var xml = new XMLSerializer().serializeToString(cp);
xml = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="'+bbox.width+'" height="'+bbox.height+'" viewBox="' + bbox.x + ' ' + bbox.y + ' '  + bbox.width + ' ' + bbox.height + '"><rect width="100%" height="100%" fill="white"></rect>'+xml+'</svg>';
//If you just want the SVG then do console.log(xml)
//Otherwise we render as an image and export to PNG
var svgBase64 = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(xml)));
var img = document.createElement('img');
img.src = svgBase64;

var canvas = document.createElement("canvas");
canvas.width = Math.ceil(bbox.width) * scaleFactor;
canvas.height = Math.ceil(bbox.height) * scaleFactor;
var ctx = canvas.getContext('2d');
ctx.scale(scaleFactor, scaleFactor);

//Might need to be in img.onload(function() {...}) in other browsers
ctx.drawImage(img, 0, 0);

//Opens the PNG image in a new tab for copying/saving
window.open(canvas.toDataURL(), '_blank');