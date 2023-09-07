document.addEventListener("DOMContentLoaded",()=>{
    
    let pos = [];
    let flag = true;
    let cnt = 0;
    const shuffle = document.querySelector("footer button");
    shuffle.addEventListener('click',()=>{
        if(!flag) return;
        init();
        cnt=0;
        pos.length=0;
        for(let i=0;i<=9;i++){
            pos.push(0);
        }
        num = Math.floor(Math.random()*8)+1;
        pos[num] = 1; 
        console.log(pos); 
        flag =false;
    });
    

    const sels = document.querySelectorAll(".row > div");
    sels.forEach((s)=>{
        s.addEventListener('click',(e)=>{
           
            e.preventDefault();
            console.log(cnt);
            if (pos[s.textContent]==1 && !flag){
                if(cnt==8){
                    s.innerHTML = `<img src = './images/hart.png'>`
                }
                else {
                    s.innerHTML = `<img src = './images/boom.png' width='90%'>`
                }

                flag=true;
            }
            else if(pos[s.textContent] ==0 && !flag) {
                cnt+=1;
                s.innerHTML = `<img src = './images/hart.png'>`
            }
            
        })
    })
});

const init=()=>{  
    let i =1; 
    const sels = document.querySelectorAll(".row > div");

    for(s of sels){
        s.innerHTML = i;
        i+=1
    }

}