test:
	@./node_modules/.bin/mocha -u tdd

local:
	@jekyll serve --watch

.PHONY: test local
