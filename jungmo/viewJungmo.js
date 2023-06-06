/// <reference path="./jungmo.js">
/*const participants = JSON.parse('["'
    + prompt('참여자를 앉은 순서대로 입력해주세요!\nex)김준이, 김창하, 문가온').replace(/, /g, '", "')
    + '"]'
)*/

const url = new URL(window.location.href)
const params = new URLSearchParams(url.search)
const index = params.get('index')
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

    document.title = jungmo.name
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
        else throw new Error('호엥')

        document.getElementsByClassName('list')[0].appendChild(element)
    }
}

function displayActivity(i) {
    if (i) activityIndex = i
    const activity = jungmoList[index].activities[activityIndex]
    openContent('activity')

    if (activity instanceof Present) displayPresent(activity)
    else if (activity instanceof Debate) displayDebate(activity)
    else throw new Error('에러 발생!')
}

function displayPresent(present) {
    openActivity('present')

    document.getElementById('activity-name').innerHTML = `
        <span class="info">발표: </span>
        ${present.topic}
        <span class="info">(${present.time}분)</span>
    `
}

function displayDebate(debate) {
    openActivity('debate')

    document.getElementById('activity-name').innerHTML = `
        <span class="info">토론: </span>
        ${debate.topic}
    `
}

displayMain()

document.getElementById('previous').onclick = () => {
    activityIndex--
    const length = jungmoList[index].activities.length
    if (activityIndex < 0) activityIndex += length
    displayActivity()
}

document.getElementById('next').onclick = () => {
    activityIndex++
    const length = jungmoList[index].activities.length
    if (activityIndex >= length) activityIndex -= length
    displayActivity()
}