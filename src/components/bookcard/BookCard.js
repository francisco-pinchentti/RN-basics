import React, { Component } from "react";
import { Text, View } from "react-native";
import BSButton from "../button/BSButton";

const TEXT_STYLE = {
  flexGrow: 1,
  fontSize: 16,
  letterSpacing: 1.25,
  fontWeight: 'bold',
  color: '#fff'
}

const TEXT_SUMMARY_STYLE = {
  flexGrow: 1,
  fontSize: 13,
  letterSpacing: 1.25,
  color: '#fff'
}

export default class BookCard extends Component {
  render() {
    return (
      <View style={{ flexGrow: 1, backgroundColor: "#F6D55C", borderRadius: 3, padding: 4 }}>
          <Text style={TEXT_STYLE}>{this.props.model.title}</Text>
          <Text style={TEXT_STYLE}>ISBN: {this.props.model.isbn}</Text>
          <Text style={TEXT_SUMMARY_STYLE}>
            {this.props.model.summary || "No summary found"}
          </Text>
          <View
            style={{
              flexGrow: 2,
              flexDirection: "row",
              justifyContent: "flex-end",
              padding: 4
            }}
          >
            <BSButton
              title="DELETE"
              onPress={() => this.props.onDelete(this.props.model)}
            />
            <View style={{ width: 8, hieght: '100%'}} />
            <BSButton
              title="UPDATE"
              onPress={() => this.props.onUpdate(this.props.model)}
            />
          </View>
      </View>
    );
  }

  shouldComponentUpdate() {
    return true;
  }
}
