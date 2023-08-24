document.addEventListener("DOMContentLoaded", ()=>{
    const bt1 = document.querySelector("footer > div");
    //const bt1 = document.getElementById("bt1");
    console.log(bt1.textContent);

    const bt = document.querySelectorAll("footer button"); //bt는 nodelist
    console.log(bt);

    // 변수 선언
    // 기존 선언 방법
    console.log(x);
    var x = 10;
    console.log(x);

    //최근 변수 선언 방법
    //console.log(esx);
    let esx = 10;
    console.log(esx);


    //nodelist 순회
    //1. 전통적인 for
    console.log("1. 전통적인 for");
    for(let i=0;i<bt.length;i++){
        console.log(bt[i]);
    }

    //2. for in : key를 순회하기 위한 반복문
    console.log("2. for in 순회");
    for(let i in bt){ // i는 key
        console.log(i, bt[i]); // key와 value 출력
    }

    // 3. for each : array만 가능
    console.log("3. for each 순회");
    bt.forEach((i)=>console.log(i)); 
    bt.forEach((i,idx)=>console.log(i, idx));  // 인덱스 값도 가져올 수 있음

    // 4. for of 
    console.log("4. for of 순회");
    for(let i of bt){ 
        console.log(i); // i 자체가 컴포넌트
    }
    for(let [idx,i] of bt.entries()) { //entries는 키와 밸류로 되어 있음 -> 구조 분해할 수 있음
        console.log(idx, i); 
    }

    //버튼의 캡션 값 가져와서 div에 붙이기
    console.log("버튼의 캡션 값 가져오기");
    let s = "<ul>";
    for(let i of bt){
        s+="<li>"+i.getAttribute("id")+":"+i.textContent+"</li>";
    }
    console.log(s);
    document.querySelector("#adiv").innerHTML = s+"</ul>";

    
});