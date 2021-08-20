import React from 'react'
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import {CalculatorButton, CalculatorDisplay} from './../components';
import { Ionicons } from '@expo/vector-icons';

require("./../lib/swisscalc.lib.format.js");
require("./../lib/swisscalc.lib.operator.js");
require("./../lib/swisscalc.lib.operatorCache.js");
require("./../lib/swisscalc.lib.shuntingYard.js");
require("./../lib/swisscalc.display.numericDisplay");
require("./../lib/swisscalc.display.memoryDisplay");
require("./../lib/swisscalc.calc.calculator.js");

export default class CalculatorScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            display: "0",
            orientation: "portrait",
        };

        // brain the calculator
        this.oc = global.swisscalc.lib.operatorCache;
        this.calc = new global.swisscalc.calc.calculator();

        // Listen change in orientation
        Dimensions.addEventListener("change", () => {
            const { width, height} = Dimensions.get("window");
            var orientation = (width > height) ? "landscape" : "portrait";
            this.setState({orientation: orientation});
        });
    }

    // Digit is Pressed
    onDigitPress = (digit) => {
        this.calc.addDigit(digit);
        this.setState({ display: this.calc.getMainDisplay()})
    }

    // Clear
    onClearPress = () => {
        this.calc.clear();
        this.setState({ display: this.calc.getMainDisplay()})
    }

    // BackSpace
    OnbackspacePress = () => {
        this.calc.backspace();
        this.setState({ display: this.calc.getMainDisplay()})
    }

    // Operator
    OnBinaryOperatorPress = (operator) => {
        this.calc.addBinaryOperator(operator);
        this.setState({ display: this.calc.getMainDisplay()})
    }

    // Equal
    OnEqualPress = () => {
        this.calc.equalsPressed();
        this.setState({ display: this.calc.getMainDisplay()})
    }

    // Unary
    onUnaryOperatorPress = (operator) => {
        this.calc.addUnaryOperator(operator);
        this.setState({ display: this.calc.getMainDisplay()})
    }

    renderPortrait() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.displayContainer}>
                    <CalculatorDisplay display={this.state.display}/>
                </View>

                <View style={styles.buttonContainer}>
                    <View style={styles.buttonRow}>
                        <CalculatorButton onPress={this.onClearPress} title="AC" color="#eb832d" backgroundColor="#2a3c4a"/>
                        <CalculatorButton onPress={this.OnbackspacePress} title={<Ionicons name="backspace-outline" size={35} color="#eb832d" />} color="#9ea1a4" backgroundColor="#2a3c4a"/>
                        <CalculatorButton onPress={() => {this.onUnaryOperatorPress(this.oc.PercentOperator)}} title="%" color="#eb832d" backgroundColor="#2a3c4a"/>
                        <CalculatorButton onPress={() => {this.OnBinaryOperatorPress(this.oc.DivisionOperator)}} title="÷" color="#eb832d" backgroundColor="#2a3c4a"/>
                    </View>
                    <View style={styles.buttonRow}>
                        <CalculatorButton onPress={() => {this.onDigitPress("7")}} title="7" color="#9ea1a4" backgroundColor="#2a3c4a" fontWeight="bold"/>
                        <CalculatorButton onPress={() => {this.onDigitPress("8")}} title="8" color="#9ea1a4" backgroundColor="#2a3c4a" fontWeight="bold"/>
                        <CalculatorButton onPress={() => {this.onDigitPress("9")}} title="9" color="#9ea1a4" backgroundColor="#2a3c4a" fontWeight="bold"/>
                        <CalculatorButton onPress={() => {this.OnBinaryOperatorPress(this.oc.MultiplicationOperator)}} title="x" color="#eb832d" backgroundColor="#2a3c4a"/>
                    </View>

                    <View style={styles.buttonRow}>
                        <CalculatorButton onPress={() => {this.onDigitPress("4")}} title="4" color="#9ea1a4" backgroundColor="#2a3c4a" fontWeight="bold"/>
                        <CalculatorButton onPress={() => {this.onDigitPress("5")}} title="5" color="#9ea1a4" backgroundColor="#2a3c4a" fontWeight="bold"/>
                        <CalculatorButton onPress={() => {this.onDigitPress("6")}} title="6" color="#9ea1a4" backgroundColor="#2a3c4a" fontWeight="bold"/>
                        <CalculatorButton onPress={() => {this.OnBinaryOperatorPress(this.oc.SubtractionOperator)}} title="-" color="#eb832d" backgroundColor="#2a3c4a"/>
                    </View>

                    <View style={styles.buttonRow}>
                        <CalculatorButton onPress={() => {this.onDigitPress("1")}} title="1" color="#9ea1a4" backgroundColor="#2a3c4a" fontWeight="bold"/>
                        <CalculatorButton onPress={() => {this.onDigitPress("2")}} title="2" color="#9ea1a4" backgroundColor="#2a3c4a" fontWeight="bold"/>
                        <CalculatorButton onPress={() => {this.onDigitPress("3")}} title="3" color="#9ea1a4" backgroundColor="#2a3c4a" fontWeight="bold"/>
                        <CalculatorButton onPress={() => {this.OnBinaryOperatorPress(this.oc.AdditionOperator)}} title="+" color="#eb832d" backgroundColor="#2a3c4a"/>
                    </View>

                    <View style={styles.buttonRow}>
                        <CalculatorButton onPress={() => {this.onDigitPress("0")}} title="0" color="#9ea1a4" backgroundColor="#2a3c4a" fontWeight="bold"/>
                        <CalculatorButton onPress={() => {this.onDigitPress(".")}} title="." color="#9ea1a4" backgroundColor="#2a3c4a" fontWeight="bold"/>
                        <CalculatorButton onPress={this.OnEqualPress} title="=" color="white" backgroundColor="#eb832d" style={{flex: 2}}/>
                    </View>
                </View>
            </View>
        );
    }

    renderLandscape() {
        return (
            <View style={{flex:1, paddingTop: 50}}>
                <Text>Landscape Mode</Text>
            </View>
        )
    }

    render() {

        var view = (this.state.orientation == "portrait")
            ? this.renderPortrait()
            : this.renderLandscape();

        return(
            <View style={styles.container}>
                {view}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#243441"
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    displayContainer: {
        flex: 1,
        justifyContent: "flex-end"
    },
    buttonContainer: {
        paddingBottom: 30
    }
});