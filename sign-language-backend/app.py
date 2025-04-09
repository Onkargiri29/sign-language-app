from flask import Flask, Response, request
import cv2
import numpy as np
import mediapipe as mp
from tensorflow.keras.models import load_model
import threading
import os

# Suppress TensorFlow warnings for cleaner console output
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

app = Flask(__name__)

# Load the trained sign language recognition model
model = load_model('sign_language_light_model.h5')

# List of classes the model can predict
gesture_classes = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'Hello', 'I', 'I Love You', 'J', 'K', 'L', 
    'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'Thank You', 'U', 'V', 'W', 'X', 'Y'
]

IMAGE_SIZE = 96  # Input size expected by the model

# Initialize MediaPipe Hands
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(min_detection_confidence=0.8, min_tracking_confidence=0.8)
mp_drawing = mp.solutions.drawing_utils

camera_active = False  # Global flag to control camera activity

def gen_frames():
    """Captures webcam frames, detects hands, predicts gesture, and streams annotated video."""
    global camera_active
    cap = cv2.VideoCapture(0)

    while camera_active:
        success, frame = cap.read()
        if not success:
            break

        frame = cv2.flip(frame, 1)
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(rgb_frame)

        if results.multi_hand_landmarks:
            for landmarks in results.multi_hand_landmarks:
                mp_drawing.draw_landmarks(frame, landmarks, mp_hands.HAND_CONNECTIONS)

                # Calculate bounding box around hand
                x_min, y_min = frame.shape[1], frame.shape[0]
                x_max, y_max = 0, 0
                for landmark in landmarks.landmark:
                    x, y = int(landmark.x * frame.shape[1]), int(landmark.y * frame.shape[0])
                    x_min, y_min = min(x_min, x), min(y_min, y)
                    x_max, y_max = max(x_max, x), max(y_max, y)

                # Add padding to bounding box
                padding = 20
                x_min, y_min = max(0, x_min - padding), max(0, y_min - padding)
                x_max, y_max = min(frame.shape[1], x_max + padding), min(frame.shape[0], y_max + padding)

                # Crop and preprocess hand region
                hand_img = frame[y_min:y_max, x_min:x_max]
                if hand_img.size == 0:
                    continue
                hand_img = cv2.resize(hand_img, (IMAGE_SIZE, IMAGE_SIZE))
                hand_img = hand_img / 255.0
                hand_img = np.expand_dims(hand_img, axis=0)

                # Predict gesture
                prediction = model.predict(hand_img)
                predicted_class = gesture_classes[np.argmax(prediction)]

                # Display prediction
                cv2.rectangle(frame, (x_min, y_min), (x_max, y_max), (0, 255, 0), 2)
                cv2.putText(frame, predicted_class, (x_min, y_min - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

        # Encode and yield frame for streaming
        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    cap.release()

@app.route('/video_feed')
def video_feed():
    """Starts the webcam video stream."""
    global camera_active
    camera_active = True
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/stop_feed', methods=['POST'])
def stop_feed():
    """Stops the webcam video stream."""
    global camera_active
    camera_active = False
    return "Camera stopped", 200

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
