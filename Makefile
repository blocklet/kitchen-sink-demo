TOP_DIR=.
README=$(TOP_DIR)/README.md

VERSION=$(strip $(shell cat version))

build:
	@echo "Building the software..."

init: install dep
	@echo "Initializing the repo..."

install:
	@echo "Install software required for this repo..."
	@npm install -g yarn @abtnode/cli

dep:
	@echo "Install dependencies required for this repo..."
	@yarn

pre-build: install dep
	@echo "Running scripts before the build..."

post-build:
	@echo "Running scripts after the build is done..."

all: pre-build build post-build

test:
	@echo "Running test suites..."

lint:
	@echo "Linting the software..."
	@yarn lint

doc:
	@echo "Building the documenation..."

precommit: dep lint doc build test

github-action-init: precommit
	@sudo npm install -g yarn @abtnode/cli

clean:
	@echo "Cleaning the build..."

run:
	@echo "Running the software..."
	@yarn start

include .makefiles/*.mk

.PHONY: build init install dep pre-build post-build all test doc precommit github-action-test clean watch run bump-version create-pr
