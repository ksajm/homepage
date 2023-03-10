class Member {
    constructor({
        name = '이름',
        id = '23-000',
        quote = undefined,
        links = [],
        favorite = {
            field: '정보',
            language: '한국어'
        },
        description = '정모의 회원 중 1명'
    }) {
        [ this.name, this.id, this.quote, this.links, this.favorite, this.description ]
        = [ name, id, quote, links, favorite, description ]
    }

    display(element) {
        let code = ''
        const hasQuote = this.quote !== undefined

        code += `<h1>${this.name}</h1>
        <h2>${this.id}</h2>`

        if (hasQuote) {
            code += `<h2>"${this.quote}"</h2>`
        }

        for (let link of this.links) {
            code += `<a href="http://${link}">${link}</a><br/>`
        }

        code += `<ul>
            <li>좋아하는 분야: ${this.favorite.field}</li>
            <li>좋아하는 언어: ${this.favorite.language}</li>
        </ul>`
        
        code += this.description

        const memberElement = document.createElement('div')
        memberElement.setAttribute('class', 'member card')
        memberElement.innerHTML = code
        element.appendChild(memberElement)
    }
}

const members = [
    new Member({
        name: '김준이',
        id: '23-031',
        quote: '준이는 귀엽다.',
        links: ['www.juneekim7.kro.kr', 'insta.juneekim7.kro.kr', 'flev.io'],
        favorite: {
            field: '웹 개발',
            language: 'js'
        },
        description: '안녕하세요! 정모를 만든 김준이라고 합니다!'
    }),
    new Member({
        name: '김준성',
        id: '23-029'
    }),
    new Member({
        name: '김래환',
        id: '23-016',
        quote: '김래환은 잘생겼다.',
        links: ['instagram.com/raehwan.k/', 'acmicpc.net/user/Raehwan0418'],
        favorite: {
            field: '알고리즘',
            language: 'C++'
        },
        description: '안녕하세요 김래환입니다.'
    }),
    new Member({
        name: '김창하',
        id: '23-035',
        quote: 'd[i][j][k] = str(a)',
        links: ['github.com/modularinv', 'modularinv.tistory.com', 'instagram.com/chha_aa07'],
        favorite: {
            field: '알고리즘 문제해결(PS), 머신러닝',
            language: 'C++, Java'
        },
        description: '안녕하세요 반갑습니다!! :)'
    }),
    new Member({
        name: '문가온',
        id: '23-046',
        quote: '집 가고 싶다',
        links: ['github.com/bennyk0406', 'instagram.com/ga0.on'],
        favorite: {
            field: '웹 개발 (PS도 공부 중...!)',
            language: 'JS, TS, Python(?)'
        },
        description: '안녕하세요 :D'
    }),
    new Member({
        name: '김정환',
        id: '23-027'
    }),
    new Member({
        name: '김수안',
        id: '23-022'
    }),
    new Member({
        name: '차재윤',
        id: '23-114',
        quote: '근본은 C!',
        links: ['github.com/lochajy', 'instagram.com/__locha'],
        favorite: {
            field: '프로그래밍 언어 개발, 암호화폐, (딥러닝)',
            language: 'Python, C'
        },
        description: 'return NULL;'
    }),
    new Member({
        name: '문이현',
        id: '23-047'
    }),
]