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

  // Insert this script right after <title> in "<html><head>...</title>HERE</head>"
  // must use https://htmlcompressor.com/compressor/ to compress this doc to index.html

  (function () {
    var intervalNotifyId = setInterval(notifyParentLoading, 500);
    var isMessageGot = false;

    var doc = document;
    var win = window;
    var loc = location;
    var host = loc.host;

    var clickedLinkText;
    var clickedLinkTextExtra;

    win.addEventListener('message', function (msg) {
      clearInterval(intervalNotifyId);
      if (!isMessageGot) {
        setTimeout(notifyParentLoading, 100)
      }
      isMessageGot = true;

    }, false);


    doc.addEventListener("DOMContentLoaded", function (event) {


      var $ = window.jQuery || window.$;
      

      var parent = win.parent;
      if (!parent || parent === win) return;

      win.addEventListener('message', function (msg) {
        var msgData = msg.data;
        var type = msgData.type;
        if (type === 'wechat_unblocker') {
          delayUpdateParent();
        } else if (type === 'updateIFrameUrlByState') {
          reactToParentUrlPopState(msgData.url);
        }

      }, false);

      delayUpdateParent();

      win.addEventListener("hashchange", function (event) {
        delayUpdateParent();
      });

      $('body').on('click', 'a', function (e) {
        var $a = $(this);
        var href = $a.attr('href');
        if (/\/\//.test(href) && !href.match(host)) {
          updateParent(true, href);
        } else {
          delayUpdateParent();
        }
      }).on('mouseenter', 'a', function (e) {
        var $a = $(this);

        clickedLinkText = $a.text();
        clickedLinkTextExtra = $a.attr('href');
      });

      function delayUpdateParent() {
        setTimeout(function () {
          updateParent();
        }, 1000)
      }

      function updateParent(isReplaceHref, href) {

        var parent = win.parent;
        if (!parent || parent === win) {
          return;
        }

        var $featuredImg = $('.wp-post-image:first');

        if (!$featuredImg.length) {
          $featuredImg = $('.size-large:first')
        }

        if (!$featuredImg.length) {
          $featuredImg = $('.size-full:first')
        }

        if (!$featuredImg.length) {
          var area = 0;
          $('img').each(function () {
            var w = parseInt($(this).attr('width')) || 1;
            var h = parseInt($(this).attr('height')) || 1;
            var _area = w * h;
            if (_area > area) {
              area = _area;
              $featuredImg = $(this)
            }
          });
        }

        parent.postMessage({
                             msgTitle: 'updateParent',
                             title: doc.title,
                             description: $('.entry-content').clone().find('#toc_container').remove().end().find('p').text(),
                             url: href || loc.href,
                             path: loc.path,
                             search: loc.search,
                             hash: loc.hash,
                             isReplaceHref: isReplaceHref,
                             imgSrc: $featuredImg.attr('src'),
                             faviconUrl: getFavicon()
                           }, '*');
      }

    });

    win.addEventListener('beforeunload', function () {
      notifyParentBeforeUnload();
    }, false);

    win.addEventListener('unload', function () {
      notifyParentUnload();
    }, false);


    function reactToParentUrlPopState(url) {
      if (url !== location.href) {
        location.replace(url)
      }
    }

    function notifyParentBeforeUnload() {
      var parent = win.parent;
      if (!parent || parent === win) return;

      parent.postMessage({
                           msgTitle: 'beforeunload',
                           targetTitle: clickedLinkText,
                           targetTitleExtra: clickedLinkTextExtra,
                         }, '*');
    }

    function notifyParentUnload() {
      var parent = win.parent;
      if (!parent || parent === win) return;

      parent.postMessage({
                           msgTitle: 'unload',
                         }, '*');
    }

    function notifyParentLoading() {

      var parent = win.parent;
      if (!parent || parent === win) {
        clearInterval(intervalNotifyId);
        return;
      }

      parent.postMessage({
                           msgTitle: 'connected'
                         }, '*');
    }

    function getFavicon(){
      var favicon = undefined;
      var nodeList = doc.getElementsByTagName("link");
      for (var i = 0; i < nodeList.length; i++)
      {
        if((nodeList[i].getAttribute("rel") == "icon")||(nodeList[i].getAttribute("rel") == "shortcut icon"))
        {
          favicon = nodeList[i].getAttribute("href");
        }
      }
      return favicon;
    }


  })();
