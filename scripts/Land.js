/*
 * @Descripttion: 
 * @version: 
 * @Author: Li lun
 * @Date: 2022-03-17 21:14:53
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-18 11:22:34
 */
const landDom = document.querySelector(".land");
const landStyle = getComputedStyle(landDom);
const landWidth = parseFloat(landStyle.width);
const landHeight = parseFloat(landStyle.height);
const landTop = parseFloat(landStyle.top);

class Land extends Rectangle {
    constructor(speed) {
        super(landWidth, landHeight, 0, landTop, speed, 0, landDom);
    }
    onMove() {
        if (this.left < -landWidth * 0.5) {
            this.left = 0;
        }
    }
}