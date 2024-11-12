    let MatBoard = [[true, false, false, true, true, true],
    [true, false, false, true, false, true],
    [true, true, false, true, true, true],
    [true, true, true, false, true, true],
    [false, false, true, false, true, true],
    [true, true, true, true, true, false]]
    let carArr =[]
class Car {
    constructor(id, boardTop, boardLeft, direction, sumSquares, color) {
        this.id = id
        this.boardTop = boardTop
        this.boardLeft = boardLeft
        this.direction = direction
        this.sumSquares = sumSquares
        this.color = color
    }
}

class RedCar extends Car {
    constructor(id, boardTop, boardLeft, direction, sumSquares, color) {
        super(id, boardTop, boardLeft, direction, sumSquares, color)
    }
    GoOut = () => {

        alert("winner!!!");
        window.location.href = "winner.html"
    }
}

class Board {
    constructor(CarArr, SizeSquare, CountSquare, ExitPoint) {
        this.CarArr = CarArr
        this.SizeSquare = SizeSquare
        this.CountSquare = CountSquare
        this.ExitPoint = ExitPoint
    }
    printBoardStatus = () => {
        let str = "where empty: "
    for (let i = 0; i < MatBoard.length; i++) {
      for (let j = 0; j < MatBoard[i].length; j++) {
       
        if (MatBoard[i][j] === false) {
            str += `(${i},${j}),`
          }
        
      }
     

    }
    alert(str)
    }

    placeIsAvailable = (carP, side,i,j,length) => {
        console.log(carP,"carP");
        if(side=="up")
        {
            if(MatBoard[i][j] === false && i + 1 >= 0) 
            {
                return true
            }
        
        }
        if(side=="down")
        {
            if(MatBoard[i][j] === false && i - 1 < 6) 
            {
                return true
            }
        }
        if(side=="right")
        {
            if(MatBoard[i][j] === false && j < 6) 
            {
                return true
            }
        }
        if(side=="left")
        {
            if(MatBoard[i][j - 1] === false && j - 1 >= 0) 
            {
                return true
            }
        }
        return false
       
    }
    getCarById = (carID) => {
        return carArr.find(car=>car.id==carID)
    }
    setPlace = (car, side,i,j,length) => {
        let n = document.getElementById(car.id)
        if (side === 'up') {
            car.boardTop=car.boardTop-100
            n.style.top= car.boardTop + "px";
            MatBoard[i][j]=true
            MatBoard[i+length][j]=false
            console.log(MatBoard);

        }
        if (side === 'down') {
            car.boardTop=car.boardTop+100
            n.style.top=car.boardTop+ "px";
            MatBoard[i][j]=true
            MatBoard[i-length][j]=false
           
            console.log(MatBoard);
        }//Number(n.style.left.replace("px","") + 100) + "px"
        if (side === 'right') {
            car.boardLeft+=100   
            n.style.left= car.boardLeft+"px";
            MatBoard[i][j]=true
            MatBoard[i][j-length]=false
                  
            console.log(MatBoard);

        }
        if (side === 'left') {
            car.boardLeft-=100  
            n.style.left= car.boardLeft +"px";
            MatBoard[i][j]=true
            MatBoard[i][j+length-1]=false
            console.log(MatBoard);
        }

    }
    checkWIn = (car,i,j) => {
        this.getCarById(car)
        if (j==6){
            carArr[0].GoOut()
        }
        return false
    }
}



let Board1;

const beginGame = async () => {
    let cars = await fetch('cars.json');
    let boardData = await cars.json();
    declarboard(boardData);
}
const declarboard = (boardData) => {
     carArr = declarcars(boardData.cars)
    Board1 = new Board(
        carArr,
        boardData.squersize,
        boardData.amountsquer,
        boardData.exit
    );
    console.log(Board1, "Board1Board1");
    printBoard(Board1)
}

const declarcars = (Data) => {
    let carsarr = [];
    Data.forEach(element => {
        if (element.id === "red") {
            let redcar = new RedCar(element.id, element.boardTop, element.boardLeft, element.direction, element.sumSquares, element.color)
            carsarr.push(redcar)
        }
        else {
            let car = new Car(element.id, element.boardTop, element.boardLeft, element.direction, element.sumSquares, element.color)
            carsarr.push(car)
        }
    })
    return carsarr;
}

const printBoard = () => {
    let divBoard = document.getElementById("boardId");
    divBoard.style.height = (Math.sqrt(Board1.CountSquare) * Board1.SizeSquare) + "px";
    divBoard.style.width = (Math.sqrt(Board1.CountSquare) * Board1.SizeSquare) + "px";
    printCars(Board1.CarArr)
}

const printCars = (cars) => {
    let board = document.getElementById("boardId")
    cars.forEach(car => {
        let carButton = document.createElement("button")

        carButton.setAttribute("id", car.id)
        carButton.classList.add("car")
        board.appendChild(carButton)
        carButton.style.backgroundColor = car.color
        if (car.direction === 0) {
            //console.log(carButton, "carButton");
            carButton.style.height = "100px"
            carButton.style.width = (car.sumSquares * 100) + "px"
        }
        else {
            carButton.style.width = 100 + "px"
            carButton.style.height = (car.sumSquares * 100) + "px"
        }
        console.log(car.boardLeft);
        carButton.style.top = car.boardTop + "Px"
        carButton.style.left = car.boardLeft + "Px"
        carButton.addEventListener("click", () => setselected(carButton, car))

    })
}
let carJs;
let carHtml;
setselected = (carButton, car) => {
    carHtml = carButton;
    carJs = car;
    Board1.CarArr.forEach(carB => {

        if (carB.id === carButton.id) {
            carButton.classList.add("selected")
        }
        else {
            let cb = document.getElementById(carB.id)
            cb.classList.remove("selected")
        }
    })
}

const Up = () => {
    if (carJs.direction === 1) {
        const selectedCar = document.getElementsByClassName('selected')[0]
        const lll = Board1.getCarById(selectedCar.id);
        if (Board1.placeIsAvailable(carJs,"up", lll.boardTop/100-1,lll.boardLeft/100,lll.sumSquares)) 
        {
            Board1.setPlace(carJs, "up",lll.boardTop/100-1,lll.boardLeft/100,lll.sumSquares)
        }
    }
}
const Down = () => {
    if (carJs.direction === 1) {
        const selectedCar = document.getElementsByClassName('selected')[0]
        const lll = Board1.getCarById(selectedCar.id);
        if (Board1.placeIsAvailable(carJs,"down", lll.boardTop/100+lll.sumSquares,lll.boardLeft/100,lll.sumSquares))
        {
            Board1.setPlace(carJs, "down",lll.boardTop/100+lll.sumSquares,lll.boardLeft/100,lll.sumSquares)
        }
    }
}
const Right = () => {
     if (carJs.direction === 0) {
        const selectedCar = document.getElementsByClassName('selected')[0]
        const lll = Board1.getCarById(selectedCar.id);
        if (carJs.color === 'red') {
        Board1.checkWIn(carJs,lll.boardTop/100,lll.boardLeft/100+lll.sumSquares);
        }   
        if (Board1.placeIsAvailable(carJs,"right", lll.boardTop/100,lll.boardLeft/100+lll.sumSquares,lll.sumSquares))
        {
            Board1.setPlace(carJs, "right",lll.boardTop/100,lll.boardLeft/100+lll.sumSquares,lll.sumSquares)
        }
    }
}
const Left = () => {
    if (carJs.direction === 0) {
        const selectedCar = document.getElementsByClassName('selected')[0]
        const lll = Board1.getCarById(selectedCar.id);
        if (Board1.placeIsAvailable(carJs,"left", lll.boardTop/100,lll.boardLeft/100,lll.sumSquares))
        {
            Board1.setPlace(carJs, "left",lll.boardTop/100,lll.boardLeft/100,lll.sumSquares)
        }
    }
}
const send = () => {
    alert(MatBoard[0]+"\n"+MatBoard[1]+"\n"+MatBoard[2]+"\n"+MatBoard[3]+"\n"+MatBoard[4]+"\n"+MatBoard[5]+"\n")
    //Board1.printBoardStatus()
  }


  

