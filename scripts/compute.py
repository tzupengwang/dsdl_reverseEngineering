import sys
import json

rawdata = ""
for line in sys.stdin:
    rawdata += line

data = json.loads(rawdata)
print(data)

for stateMask in range(0, 1 << data['numFF']):
    arr = ""
    for i in range(0, data['numFF']):
        if (stateMask & (1 << i)):
            arr += '1'
        else:
            arr += '0'
    print(arr)

sys.exit(-1)

