// const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let searchTimeout = 0;
// const symtonApi = 'http://localhost:3000/symptons'
const symtonApi = "http://127.0.0.1:5501/data/db.json";
const symptons = [
  {
    id: 1,
    title: "Itching",
    trieuChung: "itching",
  },
  {
    id: 2,
    title: "Skin rash",
    trieuChung: "skin_rash",
  },
  {
    id: 3,
    title: "Nodal skin eruptions",
    trieuChung: "nodal_skin_eruptions",
  },
  {
    id: 4,
    title: "Continuous sneezing",
    trieuChung: "continuous_sneezing",
  },
  {
    id: 5,
    title: "Shivering",
    trieuChung: "shivering",
  },
  {
    id: 6,
    title: "Chills",
    trieuChung: "chills",
  },
  {
    id: 7,
    title: "Joint pain",
    trieuChung: "joint_pain",
  },
  {
    id: 8,
    title: "Stomach pain",
    trieuChung: "stomach_pain",
  },
  {
    id: 9,
    title: "Acidity",
    trieuChung: "acidity",
  },
  {
    id: 10,
    title: "Ulcers on tongue",
    trieuChung: "ulcers_on_tongue",
  },
  {
    id: 11,
    title: "Muscle wasting",
    trieuChung: "muscle_wasting",
  },
  {
    id: 12,
    title: "Vomiting",
    trieuChung: "vomiting",
  },
  {
    id: 13,
    title: "Burning micturition",
    trieuChung: "burning_micturition",
  },
  {
    id: 14,
    title: "Spotting urination",
    trieuChung: "spotting_urination",
  },
  {
    id: 15,
    title: "Fatigue",
    trieuChung: "Fatigue",
  },
  {
    id: 16,
    title: "Weight gain",
    trieuChung: "weight_gain",
  },
  {
    id: 17,
    title: "Anxiety",
    trieuChung: "anxiety",
  },
  {
    id: 18,
    title: "Cold hands and feets",
    trieuChung: "cold_hands_and_feets",
  },
  {
    id: 19,
    title: "Mood swings",
    trieuChung: "mood_swings",
  },
  {
    id: 20,
    title: "Weight loss",
    trieuChung: "weight_loss",
  },
  {
    id: 21,
    title: "Restlessness",
    trieuChung: "restlessness",
  },
  {
    id: 22,
    title: "Lethargy",
    trieuChung: "lethargy",
  },
  {
    id: 23,
    title: "Patches In Throat",
    trieuChung: "patches_in_throat",
  },
  {
    id: 24,
    title: "Irregular Sugar Level",
    trieuChung: "irregular_sugar_level",
  },
  {
    id: 25,
    title: "Cough",
    trieuChung: "cough",
  },
  {
    id: 26,
    title: "High Fever",
    trieuChung: "high_fever",
  },
  {
    id: 27,
    title: "Sunken Eyes",
    trieuChung: "sunken_eyes",
  },
  {
    id: 28,
    title: "Breathlessness",
    trieuChung: "breathlessness",
  },
  {
    id: 29,
    title: "Sweating",
    trieuChung: "sweating",
  },
  {
    id: 30,
    title: "Dehydration",
    trieuChung: "dehydration",
  },
  {
    id: 31,
    title: "Indigestion",
    trieuChung: "indigestion",
  },
  {
    id: 32,
    title: "Headache",
    trieuChung: "headache",
  },
  {
    id: 33,
    title: "Yellowish Skin",
    trieuChung: "yellowish_skin",
  },
  {
    id: 34,
    title: "Dark Urine",
    trieuChung: "dark_urine",
  },
  {
    id: 35,
    title: "Nausea",
    trieuChung: "nausea",
  },
  {
    id: 36,
    title: "Loss Of Appetite",
    trieuChung: "loss_of_appetite",
  },
  {
    id: 37,
    title: "Pain Behind The Eyes",
    trieuChung: "pain_behind_the_eyes",
  },
  {
    id: 38,
    title: "Back Pain",
    trieuChung: "back_pain",
  },
  {
    id: 39,
    title: "Constipation",
    trieuChung: "constipation",
  },
  {
    id: 40,
    title: "Abdominal Pain",
    trieuChung: "abdominal_pain",
  },
  {
    id: 41,
    title: "Diarrhoea",
    trieuChung: "diarrhoea",
  },
  {
    id: 42,
    title: "Mild Fever",
    trieuChung: "mild_fever",
  },
  {
    id: 43,
    title: "Yellow Urine",
    trieuChung: "yellow_urine",
  },
  {
    id: 44,
    title: "Yellowing Of Eyes",
    trieuChung: "yellowing_of_eyes",
  },
  {
    id: 45,
    title: "Acute Liver Failurehoea",
    trieuChung: "acute_liver_failure",
  },
  {
    id: 46,
    title: "Fluid Overload",
    trieuChung: "fluid_overload",
  },
  {
    id: 47,
    title: "Swelling Of Stomach",
    trieuChung: "swelling_of_stomach",
  },
  {
    id: 48,
    title: "Swelled Lymph Nodes",
    trieuChung: "swelled_lymph_nodes",
  },
  {
    id: 49,
    title: "Malaise",
    trieuChung: "malaise",
  },
  {
    id: 50,
    title: "Blurred And Distorted Vision",
    trieuChung: "blurred_and_distorted_vision",
  },
  {
    id: 51,
    title: "Phlegm",
    trieuChung: "phlegm",
  },
  {
    id: 52,
    title: "Throat Irritation",
    trieuChung: "malThroat_irritationaise",
  },
  {
    id: 53,
    title: "Redness Of Eyes",
    trieuChung: "redness_of_eyes",
  },
  {
    id: 54,
    title: "Sinus Pressurelaise",
    trieuChung: "sinus_pressure",
  },
  {
    id: 55,
    title: "Runny Nose",
    trieuChung: "runny_nose",
  },
  {
    id: 56,
    title: "Congestion",
    trieuChung: "congestion",
  },
  {
    id: 57,
    title: "Chest Pain",
    trieuChung: "chest_pain",
  },
  {
    id: 58,
    title: "Weakness In Limbs",
    trieuChung: "weakness_in_limbs",
  },
  {
    id: 59,
    title: "Fast Heart Rate",
    trieuChung: "fast_eart_rate",
  },
  {
    id: 60,
    title: "Pain During Bowel Movements",
    trieuChung: "pain_during_bowel_movements",
  },
  {
    id: 61,
    title: "Pain In Anal Region",
    trieuChung: "pain_in_anal_region",
  },
  {
    id: 62,
    title: "Bloody Stool",
    trieuChung: "bloody_stool",
  },
  {
    id: 63,
    title: "Irritation In Anus",
    trieuChung: "irritation_in_anus",
  },
  {
    id: 64,
    title: "Neck Pain",
    trieuChung: "neck_pain",
  },
  {
    id: 65,
    title: "Dizziness",
    trieuChung: "dzziness",
  },
  {
    id: 66,
    title: "Cramps",
    trieuChung: "cramps",
  },
  {
    id: 67,
    title: "Bruising",
    trieuChung: "bruising",
  },
  {
    id: 68,
    title: "Obesity",
    trieuChung: "obesity",
  },
  {
    id: 69,
    title: "Swollen Legs",
    trieuChung: "Swollen Legs",
  },
  {
    id: 70,
    title: "Swollen Blood Vessels",
    trieuChung: "swollen_blood_vessels",
  },
  {
    id: 71,
    title: "ObePuffy Face And Eyessity",
    trieuChung: "puffy_face_and_eyes",
  },
  {
    id: 72,
    title: "Enlarged Thyroid",
    trieuChung: "enlarged_thyroid",
  },
  {
    id: 73,
    title: "Brittle Nails",
    trieuChung: "brittle_nails",
  },
  {
    id: 74,
    title: "Swollen Extremeties",
    trieuChung: "swollen_extremeties",
  },
  {
    id: 75,
    title: "Excessive Hunger",
    trieuChung: "excessive_hunger",
  },
  {
    id: 76,
    title: "Extra Marital Contacts",
    trieuChung: "extra_marital_contacts",
  },
  {
    id: 77,
    title: "Drying And Tingling Lipsesity",
    trieuChung: "drying_and_tingling_lips",
  },
  {
    id: 78,
    title: "Slurred Speech",
    trieuChung: "slurred_speech",
  },
  {
    id: 79,
    title: "Knee Pain",
    trieuChung: "knee_pain",
  },
  {
    id: 80,
    title: "Hip Joint Pain",
    trieuChung: "hip_joint_pain",
  },
  {
    id: 81,
    title: "Muscle Weakness",
    trieuChung: "muscle_weakness",
  },
  {
    id: 82,
    title: "Stiff Neck",
    trieuChung: "stiff_neckbesity",
  },
  {
    id: 83,
    title: "Swelling Joints",
    trieuChung: "swelling_joints",
  },
  {
    id: 84,
    title: "Movement Stiffness",
    trieuChung: "movement_stiffness",
  },
  {
    id: 85,
    title: "Spinning Movements",
    trieuChung: "spinning_movements",
  },
  {
    id: 86,
    title: "Loss Of Balance",
    trieuChung: "loss_of_balance",
  },
  {
    id: 87,
    title: "Unsteadiness",
    trieuChung: "unsteadiness",
  },
  {
    id: 88,
    title: "Weakness Of One Body Side",
    trieuChung: "weakness_of_one_body_side",
  },
  {
    id: 89,
    title: "Loss Of Smell",
    trieuChung: "loss_of_smell",
  },
  {
    id: 90,
    title: "Bladder Discomfort",
    trieuChung: "bladder_discomfort",
  },
  {
    id: 91,
    title: "Foul Smell Of urine",
    trieuChung: "foul_smell_of_urine",
  },
  {
    id: 92,
    title: "Continuous Feel Of Urine",
    trieuChung: "continuous_feel_of_urine",
  },
  {
    id: 93,
    title: "Passage Of Gases",
    trieuChung: "passage_of_gases",
  },
  {
    id: 94,
    title: "Internal Itching",
    trieuChung: "internal_itching",
  },
  {
    id: 95,
    title: "Toxic Look (typhos)",
    trieuChung: "toxic_look",
  },
  {
    id: 96,
    title: "Depression",
    trieuChung: "depression",
  },
  {
    id: 97,
    title: "Irritability",
    trieuChung: "irritability",
  },
  {
    id: 98,
    title: "Muscle Pain",
    trieuChung: "muscle_pain",
  },
  {
    id: 99,
    title: "Altered Sensorium",
    trieuChung: "altered_sensorium",
  },
  {
    id: 100,
    title: "Red Spots Over Body",
    trieuChung: "Red Spots Over Body",
  },
  {
    id: 101,
    title: "Belly Pain",
    trieuChung: "belly_pain",
  },
  {
    id: 102,
    title: "Abnormal Menstruation",
    trieuChung: "abnormal_menstruation",
  },
  {
    id: 103,
    title: "Dischromic  Patches",
    trieuChung: "Dischromic_patches",
  },
  {
    id: 104,
    title: "Watering From Eyes",
    trieuChung: "Watering_from_eyes",
  },
  {
    id: 105,
    title: "Increased Appetite",
    trieuChung: "increased_appetite",
  },
  {
    id: 106,
    title: "Polyuria",
    trieuChung: "polyuria",
  },
  {
    id: 107,
    title: "Family History",
    trieuChung: "family_history",
  },
  {
    id: 108,
    title: "Mucoid Sputum",
    trieuChung: "mucoid_sputum",
  },
  {
    id: 109,
    title: "Rusty Sputum",
    trieuChung: "rusty_sputum",
  },
  {
    id: 110,
    title: "Lack Of Concentration",
    trieuChung: "lack_ofoncentration",
  },
  {
    id: 111,
    title: "Visual Disturbances",
    trieuChung: "visual_disturbances",
  },
  {
    id: 112,
    title: "Receiving Blood Transfusion",
    trieuChung: "receiving_blood_transfusion",
  },
  {
    id: 113,
    title: "Receiving Unsterile Injections",
    trieuChung: "receiving_unsterile_injections",
  },
  {
    id: 114,
    title: "Coma",
    trieuChung: "coma",
  },
  {
    id: 115,
    title: "Stomach Bleeding",
    trieuChung: "stomach_bleeding",
  },
  {
    id: 116,
    title: "Distention Of Abdomen",
    trieuChung: "distention_of_abdomen",
  },
  {
    id: 117,
    title: "History Of Alcohol Consumption",
    trieuChung: "history_of_alcohol_consumption",
  },
  {
    id: 118,
    title: "Fluid Overload.1",
    trieuChung: "fluid_overload.1",
  },
  {
    id: 119,
    title: "Blood In Sputum",
    trieuChung: "blood_in_sputum",
  },
  {
    id: 120,
    title: "Prominent Veins On Calf",
    trieuChung: "prominent_veins_on_calf",
  },
  {
    id: 121,
    title: "Palpitations",
    trieuChung: "palpitations",
  },
  {
    id: 122,
    title: "Painful Walking",
    trieuChung: "painful_walking",
  },
  {
    id: 123,
    title: "Pus Filled Pimples",
    trieuChung: "pus_filled_pimples",
  },
  {
    id: 124,
    title: "Blackheads",
    trieuChung: "blackheads",
  },
  {
    id: 125,
    title: "Scurring",
    trieuChung: "scurring",
  },
  {
    id: 126,
    title: "Skin Peeling",
    trieuChung: "skin_peeling",
  },
  {
    id: 127,
    title: "Silver Like Dusting",
    trieuChung: "silver_like_dusting",
  },
  {
    id: 128,
    title: "Small Dents In Nails",
    trieuChung: "small_dents_in_nails",
  },
  {
    id: 129,
    title: "Inflammatory Nails",
    trieuChung: "inflammatory_nails",
  },
  {
    id: 130,
    title: "Blister",
    trieuChung: "blister",
  },
  {
    id: 131,
    title: "Red Sore Around Nose",
    trieuChung: "red_sore_around_nose",
  },
  {
    id: 132,
    title: "Yellow Crust Ooze",
    trieuChung: "yellow_crustoze",
  },
  
];
const seeAdditionalInfo = document.querySelector(".info-page__hide-text");
const hideAdditionalInfo = document.querySelector(".fa-chevron-up");
const addtionalInfo = document.querySelector(".info-page__show-text");
const male = document.querySelector(".gender-button__male");
const female = document.querySelector(".gender-button__female");
const buttonContinueInfo = document.querySelector(".js-btn-continue-info");
const infoPage = document.querySelector(".info-page");
const symptonPage = document.querySelector(".symptons-page");
const navbarSympton = document.querySelector(".navbar-symptom");
const bodyImgMale = document.querySelector(".body-img__male");
const bodyImgFemale = document.querySelector(".body-img__female");
const symptonPre = document.querySelector(".symptons-pre");
const symptonInput = document.querySelector(".symptons-page__input");
const resultArr = [];
const resultNameArr = [];
const buttonContinueSymptons = document.querySelector(".js-btn-continue-symptons");
const navbarResult = document.querySelector(".navbar-result");
const resultPre = document.querySelector(".result-pre");
const resultPage = document.querySelector(".result-page");
const symptomResults = $$(".result-page__symptom");

var check=true

const addResult = (id) => {
  count = 0;
  symptons.map(function (sympton) {
    count++;
    if (sympton.id == id) {
      document.querySelector(".sympton-page__added-img").style.display = "none";
      document.querySelector(".sympton-page__added-text").style.display = "none";
      document.querySelector(".sympton-page__added-title").style.display = "block";
      const checkResult = resultArr.some((result) => {
        // return result == sympton.title
        return result == sympton.trieuChung;
      });
      if (!checkResult) {
        resultArr.push(sympton.title)
        // resultArr.push(sympton.trieuChung);
        resultNameArr.push(sympton.title);
        $('.result-page__heading').text("Tên bệnh")
        $('.result-page__description').text("Độ chính xác")
        
        check=true
      }
    }
  });
  console.log(resultNameArr);
  // console.log(resultNameArr)
  var htmls = resultNameArr.map(function (result, index) {
    return `
                <li class="sympton-page__item">
                    <div class="sympton-page__group">
                        <span class="sympton-page__text">${result}</span>
                        <span class="sympton-page__icon" onclick="deleteResult(${index})"><i class="fas fa-trash"></i></span>
                    </div>
                </li>
            `;
  });
  var html = htmls.join("");
  if (count == 0) {
    console.log("No result");
    html = `
                <li class="symptons-page__result no-result">
                    <h3 class="symptons-page__result-name">No Result</h3>
                </li> 
                `;
  }
  document.querySelector(".sympton-page__list").innerHTML = html;
  document.querySelector(".symptons-page__list").style.display = "none";
  symptonInput.value = "";
};

const deleteResult = (index) => {
  resultArr.splice(index, 1);
  resultNameArr.splice(index, 1);
  var htmls = resultNameArr.map(function (result, index) {
    return `
        <li class="sympton-page__item">
            <div class="sympton-page__group">
                <span class="sympton-page__text">${result}</span>
                <span class="sympton-page__icon" onclick="deleteResult(${index})"><i class="fas fa-trash"></i></span>
            </div>
        </li>
    `;
  });
  var html = htmls.join("");
  if (count == 0) {
    console.log("No result");
    html = `
        <li class="symptons-page__result no-result">
            <h3 class="symptons-page__result-name">No Result</h3>
        </li> 
        `;
  }
  document.querySelector(".sympton-page__list").innerHTML = html;
  if (resultArr.length == 0) {
    document.querySelector(".sympton-page__added-img").style.display = "initial";
    document.querySelector(".sympton-page__added-text").style.display = "block";
    document.querySelector(".sympton-page__added-title").style.display = "none";
  }
  console.log(resultArr);
};

const app = {
  checkGenderClick() {
    male.onclick = () => {
      male.classList.add("gender-button--checked");
      female.classList.remove("gender-button--checked");
    };
    female.onclick = () => {
      female.classList.add("gender-button--checked");
      male.classList.remove("gender-button--checked");
    };
  },
  handleEvents() {
    // Ẩn Addtional Info
    seeAdditionalInfo.onclick = () => {
      seeAdditionalInfo.style.display = "none";
      addtionalInfo.style.display = "block";
    };
    // Hiện Addtional Info
    hideAdditionalInfo.onclick = () => {
      seeAdditionalInfo.style.display = "inline-block";
      addtionalInfo.style.display = "none";
    };

    // Xử lý Continue tại Info page
    buttonContinueInfo.onclick = () => {
      infoPage.style.display = "none";
      navbarSympton.classList.add("navbar-info__item--checked");

      symptonPage.style.display = "block";
      if (male.classList.contains("gender-button--checked")) {
        bodyImgMale.style.display = "block";
        bodyImgFemale.style.display = "none";
      }
      if (female.classList.contains("gender-button--checked")) {
        bodyImgFemale.style.display = "block";
        bodyImgMale.style.display = "none";
      }
    };
    // Sympton page
    symptonPre.onclick = () => {
      infoPage.style.display = "block";
      symptonPage.style.display = "none";
      navbarSympton.classList.remove("navbar-info__item--checked");
    };

    document.querySelector(".symptons-page").onclick = (e) => {
      document.querySelector(".symptons-page__list").style.display = "none";
    };

    document.querySelector(".symptons-page__input-wrapper").onclick = (e) => {
      e.stopPropagation();
    };

    // Sympton input on input event
    symptonInput.oninput = (e) => {
      clearTimeout(searchTimeout);

      searchTimeout = setTimeout(() => {
        // console.log(e.target.value)
        this.renderSymptons(e.target.value);
      }, 300);
    };

    symptonInput.onclick = (e) => {
      document.querySelector(".symptons-page__list").style.display = "block";
      // this.renderSymptons(e.target.value)
    };

    buttonContinueSymptons.onclick = () => {
      setTimeout(5000)
      
      var dict = []
      for(let i=0;i<resultArr.length;i++){
        dict.push({name:resultArr[i]})
      }
      // alert(typeof(JSON.stringify(dict)))

      var jsonString=JSON.stringify(dict)
      console.log(jsonString)
      if(check==true){
        $.ajax({
          url:'',
          type:'get',
          data:{jsonString:jsonString},
          success: function(response){
              $('.result-page__heading').append(' : '+ response.disease)
              $('.result-page__description').append(' : '+ response.accuracy +' %' )
          }
      });
      }
      navbarResult.classList.add("navbar-info__item--checked");
      symptonPage.style.display = "none";
      resultPage.style.display = "block";
    };

    // Ẩn Addtional Resul
    for (let i = 0; i < symptomResults.length; i++) {
      symptomResults[i].onclick = () => {
        if (
          symptomResults[i].classList.contains("result-page__symptom--active")
        ) {
          symptomResults[i].classList.remove("result-page__symptom--active");
        } else {
          symptomResults[i].classList.add("result-page__symptom--active");
        }
      };
    }

    resultPre.onclick = () => {
      check=false
      symptonPage.style.display = "block";
      resultPage.style.display = "none";
      navbarResult.classList.remove("navbar-info__item--checked");
    };
  },
  checkContinueInfoPage() {
    // Nhớ clear Intever
    const number = setInterval(() => {
      if (
        document.querySelector(".info-page__check-age-input").value &&
        (document.querySelector(".gender-button__male").classList.contains(
          "gender-button--checked"
        ) ||
          document.querySelector(".gender-button__female").classList.contains(
            "gender-button--checked"
          ))
      ) {
        buttonContinueInfo.classList.add("btn-continue--valid");
        buttonContinueInfo.classList.remove("btn-continue--invalid");
        buttonContinueInfo.disabled = false;
      } else {
        buttonContinueInfo.classList.add("btn-continue--invalid");
        buttonContinueInfo.classList.remove("btn-continue--valid");
        buttonContinueInfo.disabled = true;
      }
    });

    // clearInterval(number)
  },
  renderSymptons(inputValue) {
    document.querySelector(".symptons-page__list").style.maxHeight = "300px";

    var count = 0;
    var htmls = symptons.map(function (sympton, id) {
      // if (sympton.title.includes(inputValue)) {
      if (sympton.trieuChung.includes(inputValue)) {
        count++;
        return `
                            <li class="symptons-page__result" onclick="addResult(${
                              id + 1
                            })">
                                <h3 class="symptons-page__result-name">${
                                  sympton.title
                                }</h3>
                                <span class="symptons-page__result-add">ADD</span>
                            </li>
                        `;
      }
    });
    var html = htmls.join("");
    if (count == 0) {
      console.log("No result");
      html = `
                    <li class="symptons-page__result no-result">
                        <h3 class="symptons-page__result-name">No Result</h3>
                    </li> 
                    `;
    }
    document.querySelector(".symptons-page__list").innerHTML = html;
  },
  start() {
    this.handleEvents();
    this.checkContinueInfoPage();
    this.checkGenderClick();
  },
};
app.start();