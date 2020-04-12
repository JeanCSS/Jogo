
export default function createGame(){
  const state= {
        players: {},
        fruits: {}
      }
  
  function addPlayer(command){
    const {playerId, playerX, playerY} = command
    state.players[playerId]={
      x: playerX,
      y: playerY 
    }
  }

  function removePlayer(command){
    const {playerId} = command
    delete state.players[playerId]
  }

  function addFruit(command){
    const {fruitId, fruitX, fruitY} = command
    state.fruits[fruitId]={
      x: fruitX,
      y: fruitY 
    }
  }

  function removeFruit(command){
    const {fruitId} = command
    delete state.fruits[fruitId]
  }

  function movePlayer(command){
    const acceptedMoves = {
      ArrowUp(player){
        if(player.y - 1 >= 0){
          player.y = player.y - 1;
          console.log("game.movePlayer -> cima");
        }
      },
      ArrowDown(player){
        if(player.y + 1 < 10){
          player.y = player.y + 1;
          console.log("game.movePlayer -> baixo");
        }
      },
      ArrowRight(player){
        if(player.x + 1 < 10){
          player.x = player.x + 1;
          console.log("game.movePlayer -> direita");
        }
      },
      ArrowLeft(player){
        if(player.x - 1 >= 0){
          player.x = player.x - 1;
          console.log("game.movePlayer -> esquerda");
        }
      },
    }

    const { keyPressed, playerId } = command
    const player = state.players[playerId]
    const moveFunction = acceptedMoves[keyPressed]
    if(playerId && moveFunction){
      moveFunction(player);
      checkForFruitCollision(playerId);
    }
      
  }

  function checkForFruitCollision(playerId){
      for(const fruitId in state.fruits){ 
      const fruit = state.fruits[fruitId]
      const player = state.players[playerId]

      if(player.x == fruit.x && player.y == fruit.y){
        removeFruit({fruitId})
      }
    }
  }

  return {
    addPlayer,
    removePlayer,
    addFruit,
    removeFruit,
    movePlayer,
    checkForFruitCollision,
    state
  }
}
