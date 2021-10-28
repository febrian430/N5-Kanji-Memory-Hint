import Kanji from '../assets/data/temp.json'
import { kanjis as _kanjis } from '../assets/data/temp.json';
import distinct from '../assets/data/distinct.json';
import shuffle from './shuffler';



// const flatten = () => {
//     let seen = new Map();
//     let distinct = []
//     kanjis.kanjis.forEach(({chapter, examples}) => {
//         examples.forEach(kanji => {
//             if(seen.get(kanji.rune) === undefined) {
//                 distinct.push({ ...kanji, chapter: chapter })
//                 seen.set(kanji.rune, kanji)
//             }
//         })
//     })
//     const json = JSON.stringify(distinct)
//     fs.writeFileSync("distinct.json", json, "utf8")
//     return distinct
// }

const kanjisByChapter = (chapters) => {
    const kanjis = _kanjis
    const filtered = kanjis.filter(kanji => chapters.includes(kanji.chapter))
    return filtered
}

const questionsForQuiz = (chapters) => {
    return shuffle(distinct.filter(kanji => chapters.includes(kanji.chapter)))
}

const optionsForQuiz = (kanji, key) => {
    const otherOptions = shuffle(distinct).filter((element) => element[key] !== kanji[key]).map((element) => element[key]).slice(0, 3)
    let options = shuffle([kanji[key], ...otherOptions])

    return options
}

export { kanjisByChapter, optionsForQuiz, questionsForQuiz }

