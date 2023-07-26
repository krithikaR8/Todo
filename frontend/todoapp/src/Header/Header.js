import React, { Component } from 'react';
import "../Style/Header.css"
import {Card, Col,Row ,Button} from 'react-bootstrap'; 
class Header extends Component {
    render() {
        return (
            <Card>
            <div className='box'>
             <button className='loginbut'>Logout</button>
                </div>
                </Card>
        );
    }
}

export default Header;