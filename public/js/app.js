console.log('client side js loaded');


const weatherform = document.querySelector('form');
const searchElement = document.querySelector('input');

const message1=document.querySelector('#message-1');
const message2=document.querySelector('#message-2');


weatherform.addEventListener('submit', (e) => {
    e.preventDefault();
    message1.textContent = 'loading..';
    message2.textContent = '';
    const location = searchElement.value;
    console.log(location);
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log(data.error);
                message1.textContent = data.error;
            } else {
                message1.textContent = data[0].location;
                message2.textContent = data[0].forecast;
                
            }
            searchElement.value='';
        })
    })
})
