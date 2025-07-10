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
scene.onOverlapTile(SpriteKind.Player, sprites.castle.saplingPine, function (sprite, location) {
    if (!(Flying)) {
        tiles.setTileAt(location, assets.tile`transparency16`)
        mySprite.vy = 5
        scene.cameraShake(4, 500)
        mySprite.startEffect(effects.spray)
        music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
        timer.after(1000, function () {
            mySprite.vy = Default_speed
            effects.clearParticles(mySprite)
        })
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.avalanche, function (sprite, otherSprite) {
    game.setGameOverMessage(false, "Lost in avalanche!")
    game.gameOver(false)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Time flag0`, function (sprite, location) {
    if (!(Flying)) {
        tiles.setTileAt(location, assets.tile`transparency16`)
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
        info.changeScoreBy(250)
    }
})
function create_avalanche () {
    for (let index = 0; index <= 10; index++) {
        mySprite2 = sprites.create(assets.image`avalanche`, SpriteKind.avalanche)
        mySprite2.x = 15 * index
        mySprite2.bottom = randint(1, 12)
        mySprite2.vy = Default_speed - 1
    }
}
let mySprite2: Sprite = null
let Flying = false
let Default_speed = 0
let mySprite: Sprite = null
mySprite = sprites.create(assets.image`Straight`, SpriteKind.Player)
scene.setBackgroundColor(1)
tiles.setCurrentTilemap(tilemap`level1`)
scene.cameraFollowSprite(mySprite)
Default_speed = 20
mySprite.vy = Default_speed
controller.moveSprite(mySprite, 50, 0)
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
game.onUpdateInterval(100, function () {
    info.changeScoreBy(1)
})
