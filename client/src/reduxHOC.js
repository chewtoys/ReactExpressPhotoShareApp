import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withStyles} from '@material-ui/core/styles';
import {compose} from 'redux';
export default function (ComposedComponent, mapStatetoProps, actionsCreators, styles) {
    class ReduxContainer extends Component {
        constructor(props) {
            super(props);
            const {dispatch} = props;
            this.boundActionCreators = bindActionCreators(actionsCreators, dispatch);

        }

        render() {
            return (<ComposedComponent {...this.props} {...this.boundActionCreators}/>)
        }

    }

    return compose(connect(mapStatetoProps, actionsCreators), withStyles(styles))((ReduxContainer))

}
