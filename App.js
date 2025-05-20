import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function App() {
  const [targetNumber, setTargetNumber] = useState(0);
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [feedbackType, setFeedbackType] = useState("");

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    // Generate a random number when game starts
    const newTarget = Math.floor(Math.random() * 100) + 1;
    setTargetNumber(newTarget);
    setGuess("");
    setFeedback("");
    setAttempts(0);
    setGameOver(false);
    setFeedbackType("");
    // console.log("New target number:", newTarget);
  };

  const handleGuess = () => {
    const guessNumber = parseInt(guess, 10);

    if (isNaN(guessNumber) || guessNumber < 1 || guessNumber > 100) {
      Alert.alert("Invalid number", "Enter a number between 1 and 100.");
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    // Check guess
    if (guessNumber === targetNumber) {
      setFeedback(
        `Correct! You guessed the number on ${newAttempts} attempts.`
      );
      setFeedbackType("correct");
      setGameOver(true);
    } else if (guessNumber > targetNumber) {
      setFeedback("Too high! Try a lower number.");
      setFeedbackType("too-high");
    } else {
      setFeedback("Too low! Try a higher number.");
      setFeedbackType("too-low");
    }
    // Clear input
    setGuess("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Guessing Game</Text>
        <Text style={styles.description}>
          I'm thinking of a number between 1 and 100. Can you guess which one?
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={guess}
            onChangeText={setGuess}
            placeholder="Enter a number"
            keyboardType="numeric"
            maxLength={3}
            editable={!gameOver}
          />
        </View>
        <TouchableOpacity
          style={[styles.button, gameOver && styles.disabledButton]}
          onPress={handleGuess}
          disabled={gameOver}
        >
          <Text style={styles.buttonText}>Guess!</Text>
        </TouchableOpacity>
        {feedback ? (
          <View
            style={[
              styles.feedback,
              feedbackType === "too-high" && styles.tooHigh,
              feedbackType === "too-low" && styles.tooLow,
              feedbackType === "correct" && styles.correct,
            ]}
          >
            <Text style={styles.feedbackText}>{feedback}</Text>
          </View>
        ) : null}
        {attempts > 0 && (
          <Text style={styles.attempts}>Number of attempts: {attempts}</Text>
        )}
        {gameOver && (
          <TouchableOpacity
            style={[styles.button, styles.resetButton]}
            onPress={startNewGame}
          >
            <Text style={styles.buttonText}>Start new game</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fef6ff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    width: "100%",
    maxWidth: 320,
    alignItems: "center",
    boxShadow: "0px 8px 12px rgba(255, 148, 204, 0.3)",
    elevation: 8,
    borderWidth: 2,
    borderColor: "#ffcae5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ff6bac",
    marginBottom: 5,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#7d7d7d",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    padding: 14,
    borderWidth: 2,
    borderColor: "#f0c9f0",
    borderRadius: 12,
    fontSize: 18,
    textAlign: "center",
    backgroundColor: "#fffbff",
  },
  button: {
    backgroundColor: "#a172ff",
    borderRadius: 12,
    padding: 14,
    width: "100%",
    alignItems: "center",
    boxShadow: "0px 3px 5px rgba(130, 71, 255, 0.3)",
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  disabledButton: {
    backgroundColor: "#c7b5ef",
    opacity: 0.7,
  },
  feedback: {
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
    width: "100%",
    borderWidth: 1,
  },
  feedbackText: {
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },
  tooHigh: {
    backgroundColor: "#ffdddd",
    borderColor: "#ffb8b8",
  },
  tooLow: {
    backgroundColor: "#dbe9ff",
    borderColor: "#b6d3ff",
  },
  correct: {
    backgroundColor: "#d8ffd8",
    borderColor: "#a3e0a3",
  },
  attempts: {
    color: "#8247ff",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 24,
  },
  resetButton: {
    marginTop: 24,
    backgroundColor: "#ff9ed2",
  },
});
