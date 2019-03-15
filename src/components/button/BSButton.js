import React, { PureComponent } from "react";
import { TouchableOpacity, Text } from "react-native";

export const BSBUTTON_DEFAULT_STYLE = {
  flexGrow: 1,
  padding: 3,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#20639B",
  borderRadius: 8,
};

export default class BSButton extends PureComponent {
  render() {
    const containerStyle = this.props.containerStyle
      ? this.props.containerStyle
      : BSBUTTON_DEFAULT_STYLE;

    const textStyle = this.props.textStyle
      ? this.props.textStyle
      : { color: "#fff" };

    return (
      <TouchableOpacity style={containerStyle} onPress={this.props.onPress} disabled={this.props.disabled}>
        <Text style={textStyle}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}
