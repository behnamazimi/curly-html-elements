export default class EllipseElements {
    constructor(element, options = {}) {
        this.require(element instanceof HTMLElement, "Invalid target element.")

        this.target = element;
        this.target = element;

        this._options = {
            type: "compact", // compact, equal
            size: .5, // 0, 1
            reflection: 1, // 0, 1
            rotateY: 5, // 0, 360
            reverse: false,
        }

        if (options && typeof options === "object")
            this._options = {...this._options, ...options};

        this._initListeners();
        this.render();
    }

    /**
     * short validation check
     *
     * @param condition
     * @param errMsg
     */
    require(condition, errMsg) {
        if (!condition) throw new Error(errMsg);
    }

    _initListeners() {
        window.addEventListener("resize", this.render.bind(this))
    }

    render() {
        this.target.style.position = "relative";

        const targetBound = this.target.getBoundingClientRect();
        const childItems = this.target.querySelectorAll(":scope > *");

        const coordFnArgs = [childItems.length, targetBound.width / 2, targetBound.height, targetBound.width / 2, targetBound.height]
        let coordinates = [];

        if (this._options.type === "equal") {
            coordinates = this.equalCoordinates.apply(this, coordFnArgs)
        } else {
            coordinates = this.compactCoordinates.apply(this, coordFnArgs)
        }

        if (this._options.reverse) {
            coordinates.reverse()
        }

        childItems.forEach((child, index) => {
            if (coordinates[index]) {
                child.style.position = "absolute";
                child.style.left = coordinates[index][0] + "px";
                child.style.top = coordinates[index][1] + "px";
            }
        })
    }

    compactCoordinates(n, r1, r2, centerX, centerY) {

        const options = this._options

        const size = 2 * options.size;
        const rotateY = (Math.PI / 2 * (options.rotateY * 4 / 360)) + Math.PI;

        // reflection arc
        r2 = r2 * options.reflection;

        let coordinates = []
        for (let i = 0; i < n; i++) {
            const t = (Math.PI * i / n * size) + rotateY;
            let nx = centerX + r1 * Math.cos(t);
            let ny = centerY + r2 * Math.sin(t);
            coordinates.push([nx, ny])
        }

        return coordinates
    }

    computeDpt(r1, r2, theta, rotateY = 0) {
        const dpt_sin = Math.pow(r1 * Math.sin(theta + rotateY), 2)
        const dpt_cos = Math.pow(r2 * Math.cos(theta + rotateY), 2)
        return Math.sqrt(dpt_sin + dpt_cos)
    }

    equalCoordinates(n, r1, r2, centerX, centerY) {

        // type options
        const options = this._options

        let reflection = -(options.reflection);

        // set deltaTheta
        let accuracy = 0.001

        let coordinates = [];
        let theta = 0;
        const twoPi = (Math.PI * 2 * options.size);
        const numIntegrals = Math.round(twoPi / accuracy);
        let circ = 0;
        let dpt = 0;

        /* integrate over the ellipse to get the circumference */
        for (let i = 1; i < numIntegrals; i++) {
            theta += i * accuracy;
            dpt = this.computeDpt(r1, r2, theta);
            circ += dpt;
        }

        let nextPoint = 0;
        let run = 0;
        theta = 0;

        const rotateY = (Math.PI / 2 * (options.rotateY * 4 / 360));
        for (let i = 0; i < numIntegrals; i++) {
            theta += accuracy;
            let subIntegral = n * run / circ;
            if (subIntegral >= nextPoint) {
                let x = Math.floor((centerX - r1 * Math.cos(theta + rotateY)) * 100) / 100;
                let y = Math.floor((centerY + r2 * Math.sin(theta + rotateY) * reflection) * 100) / 100;
                coordinates.push([x, y]);

                nextPoint++;
            }

            run += this.computeDpt(r1, r2, theta, rotateY);
        }

        return coordinates;
    }

    update(options) {
        if (options && typeof options === "object")
            this._options = {...this._options, ...options};

        this.render();
    }
}