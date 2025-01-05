import React, { Component } from 'react';
import './Dashboard.css';

class Dashboard extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const { usedVouchers, sum, count } = this.props;
        return(
            <>
                <div className="big_title"><h1>Sales Summary</h1></div>
                <div className="sales_summary">
                    <div className="units">
                        <div><p>Total Sales</p></div>
                        <div className="value"><p>{count}</p></div>
                    </div>
                    <div className="units">
                        <div><p>Value</p></div>
                        <div className="value"><p>{sum}</p></div>
                    </div>
                </div>
                <div className="big_title"><h1>Transactions</h1></div>
                <div className="transactions">
                    <div className="items">
                        <div className="item head id">S/N</div>
                        <div className="item head">airtime</div>
                        <div className="item head">value</div>
                        <div className="item head">price</div>
                        <div className="item head">status</div>
                        <div className="item head voer">voucher</div>
                    </div>
                    {usedVouchers.map((vouch, i) => {
                        return(
                            <div className="items" key={usedVouchers[i].voucher}>
                                <div className="item id">{usedVouchers[i].id}</div>
                                <div className="item">{usedVouchers[i].airtime}</div>
                                <div className="item">{usedVouchers[i].value}</div>
                                <div className="item">{usedVouchers[i].price}</div>
                                <div className="item" id="status_U">{usedVouchers[i].status}</div>
                                <div className="item voer">{usedVouchers[i].voucher}</div>
                            </div>
                        );  
                    })}
                </div>
            </>
        )
    }
}

export default Dashboard;