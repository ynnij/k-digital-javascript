// 회문처리
const palindrome = (str) => {
    //문자열 길이
    console.log(str.length);


    //문자열이 없을 경우
    if (str.length === 0) return;


    //문자 한글자씩
    // 익숙한 for문
    for (let i = 0; i < str.length; i++) {
        console.log(str[i]);
    }
    //for of 사용 (파이썬의 for in과 같음)
    for (let i of str) console.log(i);

    arr = new Array();
    for (let i = 0; i <= str.length / 2; i++) {
        arr[i] = str[i];
    }


    //회문확인
    /* //문자를 뒤집어서 저장하고 비교하는 방법 
    s="";
    for(let i=str.length-1;i>=0;i--) 
        s = s+str[i];
    */

    s = str.split("").reverse().join(''); //문자열을 한글자 단위로 분리해서 배열로 저장. s는 array
    // array는 reverse 함수 사용해서 뒤집고 join으로 합칠 수 있다. 

    console.log(s)

    if (str === s) txt2.value = "회문입니다.";
    else txt2.value = "회문이 아닙니다.";


}

// 숫자합계
const numSum = (str) => {
    let sum = 0;
    let num = 0;

    /*
    // 단일 숫자로
    for(n of str){
        if(!isNaN(n)) sum+=parseInt(n);
    }
    */

    for (n of str) { // 연속된 숫자로
        if (!isNaN(n)) {
            num = num * 10 + parseInt(n);
        }
        else {
            sum += num;
            num = 0;
        }
    }
    sum += num; // 문자열이 숫자로 끝났을 경우 남은 num값 sum에 더해주기
    txt2.value = sum;

}

document.addEventListener("DOMContentLoaded", () => {
    // 버튼 클릭 시 잡기

    const bts = document.querySelectorAll("input[type=button]");
    bts.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (btn.value === "회문확인") palindrome(txt1.value);
            else numSum(txt1.value);
        });
    });

    txt1.addEventListener("click", () => {
        txt1.value = "";
        txt2.value = "";
    })

    //배열 확인
    let arr = [];
    const bt1s = document.querySelectorAll(".bt1");
    bt1s.forEach((bt) => {
        bt.addEventListener("click", (e) => {
            e.preventDefault(); //form이 버튼이 눌러졌을 때 submit 발생하게됨 > 예방하는 방법 preventDefault

            switch (bt.textContent) {
                case "사과": arr.push('🍎'); break;
                case "바나나": arr.push('🍌'); break;
                case "당근": arr.push('🥕'); break;
                case "수박": arr.push('🍉'); break;
            }
            console.log(arr);
            txt1.value = arr.join(',');
        })
    });

    const bt2s = document.querySelectorAll(".bt2");
    bt2s.forEach((bt) => {
        bt.addEventListener("click", (e) => {
            e.preventDefault(); //form이 버튼이 눌러졌을 때 submit 발생하게됨 > 예방하는 방법 preventDefault
            switch (bt.textContent) {
                case "사과삭제":
                    arr = arr.filter((item) => item != '🍎'); // != : 🍎인걸 빼고 만들어줌
                    break;
                case "바나나삭제":
                    arr = arr.filter((item) => item != '🍌');
                    break;
                case "당근삭제":
                    arr = arr.filter((item) => item != '🥕');
                    break;
                case "수박삭제":
                    arr = arr.filter((item) => item != '🍉');
                    break;
            }
            txt1.value = arr.join(',');
        });
    });

    const bt3s = document.querySelectorAll(".bt3");
    bt3s.forEach((bt) => {
        bt.addEventListener("click", (e) => {
            e.preventDefault(); //form이 버튼이 눌러졌을 때 submit 발생하게됨 > 예방하는 방법 preventDefault
            switch (bt.textContent.slice(0, 2)) {
                case "사과":
                    arr = arr.map((item) => item === '🍎' ? '🥒' : item); // 개수를 똑같이 하기 위해 map 사용 
                    break;
                case "바나":
                    arr = arr.map((item) => item === '🍌' ? '🥦' : item);
                    break;
                case "당근":
                    arr = arr.map((item) => item === '🥕' ? '🍊' : item);
                    break;
                case "수박":
                    arr = arr.map((item) => item === '🍉' ? '🍇' : item);
                    break;
            }
            txt1.value = arr.join(',');
        })
    })

    // 배열 지우기 
    const rbt = document.querySelector("input[type=reset]");
    rbt.addEventListener("click", () => {
        arr.length = 0; // 배열 비우기
        // arr = []  // 이렇게도 비울 수 있다.
    })
});