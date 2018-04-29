# DatabaseScheme:
* Players
  * ID
  * Name
* Games
  * ID
  * Player East/South/West/North (North optional)
  * Final Scores
  * Chombos
  * Total time
* Hands
  * ID
  * Game ID
  * Hand# 
  * Round (ESWN)
  * Honba
  * Time
  * Number of discards
  * draw?
  * chombo? type of chombo?
  * Winner(s)
  * Loser(s)
  * tsumo/ron
  * for each winner:
    * yakulist
    * dora number
    * fu

#UI stuff:
* Somehow handle sekinin barai

# Stats:
* Show all games, expandable to corresponding hands
* Per player:
  * like before?
* Total:
  * Counts / averages for all han/fu combinations
  * Counts / averages for all yaku
  * Averages for #discards, time
  * Averages / counts of chombos
  * Graph: #han vs #hands
