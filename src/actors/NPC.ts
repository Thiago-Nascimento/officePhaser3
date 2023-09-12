export default class NPC extends Phaser.Physics.Arcade.Sprite{
    constructor( 
        
        scene: Phaser.Scene,
        x: number,
        y: number,
        width: number,
        height: number,
        key: string
    ) {
        super( scene, x, y, key )

        scene.physics.add.sprite(x, y, "testeNpc").setVisible(true).setActive(true).setOrigin(0, 0).setOffset(0, 0)

        this.body = new Phaser.Physics.Arcade.Body(scene.physics.world, this)

        console.log(this.body);
        
        console.log(this);

        // Consertar tamanho do corpo de colisão
        
       
        
        this.body.setSize(this.width, this.height, false)
        this.body.immovable = true

    }
    
    interativo: boolean = false

    verificarInteracao( player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody ): void {
        let distancia = Phaser.Math.Distance.Between(player.x, player.y, this.x, this.y)

        if (distancia < 60) {
            this.interativo = true           
        } else {
            this.interativo = false
        }
    }

    colidirComPlayer( player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody ): void {
        this.scene.physics.add.collider(player, this)
    }
}