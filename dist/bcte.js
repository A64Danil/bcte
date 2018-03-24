/**
 * Created by Danil on 24.03.2018.
 */

// Restrict globals by IIFE
(function () {

    var d = new Date(); // Get new current date

    //var loc = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds());

    //alert(d.getTime());
    //alert(d.getTimezoneOffset() * 60 * 1000);

    function setCookie(name, value, expires, path, domain, secure)
    {
        document.cookie =    name + "=" + escape(value) +
            ((expires) ? "; expires=" + (new Date(expires)) : "") +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            ((secure) ? "; secure" : "");
    }


    /**
     * Получить значение куки по имени name
     *
     */
    function getcookie(name)
    {
        var cookie = " " + document.cookie;
        var search = " " + name + "=";
        var setStr = null;
        var offset = 0;
        var end = 0;

        if (cookie.length > 0)
        {
            offset = cookie.indexOf(search);

            if (offset != -1)
            {
                offset += search.length;
                end = cookie.indexOf(";", offset)

                if (end == -1)
                {
                    end = cookie.length;
                }

                setStr = unescape(cookie.substring(offset, end));
            }
        }

        return(setStr);
    }

    /**
     * Check existing of the cookie in client PC
     *
     */
    function cookieCheck(cookName = 'yourName') {
        console.log('TIK');
        if (getcookie(cookName) !== null) {
            console.log(getcookie(cookName));
        }
        else {
            alert('Такой куки не существует, или её время жизни истекло)');
            clearInterval(cookTimer);
        }

    }

    /**
     * Check cookie every 2 seconds
     *
     */
    var cookTimer = setInterval(cookieCheck, 2000);



    /**
     * Add listener
     *
     */
    document.body.addEventListener('mouseout', windowPopUp);
    setTimeout(removePopUp, 5000);

    function removePopUp() {
        console.log("Обработчик убран");
        document.body.removeEventListener('mouseout', windowPopUp);
    }


    /**
     * Check our cookie on the match
     *
     */
    function windowPopUp(e) {
        console.log("Обработчик добавлен");
        console.log(document.cookie);
        //alert( document.cookie );
        if (e.relatedTarget === null && e.pageY < 0 && getcookie('yourName') === null) {
            alert("Хочешь закрыть?\r\nТогда посети страницу 'Правильные телефоны' ");
            console.log("ушли");
            console.log("e.pageX " + e.pageX);
            console.log("e.pageY " + e.pageY);
        }

    }

    /**
     * Check url of the current page. You can do something after the check.
     *
     */
    function urlCheker() {
        if ( window.location.pathname == '/blog/osnovyi-modx-revo/pravilnyie-telefonyi') {
            if (getcookie('yourName') !== null) {
                alert('У вас уже установлены куки');
                //setCookie('yourName', 'DanilTest', (new Date).getTime() + (new Date).getTimezoneOffset() * 60 * 1000 + 20 * 1000);
            }
            else {
                alert('Вы пришли на нужную страницу, скоро мы установим вам куки на 15 секунд');
                setCookie('yourName', 'DanilTest', (new Date).getTime() + (new Date).getTimezoneOffset() * 60 * 1000 + 15 * 1000);
            }


        }
    }
    urlCheker();

})();

