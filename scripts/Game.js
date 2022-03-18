/*
 * @Descripttion: 
 * @version: 
 * @Author: Li lun
 * @Date: 2022-03-18 11:10:05
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-18 16:29:44
 */
const textGameOver = document.getElementsByClassName("gameOverText")[0];
const textGameStart = document.getElementsByClassName("gameStartText")[0];
class Game {
    constructor() {
        this.sky = new Sky();
        this.land = new Land(-100);
        this.bird = new Bird();
        this.producedPipe = new PipeProducer(-100);
        this.stick = 16;
        this.timer = null;
        this.gameOver = false;
    }
    startGame() {

        if (this.timer) {
            return;
        }
        if (this.gameOver) {
            window.location.reload();
        } else {
            textGameStart.style.display = "block";
            textGameOver.style.display = "none";
        }

        this.producedPipe.startProduce();
        this.bird.startSwing();
        this.timer = setInterval(() => {
            const duration = this.stick * 0.001;
            this.sky.move(duration);
            this.land.move(duration);
            this.bird.move(duration);

            this.producedPipe.pipeArr.forEach(pipe => {
                pipe.move(duration);
            })
            if (this.isGameOver()) {
                this.stopGame();
                this.gameOver = true;
            }
        }, this.stick);


    }
    /**
     * @name: 
     * @msg: 判断两个矩形是否碰撞
     * @param {*} rec1
     * @param {*} rec2
     * @return {*}
     */
    isHit(rec1, rec2) {
        //横向：两个矩形的中心点横轴的距离的绝对值小于宽度之和的一半
        //纵向：两个矩形的中心点竖轴的距离的绝对值小于高度之和的一半
        let center1X = rec1.width * 0.5 + rec1.left;
        let center1Y = rec1.height * 0.5 + rec1.top;
        let center2X = rec2.width * 0.5 + rec2.left;
        let center2Y = rec2.height * 0.5 + rec2.top;
        let disX = Math.abs(center1X - center2X);
        let disY = Math.abs(center1Y - center2Y);
        if (disX < (rec1.width + rec2.width) * 0.5 && disY < (rec1.height + rec2.height) * 0.5) {
            return true;
        }
        return false;
    }
    isGameOver() {
        if (this.bird.maxTop === this.bird.top) {
            return true;
        }
        for (let i = 0; i < this.producedPipe.pipeArr.length; i++) {
            const pipe = this.producedPipe.pipeArr[i];
            if (this.isHit(this.bird, pipe.upPipe) || this.isHit(this.bird, pipe.downPipe)) {
                console.log(1111)
                return true;
            }
        }
        return false;
    }
    stopGame() {
        clearInterval(this.timer);
        this.timer = null;
        this.bird.stopSwing();
        this.producedPipe.stopProduce()
        textGameOver.style.display = "block";
        textGameStart.style.display = "none";
    }
    regEvent() {
        window.onkeydown = (e) => {
            if (e.key === "Enter") {
                if (this.timer) {
                    textGameOver.innerHTML = "游戏暂停";
                    this.stopGame();
                } else {
                    textGameOver.innerHTML = "游戏结束";
                    this.startGame();
                }
            } else if (e.key === " ") {

                this.bird.jump();
            }
        }
    }
}
var g = new Game();
g.regEvent()