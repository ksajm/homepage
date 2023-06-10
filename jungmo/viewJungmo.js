/// <reference path="./jungmo.js">

const url = new URL(window.location.href)
const params = new URLSearchParams(url.search)
const index = params.get('index')

const participants = jungmoList[index].participants ?? JSON.parse('["'
    + prompt('참여자를 앉은 순서대로 입력해주세요!\nex)김준이, 김창하, 문가온').replace(/, /g, '", "')
    + '"]'
)

let activityIndex = 0

function openContent(id) {
    for(const element of document.getElementsByClassName('content')) {
        element.style.display = 'none'
    }
    document.getElementById(id).style.display = 'block'
}

function openActivity(id) {
    for(const element of document.getElementsByClassName('activity-property')) {
        element.style.display = 'none'
    }
    document.getElementById(id).style.display = 'block'
}

function displayMain() {
    openContent('main')
    const jungmo = jungmoList[index]

    document.title = '『정모』 - ' + jungmo.name
    for (let activityIndex = 0; activityIndex < jungmo.activities.length; activityIndex++) {
        const activity = jungmo.activities[activityIndex]
        const element = document.createElement('div')
        element.className = 'item'
        element.onclick = () => {
            displayActivity(activityIndex)
        }

        if (activity instanceof Present) {
            element.innerHTML = `<h1>
                <span class="info">발표: </span>
                ${activity.isPublic ? activity.topic : '???'}
                <span class="info">(${activity.time}분)</span>
            </h1>`
        }
        else if (activity instanceof Debate) {
            element.innerHTML = `<h1>
                <span class="info">토론: </span>
                ${activity.isPublic ? activity.topic : '???'}
            </h1>`
        }
        else {
            element.innerHTML = `<h1>
                <span class="info">활동: </span>
                ${activity.isPublic ? activity.topic : '???'}
            </h1>`
        }

        document.getElementsByClassName('list')[0].appendChild(element)
    }
}

function displayActivity(i) {
    if (i) activityIndex = i
    const activity = jungmoList[index].activities[activityIndex]
    openContent('activity')

    if (activity instanceof Present) displayPresent(activity)
    else if (activity instanceof Debate) displayDebate(activity)
    else {
        for(const element of document.getElementsByClassName('activity-property')) {
            element.style.display = 'none'
        }
        document.getElementById('activity-name').innerHTML = activity.topic
    }
}

/** @param { Present } present*/
function displayPresent(present) {
    openActivity('present')

    document.getElementById('activity-name').innerHTML = `
        <span class="info">발표: </span>
        ${present.topic}
        <span class="info">(${present.time}분)</span>
    `

    present.setOrder(participants)
    document.getElementById('current-person').innerHTML = '<span class="info">현재: </span>' + present.order[0]
    document.getElementById('next-person').innerHTML = '<span class="info">다음: </span>' + present.order[1]
    
    document.getElementById('timer').textContent = '00:00'
    document.getElementById('start').style.display = 'block';
    document.getElementById('end').style.display = 'none';
}

/** @param { Debate } debate*/
function displayDebate(debate) {
    openActivity('debate')

    document.getElementById('activity-name').innerHTML = `
        <span class="info">토론: </span>
        ${debate.topic}
    `

    debate.setTeam(participants)
    document.getElementById('agree').innerHTML = '<h1>찬성: </h1>' + debate.agree.join(', ')
    document.getElementById('disagree').innerHTML = '<h1>반대: </h1>' + debate.disagree.join(', ')
}

displayMain()

document.getElementById('previous').onclick = () => {
    activityIndex--
    const length = jungmoList[index].activities.length
    if (activityIndex < 0) activityIndex += length
    if (timer) clearInterval(timer)
    displayActivity()
}

document.getElementById('next').onclick = () => {
    activityIndex++
    const length = jungmoList[index].activities.length
    if (activityIndex >= length) activityIndex -= length
    if (timer) clearInterval(timer)
    displayActivity()
}