/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json'

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
} = React;


var AwesomeProject1 = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
              <Text style={styles.welcome}>
                Welcome to TMall React Native!
              </Text>
              <Text style={styles.instructions}>
                To get started, edit index.android.js
              </Text>
              <Text style={styles.instructions}>
                Shake or press menu button for dev menu
              </Text>
            </View>
    );
  }
});

var MOCKED_MOVIES_DATA = [
  {title: 'Title', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF0000',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
   title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  mystyle: {
            height:40, 
            borderWidth: 1,  
            borderColor: 'red',
  },listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  }
});

// var testInnerStyle = React.createClass({

//   render: function(){
//     var movie = MOCKED_MOVIES_DATA[0];
//     return(
//          <View style={styles.style_0}>
//                         <View style={styles.style_1}></View>
//                         <View style={styles.style_1}></View>
//                         <Text style={{flex:10}}> 文案描述
//                         </Text>
//                     </View>
//       );
//   }
// });



var mytest = React.createClass({

 render: function() {

            // <View  style={styles.container}>
            //     <View style={{height:40, borderWidth: 1, borderColor: 'red'}}>

            //     </View>
            // </View>
    
    //单个远程对象image+textview绘制
    // if (!this.state.movies) {
    //   return this.renderLoadingView();
    // }

    // var movie = this.state.movies[0];
    // return this.renderMovie(movie);
    

    //批量远程对象image+textview绘制
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
      />
    );

    // var movie = MOCKED_MOVIES_DATA[0];

    // return (
    
    //      <View style={styles.container}>
    //       <Image
    //         source={{uri: movie.posters.thumbnail}}
    //         style={styles.thumbnail}/>
          
    //       <View style={styles.rightContainer}>
    //         <Text style={styles.title}>{movie.title}</Text>
    //         <Text style={styles.year}>{movie.year}</Text>
    //         <View style={style.mystyle}></View>
    //       </View>


    //     </View>
    //   );
  },
    getInitialState: function() {
    return {
      // movies: null,

      //注意此处的return后面跟的是{} 而不是（）
    dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    loaded: false,

    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

   fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          //for single
          // movies: responseData.movies,
          
          //for listview
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      })
      .done();
  },
  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  }, 

  renderMovie: function(movie) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail} />
       
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title} tag1</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  },
});




AppRegistry.registerComponent('AwesomeProject', () => mytest);
