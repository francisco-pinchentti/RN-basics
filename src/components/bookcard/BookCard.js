import React, { Component } from "react";
import { Text, View, Image, Button } from "react-native";

export default class BookCard extends Component {
  render() {
    return (
      <View style={{ flexGrow: 1, backgroundColor: 'rgba(0.9,0.9,0.9,0.1)' }}>
        {/* <img  /> */}
        <View style={{ flexGrow: 1 }}>
          <Text style={{ flexGrow: 1 }}>{this.props.model.title}</Text>
          <Text style={{ flexGrow: 1 }}>ISBN: {this.props.model.isbn}</Text>
          <Text style={{ flexGrow: 1 }}>{this.props.model.summary || "No summary found"}</Text>
          <View style={{ flexGrow: 2, flexDirection: 'row', justifyContent: 'flex-end', padding: 4 }}>
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
