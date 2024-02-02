var num1;
var num2;
var num3;
function define_random_number(){
    num1=Math.floor(Math.random() * 10);
    num2=Math.floor(Math.random() * 10);
    num3=Math.floor(Math.random() * 10);
    do{
        if(num1===num2 || num2===num3 || num1===num3){
            num1=Math.floor(Math.random() * 10);
            num2=Math.floor(Math.random() * 10);
            num3=Math.floor(Math.random() * 10);
        }
        if(num1===10){
            //가끔 아아아아아아주 드물게 10이 되는 경우가 있음.
            num1=Math.floor(Math.random() * 10);
        }
        if(num2===10){
            num2=Math.floor(Math.random() * 10);
        }
        if(num3===10){
            num3=Math.floor(Math.random() * 10);
        }
    }while(num1===10 || num2===10 || num3===10 || num1===num2 || num2===num3 || num1===num3);
}
define_random_number();
var chance=8;
var suc=false;
function sbg(m,n,l){
    let strick=0;
    let ball=0;
    let out=0;
    let ans_list=[num1,num2,num3];
    if(m===num1 && n===num2 && l===num3){//3 s
        strick=3;
    }else if(ans_list.includes(m) && ans_list.includes(n) && ans_list.includes(l)){
        if(num1===m || num2===n || num3===l){//1 s 2 b
            strick=1;
            ball=2;
        }else{
            ball=3;//3 b
        }
    }else if(ans_list.includes(m) && ans_list.includes(n) || ans_list.includes(n) && ans_list.includes(l) || ans_list.includes(m) && ans_list.includes(l)){
        out=1;
        if(num1===m && num2===n || num1===m && num3===l || num2==n && num3===l){
            strick=2;
        }else if(num1===m || num2===n || num3===l){
            strick=1;
            ball=1;
        }else{
            ball=2;
        }
    }else if(ans_list.includes(m) || ans_list.includes(n) || ans_list.includes(l)){
        out=2;
        if (num1===m || num2===n || num3===l){
            strick=1;
        }else{
            ball=1;
        }
    }else{
        out=3;
    }
    console.log(m,n,l," => ",`${strick}strick ${ball}ball ${out}out. `);//->주석 풀면 그간의 결과 확인 가능합니다.
    return strick==3 ? false:`${strick}strick ${ball}ball ${out}out. `;
}
function play() {
    let a=null;
    let b=null;
    let c=null;
    let splited_list=[];
    let guess = document.getElementById("guess").value;
    try{
        splited_list=guess.split(" ");
        if(splited_list.length != 3){
            throw new Error('Invalid input');
        }
        a=+splited_list[0];
        b=+splited_list[1];
        c=+splited_list[2];
        if(a===NaN ||b===NaN || c===NaN){
            throw new Error('Invalid input');
        }
        chance -= 1;
        let m=sbg(a,b,c);
        if (!m){
            document.getElementById("message").innerHTML = "정답입니다! 세 숫자를 모두 맞추셨습니다! 이스터에그의 힌트는.. Easter Egg! 이겁니다!";
            define_random_number();
            chance=8;
        }
        else{
            document.getElementById("message").innerHTML = m+`${chance}번 남았습니다.`;
        }
        if(chance <= 0){
            document.getElementById("message").innerHTML = `기회를 모두 소진했습니다. 답은 ${num1} ${num2} ${num3}입니다. 다시 시도하세요!`;
            chance=8;
            define_random_number();
        }
    }
    catch(error){
        document.getElementById("message").innerHTML = "띄어쓰기로 세 숫자를 구분해주시고, 문자를 입력하지 마세요.";
    }
}
