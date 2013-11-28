var Wod = Backbone.Model.extend({
	defaults: {
		creator: "Admin",
	}
});

var Archive = Backbone.Collection.extend({
  model: Wod,
});

var wods = [
  { description: "400M run, 21 KB swings, 12 pull ups - 3 rounds" },
  { description: "15 handstand push ups, run 400M - 4 rounds" },
  { description: "Michael: 800M, 50 back ext., & 50 sit ups - 3 rounds" },
  { description: "Susan: Run 200M 10 squats 10 push ups 5 rounds" },
  { description: "10 burpees followed by a 100M sprint – 10 rounds" },
  { description: "10 push-ups followed by a 100M sprint – 10 rounds" },
  { description: "10 vertical jumps followed by a 400M run – 5 rounds" },
  { description: "Sprint 400M followed by 20 air squats – 3 rounds" },
  { description: "10 push-ups 100M dash - 10 rounds" },
  { description: "Sprint 100M then 30 squats – 10 rounds" },
  { description: "10 sit-ups followed by 10 burpees – 10 rounds" },
  { description: "100 jumping jacks, 50 push-ups, 75 air squats and 25 burpees" },
  { description: "5 push ups, 5 sit ups and 5 squats - 20 rounds" },
  { description: "10-9-8-7-6-5-4-3-2-1 Burpies and Sit ups" },
  { description: "100 jumping jacks, 75 air squats, 50 push ups, 25 burpies" },
  { description: "25 v-ups, 50 KB snatches, 25 push-ups, 50 KB swings, 50 burpees, 50 KB clean press, 50 mountain climbers" },
  { description: "5 two handed swings, 10 burpies - 12 min" },
  { description: "25 burpies, 50 one arm KB swings right, 25 burpies, 50 one arm KB swings left, 25 burpies, 50 one arm KB swings double" },
  { description: "KB overhead thruster squat 100 reps with 5 burpies on the min" },
  { description: "KB overhead thruster squat 21, 15, 9 reps, pullups 21, 15, 9 reps" },
];

var archiveCollection = new Archive(wods);

var WodView = Backbone.View.extend({
  tagName: "div",
  className: "wod-wrap",
  template: $("#wodTemplate").html(),

  render: function() {
    var templ = _.template(this.template);
    this.$el.html(templ(this.model.toJSON()));
    return this;
  }
});

var MainView = Backbone.View.extend({
  el: "body",
  events: {
    "submit #add": "addWod"
  },
  initialize: function() {
    this.archiveView = new ArchiveCollectionView();
  },
  addWod: function(e) {
    e.preventDefault();
    this.archiveView.addWod();
  }
});

var ArchiveCollectionView = Backbone.View.extend({
  el: "#wods",
  initialize: function() {
    this.collection = archiveCollection;
    this.render();
  },
  render: function() {
    this.collection.each(function(wod) {
      this.renderWod(wod);
    }, this);
  },
  renderWod: function(wod) {
    var wodView = new WodView({ model: wod });
    this.$el.append(wodView.render().el); 
  },
  addWod: function() {
    var data = {};
    $('#add').children("input[type='text']").each(function(i, el){
      data[el.id] = $(el).val();
    });
    var newWod = new Wod(data);
    this.collection.add(newWod);
    this.renderWod(newWod);
  }
});

$(function() {
  var mainView = new MainView();
});

// Crossfit generator button
$('.btn-lg').on('click', function() {
  rand = Math.floor(Math.random() * wods.length);
  $('.wod-description').text(wods[rand].description);
});