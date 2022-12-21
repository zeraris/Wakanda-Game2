function randomValue(max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },
  computed: {
    monsterStatus() {
        if (this.monsterHealth < 0) {
            return {width: '0%'}
        }
      return { width: this.monsterHealth + "%" };
    },
    playerStatus() {
        if (this.playerHealth < 0) {
            return {width: '0%'}
        }
      return { width: this.playerHealth + "%" };
    },
    useSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch:{
    playerHealth(value) {
        if (value <= 0 && this.monsterHealth <= 0) {
            this.winner = 'draw'
        }
        else if (value <= 0) {
            this.winner = 'monster'
        }
    },
    monsterHealth(value) {
        if (value <= 0 && this.playerHealth <= 0) {
            this.winner = 'draw'
        }
        else if (value <= 0) {
            this.winner = 'player'
        }
    }
  },
  methods: {
    startNew() {
        this.monsterHealth = 100;
        this.playerHealth = 100;
        this.currentRound = 0;
        this.winner = null;
        this.logMessages =[];
    },
    attackMonster() {
      this.currentRound++;
      const damage = randomValue(12, 5);
      this.monsterHealth -= damage;
      this.addLogMessage('player', 'attack', damage)
      this.attackPlayer();
    },
    attackPlayer() {
      const damage = randomValue(16, 10);
      this.playerHealth -= damage;
      this.addLogMessage('monster', 'attack', damage)
    },
    specialAttackMonster() {
      this.currentRound++;
      const damage = randomValue(24, 10);
      this.monsterHealth -= damage;
      this.addLogMessage('player', 'special attack', damage)
      this.attackPlayer();
    },
    healPlayer() {
        this.currentRound++
        const healValue = randomValue(10,16);
        if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100
        }
        else {
        this.playerHealth += healValue;    
        }
        this.addLogMessage('player', 'heal', healValue)
        this.attackPlayer()
    },
    surrender() {
        this.winner = 'monster'
    },
    addLogMessage(who, what, value) {
        this.logMessages.unshift({
            actionBy: who,
            actionType: what,
            actionValue: value,
        })
    }
  },
});

app.mount("#game");
