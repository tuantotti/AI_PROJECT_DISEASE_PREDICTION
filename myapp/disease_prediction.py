import math
from typing import Counter
import pandas as pd
import os
import numpy as np
from numpy import random
from sklearn import preprocessing

class naive_bayes_Gaussian:

    def __init__(self,X,Y):
        self.X=X
        self.Y=Y
        self.classify_dict=self.classifySymptomClass() # classifier 
        self.probaPriorClass = self.calProbaPrior() # tính xác suất tiên nghiệm
        self.summarises=self.fit() # fit dữ liệu 
        self.data_dict={} # map số sang chuỗi

    # thực hiện gán data_dict
    def setDataDict(self,data_dict):
        self.data_dict=data_dict


    def mean(self,column): # tính giá trị trung bình của một thuộc tính (symptom)
        return sum(column) / float(len(column))

    def standard_deviation(self,column): # tính giá trị độ lệch chuẩn của một thuộc tính (symptom)
        avg = self.mean(column)

        variance = sum([pow(x - avg, 2) for x in column]) / float(len(column) - 1)

        return math.sqrt(variance)


    def gaussian(self,x, mean, standard_deviation): # tính xác suất hậu nghiệm theo công thức Gauss
        exponent = math.exp(-(math.pow(x - mean, 2) /
                            (2 * math.pow(standard_deviation, 2))))
        return (1 / (math.sqrt(2 * math.pi) * standard_deviation)) * exponent


    # Hàm ước lượng xác suất khi độ lệch chuẩn = 0
    def estimate(self,numY, numX, m):  # numX= n(ci,xj); numY=n(ci)
        p = 1/float(numX)

        estimate = (numX+m*p)/float(numY+m)

        return estimate
        
    def calProbaPrior(self):
        probaPriorClass={}
        frequencies = Counter(self.Y)

        for frequency in frequencies:
            probaPriorClass[frequency] = float(frequencies[frequency])/len(self.Y)

        return probaPriorClass

    # classifier: thực hiện tìm các hàng thuộc 1 lớp 
    def classifySymptomClass(self):
        classify_dict={} 
        count = 0
        X_values=self.X.values
        while count < len(self.Y.unique()):
            classify_dict[count] = []
            for index in range(len(self.Y)):
                if(self.Y.get(index) == count):
                    classify_dict[count].append(X_values[index])

            count = count+1
            
        return classify_dict

    # thực hiện tính bộ giá trị (mean,standard_deviation) của một cột bất kì
    def summarize(self,items):
        summarises = [(self.mean(attribute), self.standard_deviation(attribute))
                  for attribute in zip(*items)]

        return summarises

    # thực hiện tính bộ giá trị (mean,standard_deviation) của một thuộc tính trong một lớp
    def fit(self):
        summaries = {}
        for classValue in self.classify_dict:
            summaries[classValue] = self.summarize(self.classify_dict[classValue])

        return summaries

    # thực hiện dự đoán - tính xác suất hậu nghiệm của từng thuộc tính theo input đầu vào
    # xác suất hậu nghiệm nào lớn nhất thì input được phân vào lớp đó (maxLabel)
    def predict(self,input):
        probabilities = {}

        for classValue in self.summarises:
            probabilities[classValue] = 0
            for i in range(len(self.summarises[classValue])):
                means, std = self.summarises[classValue][i]
                x = input[i]
                if(std != 0.0):
                    probabilities[classValue] += math.log10(self.gaussian(x, means, std))
                else:
                    probabilities[classValue] += self.estimate(len(self.summarises[classValue]),10,10)
            probabilities[classValue] +=math.log10(self.probaPriorClass[classValue])

        maxLabel = self.sortByProbab(probabilities)

        return maxLabel

    # tương tự như predict nhưng input lúc này là tập các tên thuộc tính
    def predictDisease(self,symptoms):
        input = [0] * len(self.data_dict["symptom_index"]) # tạo ra input với độ dài mảng tương ứng với số lượng thuộc tính (132)
        for symptom in symptoms:
            index = self.data_dict["symptom_index"][symptom]
            input[index] = 1 # nếu thuộc tính nào xuất hiện thì cho bằng 1 
            
        numberOfSymptom=len(self.X.columns)
        input = np.array(input).reshape(numberOfSymptom,)
        maxLabel=self.predict(input)
        prediction = self.data_dict["predictions_classes"][maxLabel] 

        return prediction

    def sortByProbab(self,probabilities):
        maxValue = 0
        maxLabel = 0
        for classValue in range(len(probabilities)):
            if probabilities[classValue] > maxValue:
                maxValue = probabilities[classValue]
                maxLabel = classValue

        return maxLabel

    # thực hiện test --> predict nhiều lần
    def predictTest(self,XTest):
        preds = []

        for i in range(len(XTest)):
            label = self.predict(XTest[i])
            preds.append(label)

        return preds
    
    # tính độ chính xác của mô hình --> check preds với YTest sau đó tính độ chính xác (%)
    def calAccuracy(self,preds, YTest):
        match = 0

        for i in range(len(YTest)):
            if preds[i] == YTest[i]:
                match += 1

        return match/float(len(YTest))

# đọc file
def loadData(file_name):
    scriptpath = os.path.dirname(__file__)
    file = os.path.join(scriptpath, file_name)
    file_data = open(file, 'r')
    data = pd.read_csv(file_data).dropna(axis=1)

    # khởi tạo đối tượng LabelEncoder để convert symptom and disease to INT
    encoder = preprocessing.LabelEncoder() 

    data["prognosis"] = encoder.fit_transform(
        data["prognosis"])  # convert all diseases to number (0,40)

    # X = data.iloc[:, :-1]  # data of all symtoms
    # Y = data.iloc[:, -1]  # data of all diseases

    # slices=int(data.__len__()*test_size)
    X_train = data.iloc[:3936, :-1]  # data of all symtoms
    X_test = data.iloc[3936:, :-1]  # data of all symtoms
    Y_train = data.iloc[:3936, -1]  # data of all diseases
    Y_test = data.iloc[3936:, -1]  # data of all diseases
    
    symptoms=X_train.columns.values # get all symptoms
    symptom_index = {} # dictionary chứa id là số (0,131) và value là tên bệnh
    
    for index, value in enumerate(symptoms):
        symptom = " ".join([i.capitalize() for i in value.split("_")])
        symptom_index[symptom] = index 
    
    # dictionary chứa   
    # symptom_index: map symptom INT to String (dictionary)
    # predictions_classes: sử dụng chỉ số mảng ứng với việc convert disease name to int (array)
    data_dict = {
        "symptom_index":symptom_index,
        "predictions_classes":encoder.classes_ # array
    }

    return X_train,X_test,Y_train,Y_test,data_dict

# def train_test_split(X,Y,test_size):
#     sizeX=X.__len__()
#     sizeY=Y.__len__()
#     start=random.randint()
# input = [1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
#          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]


# test symptom
# symptoms="Itching,Skin Rash,Stomach Pain,Burning Micturition"
# print(data_dict["symptom_index"])
# symptom_dict={'Itching': 0, 'Skin Rash': 1, 'Nodal Skin Eruptions': 2, 'Continuous Sneezing': 3, 'Shivering': 4, 'Chills': 5, 'Joint Pain': 6, 'Stomach Pain': 7, 'Acidity': 8, 'Ulcers On Tongue': 9, 'Muscle Wasting': 10, 'Vomiting': 11, 'Burning Micturition': 12, 'Spotting  urination': 13, 'Fatigue': 14, 'Weight Gain': 15, 'Anxiety': 16, 'Cold Hands And Feets': 17, 'Mood Swings': 18, 'Weight Loss': 19, 'Restlessness': 20, 'Lethargy': 21, 'Patches In Throat': 22, 'Irregular Sugar Level': 23, 'Cough': 24, 'High Fever': 25, 'Sunken Eyes': 26, 'Breathlessness': 27, 'Sweating': 28, 'Dehydration': 29, 'Indigestion': 30, 'Headache': 31, 'Yellowish Skin': 32, 'Dark Urine': 33, 'Nausea': 34, 'Loss Of Appetite': 35, 'Pain Behind The Eyes': 36, 'Back Pain': 37, 'Constipation': 38, 'Abdominal Pain': 39, 'Diarrhoea': 40, 'Mild Fever': 41, 'Yellow Urine': 42, 'Yellowing Of Eyes': 43, 'Acute Liver Failure': 44, 'Fluid Overload': 45, 'Swelling Of Stomach': 46, 'Swelled Lymph Nodes': 47, 'Malaise': 48, 'Blurred And Distorted Vision': 49, 'Phlegm': 50, 'Throat Irritation': 51, 'Redness Of Eyes': 52, 'Sinus Pressure': 53, 'Runny Nose': 54, 'Congestion': 55, 'Chest Pain': 56, 'Weakness In Limbs': 57, 'Fast Heart Rate': 58, 'Pain During Bowel Movements': 59, 'Pain In Anal Region': 60, 'Bloody Stool': 61, 'Irritation In Anus': 62, 'Neck Pain': 63, 'Dizziness': 64, 'Cramps': 65, 'Bruising': 66, 'Obesity': 67, 'Swollen Legs': 68, 'Swollen Blood Vessels': 69, 'Puffy Face And Eyes': 70, 'Enlarged Thyroid': 71, 'Brittle Nails': 72, 'Swollen Extremeties': 73, 'Excessive Hunger': 74, 'Extra Marital Contacts': 75, 'Drying And Tingling Lips': 76, 'Slurred Speech': 77, 'Knee Pain': 78, 'Hip Joint Pain': 79, 'Muscle Weakness': 80, 'Stiff Neck': 81, 'Swelling Joints': 82, 'Movement Stiffness': 83, 'Spinning Movements': 84, 'Loss Of Balance': 85, 'Unsteadiness': 86, 'Weakness Of One Body Side': 87, 'Loss Of Smell': 88, 'Bladder Discomfort': 89, 'Foul Smell Of urine': 90, 'Continuous Feel Of Urine': 91, 'Passage Of Gases': 92, 'Internal Itching': 93, 'Toxic Look (typhos)': 94, 'Depression': 95, 'Irritability': 96, 'Muscle Pain': 97, 'Altered Sensorium': 98, 'Red Spots Over Body': 99, 'Belly Pain': 100, 'Abnormal Menstruation': 101, 'Dischromic  Patches': 102, 'Watering From Eyes': 103, 'Increased Appetite': 104, 'Polyuria': 105, 'Family History': 106, 'Mucoid Sputum': 107, 'Rusty Sputum': 108, 'Lack Of Concentration': 109, 'Visual Disturbances': 110, 'Receiving Blood Transfusion': 111, 'Receiving Unsterile Injections': 112, 'Coma': 113, 'Stomach Bleeding': 114, 'Distention Of Abdomen': 115, 'History Of Alcohol Consumption': 116, 'Fluid Overload.1': 117, 'Blood In Sputum': 118, 'Prominent Veins On Calf': 119, 'Palpitations': 120, 'Painful Walking': 121, 'Pus Filled Pimples': 122, 'Blackheads': 123, 'Scurring': 124, 'Skin Peeling': 125, 'Silver Like Dusting': 126, 'Small Dents In Nails': 127, 'Inflammatory Nails': 128, 'Blister': 129, 'Red Sore Around Nose': 130, 'Yellow Crust Ooze': 131}

symptoms=['Itching','Skin Rash','Stomach Pain','Burning Micturition']
FILE_NAME='..\statics\data\data.csv'

def run(symptoms):
    X_train,X_test,Y_train,Y_test,data_dict = loadData(FILE_NAME)
    obj= naive_bayes_Gaussian(X_train,Y_train)
    obj.setDataDict(data_dict)

    # print("Input: "+str(symptoms))
    preds = obj.predictTest(X_test.values)

    disease=obj.predictDisease(symptoms)
    disease = " ".join([i.capitalize() for i in disease.split(" ")])
    accuracy=round(obj.calAccuracy(preds, Y_test.values)*100,2)

    return disease,accuracy


# disease,accuracy=run(symptoms)

# print(disease)
# print(accuracy)


# X, Y,X_train,X_test,Y_train,Y_test,data_dict = loadData(FILE_TRAINING_NAME)
# print(X_train.__len__())
# print(X_test.__len__())
# print(Y_train.__len__())
# print(Y_test.__len__())


# disease,accuracy=run(symptoms)
# print(disease)
# print(accuracy)