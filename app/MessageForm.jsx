var React = require('react');

var MessageForm = React.createClass({
    submit: function(evt) {
        evt.preventDefault();
        var newMessage = $('#msg').val();
       
        var that = this;
        $.post('/messages',
              {newMessage: newMessage},
               function(response){
                console.log(response);
                if (response == "success"){
                $('#msg').val('');
                that.props.getMessages();
                
        }
        }, 'text'
        );
    },
    
    render: function() {
      return (
        <form onSubmit = {this.submit}>
            <input type="text" name="msg" id="msg"></input>
            <button onClick = {this.submit}>Send</button>
        </form>
      );  
       
    }
                 
    
});

module.exports = MessageForm;