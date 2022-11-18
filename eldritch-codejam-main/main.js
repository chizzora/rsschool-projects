import ancients from "./assets/Ancients/index.js";
import ancientsData from "./data/ancients.js";
import blueCardsDat from "./data/mythicCards/blue/index.js"
import brownCardsDat from "./data/mythicCards/brown/index.js"
import greenCardsDat from "./data/mythicCards/green/index.js"

const ancient = document.querySelectorAll('.ancient');
const ancientContainer = document.querySelector('.ancient-container');
const cardBack = document.querySelector('.card__back-side');
const cardFace = document.querySelector('.card__main-side');
const deckContainer = document.querySelector('.deck-container');
const deckTracker = document.querySelector('.deck-tracker');
const difficultyContainer = document.querySelector('.difficulty-container');
const cardSides = document.querySelector('.card__sides');
const mixBtn = document.querySelector('.mix-up-button')
const firstGreen = document.querySelector('.first-green')
const secondGreen = document.querySelector('.second-green')
const thirdGreen = document.querySelector('.third-green')
const firstBlue = document.querySelector('.first-blue')
const secondBlue = document.querySelector('.second-blue')
const thirdBlue = document.querySelector('.third-blue')
const firstBrown = document.querySelector('.first-yellow')
const secondBrown = document.querySelector('.second-yellow')
const thirdBrown = document.querySelector('.third-yellow')
const restartBtn = document.querySelector('.retry')
const errorMsg = document.querySelector('.error-message')
const stageText = document.querySelectorAll('.stage-text')
const difficultyItem = document.querySelectorAll('.difficulty-item')
const difficultyMessage = document.querySelector('.difficulty-message')

let i = 0, anc, disabled = true;
let blueCardsDataReduced, brownCardsDataReduced, greenCardsDataReduced;


function setActive(e) {
    if (e.target.classList.contains('ancient-container')) {
        ancientContainer.classList.remove('checked')
    }
    ancient.forEach(function(a) {
        a.style.transition = '0.6s';
        if (a.classList.contains('active')) {
            a.classList.remove('active')
        }
    })
    if (!e.target.classList.contains('ancient-container')) {
        e.target.classList.add('active')
        ancientContainer.classList.add('checked')
    }
    i = 0
    ancient.forEach(function(e) {
        if (e.classList.contains('active')) {
            anc = i
        }
        i+=1;
    })
}

mixBtn.addEventListener('click', mixFunc)

function mixFunc() {
    try {
        if (!ancientContainer.classList.contains('checked')) {
            errorMsg.classList.remove('hidden')
            return errorMsg.textContent = 'Выберите древнего!'
        }
        deckContainer.style.width = '40%'
        ancientContainer.removeEventListener('click', setActive)
        const blueCount = ancientsData[anc].firstStage.blueCards + ancientsData[anc].secondStage.blueCards + ancientsData[anc].thirdStage.blueCards
        const greenCount = ancientsData[anc].firstStage.greenCards + ancientsData[anc].secondStage.greenCards + ancientsData[anc].thirdStage.greenCards
        const brownCount = ancientsData[anc].firstStage.brownCards + ancientsData[anc].secondStage.brownCards + ancientsData[anc].thirdStage.brownCards
        difficultyItem.forEach(function(a) {
            if (a.classList.contains('actived')) {
                difficultyMessage.textContent = `${a.textContent} уровень сложности`
            }
            if (a.classList.contains('very-easy') && a.classList.contains('actived')) {
                blueCardsDataReduced.splice(blueCount)
                brownCardsDataReduced.splice(brownCount)
                greenCardsDataReduced.splice(greenCount)
            }
            if (a.classList.contains('very-hard') && a.classList.contains('actived')) {
                blueCardsDataReduced.splice(blueCount)
                brownCardsDataReduced.splice(brownCount)
                greenCardsDataReduced.splice(greenCount)
            }
        })
        let blueCardsData = blueCardsDataReduced.concat();
        let brownCardsData = brownCardsDataReduced.concat();
        let greenCardsData = greenCardsDataReduced.concat();
        blueCardsData.sort(()=> Math.random()-0.5)
        brownCardsData.sort(()=> Math.random()-0.5)
        greenCardsData.sort(()=> Math.random()-0.5)
        firstBlue.textContent = ancientsData[anc].firstStage.blueCards
        secondBlue.textContent = ancientsData[anc].secondStage.blueCards
        thirdBlue.textContent = ancientsData[anc].thirdStage.blueCards
        firstBrown.textContent = ancientsData[anc].firstStage.brownCards
        secondBrown.textContent = ancientsData[anc].secondStage.brownCards
        thirdBrown.textContent = ancientsData[anc].thirdStage.brownCards
        firstGreen.textContent = ancientsData[anc].firstStage.greenCards
        secondGreen.textContent = ancientsData[anc].secondStage.greenCards
        thirdGreen.textContent = ancientsData[anc].thirdStage.greenCards
        errorMsg.classList.add('hidden')
        mixBtn.classList.add('hidden')
        deckTracker.classList.remove('hidden')
        cardSides.classList.remove('hidden')
        difficultyContainer.classList.add('hidden')
        cardBack.addEventListener('click', setCard)

        let sortArray = [], firstStageArray = [], secondStageArray = [], thirdStageArray = []

        ancient.forEach(function(a) {
            ancientContainer.style.gap = '0';
            a.style.transition = '0s';
            if (!a.classList.contains('active')) {
                a.classList.add('hidden')
            }
            if (a.classList.contains('active')) {
                a.classList.add('plus')
            }
        })

        function stageOneSort() {
            for (let c = 0; c < ancientsData[anc].firstStage.blueCards; c++) {
                firstStageArray.push(blueCardsData[0])
                blueCardsData.shift()
            }
            for (let c = 0; c < ancientsData[anc].firstStage.greenCards; c++) {
                firstStageArray.push(greenCardsData[0])
                greenCardsData.shift()
            }
            for (let c = 0; c < ancientsData[anc].firstStage.brownCards; c++) {
                firstStageArray.push(brownCardsData[0])
                brownCardsData.shift()
            }
            firstStageArray.sort(()=> Math.random()-0.5)
        }

        function stageTwoSort() {
            for (let c = 0; c < ancientsData[anc].secondStage.blueCards; c++) {
                secondStageArray.push(blueCardsData[0])
                blueCardsData.shift()
            }
            for (let c = 0; c < ancientsData[anc].secondStage.greenCards; c++) {
                secondStageArray.push(greenCardsData[0])
                greenCardsData.shift()
            }
            for (let c = 0; c < ancientsData[anc].secondStage.brownCards; c++) {
                secondStageArray.push(brownCardsData[0])
                brownCardsData.shift()
            }
            secondStageArray.sort(()=> Math.random()-0.5)
        }

        function stageThreeSort() {
            for (let c = 0; c < ancientsData[anc].thirdStage.blueCards; c++) {
                thirdStageArray.push(blueCardsData[0])
                blueCardsData.shift()
            }
            for (let c = 0; c < ancientsData[anc].thirdStage.greenCards; c++) {
                thirdStageArray.push(greenCardsData[0])
                greenCardsData.shift()
            }
            for (let c = 0; c < ancientsData[anc].thirdStage.brownCards; c++) {
                thirdStageArray.push(brownCardsData[0])
                brownCardsData.shift()
            }
            thirdStageArray.sort(()=> Math.random()-0.5)
        }

        function stagesSort() {
            stageOneSort()
            stageTwoSort()
            stageThreeSort()
        }
        stagesSort()

        function setCard() {
            if (firstStageArray.length != '0') {
                const img = new Image();
                img.src = `${firstStageArray[firstStageArray.length-1].cardFace}`;
                img.onload = () => {
                    cardFace.style.backgroundImage = `url(${img.src})`;
                };
                cardFace.classList.remove('hidden')
                let lastElement = firstStageArray.pop()
                if (lastElement.color === 'blue') {
                    firstBlue.textContent -= 1
                }
                if (lastElement.color === 'green') {
                    firstGreen.textContent -= 1
                }
                if (lastElement.color === 'brown') {
                    firstBrown.textContent -= 1
                }
                if (firstStageArray.length == '0') {
                    stageText[0].style.opacity = '.5'
                    return
                }
            }
            if (secondStageArray.length != '0' && firstStageArray.length == '0') {
                const img = new Image();
                img.src = `${secondStageArray[secondStageArray.length-1].cardFace}`;
                img.onload = () => {
                    cardFace.style.backgroundImage = `url(${img.src})`;
                };
                let lastElement = secondStageArray.pop()
                if (lastElement.color === 'blue') {
                    secondBlue.textContent -= 1
                }
                if (lastElement.color === 'green') {
                    secondGreen.textContent -= 1
                }
                if (lastElement.color === 'brown') {
                    secondBrown.textContent -= 1
                }
                if (secondStageArray.length == '0') {
                    stageText[1].style.opacity = '.5'
                    return
                }
            }
            if (thirdStageArray.length != '0' && secondStageArray.length == '0') {
                const img = new Image();
                img.src = `${thirdStageArray[thirdStageArray.length-1].cardFace}`;
                img.onload = () => {
                    cardFace.style.backgroundImage = `url(${img.src})`;
                };
                let lastElement = thirdStageArray.pop()
                if (lastElement.color === 'blue') {
                    thirdBlue.textContent -= 1
                }
                if (lastElement.color === 'green') {
                    thirdGreen.textContent -= 1
                }
                if (lastElement.color === 'brown') {
                    thirdBrown.textContent -= 1
                }
            }
            if (firstStageArray.length == '0' && secondStageArray.length == '0' && thirdStageArray.length == '0') {
                cardFace.classList.add('hidden')
                restartBtn.classList.add('siu')
                cardBack.removeEventListener('click', setCard)
                stageText[2].style.opacity = '.5'
            }
        }
    } catch {
        ancient.forEach(function(a) {
            if (!a.classList.contains('active')) {
                errorMsg.classList.remove('hidden')
                return errorMsg.textContent = 'Выберите древнего!'
            }
        })
    }
}
function setDifficulty(e) {
    if (e.target.classList.contains('difficulty-item')) {
        deckContainer.classList.remove('hidden')
        deckContainer.style.width = '30%'
    }
    difficultyItem.forEach(function(a) {
        if (a.classList.contains('actived')) {
            a.classList.remove('actived')
        }
    })
    if (!e.target.classList.contains('difficulty-container') && !e.target.classList.contains('choose-difficulty')) {
        e.target.classList.add('actived')
    }

    if (e.target.classList.contains('very-easy')) {
        let blueCardsDataPreReduced = blueCardsDat.filter(e =>e.difficulty !== 'hard' && e.difficulty !== 'normal')
        blueCardsDataReduced = blueCardsDataPreReduced.concat(blueCardsDat.filter(e =>e.difficulty == 'normal'))
        let greenCardsDataPreReduced = greenCardsDat.filter(e =>e.difficulty !== 'hard' && e.difficulty !== 'normal')
        greenCardsDataReduced = greenCardsDataPreReduced.concat(greenCardsDat.filter(e =>e.difficulty == 'normal'))
        let brownCardsDataPreReduced = brownCardsDat.filter(e =>e.difficulty !== 'hard' && e.difficulty !== 'normal')
        brownCardsDataReduced = brownCardsDataPreReduced.concat(brownCardsDat.filter(e =>e.difficulty == 'normal'))
    }
    if (e.target.classList.contains('easy')) {
        blueCardsDataReduced = blueCardsDat.filter(e =>e.difficulty !== 'hard')
        greenCardsDataReduced = greenCardsDat.filter(e =>e.difficulty !== 'hard')
        brownCardsDataReduced = brownCardsDat.filter(e =>e.difficulty !== 'hard')
    }
    if (e.target.classList.contains('normal')) {
        blueCardsDataReduced = blueCardsDat.concat()
        greenCardsDataReduced = greenCardsDat.concat()
        brownCardsDataReduced = brownCardsDat.concat()
    }
    if (e.target.classList.contains('hard')) {
        blueCardsDataReduced = blueCardsDat.filter(e =>e.difficulty !== 'easy')
        greenCardsDataReduced = greenCardsDat.filter(e =>e.difficulty !== 'easy')
        brownCardsDataReduced = brownCardsDat.filter(e =>e.difficulty !== 'easy')
    }
    if (e.target.classList.contains('very-hard')) {
        let blueCardsDataPreReduced = blueCardsDat.filter(e =>e.difficulty !== 'easy' && e.difficulty !== 'normal')
        blueCardsDataReduced = blueCardsDataPreReduced.concat(blueCardsDat.filter(e =>e.difficulty == 'normal'))
        let greenCardsDataPreReduced = greenCardsDat.filter(e =>e.difficulty !== 'easy' && e.difficulty !== 'normal')
        greenCardsDataReduced = greenCardsDataPreReduced.concat(greenCardsDat.filter(e =>e.difficulty == 'normal'))
        let brownCardsDataPreReduced = brownCardsDat.filter(e =>e.difficulty !== 'easy' && e.difficulty !== 'normal')
        brownCardsDataReduced = brownCardsDataPreReduced.concat(brownCardsDat.filter(e =>e.difficulty == 'normal'))
    }
}

ancientContainer.addEventListener('click', setActive)
difficultyContainer.addEventListener('click', setDifficulty)

restartBtn.addEventListener('click', function() {
    restartBtn.classList.toggle('siu')
    mixBtn.classList.remove('hidden')
    difficultyContainer.classList.remove('hidden')
    deckTracker.classList.toggle('hidden')
    cardSides.classList.toggle('hidden')
    deckContainer.classList.toggle('hidden')
    ancientContainer.style.gap = '40px';
    ancientContainer.classList.remove('checked')
    ancientContainer.addEventListener('click', setActive)
    deckContainer.style.width = '0%'
    difficultyMessage.textContent = ''
    ancient.forEach(function(a) {
        if (!a.classList.contains('active')) {
            a.classList.remove('hidden')
        }
        if (a.classList.contains('active')) {
            a.classList.remove('active')
            a.classList.remove('plus')
        }
    })
    difficultyItem.forEach(function(a) {
        a.classList.remove('actived')
    })
    stageText.forEach(function(ch) {
        ch.style.opacity = '1'
    })

})

