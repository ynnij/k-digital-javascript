const dice = () => {
    const dicediv = document.querySelector("#dicediv");
    let n = Math.floor(Math.random()*6)+1;
    dicediv.innerHTML = `<img src='./images/${n}.png'>`;

}