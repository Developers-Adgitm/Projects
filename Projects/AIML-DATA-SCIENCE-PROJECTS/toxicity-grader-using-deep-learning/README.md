## Toxicity Grader

This repo contains code for a toxicity grading model using TensorFlow and Gradio. The model is trained to detect whether a comment is toxic, obscene, threatening, or involves identity hate. The steps below outline the process of installing dependencies, preprocessing the data, creating a sequential model, making predictions, evaluating the model, and testing it using Gradio.

### 1. Install Dependencies

Before running the code, please make sure to install the required dependencies by executing the following command:

```
!pip install tensorflow tensorflow-gpu pandas matplotlib sklearn
```

### 2. Preprocess

The preprocessing step involves converting the comment text into numerical features using the `TextVectorization` layer from TensorFlow. The data is then split into training, validation, and test datasets.

### 3. Create Sequential Model

The sequential model is defined using the TensorFlow Keras API. It consists of an embedding layer, a bidirectional LSTM layer, fully connected layers for feature extraction, and a final output layer with sigmoid activation. The model is compiled with binary cross-entropy loss and the Adam optimizer.

### 4. Train the Model

The model is trained using the training and validation datasets. The training progress is visualized using a line plot showing the loss and metrics over epochs.

### 5. Make Predictions

The model can be used to make predictions on new comment data. The code provides examples of how to input a single comment or a batch of comments to obtain toxicity predictions.

### 6. Evaluate Model

The model's performance is evaluated using precision, recall, and accuracy metrics on the test dataset.

### 7. Test and Gradio

The code installs the Gradio library and saves the trained model. It then loads the model and defines a function to score comments based on toxicity. Gradio is used to create a user-friendly interface where users can input a comment and see the toxicity grades for different categories.

To run the Gradio interface, please make sure to install the required dependencies by executing the command:

```
!pip install gradio jinja2
```

Once the interface is launched, users can input comments and obtain the toxicity grades in different categories.
