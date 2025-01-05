import React, { Component } from 'react';
import Category from './Category';
import Specialized from './Specialized';

class Home extends Component{
    constructor(){
        super();
        this.state = {
            home: 'category',
            vouch: []
        };
    }

    loadVouch = (data) => {
        this.setState({vouch: data})
      }

    onHomeChange = (home) => {
        this.setState({home: home});
    }

    render(){
        const { home, vouch } = this.state;
        return(
            <>
                { home === 'category' ? 
                    <Category loadVouch={this.loadVouch} 
                        onHomeChange={this.onHomeChange}   
                    /> 
                    : <Specialized 
                        vouch={vouch} onHomeChange={this.onHomeChange}  
                    />
                }
            </>
        )
    }
}

export default Home;