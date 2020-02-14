document.onkeydown = function (n) {
    var t = n.key;
    if (notes.b_n.indexOf(t) != -1) {
        piano.music2("b" + notes.b_n.indexOf(t), 3);
    }
    if (notes.w_n.indexOf(t) != -1) {
        piano.music2("a" + notes.w_n.indexOf(t), 1);
    }
};
document.onmouseup = function () {
    piano.isMouseDown = !1
};
document.getElementById("piano").onmousedown = function () {
    piano.isMouseDown = !0
};