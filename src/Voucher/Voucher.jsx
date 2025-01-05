import React from 'react';
import { Component } from 'react';
import './Voucher.css';

class Voucher extends Component{
    constructor(props){
      super(props);
      this.state = {
        modal: 'hide',
        numVoucher: 0,
        airtime:'',
        price: 0,
        value: ''
      }
    }

    onModalChange = (modal) => {
        this.setState({modal: modal});
    }

    onNumVoucher = (e) => {
        this.setState({numVoucher: e.target.value});
    }

    onAirtimeChange = (e) => {
        this.setState({airtime: e.target.value});
    }

    onPriceChange = (e) => {
        this.setState({price: e.target.value});
    }

    onValueChange = (e) => {
        this.setState({value: e.target.value});
    }

    onCreateVoucher = () => {
        let { numVoucher } = this.state;
        while (numVoucher > 0) {
            fetch('http://localhost:3000/create-voucher', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    airtime: this.state.airtime,
                    price: this.state.price,
                    value: this.state.value
                })
            })
            .then(response => response.json())
            .then(voucher => {
                if(voucher){
                    this.props.onVoucher()
                    this.onModalChange('hide')
                }
            })
            numVoucher--
        }
    }

    onUsedStatus = (voucher) => {
        fetch('http://localhost:3000/update-status', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                voucher: voucher
            })
        })
        .then(response => response.json())
        .then(voucher => {
            if(voucher){
                this.props.onVoucher()
            }
        })
    }

    render(){
        const { modal } = this.state;
        const { vouchers } = this.props;
        return(
            <>
                <div className='voucher-container'>
                    <div className="create_voucher" onClick={()=> this.onModalChange('show')}><p>create voucher</p></div>
                    <div className="item_table">
                        <div className="items">
                            <div className="item head id">S/N</div>
                            <div className="item head">airtime</div>
                            <div className="item head">value</div>
                            <div className="item head">price</div>
                            <div className="item head">status</div>
                            <div className="item head voer">voucher</div>
                        </div>
                        {vouchers.map((vouch, i) => {
                            return(
                                <div className="items" key={vouchers[i].voucher}>
                                    <div className="item id">{vouchers[i].id}</div>
                                    <div className="item">{vouchers[i].airtime}</div>
                                    <div className="item">{vouchers[i].value}</div>
                                    <div className="item">{vouchers[i].price}</div>
                                    <div className="item" id="status_A"
                                        onClick={()=> this.onUsedStatus(vouchers[i].voucher)}  
                                    >{vouchers[i].status}</div>
                                    <div className="item voer">{vouchers[i].voucher}</div>
                                </div>
                            );  
                        })}
                    </div>
                </div>
                <div>
                    { modal === 'hide' ? <></> :
                        <div className="modal-container" id="modal_container">
                            <div className="modal">
                                <h1>Create Voucher</h1>
                                <div>
                                    <label htmlFor="number_of_voucher">Number of vouchers to create:</label><br/>
                                    <input type="number" name="number" id=""
                                        onChange={this.onNumVoucher}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="airtime">Insert Airtime:</label><br/>
                                    <input 
                                        type="radio" name="airtime" id="" value={'airtel'} 
                                        onChange={this.onAirtimeChange}
                                    />Airtel
                                    <input 
                                        type="radio" name="airtime" id="" value={'mtn'}
                                        onChange={this.onAirtimeChange}
                                    />Mtn
                                    <input 
                                        type="radio"  name="airtime" id="" value={'glo'}
                                        onChange={this.onAirtimeChange}
                                    />Glo
                                </div>
                                <div>
                                    <label htmlFor="price">Insert Price:</label><br/>
                                    <input type="radio" name="price" id="" value={1000}
                                        onChange={this.onPriceChange}
                                    />1000
                                    <input type="radio" name="price" id="" value={2000}
                                        onChange={this.onPriceChange}
                                    />2000
                                    <input type="radio" name="price" id="" value={3000}
                                        onChange={this.onPriceChange}
                                    />3000
                                </div>
                                <div>
                                    <label htmlFor="airtime">Insert Value:</label><br/>
                                    <input type="radio" name="value" id="" value={'1 gigabyte'}
                                        onChange={this.onValueChange}
                                    />1 gigabyte
                                    <input type="radio" name="value" id="" value={'2 gigabyte'}
                                        onChange={this.onValueChange}
                                    />2 gigabyte
                                    <input type="radio" name="value" id="" value={'3 gigabyte'}
                                        onChange={this.onValueChange}
                                    />3 gigabyte
                                </div>
                                <button className="create_voucher create" onClick={this.onCreateVoucher}>create</button>
                            </div>
                        </div>
                    }
                </div>
            </>
        )
    }   
}
export default Voucher;