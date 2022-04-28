// npm start

console.log("Hello, TypeScript!");

//
// FUNCO E DECLARACAO DE TIPO
function soma(num1: number, num2: number) {
  return console.log(num1 + num2);
}

soma(1, 2);

//
// INTERFACE
interface IAnimal {
  especie: string;
  patas: number;
  som: string;
  emitirSom(): void;
}
interface IAereo extends IAnimal {
  voador: boolean;
}
interface ITerrestre extends IAnimal {
  visaoNoturna: boolean;
}
interface IAquatico extends IAnimal {
  tipo: "aquatico";
  habitat: "oceano" | "rio" | "lago";
}

//
// TYPES
type IMamifero = ITerrestre | IAquatico | (ITerrestre & IAquatico);

const cao: IMamifero = {
  especie: "Cachorro",
  som: "Au au",
  patas: 4,
  visaoNoturna: true,

  emitirSom() {
    console.log(cao.som);
  },
};
const ave: IAereo = {
  especie: "Galinha",
  som: "Po popo po",
  patas: 2,
  voador: false,

  emitirSom: () => console.log(ave.som),
};

console.log(cao);
cao.emitirSom();
console.log(ave);
ave.emitirSom();

//
// TRATAMENTO DE INPUT
const input = document.querySelector("#input") as HTMLInputElement;

input.addEventListener("input", (event) => {
  const propsInput = event.currentTarget as HTMLInputElement;
  console.log(propsInput.value);
});

//
// GENETIC TypeScript
function adicionaAosItensDaLista<Generic>(array: any[], value: Generic) {
  return array.map((item) => item + value);
}
function substitueItensDaLista<Generic>(array: any[], value: Generic) {
  return array.map(() => value);
}
let arr = [1, 2, 3];
console.log(adicionaAosItensDaLista(arr, 4));
console.log(substitueItensDaLista(arr, "A"));

//
// CONDICIONAIS
interface IUsuario {
  id: string;
  email: string;
  sexo?: "M" | "F"; // OPCIONAL
}
interface IAdmin extends IUsuario {
  autoridade: "DEFALT" | "MODERATOR" | "MASTER";
}

function identificandoUsuario(usuario: IUsuario | IAdmin) {
  if ("autoridade" in usuario) {
    console.log(`O usuário é um administrador ${usuario.autoridade}.`);
  } else {
    console.log("Usuário");
  }
}
let user: IUsuario = {
  id: "10",
  email: "email@email.com",
};
let adm: IAdmin = {
  id: "11",
  email: "email@email.com",
  autoridade: "DEFALT",
};
identificandoUsuario(user);
identificandoUsuario(adm);

//
// RANDONLY & PRIVATE
interface Cachorro {
  nome: string;
  idade: number;
  parqueFavorito?: string;
}
type CachorroSomenteLeitura = {
  +readonly [param in keyof Cachorro]-?: Cachorro[param];
  // LEIA SOMENTE ...
  // ...  para cada parametro de Cachorro e nao mais opcionais
  // RECEBE Cachorro[parametro]
};
class MeuCachorro implements Cachorro {
  nome: string;
  idade: number;

  constructor(nome: string, idade: number) {
    this.nome = nome;
    this.idade = idade;
  }
}
class ReadCachorro implements CachorroSomenteLeitura {
  nome;
  idade;
  parqueFavorito;

  constructor(nome: string, idade: number, parqueFavorito: string) {
    this.nome = nome;
    this.idade = idade;
    this.parqueFavorito = parqueFavorito;
  }
}

const dog = new MeuCachorro("Duck", 1);
const dogRead = new ReadCachorro("Kliford", 9, "Caixa d'agua");

console.log(dog, dogRead);

dog.nome = "Duque";
dogRead.nome = "Klifford";

console.log(dog, dogRead);

//
// OMIT >>> UTILITY TYPES - TYPESCRIPT
interface Pessoa {
  nome: string;
  idade: number;
  nacionalidade: string;
}
interface Brasileiro extends Omit<Pessoa, "nacionalidade"> {}

const brasileiro: Brasileiro = {
  nome: "Alexandre",
  idade: 21,
};
