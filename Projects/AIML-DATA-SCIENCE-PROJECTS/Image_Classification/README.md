# Image Classification using Python and Tensorflow
This project demonstrates the process of building a deep Convolutional Neural Network (CNN) image classifier using Python and TensorFlow. The goal of this project is to classify images into two categories using a deep learning model : happy class and sad class.

### Steps Involved
- Install Dependencies and Setup :
  
  Install using requirements file provided -
  ```
  pip install -r requirements.txt
  ```
- Remove Dodgy Images

  Inspecting the dataset and removing any images that might be corrupt, irrelevant, or improperly labeled. Maintaining a clean dataset is crucial for training an effective model.

- Load Data
- Scale Data

  Scale the pixel values of the images to a suitable range (i.e. [0, 1]) to help the model converge faster during training, it improves generalization.
  
- Split Data
- Build Deep Learning Model

  The deep CNN architecture consists of convolutional layers followed by max-pooling layers to capture hierarchical features, followed by fully connected layers for classification. Here's the model structure:
  ```
  model.add(Conv2D(16, (3,3), 1, activation='relu', input_shape=(256,256,3)))
  model.add(MaxPooling2D())
  model.add(Conv2D(32, (3,3), 1, activation='relu'))
  model.add(MaxPooling2D())
  model.add(Conv2D(16, (3,3), 1, activation='relu'))
  model.add(MaxPooling2D())
  model.add(Flatten())
  model.add(Dense(256, activation='relu'))
  model.add(Dense(1, activation='sigmoid'))
  ```
- Train Model
- Plot Performance

  After training, plot training and validation metrics (e.g., accuracy and loss) to visualize the model's performance.
- Evaluate Performance
- Test

---
Remember that this project serves as a basic example for image classification. Depending on your specific use case, you might need to fine-tune the model architecture, preprocessing steps, and training parameters.
Feel free to explore, experiment, and adapt the code to your own dataset and requirements!
