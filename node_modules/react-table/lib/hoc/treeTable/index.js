'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable */

exports.default = function (Component) {
  var _class, _temp, _initialiseProps;

  var wrapper = (_temp = _class = function (_React$Component) {
    _inherits(RTTreeTable, _React$Component);

    function RTTreeTable(props) {
      _classCallCheck(this, RTTreeTable);

      var _this = _possibleConstructorReturn(this, (RTTreeTable.__proto__ || Object.getPrototypeOf(RTTreeTable)).call(this, props));

      _initialiseProps.call(_this);

      _this.getWrappedInstance.bind(_this);
      _this.TrComponent.bind(_this);
      _this.getTrProps.bind(_this);
      return _this;
    }

    // this is so we can expose the underlying ReactTable to get at the sortedData for selectAll


    _createClass(RTTreeTable, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props = this.props,
            columns = _props.columns,
            treeTableIndent = _props.treeTableIndent,
            rest = _objectWithoutProperties(_props, ['columns', 'treeTableIndent']);

        var TrComponent = this.TrComponent,
            getTrProps = this.getTrProps;

        var extra = {
          columns: columns.map(function (col) {
            var column = col;
            if (rest.pivotBy && rest.pivotBy.includes(col.accessor)) {
              column = {
                accessor: col.accessor,
                width: treeTableIndent + 'px',
                show: false,
                Header: ''
              };
            }
            return column;
          }),
          TrComponent: TrComponent,
          getTrProps: getTrProps
        };

        return _react2.default.createElement(Component, _extends({}, rest, extra, { ref: function ref(r) {
            return _this2.wrappedInstance = r;
          } }));
      }
    }]);

    return RTTreeTable;
  }(_react2.default.Component), _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.getWrappedInstance = function () {
      if (!_this3.wrappedInstance) console.warn('RTTreeTable - No wrapped instance');
      if (_this3.wrappedInstance.getWrappedInstance) return _this3.wrappedInstance.getWrappedInstance();else return _this3.wrappedInstance;
    };

    this.TrComponent = function (props) {
      var ri = props.ri,
          rest = _objectWithoutProperties(props, ['ri']);

      if (ri && ri.groupedByPivot) {
        var cell = _extends({}, props.children[ri.level]);

        cell.props.style.flex = 'unset';
        cell.props.style.width = '100%';
        cell.props.style.maxWidth = 'unset';
        cell.props.style.paddingLeft = _this3.props.treeTableIndent * ri.level + 'px';
        // cell.props.style.backgroundColor = '#DDD';
        cell.props.style.borderBottom = '1px solid rgba(128,128,128,0.2)';

        return _react2.default.createElement(
          'div',
          { className: 'rt-tr ' + rest.className, style: rest.style },
          cell
        );
      }
      return _react2.default.createElement(Component.defaultProps.TrComponent, rest);
    };

    this.getTrProps = function (state, ri, ci, instance) {
      return { ri: ri };
    };
  }, _temp);
  wrapper.displayName = 'RTTreeTable';
  wrapper.defaultProps = {
    treeTableIndent: 10
  };

  return wrapper;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ob2MvdHJlZVRhYmxlL2luZGV4LmpzIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIndyYXBwZXIiLCJwcm9wcyIsImdldFdyYXBwZWRJbnN0YW5jZSIsImJpbmQiLCJUckNvbXBvbmVudCIsImdldFRyUHJvcHMiLCJjb2x1bW5zIiwidHJlZVRhYmxlSW5kZW50IiwicmVzdCIsImV4dHJhIiwibWFwIiwiY29sIiwiY29sdW1uIiwicGl2b3RCeSIsImluY2x1ZGVzIiwiYWNjZXNzb3IiLCJ3aWR0aCIsInNob3ciLCJIZWFkZXIiLCJ3cmFwcGVkSW5zdGFuY2UiLCJyIiwiY29uc29sZSIsIndhcm4iLCJyaSIsImdyb3VwZWRCeVBpdm90IiwiY2VsbCIsImNoaWxkcmVuIiwibGV2ZWwiLCJzdHlsZSIsImZsZXgiLCJtYXhXaWR0aCIsInBhZGRpbmdMZWZ0IiwiYm9yZGVyQm90dG9tIiwiY2xhc3NOYW1lIiwic3RhdGUiLCJjaSIsImluc3RhbmNlIiwiZGlzcGxheU5hbWUiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7Ozs7OytlQUZBOztrQkFJZSxVQUFDQSxTQUFELEVBQWU7QUFBQTs7QUFDNUIsTUFBTUM7QUFBQTs7QUFFSix5QkFBWUMsS0FBWixFQUNBO0FBQUE7O0FBQUEsNEhBQ1FBLEtBRFI7O0FBQUE7O0FBRUUsWUFBS0Msa0JBQUwsQ0FBd0JDLElBQXhCO0FBQ0EsWUFBS0MsV0FBTCxDQUFpQkQsSUFBakI7QUFDQSxZQUFLRSxVQUFMLENBQWdCRixJQUFoQjtBQUpGO0FBS0M7O0FBRUQ7OztBQVZJO0FBQUE7QUFBQSwrQkF5Q0s7QUFBQTs7QUFBQSxxQkFDdUMsS0FBS0YsS0FENUM7QUFBQSxZQUNDSyxPQURELFVBQ0NBLE9BREQ7QUFBQSxZQUNVQyxlQURWLFVBQ1VBLGVBRFY7QUFBQSxZQUM4QkMsSUFEOUI7O0FBQUEsWUFFQ0osV0FGRCxHQUU2QixJQUY3QixDQUVDQSxXQUZEO0FBQUEsWUFFY0MsVUFGZCxHQUU2QixJQUY3QixDQUVjQSxVQUZkOztBQUdQLFlBQU1JLFFBQVE7QUFDWkgsbUJBQVNBLFFBQVFJLEdBQVIsQ0FBWSxVQUFDQyxHQUFELEVBQU87QUFDMUIsZ0JBQUlDLFNBQVNELEdBQWI7QUFDQSxnQkFBR0gsS0FBS0ssT0FBTCxJQUFnQkwsS0FBS0ssT0FBTCxDQUFhQyxRQUFiLENBQXNCSCxJQUFJSSxRQUExQixDQUFuQixFQUNBO0FBQ0VILHVCQUFTO0FBQ1BHLDBCQUFVSixJQUFJSSxRQURQO0FBRVBDLHVCQUFVVCxlQUFWLE9BRk87QUFHUFUsc0JBQU0sS0FIQztBQUlQQyx3QkFBUTtBQUpELGVBQVQ7QUFNRDtBQUNELG1CQUFPTixNQUFQO0FBQ0QsV0FaUSxDQURHO0FBY1pSLGtDQWRZO0FBZVpDO0FBZlksU0FBZDs7QUFrQkEsZUFDRSw4QkFBQyxTQUFELGVBQWVHLElBQWYsRUFBeUJDLEtBQXpCLElBQWdDLEtBQU07QUFBQSxtQkFBSyxPQUFLVSxlQUFMLEdBQXFCQyxDQUExQjtBQUFBLFdBQXRDLElBREY7QUFHRDtBQWpFRzs7QUFBQTtBQUFBLElBQW9DLGdCQUFNckIsU0FBMUM7QUFBQTs7QUFBQSxTQVdKRyxrQkFYSSxHQVdpQixZQUFNO0FBQ3pCLFVBQUksQ0FBQyxPQUFLaUIsZUFBVixFQUEyQkUsUUFBUUMsSUFBUixDQUFhLG1DQUFiO0FBQzNCLFVBQUksT0FBS0gsZUFBTCxDQUFxQmpCLGtCQUF6QixFQUE2QyxPQUFPLE9BQUtpQixlQUFMLENBQXFCakIsa0JBQXJCLEVBQVAsQ0FBN0MsS0FDSyxPQUFPLE9BQUtpQixlQUFaO0FBQ04sS0FmRzs7QUFBQSxTQWlCSmYsV0FqQkksR0FpQlUsVUFBQ0gsS0FBRCxFQUFXO0FBQUEsVUFFckJzQixFQUZxQixHQUluQnRCLEtBSm1CLENBRXJCc0IsRUFGcUI7QUFBQSxVQUdsQmYsSUFIa0IsNEJBSW5CUCxLQUptQjs7QUFLdkIsVUFBR3NCLE1BQU1BLEdBQUdDLGNBQVosRUFBNEI7QUFDMUIsWUFBTUMsb0JBQVd4QixNQUFNeUIsUUFBTixDQUFlSCxHQUFHSSxLQUFsQixDQUFYLENBQU47O0FBRUFGLGFBQUt4QixLQUFMLENBQVcyQixLQUFYLENBQWlCQyxJQUFqQixHQUF3QixPQUF4QjtBQUNBSixhQUFLeEIsS0FBTCxDQUFXMkIsS0FBWCxDQUFpQlosS0FBakIsR0FBeUIsTUFBekI7QUFDQVMsYUFBS3hCLEtBQUwsQ0FBVzJCLEtBQVgsQ0FBaUJFLFFBQWpCLEdBQTRCLE9BQTVCO0FBQ0FMLGFBQUt4QixLQUFMLENBQVcyQixLQUFYLENBQWlCRyxXQUFqQixHQUFrQyxPQUFLOUIsS0FBTCxDQUFXTSxlQUFYLEdBQTJCZ0IsR0FBR0ksS0FBaEU7QUFDQTtBQUNBRixhQUFLeEIsS0FBTCxDQUFXMkIsS0FBWCxDQUFpQkksWUFBakIsR0FBZ0MsaUNBQWhDOztBQUVBLGVBQU87QUFBQTtBQUFBLFlBQUssc0JBQW9CeEIsS0FBS3lCLFNBQTlCLEVBQTJDLE9BQU96QixLQUFLb0IsS0FBdkQ7QUFBK0RIO0FBQS9ELFNBQVA7QUFDRDtBQUNELGFBQU8sOEJBQUMsU0FBRCxDQUFXLFlBQVgsQ0FBd0IsV0FBeEIsRUFBd0NqQixJQUF4QyxDQUFQO0FBQ0QsS0FuQ0c7O0FBQUEsU0FxQ0pILFVBckNJLEdBcUNTLFVBQUM2QixLQUFELEVBQU9YLEVBQVAsRUFBVVksRUFBVixFQUFhQyxRQUFiLEVBQTBCO0FBQ3JDLGFBQU8sRUFBQ2IsTUFBRCxFQUFQO0FBQ0QsS0F2Q0c7QUFBQSxXQUFOO0FBbUVBdkIsVUFBUXFDLFdBQVIsR0FBc0IsYUFBdEI7QUFDQXJDLFVBQVFzQyxZQUFSLEdBQ0E7QUFDRS9CLHFCQUFpQjtBQURuQixHQURBOztBQUtBLFNBQU9QLE9BQVA7QUFDRCxDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5leHBvcnQgZGVmYXVsdCAoQ29tcG9uZW50KSA9PiB7XG4gIGNvbnN0IHdyYXBwZXIgPSBjbGFzcyBSVFRyZWVUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgXG4gICAgY29uc3RydWN0b3IocHJvcHMpXG4gICAge1xuICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgdGhpcy5nZXRXcmFwcGVkSW5zdGFuY2UuYmluZCh0aGlzKTtcbiAgICAgIHRoaXMuVHJDb21wb25lbnQuYmluZCh0aGlzKTtcbiAgICAgIHRoaXMuZ2V0VHJQcm9wcy5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIC8vIHRoaXMgaXMgc28gd2UgY2FuIGV4cG9zZSB0aGUgdW5kZXJseWluZyBSZWFjdFRhYmxlIHRvIGdldCBhdCB0aGUgc29ydGVkRGF0YSBmb3Igc2VsZWN0QWxsXG4gICAgZ2V0V3JhcHBlZEluc3RhbmNlID0gKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLndyYXBwZWRJbnN0YW5jZSkgY29uc29sZS53YXJuKCdSVFRyZWVUYWJsZSAtIE5vIHdyYXBwZWQgaW5zdGFuY2UnKTtcbiAgICAgIGlmICh0aGlzLndyYXBwZWRJbnN0YW5jZS5nZXRXcmFwcGVkSW5zdGFuY2UpIHJldHVybiB0aGlzLndyYXBwZWRJbnN0YW5jZS5nZXRXcmFwcGVkSW5zdGFuY2UoKTtcbiAgICAgIGVsc2UgcmV0dXJuIHRoaXMud3JhcHBlZEluc3RhbmNlXG4gICAgfVxuXG4gICAgVHJDb21wb25lbnQgPSAocHJvcHMpID0+IHtcbiAgICAgIGNvbnN0IHsgXG4gICAgICAgIHJpLFxuICAgICAgICAuLi5yZXN0IFxuICAgICAgfSA9IHByb3BzO1xuICAgICAgaWYocmkgJiYgcmkuZ3JvdXBlZEJ5UGl2b3QpIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IHsuLi5wcm9wcy5jaGlsZHJlbltyaS5sZXZlbF19O1xuICAgICAgICBcbiAgICAgICAgY2VsbC5wcm9wcy5zdHlsZS5mbGV4ID0gJ3Vuc2V0JztcbiAgICAgICAgY2VsbC5wcm9wcy5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICAgICAgY2VsbC5wcm9wcy5zdHlsZS5tYXhXaWR0aCA9ICd1bnNldCc7XG4gICAgICAgIGNlbGwucHJvcHMuc3R5bGUucGFkZGluZ0xlZnQgPSBgJHt0aGlzLnByb3BzLnRyZWVUYWJsZUluZGVudCpyaS5sZXZlbH1weGA7XG4gICAgICAgIC8vIGNlbGwucHJvcHMuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNEREQnO1xuICAgICAgICBjZWxsLnByb3BzLnN0eWxlLmJvcmRlckJvdHRvbSA9ICcxcHggc29saWQgcmdiYSgxMjgsMTI4LDEyOCwwLjIpJztcbiAgICAgICAgXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT17YHJ0LXRyICR7cmVzdC5jbGFzc05hbWV9YH0gc3R5bGU9e3Jlc3Quc3R5bGV9PntjZWxsfTwvZGl2PjtcbiAgICAgIH1cbiAgICAgIHJldHVybiA8Q29tcG9uZW50LmRlZmF1bHRQcm9wcy5UckNvbXBvbmVudCB7Li4ucmVzdH0gLz47XG4gICAgfVxuXG4gICAgZ2V0VHJQcm9wcyA9IChzdGF0ZSxyaSxjaSxpbnN0YW5jZSkgPT4ge1xuICAgICAgcmV0dXJuIHtyaX07XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgY29uc3QgeyBjb2x1bW5zLCB0cmVlVGFibGVJbmRlbnQsIC4uLnJlc3QgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCB7IFRyQ29tcG9uZW50LCBnZXRUclByb3BzIH0gPSB0aGlzO1xuICAgICAgY29uc3QgZXh0cmEgPSB7XG4gICAgICAgIGNvbHVtbnM6IGNvbHVtbnMubWFwKChjb2wpPT57XG4gICAgICAgICAgbGV0IGNvbHVtbiA9IGNvbDtcbiAgICAgICAgICBpZihyZXN0LnBpdm90QnkgJiYgcmVzdC5waXZvdEJ5LmluY2x1ZGVzKGNvbC5hY2Nlc3NvcikpXG4gICAgICAgICAge1xuICAgICAgICAgICAgY29sdW1uID0ge1xuICAgICAgICAgICAgICBhY2Nlc3NvcjogY29sLmFjY2Vzc29yLFxuICAgICAgICAgICAgICB3aWR0aDogYCR7dHJlZVRhYmxlSW5kZW50fXB4YCxcbiAgICAgICAgICAgICAgc2hvdzogZmFsc2UsXG4gICAgICAgICAgICAgIEhlYWRlcjogJycsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBjb2x1bW47XG4gICAgICAgIH0pLFxuICAgICAgICBUckNvbXBvbmVudCxcbiAgICAgICAgZ2V0VHJQcm9wcyxcbiAgICAgIH07XG4gICAgICBcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDb21wb25lbnQgey4uLnJlc3R9IHsuLi5leHRyYX0gcmVmPXsgciA9PiB0aGlzLndyYXBwZWRJbnN0YW5jZT1yIH0vPlxuICAgICAgKVxuICAgIH1cbiAgfVxuICB3cmFwcGVyLmRpc3BsYXlOYW1lID0gJ1JUVHJlZVRhYmxlJztcbiAgd3JhcHBlci5kZWZhdWx0UHJvcHMgPSBcbiAge1xuICAgIHRyZWVUYWJsZUluZGVudDogMTAsXG4gIH1cbiAgXG4gIHJldHVybiB3cmFwcGVyO1xufVxuIl19