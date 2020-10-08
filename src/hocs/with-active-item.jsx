import React, { PureComponent } from "react";
import PropTypes from "prop-types";

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: props.defaultActiveItem,
      };
    }

    componentDidUpdate(prevProps) {
      this.setDefaultState(prevProps);
    }

    onItemClickHandler(item) {
      this.setState({
        activeItem: item,
      });
    }

    setDefaultState(prevProps) {
      const { defaultActiveItem } = this.props;
      if (prevProps !== this.props) {
        this.setState({ activeItem: defaultActiveItem });
      }
    }

    render() {
      const { activeItem } = this.state;
      return (
        <Component
          {...this.props}
          activeItem={activeItem}
          onItemClickHandler={this.onItemClickHandler}
        />
      );
    }
  }

  withActiveItem.PropTypes = {
    defaultActiveItem: PropTypes.string.isRequired,
  };

  return WithActiveItem;
};

export default withActiveItem;

// Для списка жанров и навбар+инфа со страницы фильма (вынести в отдельный компонент).
