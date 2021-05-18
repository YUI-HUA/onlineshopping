window.onload = function () {

    var initTab = function (lis, items) {
        for (var i = 0; i < lis.length; i++) {

            lis[i].setAttribute("index", i);

            lis[i].onclick = function () {
                for (var i = 0; i < lis.length; i++) {
                    lis[i].className = "";
                }
                this.className = "current";

                var index = this.getAttribute("index");
                for (var i = 0; i < items.length; i++) {
                    items[i].style.display = "none";
                }
                items[index].style.display = "block";
            };
        }

    };

    var detail_tab_list = document.querySelector(".detail_tab_list");
    initTab(detail_tab_list.querySelectorAll("li"), document.querySelectorAll(".item"))


    var aside = document.querySelector(".aside");
    var tab_list = aside.querySelector(".tab_list");
    initTab(tab_list.querySelectorAll("li"), aside.querySelectorAll(".tab_con"))

    // 放大镜效果
    var preview_img = document.querySelector(".preview_img");
    var mask = document.querySelector(".mask");
    var big = document.querySelector(".big");

    preview_img.onmousemove = function (event) {
        event = event || window.event;

        mask.style.display = "block";
        big.style.display = "block";

        var x = event.clientX - this.offsetLeft;
        var y = event.clientY - this.offsetTop;
        // console.log(x,y);

        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;

        var maskMax = preview_img.offsetWidth - mask.offsetWidth;

        if(maskX <= 0){
            maskX = 0;
        }else if(maskX >= maskMax){
            maskX = maskMax;
        }

        if(maskY <= 0){
            maskY = 0;
        }else if(maskY >= maskMax){
            maskY = maskMax;
        }

        mask.style.left = maskX + "px";
        mask.style.top = maskY + "px";

        var bigImg = document.querySelector(".bigImg");
        var bigMax = bigImg.offsetWidth - big.offsetWidth;

        var bigX = maskX * bigMax / maskMax;
        var bigY = maskY * bigMax / maskMax;

        bigImg.style.left = -bigX + "px";
        bigImg.style.top = -bigY + "px";

    };

    preview_img.onmouseleave = function (event) {
        event = event || window.event;

        mask.style.display = "none";
        big.style.display = "none";

    };

};


