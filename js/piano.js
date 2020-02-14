function Piano() {
    this.isMouseDown = !1;
    this.play_cycle = !1;
    this.play_pause = !1;
    this.stp_cycle = !1;
    this.record = !1;
    this.stp = !1;
    this.as = !1;
    this.b = !1;
    this.chord = [""];
    this.time = [0];
    this.indexes = [0];
    this.msx;
    this.t1 = 0;
    this.t2 = 0;
    this.nmb = 1;
    this.col = 0;
    this.play_count = 0;
    this.deff = 0;
    this.defff = 0;

    this.currentAudio = null;

    this.music2 = function (n, _t) {
        const keyMap = [
            'a0', 'b0', 'a1', 'b1', 'a2', 'a3', 'b2', 'a4', 'b3', 'a5', 'b4', 'a6',
            'a7', 'b5', 'a8', 'b6', 'a9', 'a10', 'b7', 'a11', 'b8', 'a12', 'b9', 'a13',
            'a14', 'b10', 'a15', 'b11', 'a16', 'a17', 'b12', 'a18', 'b13', 'a19', 'b14', 'a20',
        ];
        const revMap = {};
        for (const [index, key] of keyMap.entries()) {
            revMap[key] = index;
        }
        if (Math.random() * 100 < $('degree').value) {
            const select = Math.random() * 10;
            if (select < 7) {
                this.modify1(revMap[n], keyMap);
            } else if (select < 9) {
                this.modify2(revMap[n], keyMap);
            } else {
                this.modify3(revMap[n], keyMap);
            }
        } else {
            this.music3(n);
        }
    };

    this.music3 = function (modifiedKey) {
        this.music(modifiedKey, modifiedKey[0] == 'a' ? 1 : 3);
    }

    this.modify1 = function (original, keyMap) {
        let modified;
        do {
            modified = original + Math.floor(Math.random() * 5) - 2;
        } while (!(modified >= 0 && modified < keyMap.length));
        // console.log('modify1: ', modified);
        this.music3(keyMap[modified]);
    };

    this.modify2 = function (original, keyMap) {
        if (original + 12 < keyMap.length) {
            original += 12;
        }
        this.music3(keyMap[original]);
    }

    this.modify3 = function (original, keyMap) {
        const prefix = [];
        for (let i = 0; i < 4; i += 1) {
            do {
                prefix[i] = original + Math.floor(Math.random() * 7) - 3;
            } while (
                !(prefix[i] >= 0 && prefix[i] < keyMap.length) && 
                !(i == 0 || prefix[i] != prefix[i - 1])
            );
        }
        const last = 140;
        setTimeout(() => {
            this.music3(keyMap[prefix[0]]);
            setTimeout(() => {
                this.music3(keyMap[prefix[1]]);
                setTimeout(() => {
                    this.music3(keyMap[prefix[2]]);
                    setTimeout(() => {
                        this.music3(keyMap[prefix[3]]);
                        setTimeout(() => {
                            this.music3(keyMap[original]);
                        }, last);
                    }, last);
                }, last);
            }, last);
        }, last);
    }

    this.default = function () {
        this.play_count = 0;
        this.indexes = [0];
        this.chord = [""];
        this.time = [0];
        this.nmb = 1;
        this.b = !1
    };
    this.chkdsk = function (n, t) {
        this.isMouseDown == !0 ? this.music2(n, t) : this.delayer(n, t + 1)
    };
    this.timer = function () {
        this.t1 = this.t2;
        var n = new Date;
        return this.t2 = n.getMinutes() * 6e4 + n.getSeconds() * 1e3 + n.getMilliseconds(), this.b ? this.t2 - this.t1 : (this.b = !0, 0)
    };
    this.music = function (n, t) {
        if (this.currentAudio) {
            this.currentAudio.pause();
        }
        var i = $(n);
        i.currentTime = 0;
        this.currentAudio = i;
        i.play();
        this.delayer(n, t);
        this.record && (this.chord[this.chord.length] = n, this.time[this.time.length] = this.time[this.time.length - 1] + this.timer())
    };
    this.timereset = function (n, t) {
        for (var i = t + 1; i < n.length; i++) n[i] = n[i] - n[t];
        for (i = 0; i <= t; i++) n[i] = 0;
        return n
    };
    this.recplay = function (n) {
        function r(i, r, u, f) {
            setTimeout(function () {
                if (piano.stp && !n) piano.stp_cycle || (win_fnc.hider(), select("s1", -1), piano.default(), piano.stp_cycle = !0, piano.chord = [""]);
                else if (piano.play_pause && !n) piano.play_cycle || (piano.nmb = piano.play_count + 1, piano.chord = piano.msx[1], piano.indexes = piano.msx[2], piano.time = piano.timereset(piano.msx[0], piano.nmb), piano.play_cycle = !0);
                else if (!piano.play_pause && !piano.record) try {
                    piano.deff == u && (n || select("s1", f - 1, f), r[0] == "a" ? piano.music(r, 1) : piano.music(r, 3), piano.play_count++ , piano.play_count == piano.nmb - 1 && (n ? t.value = "● Record" : (win_fnc.hider(), select("s1", -1)), piano.play_pause = !1, piano.default(), piano.b = !1))
                } catch (i) { }
            }, i)
        }
        var t = $("recplay"),
            i = $("sheet_play");
        if (this.deff++ , n) t.value == "● Record" ? ($("s1").placeholder = "Recording...", t.value = "■ Stop", i.focus(), $("s1").value = "", win_fnc.hider(), this.record = !0) : (t.value = "● Record", $("s1").placeholder = "Sheet", retrans.compile(), this.default(), this.record = !1);
        else if (this.record && (retrans.compile(), this.default(), this.record = !1), $("s1").value != "" && (i.value == "▌▌ Pause" ? (i.value = "► Play", this.play_pause = !0) : (i.value = "▌▌ Pause", t.value == "■ Stop" && (t.value = "● Record"), this.play_pause = !1, this.play_cycle = !1, this.stp_cycle = !1, this.stp = !1), $("sheet_stop").style.visibility = "visible", $("sheet_stop_sep").style.visibility = "visible", this.chord.length <= 1 && (this.msx = trans.compile(), this.time = this.msx[0], this.chord = this.msx[1], this.indexes = this.msx[2])), !this.play_pause)
            while (this.nmb != this.chord.length) r(this.time[this.nmb], this.chord[this.nmb], this.deff, this.indexes[this.nmb]), this.nmb++
    };
    this.assist = function () {
        var n;
        if (this.as) {
            for ($("assistd").innerHTML = "Key assist Off", n = 0; n < notes.w_n.length; n++) $("a" + notes.w_c[n] + "d").innerHTML = "";
            for (n = 0; n < notes.b_n_.length; n++) $("b" + notes.b_c[n] + "d").innerHTML = "";
            this.as = !1;
            loc.set("assist", "")
        } else {
            for ($("assistd").innerHTML = "Key assist On", n = 0; n < notes.w_c.length; n++) $("a" + notes.w_c[n] + "d").innerHTML = "<br/><br/><br/><br/><br/><br/>" + notes.w_n[n];
            for (n = 0; n < notes.b_c.length; n++) $("b" + notes.b_c[n] + "d").innerHTML = "<br/>" + notes.b_n_[n] + "<br/>+<br/>&#8679";
            this.as = !0;
            loc.set("assist", "x")
        }
    };
    this.styler = function () {
        this.col++;
        this.col == 8 && (this.col = 0);
        document.body.style.backgroundImage = "url(style/img/bk/" + this.col + ".jpg)";
        loc.set("bg", String(this.col))
    };
    this.delayer = function (n, t) {
        var i = $(n + "d");
        i.style.backgroundImage = notes.styles[t];
        setTimeout(function () {
            i.style.backgroundImage = t < 3 ? notes.styles[0] : notes.styles[5]
        }, 150)
    }
}
var piano = new Piano;