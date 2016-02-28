import React, {Component} from 'react';
//import PureRenderMixin from 'react-addons-pure-render-mixin';
import PropTypes from './utils/prop-types';
import Transitions from './styles/transitions';
import getMuiTheme from './styles/getMuiTheme';
import look, {StyleSheet} from 'react-look';
const c = StyleSheet.combineStyles;

const styles = StyleSheet.create({
  root: {
    backgroundColor: (props, {muiTheme}) => muiTheme.paper.backgroundColor,
    borderRadius: ({circle, rounded}) => circle ? '50%' : rounded ? '2px' : '0px',
    boxShadow: ({zDepth}, {muiTheme}) => muiTheme.paper.zDepthShadows[zDepth - 1], // No shadow for 0 depth papers
    boxSizing: 'border-box',
    color: (props, {muiTheme}) => muiTheme.paper.color,
    fontFamily: (props, {muiTheme}) => muiTheme.baseTheme.fontFamily,
    transition: ({transitionEnabled}) => transitionEnabled && Transitions.easeOut(),
    WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated)
  },
});

class Paper extends Component {

  static propTypes = {
    /**
     * Children passed into the paper element.
     */
    children: React.PropTypes.node,

    /**
     * Set to true to generate a circlular paper container.
     */
    circle: React.PropTypes.bool,

    /**
     * className as per standard react convention
     */
    className: React.PropTypes.string,

    /**
     * By default, the paper container will have a border radius.
     * Set this to false to generate a container with sharp corners.
     */
    rounded: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * Set to false to disable CSS transitions for the paper element.
     */
    transitionEnabled: React.PropTypes.bool,

    /**
     * This number represents the zDepth of the paper shadow.
     */
    zDepth: PropTypes.zDepth,
  };

  static contextTypes = {
    muiTheme: React.PropTypes.object,
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object,
  };


  static defaultProps = {
    circle: false,
    rounded: true,
    transitionEnabled: true,
    zDepth: 1,
  };

  state = {
    muiTheme: this.context.muiTheme || getMuiTheme(),
  };

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });
  }

  render() {
    const {
      children,
      className,
      ...other,
    } = this.props;

    return (
      <div {...other} className={c(styles.root, className)}>
        {children}
      </div>
    );
  }

}

export {Paper};
export default look(Paper);
