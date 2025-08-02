enum ActionKind {
    Walking,
    Idle,
    Jumping
}
namespace SpriteKind {
    export const avalanche = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile0`, function (sprite, location) {
    if (!(Flying)) {
        tiles.setTileAt(location, assets.tile`transparency16`)
        Flying = true
        mySprite.setScale(1.25, ScaleAnchor.Middle)
        controller.moveSprite(mySprite, 0, 0)
        mySprite.startEffect(effects.trail)
        music.play(music.melodyPlayable(music.beamUp), music.PlaybackMode.InBackground)
        timer.after(3000, function () {
            Flying = false
            controller.moveSprite(mySprite, 50, 0)
            mySprite.setScale(1, ScaleAnchor.Middle)
            effects.clearParticles(mySprite)
        })
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Time flag`, function (sprite, location) {
    if (!(Flying)) {
        tiles.setTileAt(location, assets.tile`transparency16`)
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
        info.changeScoreBy(100)
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.builtin.field0, function (sprite, location) {
    game.setGameOverScoringType(game.ScoringType.HighScore)
    game.gameOver(true)
})
function create_avalanche () {
    for (let index = 0; index <= 10; index++) {
        mySprite2 = sprites.create(assets.image`avalanche`, SpriteKind.avalanche)
        mySprite2.x = 15 * index
        mySprite2.bottom = randint(1, 12)
        mySprite2.vy = Default_speed - 2
    }
}
scene.onOverlapTile(SpriteKind.Player, sprites.castle.saplingPine, function (sprite, location) {
    if (!(Flying)) {
        tiles.setTileAt(location, assets.tile`transparency16`)
        stumble()
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.avalanche, function (sprite, otherSprite) {
    if (!(Flying)) {
        game.setGameOverMessage(false, "Burried in avalanche!")
        game.gameOver(false)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Time flag0`, function (sprite, location) {
    if (!(Flying)) {
        tiles.setTileAt(location, assets.tile`transparency16`)
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
        info.changeScoreBy(250)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    if (!(Flying)) {
        sprites.destroy(otherSprite)
        stumble()
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`crevice`, function (sprite, location) {
    if (!(Flying)) {
        Flying = true
        controller.moveSprite(mySprite, 0, 0)
        music.play(music.melodyPlayable(music.powerDown), music.PlaybackMode.InBackground)
        mySprite.setPosition(location.x, location.y)
        mySprite.vy = 0
        mySprite.sayText("Oops!")
        mySprite.startEffect(effects.blizzard, 5000)
        timer.after(600, function () {
            mySprite.scale = 0.75
            timer.after(600, function () {
                mySprite.scale = 0.5
                timer.after(600, function () {
                    mySprite.scale = 0.25
                    game.setGameOverMessage(false, "Fallen into crevasse!")
                    game.gameOver(false)
                })
            })
        })
    }
})
function stumble () {
    mySprite.vy = 5
    scene.cameraShake(4, 500)
    mySprite.startEffect(effects.spray)
    music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
    timer.after(1000, function () {
        mySprite.vy = Default_speed
        effects.clearParticles(mySprite)
    })
}
let projectile: Sprite = null
let mySprite2: Sprite = null
let Flying = false
let Default_speed = 0
let mySprite: Sprite = null
mySprite = sprites.create(assets.image`Straight`, SpriteKind.Player)
scene.setBackgroundColor(1)
tiles.setCurrentTilemap(tilemap`level1`)
scene.cameraFollowSprite(mySprite)
Default_speed = 25
mySprite.vy = Default_speed
controller.moveSprite(mySprite, 25, 0)
game.setGameOverEffect(false, effects.dissolve)
game.setGameOverEffect(true, effects.confetti)
Flying = false
info.setScore(0)
create_avalanche()
game.onUpdate(function () {
    if (Flying) {
        mySprite.setImage(assets.image`Jumping`)
    } else {
        if (controller.left.isPressed()) {
            mySprite.setImage(assets.image`Left`)
        } else if (controller.right.isPressed()) {
            mySprite.setImage(assets.image`Right`)
        } else {
            mySprite.setImage(assets.image`Straight`)
        }
    }
})
game.onUpdateInterval(5000, function () {
    if (Math.percentChance(80)) {
        projectile = sprites.createProjectileFromSide(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . b 5 b . . . 
            . . . . . . . . . b 5 b . . . . 
            . . . . . . b b b b b b . . . . 
            . . . . . b b 5 5 5 5 5 b . . . 
            . b b b b b 5 5 5 5 5 5 5 b . . 
            . b d 5 b 5 5 5 5 5 5 5 5 b . . 
            . . b 5 5 b 5 d 1 f 5 d 4 f . . 
            . . b d 5 5 b 1 f f 5 4 4 c . . 
            b b d b 5 5 5 d f b 4 4 4 4 4 b 
            b d d c d 5 5 b 5 4 4 4 4 4 b . 
            c d d d c c b 5 5 5 5 5 5 5 b . 
            c b d d d d d 5 5 5 5 5 5 5 b . 
            . c d d d d d d 5 5 5 5 5 d b . 
            . . c b d d d d d 5 5 5 b b . . 
            . . . c c c c c c c c b b . . . 
            `, randint(-20, 20), 45)
    } else {
        projectile = sprites.createProjectileFromSide(img`
            ..............ccccccccc........
            ............cc555555555cc......
            ...........c5555555555555c.....
            ..........c55555555555555dc....
            .........c555555555555b5bdc....
            .........555bc1555555555bdcccc.
            ........c555ccc55555555bbdccddc
            ........c555bcb5555555ccddcdddc
            .......c555555555551ccccddbdddc
            .......c555555b555c1cccbddbbdbc
            .......c5555555bbc33333ddddbcc.
            .......c555555555bc333555ddbc..
            .......c5555555555555555555c...
            .......cd555555555555cccc555c..
            .......cd55555555555c555c555c..
            .......cdd555555555b5555b555c..
            .......cddd55555ddbb555bb555c..
            .......cdddd55555555555b5555c..
            .......cddddd5555555ddb5555dc..
            c......cdddddd555555555555dcc..
            cc...ccddddddd555555555555dc...
            cdccccdddddd555555d55555ddcc...
            cdddddddddbd5555555ddddddccccc.
            ccdddddddbb55555555bddddccbddc.
            .ccddddddbd55555555bdddccdddc..
            ..cccddddbd5555555cddcccddbc...
            ....ccccccd555555bcccc.cccc....
            .........cc555555bc............
            .........cc55555555c...........
            ..........cccccccccc...........
            `, randint(-20, 20), 35)
    }
    projectile.x = mySprite.x + randint(-32, 32)
})
game.onUpdateInterval(100, function () {
    info.changeScoreBy(1)
})
