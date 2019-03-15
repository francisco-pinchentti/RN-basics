import React, { Component } from "react";
import { Text, View, Image, Button } from "react-native";

export default class BookCard extends Component {
  render() {
    return (
      <View>
        {/* <img  /> */}
        <View>
          <Text>{this.props.model.title}</Text>
          <Text>ISBN: {this.props.model.isbn}</Text>
          <Text>{this.props.model.summary || "No summary found"}</Text>
          <View>
            <Button
              title="DELETE"
              onPress={() => this.props.onDelete(this.props.model)}
            />
            <Button
              title="UPDATE"
              onPress={() => this.props.onUpdate(this.props.model)}
            />
          </View>
        </View>
      </View>
    );
  }

  shouldComponentUpdate() {
    return true;
  }
}
