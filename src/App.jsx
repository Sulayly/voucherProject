import React, { Component }  from 'react';
import Navigation from './Navigation/Navigation';
import Home from './Home/Home';
import Dashboard from './Dashboard/Dashboard';
import Checkout from './Checkout/Checkout';
import Voucher from './Voucher/Voucher';

class App extends Component{
  constructor(){
    super();
    this.state = {
      route: 'home',
      vouchers: [],
      usedVouchers: [],
      salesValue: {sum: 0},
      totalSales: {count: 0}
    }
  }

  loadVouchers = (data) => {
    this.setState({vouchers: data})
  }

  loadUsedVouchers = (data) => {
    this.setState({usedVouchers: data})
  }

  loadSalesValue = (data) => {
    this.setState({salesValue: {sum: data.sum}})
  }

  loadTotalSales = (data) => {
    this.setState({totalSales: {count: data.count}})
  }

  onVoucher = () => {
    fetch('http://localhost:3000/voucher', {
      method: 'get',
      headers: {'Content-Type': 'application/json'},
    })
    .then(response => response.json())
    .then(vouchers => {
      if(vouchers){
        this.loadVouchers(vouchers)
        this.onRouteChange('voucher')
      }
    })
  }

  onTotalSales = () => {
    fetch('http://localhost:3000/total-sales', {
      method: 'get',
      headers: {'Content-Type': 'application/json'},
    })
    .then(response => response.json())
    .then(totalSales => {
      if(totalSales){
        this.loadTotalSales(totalSales)
      }
    })
  }

  onSalesValue = () => {
    fetch('http://localhost:3000/sales-value', {
      method: 'get',
      headers: {'Content-Type': 'application/json'},
    })
    .then(response => response.json())
    .then(salesValue => {
      if(salesValue){
        this.loadSalesValue(salesValue)
      }
    })
  }

  onUsedVoucher = () => {
    fetch('http://localhost:3000/used-vouchers', {
      method: 'get',
      headers: {'Content-Type': 'application/json'},
    })
    .then(response => response.json())
    .then(usedVouchers => {
      if(usedVouchers){
        this.loadUsedVouchers(usedVouchers)
        this.onTotalSales()
        this.onSalesValue()
        this.onRouteChange('dashboard')
      }
    })
  }
  
  onRouteChange = (route) => {
    this.setState({route: route});
  }

  render(){
    const { route, vouchers, usedVouchers } = this.state;
    const { sum } = this.state.salesValue;
    const { count } = this.state.totalSales;
    return(
      <>
        <Navigation onRouteChange={this.onRouteChange} onVoucher={this.onVoucher} onUsedVoucher={this.onUsedVoucher}/>
        { route === 'home' ? <Home/>
          :( route === 'dashboard' ? <Dashboard usedVouchers={usedVouchers} sum={sum} count={count} /> 
            :( route === 'checkout' ? <Checkout/>
              :( route === 'voucher' ? <Voucher vouchers={vouchers} loadVouchers={this.loadVouchers} 
                onRouteChange={this.onRouteChange} onVoucher={this.onVoucher}/>
                :<></>
              )
            )
          )
        }
      </>
    );
  }
}

export default App;
