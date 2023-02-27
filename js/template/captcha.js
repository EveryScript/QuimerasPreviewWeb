$(document).ready(function () {
    const captcha = new Captcha($('#canvas'));
    function verifyCaptcha(value) {
        return ans = captcha.valid(value);
    }
});