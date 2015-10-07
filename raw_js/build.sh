#!/bin/bash

cd "$(dirname "$0")"

if [[ ! -d closure-library ]];
then
	echo "Не знайдено Google Closure Library. Спробую її скачати..."
	rm -r /tmp/hyper-build 2> /dev/null
	mkdir /tmp/hyper-build
	wget -q -O /tmp/hyper-build/master.zip https://github.com/google/closure-library/archive/master.zip
	if [ $? -ne 0 ]; then
		echo "Не можу скачати Google Closure Library."
		exit 1
	fi
	echo "Google Closure Library закачана, розпаковую...";
	unzip -d /tmp/hyper-build /tmp/hyper-build/master.zip > /dev/null
	mv /tmp/hyper-build/closure-library-master closure-library
	rm -r /tmp/hyper-build
fi

if [[ ! -f closure-compiler.jar ]];
then
	echo "Не знайдено Google Closure Compiler. Спробую його скачати..."
	rm -r /tmp/hyper-build 2> /dev/null
	mkdir /tmp/hyper-build
	wget -q -O /tmp/hyper-build/compiler.zip http://dl.google.com/closure-compiler/compiler-latest.zip
	if [ $? -ne 0 ]; then
		echo "Не можу скачати Google Closure Compiler."
		exit 1
	fi
	echo "Google Closure Compiler закачаний, розпаковую...";
	unzip -d /tmp/hyper-build /tmp/hyper-build/compiler.zip > /dev/null
	mv /tmp/hyper-build/compiler.jar closure-compiler.jar
	rm -r /tmp/hyper-build
fi

java -jar closure-compiler.jar --js src --js closure-library \
	--only_closure_dependencies \
	--closure_entry_point hyperchan.revamp \
	--compilation_level=ADVANCED_OPTIMIZATIONS \
	--charset=UTF-8 \
	--js_output_file ../res/a.js
