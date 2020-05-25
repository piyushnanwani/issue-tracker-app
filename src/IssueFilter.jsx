import React from 'react';
import { PropTypes } from 'prop-types'
import {Link} from 'react-router-dom';
export default class IssueFilter extends React.Component {
    constructor() {
        super();
    }


    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">Select Filter</a>
                    </div>
                    <ul className="nav navbar-nav">
                        <li className="active">
                            
                            <Link to="/issues">All Issues </Link> 
                            
                        </li>
                        
                        <li>
                            <Link to="/issues?status=Open">Open Issues </Link> 
                        </li>
                        
                        <li>
                            <Link to="/issues?status=Assigned">
                                Assigned Issues
                            </Link> 
                        </li>
                    </ul>
                </div>

            </nav>
        )
    }
}
