const getData = (tDt,table,sel) =>{
    let apikey = "f5eef3421c602c6cb7ea224104795888";
    let url = "https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json"
    url = url + `?key=${apikey}`
    url = url + `&targetDt=${tDt}`;
    url = url +`&multiMovieYn=${sel}`;


    fetch(url)
        .then((resp) => resp.json()) //가지고 온 데이터가 resp에 들어감 -> json으로 바꿈
        .then((data) => {
            //console.log(data) //data의 데이터타입은 오브젝트 타입
            // console.log(data.boxOfficeResult['boxofficeType']);
            let dailyBoxOfficeList = data.boxOfficeResult.dailyBoxOfficeList; //프로토타입 배열 
            console.log(dailyBoxOfficeList);
            let conTag = `<thead>
                            <tr>
                                <th scope="col" id="rank">순위</th>
                                <th scope="col" id="movieNm">영화명</th>
                                <th scope="col" id="openDt">개봉일</th>
                                <th scope="col" id="audiCnt">관객수</th>
                                <th scope="col" id="audiAcc">누적관객수</th>
                                <th scope="col" id="salesAcc">누적매출액</th>
                            </tr>
                        </thead>`;

            conTag += '<tbody>'
            for (let item of dailyBoxOfficeList) {
                conTag += `<tr><th scope='row'>${item.rank}</th>`
                + `<td>`;

                if(parseInt(item.rankInten)===0){
                    conTag =conTag+`<span class='inten0'> (-) </span> `;
                } else if(parseInt(item.rankInten)>0){
                    conTag =conTag+`<span class='inten1'>🔺 </span> `;
                } else{
                    conTag =conTag+`<span class='inten2'>🔽 </span>`;
                }

                conTag+=`<a onclick="show(${item.movieCd})" href="#"'>${item.movieNm}</a></td>`
                    + `<td>${item.openDt}</td>`
                    + `<td><span class="numtd">${parseInt(item.audiCnt).toLocaleString()}</span></td>`
                    + `<td><span class="numtd">${parseInt(item.audiAcc).toLocaleString()}</span></td>`
                    + `<td><span class="numtd">${parseInt(item.salesAcc).toLocaleString()}</span></td></tr>`
            }
            conTag += '</tbody>'
            table.innerHTML = conTag;
        })
        .catch((err) => console.log(err)) //then 구문에서 에러 발생 시 catch에서 잡는다.
}

const show=(movieCd)=>{
    const infoDiv = document.querySelector("#infoDiv")
    let cnt =0;

    url = "https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json"
    url+="?key=f5eef3421c602c6cb7ea224104795888"
    url+= `&movieCd=${movieCd}`;
    
    fetch(url)
    .then((resp)=>resp.json())
    .then((data)=>{
        
        let info = data.movieInfoResult.movieInfo;
        console.log(info);
        infoDiv.innerHTML = `<h1>${info.movieNm}<span> (${info.movieNmEn})</span><h1>`
        infoDiv.innerHTML += `<p><strong>영화 유형</strong> ${info.typeNm}</p>`
        infoDiv.innerHTML += `<p><strong>상영시간</strong> ${info.showTm} 분</p>`
        
        let audits = "";
        for(audit of  info.audits){
            audits+=audit.watchGradeNm;
        }
        infoDiv.innerHTML += `<p><strong>심의정보</strong> ${audits}</p>`
        

        let dirname = "";
        cnt=0;
        for(dir of  info.directors){
            dirname+=dir.peopleNm;
            if (cnt!==info.directors.length-1)
                dirname+=" | ";
            cnt++;
        }
        infoDiv.innerHTML += `<p><strong>감독</strong> ${dirname}</p>`
        
        let actname = ""
        cnt=0;
        for(ac of  info.actors){
            actname+=ac.peopleNm
            if (cnt!==info.actors.length-1)
            actname+=" | ";
        cnt++;
        }
        infoDiv.innerHTML += `<p><strong>배우</strong> ${actname}</p>`

        let genres = ""
        cnt=0;
        for(g of  info.genres){
            genres+=g.genreNm;
            if (cnt!==info.genres.length-1)
            genres+=" | ";
        cnt++;

        }
        infoDiv.innerHTML += `<p><strong>장르</strong> ${genres}</p>`
    })
    .catch((err)=>console.log(err));

}

document.addEventListener("DOMContentLoaded", () => {
    const dt = document.querySelector("#dt1");
    const table = document.querySelector("table");
    const movieYn = document.querySelector("#movieYn");

    let sel ="";
    let tDt ="";

    //영화 구분
    movieYn.addEventListener('change',()=>{
        sel = movieYn.value;
        if(!tDt){
            document.querySelector("header p").textContent="날짜를 선택해주세요.";
            return;
        }
        getData(tDt,table,sel);
    });

    //날짜 변경되면 날짜 가져오기
    dt.addEventListener('change', () => { // 날짜 선택 -> change로 잡는다. 
        document.querySelector("header p").textContent="";
        //데이터 가져오기
        tDt = dt.value.replaceAll('-', '');
        getData(tDt, table,sel);

    });

   
});