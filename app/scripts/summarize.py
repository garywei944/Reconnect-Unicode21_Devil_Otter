from transformers import pipeline
import sys


if __name__ == "__main__":
    to_tokenize = sys.stdin.read()

    summarizer = pipeline("summarization")
    summarized = summarizer(to_tokenize, min_length=75, max_length=300)

    sys.stdout.write(summarized[0]['summary_text'])
