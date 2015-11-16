#! /usr/bin/env python 
import sys
import csv
import json

# 
# Takes input file in .csv format and converts to JSON
# For outfile uses inputFileName.json
#
if (len(sys.argv) != 2):
	print "Invoke with csv2json.py fielname.csv"
	print "Output is filename.json"
	exit(1)
[name] = sys.argv[1:]

jsonFileName = name.split(".")[0]+".json"
print "writng to "+jsonFileName

jsonfile = open(jsonFileName, 'w')
jsonfile.write("[\n")

reader = 'null'
firstLine = True
with open(name,'r') as infile:
	keys = infile.readline();

	fieldNames = keys.split(',')

	reader = csv.DictReader( infile, fieldNames,quoting=csv.QUOTE_ALL)
	for row in reader:
		if (firstLine):
			firstLine = False
		else:
    			jsonfile.write(",\n")
		for value in row.itervalues():
			if value is str:
				value.replace("\n","")
    		json.dump(row, jsonfile, indent=2)

jsonfile.write("]")
jsonfile.close()
