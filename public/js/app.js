const submitForm = document.querySelector('form');
const search = document.querySelector('input');
const parag1 = document.querySelector('#msg-1');
const parag2 = document.querySelector('#msg-2');

submitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    
    parag1.textContent = 'Loading ...';
    parag2.textContent = '';
    fetch(`/weather/?address=${location}`).then((response) => {
    response.json().then((data) => {
        if(data.error){
            parag1.textContent = data.error;
            parag2.textContent = '';
            //console.log(data.error);
        }
        else {
            parag1.textContent = data.location;
            parag2.textContent = data.forecast;
            // console.log(data.location);
            // console.log(data.forecast);
        }
    });
});
});