
/*
import React from 'react'
import {render} from 'react-dom'
var A = React.createClass({
  render: function(){
    return (<h2>A模块已经加载了</h2>);
  }
});

var B = React.createClass({
  render: function(){
    return (<h2>B模块已经加载了</h2>);
  }
});

var C = React.createClass({
  render: function(){
    return (<h2>C模块已经加载了</h2>);
  }
});
var Home = React.createClass({
  render: function(){
    return (<h2>Home模块已经加载了</h2>);
  }
});
var App = React.createClass({
  render: function(){
    var Child;
    switch(this.props.route) {
      case 'a': Child = A;
        break;
      case 'b': Child = B;
        break;
      case 'c': Child = C;
        break;
      default: Child = Home;
    }
    return(
      <div>
        <h1>App</h1>
        <Child />
      </div>
    )
  }
}); 
function render() {
  var route = window.location.hash.substr(1);
  ReactDOM.render(<App route={route}/>,document.getElementById("root"));
}
window.addEventListener('hashchange',render);
render();
*/
import React from 'react'
import {render} from 'react-dom'
import { Router, Route, Link,IndexRoute, browserHistory,hashHistory } from 'react-router'

if (module.hot) {
  module.hot.accept()
}

var A = React.createClass({
  render: function(){
    return (<h2>A模块已经加载了</h2>);
  }
});

var B = React.createClass({
  render: function(){
    return (<h2>B模块已经加载了</h2>);
  }
});
var Home = React.createClass({
  render: function(){
    return (
      <div>
        <h2>Home模块已经加载了</h2>
      </div>
    );
  }
});
var App = React.createClass({
  render: function(){
    return (
      <div>
        <h2>App模块已经加载了</h2>
        <div className="App">{this.props.children}</div>
      </div>
    );
  }
});
var Users = React.createClass({
  render(){
    return(
      <div>
        <h1>Users</h1>
        <div className="">
          <ul>
            <li>1111</li>
          </ul>
        </div>
        <div className="Users">
          {this.props.children}
        </div>
      </div>
    )
  }
});
var User = React.createClass({
  render() {
    return (
      <div>
        <h2>users的子组件</h2>
      </div>
    )
  }
});
var NoMatch = React.createClass({
  render () {
    return (
      <div>
        <h1>没有匹配到的内容</h1>
      </div>
    )
  }
});
render((
  <Router history = {browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component= {Home} />
      <Route path="a" component = {A} />
      <Route path="b" component = {B} />
      <Route path="users" component={Users}>
        <Route path="/userId" component={User}/>
      </Route>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
),document.getElementById("root"));
