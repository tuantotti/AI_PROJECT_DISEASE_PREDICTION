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
    # hàm check xem request ajax
    def is_ajax(self,request):
        return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'

    # hàm xử lý khi có request ajax gửi đến
    def get(self,request):
        # If: request ajax thì thực hiện nhận dữ liệu 
        # Sử dụng module disease_prediction với phương thức run --> return disease, accuracy 
        #                                                       --> JsonResponse
        # Else: trả về trang index.html
        if self.is_ajax(request):
            resultArr=request.GET.get('jsonString')
            print(resultArr)
            
            jsonA=json.loads(resultArr)
            # for item in jsonA:
            #     print(item['name'])

            symptoms=[] # mảng chứa các symptom

            for item in jsonA:
                symptom = " ".join([i.capitalize() for i in item['name'].split(" ")])
                symptoms.append(symptom)

            disease,accuracy=run(symptoms)

            print("==================================================")
            print("Input: "+ str(symptoms))
            print("Disease: "+str(disease))
            print("Accuracy: "+str(accuracy))
            print("==================================================")

            context={'disease':disease,'accuracy':accuracy}
            return JsonResponse(context)
        
        return render(request,'index.html')