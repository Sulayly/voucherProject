import React, { Component } from 'react';
import './Checkout.css';

class Checkout extends Component{
    constructor(){
        super();
        this.state={
            verify: false,
            checker: null,
            voucher:'',
            item: {
                id: '',
                airtime: '',
                value:'',
                price:'',
                status:'',
                voucher:'',
            }
        }
    };

    onVerify = (verify) => {
        this.setState({verify: verify});
    }

    onCheck = (checker) => {
        this.setState({checker: checker});
    }

    onVerifyCheck = (e) =>{
        this.setState({voucher: e.target.value});
        
    }

    loadItems = (resp) => {
        this.setState({item: {
            id: resp.id,
            airtime: resp.airtime,
            value: resp.value,
            price: resp.price,
            status: resp.status,
            voucher: resp.voucher
        } })
    }
    
    onSubmitVoucher = () => {
        fetch('http://localhost:3000/verify', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                voucher: this.state.voucher
            })
        })
        .then(response => response.json())
        .then(item => {
            if(item){
                this.onVerify(true)
                this.onCheck(item)
                this.loadItems(item)
            }
        })  
    }

    render(){
        const { verify, checker } = this.state;
        const { id, airtime, value, price, status, voucher } = this.state.item;
        return(
            <>
                <div id="check_label">
                   <div>Check if voucher is authentic</div> 
                </div>
                
                <div className='input'>
                    <input type="text" name="check" id="check" 
                        placeholder="click here to check voucher's authenticity" 
                        onChange={this.onVerifyCheck}
                    />
                </div>
                <input type="submit" value="click here to check" id="checkB" onClick={this.onSubmitVoucher} />
                {verify === false ? 
                    <div>None</div>
                    : (
                        checker !== null ?
                        <div className='item_table'>
                            <div className="items">
                                <div className="item head id">S/N</div>
                                <div className="item head">airtime</div>
                                <div className="item head">value</div>
                                <div className="item head">price</div>
                                <div className="item head">status</div>
                                <div className="item head voer">voucher</div>
                            </div>
                            <div className="items">
                                <div className="item id">{id}</div>
                                <div className="item">{airtime}</div>
                                <div className="item">{value}</div>
                                <div className="item">{price}</div>
                                <div className="item" id="status_A">{status}</div>
                                <div className="item voer">{voucher}</div>
                            </div>
                        </div>  
                    :<></>)   
                }
            </>
        )
    }
}

export default Checkout;