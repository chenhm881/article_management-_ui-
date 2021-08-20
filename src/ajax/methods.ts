
export function getParamByName(name: string, url: string) {
    const match = RegExp('[?#|?&]' + name + '=([^&]*)').exec(url);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' ').replace('#', ''));
}

export function getCookie(name: string) {
    let value = undefined;
    let arr, reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    arr = document.cookie.match(reg);
    if (arr) {
       value = unescape(arr[2]);
    }
    return value;
}

export function getAttributeFromCookie(name: string, attribute: string) {
    let value = undefined;
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    arr = document.cookie.match(reg);
    if (document.cookie.match(reg)) {
        if (arr) {
            value = unescape(arr[2]);
        }
    }

    // eslint-disable-next-line no-constant-condition
    return value ? [function () {
        try {
            JSON.parse(value)[attribute];
            return true;
        } catch (e) {
            return false;
        }
    }()] ? JSON.parse(value)[attribute] : "" : "";
}

