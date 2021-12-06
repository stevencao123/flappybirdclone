// Main state for the game
var gameWidth = 490;
var gameHeight = 400;

var mainState = {
    preload: function() {
        game.load.image('bird', 'assets/bird.png');
        game.load.image('pipe.png', 'assets/pipe.png');
    },

    create: function() {
        //config game stage
        game.stage.backgroundColor = '#71c5cf';
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //adding bird sprite and functionality
        this.bird = game.add.sprite(100, 245, 'bird');
        game.physics.arcade.enable(this.bird);
        this.bird.body.gravity.y =  1000;
        var spaceKey = game.input.keyboard.addKey(
            Phaser.Keyboard.SPACEBAR
        );
        spaceKey.onDown.add(this.jump, this);

        //adding group of pipe and spawn them
        this.pipes = game.add.group();
        this.timer = game.time.events.loop(1500, this.addPipes, this); 

        //adding score
        this.score = 0;
        this.labelScore = game.add.text(20, 20, '0', {font: "30px Arial", fill: "#ffffff"});
    },

    update: function() {
        if (this.bird.y < 0 || this.bird.y > gameHeight) {
            this.restartGame();
        }
        game.physics.arcade.overlap(
            this.bird, this.pipes, this.restartGame, null, this
        );
    },

    jump: function() {
        this.bird.body.velocity.y = -350;
    },

    restartGame: function() {
        game.state.start('main');
    },

    addPipe: function(x, y) {
        var pipe = game.add.sprite(x, y, 'pipe');
        this.pipes.add(pipe);
        game.physics.arcade.enable(pipe);
        pipe.body.velocity.x = -200;
        pipe.checkWorldBounds = true;
        pipe.outOfBoundskill = true;
    },

    addPipes: function(x, y) {
        var opening = Math.floor(Math.random() * 5) + 1;
        
        for (var i = 0; i < 8; i++) {
            if (i != opening && i != opening + 1) {
                this.addPipe(400, i * 60 + 10);
            }
        }

        this.score += 1;
        this.labelScore.text = this.score;
    },
};


var game = new Phaser.Game(gameWidth, gameHeight);
game.state.add('main', mainState);
game.state.start('main');