import Distinct from '../assets/data/test.json'
import Kanji from '../assets/data/kanji.json'
// import Distinct from '../assets/data/distinct.json'



import shuffle from './shuffler';



// const flatten = () => {
//     let seen = new Map();
//     let Kanji = []
//     kanjis.kanjis.forEach(({chapter, examples}) => {
//         examples.forEach(kanji => {
//             if(seen.get(kanji.rune) === undefined) {
//                 Kanji.push({ ...kanji, chapter: chapter })
//                 seen.set(kanji.rune, kanji)
//             }
//         })
//     })
//     const json = JSON.stringify(Kanji)
//     fs.writeFileSync("Kanji.json", json, "utf8")
//     return Kanji
// }


const kanjisByChapter = (chapters) => {
    const kanjis = Kanji
    const filtered = kanjis.filter(kanji => chapters.includes(kanji.chapter))
    return filtered
}

const questionsForQuiz = (chapters) => {
    return shuffle(Distinct.filter(kanji => chapters.includes(kanji.chapter)))
}

const optionsForQuiz = (kanji, key) => {
    const otherOptions = shuffle(Distinct).filter((element) => element[key] !== kanji[key]).map((element) => element[key]).slice(0, 3)
    let options = shuffle([kanji[key], ...otherOptions])

    return options
}

//TODO: change to real kanji
const questionForJumble = () => {
    const selectedKanji = shuffle(Distinct)[0]
    const question = { value: selectedKanji.rune, key: selectedKanji.spelling }
    const options = optionsForJumble(selectedKanji)
    return { question, options }
}


//TODO: change to real kanji
const optionsForJumble = (kanji) => {
    const NUM_OF_OPTIONS = 10
    const spelling = kanji.spelling.split('')
    const otherOpts = shuffle(Distinct.filter(({rune}) => rune !== kanji.rune)
            .map(({spelling}) => spelling)
            .reduce((prev, val) => prev+val)
            .split('')
    ).slice(0, NUM_OF_OPTIONS-spelling.length)

    const combined = [...spelling, ...otherOpts]
    
    return shuffle(combined)
}

export { Kanji, Distinct, kanjisByChapter, optionsForQuiz, questionsForQuiz, questionForJumble, optionsForJumble }

