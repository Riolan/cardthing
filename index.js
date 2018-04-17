const Discord = require('discord.js'),
  client = new Discord.Client(),
  fs = require("fs"),
  request = require("request"),
  prefix = ';';

let gameInfo = require('./gameInfo.json');

client.on('ready', () => {
  console.log(`Logged on as: ${client.user.username}`)
  console.log(`Ready to serve on ${client.guilds.size} servers, for ${client.users.size} users.`);
  client.user.setActivity("Shuffling Cards");
});

client.on("message", async (msg) => {
  const args = msg.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === "help") {
      msg.channel.send("TO TALK TO A CUSTOMER PLEASE PRESS 1 .......*BEEP*");
  }
  // if (msg.author.id === "250296207388180480") {
  //   msg.delete()
  //   console.log("deleteded ethans msg")
  // }

  if (command === 'score') {
    msg.channel.send(gameInfo.score)
  }


  if (command === "new") {//https://deckofcardsapi.com/api/deck/new/
    if (args[0] === "game") {
      msg.channel.send("Starting NEW GAME!")
    }
  }

  if (command === "play") {
      if (args[0] === "war") {
      if (!args[1]) {
        msg.channel.send("NO OPPONENT LISTED!")
        return;
      }
      //check to see if game w/ server guild is on going;;;
      // fs.readFile("gameInfo.json", function read(err, data) {
      //   if (err) {
      //     console.log(err)
      //   } else {
      //     console.log(JSON.parse(data))
      //   }
      // })
      //start game

      let p1 = msg.author.username + "#" + msg.author.discriminator
      let p2 = msg.mentions.users.first().username + "#" + msg.mentions.users.first().discriminator;

      if (!p2) {
        msg.channel.send("Invalid persons tryign to added")
        return;
      }

      //get game game


      //https://deckofcardsapi.com/api/deck/<<deck_id>>/
      // let deckid = "xlpjegcixf27"
      // request(("https://deckofcardsapi.com/api/deck/" + deckid), function (err, response, data) {
      //   if (response.statusCode === 200) {
      //     return data;
      //   }
      // })
      //log info
      await request("https://deckofcardsapi.com/api/deck/xlpjegcixf27", function(err,res,data) {
        if (!err) {
          var array = []
          //really bad way to do this but whateva works ima right?
          for (var i = 13; i < 25; i++) {
            var x = Object.entries(data)
            array.push(x[i])
          }
          z = []
          for (var j = 0; j < array.length; j++) {
              z.push(array[j][1])
          }
          var send = z.join(),send = send.toString(), send = send.split(",").join("")
          console.log(send)
          gameAdder(send)
        } else {
          console.error
        }
      });
      async function gameAdder(gameId) {
        var send = gameId;

        function game(player1, player2, gameName, score, send) {
          this.player1 = player1;
          this.player2 = player2;
          this.gameName = gameName;
          this.score = score;
          this.send = send;
        }


        //var gameId = x moved into x function
        var currentScore = 0
        console.log(send)
        let newGame = new game(p1, p2, args[0], currentScore, send)
        gameInfo.push(newGame);
        let newGameInfo = JSON.stringify(gameInfo, null, 4);
        fs.writeFile('./gameInfo.json' , newGameInfo, (err) => {
          if(err) throw err;
          console.log('successfully written')
        })
      }
    }
  }

});

/*

{
  "deck_id": "xlpjegcixf27",
  "success": true,
  "remaining": 52,
  "shuffled": false
}

*/
 //client secret
