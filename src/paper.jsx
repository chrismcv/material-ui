import React, {Component} from 'react';
//import PureRenderMixin from 'react-addons-pure-render-mixin';
import PropTypes from './utils/prop-types';
import Transitions from './styles/transitions';
import getMuiTheme from './styles/getMuiTheme';
import look, {StyleSheet} from 'react-look';
const c = StyleSheet.combineStyles;

const styles = StyleSheet.create({
  main: {
    boxSizing: 'border-box',
  },
  stateBased: (props, state) => {
    const {
      circle,
      rounded,
      transitionEnabled,
      zDepth,
    } = props;

    const {
      baseTheme,
      paper,
    } = state.muiTheme;

    return {
      color: paper.color,
      backgroundColor: paper.backgroundColor,
      transition: transitionEnabled && Transitions.easeOut(),
      fontFamily: baseTheme.fontFamily,
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated)
      boxShadow: paper.zDepthShadows[zDepth - 1], // No shadow for 0 depth papers
      borderRadius: circle ? '50%' : rounded ? '2px' : '0px',
    };
  },
  override: (props) => props.style,
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
      style, // we don't want inline style to be applied directly?
      ...other,
    } = this.props;

    return (
      <div {...other} className={c(styles.main, styles.stateBased, className, styles.override)}>
        {children}
      </div>
    );
  }

}

export default look(Paper);
