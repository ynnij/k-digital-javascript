// DOM 생성
const domCreate = () => {
    console.log("dom 생성");
    const myh2 = document.createElement("button");
    const myh2Txt = document.createTextNode("자바스크립트 생성"); 
    myh2.appendChild(myh2Txt); 
    document.getElementById("adiv").append(myh2);
}

// DOM 읽기
const domRead = () => {
    const myh1 = document.querySelector("h1");
    console.log("innerHTML =>",myh1.innerHTML);
    console.log("innerText =>",myh1.innerText);
    console.log("textContent =>",myh1.textContent);
}

// DOM 수정
const domUpdate = () => {
    const myh2 = document.querySelector("button");
    if(myh2){
        //myh2.innerHTML = "<h3>자바스크립트 수정</h3>" ;
        myh2.textContent = "자바스크립트 수정" ;
    }
    
    
}

// DOM 삭제
const domDelete = () => {
    const myh2 = document.querySelector("button");
    if(myh2){
        console.log("myh2:",myh2);
        myh2.remove();
    }
    
}
