#!/bin/bash

cd "$(dirname "$0")"

if [[ ! -d closure-library ]];
then
	echo "Не знайдено Google Closure Library. Спробую її зкачати..."
	rm -r /tmp/hyper-build 2> /dev/null
	mkdir /tmp/hyper-build
	wget -q -O /tmp/hyper-build/master.zip https://github.com/google/closure-library/archive/master.zip
	if [ $? -ne 0 ]; then
		echo "Не можу зкачати Google Closure Library."
		exit 1
	fi
	echo "Google Closure Library закачана, розпаковую...";
	unzip -d /tmp/hyper-build /tmp/hyper-build/master.zip > /dev/null
	mv /tmp/hyper-build/closure-library-master closure-library
	rm -r /tmp/hyper-build
fi

if [[ ! -f closure-compiler.jar ]];
then
	echo "Не знайдено Google Closure Compiler. Спробую його зкачати..."
	rm -r /tmp/hyper-build 2> /dev/null
	mkdir /tmp/hyper-build
	wget -q -O /tmp/hyper-build/compiler.zip http://dl.google.com/closure-compiler/compiler-latest.zip
	if [ $? -ne 0 ]; then
		echo "Не можу зкачати Google Closure Compiler."
		exit 1
	fi
	echo "Google Closure Compiler закачаний, розпаковую...";
	unzip -d /tmp/hyper-build /tmp/hyper-build/compiler.zip > /dev/null
	mv /tmp/hyper-build/compiler.jar closure-compiler.jar
	rm -r /tmp/hyper-build
fi

closure-library/closure/bin/calcdeps.py -i a.js \
	-p closure-library -o compiled -c closure-compiler.jar \
	-f "--compilation_level=ADVANCED_OPTIMIZATIONS" \
	-f "--charset=UTF-8" \
> ../res/a.js
