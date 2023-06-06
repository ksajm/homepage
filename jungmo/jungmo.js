class Present {
    constructor(topic, time = 3, isPublic = false, image = null) {
        this.topic = topic
        this.time = time
        this.isPublic = isPublic
        this.image = image
    }
}

class Debate {
    constructor(topic, isPublic = false, image = null) {
        this.topic = topic
        this.isPublic = isPublic
        this.image = image
        this.agree = []
        this.disagree = []
    }

    setTeam(participants) {
        this.agree = []
        this.disagree = []
        participants = [...participants]
        participants.sort(() => Math.random() - 0.5)

        for (let i = 0; i < participants.length; i++) {
            const person = participants[i]
            if (i % 2 == 0) this.agree.push(person)
            else this.disagree.push(person)
        }
    }
}

class Jungmo {
    index = -1

    constructor(date, place, activities, participants) {
        this.date = date
        this.place = place
        this.activities = activities
        this.participants = participants
    }

    get name() {
        return `제 ${this.index + 1}회 정모 정모`
    }

    get DOM() {
        const element = document.createElement('div')
        element.className = 'item'
        element.onclick = () => {
            window.location.href = `./jungmo.html?index=${this.index}`
        }
        element.innerHTML = `
            <h1>${this.name} <span class="info">${this.date} ${this.place}</span></h1>
        `
        return element
    }
}

const jungmoList = [
    new Jungmo('4/22', '세미나실 C', [
        new Present('자기소개', 1),
        new Present('정보과학 발표', 3),
        new Debate('파이썬은 좋은 언어인가?'),
        new Debate('한과영 참된 선생님은?'),
        new Debate('블록코딩은 알고리즘 공부에 도움이 될까?'),
        new Debate('float 형은 분수/다항식으로 대체되어야 할까?'),
    ], [
        '김준이', '김창하', '김래환', '문가온',
        '김수안', '차재윤', '손민성', '김태이',
        '문이현', '차주원'
    ])
]

jungmoList.forEach((jungmo, i) => {
    jungmo.index = i
})