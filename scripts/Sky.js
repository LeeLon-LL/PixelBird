/*
 * @Descripttion: 
 * @version: 
 * @Author: Li lun
 * @Date: 2022-03-17 20:07:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-18 11:05:23
 */
const skyDom = document.querySelector(".sky");
const skyStyle = getComputedStyle(skyDom);
const skyWidth = parseFloat(skyStyle.width);
const skyHeight = parseFloat(skyStyle.height);

class Sky extends Rectangle {
    constructor() {
        super(skyWidth, skyHeight, 0, 0, -100, 0, skyDom);
    }
    onMove() {
        if (this.left < -skyWidth * 0.5) {
            this.left = 0;
        }
    }
}