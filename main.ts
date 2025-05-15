namespace SpriteKind {
    export const Gas = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(assets.image`galgaDart1`, mySprite, 0, -70)
    projectile.startEffect(effects.trail, 500)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprite.destroy(effects.bubbles, 10)
    otherSprite.destroy(effects.trail, 10)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Gas, function (sprite, otherSprite) {
    statusbar.value = 100
    otherSprite.destroy()
})
statusbars.onZero(StatusBarKind.Energy, function (status) {
    game.over(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.spray, 500)
})
let myEnemy: Sprite = null
let myFuel: Sprite = null
let projectile: Sprite = null
let statusbar: StatusBarSprite = null
let mySprite: Sprite = null
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    ...........2............
    ..........232...........
    .........93239..........
    .........25552..........
    .........95259..........
    .........25b52..........
    .........95b59..........
    .........25252..........
    .........95559..........
    .......932323239........
    .......325555523........
    ........5555555.........
    .........55555..........
    .........5.5.5..........
    ...........5............
    ...........5............
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
statusbar.attachToSprite(mySprite, -22, 0)
game.onUpdateInterval(5000, function () {
    myFuel = sprites.createProjectileFromSide(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . 6 6 6 6 . . . . . . 
        . . . . 6 6 6 5 5 6 6 6 . . . . 
        . . . 7 7 7 7 6 6 6 6 6 6 . . . 
        . . 6 7 7 7 7 8 8 8 1 1 6 6 . . 
        . . 7 7 7 7 7 8 8 8 1 1 5 6 . . 
        . 6 7 7 7 7 8 8 8 8 8 5 5 6 6 . 
        . 6 7 7 7 8 8 8 6 6 6 6 5 6 6 . 
        . 6 6 7 7 8 8 6 6 6 6 6 6 6 6 . 
        . 6 8 7 7 8 8 6 6 6 6 6 6 6 6 . 
        . . 6 8 7 7 8 6 6 6 6 6 8 6 . . 
        . . 6 8 8 7 8 8 6 6 6 8 6 6 . . 
        . . . 6 8 8 8 8 8 8 8 8 6 . . . 
        . . . . 6 6 8 8 8 8 6 6 . . . . 
        . . . . . . 6 6 6 6 . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, 0, 30)
    myFuel.x = randint(5, 155)
    myFuel.setKind(SpriteKind.Gas)
})
game.onUpdateInterval(1000, function () {
    myEnemy = sprites.createProjectileFromSide(img`
        . . . . . . . . . . . . . . . . 
        . . . . 4 4 4 4 . . . . . . . . 
        . . 4 4 4 . 4 4 4 4 . . . . . . 
        . 4 4 . e e e e . 4 4 4 . . . . 
        . 4 . e . 4 4 . e 4 . 4 . . . . 
        4 4 e . 4 e e 4 . e 4 4 . . . . 
        4 . e 4 e . 4 e 4 e 4 4 . . . . 
        4 4 e 4 e 4 4 e 4 e 4 4 . . . . 
        . 4 e . 4 e e 4 . e . 4 . . . . 
        4 4 . e . 4 4 . e . 4 4 . . . . 
        4 4 . 4 e e e e . 4 4 . . . . . 
        . 4 4 4 4 . 4 . 4 4 . . . . . . 
        . . . . 4 4 4 4 4 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, 0, 40)
    myEnemy.x = randint(5, 155)
    myEnemy.setKind(SpriteKind.Enemy)
})
game.onUpdateInterval(300, function () {
    statusbar.value += -1
})
