console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (event) => {
    message1.textContent = ''
    message2.textContent = ''
    const weatherForm = document.querySelector('form');
    event.preventDefault();
    console.log(event)
    let loc = search.value;
    fetch('/weather?address='+loc).then((res) => {
        res.json().then((data) => {
            console.log(data)
            if (data.error) {
                console.log(data.error);
                message2.textContent = data.error;
            }
            else {
                console.log(data.response);
                message1.textContent = data.location
                message2.textContent = data.response;    
            }
        })
    })
})

