from client import Client
from flask import Flask, request

app = Flask(__name__)

@app.route('/users', methods = ['GET'])
def get_user():
    user_cpf = request.args.get('cpf')
    client_buffer = Client(cpf=user_cpf)
    return client_buffer.__dict__()

@app.post('/post_user')
def post_user():
    user_cpf = request.form.get('cpf')
    user_nome = request.form.get('nome')
    user_data = request.form.get('data')
    return f"{user_cpf}"
    #client_buffer = Client(cpf=user_cpf, )
    #client_buffer.upload_user()
    #return "Usuario cadastrado"

@app.route('/')
def hello_world():
    return "Hello World"

if __name__ == '__main__':
    app.run(debug=True)