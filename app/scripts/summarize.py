from transformers import pipeline
import sys


if __name__ == "__main__":
    doc = str(sys.stdin.read())
    doc_len = len(doc.split(' '))

    summarizer = pipeline("summarization")
    summarized = summarizer(doc, min_length=int(min(150, doc_len/4)), max_length=int(min(300, doc_len/2)))

    sys.stdout.write(summarized[0]['summary_text'])
    sys.stderr.write("Finished")
