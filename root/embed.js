(function() {
    let cssScript = document.createElement("style");
    cssScript.innerHTML = `
.mangoblock-embed {
    display: inline-block;
    border: #D0D3D4 1px solid;
}

.mangoblock-embed > iframe {
    border: none;
    width: 100%;
    height: 100%;
}
    `;
    document.querySelector("head").appendChild(cssScript);
})();

window.mangoblock = {};
window.mangoblock.nextId = 1;
window.mangoblock.reload = () => {
    for (let box of document.querySelectorAll(".mangoblock-embed")) {
        box.setAttribute("data-id", window.mangoblock.nextId);

        let optionURL = `&id=${window.mangoblock.nextId}`;
        for (let attr of box.attributes) {
            let name = attr.name;
            let value = attr.nodeValue;
            if (name === "class") continue;
            if (name === "blockonly") name = "blockOnly";
            optionURL += `&${name}=${encodeURIComponent(value)}`;
            if (name === "width" && value !== "0") box.style.width = value.endsWith("%") ? value : `${value}px`;
            if (name === "width" && value === "0") box.style.width = "200px";
            if (name === "height" && value !== "0") box.style.height = value.endsWith("%") ? value : `${value}px`;
            if (name === "height" && value === "0") box.style.height = "200px";
        }

        let iframe = document.createElement("iframe");
        iframe.setAttribute("src", `https://ide.mangoblock.app/?embed${optionURL}`);
        box.appendChild(iframe);

        window.mangoblock.nextId++;
    }
};

window.mangoblock.updateFrameSize = (id, width, height) => {
    let iframe = document.querySelector(`.mangoblock-embed[data-id='${id}']`);
    iframe.style.width = width;
    iframe.style.height = height;
};

window.mangoblock.reload();




