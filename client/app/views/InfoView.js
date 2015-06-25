// Backbone view for stock information
var InfoView = Backbone.View.extend({

  className: 'info info-view col-md-5 text-center',


  template: _.template('<div class="info-item row">\
                         <div class="info-subtitle col-md-2 col-md-offset-1">Total</div>\
                         <div class="col-md-4 col-md-offset-1">\
                           <div class="stock-summary">\
                             <div class="info-stat"> <strong>Initial Value</strong>: $<%= start.toFixed(0) %></div>\
                             <div class="info-stat"> <strong>Final Value</strong>: $<%= end.toFixed(2) %></div>\
                           </div>\
                         </div>\
                         <div class="trend-stats col-md-2">\
                           <i class="glyphicon glyphicon-arrow-<% if (percentage >= 0) { %>up up-icon<% } else { %>down down-icon<% } %>"></i><%= Math.abs(percentage) %>%\
                         </div>\
                      </div>'),


  initialize: function() {
    this.collection.on('sync edited remove', this.render, this);
  },

  render: function() {
    this.$el.children().empty();
    var headerText = '<h1 class="info-view-title">Summary</h1><div class="stock-views-container text-left"></div>';

    if (this.collection.length > 0) {
      var port = {};
      port.start = 0;
      port.end = 0;
      var stocks = this.collection.map(function(item) {
        port.start += item.get('amount');
        port.end += item.getEndVal();
        return new StockView({model: item}).render();
      });
      port.percentage = Math.round((port.end/port.start - 1) * 100);
    }
    this.$el.html(headerText);
    this.$el.find('.stock-views-container').html(this.template(port));
    this.$el.find('.stock-views-container').append(stocks);
  }

});
