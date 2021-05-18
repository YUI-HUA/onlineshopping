window.onload = function () {

    var initTab = function (list) {
        var tab_list = list.querySelector(".tab-list");
        var lis = tab_list.querySelectorAll("li");
        var tab_cons = list.querySelectorAll(".tab-con");

        for (var i = 0; i < lis.length; i++) {

            lis[i].setAttribute("index", i);

            lis[i].onclick = function () {

                for (var i = 0; i < lis.length; i++) {
                    lis[i].querySelector("a").className = "";
                }
                this.querySelector("a").className = "style-red current";

                var index = this.getAttribute("index");
                for (i = 0; i < tab_cons.length; i++) {
                    tab_cons[i].style.display = "none";
                }
                tab_cons[index].style.display = "block";
            };
        }
    }

    var a_list = document.getElementById("a");
    initTab(a_list);

    var b_list = document.getElementById("b");
    initTab(b_list);

    // 轮播图

    var arrow_l = document.querySelector(".arrow-l");
    var arrow_r = document.querySelector(".arrow-r");
    var focus = document.querySelector(".focus");
    var focusWidth = focus.offsetWidth;

    focus.onmousemove = function () {
        arrow_l.style.display = "block";
        arrow_r.style.display = "block";
        clearInterval(timer);
        timer = null;
    };
    focus.onmouseleave = function () {
        arrow_l.style.display = "none";
        arrow_r.style.display = "none";
        timer = setInterval(function () {
            arrow_r.click();
        }, 2000);
    };

    var ul = focus.querySelector("ul");
    var ol = focus.querySelector(".circle");

    for (var i = 0; i < ul.children.length; i++) {

        var li = document.createElement("li");

        li.setAttribute("index", i);

        ol.appendChild(li);

        li.onclick = function () {
            for (i = 0; i < ol.children.length; i++) {
                ol.children[i].className = "";
            }
            this.className = "current";

            var index = this.getAttribute("index");
            num = circle = index;

            animate(ul, -index * focusWidth);
        };
    }
    ol.children[0].className = "current";

    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    var num = 0;
    var circle = 0;

    var flag = true;

    arrow_r.onclick = function (event) {
        event = event || window.event;

        if (flag) {
            flag = false;

            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });

            circle++;
            // if (circle == ol.children.length) {
            //     circle = 0;
            // }
            circle %= ol.children.length

            circleChange();
        }

    };

    arrow_l.onclick = function (event) {
        event = event || window.event;

        if (flag) {
            flag = false;

            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + "px";
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });

            circle--;
            // if (circle < 0) {
            //     circle = ol.children.length - 1;
            // }
            circle = circle < 0 ? ol.children.length - 1 : circle;
            circleChange();
        }
    };

    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = "";
        }
        ol.children[circle].className = "current";
    }

    var timer = setInterval(function () {
        arrow_r.click();
    }, 2000);

    // 滚动条

    var slideBar = document.querySelector(".fixedtool");
    var goBack = document.querySelector(".goBack");
    var main = document.querySelector(".main");
    var mainTop = main.offsetTop;
    var slidebarTop = slideBar.offsetTop - mainTop;
    var recommend = document.querySelector(".recommend");
    var recomTop = recommend.offsetTop;

    document.onscroll = function () {

        if (window.pageYOffset >= mainTop) {
            slideBar.style.position = "fixed";
            slideBar.style.top = slidebarTop + "px";
            goBack.style.display = "block";
        } else {
            slideBar.style.position = "absolute";
            slideBar.style.top = "200px";
            goBack.style.display = "none";
        }

        if (window.pageYOffset >= recomTop) {
            goBack.style.display = "block";
        } else {
            goBack.style.display = "none";
        }
    };
    goBack.onclick = function () {
        // window.scroll(0, 0);
        animateTop(window, 0);
    };

    function animateTop(obj, target, callback) {
        // console.log(callback);  callback = function() {}  调用的时候 callback()

        // 先清除以前的定时器，只保留当前的一个定时器执行
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            // 步长值写到定时器的里面
            // 把我们步长值改为整数 不要出现小数的问题
            // var step = Math.ceil((target - obj.offsetLeft) / 10);
            var step = (target - window.pageYOffset) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (window.pageYOffset == target) {
                // 停止动画 本质是停止定时器
                clearInterval(obj.timer);
                // 回调函数写到定时器结束里面
                // if (callback) {
                //     // 调用函数
                //     callback();
                // }
                callback && callback();
            }
            // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
            // obj.style.left = window.pageYOffset + step + 'px';
            window.scroll(0, window.pageYOffset + step);
        }, 15);
    }
};