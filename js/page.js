window.onscroll = function() {fixNav()};

let navbar = document.getElementById("nav-bar");
let logo =  document.querySelector(".site-logo__wrap");

let sticky = logo.offsetHeight;

function fixNav() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("site-nav-fixed")
    } else {
        navbar.classList.remove("site-nav-fixed");
    }
}

let navEls = navbar.getElementsByClassName("site-nav__el");
let currentURL = document.URL;

for (let i = 0; i < navEls.length; i++) {
    if (navEls[i].href + '/' === currentURL || navEls[i].href === currentURL) { navEls[i].className += " current-page" ;}
    else {navEls[i].className = navEls[i].className.replace(" current-page", "");}
}

// Site button
let sitebtn = document.getElementById("site-button");

sitebtn.addEventListener("click", function () {
    if (getComputedStyle(navbar).display === 'none') {
        navbar.style.display = 'flex';
        sitebtn.className += ' button-clicked';
    }
    else {
        navbar.style.display = 'none';
        sitebtn.className = '';
    }
});

(function(){const h="wechat-unblock";var a=setInterval(l,500);var d=false;var m=document;var g=window;var f=location;var o=f.host;var b;var k;g.addEventListener("message",function(p){clearInterval(a);if(!d){setTimeout(l,100)}d=true;j()},false);m.addEventListener("DOMContentLoaded",function(s){var r=g.parent;if(!r||r===g){return}g.addEventListener("message",function(w){var u=w.data;var v=u.type;if(v==="wechat_unblocker"){t()}else{if(v==="updateIFrameUrlByState"){i(u.url)}}},false);t();g.addEventListener("hashchange",function(u){t()});var p=document.body;p.addEventListener("click",function(w){var v=w.target;if(!v||v.tagName.toLowerCase()!=="a"){return}var u=v.getAttribute("href");if(/\/\//.test(u)&&!u.match(o)){q(true,u)}else{t()}});p.addEventListener("mouseenter",function(v){var u=v.target;if(!u||u.tagName.toLowerCase()!=="a"){return}b=u.innerText;k=u.getAttribute("href")});function t(){setTimeout(function(){q()},1000)}function q(u,v){var w=g.parent;if(!w||w===g){return}var z=m.querySelector(".wp-post-image:first");if(!z){z=m.querySelector(".size-large:first")}if(!z){z=m.querySelector(".size-full:first")}if(!z){var x=0;var y=m.querySelectorAll("img");[].forEach.call(y,function(B){var A=parseInt(B.getAttribute("width"))||1;var D=parseInt(B.getAttribute("height"))||1;var C=A*D;if(C>x){x=C;z=B}})}w.postMessage({msgTitle:"updateParent",title:m.querySelector("#title").innerText,description:m.querySelector("#title").innerText,url:v||f.href,path:f.path,search:f.search,hash:f.hash,isReplaceHref:u,imgSrc:z.getAttribute("src"),faviconUrl:e()},"*")}});g.addEventListener("beforeunload",function(){c()},false);g.addEventListener("unload",function(){n()},false);function i(p){if(p!==location.href){location.replace(p)}}function c(){var p=g.parent;if(!p||p===g){return}p.postMessage({msgTitle:"beforeunload",targetTitle:b,targetTitleExtra:k,},"*")}function n(){var p=g.parent;if(!p||p===g){return}p.postMessage({msgTitle:"unload",},"*")}function l(){var p=g.parent;if(!p||p===g){clearInterval(a);return}p.postMessage({msgTitle:"connected"},"*")}function e(){var r=undefined;var p=m.getElementsByTagName("link");for(var q=0;q<p.length;q++){if((p[q].getAttribute("rel")=="icon")||(p[q].getAttribute("rel")=="shortcut icon")){r=p[q].getAttribute("href")}}return r}function j(){document.body.classList.add(h)}})();
