/*
 * @Descripttion: 
 * @version: 
 * @Author: Li lun
 * @Date: 2022-03-17 21:36:49
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-18 15:12:00
 */
const gameDom = document.querySelector(".game");
const birdDom = document.querySelector(".bird");
const birdStyle = getComputedStyle(birdDom);
const birdWidth = parseFloat(birdStyle.width);
const birdHeight = parseFloat(birdStyle.height);
const birdTop = parseFloat(birdStyle.top);
const birdLeft = parseFloat(birdStyle.left);
const gameHeight = document.querySelector(".game").clientHeight;

class Bird extends Rectangle {
    constructor() {
        super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0, birdDom);
        this.g = 1500
            //最大的y坐标
        this.maxTop = gameHeight - landHeight - birdHeight;
        //小鸟煽动翅膀
        this.swingStatus = 1;
        this.timer = null;
        this.render();

    }
    move(duration) {
            super.move(duration);
            this.ySpeed += duration * this.g;
        }
        /**
         * @name: 
         * @msg: 控制纵向最大范围
         * @param {*}
         * @return {*}
         */
    onMove() {
            if (this.top < 0) {
                this.bird = 0;
            } else if (this.top > this.maxTop) {
                this.top = this.maxTop;
            }
        }
        /**
         * @name: 
         * @msg:小鸟跳跃 
         * @param {*}
         * @return {*}
         */
    jump() {
            this.ySpeed = -400;
        }
        /**
         * @name: 
         * @msg: 重写render重载函数
         * @param {*}
         * @return {*}
         */
    render() {
            super.render();
            this.dom.className = `bird swing${this.swingStatus}`;

        }
        /**
         * @name: 
         * @msg: 开始煽动翅膀
         * @param {*}
         * @return {*}
         */
    startSwing() {
            if (this.timer) {
                return;
            }
            this.timer = setInterval(() => {
                this.swingStatus++;
                if (this.swingStatus == 4) {
                    this.swingStatus = 1;
                }
                this.render();
            }, 300)
        }
        /**
         * @name: 
         * @msg: 停止煽动翅膀
         * @param {*}
         * @return {*}
         */
    stopSwing() {
        clearInterval(this.timer);
        this.timer = null;
    }
}