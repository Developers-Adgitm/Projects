from tkinter import *
import math
from pygame import mixer
import speech_recognition

mixer.init()

root=Tk()
root.title("Scientific Calculator")
root.config(bg='dark green')
root.geometry("546x382+100+100")

calculator=PhotoImage(file='cal.png')
calculator = calculator.subsample(8)
calculatorlabel=Label(root,image=calculator,bg='dark green')
calculatorlabel.grid(row=0,column=0)

def add(a,b):
    return a+b

def mul(a,b):
    return a*b

def sub(a,b):
    return a-b

def div(a,b):
    return a/b

def mod(a,b):
    return a%b

def lcm(a,b):
    l=math.lcm(a,b)
    return l

def hcf(a,b):
    h=math.gcd(a,b)
    return h

operations={'ADD':add,'ADDITION':add,'PLUS':add,'SUM':add,
            'SUBTRACT':sub,'SUBTRACTION':sub,'MINUS':sub,'SUB':sub,'DIFFERENCE':sub,
            'DIVIDE':div,'DIVISION':div,"DIV":div,
            'MULTIPLY':mul,'MULIPLICATION':mul,'PRODUCT':mul,
            'LCM':lcm, 'HCF':hcf,
            'MOD':mod,'REMAINDER':mod,'MODULUS':mod}

def findnumbers(t):
    l=[]
    for num in t:
        try:
            l.append(int(num))
        except ValueError:
            pass
    return l        

def audio():
    mixer.music.load('music1.wav')
    mixer.music.play()
    sr = speech_recognition.Recognizer()
    with speech_recognition.Microphone()as m:
        try:
            sr.adjust_for_ambient_noise(m,duration=0.2)
            voice=sr.listen(m)
            text=sr.recognize_google(voice)
            print(text)
            mixer.music.load('music2.wav')
            mixer.music.play()
            text_list=text.split(" ")

            for word in text_list:
                if word.upper() in operations.keys():
                    l=findnumbers(text_list)
                    result=operations[word.upper()](l[0],l[1])
                    entryfield.delete(0,END)
                    entryfield.insert(END,result)
                else:
                    pass
        except:
            pass

mic=PhotoImage(file='mic3.png')
mic = mic.subsample(6)
micbutton=Button(root,image=mic,bg='light green',bd=1,width=60,height=60,justify='left',
                 background='dark green',activebackground="light green",command=audio)
micbutton.grid(row=0,column=7)

entryfield=Entry(root,font=('Times',20,"bold"),bg="light green",fg='black',bd=9,relief=SUNKEN,justify='right',width=27
                )

entryfield.grid(column=0,row=0,columnspan=8)

def click(value):
    ex=entryfield.get()
    ans=''

    try:
        if value=='C':
            ex=ex[0:len(ex)-1]
            entryfield.delete(0,END)
            entryfield.insert(0,ex)
            return

        elif value=='CE':
            entryfield.delete(0,END)
        
        elif value=='√':
            ans=math.sqrt(eval(ex))

        elif value=='π':
            ans=math.pi
    
        elif value=='2π':
            ans=2*math.pi

        elif value=='cosθ':
            ans=math.cos(math.radians(eval(ex)))
    
        elif value=='tanθ':
            ans=math.tan(math.radians(eval(ex)))
    
        elif value=='sinθ':
            ans=math.sin(math.radians(eval(ex)))

        elif value=='cosh':
            ans=math.cosh(eval(ex))

        elif value=='sinh':
            ans=math.sinh(eval(ex))

        elif value=='tanh':
            ans=math.tanh(eval(ex))

        elif value==chr(8731):
            ans= eval(ex)**1/3

        elif value=="x\u02b8":
            entryfield.insert(END,'**')
            return

        elif value=="x\u00B3":
            ans= eval(ex)**3

        elif value=="x\u00B2":
            ans= eval(ex)**2

        elif value=='ln':
            ans =math.log2(eval(ex))

        elif value=='log10':
            ans =math.log10(eval(ex))

        elif value=='e':
            ans =math.e

        elif value=='deg':
            ans =math.degrees(eval(ex))

        elif value=='rad':
            ans =math.radians(eval(ex))

        elif value=='x!':
            ans= math.factorial(eval(ex))

        elif value== chr(247):
            entryfield.insert(END,'/')
            return
        
        elif value=='=':
            ans=eval(ex)
        
        else:
            entryfield.insert(END,value)
            return
        
    except SyntaxError:
        pass

    entryfield.delete(0,END)
    entryfield.insert(0,ans)


# for first button "C"
button_text_list=['C',"CE","√","+",'π','cosθ',"tanθ","sinθ",
                  "1","2","3","-","2π",'cosh',"tanh","sinh",
                  "4","5","6","*",chr(8731),"x\u02b8","x\u00B3","x\u00B2",
                  "7","8","9",chr(247),'ln','deg','rad','e',
                  "0",'.','%','=',"log10","(",")","x!"]
rowvalue=1
columnvalue=0
for i in button_text_list:

    button =Button(root,width=5,height=2,bd=1,relief='sunken',text=i,bg='dark green',fg='white',
                   font=("Times",15,'bold'),command=lambda button=i:click(button),activebackground='light green'
                   ,foreground='white')
    button.grid(row=rowvalue,column=columnvalue,pady=1)
    columnvalue+=1
    if columnvalue>7:
        rowvalue+=1
        columnvalue=0
entryfield.grid(row=0,column=0)
root.mainloop()