import React, { Component } from 'react';
import { decorate, observable, configure, action, computed, autorun} from "mobx"
import { observer } from "mobx-react"
import axios from 'axios';
var aaAlpha = require("aa-alpha");
var aaBeta = require("aa-beta");
configure({ enforceActions: true })

class Store {
  services = [
    
  ]
  getUpdatedList(obj){
    this.services = obj;
  }
  get totalSum() {
    let sum = 0
    this.services.map(e => sum += e.active?e.price:0)
    return sum
  
  }
}

decorate(Store, {
  services: observable,  
  getUpdatedList:action,
  totalSum: computed,
  clickHandler:action 
})

const appStore = new Store()
autorun(() => {
  console.log('computed:', appStore.services);
 
 
})
console.log('computed:', appStore.services)


class App extends Component {
  componentDidMount() {
    axios.get(` http://localhost:3001/getServices`)
      .then(res => {
        console.log('rrrrrrrrrr', res);
        appStore.getUpdatedList(res.data.services);
      });
  }
  constructor(props){
    super(props);
     this.state=  {total: 0 };     
 }
  

 

  render() {
    var services = appStore.services.map(function (s,index) {

      // Create a new Service component for each item in the items array.
      // Notice that I pass the self.addTotal function to the component.

      return <Service key = {index} index={index} name={s.name} price={s.price} active={s.active}  />;
    });

    return (<div>
      <h1>Our services</h1>

      <div id="services">
        {services}

        <p id="total">Total <b>${appStore.totalSum.toFixed(2)}</b></p>
        aaAlpha+'-----'+aaBeta
      </div>

    </div>);

  }
}

// This is more complex example that uses two components -
// a service chooser form, and the individual services inside it.


App = observer(App)

class Service extends Component{
  constructor(props){
     super(props);     
      this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler (){
       let reqObj = {'name':this.props.name,'price':this.props.price,'active':!this.props.active,'index':this.props.index}
    axios.post(` http://localhost:3001/updateServices`,reqObj)
    .then(res => {
      console.log('ssssssss', res);
      appStore.getUpdatedList(res.data.services);
    });

  }

  render(){

      return  (<p className={ this.props.active ? 'active' : '' } onClick={this.clickHandler}>
                  {this.props.name} <b>${this.props.price.toFixed(2)}</b>
  </p>);

  }

}









export default App;
