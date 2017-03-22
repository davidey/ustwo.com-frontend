import React, { Component } from 'react';
import classnames from 'classnames';
import PageLoader from 'app/components/page-loader';
import HomeLoader from 'app/components/home-loader';

class LoaderWrapper extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hide: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loaded) {
      setTimeout(() => {
        this.setState({ hide: true });
      }.bind(this), 500);
    }
  }

  render() {
    const { currentPage, homeLoaderShown, loaded, viewportDimensions , heightStyle} = this.props;

    let renderLoader;
    if (this.state.hide) {
      renderLoader = (<div />);
    } else {
      if (currentPage === 'home' && !homeLoaderShown) {
        renderLoader = (<HomeLoader heightStyle={heightStyle} />);
      } else {
        renderLoader = (<PageLoader heightStyle={heightStyle} key="loader" pageId={currentPage} />);
      }
    }

    const classes = classnames('loader-wrapper', `loader-wrapper-${currentPage}`, {
      hide: loaded
    });

    return (
      <div className={classes} style={heightStyle}>
        {renderLoader}
      </div>
    );
  }
};

export default LoaderWrapper;
