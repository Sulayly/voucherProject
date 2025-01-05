import React, { Component } from 'react';
import { Airtel, Mtn, Glo } from './Gigabyte';
import './Home.css';


class Category extends Component{
    constructor(props){
        super(props);
    }
    
    onLoadVouch = (airtime, price, value) => {
        fetch('http://localhost:3000/some-voucher', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                airtime: airtime,
                price: price,
                value: value
            })
        })
        .then(response => response.json())
        .then(vouch => {
            if(vouch){
                this.props.loadVouch(vouch)
                this.props.onHomeChange('special')
            }
        })
    }
    
    render(){
        return(
            <>
                <div className='title'>
                    <div className="name"><h2>Airtel</h2></div>
                </div>
                <div className="gigabyte">
                    {Airtel.map((air, i) => {
                        return(
                            <div className="gig" key={Airtel[i].value}
                                onClick={()=> this.onLoadVouch(Airtel[i].airtime, Airtel[i].price, Airtel[i].value)}
                            >{Airtel[i].value}</div>  
                        );  
                    })}
                </div> 
    
                <div className='title'>
                    <div className="name mtn"><h2>MTN</h2></div>
                </div>
                <div className="gigabyte">
                    {Mtn.map((mt, i) => {
                        return(
                            <div className="gig mtn" key={Mtn[i].value}
                                onClick={()=> this.onLoadVouch(Mtn[i].airtime, Mtn[i].price, Mtn[i].value)}
                            >{Mtn[i].value}</div>  
                        );  
                    })}
                </div> 
    
                <div className='title'>
                    <div className="name glo"><h2>Glo</h2></div>
                </div>
                <div className="gigabyte">
                    {Glo.map((gl, i) => {
                        return(
                            <div className="gig glo" key={Glo[i].value}
                            onClick={()=> this.onLoadVouch(Glo[i].airtime, Glo[i].price, Glo[i].value)}
                            >{Glo[i].value}</div>  
                        );  
                    })}
                </div> 
            </>
        )
    }  
}

export default Category;