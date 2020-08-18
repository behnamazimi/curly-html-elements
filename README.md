# Ellipse Elements

Mini tool to align HTML elements along an ellipse or along a part of an ellipse.

**[Online Demo](https://behnamazimi.github.io/ellipse-elements/)**

### Example
```javascript
const elm = document.getElementById("demo");
const options = {
    type: "equal", // compact, equal
    size: .5, // 0, 1
    reflection: 1, // 0, 1, only in compact layout
    rotate: 5, // 0, 360
    reverse: false
}
const htmlEllipse = new EllipseElements(elm, options)
``` 