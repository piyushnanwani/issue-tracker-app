import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

export default class IssueEdit extends React.Component
{ 
    render(){
        return (
            <div> 
                <p>
                This is a placeholder for the editing issue
                { this.props.params.id }
                </p>
                <Link to="/issues">back to issue list</Link>
            </div>
        );
    }

}

IssueEdit.propTypes = {
    params: PropTypes.object.isRequired,
};