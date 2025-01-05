import React, { Component } from 'react';
import '../Voucher/Voucher.css';

class Specialized extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        const { vouch, onHomeChange } = this.props;
        return(
            <>
                <div className='back' onClick={()=>onHomeChange('category')}>back</div>
                <div className="items">
                    <div className="item head id">S/N</div>
                    <div className="item head">airtime</div>
                    <div className="item head">value</div>
                    <div className="item head">price</div>
                    <div className="item head">status</div>
                    <div className="item head voer">voucher</div>
                </div>
                <div>
                    { vouch.map((v, i) => {
                        return(
                            <div className="items" key={vouch[i].voucher}>
                                <div className="item id">{vouch[i].id}</div>
                                <div className="item">{vouch[i].airtime}</div>
                                <div className="item">{vouch[i].value}</div>
                                <div className="item">{vouch[i].price}</div>
                                <div className="item" id="status_A">{vouch[i].status}</div>
                                <div className="item voer">{vouch[i].voucher}</div>
                            </div>
                        );  
                    })}
                </div>
            </>
        )
    }
}

export default Specialized;