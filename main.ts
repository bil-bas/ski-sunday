enum ActionKind {
    Walking,
    Idle,
    Jumping
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
        info.changeCountdownBy(2)
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.builtin.field0, function (sprite, location) {
    info.setScore(info.countdown() * 1000)
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
info.startCountdown(20)
game.setGameOverEffect(false, effects.dissolve)
game.setGameOverEffect(true, effects.confetti)
game.setGameOverMessage(false, "You ran out of time!")
Flying = false
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
