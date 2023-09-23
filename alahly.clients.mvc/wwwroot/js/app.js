/* --------------- Grab elements from DOM --------------- */
//#region
const header = document.querySelector("header");

const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle");

const ml_section = document.querySelector(".milestones");
const ml_counters = document.querySelectorAll(".number span");

const prt_section = document.querySelector(".portfolio");
const zoom_icons = document.querySelectorAll(".zoom-icon");
const modal_overlay = document.querySelector(".modal-overlay")
const images = document.querySelectorAll(".images img");
const prev_btn = document.querySelector(".prev-btn");
const next_btn = document.querySelector(".next-btn");

const links = document.querySelectorAll(".nav-link");

const toggle_btn = document.querySelector(".toggle-btn");

const hamburger = document.querySelector(".hamburger");

const lang_btn = document.querySelector(".lang-btn");
const lang_icons = document.querySelectorAll(".lang-icon");

const vid_frame = document.getElementById('vid_frame');
const vid_items = document.querySelectorAll("#vid-list > li > button, #vid-list > li > a");

window.addEventListener("scroll", () => {
    activeLink();
    if(!skillsPlayed) skillsCounter();
    if(!mlPlayed) mlCounter();
}, { passive: true} );


function updateCount(num, maxNum){
    let currentNum = +num.innerText;
    if(currentNum < maxNum){
        num.innerText = currentNum + 1;
        setTimeout(() => {updateCount(num, maxNum);}, 120);
    }
}
//#endregion
/* --------------- Sticky Navbar --------------- */
//#region
function stickyNavbar(){
    header.classList.toggle("scrolled", window.scrollY > 0)
}

stickyNavbar();

window.addEventListener("scroll", stickyNavbar, { passive: true} );
/* --------------- Reveal Animation --------------- */
let sr = ScrollReveal({
    duration: 2500,
    distance: "60px",
});

sr.reveal(".showcase-info", {delay:600});
sr.reveal(".showcase-image", {origin:"top" ,delay:700});

//#endregion
/* --------------- News Swipe Slider Section --------------- */
//#region
let news_swiper;    
const news_swiper_el = document.querySelector(".swiper.newsSwiper");
const news_swiper_html = news_swiper_el.innerHTML;
const createNewsSwiper = function(){
    if(news_swiper?.initialized)
        news_swiper.destroy(true, true);
    news_swiper_el.innerHTML = news_swiper_html;
    news_swiper = new Swiper(news_swiper_el ,{
        loop: true,
        speed: 500,
        autoplay: true,
        spaceBetween: 30,
        pagination:{
            el: ".news-swiper-pagination",
            clickable: true,
        },
    }); 
}
createNewsSwiper();
//#endregion
/* --------------- Skills Progress Bar Animation --------------- */
//#region
function hasReached(el){
    let topPosition = el.getBoundingClientRect().top;
    if(window.innerHeight >= topPosition + el.offsetHeight) 
        return true;    
    return false;
}


let skillsPlayed=false;
function skillsCounter(){
    if(!hasReached(first_skill)) return
    
    let skillsPlayed=true;

    sk_counters.forEach((counter, i) => {
        let target = +counter.dataset.target;
        let strokeValue=427-427 * (target/100);
        
        progress_bars[i].style.setProperty("--target", strokeValue);

        setTimeout(() => {
            updateCount(counter, target);
        }, 400);
    })

    progress_bars.forEach(
        (p) => (p.style.animation = "progress 2s ease-in-out forwards")
    );
   
}
//#endregion
/* --------------- Services Counter Animation --------------- */
//#region
let mlPlayed = false;

function mlCounter(){
    if(!hasReached(ml_section)) return;
    mlPlayed = true;
    ml_counters.forEach(ctr => {
        let target = +ctr.dataset.target;
        setTimeout(() => {
            updateCount(ctr, target)
        }, 400);
    });
    // console.log("You've reached the milestones section!!!")
}
/* --------------- Portfolio Filter Animation --------------- */

let mixer = mixitup(".portfolio-gallery", {
    selectors:{
        target: ".prt-card",
    },
    animation:{
        duration: 500,
    }
});
//#endregion
/* --------------- Modal Pop Up Animation Animation --------------- */
//#region
    let currentIndex=0;

    zoom_icons.forEach((icn, i) => icn.addEventListener("click", () => {
        prt_section.classList.add("open");
        document.body.classList.add("stopScrolling");
        currentIndex = i;
        changeImage(currentIndex);
    }));    

    modal_overlay.addEventListener("click", () => {
        prt_section.classList.remove("open");
        document.body.classList.remove("stopScrolling");
    });

    prev_btn.addEventListener("click", () => {
        if(currentIndex === 0){
            currentIndex = images.length -1;
        } else {
            currentIndex--;
        }
        changeImage(currentIndex);
    });

    next_btn.addEventListener("click", () => {
        if(currentIndex === images.length -1){
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        changeImage(currentIndex);
    });

    function changeImage(index){
        images.forEach(img => img.classList.remove("showImage"));
        images[index].classList.add("showImage");
    }
//#endregion
/* --------------- Board Members Swiper Animation --------------- */
//#region
    // let player_swiper;    
    // const player_swiper_el = document.querySelector(".swiper.playersSwiper");
    // const player_swiper_html = player_swiper_el.innerHTML;
    // const createPlayerSwiper = function(){
    //     if(player_swiper?.initialized)
    //         player_swiper.destroy(true, true);
    //     player_swiper_el.innerHTML = player_swiper_html;
    //     player_swiper = new Swiper(player_swiper_el ,{
    //         loop: true,
    //         speed: 500,
    //         autoplay: true,
    //         navigation: {
    //             nextEl: ".players-swiper-button-next",
    //             prevEl: ".players-swiper-button-prev",
    //         },
    //         pagination:{
    //             
    //             el: ".players-swiper-pagination",
    //             clickable: true,
    //         },
    //     }); 
    // }
    // createPlayerSwiper();
//#endregion
/* --------------- Change Active Link On Scroll --------------- */
//#region
function activeLink(){
    let sections = document.querySelectorAll("section[id]");
    let passedSections = Array.from(sections).map((sct, i) => {
        return { 
            y: sct.getBoundingClientRect().top - header.offsetHeight,
            id: i,
        }
    }).filter((sct) => sct.y <= 0);

    let currSectionID = passedSections.at(-1).id;
    links.forEach( l => l.classList.remove("active"));
    links[currSectionID].classList.add("active");
}

activeLink();
//#endregion
/* --------------- Change Page Theme --------------- */
//#region

let firstTheme = localStorage.getItem("dark");
changeTheme(+firstTheme);

function changeTheme(isDark){
    if(isDark){
        document.body.classList.add("dark");
        toggle_btn.classList.replace("uil-moon", "uil-sun");
        localStorage.setItem("dark",1);
    }else{
        document.body.classList.remove("dark");
        toggle_btn.classList.replace("uil-sun", "uil-moon");
        localStorage.setItem("dark",0);
    }
}
toggle_btn.addEventListener("click", () => {
    changeTheme(!document.body.classList.contains("dark"));
});
//#endregion
/* --------------- Open & Close Navbar Menu --------------- */
//#region
hamburger.addEventListener("click", () => {
    document.body.classList.toggle("open");
    document.body.classList.toggle("stopScrolling");
});

links.forEach( link => {
    link.addEventListener("click", () => {
        document.body.classList.remove("open");
        document.body.classList.remove("stopScrolling");
    })
});
//#endregion
/* --------------- Change Language and Translate Messages --------------- */
//#region
// import translations from "./translations.js";
document.addEventListener("DOMContentLoaded", () => {
    const language = localStorage.getItem("lang") || "en";
    lang_icons.forEach(l => l.addEventListener("click", (event) => {
        switchLanguage(event.target.innerText)
        event.target.classList.add("active");
    }, { passive:true}));
    switchLanguage(language.toUpperCase());
    lang_icons.forEach( btn => {
        btn.classList.remove("active");
        if( !btn.classList.contains("lang-btn") && btn.innerText.toLowerCase() == language.toLowerCase()) btn.classList.add("active");
    });
});

function switchLanguage(language){
    localStorage.setItem("lang", language.toLowerCase());
    lang_btn.innerText = language.toUpperCase();
    lang_icons.forEach(l => l.classList.remove("active"));
    setLanguage(language);
    createNewsSwiper();
    // createPlayerSwiper();
    createTrophySwiper();
    createTeamPlayersSwiper();
}

const setLanguage = (language) => {
  language = language.toLowerCase();
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((element) => {
    const translationKey = element.getAttribute("data-i18n");
    if(translations[language] && translations[language][translationKey])
        element.textContent = translations[language][translationKey];
  });
  console.log(language);
  document.body.dir = language === "ar" ? "rtl" : "ltr";
};
//#endregion
/* --------------- Video PlayLisy section --------------- */
//#region
    /*JS FOR SCROLLING THE ROW OF THUMBNAILS*/ 
    vid_items.forEach((vid) => {
        vid.addEventListener("click", (event) => {
            event.stopPropagation();
            vid_items.forEach(el => {
                el.classList.remove("active");
                el.querySelector(".vid-thumb").classList.remove("active");
            });
            let vid_src = event.target.getAttribute("data-vid-src");
            if( vid_src && vid_src != null && (vid_src + '').length > 0 ){
                vid_frame.src = vid_src + '?autoplay=1&rel=0&showinfo=0&autohide=1';
                event.target.querySelector(".vid-thumb").classList.add("active");
                event.target.classList.add("active");
            }
        }, { passive: true} );
    });
//#endregion
/* --------------- Trophy Swiper Animation --------------- */
//#region
    let trophy_swiper;    
    const trophy_swiper_el = document.querySelector(".swiper.trophySwiper");
    const trophy_swiper_html = trophy_swiper_el.innerHTML;
    const createTrophySwiper = function(){
        if(trophy_swiper?.initialized)
            trophy_swiper.destroy(true, true);
        trophy_swiper_el.innerHTML = trophy_swiper_html;
        trophy_swiper = new Swiper(trophy_swiper_el ,{
            slidesPerView: 4,
            spaceBetween: 30,
            freeMode: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".trophy-swiper-pagination",
                clickable: true,
            },
        }); 
    };                       

    createTrophySwiper();
//#endregion
/* --------------- Team Players Swiper Animation --------------- */
//#region
let team_players_swiper;    
const team_players_swiper_el = document.querySelector(".swiper.teamPlayersSwiper");
const team_players_swiper_html = team_players_swiper_el.innerHTML;
const createTeamPlayersSwiper = function(){
    if(team_players_swiper?.initialized)
        team_players_swiper.destroy(true, true);
    team_players_swiper_el.innerHTML = team_players_swiper_html;
    team_players_swiper = new Swiper(team_players_swiper_el ,{
        slidesPerView: 4,
        spaceBetween: 30,
        freeMode: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".team-players-swiper-pagination",
            clickable: true,
        },
    }); 
};                       
createTeamPlayersSwiper();
//#endregion



