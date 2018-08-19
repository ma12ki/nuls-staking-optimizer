import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

import defaultValues from "../defaultInputValues";
import "./Inputs.css";

class Inputs extends React.PureComponent {
  state = {
    values: defaultValues,
    errors: {}
  };

  normalizeInputAttrs = target => {
    let { name, min, max, step, value, required } = target;
    min = Number(min);
    max = Number(max);
    step = Number(step);
    value = value == null || value == "" ? "" : Number(value);
    required = Boolean(required);

    return {
      name,
      min,
      max,
      step,
      value,
      required
    };
  };

  isFormValid = errors => {
    errors = errors || this.state.errors;

    return Object.keys(errors).length === 0;
  };

  getUpdatedErrors = target => {
    let error = "";
    const errors = { ...this.state.errors };
    const { name, min, max, value, required } = target;

    if (required && (value == null || value == "")) {
      error = "Required";
    } else if (min != null && max != null && (value < min || value > max)) {
      error = `Min ${min}, max ${max}`;
    } else if (min != null && value < min) {
      error = `Min ${min}`;
    } else if (max != null && value > max) {
      error = `Max ${max}`;
    }

    if (error) {
      errors[name] = error;
    } else {
      delete errors[name];
    }

    return errors;
  };

  handleChange = e => {
    const { values } = this.state;
    const { target } = e;
    const normalizedTarget = this.normalizeInputAttrs(target);
    const { name, value } = normalizedTarget;
    const errors = this.getUpdatedErrors(normalizedTarget);
    const isFormValid = this.isFormValid(errors);

    this.setState({
      values: {
        ...values,
        [name]: value
      },
      errors
    });

    if (isFormValid) {
      this.props.onChange({
        ...values,
        [name]: Number(value)
      });
    }
  };

  render() {
    const { values, errors } = this.state;

    return (
      <div className="Inputs">
        <TextField
          error={Boolean(errors.stake)}
          required
          type="number"
          name="stake"
          label="Stake"
          helperText={errors.stake ? errors.stake : "2000 - 480000"}
          autoComplete="false"
          inputProps={{
            min: 2000,
            max: 480000,
            step: 1
          }}
          value={values.stake}
          onChange={this.handleChange}
        />
        <TextField
          error={Boolean(errors.blockPayout)}
          required
          type="number"
          name="blockPayout"
          label="Payout per block"
          helperText={errors.blockPayout ? errors.blockPayout : "0.001 - 10"}
          autoComplete="false"
          inputProps={{
            min: 0.001,
            max: 10,
            step: 0.001
          }}
          value={values.blockPayout}
          onChange={this.handleChange}
        />
        <TextField
          error={Boolean(errors.blockTimeMinutes)}
          required
          type="number"
          name="blockTimeMinutes"
          label="Time between payouts (minutes)"
          helperText={
            errors.blockTimeMinutes ? errors.blockTimeMinutes : "1 - 100"
          }
          autoComplete="false"
          inputProps={{
            min: 1,
            max: 100,
            step: 0.1
          }}
          value={values.blockTimeMinutes}
          onChange={this.handleChange}
        />
        <TextField
          error={Boolean(errors.reinvestingFee)}
          required
          type="number"
          name="reinvestingFee"
          label="Reinvesting fee"
          helperText={errors.reinvestingFee ? errors.reinvestingFee : "0.1 - 1"}
          autoComplete="false"
          inputProps={{
            min: 0.1,
            max: 1,
            step: 0.01
          }}
          value={values.reinvestingFee}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

Inputs.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default Inputs;
