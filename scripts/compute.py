import sys
import json

rawdata = ""
for line in sys.stdin:
    rawdata += line

data = json.loads(rawdata)

compPorts = {
    't-ff': ['output', 'output', 'input'],
    'd-ff': ['output', 'output', 'input'],
    'rs-ff': ['output', 'output', 'input', 'input'],
    'jk-ff': ['output', 'output', 'input', 'input'],
    'and-gate': ['output', 'input', 'input'],
    'or-gate': ['output', 'input', 'input'],
    'not-gate': ['output', 'input'],
    'inputg': ['output'],
    'outputg': ['input']
}


colorToComp = dict()

if ('ffs' not in data):
    print('Format Error')
    sys.exit(-1)
if ('gates' not in data):
    print('Format Error')
    sys.exit(-1)
if ('inputs' not in data):
    print('Format Error')
    sys.exit(-1)
if ('outputs' not in data):
    print('Format Error')
    sys.exit(-1)

colorMax = 0

for comp in data['ffs'] + data['gates'] + data['inputs'] + data['outputs']:
    for idx in range(0, len(comp['colorList'])):
        if (compPorts[comp['type']][idx] == 'output'):
            if (comp['colorList'][idx] in colorToComp):
                print('Format Error')
                sys.exit(-1)
            colorMax = max(colorMax, comp['colorList'][idx])
            colorToComp[comp['colorList'][idx]] = comp
            # print('color', comp['colorList'][idx], colorToComp[comp['colorList'][idx]])

# print(colorMax)
colorState = [-1 for i in range(colorMax + 5)]

def getcolorstate(x):
    if (x == 0):
        print('Input not set')
        sys.exit(-1)
    if (colorState[x] == -2):
        print('Combinational loop found')
        sys.exit(-1)
    if (colorState[x] >= 0):
        return colorState[x]
    colorState[x] = -2
    tcomp = colorToComp[x]
    if (tcomp['type'] == 'and-gate'):
        i1 = getcolorstate(tcomp['colorList'][1])
        i2 = getcolorstate(tcomp['colorList'][2])
        res = 1 if (i1 and i2) else 0
        colorState[x] = res
        return colorState[x]
    elif (tcomp['type'] == 'or-gate'):
        i1 = getcolorstate(tcomp['colorList'][1])
        i2 = getcolorstate(tcomp['colorList'][2])
        res = 1 if (i1 or i2) else 0
        colorState[x] = res
        return colorState[x]
    elif (tcomp['type'] == 'not-gate'):
        i1 = getcolorstate(tcomp['colorList'][1])
        res = 1 - i1
        colorState[x] = res
        return colorState[x]
    elif (tcomp['type'] == 'input'):
        print("Moore Machine output should not depend on input");
        sys.exit(-1);
    else :
        print("Unknown Error");
        sys.exit(-1);

ret = dict()

if (data['machineType'] == 'Mealy Machine'):
    for stateMask in range(0, 1 << data['numFF']):
        state = ""
        for i in range(0, data['numFF']):
            if (stateMask & (1 << i)):
                state += '1'
            else:
                state += '0'
        ret[state] = dict()
        for inputMask in range(0, 1 << data['numInput']):
            inp = ""
            for i in range(0, data['numInput']):
                if (inputMask & (1 << i)):
                    inp += '1'
                else:
                    inp += '0'

            colorState = [-1 for i in range(colorMax + 5)]
            for idd , comp in zip(range(len(data['ffs'])), data['ffs']):
                curstate = 1 if (state[idd] == '1') else 0
                colorState[comp['colorList'][0]] = curstate ;
                colorState[comp['colorList'][1]] = 1 - curstate ;

            for idd , comp in zip(range(len(data['ffs'])), data['inputs']):
                curstate = 1 if (inp[idd] == '1') else 0
                colorState[comp['colorList'][0]] = curstate ;

            nxtstate , nout = "" , ""
            for idd , comp in zip(range(len(data['ffs'])), data['ffs']):
                curstate = 1 if (state[idd] == '1') else 0
                if (comp['type'] == 'd-ff'):
                    i1 = getcolorstate(comp['colorList'][2])
                    nxtstate += "1" if (i1 == 1) else "0"
                elif (comp['type'] == 't-ff'):
                    i1 = getcolorstate(comp['colorList'][2])
                    if (i1): curstate = 1 - curstate
                    nxtstate += "1" if (curstate == 1) else "0"
                elif (comp['type'] == 'jk-ff'):
                    i1 = getcolorstate(comp['colorList'][2])
                    i2 = getcolorstate(comp['colorList'][3])
                    if (i1 and i2): nxtstate += "1" if (1 - curstate == 1) else "0"
                    elif (i1 and not i2): nxtstate += "1"
                    elif (not i1 and i2): nxtstate += "0"
                    elif (not i1 and not i2): nxtstate += "1" if (curstate == 1) else "0"
                elif (comp['type'] == 'rs-ff'):
                    i1 = getcolorstate(comp['colorList'][2])
                    i2 = getcolorstate(comp['colorList'][3])
                    if (i1 and i2):
                        print('Invalid state for R-S Flip Flop')
                        sys.exit(-1)
                    elif (i1 and not i2): nxtstate += "1"
                    elif (not i1 and i2): nxtstate += "0"
                    elif (not i1 and not i2): nxtstate += "1" if (curstate == 1) else "0"

            for idd , comp in zip(range(len(data['outputs'])), data['outputs']):
                i1 = getcolorstate(comp['colorList'][0])
                nout += "1" if (i1 == 1) else "0"

            ret[state][inp] = {'nxtstate': nxtstate, 'output': nout}
elif (data['machineType'] == 'Moore Machine'):
    for stateMask in range(0, 1 << data['numFF']):
        state = ""
        for i in range(0, data['numFF']):
            if (stateMask & (1 << i)):
                state += '1'
            else:
                state += '0'
        ret[state] = dict()
        colorState = [-1 for i in range(colorMax + 5)]
        for idd , comp in zip(range(len(data['ffs'])), data['ffs']):
            curstate = 1 if (state[idd] == '1') else 0
            colorState[comp['colorList'][0]] = curstate ;
            colorState[comp['colorList'][1]] = 1 - curstate ;
        nout = ""
        for idd , comp in zip(range(len(data['outputs'])), data['outputs']):
            i1 = getcolorstate(comp['colorList'][0])
            nout += "1" if (i1 == 1) else "0"

        ret[state]["output"] = nout

        for inputMask in range(0, 1 << data['numInput']):
            inp = ""
            for i in range(0, data['numInput']):
                if (inputMask & (1 << i)):
                    inp += '1'
                else:
                    inp += '0'

            colorState = [-1 for i in range(colorMax + 5)]
            for idd , comp in zip(range(len(data['ffs'])), data['ffs']):
                curstate = 1 if (state[idd] == '1') else 0
                colorState[comp['colorList'][0]] = curstate ;
                colorState[comp['colorList'][1]] = 1 - curstate ;

            for idd , comp in zip(range(len(data['ffs'])), data['inputs']):
                curstate = 1 if (inp[idd] == '1') else 0
                colorState[comp['colorList'][0]] = curstate ;

            nxtstate = ""
            for idd , comp in zip(range(len(data['ffs'])), data['ffs']):
                curstate = 1 if (state[idd] == '1') else 0
                if (comp['type'] == 'd-ff'):
                    i1 = getcolorstate(comp['colorList'][2])
                    nxtstate += "1" if (i1 == 1) else "0"
                elif (comp['type'] == 't-ff'):
                    i1 = getcolorstate(comp['colorList'][2])
                    if (i1): curstate = 1 - curstate
                    nxtstate += "1" if (curstate == 1) else "0"
                elif (comp['type'] == 'jk-ff'):
                    i1 = getcolorstate(comp['colorList'][2])
                    i2 = getcolorstate(comp['colorList'][3])
                    if (i1 and i2): nxtstate += "1" if (1 - curstate == 1) else "0"
                    elif (i1 and not i2): nxtstate += "1"
                    elif (not i1 and i2): nxtstate += "0"
                    elif (not i1 and not i2): nxtstate += "1" if (curstate == 1) else "0"
                elif (comp['type'] == 'rs-ff'):
                    i1 = getcolorstate(comp['colorList'][2])
                    i2 = getcolorstate(comp['colorList'][3])
                    if (i1 and i2):
                        print('Invalid state for R-S Flip Flop')
                        sys.exit(-1)
                    elif (i1 and not i2): nxtstate += "1"
                    elif (not i1 and i2): nxtstate += "0"
                    elif (not i1 and not i2): nxtstate += "1" if (curstate == 1) else "0"


            ret[state][inp] = {'nxtstate': nxtstate}
else :
    print('Invalid Machine Type')
    sys.exit(-1)

print(ret)

