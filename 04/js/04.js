document.addEventListener("DOMContentLoaded",()=>{
    /* // index.html2의 js 코드
    //버튼 가져오기
    const bts = document.querySelectorAll("button");
    console.log(bts)

    // 각 버튼에 이벤트 달기
    bts.forEach((btn)=>{ // 6개 각각 반복문 실행
        btn.addEventListener("click",()=>{ //이벤트 리스너 추가, 클릭됐을 때 할 일
            dice2(parseInt(btn.textContent));
        })
    });
    */
   
    //index3.html의 js 코드
    const btn = document.querySelector("button");
    const radios = document.querySelectorAll("input[type=radio]",);
    btn.addEventListener("click",()=>{
        for(let item of radios) {
            if(item.checked){  //checked된 item
                console.log(item.value); // 값가져오기
                dice2(parseInt(item.value));
                break; // for of는 break가능
            }
        }
    });
}); 

// 주사위 보기
const dice = () => {
    const dicediv = document.querySelector("#dicediv");
    let n = Math.floor(Math.random()*6)+1;
    dicediv.innerHTML = `<img src='./images/${n}.png'>`;

}

// 버튼 클릭 시 주사위 보기
// const dice2 = function() { } 기존 함수 선언 방법
const dice2 = (num) => {
    let n = Math.floor(Math.random()*6)+1; // 1~6까지 랜덤 정수 생성
 
    //주사위 이미지 넣을 위치
    // const dicediv = document.getElementById("dicediv"); 
    const dicediv = document.querySelector("#dicediv"); 
    dicediv.innerHTML = `<img src ='./images/${n}.png'>`;

    // 결과 출력을 위한 위치
    const h2 = document.querySelector("hgroup h2");
    if(num === n) {  // === 값과 타입 모두 비교해서 같아야 true 
        h2.textContent = "맞음(승)";
        h2.style.color = "red"; // css 제어
    }
    else {
        h2.textContent = "틀림(패)";
        h2.style.color = "blue";
    }
}