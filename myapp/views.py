# from django.shortcuts import render
# from .models import Symptom

# def index(request):
#     # list_symptoms=Symptom.objects.all()
#     # context={'list_symptoms': list_symptoms}
    
#     return render(request,'index.html')

from django.shortcuts import render
from django.views.generic import View
from time import time
from django.http import JsonResponse
from .disease_prediction import run
import json

class AjaxHandlerView(View):
    def is_ajax(self,request):
        return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'
    def get(self,request):
        

        # print(str(text)+"|")
        if self.is_ajax(request):
            resultArr=request.GET.get('jsonString')
            print(resultArr)
            
            jsonA=json.loads(resultArr)
            for item in jsonA:
                print(item['name'])
            symptoms=[]

            for item in jsonA:
                symptom = " ".join([i.capitalize() for i in item['name'].split(" ")])
                print(type(symptom))
                symptoms.append(symptom)

            # print(symptoms)

            disease,accuracy=run(symptoms)
            print(disease)
            print(accuracy)
            context={'disease':disease,'accuracy':accuracy}
            return JsonResponse(context,status=200)
        
        # symptoms=['Itching','Skin Rash','Stomach Pain','Burning Micturition']
        

        

        # context={'disease':disease,'accuracy':accuracy}
            
        # return render(request,'index.html',context)
        return render(request,'index.html')