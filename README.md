## React Route 的知识点整理
#### React Router 是专为 React 设计的路由解决方案；
#### 什么是路由？
#### 假如我们有一台提供 Web 服务的服务器的网络地址是：127.0.0.1:8080/webpack-dev-server/，而该 Web 服务又提供了三个可供用户访问的页面，其页面 URI 分别是：
#### 127.0.0.1:8080/webpack-dev-server/a
#### 127.0.0.1:8080/webpack-dev-server/b
#### 当用户使用 127.0.0.1:8080/webpack-dev-server/a 来访问该页面时，Web 服务会接收到这个请求，然后会解析 URI 中的路径 /a，在 Web 服务的程序中，该路径对应着相应的处理逻辑，程序会把请求交给路径所对应的处理逻辑，这样就完成了一次「路由分发」，这个分发就是通过「路由」来完成的。
#### 前端路由
#### 前端的路由和后端的路由在实现技术上不一样，但是原理都是一样的。在 HTML5 的 history API 出现之前，前端的路由都是通过 hash 来实现的，hash 能兼容低版本的浏览器。如果我们把上面例子中提到的 3 个页面用 hash 来实现的话，它的 URI 规则中需要带上 #。JavaScript 是可以通过 window.location.hash 读取到的，读取到路径加以解析之后就可以响应不同路径的逻辑处理。
#### 学习根据hash值的改变来实现路由功能；
#### 默认的页面这样访问：127.0.0.1:8080/webpack-dev-server/# 可以访问到主页
#### A路由页面如下访问
#### 127.0.0.1:8080/webpack-dev-server/#a
#### B路由页面访问如下：
#### 127.0.0.1:8080/webpack-dev-server/#b
#### C路由页面：
#### 127.0.0.1:8080/webpack-dev-server/#c
#### 比如如下js代码：
import React from 'react'
import ReactDOM from 'react-dom'
if (module.hot) {
  module.hot.accept()
}
var A = React.createClass({
  render: function(){
    return (<div>A模块已经加载了</div>);
  }
});
var B = React.createClass({
  render: function(){
    return (<div>B模块已经加载了</div>);
  }
});
var C = React.createClass({
  render: function(){
    return (<div>C模块已经加载了</div>);
  }
});
var Home = React.createClass({
  render: function(){
    return (<div>Home模块已经加载了</div>);
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
    return(<div><div>App</div><Child /></div>)
  }
}); 
function render() {
  var route = window.location.hash.substr(1);
  ReactDOM.render(<App route={route}/>,document.getElementById("root"));
}
window.addEventListener('hashchange',render);
render();
#### 在hash值改变的时候，App 将会根据this.props.route 值的改变来动态渲染 <Child/> component。
比如访问页面 127.0.0.1:8080/webpack-dev-server/#a 这个的时候，会渲染A组件的代码；但是如果组件A 有一些内嵌的子组件需要根据 例如 #a/message/:id 或者 #a/unread 等这样的路由规则做动态渲染的时候。我们需要一些更加智能的手段来把路由信息传递给我们的App，这样A组件可以根据URL的映射关系来控制哪些子组件应该需要被渲染。我们的很多组件应该根据URL的规则来做动态渲染。在不使用路由规则的前提下，复杂一点的路由需求就需要我们写很多条件判断的代码去去解决实RL和层级组件的同步问题。为了解决这些情况，我们就引入了react的route；
##### 前端路由和后端路由的优缺点？
###### 从性能和用户体验的层面来比较的话，后端路由每次访问一个新页面的时候都要向服务器发送请求，然后服务器再响应请求，这个过程肯定会有延迟。而前端路由在访问一个新页面的时候仅仅是变换了一下路径而已，没有了网络延迟，对于用户体验来说会有相当大的提升。
#### react Route
import React from 'react'
import {render} from 'react-dom'
import { Router, Route, Link,IndexRoute, browserHistory } from 'react-router'

if (module.hot) {
  module.hot.accept()
}

var A = React.createClass({
  render: function(){
    return (<div>A模块已经加载了</div>);
  }
});

var B = React.createClass({
  render: function(){
    return (<div>B模块已经加载了</div>);
  }
});
var Home = React.createClass({
  render: function(){
    return (<div><div>Home模块已经加载了</div></div>);
  }
});
var App = React.createClass({
  render: function(){
    return (<div><div>App模块已经加载了</div><div className="App">{this.props.children}</div></div>);
  }
});
var Users = React.createClass({
  render(){
    return(<div><div>Users</div><div className=""><ul><li>1111</li></ul></div><div className="Users">{this.props.children}</div></div>)
  }
});
var User = React.createClass({
  render() {
    return (<div><div>users的子组件</div></div>)
  }
});
var NoMatch = React.createClass({
  render () {
    return (<div><div>没有匹配到的内容</div></div>)
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
#### 路由配置讲解如下：
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
#### 1. 首先用户在浏览器地址栏中访问 http://localhost:8080/webpack-dev-server/ 的根目录的时候，
就会把App组件和Home组件加载出来，父级组件App需要加上 <div>{this.props.children}</div>，子组件会
把代码加载到这里面来，path属性可以理解为路径的含义；
#### 2. IndexRoute组件 如果上面没有IndexRoute组件的话，用户访问根路径的时候，不会加载任何子组件，也就是
说这时候 this.props.children 为undefined；IndexRoute组件就是解决这个问题的，显示的指定Home组件是跟路由
的子组件，即指定加载默认的子组件，就好比如项目的根目录下的index.html；
#### 3. history属性
###### Router组件的history属性，用来监听浏览器地址栏的变化，并将URL解析成一个地址对象，history属性有三个
值：
#### 3-1 browserHistory
#### 3-2 hashHistory
#### 3-3 createMemoryHistory
#### 如果设置为hashHistory的话，路由将通过URL的hash部分(#)切换，url的形式类似于如下：
http://localhost:8080/webpack-dev-server/#/a 这样就可以访问到A模块了；
#### 如果设置为browserHistory的话，路由将会按照我们正常的地址访问；比如如下：
http://localhost:8080/webpack-dev-server/a 就可以访问到A模块的代码了；
#### createMemoryHistory主要用于服务器渲染。它创建一个内存中的history对象，不与浏览器URL互动。
#### 注意：如果我们使用的是webpack-dev-server服务器的话，需要配置成如下：
<pre>
  devServer: {
    contentBase: './',
    hot: true,
    historyApiFallback:true
  }
</pre>
#### 第三个参数切记需要加上，否则的话，用户直接向服务器请求某个子路由，会显示网页找不到的404错误。
#### 访问A模块的代码；如：http://localhost:8080/webpack-dev-server/a 就可以访问
#### 访问B模块的代码：如：http://localhost:8080/webpack-dev-server/b 就可以访问
#### 访问Users模块的代码： 如：http://localhost:8080/webpack-dev-server/Users 就可以访问；
#### 访问Users模块的下的子模块user代码：如：http://localhost:8080/webpack-dev-server/userId
也可以访问的到；

