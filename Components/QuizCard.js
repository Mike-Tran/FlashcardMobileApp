import React from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {black, lightPurp, orange, pink, red, white} from "../utils/colors";

class QuizCard extends React.Component {
	componentWillMount() {
		this.animatedValue = new Animated.Value(0);
		this.value = 0;
		this.animatedValue.addListener(({value}) => {
			this.value = value;
		});
		this.frontInterpolate = this.animatedValue.interpolate({
			inputRange: [0, 180],
			outputRange: ['0deg', '180deg'],
		});
		this.backInterpolate = this.animatedValue.interpolate({
			inputRange: [0, 180],
			outputRange: ['180deg', '360deg']
		});
	}

	flipCard() {
		this.props.resetQuestion();
		if (this.value >= 90) {
			Animated.spring(this.animatedValue, {
				toValue: 0,
				friction: 8,
				tension: 10
			}).start();
		} else {
			Animated.spring(this.animatedValue, {
				toValue: 180,
				friction: 8,
				tension: 10
			}).start();
		}
	}

	render() {
		const frontAnimatedStyle = {
			transform: [
				{rotateY: this.frontInterpolate}
			]
		};
		const backAnimatedStyle = {
			transform: [
				{rotateY: this.backInterpolate}
			]
		};
		return (
			<View style={styles.container}>
				<View>
					<Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
						<Text style={styles.flipText}>
							{this.props.question.question}
						</Text>
					</Animated.View>
					<Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
						<Text style={styles.flipText}>
							{this.props.question.answer}
						</Text>
					</Animated.View>
				</View>
				<TouchableOpacity onPress={() => this.flipCard()}>
					{this.props.cardHasBeenFlipped ?
						<Text style={{fontWeight: 'bold'}}>Answer</Text> :
						<Text style={{fontWeight: 'bold'}}>Question</Text>}
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	flipCard: {
		width: 400,
		height: 400,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: orange,
		backfaceVisibility: 'hidden',
	},
	flipCardBack: {
		backgroundColor: pink,
		position: "absolute",
		top: 0,
	},
	flipText: {
		width: 90,
		fontSize: 20,
		color: 'white',
		fontWeight: 'bold',
	}
});

export default QuizCard;