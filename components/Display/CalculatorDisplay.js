import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export default class CalculatorDisplay extends React.Component {

    static defaultProps = {
        display: "",
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.display}>{this.props.display}</Text>
            </View>
        )
    }
}