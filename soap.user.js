// ==UserScript==
// @name         Soap2Day Improver
// @version      1.0.0
// @description  Improves Soap2Day sites
// @author       tacohitbox
// @match        *://soap2day.ac/*
// @match        *://soap2day.to/*
// @match        *://soap2day.sh/*
// @match        *://soap2day.cx/*
// @match        *://s2dfree.to/*
// @match        *://s2dfree.cc/*
// @match        *://s2dfree.de/*
// @match        *://s2dfree.is/*
// @match        *://s2dfree.nl/*
// @icon         https://www.google.com/s2/favicons?domain=soap2day.cx
// @source       https://github.com/tacohitbox/soap2day-improver
// @namespace    github.com
// @license      The Unlicense
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if (detectTypePage() == "player") {
        document.querySelector("body").style = "overflow-x:hidden;"
        document.querySelector("#t3").remove();
        if (document.querySelector(".col-lg-12  a:nth-child(2)").innerHTML == "TV Series") {
            document.title = `${document.querySelector("#t1").innerHTML.replace(/\[.+?\]/g, '')} [${document.querySelector(".col-lg-12  a:nth-child(3)").innerHTML}] - SOAP2DAY`;
        } else if (document.querySelector(".col-lg-12  a:nth-child(2)").innerHTML == "Movies") {
            document.title = `${document.querySelector("#t1").innerHTML} - SOAP2DAY`;
            document.querySelector("#t2 div .fa-heart-o").parentElement.remove()
            document.querySelector("#t2 div").style = "margin-right:-88px;";
        }
        if (!document.getElementById("main-page")) {document.querySelector(".col-sm-8").id = "main-page";}
        if (document.querySelector("video")) {
            document.querySelector("video").play();
        } else {
            var i = setInterval(function() {
                document.querySelector("video").play();
                clearInterval(i);
            }, 500);
        }
        window.onkeydown = function(e) {
            switch (e.keyCode) {
                case 82:
                    theatreMode();
                return;
            }
        }
        var btn = document.createElement("SPAN");
        btn.classList.add("status-panel-btn");
        btn.id = "theatre";
        btn.style = "margin-left:9px";
        btn.innerHTML = "Theatre Mode";
        btn.setAttribute("data-on", "0");
        btn.onclick = function () {theatreMode();};
        var btn2 = document.createElement("SPAN");
        btn2.classList.add("status-panel-btn");
        btn2.id = "dl";
        btn2.style = "margin-left:9px";
        btn2.innerHTML = "Download";
        btn2.setAttribute("data-on", "0");
        btn2.onclick = function () {download()};
        document.querySelector("#t2 div").appendChild(btn);
        document.querySelector("#t2 div").appendChild(btn2);
    } else if (detectTypePage() == "captcha") {
        var c = setInterval(function() {
            if (document.querySelector(".btn-success:not([disabled])")) {
                document.querySelector(".btn-success:not([disabled])").click();
                clearInterval(c);
            }
        }, 100)
    }
})();

function detectTypePage() {
    if (document.getElementById("player")) {
        return "player"
    } else if (document.getElementById("form_id")) {
        return "captcha";
    } else {
        return "generic";
    }
}

function theatreMode() {
    if (
        document.getElementById("theatre").getAttribute("data-on") == "0" ||
        !document.getElementById("theatre").getAttribute("data-on")
    ) {
        document.querySelector("#main-page").classList.add("col-sm-12");
        document.querySelector("#main-page").classList.remove("col-sm-8");
        document.querySelector(".col-sm-4").style.display = "none";
        document.getElementById("theatre").setAttribute("data-on", "1");
    } else {
        document.querySelector("#main-page").classList.add("col-sm-8");
        document.querySelector("#main-page").classList.remove("col-sm-12");
        document.querySelector(".col-sm-4").style.display = "block";
        document.getElementById("theatre").setAttribute("data-on", "0");
    }
}

function download() {
    if (document.querySelector("video")) {
        window.open(document.querySelector("video").src);
    } else {
        alert("Unable to get streaming URL.");
    }
}
