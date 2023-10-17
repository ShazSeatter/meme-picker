import './style.css'
import { natureData } from './data.js';

const themeRadios = document.getElementById('theme--radios')
const getImgBtn = document.getElementById('get-image--btn')
const gifsOnlyOption = document.getElementById('gifs-only--checkbox')
const memeModal = document.getElementById('meme-modal')
const memeModalInner = document.getElementById('meme-modal--inner')
const memeModalCloseBtn = document.getElementById('meme-modal-close--btn')


themeRadios.addEventListener('change', highlightCheckedOption)
getImgBtn.addEventListener('click', renderNatureMeme)
memeModalCloseBtn.addEventListener('click', closeModal)

function highlightCheckedOption(e) {
  const radios = document.getElementsByClassName('radio')
  for (let radio of radios) {
    radio.classList.remove('highlight')
  }
  document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function closeModal() {
  memeModal.style.display = 'none'
}

function renderNatureMeme() {
  const natureObject = getSingleThemeObject()
  memeModalInner.innerHTML = `
        <img 
        class="nature-img" 
        src="images/${natureObject.imageSrc}"
        alt="${natureObject.alt}"
        >
  `
  memeModal.style.display = 'flex'

}
function getSingleThemeObject() {
  const themesArray = getMatchingNatureThemesArray()

  if (themesArray.length === 1) {
    return themesArray[0]
  } else {
    const randomIndex = Math.floor(Math.random() * themesArray.length)
    return themesArray[randomIndex]
  }
}

function getMatchingNatureThemesArray() {
  if (document.querySelector('input[type="radio"]:checked')) {
    const selectedTheme = document.querySelector('input[type="radio"]:checked').value
    const isGif = gifsOnlyOption.checked

    const matchingNatureThemeArray = natureData.filter(function(natureEl) {
      if(isGif) {
        return natureEl.themeTags.includes(selectedTheme) && natureEl.isGif
      } else {
        return natureEl.themeTags.includes(selectedTheme)
      }
    })
    console.log(matchingNatureThemeArray)
    return matchingNatureThemeArray
  }
}


function getThemesArray(nautreInfo) {
  const themesArray = []
  for (let info of nautreInfo) {
    for (let theme of info.themeTags) {
      if (!themesArray.includes(theme)) {
        themesArray.push(theme)
      }
    }
  }
  return themesArray
}


function renderThemesRadios(natureInfo) {
  let radioItems = ``
  const themes = getThemesArray(natureInfo)
  for (let theme of themes) {
    radioItems += `
    <div class="radio"> 
      <label for="${theme}">${theme}</label>
      <input 
      type="radio"
      id="${theme}"
      value="${theme}"
      name="themes"
      >
    </div>
    `
  }

  themeRadios.innerHTML = radioItems

}

renderThemesRadios(natureData)