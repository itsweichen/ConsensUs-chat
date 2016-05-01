Meteor.subscribe('messages');
Meteor.subscribe('allUsernames');

Template.messages.helpers({
  messages: Messages.find({})
});

Template.message.helpers({
  text: this.text,
  user: this.user,
  timestamp: this.timestamp
})

Template.footer.events({
  'keypress input': function(e) {
    var inputVal = $('.input-box_text').val();
    if(!!inputVal) {
      var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
      if (charCode == 13) {
        e.stopPropagation();
        Meteor.call('newMessage', {text: $('.input-box_text').val()});
        $('.input-box_text').val("");
        return false;
      }
    }
  }
});

Template.registerHelper("usernameFromId", function (userId) {
  var user = Meteor.users.findOne({_id: userId});
  if (typeof user === "undefined") {
    return "Anonymous";
  }
  return user.username;
});

Template.registerHelper("timestampToTime", function(timestamp){
  var date = new Date(timestamp);
  var hours = date.getHours();
  var minutes = '0' + date.getMinutes();
  var seconds = '0' + date.getSeconds();
  return hours + ':' + minutes.substr(minutes.length-2) + ':' + seconds.substr(seconds.length-2);
});
