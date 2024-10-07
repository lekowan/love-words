import re
from mechanize import Browser
from bs4 import BeautifulSoup
import time

# import external file
import raw

allSyllableMap = {}

# import raw object
raw_array = raw.obj


# clean up raw object
for o in raw_array:
  o_id = o.strip()
  y = raw_array[o]['character'].strip()
  k = raw_array[o]['letter'].strip()
 
  #print(y)
  allSyllableMap[o_id] = { 'character': y , 'letter' : k}


dictionary = {}


def convert_to_text(tag):
    gloss = tag.findAll('span', attrs={"class":"gloss-desc"})[0]
    return gloss.text.strip()

def find_dt(tag):
    return tag.findAll('dt')[0]

def clean_string(string):
    string = re.sub('【.*?】', '', string)
    string = re.sub('[0-9]', '', string)
    string = re.sub('\.', '', string)
    string = re.sub('\u3000', ' ', string)
    return string.strip()

def remove_kanji(string):
    string = re.sub('^[^【]*【', '', string)
    string = re.sub('】', '', string)
    string = re.sub('[0-9]', '', string)
    string = re.sub('\.', '', string)
    return string.strip()

def add_spaces(arg):
    final_array = []
    browser = Browser()
    browser.open("https://ichi.moe")

    browser.select_form(nr=0)
    browser['q'] = arg
    browser["r"] = ["kana"]
 
    response = browser.submit()
    content = response.read()

    result = content.decode('utf-8')

    soup = BeautifulSoup(result,"lxml")

    ### Get Kanji text
    dl_tag_array = soup.findAll('dl', attrs={"class":"alternatives"})
    dt_array = map(lambda tag: find_dt(tag), dl_tag_array)

    kanji_word = []

    for item in dt_array:
        clean_kanji = clean_string(item.text)
        kanji_word.append(clean_kanji)
      
    final_array.append(" ".join(kanji_word))


    ### Get Kana text
    data = [item for item in soup.find_all("span", class_= ["ds-text", "normal-text"]) if len(item["class"]) == 1] 
    #print(data)

    kana_word = []

    for tag in data:
        clean_kana = clean_string(tag.text)
        kana_word.append(clean_kana)
 
    final_array.append(" ".join(kana_word))
      

    ### Get definitions
    # go through all definition blocks
    for alt in dl_tag_array:
       
        # extract dt tags that contain word titles
        prop = alt.findChildren("dt" , recursive=False)

        # extract dd tags that contain definitions
        value = alt.findChildren("dd", recursive=False)
        
        # extract kanji
        kanji = clean_string(prop[0].text)


        # create new entry in dictionary object
        dictionary[kanji] = []
       
        # loop through definitions AND title arrays
        for x in range(0, len(prop)):
            kanji_object = {}

            # extract ol tags that contain all definition apart from conjugated verbs
            ol = value[x].findChildren('ol')[0]

            word = prop[x].text
            kanji_object['kana'] = remove_kanji(word)
            
            li_array = ol.findChildren("li")
            dt_text = value[x].findChildren("dt")

            definition_array = list(map(lambda tag: convert_to_text(tag), li_array))
            kanji_object['definition'] = definition_array


            # extract conjugated verbs
            conj = value[x].find_all(attrs={'class':["conjugation"]})

            # extract compounds
            comp = value[x].find_all(attrs={'class':["compounds"]})
            
            ## if conjugated verbs exist
            if conj and not comp:

                if(ol.text.strip() != ""):
                    dictionary[kanji].append(kanji_object)

                conj_object = {}
                conj_type_array = conj[0].findAll('span', attrs={"class":"conj-type"})
                conj_type_negative_array = conj[0].findAll('span', attrs={"class":"conj-negative"}) 
                conj_type_formal_array = conj[0].findAll('span', attrs={"class":"conj-formal"})
                conj_li_array = conj[0].findChildren("li")
                conj_dt_text = conj[0].findChildren("dt")

                verb_definition_array = list(map(lambda tag: convert_to_text(tag), conj_li_array))
                verb = conj_dt_text[0].text
                verb_type =  conj_type_array[0].text
                
                if not conj_type_negative_array:
                    verb_type_negative = ''
                else:
                    verb_type_negative = conj_type_negative_array[0].text

                if not conj_type_formal_array:
                    verb_type_formal = ''
                else:
                    verb_type_formal = conj_type_formal_array[0].text


                conj_object['kanji'] = clean_string(verb)
                conj_object['kana'] = remove_kanji(verb)
                conj_object['definition'] = verb_definition_array
                conj_object['type'] = verb_type + " " + verb_type_negative + " " + verb_type_formal
                #kanji_object['type'] = verb_type

                dictionary[kanji].append(conj_object)

            
            ## if compound
            elif comp:
                #print('comp')
                comp_object = {}
                comp_li_array = comp[0].findChildren("li")
                comp_dt_text = comp[0].findChildren("dt")

                comp_definition_array = list(map(lambda tag: convert_to_text(tag), comp_li_array))
                comp = comp_dt_text[0].text
                
                comp_object['kanji'] = clean_string(comp)
                comp_object['kana'] = remove_kanji(comp)
                comp_object['definition'] = comp_definition_array
                comp_object['type'] = 'compound'

                dictionary[kanji].append(comp_object)

                if conj:

                    conj_object = {}
                    conj_type_array = conj[0].findAll('span', attrs={"class":"conj-type"})
                    conj_type_negative_array = conj[0].findAll('span', attrs={"class":"conj-negative"}) 
                    conj_type_formal_array = conj[0].findAll('span', attrs={"class":"conj-formal"})
                    conj_li_array = conj[0].findChildren("li")
                    conj_dt_text = conj[0].findChildren("dt")

                    verb_definition_array = list(map(lambda tag: convert_to_text(tag), conj_li_array))
                    verb = conj_dt_text[0].text
                    verb_type =  conj_type_array[0].text
                    
                    if not conj_type_negative_array:
                        verb_type_negative = ''
                    else:
                        verb_type_negative = conj_type_negative_array[0].text

                    if not conj_type_formal_array:
                        verb_type_formal = ''
                    else:
                        verb_type_formal = conj_type_formal_array[0].text


                    conj_object['kanji'] = clean_string(verb)
                    conj_object['kana'] = remove_kanji(verb)
                    conj_object['definition'] = verb_definition_array
                    conj_object['type'] = verb_type + " " + verb_type_negative + " " + verb_type_formal
                    #kanji_object['type'] = verb_type

                    dictionary[kanji].append(conj_object)

            else:
                if(ol.text.strip() != ""):
                    dictionary[kanji].append(kanji_object)

    return final_array 


# Set timer
starttime = time.time()
i = 1

while i <= len(allSyllableMap):
    time.sleep(2.5 - ((time.time() - starttime) % 2.5))
    def_array = add_spaces(allSyllableMap[str(i)]["character"])
    allSyllableMap[str(i)]["definition"] = def_array[0]
    allSyllableMap[str(i)]["pinyinSpace"] = def_array[1]
    print(i)
    i = i + 1


allSyllableMap_js = "const allSyllableMap = " + str(allSyllableMap)
dictionary_js = "const dictionary = " + str(dictionary)

with open('dictionary.js', 'w', encoding='utf-8') as f:
    f.write(dictionary_js)

with open('allSyllableMap.js', 'w', encoding='utf-8') as f:
    f.write(allSyllableMap_js)




