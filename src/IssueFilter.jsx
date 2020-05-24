import React from 'react';
import { PropTypes } from 'prop-types'
import {Link} from 'react-router-dom';
export default class IssueFilter extends React.Component {
    constructor() {
        super();
    }


    render() {
        const Separator = () => <span> | </span>;
        return (
            <div>
                <Link to="/issues">All Issues </Link> 
                <Separator />
                <Link to="/issues?status=Open">Open Issues </Link> 
                <Separator />
                <Link to="/issues?status=Assigned">
                    Assigned Issues
                </Link> 
            </div>
        )
    }
}
