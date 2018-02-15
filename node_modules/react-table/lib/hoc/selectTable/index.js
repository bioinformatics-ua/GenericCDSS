'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable */

var defaultSelectInputComponent = function defaultSelectInputComponent(props) {
  return _react2.default.createElement('input', {
    type: props.selectType || 'checkbox',
    checked: props.checked,
    onClick: function onClick(e) {
      var shiftKey = e.shiftKey;

      e.stopPropagation();
      props.onClick(props.id, shiftKey, props.row);
    },
    onChange: function onChange() {}
  });
};

exports.default = function (Component) {

  var wrapper = function (_React$Component) {
    _inherits(RTSelectTable, _React$Component);

    function RTSelectTable(props) {
      _classCallCheck(this, RTSelectTable);

      return _possibleConstructorReturn(this, (RTSelectTable.__proto__ || Object.getPrototypeOf(RTSelectTable)).call(this, props));
    }

    _createClass(RTSelectTable, [{
      key: 'rowSelector',
      value: function rowSelector(row) {
        if (!row || !row.hasOwnProperty(this.props.keyField)) return null;
        var _props = this.props,
            toggleSelection = _props.toggleSelection,
            selectType = _props.selectType,
            keyField = _props.keyField;

        var checked = this.props.isSelected(row[this.props.keyField]);
        var inputProps = {
          checked: checked,
          onClick: toggleSelection,
          selectType: selectType,
          id: row[keyField],
          row: row
        };
        return _react2.default.createElement(this.props.SelectInputComponent, inputProps);
      }
    }, {
      key: 'headSelector',
      value: function headSelector(row) {
        var selectType = this.props.selectType;

        if (selectType === 'radio') return null;

        var _props2 = this.props,
            toggleAll = _props2.toggleAll,
            checked = _props2.selectAll,
            SelectAllInputComponent = _props2.SelectAllInputComponent;

        var inputProps = {
          checked: checked,
          onClick: toggleAll,
          selectType: selectType
        };

        return _react2.default.createElement(SelectAllInputComponent, inputProps);
      }

      // this is so we can expose the underlying ReactTable to get at the sortedData for selectAll

    }, {
      key: 'getWrappedInstance',
      value: function getWrappedInstance() {
        if (!this.wrappedInstance) console.warn('RTSelectTable - No wrapped instance');
        if (this.wrappedInstance.getWrappedInstance) return this.wrappedInstance.getWrappedInstance();else return this.wrappedInstance;
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props3 = this.props,
            originalCols = _props3.columns,
            isSelected = _props3.isSelected,
            toggleSelection = _props3.toggleSelection,
            toggleAll = _props3.toggleAll,
            keyField = _props3.keyField,
            selectAll = _props3.selectAll,
            selectType = _props3.selectType,
            SelectAllInputComponent = _props3.SelectAllInputComponent,
            SelectInputComponent = _props3.SelectInputComponent,
            rest = _objectWithoutProperties(_props3, ['columns', 'isSelected', 'toggleSelection', 'toggleAll', 'keyField', 'selectAll', 'selectType', 'SelectAllInputComponent', 'SelectInputComponent']);

        var select = {
          id: '_selector',
          accessor: function accessor() {
            return 'x';
          }, // this value is not important
          Header: this.headSelector.bind(this),
          Cell: function Cell(ci) {
            return _this2.rowSelector.bind(_this2)(ci.original);
          },
          width: 30,
          filterable: false,
          sortable: false,
          resizable: false,
          style: { textAlign: 'center' }
        };
        var columns = [select].concat(_toConsumableArray(originalCols));
        var extra = {
          columns: columns
        };
        return _react2.default.createElement(Component, _extends({}, rest, extra, { ref: function ref(r) {
            return _this2.wrappedInstance = r;
          } }));
      }
    }]);

    return RTSelectTable;
  }(_react2.default.Component);

  wrapper.displayName = 'RTSelectTable';
  wrapper.defaultProps = {
    keyField: '_id',
    isSelected: function isSelected(key) {
      console.log('No isSelected handler provided:', { key: key });
    },
    selectAll: false,
    toggleSelection: function toggleSelection(key, shift, row) {
      console.log('No toggleSelection handler provided:', { key: key, shift: shift, row: row });
    },
    toggleAll: function toggleAll() {
      console.log('No toggleAll handler provided.');
    },
    selectType: 'check',
    SelectInputComponent: defaultSelectInputComponent,
    SelectAllInputComponent: defaultSelectInputComponent
  };

  return wrapper;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ob2Mvc2VsZWN0VGFibGUvaW5kZXguanMiXSwibmFtZXMiOlsiZGVmYXVsdFNlbGVjdElucHV0Q29tcG9uZW50IiwicHJvcHMiLCJzZWxlY3RUeXBlIiwiY2hlY2tlZCIsImUiLCJzaGlmdEtleSIsInN0b3BQcm9wYWdhdGlvbiIsIm9uQ2xpY2siLCJpZCIsInJvdyIsIkNvbXBvbmVudCIsIndyYXBwZXIiLCJoYXNPd25Qcm9wZXJ0eSIsImtleUZpZWxkIiwidG9nZ2xlU2VsZWN0aW9uIiwiaXNTZWxlY3RlZCIsImlucHV0UHJvcHMiLCJjcmVhdGVFbGVtZW50IiwiU2VsZWN0SW5wdXRDb21wb25lbnQiLCJ0b2dnbGVBbGwiLCJzZWxlY3RBbGwiLCJTZWxlY3RBbGxJbnB1dENvbXBvbmVudCIsIndyYXBwZWRJbnN0YW5jZSIsImNvbnNvbGUiLCJ3YXJuIiwiZ2V0V3JhcHBlZEluc3RhbmNlIiwib3JpZ2luYWxDb2xzIiwiY29sdW1ucyIsInJlc3QiLCJzZWxlY3QiLCJhY2Nlc3NvciIsIkhlYWRlciIsImhlYWRTZWxlY3RvciIsImJpbmQiLCJDZWxsIiwiY2kiLCJyb3dTZWxlY3RvciIsIm9yaWdpbmFsIiwid2lkdGgiLCJmaWx0ZXJhYmxlIiwic29ydGFibGUiLCJyZXNpemFibGUiLCJzdHlsZSIsInRleHRBbGlnbiIsImV4dHJhIiwiciIsImRpc3BsYXlOYW1lIiwiZGVmYXVsdFByb3BzIiwia2V5IiwibG9nIiwic2hpZnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7K2VBRkE7O0FBSUEsSUFBTUEsOEJBQThCLFNBQTlCQSwyQkFBOEIsQ0FBQ0MsS0FBRCxFQUFXO0FBQzdDLFNBQ0U7QUFDRSxVQUFNQSxNQUFNQyxVQUFOLElBQW9CLFVBRDVCO0FBRUUsYUFBU0QsTUFBTUUsT0FGakI7QUFHRSxhQUFTLGlCQUFDQyxDQUFELEVBQUs7QUFBQSxVQUNKQyxRQURJLEdBQ1NELENBRFQsQ0FDSkMsUUFE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ZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBkZWZhdWx0U2VsZWN0SW5wdXRDb21wb25lbnQgPSAocHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8aW5wdXQgXG4gICAgICB0eXBlPXtwcm9wcy5zZWxlY3RUeXBlIHx8ICdjaGVja2JveCd9IFxuICAgICAgY2hlY2tlZD17cHJvcHMuY2hlY2tlZH0gXG4gICAgICBvbkNsaWNrPXsoZSk9PntcbiAgICAgICAgY29uc3QgeyBzaGlmdEtleSB9ID0gZTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgcHJvcHMub25DbGljayhwcm9wcy5pZCwgc2hpZnRLZXksIHByb3BzLnJvdyk7XG4gICAgICB9fSBcbiAgICAgIG9uQ2hhbmdlPXsoKT0+e319ICBcbiAgICAvPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IChDb21wb25lbnQpID0+IHtcblxuICBjb25zdCB3cmFwcGVyID0gY2xhc3MgUlRTZWxlY3RUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcylcbiAgICB7XG4gICAgICBzdXBlcihwcm9wcyk7XG4gICAgfVxuXG4gICAgcm93U2VsZWN0b3Iocm93KSB7XG4gICAgICBpZighcm93IHx8ICFyb3cuaGFzT3duUHJvcGVydHkodGhpcy5wcm9wcy5rZXlGaWVsZCkpIHJldHVybiBudWxsO1xuICAgICAgY29uc3QgeyB0b2dnbGVTZWxlY3Rpb24sIHNlbGVjdFR5cGUsIGtleUZpZWxkIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3QgY2hlY2tlZCA9IHRoaXMucHJvcHMuaXNTZWxlY3RlZChyb3dbdGhpcy5wcm9wcy5rZXlGaWVsZF0pO1xuICAgICAgY29uc3QgaW5wdXRQcm9wcyA9IFxuICAgICAge1xuICAgICAgICBjaGVja2VkLFxuICAgICAgICBvbkNsaWNrOiB0b2dnbGVTZWxlY3Rpb24sXG4gICAgICAgIHNlbGVjdFR5cGUsXG4gICAgICAgIGlkOiByb3dba2V5RmllbGRdLFxuICAgICAgICByb3csXG4gICAgICB9XG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCh0aGlzLnByb3BzLlNlbGVjdElucHV0Q29tcG9uZW50LGlucHV0UHJvcHMpO1xuICAgIH1cblxuICAgIGhlYWRTZWxlY3Rvcihyb3cpIHtcbiAgICAgIGNvbnN0IHsgc2VsZWN0VHlwZSB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGlmIChzZWxlY3RUeXBlID09PSAncmFkaW8nKSByZXR1cm4gbnVsbDtcbiAgICAgIFxuICAgICAgY29uc3QgeyB0b2dnbGVBbGwsIHNlbGVjdEFsbDogY2hlY2tlZCwgU2VsZWN0QWxsSW5wdXRDb21wb25lbnQsIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3QgaW5wdXRQcm9wcyA9IFxuICAgICAge1xuICAgICAgICBjaGVja2VkLFxuICAgICAgICBvbkNsaWNrOiB0b2dnbGVBbGwsXG4gICAgICAgIHNlbGVjdFR5cGUsXG4gICAgICB9XG4gICAgICBcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFNlbGVjdEFsbElucHV0Q29tcG9uZW50LGlucHV0UHJvcHMpO1xuICAgIH1cbiAgICBcbiAgICAvLyB0aGlzIGlzIHNvIHdlIGNhbiBleHBvc2UgdGhlIHVuZGVybHlpbmcgUmVhY3RUYWJsZSB0byBnZXQgYXQgdGhlIHNvcnRlZERhdGEgZm9yIHNlbGVjdEFsbFxuICAgIGdldFdyYXBwZWRJbnN0YW5jZSgpIHtcbiAgICAgIGlmICghdGhpcy53cmFwcGVkSW5zdGFuY2UpIGNvbnNvbGUud2FybignUlRTZWxlY3RUYWJsZSAtIE5vIHdyYXBwZWQgaW5zdGFuY2UnKTtcbiAgICAgIGlmICh0aGlzLndyYXBwZWRJbnN0YW5jZS5nZXRXcmFwcGVkSW5zdGFuY2UpIHJldHVybiB0aGlzLndyYXBwZWRJbnN0YW5jZS5nZXRXcmFwcGVkSW5zdGFuY2UoKTtcbiAgICAgIGVsc2UgcmV0dXJuIHRoaXMud3JhcHBlZEluc3RhbmNlXG4gICAgfVxuXG4gICAgcmVuZGVyKClcbiAgICB7XG4gICAgICBjb25zdCB7IFxuICAgICAgICBjb2x1bW5zOm9yaWdpbmFsQ29scywgaXNTZWxlY3RlZCwgdG9nZ2xlU2VsZWN0aW9uLCB0b2dnbGVBbGwsIGtleUZpZWxkLCBzZWxlY3RBbGwsIFxuICAgICAgICBzZWxlY3RUeXBlLCBTZWxlY3RBbGxJbnB1dENvbXBvbmVudCwgU2VsZWN0SW5wdXRDb21wb25lbnQsXG4gICAgICAgIC4uLnJlc3QgXG4gICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IHNlbGVjdCA9IHtcbiAgICAgICAgaWQ6ICdfc2VsZWN0b3InLFxuICAgICAgICBhY2Nlc3NvcjogKCk9Pid4JywgLy8gdGhpcyB2YWx1ZSBpcyBub3QgaW1wb3J0YW50XG4gICAgICAgIEhlYWRlcjogdGhpcy5oZWFkU2VsZWN0b3IuYmluZCh0aGlzKSxcbiAgICAgICAgQ2VsbDogKGNpKSA9PiB7IHJldHVybiB0aGlzLnJvd1NlbGVjdG9yLmJpbmQodGhpcykoY2kub3JpZ2luYWwpOyB9LFxuICAgICAgICB3aWR0aDogMzAsXG4gICAgICAgIGZpbHRlcmFibGU6IGZhbHNlLFxuICAgICAgICBzb3J0YWJsZTogZmFsc2UsXG4gICAgICAgIHJlc2l6YWJsZTogZmFsc2UsXG4gICAgICAgIHN0eWxlOiB7IHRleHRBbGlnbjogJ2NlbnRlcicgfSxcbiAgICAgIH1cbiAgICAgIGNvbnN0IGNvbHVtbnMgPSBbXG4gICAgICAgIHNlbGVjdCxcbiAgICAgICAgLi4ub3JpZ2luYWxDb2xzLFxuICAgICAgXTtcbiAgICAgIGNvbnN0IGV4dHJhID0ge1xuICAgICAgICBjb2x1bW5zLFxuICAgICAgfTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDb21wb25lbnQgey4uLnJlc3R9IHsuLi5leHRyYX0gcmVmPXsocik9PnRoaXMud3JhcHBlZEluc3RhbmNlPXJ9Lz5cbiAgICAgIClcbiAgICB9XG4gIH1cblxuICB3cmFwcGVyLmRpc3BsYXlOYW1lID0gJ1JUU2VsZWN0VGFibGUnO1xuICB3cmFwcGVyLmRlZmF1bHRQcm9wcyA9IFxuICB7XG4gICAga2V5RmllbGQ6ICdfaWQnLFxuICAgIGlzU2VsZWN0ZWQ6IChrZXkpPT57IGNvbnNvbGUubG9nKCdObyBpc1NlbGVjdGVkIGhhbmRsZXIgcHJvdmlkZWQ6Jyx7a2V5fSl9LFxuICAgIHNlbGVjdEFsbDogZmFsc2UsXG4gICAgdG9nZ2xlU2VsZWN0aW9uOiAoa2V5LCBzaGlmdCwgcm93KT0+eyBjb25zb2xlLmxvZygnTm8gdG9nZ2xlU2VsZWN0aW9uIGhhbmRsZXIgcHJvdmlkZWQ6JywgeyBrZXksIHNoaWZ0LCByb3cgfSkgfSxcbiAgICB0b2dnbGVBbGw6ICgpID0+IHsgY29uc29sZS5sb2coJ05vIHRvZ2dsZUFsbCBoYW5kbGVyIHByb3ZpZGVkLicpIH0sXG4gICAgc2VsZWN0VHlwZTogJ2NoZWNrJyxcbiAgICBTZWxlY3RJbnB1dENvbXBvbmVudDogZGVmYXVsdFNlbGVjdElucHV0Q29tcG9uZW50LFxuICAgIFNlbGVjdEFsbElucHV0Q29tcG9uZW50OiBkZWZhdWx0U2VsZWN0SW5wdXRDb21wb25lbnQsXG4gIH1cbiAgXG4gIHJldHVybiB3cmFwcGVyO1xufVxuIl19