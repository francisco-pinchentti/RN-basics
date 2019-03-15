import React, { PureComponent } from "react";
import { Text, View } from "react-native";
import BSButton from "../button/BSButton";
import styles from "../../styles";

export default class BookCard extends PureComponent {
  render() {
    return (
      <View style={{ flexGrow: 1, backgroundColor: "#F6D55C", borderRadius: 3, padding: 4 }}>
          <Text style={styles.textRegular}>{this.props.model.title}</Text>
          <Text style={styles.textRegular}>ISBN: {this.props.model.isbn}</Text>
          <Text style={styles.textSecondary}>
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

}
