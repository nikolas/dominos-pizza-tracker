var themeParadise;
var muteButton;
var lastStageInstance;
var animationQueue = [];
var animationPlaying = false;
var serviceMethod;
var preloadPromise = $.Deferred();
var loadPromise = $.Deferred();
var createPromise = $.Deferred();
var playAudio;
var crab;
var crabPaths = {
    0: {
        x: [231, 89, 183, 139],
        y: [136, 193, 227, 260]
    },
    1: {
        x: [689, 641, 840],
        y: [133, 195, 201]
    },
    2: {
        x: [840, 549, 641, 178],
        y: [158, 193, 201, 260]
    }
};
var increment;
var i = 0;
var crabPathIndex = 0;
var crabWalkInterval;
var parrot;
var radio;

window.PhaserGlobal = {
    hideBanner: true
};

function preload() {
    /* Load assets needed to get the theme up and running */
    themeParadise.stage.backgroundColor = "#eee";
    themeParadise.load.image("background", "assets/images/background.jpg");
    themeParadise.load.image("leftPalm", "assets/images/looseLeaf_left.png");
    themeParadise.load.image("rightPalm", "assets/images/looseLeaf_right.png");
    themeParadise.load.spritesheet("sandscript_1", "assets/images/sandscript_1.jpg", 464, 45, 14);
    themeParadise.load.spritesheet("sandscript_2", "assets/images/sandscript_2.jpg", 464, 45, 11);
    themeParadise.load.spritesheet("sandscript_3", "assets/images/sandscript_3.jpg", 464, 45, 14);
    themeParadise.load.spritesheet("sandscript_4", "assets/images/sandscript_4.jpg", 464, 45, 11);
    themeParadise.load.spritesheet("crab", "assets/images/crab.png", 73, 44, 7);
    themeParadise.load.spritesheet("hilites", "assets/images/tree_hilites.png", 55, 73, 21);
    themeParadise.load.spritesheet("mute_button", "../common/images/mute.png", 35, 34, 3);
    themeParadise.load.audio("jungle_audio_background", ["assets/audio/jungle.mp3", "assets/audio/parrot/jungle.ogg"]);
    themeParadise.load.audio("waves_audio_background", ["assets/audio/waves.mp3", "assets/audio/waves.ogg"]);
    themeParadise.load.spritesheet("parrot_fly_in", "assets/images/parrot_fly_in.png", 358, 357, 14);
    themeParadise.load.spritesheet("parrot_fly_in_2", "assets/images/parrot_fly_in_2.png", 358, 357, 14);
    themeParadise.load.image("stage_1_body", "assets/images/stage_1_body.png");
    themeParadise.load.spritesheet("stage_1_head", "assets/images/stage_1_head.png", 61, 57, 24);
    themeParadise.load.audio("parrot_status_1", ["assets/audio/status/parrot_stage_1.mp3", "assets/audio/parrot_stage_1.ogg"]);
    themeParadise.load.audio("rasta_status_1", ["assets/audio/status/rasta_stage_1.mp3", "assets/audio/rasta_stage_1.ogg"]);
    preloadPromise.resolve();
}

function loadRemainingAssets() {
    /* Load everything else */
    themeParadise.load.audio("parrot_status_2", ["assets/audio/status/parrot_stage_2.mp3", "assets/audio/status/parrot_stage_2.ogg"]);
    themeParadise.load.audio("rasta_status_2", ["assets/audio/status/rasta_stage_2.mp3", "assets/audio/status/rasta_stage_2.ogg"]);
    themeParadise.load.audio("parrot_status_3", ["assets/audio/status/parrot_stage_3.mp3", "assets/audio/status/parrot_stage_3.ogg"]);
    themeParadise.load.audio("rasta_status_3", ["assets/audio/status/rasta_stage_3.mp3", "assets/audio/status/rasta_stage_3.ogg"]);
    themeParadise.load.audio("parrot_status_4", ["assets/audio/status/parrot_stage_4.mp3", "assets/audio/status/parrot_stage_4.ogg"]);
    themeParadise.load.audio("rasta_status_4", ["assets/audio/status/rasta_stage_4.mp3", "assets/audio/status/rasta_stage_4.ogg"]);
    themeParadise.load.audio("parrot_status_6", ["assets/audio/status/parrot_stage_6.mp3", "assets/audio/status/parrot_stage_6.ogg"]);
    themeParadise.load.audio("rasta_status_6", ["assets/audio/status/rasta_stage_6.mp3", "assets/audio/status/rasta_stage_6.ogg"]);
    themeParadise.load.audio("parrot_status_5", ["assets/audio/status/parrot_stage_5.mp3", "assets/audio/status/parrot_stage_5.ogg"]);
    themeParadise.load.audio("rasta_status_5", ["assets/audio/status/rasta_stage_5.mp3", "assets/audio/status/rasta_stage_5.ogg"]);
    themeParadise.load.audio("reggae_radio", ["assets/audio/reggae_radio.mp3", "assets/audio/reggae_radio.ogg"]);

    // Stage 2
    themeParadise.load.spritesheet("parrot_walk", "assets/images/parrot_walk.png", 335, 206, 17);
    themeParadise.load.spritesheet("parrot_radio_grab_1", "assets/images/parrot_radio_grab_1.png", 224, 156, 14);
    themeParadise.load.spritesheet("parrot_radio_grab_2", "assets/images/parrot_radio_grab_2.png", 224, 156, 14);
    themeParadise.load.spritesheet("parrot_radio_grab_3", "assets/images/parrot_radio_grab_3.png", 224, 156, 14);
    themeParadise.load.spritesheet("parrot_dance_1", "assets/images/parrot_dance_1.png", 153, 136, 24);
    themeParadise.load.spritesheet("parrot_dance_2", "assets/images/parrot_dance_2.png", 153, 136, 20);
    themeParadise.load.spritesheet("radio", "assets/images/radio.png", 76, 63, 17);
    themeParadise.load.spritesheet("parrot_wing_flap", "assets/images/parrot_wing_flap.png", 276, 269, 22);
    themeParadise.load.spritesheet("beachball_1", "assets/images/beachball_1.png", 442, 218, 5);
    themeParadise.load.spritesheet("beachball_2", "assets/images/beachball_2.png", 458, 218, 18);
    themeParadise.load.audio("parrot_hit", ["assets/audio/parrot_hit.mp3", "assets/audio/parrot_hit.ogg"]);
    themeParadise.load.audio("whoosh", ["assets/audio/whoosh.mp3", "assets/audio/whoosh.ogg"]);

    // Stage 4
    themeParadise.load.spritesheet("parrot_coconut_1", "assets/images/parrot_coconut_1.png", 265, 240, 13);
    themeParadise.load.spritesheet("parrot_coconut_2", "assets/images/parrot_coconut_2.png", 265, 240, 22);
    themeParadise.load.spritesheet("feathers_yellow_1", "assets/images/feathers_yellow_1.png", 389, 240, 6);
    themeParadise.load.spritesheet("feathers_yellow_2", "assets/images/feathers_yellow_2.png", 389, 240, 6);
    themeParadise.load.spritesheet("feathers_yellow_3", "assets/images/feathers_yellow_3.png", 389, 240, 6);
    themeParadise.load.spritesheet("feathers_yellow_4", "assets/images/feathers_yellow_4.png", 389, 240, 6);
    themeParadise.load.spritesheet("feathers_blue_1", "assets/images/feathers_blue_1.png", 230, 240, 10);
    themeParadise.load.spritesheet("feathers_blue_2", "assets/images/feathers_blue_2.png", 230, 240, 10);
    themeParadise.load.audio("wood", ["assets/audio/wood.mp3", "assets/audio/wood.ogg"]);

    // Stage 5
    themeParadise.load.spritesheet("parrot_flip_1", "assets/images/parrot_flip_1.png", 475, 241, 11);
    themeParadise.load.spritesheet("parrot_flip_2", "assets/images/parrot_flip_2.png", 475, 241, 11);
    themeParadise.load.spritesheet("parrot_drink_1", "assets/images/parrot_drink_1.png", 239, 164, 10);
    themeParadise.load.spritesheet("parrot_drink_2", "assets/images/parrot_drink_2.png", 239, 164, 12);
    themeParadise.load.spritesheet("parrot_drink_3", "assets/images/parrot_drink_3.png", 239, 163, 12);
    themeParadise.load.spritesheet("parrot_drink_4", "assets/images/parrot_drink_4.png", 239, 164, 12);
    themeParadise.load.spritesheet("parrot_drink_5", "assets/images/parrot_drink_5.png", 239, 163, 10);
    themeParadise.load.audio("parrot_status_7", ["assets/audio/status/parrot_stage_7.mp3", "assets/audio/status/parrot_stage_7.ogg"]);
    themeParadise.load.audio("rasta_status_7", ["assets/audio/status/rasta_stage_7.mp3", "assets/audio/status/rasta_stage_7.ogg"]);
    themeParadise.load.image("drink", "assets/images/drink.png");
    themeParadise.load.spritesheet("parrot_fly_away_1", "assets/images/parrot_fly_away_1.png", 324, 180, 11);
    themeParadise.load.spritesheet("parrot_fly_away_2", "assets/images/parrot_fly_away_2.png", 324, 180, 11);

    themeParadise.load.start();
    themeParadise.load.onLoadComplete.add(function () {
        loadPromise.resolve();
    });
}

function blowPalms(palm) {
    // the gently blowing palm leaves in the top corners
    var thisPalm = palm;
    var direction;
    setInterval(function () {
        if (thisPalm.angle <= 0) {
            direction = "down";
        } else if (thisPalm.angle >= 2) {
            direction = "up";
        }
        if (direction === "up") {
            thisPalm.angle -= 0.125;
        } else {
            thisPalm.angle += 0.125;
        }
    }, 150);
}

function sandscript() {
    var def = $.Deferred();
    var script = themeParadise.add.sprite(178, 202, "sandscript_1");
    var scriptAnimation = script.animations.add("script");

    script.animations.play("script", 12, false);
    scriptAnimation.onComplete.add(function () {
        script.destroy();
        script = themeParadise.add.sprite(178, 202, "sandscript_2");
        scriptAnimation = script.animations.add("script");
        script.animations.play("script", 12, false);
        scriptAnimation.onComplete.add(function () {
            script.destroy();
            script = themeParadise.add.sprite(178, 202, "sandscript_3");
            scriptAnimation = script.animations.add("script");
            script.animations.play("script", 12, false);
            scriptAnimation.onComplete.add(function () {
                script.destroy();
                script = themeParadise.add.sprite(178, 202, "sandscript_4");
                scriptAnimation = script.animations.add("script");
                script.animations.play("script", 12, false);
                scriptAnimation.onComplete.add(function () {
                    script.frame = 10;
                    def.resolve();
                });
            });
        });
    });
    return def;
}

/*
    The crab is controlled by the following two functions
    crabWalk places an instance of teh crab on the stage and gets the walking leg animation going
    plotCrab then takes the x,y coordinates from the crabPath coordinates and creates a curveed line and then positions the crab instance on it on an interval
*/
function plotCrab(path) {
    var posX = themeParadise.math.catmullRomInterpolation(crabPaths[path].x, i);
    var posY = themeParadise.math.catmullRomInterpolation(crabPaths[path].y, i);
    crab.x = posX;
    crab.y = posY;
    if (crab.y > themeParadise.height + crab.height || crab.x > themeParadise.width + crab.width) {
        clearInterval(crabWalkInterval);
        i = 0;
        crab.destroy();
    } else {
        i += increment;
    }
}

function crabWalk(path) {
    if (crab) {
        crab.destroy();
    }
    crab = themeParadise.add.sprite(crabPaths[path].x[0], crabPaths[path].y[0], "crab");
    crab.animations.add("walk", [1, 2, 3, 4, 5, 6], 20, true);
    crab.anchor.setTo(0.5, 0.5);
    crab.animations.play("walk");
    crabWalkInterval = setInterval(function () {
        plotCrab(path);
    }, 20);
}

function parrotWalkAnimation(options) {
    var def = $.Deferred();
    var thisX = options && options.x ? options.x : parrot.x;
    var thisY = options && options.y ? options.y : parrot.y;
    var thisDelay = options && options.delay ? options.delay : 0;
    var direction = options && options.direction ? options.direction : "right";
    var distance = options && options.distance ? options.distance : 0;
    var parrotWalk = themeParadise.add.sprite(thisX, thisY, "parrot_walk");
    var parrotTurnAnimation = parrotWalk.animations.add("turn", [0, 1, 2, 3, 4], 12, false);
    var parrotTurnBackAnimation = parrotWalk.animations.add("turnBack", [11, 12, 13, 14, 15, 16], 12, false);
    var toX = 0;

    if (options && options.destroy) {
        options.destroy.destroy();
    }
    if (direction === "left") {
        parrotWalk.scale.x *= -1;
        toX = thisX - distance;
    } else {
        toX = thisX + distance;
    }
    setTimeout(function () {
        parrotWalk.animations.play("turn");
        parrotTurnAnimation.onComplete.add(function () {
            var walkTween = themeParadise.add.tween(parrotWalk).to({ x: toX }, distance * 10, Phaser.Easing.Linear.In, true);
            parrotWalk.animations.add("walkSequence", [5, 6, 7, 8, 9, 10], 12, true);
            parrotWalk.animations.play("walkSequence");
            walkTween.onComplete.add(function () {
                if (options && options.turnBack) {
                    parrotWalk.animations.play("turnBack");
                    parrotTurnBackAnimation.onComplete.add(function () {
                        lastStageInstance = parrotWalk;
                        def.resolve(parrotWalk);
                    }, this);
                } else {
                    parrotWalk.animations.stop();
                    lastStageInstance = parrotWalk;
                    def.resolve(parrotWalk);
                }
            });
        }, this);
    }, thisDelay);
    return def.promise();
}

function parrotGrabRadio(options) {
    var def = $.Deferred();
    var thisX = options && options.x ? options.x : parrot.x;
    var thisY = options && options.y ? options.y : parrot.y;
    var parrotRadio = themeParadise.add.sprite(thisX, thisY, "parrot_radio_grab_1");
    var parrotRadioGrabAnimation = parrotRadio.animations.add("grab", [6, 7, 8, 9, 10, 11, 12, 13, 14], 12, false);

    if (options && options.destroy) {
        options.destroy.destroy();
    }

    parrotRadio.animations.play("grab", 12, false);
    parrotRadioGrabAnimation.onComplete.add(function () {
        parrotRadio.destroy();
        parrotRadio = themeParadise.add.sprite(thisX, thisY, "parrot_radio_grab_2");
        parrotRadioGrabAnimation = parrotRadio.animations.add("grab");
        parrotRadio.animations.play("grab", 12, false);
        parrotRadioGrabAnimation.onComplete.add(function () {
            parrotRadio.destroy();
            parrotRadio = themeParadise.add.sprite(thisX, thisY, "parrot_radio_grab_3");
            parrotRadioGrabAnimation = parrotRadio.animations.add("grab");
            parrotRadio.animations.play("grab", 12, false);
            parrotRadioGrabAnimation.onComplete.add(function () {
                def.resolve(parrotRadio);
            });
        }, this);
    }, this);

    return def.promise();
}

function parrotTalk(options) {
    var def = $.Deferred();
    var thisX = options && options.x ? options.x : parrot.x;
    var thisY = options && options.y ? options.y : parrot.y;
    var thisStage = options && options.stage;
    var parrotSprite = themeParadise.add.sprite(thisX, thisY, "stage_1_body");
    var parrotHead = parrotSprite.addChild(themeParadise.make.sprite(99, -34, "stage_1_head"));
    var parrotHeadAnimation = parrotHead.animations.add("sqwak", [0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 24, false);
    var parrotAudioCache = "parrot_status_" + thisStage;
    var parrotAudio = themeParadise.add.audio(parrotAudioCache);

    if (options && options.destroy) {
        options.destroy.destroy();
    }

    if (options && options.flip) {
        parrotSprite.scale.x *= -1;
        parrotSprite.x += 333;
    }

    if (playAudio) {
        parrotAudio.play();

        parrotHead.animations.play("sqwak");
        parrotHeadAnimation.onComplete.add(function () {
            parrotHeadAnimation = parrotHead.animations.add("talk", [16, 17, 18, 19, 20, 21, 22, 23], 12, true);
            parrotHead.play("talk");
        }, this);
        parrotAudio.onStop.add(function () {
            parrotHead.animations.stop();
            lastStageInstance = parrotSprite;
            def.resolve(parrotSprite);
        }, this);
    } else {
        lastStageInstance = parrotSprite;
        def.resolve(parrotSprite);
    }
    return def.promise();
}

function rastaMan(stage, instance) {
    var def = $.Deferred();
    var rastaAudioCache = "rasta_status_" + stage;
    var rastaManAudio = themeParadise.add.audio(rastaAudioCache);

    if (playAudio) {
        rastaManAudio.play();
        rastaManAudio.onStop.add(function () {
            def.resolve(instance);
        });
    } else {
        def.resolve(instance);
    }

    return def.promise();
}

function parrotListen(options) {
    var def = $.Deferred();
    var thisX = options && options.x ? options.x : parrot.x;
    var thisY = options && options.y ? options.y : parrot.y;
    var parrotListening = themeParadise.add.sprite(thisX, thisY, "parrot_radio_grab_1");

    parrotListening.animations.add("lookBack", [0, 1, 2], 12, false);
    parrotListening.animations.add("lookForward", [3, 4, 5], 12, false);

    if (options && options.destroy) {
        options.destroy.destroy();
    }

    if (options && options.flip) {
        parrotListening.scale.x *= -1;
        parrotListening.x += 333;
    }
    if (options && options.stage) {
        rastaMan(options.stage, options.destroy).then(function () {
            def.resolve(parrotListening);
        });
        parrotListening.animations.play("lookBack");
        setTimeout(function () {
            parrotListening.animations.play("lookForward");
        }, 4000);
    } else {
        def.resolve(parrotListening);
    }
    return def.promise();
}

function parrotDance(options) {
    var def = $.Deferred();
    var thisX = options && options.x ? options.x : parrot.x;
    var thisY = options && options.y ? options.y : parrot.y;
    var dancingParrot = themeParadise.add.sprite(thisX, thisY, "parrot_dance_1");
    var parrotDanceTurn = dancingParrot.animations.add("turn", [0, 1, 2], 12, false);
    var parrotChangeMove = dancingParrot.animations.add("change", [20, 21, 22, 23], 12, false);
    var parrotDanceLoop = dancingParrot.animations.add("dance", [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 12, true);

    function parrotDance2() {
        dancingParrot.destroy();
        dancingParrot = themeParadise.add.sprite(thisX, thisY, "parrot_dance_2");
        parrotDanceTurn = dancingParrot.animations.add("turn", [0, 1], 12, false);
        parrotChangeMove = dancingParrot.animations.add("change", [19], 12, false);
        parrotDanceLoop = dancingParrot.animations.add("dance", [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], 12, true);

        lastStageInstance = dancingParrot;

        if (options && options.destroy) {
            options.destroy.destroy();
        }
        if (options && options.flip) {
            dancingParrot.scale.x *= -1;
            dancingParrot.x += 333;
        }

        dancingParrot.animations.play("turn");
        parrotDanceTurn.onComplete.add(function () {
            dancingParrot.animations.play("dance");
            parrotDanceLoop.onLoop.add(function () {
                if (parrotDanceLoop.loopCount >= 3) {
                    dancingParrot.animations.stop();
                    dancingParrot.animations.play("change");
                    parrotChangeMove.onComplete.add(function () {
                        dancingParrot.destroy();
                        parrotDance({ x: thisX, y: thisY, destroy: dancingParrot, flip: options.flip });
                    });
                }
            });
        }, this);
    }

    lastStageInstance = dancingParrot;

    if (options && options.destroy) {
        options.destroy.destroy();
    }
    if (options && options.flip) {
        dancingParrot.scale.x *= -1;
        dancingParrot.x += 333;
    }

    dancingParrot.animations.play("turn");
    parrotDanceTurn.onComplete.add(function () {
        dancingParrot.animations.play("dance");
        parrotDanceLoop.onLoop.add(function () {
            if (parrotDanceLoop.loopCount >= 3) {
                dancingParrot.animations.stop();
                dancingParrot.animations.play("change");
                parrotChangeMove.onComplete.add(function () {
                    parrotDance2({ x: thisX, y: thisY, destroy: dancingParrot, flip: options.flip });
                });
            }
        });
        def.resolve(dancingParrot);
    }, this);

    return def.promise();
}

function setRadio(playOnly, music) {
    var def = $.Deferred();
    var reggae = themeParadise.add.audio("reggae_radio");

    if (!playOnly) {
        radio = themeParadise.add.sprite(261, 43, "radio");
        radio.animations.add("eq", [2, 5, 1, 1, 2, 5, 1, 1, 2, 2, 2], 24, true);
    }

    if (music) {
        radio.play("eq");
        reggae.play();
        reggae.onStop.add(function () {
            radio.animations.stop();
            radio.frame = 1;
            def.resolve();
        });
    }

    return def.promise();
}

function beachball(options) {
    var def = $.Deferred();
    var thisX = options && options.x ? options.x : parrot.x;
    var thisY = options && options.y ? options.y : parrot.y;
    var beachball1 = themeParadise.add.sprite(-120, -80, "beachball_1");
    var beachballAnimation = beachball1.animations.add("hit");
    var beachball2 = themeParadise.add.sprite(220, -80, "beachball_2");
    var whoosh = themeParadise.add.audio("whoosh");
    var parrotHit = themeParadise.add.audio("parrot_hit");
    var parrotWingFlap = themeParadise.add.sprite(thisX, thisY, "parrot_wing_flap");
    var parrotFlapAnimation = parrotWingFlap.animations.add("flap", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 12, false);

    if (options && options.flip) {
        beachball1.x += 140;
        beachball2.x += 140;
        beachball1.scale.x *= -1;
        beachball2.scale.x *= -1;
    }

    if (options && options.destroy) {
        options.destroy.destroy();
    }

    beachball1.animations.play("hit", 12, false);
    whoosh.play();

    beachballAnimation.onComplete.add(function () {
        lastStageInstance.destroy();
        parrotWingFlap.animations.play("flap");
        beachball2.animations.add("bounceAway", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], 12, false);
        beachball2.play("bounceAway");
        parrotHit.play();
        parrotFlapAnimation.onComplete.add(function () {
            parrotWingFlap.destroy();
            beachball1.destroy();
            beachball2.destroy();
            def.resolve(parrotHit);
        }, this);
    }, this);
    return def.promise();
}

function parrotLandSequence() {
    var def = $.Deferred();
    var parrotLand = themeParadise.add.sprite(-160, -190, "parrot_fly_in");
    var parrotAnimation = parrotLand.animations.add("land");

    parrotLand.animations.play("land", 12, false);
    parrotAnimation.onComplete.add(function () {
        parrotLand.destroy();
        parrotLand = themeParadise.add.sprite(-170, -190, "parrot_fly_in_2");
        parrotAnimation = parrotLand.animations.add("land");
        parrotLand.animations.play("land", 12, false);
        parrotAnimation.onComplete.add(function () {
            lastStageInstance = parrotLand;
            def.resolve(parrotLand);
        }, this);
    });
    return def.promise();
}

function featherBlowout(x, y) {
    var yellow = themeParadise.add.sprite(x - 20, y, "feathers_yellow_1");
    var yellowAnimation = yellow.animations.add("yellowBlowout");
    var blue = themeParadise.add.sprite(x - 20, y, "feathers_blue_1");
    var blueAnimation = blue.animations.add("blueBlowout");

    yellow.animations.play("yellowBlowout", 8, false);
    yellowAnimation.onComplete.add(function () {
        yellow.destroy();
        yellow = themeParadise.add.sprite(x - 20, y, "feathers_yellow_2");
        yellowAnimation = yellow.animations.add("yellowBlowout");
        yellow.animations.play("yellowBlowout", 8, false);
        yellowAnimation.onComplete.add(function () {
            yellow.destroy();
            yellow = themeParadise.add.sprite(x - 20, y, "feathers_yellow_3");
            yellowAnimation = yellow.animations.add("yellowBlowout");
            yellow.animations.play("yellowBlowout", 8, false);
            yellowAnimation.onComplete.add(function () {
                yellow.destroy();
                yellow = themeParadise.add.sprite(x - 20, y, "feathers_yellow_4");
                yellowAnimation = yellow.animations.add("yellowBlowout");
                yellow.animations.play("yellowBlowout", 8, false);
                yellowAnimation.onComplete.add(function () {
                    yellow.destroy();
                }, this);
            }, this);
        }, this);
    }, this);

    blue.animations.play("blueBlowout", 8, false);
    blueAnimation.onComplete.add(function () {
        blue.destroy();
        blue = themeParadise.add.sprite(x + 20, y, "feathers_blue_2");
        blueAnimation = blue.animations.add("blueBlowout");
        blue.animations.play("blueBlowout", 8, false);
        blueAnimation.onComplete.add(function () {
            blue.destroy();
        }, this);
    }, this);
}

function coconutFall(options) {
    var def = $.Deferred();
    var thisX = options && options.x ? options.x : parrot.x;
    var thisY = options && options.y ? options.y : parrot.y;
    var thisCoconut = themeParadise.add.sprite(thisX, thisY, "parrot_coconut_1");
    var coconutAnimation = thisCoconut.animations.add("coconut");
    var parrotHit = themeParadise.add.audio("parrot_hit");
    var parrotHit2 = themeParadise.add.audio("parrot_hit");
    var wood = themeParadise.add.audio("wood");

    if (options && options.destroy) {
        options.destroy.destroy();
    }

    thisCoconut.play("coconut", 12, false);
    wood.play();
    parrotHit.play();
    featherBlowout(thisX, thisY);
    coconutAnimation.onComplete.add(function () {
        setTimeout(function () {
            thisCoconut.destroy();
            thisCoconut = themeParadise.add.sprite(thisX, thisY, "parrot_coconut_2");
            coconutAnimation = thisCoconut.animations.add("coconut");
            thisCoconut.play("coconut", 12, false);
            parrotHit2.play();
            coconutAnimation.onComplete.add(function () {
                def.resolve(thisCoconut);
            }, this);
        }, 1000);
    }, this);

    return def.promise();
}

function parrotFlipAnimation(options) {
    var def = $.Deferred();
    var thisX = options && options.x ? options.x : parrot.x;
    var thisY = options && options.y ? options.y : parrot.y;
    var parrotFlip = themeParadise.add.sprite(thisX, thisY, "parrot_flip_1");
    var parrotFlipAnim = parrotFlip.animations.add("flip");

    if (options && options.destroy) {
        options.destroy.destroy();
    }

    parrotFlip.animations.play("flip", 12, false);
    parrotFlipAnim.onComplete.add(function () {
        parrotFlip.destroy();
        parrotFlip = themeParadise.add.sprite(thisX, thisY, "parrot_flip_2");
        parrotFlipAnim = parrotFlip.animations.add("flip2");
        parrotFlip.animations.play("flip2", 12, false);
        parrotFlipAnim.onComplete.add(function () {
            def.resolve(parrotFlip);
        }, this);
    }, this);
    return def.promise();
}

function parrotDrinking(options) {
    var def = $.Deferred();
    var thisX = options && options.x ? options.x : parrot.x;
    var thisY = options && options.y ? options.y : parrot.y;
    var parrotDrink = themeParadise.add.sprite(thisX, thisY, "parrot_drink_1");
    var parrotDrinkAnimation = parrotDrink.animations.add("drink");

    if (options && options.destroy) {
        options.destroy.destroy();
    }

    parrotDrink.animations.play("drink", 12, false);
    parrotDrinkAnimation.onComplete.add(function () {
        parrotDrink.destroy();
        parrotDrink = themeParadise.add.sprite(thisX, thisY, "parrot_drink_2");
        parrotDrinkAnimation = parrotDrink.animations.add("drink");
        parrotDrink.animations.play("drink", 12, false);
        parrotDrinkAnimation.onComplete.add(function () {
            parrotDrink.destroy();
            parrotDrink = themeParadise.add.sprite(thisX, thisY, "parrot_drink_3");
            parrotDrinkAnimation = parrotDrink.animations.add("drink");
            parrotDrink.animations.play("drink", 12, false);
            parrotDrinkAnimation.onComplete.add(function () {
                parrotDrink.destroy();
                parrotDrink = themeParadise.add.sprite(thisX, thisY, "parrot_drink_4");
                parrotDrinkAnimation = parrotDrink.animations.add("drink");
                parrotDrink.animations.play("drink", 12, false);
                parrotDrinkAnimation.onComplete.add(function () {
                    parrotDrink.destroy();
                    parrotDrink = themeParadise.add.sprite(thisX, thisY, "parrot_drink_5");
                    parrotDrinkAnimation = parrotDrink.animations.add("drink");
                    parrotDrink.animations.play("drink", 12, false);
                    parrotDrinkAnimation.onComplete.add(function () {
                        def.resolve(parrotDrink);
                    }, this);
                }, this);
            }, this);
        }, this);
    }, this);

    return def.promise();
}

function setDrink() {
    themeParadise.add.sprite(463, 20, "drink");
}

function parrotFlyAway(options) {
    var def = $.Deferred();
    var thisX = options && options.x ? options.x : parrot.x;
    var thisY = options && options.y ? options.y : parrot.y;
    var parrotFly = themeParadise.add.sprite(thisX, thisY, "parrot_fly_away_1");
    var parrotFlyAwayAnimation = parrotFly.animations.add("fly");

    if (options && options.destroy) {
        options.destroy.destroy();
    }

    parrotFly.animations.play("fly", 12, false);
    parrotFlyAwayAnimation.onComplete.add(function () {
        parrotFly.destroy();
        parrotFly = themeParadise.add.sprite(thisX, thisY, "parrot_fly_away_2");
        parrotFlyAwayAnimation = parrotFly.animations.add("fly");
        parrotFly.animations.play("fly", 12, false);
        parrotFlyAwayAnimation.onComplete.add(function () {
            def.resolve(parrotFly);
        }, this);
    }, this);
    return def.promise();
}

function catchUp() {
    var def = $.Deferred();
    animationPlaying = true;
    parrotWalkAnimation({ x: -52, y: 10, distance: 80, direction: "right", turnBack: true, destroy: lastStageInstance }).then(function (instance) {
        return parrotGrabRadio({ x: 120, y: 10, destroy: instance });
    }).then(function (instance) {
        setRadio(false, false);
        def.resolve(instance);
    });
    return def.promise();
}

function checkQueue() {
    function stage2() {
        animationPlaying = true;
        parrotWalkAnimation({ x: -52, y: 10, distance: 50, direction: "right", turnBack: true, destroy: lastStageInstance }).then(function (instance) {
            return parrotTalk({ x: 130, y: 41, destroy: instance, stage: "2" });
        }).then(function (instance) {
            return parrotListen({ x: 130, y: 10, destroy: instance, stage: "2" });
        }).then(function (instance) {
            return parrotGrabRadio({ x: 120, y: 10, destroy: instance });
        }).then(function (instance) {
            parrotDance({ x: 120, y: 10, destroy: instance });
            return setRadio(false, true);
        }).then(function () {
            return beachball({ x: 65, y: -88 });
        }).then(function (instance) {
            animationPlaying = false;
            animationQueue.shift();
            if (animationQueue.length) {
                checkQueue();
            } else {
                parrotDance({ x: 120, y: 10, destroy: instance });
            }
        });
    }

    function stage3(stageInstance) {
        var toDestroy = stageInstance || lastStageInstance;

        animationPlaying = true;

        parrotWalkAnimation({ x: 28, y: 10, distance: 100, direction: "right", turnBack: true, destroy: toDestroy }).then(function (instance) {
            return parrotTalk({ x: 240, y: 41, destroy: instance, stage: "3" });
        }).then(function (instance) {
            return parrotListen({ x: 240, y: 10, destroy: instance, stage: "3" });
        }).then(function (instance) {
            return beachball({ x: 185, y: -88, flip: true, destroy: instance });
        }).then(function (instance) {
            parrotDance({ x: 240, y: 10, destroy: instance });
            return setRadio(true, true);
        }).then(function () {
            animationPlaying = false;
            animationQueue.shift();
            if (animationQueue.length) {
                checkQueue();
            } else {
                parrotDance({ x: 240, y: 10, destroy: lastStageInstance });
            }
        });
    }

    function stage4(stageInstance) {
        var toDestroy = stageInstance || lastStageInstance;
        var parrotX = stageInstance ? 28 : 128;
        var parrotDistance = stageInstance ? 200 : 100;

        animationPlaying = true;

        parrotWalkAnimation({ x: parrotX, y: 10, distance: parrotDistance, direction: "right", turnBack: true, destroy: toDestroy }).then(function (instance) {
            return parrotTalk({ x: 340, y: 41, destroy: instance, stage: "4" });
        }).then(function (instance) {
            return parrotListen({ x: 340, y: 10, destroy: instance, stage: "4" });
        }).then(function (instance) {
            parrotDance({ x: 340, y: 10, destroy: instance });
            return setRadio(true, true);
        }).then(function () {
            return coconutFall({ x: 275, y: -6, destroy: lastStageInstance });
        }).then(function (instance) {
            lastStageInstance = instance;
            animationPlaying = false;
            animationQueue.shift();
            if (animationQueue.length) {
                checkQueue();
            } else {
                parrotDance({ x: 340, y: 10, destroy: instance });
            }
        });
    }

    function stage5(stageInstance) {
        var toDestroy = stageInstance || lastStageInstance;
        var parrotX = stageInstance ? 28 : 128;
        var parrotDistance = stageInstance ? 200 : 100;

        animationPlaying = true;
        $.when(stageInstance && parrotWalkAnimation({ x: parrotX, y: 10, distance: parrotDistance, direction: "right", turnBack: true, destroy: toDestroy })).then(function (instance) {
            return parrotFlipAnimation({ x: 270, y: -6, destroy: instance || toDestroy });
        }).then(function (instance) {
            return parrotTalk({ x: 340, y: 41, stage: "5", destroy: instance, flip: true });
        }).then(function (instance) {
            return parrotListen({ x: 340, y: 10, destroy: instance, stage: "5", flip: true });
        }).then(function (instance) {
            setRadio(true, true);
            return parrotDance({ x: 340, y: 10, flip: true, destroy: instance });
        }).then(function (instance) {
            return parrotDrinking({ x: 440, y: 10, destroy: instance });
        }).then(function (instance) {
            setDrink();
            return parrotTalk({ x: 340, y: 41, stage: "7", destroy: instance, flip: true });
        }).then(function (instance) {
            return parrotFlyAway({ x: 440, y: -10, destroy: instance });
        }).then(function (instance) {
            instance.destroy();
            rastaMan("7", null);
            animationPlaying = false;
            animationQueue.shift();
        });
    }

    function stage6(stageInstance) {
        var toDestroy = stageInstance || lastStageInstance;
        var parrotX = stageInstance ? 28 : 128;
        var parrotDistance = stageInstance ? 200 : 100;
        animationPlaying = true;
        $.when(stageInstance && parrotWalkAnimation({ x: parrotX, y: 10, distance: parrotDistance, direction: "right", turnBack: true, destroy: toDestroy })).then(function (instance) {
            return parrotFlipAnimation({ x: 270, y: -6, destroy: instance || toDestroy });
        }).then(function (instance) {
            return parrotTalk({ x: 340, y: 41, stage: "6", destroy: instance, flip: true });
        }).then(function (instance) {
            return parrotListen({ x: 340, y: 10, destroy: instance, stage: "6", flip: true });
        }).then(function (instance) {
            parrotDance({ x: 340, y: 10, flip: true, destroy: instance });
            return setRadio(true, true);
        }).then(function (instance) {
            return parrotDrinking({ x: 440, y: 10, destroy: instance });
        }).then(function (instance) {
            setDrink();
            return parrotTalk({ x: 340, y: 41, stage: "7", destroy: instance, flip: true });
        }).then(function (instance) {
            return parrotFlyAway({ x: 440, y: -10, destroy: instance });
        }).then(function (instance) {
            instance.destroy();
            rastaMan("7", null);
            animationPlaying = false;
            animationQueue.shift();
        });
    }

    $.when(preloadPromise, createPromise, loadPromise).then(function () {
        if (animationQueue.length >= 1 && !animationPlaying) {
            switch (animationQueue[0]) {
                case "2_pending":
                    stage2();
                    break;
                case "3_pending":
                    if (radio) {
                        stage3();
                    } else {
                        catchUp().then(function (instance) {
                            stage3(instance);
                        });
                    }
                    break;
                case "4_pending":
                    if (radio) {
                        stage4();
                    } else {
                        catchUp().then(function (instance) {
                            stage4(instance);
                        });
                    }
                    break;
                case "5_pending":
                case "5_complete":
                    if (serviceMethod === "DELIVERY") {
                        if (radio) {
                            stage6();
                        } else {
                            catchUp().then(function (instance) {
                                stage6(instance);
                            });
                        }
                    } else if (radio) {
                        stage5();
                    } else {
                        catchUp().then(function (instance) {
                            stage5(instance);
                        });
                    }
                    break;
                default:
                    animationQueue.shift();
                    checkQueue();
            }
        }
    });
}

function addMuteButtonEvents() {
    muteButton.input.useHandCursor = true;

    muteButton.events.onInputUp.add(function () {
        if (themeParadise.sound.mute) {
            muteButton.frame = 0;
            themeParadise.sound.mute = false;
        } else {
            muteButton.frame = 2;
            themeParadise.sound.mute = true;
        }
    }, this);
}

function stage1() {
    animationPlaying = true;
    parrotLandSequence().then(function (instance) {
        return parrotTalk({ x: -1, y: 41, destroy: instance, stage: "1" });
    }).then(function (instance) {
        return rastaMan("1", instance);
    }).then(function () {
        animationPlaying = false;
        checkQueue();
    });
}

function create() {
    var jungleBackgroundAudio = themeParadise.add.audio("jungle_audio_background");
    var waveBackgroundAudio = themeParadise.add.audio("waves_audio_background");
    var leftPalm;
    var rightPalm;
    var hilitesRight;
    var hilitesLeft;
    $.when(preloadPromise).then(function () {
        themeParadise.stage.disableVisibilityChange = true;
        themeParadise.add.sprite(0, 0, "background");

        leftPalm = themeParadise.add.sprite(-20, -30, "leftPalm");
        rightPalm = themeParadise.add.sprite(820, 60, "rightPalm");
        rightPalm.anchor.setTo(1, 1);
        blowPalms(leftPalm);
        blowPalms(rightPalm);

        hilitesRight = themeParadise.add.sprite(765, 45, "hilites");
        hilitesRight.animations.add("wind");
        hilitesLeft = themeParadise.add.sprite(35, 60, "hilites");
        hilitesLeft.animations.add("wind");
        hilitesLeft.scale.x *= -1;
        hilitesLeft.angle += 10;
        hilitesRight.animations.play("wind", 8, true);
        hilitesLeft.animations.play("wind", 8, true);

        muteButton = themeParadise.add.sprite(750, 80, "mute_button");
        muteButton.inputEnabled = true;
        addMuteButtonEvents();

        jungleBackgroundAudio.play("", 0.2, 0.5, true, false);
        waveBackgroundAudio.play("", 0.2, 0.05, true, false);

        loadRemainingAssets();
        sandscript().then(function () {
            crabWalk(0);
            setInterval(function () {
                clearInterval(crabWalkInterval);
                crab.destroy();
                if (crabPathIndex >= 2) {
                    crabPathIndex = 0;
                } else {
                    crabPathIndex++;
                }
                crabWalk(crabPathIndex);
            }, 40000);
        });
        stage1();
        createPromise.resolve();
    });
}

function enableAudioUpdates(enableSpeech) {
    playAudio = enableSpeech;
}

function setServiceMethod(method) {
    serviceMethod = method;
}

function getTrackerStage(stage, status) {
    var thisStage = stage + "_" + status;
    if ($.inArray(thisStage, animationQueue) === -1) {
        animationQueue.push(thisStage);
    }
    checkQueue();
}

/* This is looking at the events that are getting sent in via NOLO, Native Code, etc... */
window.addEventListener("message", function (event) {
    var data = {};
    if (typeof event.data === "string") try {
        data = JSON.parse(event.data);
    } catch (exception) {}
    if (event.origin === window.location.origin && data.type) {
        switch (data.type) {
            case "setFlavorText":
                {
                    if (data.major) document.getElementById("leftStatus").innerText = data.major;
                    document.getElementById("rightStatus").innerText = data.minor ? "- " + data.minor : "";
                    break;
                }
            case "setNonStatusText":
                {
                    if (data.patentText) document.getElementById("patentText").innerText = data.patentText;
                    if (data.num1) document.getElementById("stageLabel1").setAttribute("data-stagenumber-text", data.num1);
                    if (data.num1) document.getElementById("stageLabel2").setAttribute("data-stagenumber-text", data.num2);
                    if (data.num1) document.getElementById("stageLabel3").setAttribute("data-stagenumber-text", data.num3);
                    if (data.num1) document.getElementById("stageLabel4").setAttribute("data-stagenumber-text", data.num4);
                    if (data.num1) document.getElementById("stageLabel5").setAttribute("data-stagenumber-text", data.num5);
                    if (data.direction) document.getElementsByTagName("html")[0].setAttribute("dir", data.direction);
                    break;
                }
            case "setOrderDetails":
                {
                    setServiceMethod(data.serviceMethod);
                    break;
                }
            case "setLabels":
                {
                    if (data.stage1) document.querySelector("#stageLabel1 .labelText").innerText = data.stage1;
                    if (data.stage2) document.querySelector("#stageLabel2 .labelText").innerText = data.stage2;
                    if (data.stage3) document.querySelector("#stageLabel3 .labelText").innerText = data.stage3;
                    if (data.stage4) document.querySelector("#stageLabel4 .labelText").innerText = data.stage4;
                    if (data.stage5) document.querySelector("#stageLabel5 .labelText").innerText = data.stage5;
                    break;
                }
            case "statusChange":
                {
                    if (data.status) document.getElementById("intl-tracker").setAttribute("data-stagestatus", data.status);
                    if (data.stage) document.getElementById("intl-tracker").setAttribute("data-currentstage", data.stage);
                    getTrackerStage(data.stage, data.status);
                    break;
                }
            default:
                getTrackerStage(data.stage, data.status);
        }
    }
}, false);

enableAudioUpdates(!!location.search.match("enableSpeech"));
themeParadise = new Phaser.Game(823, 249, Phaser.CANVAS, "theme__canvas", { preload: preload, create: create });
increment = 6 / themeParadise.width;
//# sourceMappingURL=paradise.js.map
