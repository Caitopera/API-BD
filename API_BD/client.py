import json

class Client:
    def __init__(self, cpf, nome=None, data=None, dic=None) -> None:
        self.__cpf = cpf
        if(nome and data):
            self.__nome = nome
            self.__data = data
            pass
        self.__search_user()
            
    def save_client(self):
        dic = {'cpf' : self.__cpf, 'nome' : self.__nome, 'data' : self.__data}
        save_json(dic, f'{self.__cpf}')

    def upload_user(self, dic):
        self.__cpf = int(dic['cpf']); self.__nome = dic['nome']; self.__data = dic['data']
        save_json(dic, self.__cpf)
    
    def __search_user(self):
        dic = read_json(self.__cpf)
        self.__cpf = int(dic['cpf']); self.__nome = dic['nome']; self.__data = dic['data']

    def __dict__(self):
        return f"Nome : {self.get_nome()}\nCPF : {self.get_nome()}\nData : {self.get_nome()}"

    def get_cpf(self):
        return self.__cpf
    
    def get_nome(self):
        return self.__nome
    
    def get_data(self):
        return self.__data

def save_json(dic, name_file):
    with open(f'{name_file}.json', 'w') as arq_json:
        json.dump(dic, arq_json)
    arq_json.close()

def read_json(name_file):
    try:
        with open(f'{name_file}.json', 'r') as arq_json:
            dic = json.load(arq_json)
        arq_json.close()
        return dic
    except Exception as err:
        print(f'ERROR : {err}')
        return None

#client1 = Client(123, nome='Caina', data='15/01/2002')
client1 = Client(123)
client1.save_client()
print(client1.get_nome())
print(client1.get_data())
    