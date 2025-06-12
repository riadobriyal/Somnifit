FROM python:3.10-slim-buster
WORKDIR /server
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "flask/app.py"]