const $form = document.querySelector('form');

$form.addEventListener('keyup', (e) => {
    const {name, value} = e.target;
    if(name==="email"){
        updateCheckmark(name, false);
        document.querySelector('.delete-button').style.display="block";
    }
    if(name==="nickname"){
        updateCheckmark(name, value!=="");
    }
    if(name==="password"){
        const valid = isPasswordValid(e.target.value);
        updateUI(name, valid);
    }
    if(name==="birthDate"){
        e.target.value = addDotToBirthDate(value);
        const valid = isBirthDateValid(e.target.value);
        updateUI(name, valid);
    }
    const formValid = isFormValid();
    document.querySelector('#signup-form-submit').disabled = !formValid;
})

$form.addEventListener('click', (e) => {
    e.preventDefault();
    const {classList} = e.target;
    const $emailInput = document.querySelector('input[name="email"]');

    if(classList.contains('delete-button')){
        $emailInput.value = "";
    }
    if(classList.contains('submit-button')){
        const valid = isEmailValid($emailInput.value);
        const $deleteButton = document.querySelector('.delete-button');
        if(valid){
            $emailInput.disabled = true;
            e.target.disabled = true;
            $deleteButton.style.display = "none";
            [...document.querySelectorAll(".text-input-wrapper")].forEach($el => {
                $el.style.display = "flex";
            })
        }
        updateUI('email', valid);
    }
})

const isFormValid = () => {
    const result = [...document.querySelectorAll('span.checkmark')].reduce((acc, $el) => {
        return $el.classList.contains('valid')? acc: false;
    }, true)
    return result;
}

const updateUI = (name, valid) => {
    updateCheckmark(name, valid);
    const $inputWrapper = document.querySelector(`.text-input-wrapper[data-name="${name}"] .input-wrapper`);
    const $errorText = document.querySelector(`.text-input-wrapper[data-name="${name}"] .error-text`);
    if(valid) {
        $errorText.classList.remove('error');
        $inputWrapper.classList.remove('error');
    }
    else {
        $errorText.classList.add('error');
        $inputWrapper.classList.add('error');
    }
}

const updateCheckmark = (name, valid) => {
    const $checkMark = document.querySelector(`.text-input-wrapper[data-name="${name}"] span.checkmark`);
    if (valid) {
        $checkMark.classList.add('valid');
        return;
    }
    $checkMark.classList.remove('valid');
}

const isEmailValid = (email) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}

const isPasswordValid = (password) => {
    if(
        !(/^(?=.*[A-Z])(?=.*[a-z])[A-Za-z]{10,}$/.test(password) //영문 대문자, 영문 소문자 조합
        || /^(?=.*[A-Z])(?=.*[0-9])[A-Z0-9]{10,}$/.test(password) //영문 대문자, 숫자 조합
        || /^(?=.*[A-Z])(?=.*[@$!%*#?&])[A-Z@$!%*#?&]{10,}$/.test(password) //영문 대문자, 특수문자 조합
        || /^(?=.*[a-z])(?=.*[0-9])[a-z0-9]{10,}$/.test(password) //영문 소문자, 숫자 조합
        || /^(?=.*[a-z])(?=.*[@$!%*#?&])[a-z@$!%*#?&]{10,}$/.test(password) //영문 소문자, 특수문자 조합
        || /^(?=.*[0-9])(?=.*[@$!%*#?&])[0-9@$!%*#?&]{10,}$/.test(password)) //숫자, 특수문자 조합    
    ){
        return false;
    }
    if(/([0-9])\1{2}|(012|123|234|345|456|567|678|789|987|876|765|654|543|432|321|210)/.test(password)){  //같은 혹은 연속된 숫자 세개 이상 입력
        return false;
    }
    return true;
}

const addDotToBirthDate = (birthDate) => {
    const numString = birthDate.replace(/[^0-9]/g, "");
    const result = numString.split("").reduce((acc, curr) => {
        if(acc.length===4 || acc.length===7) return acc + "." + curr;
        return acc + curr;
    }, "").slice(0, 11);
    return result;
}

const isBirthDateValid = (birthDate) => {
    if(!/\d{4}.\d{2}.\d{2}/.test(birthDate)) return false;
    const [year, month, date] = birthDate.split(".").map(Number);
    if(year > 2022) return false;
    switch(month){
        case 1:
        case 3: 
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            return date<=31;
        case 2:
            return date<=28;
        case 4: 
        case 6:
        case 9:
        case 11:
            return date<=30;   
    }
}