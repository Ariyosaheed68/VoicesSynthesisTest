const voiceSelect = document.getElementById('voice-select');

const synth = window.speechSynthesis;
let voices;

function addVoicesToSelect () {
    voices = synth.getVoices()


    for(let i = 0; i < voices.length; i++) {
        const option = document.createElement('option')
        option.textContent = `${voices[i].name} -  ${voices[i].lang}`

        if(voices[i].default) {
            option.textContent += '- DEFAULT'
        }

        option.setAttribute('data-lang', voices[i].lang)
        option.setAttribute('data-name', voices[i].name)
        voiceSelect.appendChild(option)
    }
}


function onsubmit (e) {
    e.preventDefault();

    const textinput = document.getElementById('text-input');
    const utterThis = new SpeechSynthesisUtterance(textinput.value);

    const selectOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    for (let i = 0;i< voices.length; i++) {
        if (voices[i].name === selectOption) {
            utterThis.voice = voices[i];
        }
    }
    synth.speak(utterThis);
    
    
};


addVoicesToSelect();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = addVoicesToSelect;
}
document.getElementById('form').addEventListener('submit', onsubmit);




