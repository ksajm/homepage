/// <reference path="./jungmo.js">

let timer
let orderIndex = 0

document.getElementById('start').onclick = () => {
    let time = 0
    timer = setInterval(() => {
        time++
        const min = String(Math.floor(time / 60)).padStart(2, '0')
        const sec = String(time % 60).padStart(2, '0')
        document.getElementById('timer').textContent = `${min}:${sec}`
    }, 1000)

    document.getElementById('start').style.display = 'none';
    document.getElementById('end').style.display = 'block';
}

document.getElementById('end').onclick = () => {
    clearInterval(timer)
    document.getElementById('timer').textContent = '00:00'
    orderIndex++
    const order = jungmoList[index].activities[activityIndex].order
    document.getElementById('current-person').innerHTML = '<span class="info">현재: </span>' +  (order[orderIndex] ?? '없음')
    document.getElementById('next-person').innerHTML = '<span class="info">다음: </span>' + (order[orderIndex + 1] ?? '없음')

    document.getElementById('start').style.display = 'block';
    document.getElementById('end').style.display = 'none';
}