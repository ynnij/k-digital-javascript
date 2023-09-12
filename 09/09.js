let juso; //전체주소 : juso2023.json
let si; //시
let gu; //구
let dong; //동

//시설유형
let equptype = {
    "노인시설": "001", // option의 텍스트값 : option value
    "복지회관": "002",
    "마을회관": "003",
    "보건소": "004",
    "주민센터": "005",
    "면동사무소": "006",
    "종교시설": "007",
    "금융기관": "008",
    "정자": "009",
    "공원": "010",
    "정자 파고라": "011",
    "공원": "012",
    "교량하부": "013",
    "나무그늘": "014",
    "하천둔치": "015",
    "기타": "099"
}

//select 박스 채우기
// d: data, sel: select박스
const addOption = (d, sel) => {
    for (let [k, v] of Object.entries(d)) {
        const option = document.createElement("option");
        option.value = v;
        option.text = k;
        sel.appendChild(option)
    }
}


//주소정보 가져오기
const getJuso = async (sel1) => {  // 비동기함수로 작성
    const resp = await fetch("juso2023.json"); //response가 채워지고 나면
    //    const data = await resp.json();
    //    juso = data;
    juso = await resp.json(); //받은 데이터를 바로 juso에 넣어도 된다. 
    si = {};
    juso.forEach(element => {
        let { 시도명칭, 시도코드 } = element;

        if (!si[시도명칭]) {
            si[시도명칭] = 시도코드;
        }
    });
    addOption(si, sel1);
}

const getGu = async (sel2, v) => {  // 비동기함수로 작성
    gu = {};
    juso.forEach(element => {
        let { 시도코드, 시군구명칭, 시군구코드 } = element;

        if (!gu[시군구명칭] && 시도코드 === v) {
            gu[시군구명칭] = 시군구코드;
        }
    });

    addOption(gu, sel2);
}

const getDong = async (sel3, v1, v2) => {  // 비동기함수로 작성
    dong = {};
    juso.forEach(element => {
        let { 시도코드, 시군구코드, 읍면동명칭, 읍면동코드 } = element;

        if (!dong[읍면동명칭] && 시도코드 === v1 && 시군구코드 === v2) {
            dong[읍면동명칭] = 읍면동코드;
        }
    });

    addOption(dong, sel3);
}

const delOption = (sel, s) => {
    while (sel.hasChildNodes()) {
        sel.removeChild(sel.firstChild);
    }

    const option = document.createElement("option");
    option.value = "";
    option.text = s;
    sel.appendChild(option)

}

const getData = (areaCd, equptype, viewTb, h2) => {
    let key = "CoH8CpU2TWroFJZ6%2B0R%2F5zT4hHenblS1o5PpxZ8GrL5AwTUYGhMaGTi%2FD6sPkk%2FI1dwGPgStpnALZuXQ%2BBeV7Q%3D%3D";
    let year = 2023;
    let type = 'json';


    let url = "https://apis.data.go.kr/1741000/HeatWaveShelter2/getHeatWaveShelterList2";
    url += `?ServiceKey=${key}`
    url += `&year=${year}`
    url += `&areaCd=${areaCd}`
    url += `&type=${type}`
    url += `&equptype=${equptype}`

    console.log(url);

    fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            let resultList = data.HeatWaveShelter[1].row;
            console.log(resultList);
            h2.innerHTML += ` <span id ='tcnt'>totalCount: ${data["HeatWaveShelter"][0]["head"][0]["totalCount"]}</span>`
            let contentsTag = `<table>
                                    <thead>
                                        <th scope="col" id="restname">쉼터명</th>
                                        <th scope="col" id="restaddr">주소</th>
                                        <th scope="col" id="usePsblNmpr">이용가능인원수</th>
                                        <th scope="col" id="mngdptCd">관리기관</th>
                                    </thead>`
            contentsTag += '<tbody>';
            resultList.forEach((elem) => {
                console.log(elem)
                contentsTag += `<tr>
                                    <td>${elem.restname}</td>
                                    <td>${elem.restaddr}</td>
                                    <td>${elem.usePsblNmpr}</td>
                                    <td>${elem.mngdptCd}</td>
                                </tr>`

            })
            contentsTag += '</tbody></table>';
            viewTb.innerHTML = contentsTag;

        })
        .catch((err) => {
            console.log(err);
            viewTb.innerHTML ="<strong>해당 데이터가 없습니다.</strong>";
        })


}

document.addEventListener("DOMContentLoaded", () => {
    const sel1 = document.querySelector("#sel1");
    const sel2 = document.querySelector("#sel2");
    const sel3 = document.querySelector("#sel3");
    const sel4 = document.querySelector("#sel4");
    const bt = document.querySelector("#bt");

    const h2 = document.querySelector("h2");
    const viewTb = document.querySelector("#viewTb");

    // 시 정보
    getJuso(sel1);

    //구 정보
    sel1.addEventListener("change", () => {
        delOption(sel2, '--구선택--');
        delOption(sel3, '--동선택--');
        viewTb.innerHTML = "";
        h2.innerHTML ="";
        getGu(sel2, sel1.value);
    })

    //동 정보
    sel2.addEventListener("change", () => {
        delOption(sel3, '--동선택--');
        viewTb.innerHTML = "";
        h2.innerHTML ="";
        getDong(sel3, sel1.value, sel2.value);
    })

    sel3.addEventListener("change", () => {
        viewTb.innerHTML = "";
        h2.innerHTML ="";
    });

    addOption(equptype, sel4);
    sel4.addEventListener("change", () => {
        viewTb.innerHTML = "";
        h2.innerHTML ="";
    })

    bt.addEventListener("click", (e) => {
        e.preventDefault();
        if (sel1.value === "") {
            h2.innerHTML = `<span class='h2Sel1'>시를 선택해주세요</span>`;
        }

        else if (sel2.value === "") {
            h2.innerHTML = `<span class='h2Sel1'>구를 선택해주세요</span>`;
        }

        else if (sel3.value === "") {
            h2.innerHTML = `<span class='h2Sel1'>동을 선택해주세요</span>`;
        }
        else if (sel4.value === "") {
            h2.innerHTML = `<span class='h2Sel1'>시설유형을 선택해주세요</span>`;
        }
        else {
            let areaCd = `${sel1.value}${sel2.value}${sel3.value}00`;
            console.log(sel4)
            h2.textContent = `지역코드: ${areaCd}, 시설유형: ${sel4.value}`;
            getData(areaCd, sel4.value, viewTb, h2)
        }

    })

});

