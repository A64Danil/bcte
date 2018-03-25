/**
 * Created by Danil on 24.03.2018.
 * On Close Tab Event
 * Version 0.9.0
 */


// Restrict globals by IIFE
(function () {

    var cookieName = 'QoobeoLastTest'; // Set name of your cookie
    var cookieNameValBefore = 'unvisited'; // Set first value of your cookie
    var cookieNameValAfter = 'visited'; //  Set second value of your cookie
    var liveTime = 0.1; // numeric - days
    var stayInTime = 10; // numeric - seconds OR boolean - false
    var targetURL = '/bcte/demo/visit_this.html'; // url to your targeted page

    // x * 1000 - a second
    // x * 60 * 1000 - a minute
    // x * 60 * 60 * 1000 - an hour
    // x * 24 * 60 * 60 * 1000 - a day
    // x * 7 * 24 * 60 * 60 * 1000 - a week

    var d = new Date(); // Get new current date


    //var loc = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds());

    //alert(d.getTime());
    //alert(d.getTimezoneOffset() * 60 * 1000);


    /**
     * Main function of the project.
     * Check our cookie on the match and position of mouse.
     */
    document.body.addEventListener('mouseout', windowPopUp);
    function windowPopUp(e) {
        //console.log(document.cookie);
        if (e.relatedTarget === null && e.pageY < 0 && (getcookie(cookieName) === cookieNameValBefore || getcookie(cookieName) === null)) {
            document.body.querySelector('#exampleModalLabel').textContent = 'Внимание!';
            document.body.querySelector('.modal-body').innerHTML = 'Хочешь закрыть?\r\nТогда посети страницу "';
            document.body.querySelector('.modal-body').innerHTML += '<a href="' + targetURL + '">' + targetURL + '</a>';
            document.body.querySelector('.modal-body').innerHTML += '" ';
            $('#exampleModal').modal('show');
        }
    }

    /**
     * Check url of the current page. You can do something after the check.
     */
    (function urlCheker() {
        if (window.location.pathname == targetURL) {
            if (getcookie(cookieName) === cookieNameValAfter) {
                alert('У вас уже установлены куки VISITED');
                return;
            }
            else {
                alert('Вы пришли на нужную страницу, скоро мы установим вам куки на 15 секунд');
                setCookie(cookieName, cookieNameValAfter, (new Date).getTime() + (new Date).getTimezoneOffset() * 60 * 1000 + (liveTime * 24 * 60 * 60 * 1000));
            }
        }

        if (getcookie(cookieName) === null) {
            console.log("У вас нет куки, сейчас мы вам пропишем");
            setCookie(cookieName, cookieNameValBefore, (new Date).getTime() + (new Date).getTimezoneOffset() * 60 * 1000 + (liveTime * 24 * 60 * 60 * 1000));
        }
    })();


    /**
     * StayInTime - function will work next "stayInTime" seconds.
     */
    (function stayInTimeCheker() {
        if (typeof stayInTime == 'number' && stayInTime > 0) {
            setTimeout(function removePopUp() {
                console.log('The BCTE-Listener was removed');
                document.body.removeEventListener('mouseout', windowPopUp);
            }, (stayInTime * 1000));
        }
        else if (typeof stayInTime == 'boolean' && stayInTime == false) {
            console.log('The BCTE-Listener will not be removed ')
            return;
        }
        else {
            throw new Error('Data type of *stayInTime* not correct')
        }
    })();

    /**
     * Check cookie every 5 seconds
     */
    var cookTimer = setInterval(cookieCheck, 5000);

    /**
     * Check existing of the cookie in client PC
     */
    function cookieCheck(cookName = cookieName) {
        console.log('TIK');
        var parsedCookieName = getcookie(cookName);
        switch (parsedCookieName) {
            case null:
                console.log('You cookie is clear. You do not need a timer');
                clearInterval(cookTimer);
                break;
            case cookieNameValAfter:
                console.log('Cookie ' + cookName + ' was set, they have: ' + parsedCookieName);
                break;
            case cookieNameValBefore:
                console.log('Cookie ' + cookName + ' was set, they have: ' + parsedCookieName);
                break;
            default:
                throw new Error('Я не знаю что у вас с куки, но вы явно что-то не то мне присылаете');
                break;
        }
    }


})();


/**
 * Set and Get a Cookie by the name
 *
 */

function setCookie(name, value, expires, path, domain, secure) {
    document.cookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + (new Date(expires)) : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}

function getcookie(name) {
    var cookie = " " + document.cookie;
    var search = " " + name + "=";
    var setStr = null;
    var offset = 0;
    var end = 0;

    if (cookie.length > 0) {
        offset = cookie.indexOf(search);

        if (offset != -1) {
            offset += search.length;
            end = cookie.indexOf(";", offset)

            if (end == -1) {
                end = cookie.length;
            }

            setStr = unescape(cookie.substring(offset, end));
        }
    }

    return (setStr);
}
