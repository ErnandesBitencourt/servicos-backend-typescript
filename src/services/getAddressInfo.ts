import axios from "axios";

// função pegar pegar o endereço  diretamente da api .//
export const getAdrressInfo = async (zipcode: string): Promise<string> => {
  try {
    const url = `https://viacep.com.br/ws/${zipcode}/json/`;
    const res = await axios.get(url);
    const finalAddress = `${res.data.logradouro}, ${res.data.bairro} - ${res.data.localidade}/${res.data.uf}  `;
    return finalAddress;
  } catch (error) {
    throw new Error("Erro no viacep");
  }
};
