new Vue({
  el: "#app",
  data: {
    player_heal: 100,
    monster_heal: 100,
    game_is_on: false,
    attack_multiple: 10,
    special_attack_multiple: 25,
    monster_attack_multiple: 15,
    heal_up_multiple: 20,
    log_text: {
      attack: "Player attack : ",
      special_attack: "Player special attack : ",
      heal_up: "Player healed up.",
      give_up: "Player gave up!",
    },
    logs: [],
  },
  methods: {
    start_game: function () {
      this.game_is_on = true;
    },
    attack: function () {
      const point = Math.ceil(Math.random() * this.attack_multiple);
      this.monster_heal -= point;
      this.add_to_log({ turn: "p", text: this.log_text.attack + point });
      this.monster_attack();
    },
    special_attack: function () {
      const point = Math.ceil(Math.random() * this.special_attack_multiple);
      this.monster_heal -= point;
      this.add_to_log({
        turn: "p",
        text: this.log_text.special_attack + point,
      });
      this.monster_attack();
    },
    heal_up: function () {
      const point = Math.ceil(Math.random() * this.heal_up_multiple);
      this.player_heal += point;

      this.add_to_log({
        turn: "p",
        text: this.log_text.heal_up + point,
      });
    },
    give_up: function () {
      this.player_heal = 0;
      this.add_to_log({
        turn: "p",
        text: this.log_text.give_up + point,
      });
    },
    monster_attack: function () {
      const point = Math.ceil(Math.random() * this.monster_attack_multiple);

      this.player_heal -= point;
      this.add_to_log({
        turn: "m",
        text: "Monster attack. (" + point + ")",
      });
    },
    add_to_log: function (log) {
      this.logs.push(log);
    },
  },

  watch: {
    player_heal: function (value) {
      if (value <= 0) {
        this.player_heal = 0;
        if (confirm("You lost! Do you want to try again?")) {
          this.player_heal = 100;
          this.monster_heal = 100;
          this.logs = [];
        }
      } else if (value >= 100) this.player_heal = 100;
    },
    monster_heal: function (value) {
      if (value <= 0) {
        this.monster_heal = 0;
        if (confirm("You win! Do you want to try again?")) {
          this.player_heal = 100;
          this.monster_heal = 100;
          this.logs = [];
        }
      } else if (value >= 100) this.monster_heal = 100;
    },
  },

  computed: {
    player_progress: function () {
      return {
        width: this.player_heal + "%",
      };
    },
    monster_progress: function () {
      return {
        width: this.monster_heal + "%",
      };
    },
  },
});
