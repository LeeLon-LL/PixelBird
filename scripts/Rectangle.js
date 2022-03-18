/*
 * @Descripttion: 
 * @version: 
 * @Author: Li lun
 * @Date: 2022-03-17 17:05:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-18 09:53:13
 */
/* 矩形类，可以移动
属性:宽度、高度、横坐标、纵坐标、横向速度、纵向速度、对应的dom对象
xSpeed：横向速度，单位：像素/秒  正数向右 负数向左
ySpeed：纵向速度，单位：像素/秒  正数向下，负数向上
*/

class Rectangle {
    constructor(width, height, left, top, xSpeed, ySpeed, dom) {
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.dom = dom;
        this.render();
    }
    render() {
            this.dom.style.width = this.width + "px";
            this.dom.style.height = this.height + "px";
            this.dom.style.left = this.left + "px";
            this.dom.style.top = this.top + "px";
        }
        /**
         * @name: 
         * @msg: 按照矩形的速度和指定的时间移动矩形
         * @param {*} duration 单位：秒
         * @return {*}
         */
    move(duration) {
        const xDis = this.xSpeed * duration; //横向移动距离
        const yDis = this.ySpeed * duration; //纵向移动距离
        this.left = this.left + xDis;
        this.top = this.top + yDis;
        if (this.onMove) {
            this.onMove();
        }
        this.render(); //重新渲染
    }
}