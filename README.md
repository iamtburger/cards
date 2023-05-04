# Card'O'Matic - name and logo suggestions are welcome

The project is a simple card based learning application, utilizing ChatGPT text completion.
The idea came from spaced repetition learning and the fact that I'm usually too lazy to write the cards myself.
So I started typing and Card'O'Matic was born. It can throw a couple of questions at you based on a topic you define.

My goal with this project was to have a little fun with the ChatGPT API and code a little.
The project uses Chakra UI as I was also curious about it, but I might have gone overboard with that as the whole UI is very simple.

## How to play?

I'll deploy a demo soon, but until then, if you have your own OpenAi API key you can clone this repo and the small backend service in the following repo: [OpenAi Backend](https://github.com/iamtburger/openai-be)

## Known issues

- Unfortunately there have been some issues with the complexity and difficulty of the questions and answers the model provide. I'm trying to finetune the prompt to get around this problem.
- Also there's a speed issue with the OpenAi API. Sometimes it takes up to 20-30s to generate the questions and the answers. Be patient!

## There's still a lot to do

- Add more unit tests
