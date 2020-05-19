import React from 'react';
import { Link } from 'react-router-dom';
export default class IssueFilter extends React.Component {
    constructor() {
        super();
        this.clearFilter = this.clearFilter.bind(this);
        this.setFilterOpen = this.setFilterOpen.bind(this);
        this.setFilterAssigned = this.setFilterAssigned.bind(this);
    }

    setFilterOpen(e) {
        e.preventDefault();
        this.props.setFilter({ status : 'Open'});
    }

    setFilterAssigned(e) {
        e.preventDefault();
        this.props.setFilter({ status : 'Assigned' });
    }

    clearFilter(e) {
        e.preventDefault();
        this.props.setFilter();
    }

    render() {
        const Separator = () => <span> | </span>;
        return (
            <div>
                <Link to="/issues">All Issues</Link>
                <Separator />
                <Link to="/issues?status=Open">
                    Open Issues
                </Link>
                <Separator />
                <Link to="/issues?status=Assigned">
                    Assigned Issues
                </Link>
            </div>
        )
    }
}
