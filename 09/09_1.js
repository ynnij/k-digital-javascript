// 데이터 관련 실습
let juso; //전체주소 : juso2023.json
let si; //시
let gu; //구
let dong; //동

//시설유형
let equptype = {
    "노인시설":"001", // option의 텍스트값 : option value
    "복지회관":"002",
    "마을회관":"003", 
    "보건소":"004",
    "주민센터":"005",
    "면동사모소":"006",
    "종교시설":"007",
    "금융기관":"008", 
    "정자":"009", 
    "공원":"010", 
    "정자 파고라":"011",
    "공원":"012", 
    "교량하부":"013", 
    "나무그늘":"014", 
    "하천둔치":"015", 
    "기타":"099"
} 

console.log(equptype); // key와 값으로 이루어진 데이터 -> 오브젝트
console.log(equptype["노인시설"]); // 001 > 배열의 인덱스처럼 
console.log(equptype.노인시설); // 001 > . 연산자로 접근

//오브젝트는 forEach 사용하지 않음 (Array만 가능)
for(let key in equptype){ // in 하면 key값(인덱스값) 나옴
    console.log(key,"=>", equptype[key])
}

//entries 사용해서 key와 값으로 구조 분해
for(let [k,v] of Object.entries(equptype)){ // of   
    console.log(k,"=>", v)
}

// 주소 데이터 가져오기
fetch('juso2023.json')
.then((resp) => resp.json())
.then((data)=>{ 
    juso = data; // juso에 저장된 데이터는 Array 타입
    console.log(juso); //fetch가 끝난 후 콘솔 출력

    //주소 배열을 모두 돌면서 시도명칭과 시도코드로 이루어진 si의 오브젝트를 만들고 싶음
    si ={};
    juso.forEach(element => { //Array안 데이터(element) object 타입
        //console.log(element);
        let {시도명칭, 시도코드} = element; //구조분해 가능

        if(!si[시도명칭]){ //si에 시도명칭이 없을 때 
            si[시도명칭]=시도코드;
        }
    });
    console.log(si);

} ) //json으로 만든 데이터를 주소에 넣음
.catch((err)=> console.log(err));

console.log(juso); //fetch는 비동기방식이기 때문에 console.log를 먼저 실행하고 undefined 찍힘 