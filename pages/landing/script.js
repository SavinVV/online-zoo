class Donate {
    constructor(creditCard) {
        this.name = null;
        this.email = null;
        this.amount = null;
        this.subscription = false;
        this.favourite = false;
        this.creditCard = creditCard;
    }

    checkName() {
        const reg = /^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']?$/;
        return reg.test(this.name);
    }

    checkEmail() {
        const reg = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
        return reg.test(this.email);
    }

    checkAmount() {
        const reg = /^[0-9]{1,4}$/;
        return reg.test(this.amount);
    }

    validDonate() {
        return (this.checkName() && this.checkEmail() && this.checkAmount())?true:false;
    }
    
}

class CreditCard {
    constructor() {
        this.cardNumber = null;
        this.cardCVV = null;
        this.month = null;
        this.year = null;
    }

    checkCardNumber() {
        const reg = /^[0-9]{13,16}$/;
        return reg.test(this.cardNumber);
    }

    checkcardCVV() {
        const reg = /^[0-9]{3}$/;
        return reg.test(this.cardCVV);
    }

    validCreditCard() {
        return (this.checkCardNumber() && this.checkcardCVV() && this.month && this.year)?true:false;
    }
}

// Подсвечивание некорректно заполненных полей

function checkInput(reg, input) {
    if (reg.test(input.value)) {
        input.style.color = 'green';
    } else {
        input.style.color = 'red';
    }
}

function validAmount(input) {
    const reg = /^[0-9]{1,4}$/;
    checkInput(reg, input);
}


function validName(input) {
    const reg = /^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']?$/;
    checkInput(reg, input);
}

function validCVV(input) {
    const reg = /^[0-9]{3}$/;
    checkInput(reg, input);
}

function validCardNumber(input) {
    const reg = /^[0-9]{13,16}$/;
    checkInput(reg, input);
}

function validEmail(input) {
    const reg = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
    checkInput(reg, input);
}

// Открытие - закрытие модального окна

const closePopupBtn = document.querySelector('.popup__close'),
      donateBtns = document.querySelectorAll('.donate_btn'),
      popup = document.querySelector('.popup'),
      donationPopups = document.querySelectorAll('.donation_popup form');

function closeModal(modal) {
    modal.classList.remove('show');
}

function showModal(modal) {
    modal.classList.add('show');
}

donateBtns.forEach(btn => {
    btn.addEventListener('click', () => showModal(popup));
});

closePopupBtn.addEventListener('click', () => closeModal((popup)));


//  закрытие модального окна доната

const modals = document.querySelectorAll('.modal');

document.addEventListener('keydown', (e) => {
    modals.forEach(modal => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modal);
            resetForms();
        }
    });
});

modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if ((e.target.classList.contains('modal'))) {
            closeModal(modal);
            resetForms();
        }
    });
});

// Добавить/удалить класс активности у кнопок донатов

function addClassActionBtn(button) {
    button.classList.add('green_btn_activ');
}

function removeClassActionBtn() {
    document.querySelectorAll('.green_btn').forEach(btn => {
        if (btn.classList.contains('green_btn_activ')) {
            btn.classList.remove('green_btn_activ');
        }
    });
}

// Сброс форм

function resetForms() {
    donationPopups.forEach(form => {
        form.reset();
    });
    removeClassActionBtn();
}

// Quick Donate

const donatoinAmountBtn = document.querySelector('.donation__send');

const donationStepOne = document.querySelector('.donation_1'),
      donationStepTwo = document.querySelector('.donation_2'),
      donationStepThree = document.querySelector('.donation_3');

const donationInput = document.querySelector('.donation__input'),
      otherAmountInput = document.querySelector('.other_amount__input');

const donationForm = document.querySelector('.donation form');


const otherAmountBtn = document.querySelector('.other_amount__btn');

donatoinAmountBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (donationInput.value) {
        otherAmountInput.value = donationInput.value;
        addClassActionBtn(otherAmountBtn);
    } else {
        addClassActionBtn(document.querySelector('.donation_popup_menu__amount_list button'));
    }
    showModal(donationStepOne);
});

// Первое модальное окно

const donationAmountList = document.querySelector('.donation_amount_list');

donationAmountList.addEventListener('click', e => {
    if (e.target.classList.contains('donation_amount')) {
        closeModal(popup);
        showModal(donationStepOne);

        if (e.target.classList.contains('donation_other')) {
            addClassActionBtn(otherAmountBtn);
            otherAmountInput.focus();
        } else {
            document.querySelectorAll('.donation_popup__amount').forEach(btn => {
                if (e.target.dataset.amount == btn.dataset.amount) {
                    addClassActionBtn(btn);
                }
            });
        }
    }
});

// Кнопки next/back

const nextBtns = document.querySelectorAll('.donation_popup__next_btn');

nextBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const step = +e.target.dataset.step;
        closeModal(document.querySelector(`.donation_${step}`));
        showModal(document.querySelector(`.donation_${step + 1}`));
    });
});

const backBtns = document.querySelectorAll('.donation_popup__back_btn');

backBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const step = +e.target.dataset.step;
        closeModal(document.querySelector(`.donation_${step}`));
        showModal(document.querySelector(`.donation_${step - 1}`));
    });
});

// Донат шаг 1

const donationStepOneAmountList = document.querySelector('.donation_popup_menu__amount_list');

donationStepOneAmountList.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        e.preventDefault();
        removeClassActionBtn();
        addClassActionBtn(e.target);
    }
});

otherAmountBtn.addEventListener('click', (e) => {
    e.preventDefault();
    removeClassActionBtn();
    addClassActionBtn(otherAmountBtn);
    otherAmountInput.focus();
});

const favourite = document.querySelector('#favourite'),
      favouriteBtn = document.querySelector('.special_form__btn');

favouriteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!favouriteBtn.classList.contains('green_btn_activ')) {
        addClassActionBtn(favouriteBtn);
        favourite.focus();
    } else {
        favourite.selectedIndex = 0;
        favouriteBtn.classList.remove('green_btn_activ');
    }
});

favourite.addEventListener('change', () => {
    addClassActionBtn(favouriteBtn);
});

// Отправить донат

const donationCompleteBtn = document.querySelector('.donation_popup__complete_btn');

donationCompleteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (validDonateForm() && validCreditCardForm()) {
        closeModal(donationStepThree);
        resetForms();
        setTimeout(() => {alert('Thank you for your donation');}, 1);
    } else {
        alert('Ошибка. Какое-то поле заполненно не корректно');
    }
});

// Проверить донат

function validCreditCardForm() {
    const creditCard = new CreditCard();
    creditCard.cardNumber = document.querySelector('.input_card_number').value;
    creditCard.cardCVV = document.querySelector('.input_cvv_number').value;
    const month = document.querySelector('#month');
    creditCard.month = month.options[month.selectedIndex].value;
    const year = document.querySelector('#year');
    creditCard.year = year.options[year.selectedIndex].value;
    return creditCard.validCreditCard();
}

function validDonateForm() {
    const donate = new Donate();
    donate.amount = getAmountDonate();
    donate.name = document.querySelector('.input_fullname').value;
    donate.email = document.querySelector('.input_email').value;
    return donate.validDonate();
}

function getAmountDonate() {
    if (otherAmountBtn.classList.contains('green_btn_activ')) {
        return +otherAmountInput.value;
    } else {
        const donationAmounts = document.querySelectorAll('.donation_popup__amount');
        for (let i = 0; i <= donationAmounts.length - 1; i++) {
            if (donationAmounts[i].classList.contains('green_btn_activ')) {
                return +donationAmounts[i].dataset.amount;
            }
        }
    }
}
