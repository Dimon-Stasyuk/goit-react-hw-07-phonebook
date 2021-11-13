import PropTypes from "prop-types";
import React from "react";
import { filterChange } from "../redux/contacts/contacts-actions";
import { connect } from "react-redux";
import { getFilter } from "../redux/contacts/contacts-selectors";
import "./Filter.css";

const Filter = ({ filter, filterChange }) => {
  return (
    <div className='filter-container'>
      <label className='filter-lable'>
        Find contacts by name
        <input
          className='filter-input'
          value={filter}
          onChange={filterChange}
          type='text'
          name='filter'
          required
        />
      </label>
    </div>
  );
};

const mapStateToProps = (state) => ({
  filter: getFilter(state),
});

const mapDispatchToProps = (dispatch) => ({
  filterChange: (event) => dispatch(filterChange(event.target.value)),
});

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  filterChange: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
