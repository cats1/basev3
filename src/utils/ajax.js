import $ from 'jquery'
export function ajaxProcNoToken(sendData, url) {
    var jqXHR = $.ajax({
        url: url,
        contentType: 'application/json',
        data: JSON.stringify(sendData),
        type: 'post',
        timeout: 10000,
        async: false,
        statusCode: { // 如果你想处理各状态的错误的话
            404: function() {
                console.log(404)
            },
            500: function() {
                console.log(500)
            }
        }
    });
    return jqXHR;
}
export function ajaxProc(sendData, url) {
    var xtoken = '';
    if (getCache("token").indexOf("-") > -1) {
        xtoken = getCache("token");
    } else {
        xtoken = getCache("userid") + "-" + getCache("token");
    }
    var jqXHR = $.ajax({
        url: url,
        contentType: 'application/json',
        data: JSON.stringify(sendData),
        type: 'post',
        timeout: 10000,
        headers: {
            'X-COOLVISIT-TOKEN': xtoken
        }
    });
    return jqXHR;
}
export function ajaxProcStage(sendData, url, token) {
    var jqXHR = $.ajax({
        url: url,
        contentType: 'application/json',
        data: JSON.stringify(sendData),
        type: 'post',
        timeout: 10000,
        headers: {
            'X-COOLVISIT-TOKEN': token
        }
    });
    return jqXHR;
}