const $form = document.querySelector('form');

$form.addEventListener('keyup', (e) => {
    const {name, value} = e.target;
    if(name==="phoneNum"){
        e.target.value = addDashToPhoneNum(value);
        const valid = isPhoneNumValid(e.target.value);
        updateCheckmark('phoneNum', valid);
        enableCertNumButton(valid);
    }
    if(name==="certNum"){
        const valid = false;
        updateCheckmark('certNum', valid);
        enableNextAnchor(valid);
    }
})

$form.addEventListener('click', (e) => {
    const {classList} = e.target;
    e.preventDefault();
    const $phoneNumInput = document.querySelector('input[name="phoneNum"]');
    const $certNumInput = document.querySelector('input[name="certNum"]');

    if(classList.contains('delete-button')){
        $phoneNumInput.value = "";
        updateCheckmark('phoneNum', false);
    }
    if(classList.contains('secondary-button')){
        $phoneNumInput.disabled = true;
        document.querySelector('.delete-button').style.display = 'none';
        e.target.style.display="none";
        showCertNumUI();
        setCertNum($certNumInput);
    }
    if(classList.contains('text-button')){
        updateCertNum($certNumInput);
    }
})

const addDashToPhoneNum = (value) => {
    const numString = value.replace(/[^0-9]/g, "");
    const result = numString.split("").reduce((acc, curr) => {
        if(acc.length===3 || acc.length===8) return acc + "-" + curr;
        return acc + curr;
    }, "").slice(0, 13);
    return result;
}

const isPhoneNumValid = (value) => {
    const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    return phoneRegex.test(value)
}

const updateCheckmark = (name, valid) => {
    const $checkMark = document.querySelector(`.text-input-wrapper[data-name="${name}"] span.checkmark`);
    if (valid) {
        $checkMark.classList.add('valid');
        return;
    }
    $checkMark.classList.remove('valid');
}

const enableCertNumButton = (enabled) => {
    const $certNumButton = document.querySelector('button.secondary-button');
    $certNumButton.disabled = !enabled;
}

const showCertNumUI = () => {
    document.querySelector('.text-input-wrapper[data-name="certNum"]').style.display="flex";
    document.querySelector('button.primary.text-button').style.display="block";
}

const setCertNum = ($input) => {
    const timerId = setTimeout(() => {
        $input.value = getCertNum(4);
        enableNext();
        clearTimeout(timerId);
    }, 2000);
}

const enableNext = () => {
    updateCheckmark('certNum', true);
    enableNextAnchor(true);
}

const initCertNum = ($input) => {
    $input.value = "";
    enableNextAnchor(false);
    updateCheckmark('certNum', false);
}

const updateCertNum = ($input) => {
    initCertNum($input);
    setCertNum($input);
}

const getCertNum = (len) => {
    const characters = '0123456789';
    const charactersLen = characters.length;
    let result = '';
    for (let i = 0; i < len; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLen));
    }
    return result;
}

const enableNextAnchor = (enabled) => {
    const $nextAnchor = document.querySelector('a.next');
    if(enabled){
        $nextAnchor.classList.remove('disabled');
        return;
    }
    $nextAnchor.classList.add('disabled');
}