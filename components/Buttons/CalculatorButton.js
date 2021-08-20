import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

export default class CalcButton extends React.Component {

    static defaultProps = {
        onPress: function()  { },
        title: "",
        color: "white",
        backgroundColor: "black",
        style: { },
    }

    render() {
        var bc = this.props.backgroundColor;

        return (
            <TouchableOpacity onPress={this.props.onPress} style={[styles.container, { backgroundColor: bc }, {...this.props.style}]}>
                <Text style={[styles.text, { color: this.props.color}]}>{this.props.title}</Text>
            </TouchableOpacity>
        );
    }
}