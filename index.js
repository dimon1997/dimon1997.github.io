    let modalWindow = document.getElementById('modalWindow');

    function closeModal() {
        modalWindow.style.display = 'none';
    }
    window.onclick = function (event) {
        if (event.target == modalWindow) {
            modalWindow.style.display = "none";
        }
    }


    function openModalWindow(type) {
        let tenPercentOffAllCash = Math.floor(AllCash / 10)
        const modalWindow = document.getElementById('modalWindow')
        modalWindow.style.display = 'block';
        if (type === 'donatType') {
            modalWindow.innerHTML =
                `<div id="modal">
            <div id="modalContent">
                <div id="headerModal">
                    <button id="btncloseModal" onclick=closeModal()>&times;</button>
                </div>
            <div id="mainModal">
                <div id="messageModal">Пополнить кошелек</div>
                <input id="inputModal" type="number">
                <div>
                    <button id="btnModal" onclick=returnValueFromModuleWindow('donatType')>Подтвердить</button>
                </div>
            </div>
            </div>
        </div>`

        } else if (type === 'betType') {
            modalWindow.innerHTML =
                `<div id="modal">
            <div id="modalContent">
                <div id="headerModal">
                    <button id="btncloseModal" onclick=closeModal()>&times;</button>
                </div>
            <div id="mainModal">
                <div id="messageModal">Размер ставки</div>
                <input id="inputModal" type="number" value="${tenPercentOffAllCash}">
                <div id="rangeBlock">
                    <input type="range" id="rangeModul" min="1" max="${AllCash}" value="${tenPercentOffAllCash}" step="1">
                </div>
                <div>
                    <button id="btnModal" onclick=returnValueFromModuleWindow('betType')>Подтвердить</button>
                </div>
            </div>
            </div>
        </div>`
            let rangeModul = document.getElementById('rangeModul');
            let inputModal = document.getElementById('inputModal');

            inputModal.value = rangeModul.value;
            rangeModul.oninput = function () {
                inputModal.value = this.value;
            }
            inputModal.oninput = function () {
                rangeModul.value = this.value
            }

        }

    }

    function returnValueFromModuleWindow(type) { //возвращаем значение из модального окна
        let inputModuleValue = Number(document.getElementById('inputModal').value);
        if (type === 'donatType') {
            let summDonatCash = inputModuleValue;
            // let summDonatCash = prompt('Введите суму', '');
            if (AllCash === 0) {
                AllCash = Number(summDonatCash)
                document.getElementById('money').innerText = AllCash;
            } else {
                AllCash += Number(summDonatCash);
                document.getElementById('money').innerText = AllCash;
            }
        }
        else if (type === 'betType') {

            if (betArray.length === 0) {
                renderWheel();
                checkBet(betId, inputModuleValue);
            } else {
                checkBet(betId, inputModuleValue);
            }
        }
        modalWindow.style.display = 'none';
    }


    const countDownElement = document.getElementById('timer');
    let time = 25;
    let stopTimer = false;

    function startTimerToSpin() { // запуск таймера после первой ставки
        let refreshInterval = setInterval(updateCountdown, 1000);


        function updateCountdown() {
            let minutes = Math.floor(time / 60);
            let seconds = time % 60;
            seconds = seconds < 10 ? '0' + seconds : seconds;
            countDownElement.innerHTML = `${minutes}:${seconds}`;
            time--;
            checkStatusTimer(refreshInterval);
        }

    }
    function checkStatusTimer(refreshInterval) { // проверка шага таймера
        if (stopTimer == true) {
            clearInterval(refreshInterval);
            time = 25;
            stopTimer = false;
        }
        if (time === 0) {

            stopTimerAndSpinWhell(refreshInterval);
        }
    }

    function stopTimerAndSpinWhell(refreshInterval) { // принудительная остановка таймера и запуск колеса
        stopTimer = true;
        spinWheel();
        document.getElementById('timerSpin').style.display = 'none';
    }



    function renderWheel() {
        let wheelRender = document.getElementById('inputWheelInGame');
        let wheell = `
        <div id="wheelPlaceBorder">
        <div id="wheelPlace">
            <img id="wheel" src="image/wheel.png" alt="">
            <div id="ball"></div>
        </div>
        </div>
        `
        wheelRender.innerHTML = wheell;
        //console.log('renderWheel')
    }



    const cellInWheel = [
        { angle: 0, velueCell: 0 },
        { angle: 10, velueCell: 32 },
        { angle: 20, velueCell: 15 },
        { angle: 30, velueCell: 19 },
        { angle: 40, velueCell: 4 },
        { angle: 50, velueCell: 21 },
        { angle: 60, velueCell: 2 },
        { angle: 70, velueCell: 25 },
        { angle: 80, velueCell: 17 },
        { angle: 90, velueCell: 34 },
        { angle: 100, velueCell: 6 },
        { angle: 110, velueCell: 27 },
        { angle: 120, velueCell: 13 },
        { angle: 130, velueCell: 36 },
        { angle: 140, velueCell: 11 },
        { angle: 150, velueCell: 30 },
        { angle: 160, velueCell: 8 },
        { angle: 170, velueCell: 23 },
        { angle: 180, velueCell: 10 },
        { angle: 190, velueCell: 5 },
        { angle: 200, velueCell: 24 },
        { angle: 210, velueCell: 16 },
        { angle: 220, velueCell: 33 },
        { angle: 230, velueCell: 1 },
        { angle: 240, velueCell: 20 },
        { angle: 250, velueCell: 14 },
        { angle: 260, velueCell: 31 },
        { angle: 270, velueCell: 9 },
        { angle: 280, velueCell: 22 },
        { angle: 290, velueCell: 18 },
        { angle: 300, velueCell: 29 },
        { angle: 310, velueCell: 7 },
        { angle: 320, velueCell: 28 },
        { angle: 330, velueCell: 12 },
        { angle: 340, velueCell: 35 },
        { angle: 350, velueCell: 3 },
        { angle: 360, velueCell: 26 },
    ]

    function randomDeg(min = 1, max = 36) { //генерация рандомного числа для Колеса фортуны
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }

    let randomAngle;


    function spinWheel() {
        if (betArray.length !== 0) {
            randomAngle = randomDeg();
            //console.log(randomAngle + '0')
            let rotateDeg = 2880 + (randomAngle * (360 / 37))
            //console.log(rotateDeg);
            let wheel = document.getElementById('wheel');
            wheel.style.transform = `rotate(-${rotateDeg}deg)`;
            setTimeout(returnWinerValue, 15000)
            // let randomWinerNumber = randomInteger();
            // document.getElementById('winNumber').innerHTML = randomWinerNumber;



        } else {
            messageArray.unshift({ message: 'Нет ставок на игровом поле', textStyle: 'chatTextWarning', sizeCashe: '' })
            renderChat();
            //alert('Нет ставок на игровом поле');
        }
        document.getElementById('waitingResult').style.display = 'block';
    }
    function returnWinerValue() {
        let randomWinerNumber = cellInWheel.find(element => element.angle === randomAngle * 10);
        analysisOfTheWinningNumber(randomWinerNumber.velueCell);
        comparisonOfBetsWithTheWinningNumber();
        deleteAllBet();
        analisisWinerCellArray = [];
        // console.log(randomWinerNumber);
        document.getElementById('waitingResult').style.display = 'none';
        document.getElementById('welcomeMessage').style.display = 'block';
        //console.log(randomWinerNumber.velueCell);
    }



    let cellArray = [
        { typeCell: 'numberCell', nameCell: 0, cellColor: 'zero', bet: 0, coefficient: 35 },
        { typeCell: 'numberCell', nameCell: 1, cellColor: 'redCell', bet: 0, coefficient: 35 },
        { typeCell: 'numberCell', nameCell: 2, cellColor: 'blackCell', bet: 0, coefficient: 35 },
        { typeCell: 'numberCell', nameCell: 3, cellColor: 'redCell', bet: 0, coefficient: 35 },
        { typeCell: 'numberCell', nameCell: 4, cellColor: 'blackCell', bet: 0, coefficient: 35 },
        { typeCell: 'numberCell', nameCell: 5, cellColor: 'redCell', bet: 0, coefficient: 35 },
        { typeCell: 'numberCell', nameCell: 6, cellColor: 'blackCell', bet: 0, coefficient: 35 },
        { typeCell: 'numberCell', nameCell: 7, cellColor: 'redCell', bet: 0, coefficient: 35 },
        { typeCell: 'numberCell', nameCell: 8, cellColor: 'blackCell', bet: 0, coefficient: 35 },
        { typeCell: 'numberCell', nameCell: 9, cellColor: 'redCell', bet: 0, coefficient: 35 },
        { typeCell: 'numberCell', nameCell: 10, cellColor: 'blackCell', bet: 0, coefficient: 35 },
        { typeCell: 'numberCell', nameCell: 11, cellColor: 'blackCell', bet: 0, coefficient: 35 },
        { typeCell: 'numberCell', nameCell: 12, cellColor: 'redCell', bet: 0, coefficient: 35 },
        { typeCell: 'numberCell', nameCell: 13, cellColor: 'blackCell', bet: 0, coefficient: 35 },
        { typeCell: 'numberCell', nameCell: 14, cellColor: 'redCell', bet: 0, coefficient: 35 },
        { typeCell: 'numberCell', nameCell: 15, cellColor: 'blackCell', bet: 0, coefficient: 35 },
        { typeCell: 'numberCell', nameCell: 16, cellColor: 'redCell', bet: 0, coefficient: 35 },
        { typeCell: 'numberCell', nameCell: 17, cellColor: 'blackCell', bet: 0, coefficient: 35 },
        { typeCell: 'numberCell', nameCell: 18, cellColor: 'redCell', bet: 0, coefficient: 35 },
        { typeCell: 'numberCell', nameCell: 19, cellColor: 'redCell', bet: 0, coefficient: 35 },
        { typeCell: 'numberCell', nameCell: 20, cellColor: 'blackCell', bet: 0, coefficient: 35 },
        { typeCell: 'numberCell', nameCell: 21, cellColor: 'redCell', bet: 0, coefficient: 35 },
        { typeCell: 'numberCell', nameCell: 22, cellColor: 'blackCell', bet: 0, coefficient: 35 },
        { typeCell: 'numberCell', nameCell: 23, cellColor: 'redCell', bet: 0, coefficient: 35 },
        { typeCell: 'numberCell', nameCell: 24, cellColor: 'blackCell', bet: 0, coefficient: 35 },
        { typeCell: 'numberCell', nameCell: 25, cellColor: 'redCell', bet: 0, coefficient: 35 },
        { typeCell: 'numberCell', nameCell: 26, cellColor: 'blackCell', bet: 0, coefficient: 35 },
        { typeCell: 'numberCell', nameCell: 27, cellColor: 'redCell', bet: 0, coefficient: 35 },
        { typeCell: 'numberCell', nameCell: 28, cellColor: 'blackCell', bet: 0, coefficient: 35 },
        { typeCell: 'numberCell', nameCell: 29, cellColor: 'blackCell', bet: 0, coefficient: 35 },
        { typeCell: 'numberCell', nameCell: 30, cellColor: 'redCell', bet: 0, coefficient: 35 },
        { typeCell: 'numberCell', nameCell: 31, cellColor: 'blackCell', bet: 0, coefficient: 35 },
        { typeCell: 'numberCell', nameCell: 32, cellColor: 'redCell', bet: 0, coefficient: 35 },
        { typeCell: 'numberCell', nameCell: 33, cellColor: 'blackCell', bet: 0, coefficient: 35 },
        { typeCell: 'numberCell', nameCell: 34, cellColor: 'redCell', bet: 0, coefficient: 35 },
        { typeCell: 'numberCell', nameCell: 35, cellColor: 'blackCell', bet: 0, coefficient: 35 },
        { typeCell: 'numberCell', nameCell: 36, cellColor: 'redCell', bet: 0, coefficient: 35 },
        { typeCell: 'minorCell', nameCell: 'firstTwoToOne', bet: 0, coefficient: 1, messageCell: '2 к 1' },
        { typeCell: 'minorCell', nameCell: 'secondTwoToOne', bet: 0, coefficient: 1, messageCell: '2 к 1' },
        { typeCell: 'minorCell', nameCell: 'thirdTwoToOne', bet: 0, coefficient: 1, messageCell: '2 к 1' },
        { typeCell: 'minorCell', nameCell: 'firstTwelve', bet: 0, coefficient: 2, messageCell: 'Первая 12' },
        { typeCell: 'minorCell', nameCell: 'secondTwelve', bet: 0, coefficient: 2, messageCell: 'Вторая 12' },
        { typeCell: 'minorCell', nameCell: 'thirdTwelve', bet: 0, coefficient: 2, messageCell: 'Третья 12' },
        { typeCell: 'minorCell', nameCell: 'oneToEighteen', bet: 0, coefficient: 1, messageCell: '1 до 18' },
        { typeCell: 'minorCell', nameCell: 'even', bet: 0, coefficient: 1, messageCell: 'Чёт' },
        { typeCell: 'minorCell', nameCell: 'redCell', bet: 0, coefficient: 1, messageCell: 'Красный' },
        { typeCell: 'minorCell', nameCell: 'blackCell', bet: 0, coefficient: 1, messageCell: 'Черный' },
        { typeCell: 'minorCell', nameCell: 'notEven', bet: 0, coefficient: 1, messageCell: 'Нечёт' },
        { typeCell: 'minorCell', nameCell: 'nineteenToThirtySix', bet: 0, coefficient: 1, messageCell: '19 до 36' },
    ];


    let AllCash = 0;
    let betArray = [];
    let analisisWinerCellArray = [];
    let messageArray = [
        { message: '→ Давайте сыграем', textStyle: 'chatTextNormal', sizeCashe: '' },
        { message: '→ Вас приветствует казино Royal Bet', textStyle: 'chatTextNormal', sizeCashe: '' },

    ];
    let checkRenderWheel = false;

    function renderGamePlace() { // Рендер игрового поля
        let cellBox = ``;
        let row = ``
        let column = 0;
        if (checkRenderWheel === false) {
            renderWheel();
            checkRenderWheel = true;
        }
        cellArray.forEach(element => {
            if (element.typeCell == 'numberCell') {
                if (element.nameCell == 0) {
                    row = `<div id='${element.nameCell}' class='cell cellNumber ${element.cellColor}' onclick=bet(this.id)>${element.nameCell}</div>` + row
                    document.getElementsByClassName('leftGamePlaceBlock').innerHTML = row
                    row = '';
                } else {
                    if (column <= 2) {
                        row = `<div id='${element.nameCell}' class='cell cellNumber ${element.cellColor}' onclick=bet(this.id)>${element.nameCell}</div>` + row
                        column++;
                    } else if (column == 3) {
                        cellBox += `<div>${row}</div>`
                        column = 1;
                        row = '';
                        row = `<div id='${element.nameCell}' class='cell cellNumber ${element.cellColor}' onclick=bet(this.id)>${element.nameCell}</div>` + row
                    }
                }

            } else {
                document.getElementById(`${element.nameCell}`).innerHTML = element.messageCell;
            }

        });
        if (column == 3) {
            cellBox += `<div>${row}</div>`
        }
        document.getElementById('cellBox').innerHTML = cellBox;
    }
    renderGamePlace();

    function renderChat() { // Рендер чата
        let contentChat = ''
        messageArray.forEach(element => {
            if (element.sizeCashe !== undefined) {
                contentChat += `<div id='messageInChat' class='${element.textStyle}'>${element.message}<p>${element.sizeCashe}</p></div>`
            } else {
                contentChat += `<div id='messageInChat' class='${element.textStyle}'>${element.message}</div>`
            }

        });
        document.getElementById('contentChat').innerHTML = contentChat
    }
    renderChat();

    function refill() { // Пополнить
        let type = 'donatType';
        openModalWindow(type);
    }



    function rerenderRefill() { // обновление кошелька
        document.getElementById('money').innerText = AllCash;
    }

    function rerenderBet(bet, id) {
        let betBlock = `<div id='myBet${id}' class='myBet'><div>${bet}</div></div>`
        document.getElementById(id).innerHTML = betBlock;
    }

    let betId = 0;
    function bet(id) { // поставить ставку на число
        if (AllCash === 0) {
            messageArray.unshift({ message: 'На балансе 0 монет', textStyle: 'chatTextWarning' })
            renderChat();
        } else {
            let type = 'betType';
            betId = id;
            openModalWindow(type);
        }
    }


    function checkBet(id, inputModuleValue) { // анализ ставки
        //betValue = Number(prompt('Bet', ''));
        let betValue = inputModuleValue;
        let bet;
        if (Number.isInteger(betValue) == true) {
            if (betValue > AllCash) {
                messageArray.unshift({ message: 'Ваша ставка привишает суму на балансе', textStyle: 'chatTextWarning', sizeCashe: '' })
                renderChat();
            } else if (betValue < 1) {
                messageArray.unshift({ message: 'Минимальная ставка 1', textStyle: 'chatTextWarning', sizeCashe: '' })
                renderChat();
            } else {
                let cellInCellArray = cellArray.find(cell => cell.nameCell == id);
                if (cellInCellArray.bet == 0) {
                    bet = cellInCellArray.bet = betValue;
                } else {
                    bet = cellInCellArray.bet += betValue;
                }
                AllCash -= betValue;
                rerenderBet(bet, id);
                rerenderRefill();
                if (betArray.length === 0) {
                    startTimerToSpin();
                }
                document.getElementById('welcomeMessage').style.display = 'none';
                document.getElementById('timerSpin').style.display = 'block';
                if (betArray.some(cell => cell.nameCell == id) == false) {
                    betArray.push(cellInCellArray);
                }
            }
        } else {
            messageArray.unshift({ message: 'Розмер ставки нужно указать в числовом формате', textStyle: 'chatTextWarning', sizeCashe: '' })
            renderChat();
        }

        //console.log(cellArray);
    }




    function analysisOfTheWinningNumber(randomWinerNumber) { // анализ победного числа
        const firstTwelveCellArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const secondTwelveCellArray = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
        const thirdTwelveCellArray = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
        const firstTwoToOneCellArray = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
        const secondTwoToOneCellArray = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
        const thirdTwoToOneCellArray = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];




        analysisSuportArray = [
            { nameArray: firstTwelveCellArray, returnIdAfterAnalysis: 'firstTwelve' },
            { nameArray: secondTwelveCellArray, returnIdAfterAnalysis: 'secondTwelve' },
            { nameArray: thirdTwelveCellArray, returnIdAfterAnalysis: 'thirdTwelve' },
            { nameArray: firstTwoToOneCellArray, returnIdAfterAnalysis: 'firstTwoToOne' },
            { nameArray: secondTwoToOneCellArray, returnIdAfterAnalysis: 'secondTwoToOne' },
            { nameArray: thirdTwoToOneCellArray, returnIdAfterAnalysis: 'thirdTwoToOne' },

        ];
        let newObj = { nameCell: randomWinerNumber };
        analisisWinerCellArray.push(newObj);

        let cellInCellArray = cellArray.find(cell => cell.nameCell == randomWinerNumber)
        newObj = { nameCell: cellInCellArray.cellColor };
        analisisWinerCellArray.push(newObj);

        analysisSuportArray.forEach(element => {
            let nameCheckArray = element.nameArray;
            if (nameCheckArray.includes(randomWinerNumber) == true) {
                let newObj = { nameCell: element.returnIdAfterAnalysis }
                analisisWinerCellArray.push(newObj);
            }
        });

        if (randomWinerNumber <= 18) {
            let newObj = { nameCell: 'oneToEighteen' };
            analisisWinerCellArray.push(newObj);
        } else {
            let newObj = { nameCell: 'nineteenToThirtySix' };
            analisisWinerCellArray.push(newObj);
        }

        if (randomWinerNumber % 2 == 0) {
            let newObj = { nameCell: 'even' };
            analisisWinerCellArray.push(newObj);
        } else {
            let newObj = { nameCell: 'notEven' };
            analisisWinerCellArray.push(newObj);
        }
        //console.log(analisisWinerCellArray);
        //console.log(cellArray)
    }
    let sumResult = 0;
    function comparisonOfBetsWithTheWinningNumber() { //сравнение ставок с победным числом
        //console.log(betArray);
        betArray.forEach(element => {
            if (analisisWinerCellArray.find(obj => obj.nameCell == element.nameCell)) {
                let type = 'winBet';
                let winCash = element.bet + element.bet * element.coefficient;
                let plusCash = element.bet * element.coefficient;
                sumResult += element.bet * element.coefficient;
                AllCash += winCash;
                pushMessageInChat(element, type, plusCash);
                rerenderRefill();
            } else {
                let type = 'loseBet';
                sumResult += - element.bet;
                pushMessageInChat(element, type);
            }
        });
    }

    function pushMessageInChat(element, type, plusCash) {
        if (type === 'winBet') {
            messageArray.unshift({ message: `Ваша ставкана ячейку ${element.nameCell} сыграла `, textStyle: 'chatTextNormal', sizeCashe: `+ ${plusCash}` })
        }
        else if (type === 'loseBet') {
            messageArray.unshift({ message: `Ваша ставка ячейку ${element.nameCell} не сыграла `, textStyle: 'chatTextNormal', sizeCashe: `- ${element.bet}` })
        }
        renderChat();
        resultOfOneSession();
    }

    function resultOfOneSession() {
        let sesionResult = document.getElementById('sessionResult');
        let plusResultArrow = document.getElementById('plusResult');
        let minusResultArrow = document.getElementById('minusResult');
        if (sumResult > 0) {
            minusResultArrow.style.color = 'grey';
            plusResultArrow.style.color = 'green';
            sesionResult.style.color = 'green';
        } else {
            plusResultArrow.style.color = 'grey';
            minusResultArrow.style.color = 'red';
            sesionResult.style.color = 'red';
        }

        sesionResult.innerHTML = `<div>${sumResult}</div>`
    }



    function deleteAllBet() { // удаление всех ставок с игрового поля после прокрутки колеса
        betArray.forEach(element => {
            let serchBetInCellArray = cellArray.find(cell => cell.nameCell == element.nameCell)
            serchBetInCellArray.bet = 0;
            let block = document.getElementById(element.nameCell);
            let betInBlock = document.getElementById(`myBet${element.nameCell}`);
            block.removeChild(betInBlock);
        });
        renderGamePlace();
        betArray = [];
    }