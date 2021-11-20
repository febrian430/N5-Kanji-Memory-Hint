// import Distinct from '../assets/data/test.json'
import Kanji from '../assets/data/kanji.json'
import Distinct from '../assets/data/distinct.json'
import shuffle from './shuffler';


const kanjisByChapter = (chapters) => {
    const kanjis = Kanji
    const filtered = kanjis.filter(kanji => chapters.includes(kanji.chapter))
    return filtered
}

const questionsByChapters = (chapters) => {
    const filtered = Distinct.filter(kanji => chapters.includes(kanji.chapter))
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
const questionForJumble = (key1, key2) => {
    const selectedKanji = shuffle(Distinct)[0]
    const question = { value: selectedKanji[key1], key: selectedKanji[key2] }
    const options = optionsForJumble(selectedKanji, key1, key2)
    return { question, options }
}


//TODO: change to real kanji
const optionsForJumble = (question, questionKey, answerKey) => {
    const NUM_OF_OPTIONS = 9
    console.log(question)
    const correctOption = question.key.split('')
    const otherOpts = shuffle(Distinct.filter((example) => example[questionKey] !== question.value)
            .map((example) => example[answerKey])
            .reduce((prev, val) => prev+val)
            .split('')
    ).slice(0, NUM_OF_OPTIONS-correctOption.length)

    let combined = [...correctOption, ...otherOpts]
    combined = combined.map((value, index) =>  { return { value: value, id: String(index)}})
    return shuffle(combined)
}

const questionsForPicky = (chapters) => {
    return shuffle(Distinct.filter(kanji => chapters.includes(kanji.chapter)))
}

const optionsForPicky = (kanji, key) => {
    const otherOptions = shuffle(Distinct).filter((element) => element[key] !== kanji[key]).map((element) => element[key]).slice(0, 8)
    let options = shuffle([kanji[key], ...otherOptions])

    return options
}

const Jumble = {
    getQuestion: (questionKey, answerKey, numOfQuestions = 1, selectedChapters = []) => {
        
        const kanjis = shuffle(questionsByChapters(selectedChapters)).slice(0, numOfQuestions)
        const questions = kanjis.map((kanji) => { 
            return { value: kanji[questionKey], key: kanji[answerKey], type: questionKey }
        })
        console.log(questions)
        const qnas = questions.map((question) => {        
            const opts = optionsForJumble(question, questionKey, answerKey)
            return { question, options: opts }
        })
        console.log(qnas)
        return qnas
    }
}

const MixMatch = {
    getQuestion: (questionKey, answerKey, numOfQuestions = 1, selectedChapters = []) => {
        const kanjis = shuffle(questionsByChapters(selectedChapters)).slice(0, numOfQuestions)
        const questions = kanjis.map((element) =>  { return { value: element[questionKey], key: element[answerKey] }})
        const answers = kanjis.map((element) =>  { return { value: element[answerKey], key: element[questionKey] }})

        return shuffle([...questions, ...answers])
    }
}

export { 
    Kanji, 
    Distinct, 
    kanjisByChapter, 
    optionsForQuiz, 
    questionsForQuiz, 
    questionForJumble, 
    optionsForJumble, 
    questionsForPicky, 
    optionsForPicky,
    Jumble,
    MixMatch
}

