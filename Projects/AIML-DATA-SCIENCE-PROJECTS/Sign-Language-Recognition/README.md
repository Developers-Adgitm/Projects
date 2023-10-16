# Sign-Language-Recognition
This project aimed to develop a computer vision-based system for real-time and accurate Sign Language recognition (SLR) to facilitate communication between individuals with
different hearing abilities. A labeled dataset of sign language images was created and utilized for training the neural network. Transfer learning techniques were applied to leverage pre-trained models for improved performance. The system employed Mediapipe Holistic and employed Long Short-Term Memory (LSTM) architecture to capture the temporal dynamics of sign language gestures. By combining these technologies, the project aimed to achieve precise and instantaneous recognition of sign language.

To capture the sequential nature of sign language, the project integrated the LSTM
architecture into the system. LSTM's ability to model long-term dependencies made it wellsuited for capturing the temporal dynamics of sign language gestures, enabling accurate recognition even in dynamic scenarios. The utilization of Mediapipe Holistic further enhanced the system's performance by extracting key points from the hands, face, and body, providing valuable input for the recognition process. This holistic approach improved the robustness and reliability of the system, contributing to its real-time capability.

---

## General Design :

In our sign language recognition project, we have developed a sign detector capable of detecting custom signs and easily expanding to include a wide range of additional signs and hand motions, such as the alphabet and numerals. To build this project, we utilized Python modules including OpenCV, Mediapipe, Tensorflow, and Keras. The OpenCV module processes live video frames from a camera, analyzing the actions of the person being displayed. Mediapipe Holistic is used to extract keypoints from the hands, torso,
and face in the video frames. These keypoints are then fed into the prediction algorithm, which begins the real-time prediction of the sign being made. The predicted sign is
displayed as the expected output.

### Requirements : 
The prerequisites software & libraries:
1. Python (3.10.8)
2. IDE (Jupyter)
3. Mediapipe (version 0.10.1)
4. Numpy (version 1.23.5)
5. cv2 (openCV) (version 4.7.0.72)
6. Keras (version 2.12.0)
7. Tensorflow (version 2.12.0)

### Dataset : 
The dataset was created by capturing videos with the help of a web cam, it includes different motions and signals for sign language. A live video stream from the camera is constantly monitored, and frames within the defined region of interest (ROI) that show gestures or motions are saved in a dedicated directory called the MP_Data (standing for MediaPipe Data). Each sign is captured through approximately 30 video sequences, where each sequence contains around 30 frames capturing significant moments. These frames are stored as Numpy arrays. The main goal is to accurately identify the specific gesture being performed throughout the entire video sequence.
