/* ///////////// 情報モーダル //////////////////*/
//表示
$('.p_content__info').click(()=>{
    $('.p_modal--info').addClass("shown");
});
//消す
$('.p_modal--info').click((e)=>{
    $('.p_modal--info').addClass("close");
    //animationが終了したらdisplay: none;にする
    $('.p_modal--info').one('animationend',()=>{
        $('.p_modal--info').removeClass("shown");
        $('.p_modal--info').removeClass("close");
    })
});
//バブリングの伝播止め
$(".p_modal--info__image").click((e)=>{
    e.stopPropagation();
})


/* /////////////// タイマー/////////////////// */
let timer = 60 * 60;
const interval = setInterval(() => {
    timer --;
    let remain = "";if(timer > 300){
        remain = `<span class="p_header__timernum">${Math.floor(timer / 60)}</span>分`;
    }else if(timer >= 60){ //５分以下になったら秒まで表示
        remain = `<span class="p_header__timernum">${Math.floor(timer / 60)}</span>分<span class="p_header__timernum">${timer % 60}</span>秒`;
    }else if(timer <= 0){ // 終了
        remain = `<span class="p_header__timernum">0</span>秒`;
        clearInterval(interval);
    }else{ //1分以下になったら秒だけ表示
        remain = `<span class="p_header__timernum">${timer % 60}</span>秒`;
    }
    $('.p_header__timer').html(`残り${remain}`)
}, 1000);