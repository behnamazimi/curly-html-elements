const optionsForm = document.getElementById("options");
const rect = document.getElementById("demo");

let options = {
    type: "equal", // compact, equal
    size: .5, // 0, 1
    reflection: 1, // 0, 1, only in compact mode
    rotate: 5, // 0, 360
    reverse: false
}

createDots(15);
generateDemoCode(options)

const alongEllipse = new EllipseElements(rect, options)

optionsForm.addEventListener("change", e => {
    const value = e.target.value;
    const lblValElm = e.target.parentNode.querySelector("label > span.val")

    if (e.target.name === "width") {
        rect.style.width = value + "%";
        lblValElm.innerText = `(${value}%)`

    } else if (e.target.name === "height") {
        rect.style.height = value + "px";
        rect.style.marginBottom = value + "px";
        lblValElm.innerText = `(${value}px)`

    } else if (e.target.name === "count") {
        createDots(value)
        lblValElm.innerText = `(${value})`

    } else if (e.target.name === "type") {
        options.type = value;

    } else if (e.target.name === "size") {
        options[e.target.name] = Number(value / 100)
        lblValElm.innerText = `(${value / 100}/1)`

    } else if (e.target.name === "reflection") {
        options[e.target.name] = Number(value / 10)
        lblValElm.innerText = `(${value / 10})`

    } else if (e.target.name === "rotate") {
        options[e.target.name] = Number(value)
        lblValElm.innerText = `(${value}deg)`

    } else if (e.target.name === "reverse") {
        options[e.target.name] = e.target.checked;
    }

    alongEllipse.update(options);
    generateDemoCode(options)
})

function generateDemoCode(options) {
    const demoCode =
        `const elm = document.getElementById("on-arc");
const options = ${JSON.stringify(options, null, 4)}
const htmlArc = new OnArc(elm, options)`;

    const codeElm = document.getElementById("demo-code");
    codeElm.innerText = demoCode;
}

function createDots(count = 18) {
    rect.innerHTML = "";

    for (let i = 1; i <= count; i++) {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        dot.innerText = String(i);

        rect.appendChild(dot)
    }

}
