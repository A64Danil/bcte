/**
 * Created by Danil on 24.03.2018.
 */

// Restrict globals by IIFE
(function () {


    var cookieName = 'QoobeoCook1'; // Set name of your cookie
    var cookieNameValBefore = 'unvisited'; // Set first value of your cookie
    var cookieNameValAfter = 'visited'; //  Set second value of your cookie
    var liveTime = 2; // numeric - days
    var stayInTime = 30; // numeric - seconds
    var targetURL = '/bcte/demo/test2.html'; // url to your targeted page

    // x * 1000 - a second
    // x * 60 * 1000 - a minute
    // x * 60 * 60 * 1000 - an hour
    // x * 24 * 60 * 60 * 1000 - a day
    // x * 7 * 24 * 60 * 60 * 1000 - a week


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
    function cookieCheck(cookName = cookieName) {
        console.log('TIK');
        if (getcookie(cookName) === cookieNameValAfter) {
            console.log('Куки ' + cookName + ' установлены, их статус: '+ getcookie(cookName));
        }
        else if (getcookie(cookName) === cookieNameValBefore) {
            console.log('Куки ' + cookName + ' установлены, их статус: '+ getcookie(cookName));
        }
        else if (getcookie(cookName) === null) {
            console.log('Такой куки не существует, или её время жизни истекло (ну или вы не были на странице акции)');
            clearInterval(cookTimer);
        }
        else {
            throw new Error('Я не знаю что у вас с куки, но вы явно что-то не то мне присылаете')
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
    setTimeout(removePopUp, (stayInTime * 1000));

    function removePopUp() {
        console.log("Обработчик убран");
        document.body.removeEventListener('mouseout', windowPopUp);
    }


    /**
     * Check our cookie on the match
     *
     */
    function windowPopUp(e) {
        //console.log("Обработчик добавлен");
        console.log(document.cookie);
        // //alert( document.cookie );
        // if (e.relatedTarget === null && e.pageY < 0 && getcookie(cookieName) === null) {
        //     alert("Хочешь закрыть?\r\nТогда посети страницу 'Правильные телефоны' ");
        // }

        if (e.relatedTarget === null && e.pageY < 0 && (getcookie(cookieName) === cookieNameValBefore || getcookie(cookieName) === null)) {
            document.body.querySelector('#exampleModalLabel').textContent = 'Внимание!';
            document.body.querySelector('.modal-body').innerHTML = 'Хочешь закрыть?\r\nТогда посети страницу "';



            document.body.querySelector('.modal-body').innerHTML += '<a href="' + targetURL + '">' + targetURL + '</a>';
            document.body.querySelector('.modal-body').innerHTML +=  '" ';
            //console.log($('.modal-body'));
            //$('.modal-body').textContent = ;

            $('#exampleModal').modal('show');
            //alert("Хочешь закрыть?\r\nТогда посети страницу '" + targetURL + "' ");
        }



    }

    /**
     * Check url of the current page. You can do something after the check.
     *
     */
    function urlCheker() {
        if ( window.location.pathname == targetURL) {

            if (getcookie(cookieName) === cookieNameValAfter) {
                alert('У вас уже установлены куки VISITED');
                //setCookie('yourName', 'DanilTest', (new Date).getTime() + (new Date).getTimezoneOffset() * 60 * 1000 + 20 * 1000);
            }
            else {
                alert('Вы пришли на нужную страницу, скоро мы установим вам куки на 15 секунд');
                //setCookie('yourName', 'DanilTest', (new Date).getTime() + (new Date).getTimezoneOffset() * 60 * 1000 + 15 * 1000);
                setCookie(cookieName, cookieNameValAfter, (new Date).getTime() + (new Date).getTimezoneOffset() * 60 * 1000 + (liveTime * 24 * 60 * 60 * 1000) );
            }


        }

        if (getcookie(cookieName) === null) {
            console.log("У вас нет куки, сейчас мы вам пропишем");
            setCookie(cookieName, cookieNameValBefore, (new Date).getTime() + (new Date).getTimezoneOffset() * 60 * 1000 + (liveTime * 24 * 60 * 60 * 1000) );
        }
    }
    urlCheker();

})();

