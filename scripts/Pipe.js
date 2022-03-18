/*
 * @Descripttion: 
 * @version: 
 * @Author: Li lun
 * @Date: 2022-03-18 09:11:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-18 15:39:02
 */
const gameWidth = gameDom.clientWidth;
class Pipe extends Rectangle {
    constructor(height, top, speed, dom) {
            super(52, height, gameWidth, top, speed, 0, dom)

        }
        /**
         * @name: 
         * @msg:当水管移出游戏区域后，将Dom对象删除 
         * @param {*}
         * @return {*}
         */
    onMove() {
        if (this.left < -this.width) {
            this.dom.remove();
        }
    }
}

function randomHeight(minHeight, maxHeight) {
    return Math.floor(Math.random() * (maxHeight - minHeight) + minHeight);
}
class PipeDouble {
    constructor(speed) {
        this.space = 150;
        this.minHeight = 80;
        this.maxHeight = landTop - this.minHeight - this.space;
        const upHeight = randomHeight(this.minHeight, this.maxHeight);
        const downHeight = landTop - upHeight - this.space;
        const downTop = landTop - downHeight;
        const upDom = document.createElement("div");
        upDom.className = "pip up";
        this.upPipe = new Pipe(upHeight, 0, speed, upDom); //上水管
        const downDom = document.createElement("div")
        downDom.className = "pip down"
        this.downPipe = new Pipe(downHeight, downTop, speed, downDom) //下水管
        gameDom.appendChild(upDom);
        gameDom.appendChild(downDom);
    }
    move(durantion) {
            this.upPipe.move(durantion);
            this.downPipe.move(durantion);
        }
        //判断柱子对是否在视野内
    get pipeActivate() {
        return this.upPipe.left < -this.upPipe.width;
    }
}
class PipeProducer {
    constructor(speed) {
        this.pipeArr = [];
        this.timer = null;
        this.speed = speed;
        this.stick = 1500;
    }
    startProduce() {
        if (this.timer) {
            return;
        }
        this.timer = setInterval(() => {
            this.pipeArr.push(new PipeDouble(this.speed))
            for (let i = 0; i < this.pipeArr.length; i++) {
                if (this.pipeArr[i].pipeActivate) {
                    this.pipeArr.splice(i, 1);
                    i--;
                }

            }
        }, this.stick)
    }
    stopProduce() {
        clearInterval(this.timer);
        this.timer = null;
    }
}