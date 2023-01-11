const doc = document,
    content = doc.getElementById("content"),
    searchBtn = doc.getElementById('searchBtn'),
    infoField = doc.getElementById("infoField"),
    searchField = doc.getElementById('searchField'),
    deleteBtn = doc.getElementById('deleteBtn'),
    meaningField = doc.getElementById('meaning'),
    examplesField = doc.getElementById('examples'),
    synonymousField = doc.getElementById('synonymous'),
    wordField = doc.getElementById('wordField'),
    partOfSpeech = doc.getElementById('partOfSpeech'),
    audioBtn = doc.getElementById('audioBtn')
    pronounciation = doc.getElementById('pronounce')

function showInfo(flag, message='', word='', res=''){
    if(flag){
        if(res){
            let definitions = res.meanings[0].definitions[0]
            wordField.innerText = word.slice(0,1).toUpperCase()+word.slice(1, word.length).toLowerCase()
            pronounciation.innerText = `${res.phonetic ? res.phonetic : word}`
            partOfSpeech.innerText = `${res.meanings[0].partOfSpeech}`
            meaningField.innerHTML = `<span>${definitions.definition ? definitions.definition : "No definitions found :("}</span>`
            examplesField.innerText = `${definitions.example ? definitions.example : "No examples found :("}`
            
            audioBtn.classList.remove('active')
            audioBtn.onclick = ()=> {console.log("daaaaaamn no audio! :(")}
            res.phonetics.forEach(element => {
                if(element.audio){
                    let audioLink = element.audio,
                        audio = new Audio(audioLink)
                    audioBtn.classList.add('active')
                    console.log(audioBtn)
                    audioBtn.onclick = ()=> {audio.play()}
                }
            });
            let synonymousStr = ''
            for(let i = 0; i < res.meanings.length; i++){
                for(let j = 0; j < res.meanings[i].synonyms.length; j++){
                    if(synonymousStr.split(', ').length < 5)
                        synonymousStr += `${res.meanings[i].synonyms[j]}, `
                    else{
                        synonymousStr += `${res.meanings[i].synonyms[j]}.`
                        break
                    }
                }
            }
            synonymousField.innerText = synonymousStr ? synonymousStr : "No synonymous found :("
            content.classList.remove("disabled")
            infoField.classList.add("disabled")
        }
        else{
            infoField.innerText = `Sorry, no results for ${word}`
            content.classList.add("disabled")
            infoField.classList.remove("disabled")
        }
    }
    else{
        infoField.innerText = message
        content.classList.add("disabled")
        infoField.classList.remove("disabled")
    }
}
function setData(){

}
function getData(word){
    if(word.toLowerCase() === 'julie') {
        infoField.innerText = "Best girl"
        return
    }
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    let data = fetch(url)
        .then(res => res.json())
        .then(result => showInfo(true, '', word, result[0]))
}
function search(){
    let word = searchField.value
    showInfo(false, `Hold on, searching for ${word}`)
    if(word){
        searchField.setAttribute("placeholder", 'Search')
        infoField.innerText = `Hold on, searching for meaning of ${word}...`
        getData(word)
    }
    else searchField.setAttribute("placeholder", 'You have to type something :)')
}
window.onload = () => {
    searchField.focus()
    window.addEventListener(('keyup'), (e)=>{
        if(e.key === 'Enter'){
            search()
        }
    })
    deleteBtn.addEventListener(('click'), ()=>{
        searchField.value = ''
        showInfo(false, "Type some word to get it's meaning, pronounciation, synonyms e.t.c")
    })
    searchBtn.addEventListener(('click'), ()=>{
        search()
    })
    searchField.addEventListener(('input'), ()=>{ if(!searchField.value){ showInfo(false, "Type some word to get it's meaning, pronounciation, and") }})
}
