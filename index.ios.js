/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} = React;

var base_url = 'https://raw.githubusercontent.com/redbooth/Scrum-poker-cards/master/png/';
var Cards = [
{ id: 1, image: base_url + "planning%20poker_Low%20hanging%20fruit.png" },
{ id: 2, image: base_url + "planning%20poker_Piece%20of%20cake.png" },
{ id: 3, image: base_url + "planning%20poker_It%20ain't%20rocket%20science.png" },
{ id: 4, image: base_url + "planning%20poker-03.png" },
{ id: 5, image: base_url + "planning%20poker_An%20arm%20and%20a%20leg.png" },
{ id: 6, image: base_url + "planning%20poker_Squeaking%20by.png" },
{ id: 7, image: base_url + "planning%20poker_Don't%20put%20all%20.png" },
{ id: 8, image: base_url + "planning%20poker_Meterse%20en%20un%20berenjenal.png" },
{ id: 9, image: base_url + "planning%20poker_Monster%20task.png" },
{ id: 10, image: base_url + "planning%20poker_When%20pigs%20fly.png" },
{ id: 11, image: base_url + "planning%20poker_Here%20be%20dragons.png" },
{ id: 12, image: base_url + "planning%20poker_Coffee%20break.png" },
{ id: 13, image: base_url + "planning%20poker_Eat%20a%20brownie.png" },
{ id: 14, image: base_url + 'planning%20poker_Yak%20Shaving.png' },
];

var CardBack = base_url + "Cover%20-%20option%202.png"

var MiniCardComponent = React.createClass({

  getInitialState: function() {
    return { dataSource: this.props.dataSource };
  },
  
  render: function() {
    var card = this.state.dataSource
    return (
      <TouchableHighlight onPress={this._onPressCard}>
        <Image
          source={{uri: card.image}}
          style={styles.miniCard} 
        /> 
      </TouchableHighlight>
    );
  },

  _onPressCard: function(){
    return this.props.setBigCard(this.state.dataSource.id);
  },

});

var BigCardComponent = React.createClass({

  getInitialState: function() {
    return { dataSource: this.props.dataSource};
  },
  
  render: function() {
    var card = this.state.dataSource;
    return (
      <TouchableHighlight onPress={this._onPressCard} style={styles.wrap}>
        <Image
          source={{uri: card.image}}
          style={styles.bigCard} 
        /> 
      </TouchableHighlight>
    );
  },

  _onPressCard: function(){
    console.log('big');
    return this.props.showBigCard(false);
  },

});

var DeckComponent = React.createClass({
  
  getInitialState: function() {
    return { dataSource: this.props.dataSource };
  },

  render: function() {
    var cards = this.state.dataSource;
    return (
      <View style={styles.deck}>
        {cards.map(this.renderCard)}
      </View>
    );
  },

  renderCard: function(card){
    return (
      <MiniCardComponent 
        id={card.id} 
        dataSource={card}
        setBigCard={this.props.setBigCard} 
      />
    );
  },

});

var PlannigPoker = React.createClass({

  getInitialState: function() {
    return { dataSource: Cards, display: false };
  },

  findById: function(id) {
    for (var i = 0; i < Cards.length; i++) {
      if (Cards[i].id === id) {
        return Cards[i];
      }
    }
  },

  setBigCard: function(card_id) {
    var card = this.findById(card_id);
    this.setState({ display: true, card: card })
  },

  showBigCard: function(show) {
    this.setState({ display: false })
  },

  render: function(){
    var cards   = this.state.dataSource;
    var display = this.state.display;
    var card    = this.state.card;
    console.log(card);
    var bigCard = display ? <BigCardComponent dataSource={card} showBigCard={this.showBigCard} /> : <View />;
    return ( 
      <View style={styles.app}>
        {bigCard}
        <DeckComponent 
          dataSource={cards} 
          style={styles.listView}
          setBigCard={this.setBigCard}
        />
      </View>
    );
  },

});

var styles = StyleSheet.create({
  app: {
    backgroundColor: '#000000',
    paddingTop: 50,
    paddingBottom: 130,
    paddingLeft: 10,
  },
  deck: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  miniCard: {
    width: 70,
    height: 104,
    marginRight: 20,
    marginBottom: 20,
    borderRadius: 5,
  },
  bigCard: {
    width: 300,
    height: 400, 
  },
  wrap: {
    position: 'absolute',
    top: 0,
    height: 500,
  }
});

AppRegistry.registerComponent('PlannigPoker', () => PlannigPoker);
