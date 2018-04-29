(function(){
    var chat = {
        msgToSend: "",
        init: function() {
            this.$chatHistory = $('.chat-history');
            this.$textarea = $('#msg-to-send');
            this.$button = $('button');
            this.$chatHistoryList =  this.$chatHistory.find('ul');
            this.$button.on('click', this.addMsg.bind(this));
            this.$textarea.on('keyup', this.enterKey.bind(this));
            this.reload();
        },
        reload: function() {
            this.$chatHistory.scrollTop(this.$chatHistory[0].scrollHeight);
            if (this.msgToSend.trim() !== "") {
                var template = Handlebars.compile( $("#message-template").html());
                this.$chatHistoryList.append(template({messageOutput: this.msgToSend, time: this.getCurrentTime()}));
                this.$chatHistory.scrollTop(this.$chatHistory[0].scrollHeight);
                this.$textarea.val("");
            }
        },
        addMsg: function() {
            this.msgToSend = this.$textarea.val();
            this.reload();
        },
        enterKey: function(event) {
            if (event.keyCode === 13)
                this.addMsg();
        },
        getCurrentTime: function() {
            return new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
        }
    };
    chat.init();
})();